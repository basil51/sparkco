# Sparkco VIP - Software Development & SaaS Services

A full-stack web application built with Next.js frontend and NestJS backend, providing software development and SaaS services.

## 🚀 Features

- **Modern Frontend**: Built with Next.js 14 and TypeScript
- **Robust Backend**: NestJS API with TypeScript
- **Monorepo Structure**: Organized with pnpm workspaces
- **Responsive Design**: Modern UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## 🏗️ Project Structure

```
sparkco/
├── frontend/          # Next.js frontend application
├── backend/           # NestJS backend API
├── shared/            # Shared utilities and types
└── package.json       # Root package.json for workspace management
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Node.js** - Runtime environment

### Development Tools
- **pnpm** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sparkco.git
   cd sparkco
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

## 🚀 Development

### Start the development servers

**Start both frontend and backend:**
```bash
pnpm dev
```

**Start only frontend:**
```bash
pnpm dev:frontend
```

**Start only backend:**
```bash
pnpm dev:backend
```

### Build for production

```bash
pnpm build
```

## 📁 Available Scripts

### Root Level
- `pnpm install` - Install all dependencies
- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build both frontend and backend for production
- `pnpm lint` - Run linting across all packages
- `pnpm test` - Run tests across all packages

### Frontend
- `pnpm dev:frontend` - Start frontend development server
- `pnpm build:frontend` - Build frontend for production
- `pnpm start:frontend` - Start frontend production server

### Backend
- `pnpm dev:backend` - Start backend development server
- `pnpm build:backend` - Build backend for production
- `pnpm start:backend` - Start backend production server

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## 🐳 Docker & Traefik

### Local (single host)

Runs Traefik plus the app so routers show up in the dashboard. Site is served at **http://sparkco.localhost** (most systems resolve `*.localhost` to `127.0.0.1`; if not, add `127.0.0.1 sparkco.localhost` to `/etc/hosts`).

```bash
docker compose -f docker-compose.local.yml up --build
```

- **App**: http://sparkco.localhost  
- **Traefik dashboard**: http://localhost:8080/dashboard/  

API traffic uses the same host: the frontend calls `http://sparkco.localhost/...` and Traefik sends `/api` to the NestJS container.

### Local (your own Traefik)

Docker Compose needs a **user-defined** network shared with Traefik (the default `bridge` network cannot be used for multi-service compose).

```bash
docker network create traefik   # once
docker network connect traefik traefik   # attach your running Traefik container
# In Traefik’s command, add: --providers.docker.network=traefik

cp .env.docker.local.example .env.docker.local
docker compose --env-file .env.docker.local up -d --build
```

`TRAEFIK_NETWORK` in `.env.docker.local` must match that network name (default `traefik`).

Match `TRAEFIK_ENTRYPOINT` to your Traefik entrypoint (`web` on plain HTTP; `websecure` if TLS terminates there).

**`/etc/hosts`:** ensure `127.0.0.1 sparkco.localhost` if `*.localhost` does not resolve on your OS.

After reboot, containers come back automatically (`restart: unless-stopped`). Use `docker compose --env-file .env.docker.local down` to stop and remove them.

### Production (`sparkco.vip`)

Uses `docker-compose.prod.yml`: TLS, Let’s Encrypt, site at `sparkco.vip` / `www.sparkco.vip`, API on the same host under `/api`, dashboard at `traefik.sparkco.vip`.

```bash
docker network create web
touch traefik/acme.json && chmod 600 traefik/acme.json
docker compose -f docker-compose.prod.yml up -d --build
```

On the server, create `backend/.env.production` (SMTP, DB, etc.); the compose file marks it optional only so `docker compose config` works without secrets in the repo. Ensure DNS A/AAAA records point to the server and ports **80** and **443** reach Traefik.

## 📝 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Sparkco VIP** - Software Development & SaaS Services

## 📞 Contact

For any questions or support, please reach out to the development team.

---

**Built with ❤️ by Sparkco VIP Team**
