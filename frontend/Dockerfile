# Use Node.js image with corepack (pnpm is built-in)
FROM node:20-bookworm-slim AS base

# Install system dependencies for building native modules
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm via corepack (comes with Node.js 20+)
RUN corepack enable pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code (excluding node_modules)
COPY . .
RUN if [ -d "node_modules" ]; then rm -rf node_modules; fi

# Reinstall dependencies to ensure they're compatible with the copied source
RUN pnpm install --no-frozen-lockfile

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-bookworm-slim AS production

# Install system dependencies for runtime
RUN apt-get update && apt-get install -y \
    python3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Create non-root user
RUN groupadd -r nextjs && useradd -r -g nextjs nextjs

# Create pnpm cache directory and set permissions
RUN mkdir -p /home/nextjs/.local/share/pnpm && chown -R nextjs:nextjs /home/nextjs

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --no-frozen-lockfile --prod

# Copy built application from build stage
COPY --from=base --chown=nextjs:nextjs /app/.next ./.next
COPY --from=base --chown=nextjs:nextjs /app/public ./public
COPY --from=base --chown=nextjs:nextjs /app/next.config.ts ./
COPY --from=base --chown=nextjs:nextjs /app/package.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["pnpm", "start"]
