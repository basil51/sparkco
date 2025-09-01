#!/bin/bash

# SparkCo Docker Deployment Script
# This script helps deploy the application to production

set -e

echo "🚀 Starting SparkCo Docker Deployment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}Error: docker-compose.yml not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."

    if [ -z "$DB_PASSWORD" ]; then
        print_warning "DB_PASSWORD is not set. Using default 'changeme'"
        export DB_PASSWORD=changeme
    fi

    # Check if production env files exist
    if [ ! -f "frontend/.env.production" ]; then
        print_error "frontend/.env.production not found!"
        exit 1
    fi

    if [ ! -f "backend/.env.production" ]; then
        print_error "backend/.env.production not found!"
        exit 1
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."

    mkdir -p shared/postgres
    mkdir -p shared/backups/postgres
    mkdir -p shared/redis

    # Set proper permissions
    chmod 755 shared/
    chmod 700 shared/postgres
    chmod 700 shared/backups
}

# Pull latest images
pull_images() {
    print_status "Pulling latest Docker images..."
    docker compose pull
}

# Build and deploy
deploy() {
    print_status "Building and deploying services..."

    # Build images
    docker compose build --no-cache

    # Start services
    docker compose up -d

    print_status "Waiting for services to be healthy..."
    sleep 30

    # Check health
    check_health
}

# Check service health
check_health() {
    print_status "Checking service health..."

    # Check frontend health
    if curl -f -s http://localhost:31001/api/health > /dev/null; then
        print_status "✅ Frontend is healthy"
    else
        print_error "❌ Frontend health check failed"
    fi

    # Check backend health
    if curl -f -s http://localhost:31002/health > /dev/null; then
        print_status "✅ Backend is healthy"
    else
        print_error "❌ Backend health check failed"
    fi

    print_status "Health check complete"
}

# Show logs
show_logs() {
    print_status "Showing recent logs..."
    docker compose logs --tail=50
}

# Main deployment process
main() {
    print_status "Starting deployment process..."

    check_env_vars
    create_directories
    pull_images
    deploy

    print_status "🎉 Deployment complete!"
    print_status "Frontend: http://localhost:31001"
    print_status "Backend: http://localhost:31002"

    echo ""
    print_status "Useful commands:"
    echo "  docker compose logs -f              # Follow logs"
    echo "  docker compose down                # Stop services"
    echo "  docker compose restart             # Restart services"
    echo "  docker system prune -a             # Clean up"

    echo ""
    read -p "Would you like to see recent logs? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        show_logs
    fi
}

# Parse command line arguments
case "${1:-}" in
    "stop")
        print_status "Stopping services..."
        docker compose down
        ;;
    "restart")
        print_status "Restarting services..."
        docker compose restart
        ;;
    "logs")
        show_logs
        ;;
    "health")
        check_health
        ;;
    "cleanup")
        print_status "Cleaning up Docker system..."
        docker system prune -a -f
        ;;
    *)
        main
        ;;
esac
