Change my VPS from Pm2 to docker plane 


Keep existing Nginx (from iRedMail) as the single edge proxy on ports :80/:443.
Dockerize each app (web + worker + db/redis as needed) and run them on high localhost ports or internal Docker networks.
In Nginx, one server block per domain/subdomain that proxy_passes to each app’s Docker service.
Add CI → build images → pull & up for repeatable deploys.
Add backups + monitoring early.

This avoids conflicts with iRedMail (which already owns Nginx and mail ports), and lets you add more projects without drama.

1) Target layout (simple and future-proof)

On the VPS:

/opt/
  sparkco          (sparkco.vip main site)
  book             (book.sparkco.vip)
  maintenance      (maintenance.sparkco.vip)
  legal            (legal.sparkco.vip)
  eduvibe          (eduvibe.vip)
  shared/
    postgres/      (optional: one Postgres cluster for all apps)
    redis/         (optional: shared redis)
    backups/


Each project folder has: docker-compose.yml, its Dockerfile(s), .env.production.
Nginx stays on the host (iRedMail uses it). No need to replace with Traefik now.

If later you want auto-routing & Let’s Encrypt via Traefik, we can switch—no rush.

2) Per-app Docker (replace PM2)

Example for eduvibe.vip (Next.js + worker + Redis; Postgres can be shared):

/opt/eduvibe/docker-compose.yml
services:
  web:
    build:
      context: .
      dockerfile: web/Dockerfile
    env_file:
      - web/.env.production
    environment:
      NODE_ENV: production
      PORT: 3000
    networks: [ appnet ]
    ports:
      - "127.0.0.1:31001:3000"   # bind only to localhost, unique port per app
    restart: unless-stopped
    depends_on:
      - redis
      - postgres

  worker:
    build:
      context: .
    dockerfile: apps/worker/Dockerfile
    env_file:
      - apps/worker/.env.production
    networks: [ appnet ]
    restart: unless-stopped
    depends_on:
      - redis
      - postgres

  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: eduvibe
      POSTGRES_USER: eduvibe
      POSTGRES_PASSWORD: strongpass
    volumes:
      - ../shared/postgres/eduvibe:/var/lib/postgresql/data
    networks: [ appnet ]
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    networks: [ appnet ]
    restart: unless-stopped

  migrate:
    build:
      context: .
      dockerfile: web/Dockerfile
    env_file:
      - web/.env.production
    command: ["node","web/node_modules/.bin/prisma","migrate","deploy"]
    networks: [ appnet ]
    depends_on:
      - postgres
    restart: "no"

networks:
  appnet:
    driver: bridge


Do the same for sparkco, book, maintenance, legal, giving each unique localhost port (e.g., 31002, 31003…).

3) Nginx: one server block per domain/subdomain
Since iRedMail already configures Nginx, just add/adjust site files:

/etc/nginx/sites-available/eduvibe.vip:

server {
  listen 80;
  listen 443 ssl http2;
  server_name eduvibe.vip www.eduvibe.vip;

  # (certs likely already managed by your iRedMail config/certbot)
  # include ssl params if needed, e.g.:
  # ssl_certificate     /etc/letsencrypt/live/eduvibe.vip/fullchain.pem;
  # ssl_certificate_key /etc/letsencrypt/live/eduvibe.vip/privkey.pem;

  # Healthcheck
  location /healthz { return 200 "ok"; add_header Content-Type text/plain; }

  # Streaming routes: don't buffer
  location ~* ^/(api/chat/lesson|api/chat/lesson/stream) {
    proxy_pass http://127.0.0.1:31001;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header Host $host;
    proxy_buffering off;
    proxy_cache off;
  }

  location / {
    proxy_pass http://127.0.0.1:31001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}


Repeat for:

sparkco.vip → upstream 127.0.0.1:31002
book.sparkco.vip → 127.0.0.1:31003
maintenance.sparkco.vip → 127.0.0.1:31004
legal.sparkco.vip → 127.0.0.1:31005

Then:

sudo ln -s /etc/nginx/sites-available/eduvibe.vip /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx


Mail stays untouched: iRedMail owns ports 25/587/993, etc. No conflicts.

4) Env files (prod)

Example web/.env.production:

NODE_ENV=production
NEXTAUTH_URL=https://eduvibe.vip
DATABASE_URL=postgresql://eduvibe:strongpass@postgres:5432/eduvibe?schema=public
REDIS_URL=redis://redis:6379
OPENAI_API_KEY=...
RESEND_API_KEY=...
CRON_SECRET=...


Note: in containers, use the service names postgres, redis as hosts.

5) CI/CD (one-button deploy)

Build images in GitHub Actions (same OS/libs each time), push to GHCR/Docker Hub.
On the VPS: docker compose pull && docker compose run --rm migrate && docker compose up -d.
You can do one workflow per repo/project or a mono-workflow that builds multiple images. The important part is: build on CI, not on laptop.

6) Migration path (no downtime, minimal risk)

Pick one project (e.g., eduvibe) → dockerize it locally → test.
Copy project to /opt/eduvibe on the VPS.
docker compose up -d (will listen on 127.0.0.1:31001).
Add Nginx site, reload Nginx.
Test domain.
Repeat for the remaining projects.
If something goes wrong, disable the Nginx site and you’re back to the old setup instantly.

7) Backups & monitoring (don’t skip)

Backups:

Nightly pg_dump to /opt/shared/backups/postgres/YYYY-MM-DD/eduvibe.sql.gz.
Optionally sync to S3/Backblaze with restic.
Uptime: run Uptime-Kuma in Docker to ping each domain and alert you.
Logs: keep Docker logs and consider shipping to a simple Loki/Promtail later.

8) When to consider Traefik

Later, if you want automatic TLS + routing by labels and even simpler add-a-project flow:
Put Traefik as the single 80/443 entrypoint (replacing Nginx), or keep Nginx and run Traefik on high ports per internal use.
For now, with iRedMail + Nginx in place, sticking to Nginx edge + Dockerized apps is the least disruptive.

9) Your question: “Can I stop and change to Docker now?”

Yes—and you should.
You have no users yet, so switching to Docker now saves months of future headaches. It also makes adding more projects easy: copy a template, assign a new port, add an Nginx server block, deploy.

Quick checklist to start today

 Create /opt/eduvibe with Dockerfiles + docker-compose.yml
 Put prod env in web/.env.production and apps/worker/.env.production
 docker compose up -d → confirm it answers on curl 127.0.0.1:31001/healthz
 Add the Nginx site file → nginx -t && systemctl reload nginx
 Repeat for sparkco, book, maintenance, legal
 Add a simple GH Actions workflow to build/push/pull images



it’s mostly simple steps. For each project, you’re changing how it runs, not rewriting app code. In most cases you’ll only touch:

a Dockerfile

a docker-compose.yml
a .env.production
an Nginx server block
…and maybe a tiny tweak to connection strings (e.g., postgres instead of localhost).
Here’s the practical breakdown.
What usually changes (code vs infra)
Minimal code changes (often none):
Replace any hardcoded localhost:5432 / 127.0.0.1:6379 with service names in env:
DATABASE_URL=postgresql://user:pass@postgres:5432/db
REDIS_URL=redis://redis:6379
Make sure absolute URLs in env are correct:
NEXTAUTH_URL, PUBLIC_APP_URL, OAuth callbacks, etc.
Ensure your app reads config from env (no local-only files).
If you use Prisma, don’t commit node_modules/.prisma tricks—let Docker build Prisma client in the image.
Infra-only changes:
Add Dockerfile (multi-stage).
Add docker-compose.yml with unique localhost port.
Add .env.production files.
Add Nginx vhost that proxies your domain to that localhost port.
(Optional) CI workflow to build/push images and pull on the server.
Per-project conversion — simple steps

Create Dockerfile

For Next.js/Node: use the Debian bookworm multi-stage Dockerfile (from Server.md).

For static sites: you can even serve from Next or a tiny Node/static image.

Create docker-compose.yml

Define web (and worker if you have one).

If the project needs DB/Redis and doesn’t share them, add postgres/redis services.

Publish a unique localhost port (e.g., 127.0.0.1:31002:3000).

Prepare .env.production

Copy your local env values, change hosts to postgres/redis service names.

Set correct public URLs per domain.

Nginx server block

Create /etc/nginx/sites-available/<domain> that proxy_pass http://127.0.0.1:<port>;

For streaming routes (SSE), add proxy_buffering off;.

Spin it up

docker compose build

docker compose up -d

If Prisma: docker compose run --rm migrate

Confirm health: curl 127.0.0.1:<port>/healthz (or your home page)

Enable site

ln -s the site to sites-enabled, nginx -t && systemctl reload nginx.

Typical project types & effort

Next.js app (your apps): Easy — just add the Dockerfile & compose, set env, done.

Node API / worker: Easy — Dockerfile + compose service; point to shared Postgres/Redis or add per-project ones.

Static site: Trivial — you can serve via Next or nginx:alpine as a static file server.

DB migrations (Prisma): Add the one-off migrate service in compose. No app code change.

Common pitfalls (and fixes)

Prisma engine errors: Use Debian (bookworm) images, run prisma generate in the image build. Avoid Alpine.

Wrong hosts: Inside Docker, use service names (not localhost).

Env mismatch: Prod URLs (NEXTAUTH_URL, OAuth) must match your domain.

Nginx buffering on streams: Turn it off for chat/stream routes.

PM2 conflicts: Don’t run PM2 and Docker for the same app; pick Docker.

Ports in use: Use unique localhost ports per app (e.g., 31001..31005).

Reuse the templates

You already have Server.md with a full template. For each of your five domains:

Copy the compose file and only change the published port.

Copy the Nginx block and change server_name and port.

Adjust the .env.production NEXTAUTH_URL / PUBLIC_APP_URL.

Rollout game plan (low risk)

Convert one project first (e.g., eduvibe.vip).

Once it’s solid, repeat for sparkco, book, maintenance, legal.

Keep iRedMail/Nginx as-is; you’re just adding new server blocks and Docker stacks.

When ready, add CI so pushes build images and you just pull & up on the server.

If you want, I can generate ready-to-paste Dockerfile + docker-compose + Nginx files for each of your five projects with distinct ports so you can drop them in and go.
