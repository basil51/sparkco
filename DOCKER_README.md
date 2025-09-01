# Docker Setup for SparkCo

This document describes the Docker setup for the SparkCo application, migrating from PM2 to containerized deployment.

## Architecture

The application is containerized with the following services:

- **Frontend** (Next.js): Port 31001 (main domain sparkco.vip)
- **Backend** (NestJS): Port 31002 (API)
- **PostgreSQL**: Database service
- **Redis**: Cache service

## Directory Structure

```
/opt/sparkco/          # Production deployment directory
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   └── .env.production
├── backend/
│   ├── Dockerfile
│   └── .env.production
└── shared/
    ├── postgres/      # Persistent database data
    ├── redis/         # Redis data (if needed)
    └── backups/
        └── postgres/  # Database backups
```

## Quick Start

### Development Setup

1. **Clone and checkout the docker branch:**
   ```bash
   git checkout docker
   ```

2. **Set environment variables:**
   - Copy and configure `frontend/.env.production`
   - Copy and configure `backend/.env.production`

3. **Build and run:**
   ```bash
   # Build and start all services
   docker compose up --build

   # Or run in background
   docker compose up -d --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:31001
   - Backend API: http://localhost:31002

### Production Deployment

1. **Deploy to server:**
   ```bash
   # On your VPS, create the directory structure
   sudo mkdir -p /opt/sparkco
   cd /opt/sparkco

   # Clone your repository
   git clone <your-repo> .
   git checkout docker

   # Configure environment variables
   # Edit frontend/.env.production and backend/.env.production
   ```

2. **Set database password:**
   ```bash
   export DB_PASSWORD=your_secure_password
   ```

3. **Run the application:**
   ```bash
   docker compose up -d --build
   ```

## Environment Configuration

### Frontend (.env.production)
```env
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=https://sparkco.vip
NEXTAUTH_SECRET=your-nextauth-secret-here
API_URL=http://backend:3001
NEXT_PUBLIC_API_URL=https://sparkco.vip/api
```

### Backend (.env.production)
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://sparkco:password@postgres:5432/sparkco
REDIS_URL=redis://redis:6379
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=basel@sparkco.vip
CORS_ORIGIN=https://sparkco.vip
```

## Nginx Configuration

Add this server block to your existing Nginx configuration:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name sparkco.vip www.sparkco.vip;

    # SSL certificates (configure as needed)
    # ssl_certificate /etc/letsencrypt/live/sparkco.vip/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/sparkco.vip/privkey.pem;

    # Health check
    location /healthz {
        return 200 "ok";
        add_header Content-Type text/plain;
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:31002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend proxy
    location / {
        proxy_pass http://127.0.0.1:31001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Docker Commands

### Basic Operations
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f frontend
```

### Maintenance
```bash
# Rebuild and restart
docker compose up -d --build

# Update images
docker compose pull

# Clean up
docker system prune -a
```

### Database Operations
```bash
# Access PostgreSQL
docker compose exec postgres psql -U sparkco -d sparkco

# Backup database
docker compose exec postgres pg_dump -U sparkco sparkco > backup.sql

# Run migrations (if using Prisma)
docker compose run --rm migrate
```

## Health Checks

The setup includes health checks for all services:

- Frontend: `curl http://localhost:31001/api/health`
- Backend: `curl http://localhost:31002/health`
- PostgreSQL: Built-in health check
- Redis: Built-in health check

## Security Considerations

1. **Change default passwords** in environment variables
2. **Use strong secrets** for JWT, NextAuth, etc.
3. **Configure SSL/TLS** certificates
4. **Restrict database access** to container network only
5. **Regular updates** of Docker images

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 31001, 31002 are available
2. **Permission issues**: Check file permissions for shared volumes
3. **Database connection**: Verify DATABASE_URL in backend .env
4. **Build failures**: Clear Docker cache with `docker system prune -a`

### Logs and Debugging
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs backend

# Follow logs in real-time
docker compose logs -f frontend

# Access container shell
docker compose exec frontend sh
```

## Migration from PM2

1. **Backup current setup**: Keep PM2 running as backup
2. **Test Docker setup locally**: Ensure everything works
3. **Update Nginx**: Add new server blocks for Docker ports
4. **Deploy to production**: Use docker compose up -d
5. **Verify functionality**: Test all endpoints
6. **Remove PM2**: Once confirmed working, stop PM2 services

## Monitoring

Consider adding monitoring with:

- **Uptime Kuma**: For health monitoring
- **Prometheus + Grafana**: For metrics
- **Loki**: For log aggregation

## Backup Strategy

- **Database**: Regular pg_dump to `/opt/sparkco/shared/backups/postgres/`
- **Environment**: Keep .env files secure and backed up
- **Code**: Use Git for version control

---

For questions or issues, refer to the main Docker.md documentation.
