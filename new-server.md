3. ✅ Created Systemd Services
Created the following systemd services for all projects:
SparkCo Project:
sparkco-frontend.service - Next.js frontend on port 3000
sparkco-backend.service - NestJS backend on port 4000

Book Project:
book-frontend.service - Next.js frontend on port 3003
book-backend.service - NestJS backend on port 4003

Maintenance Project:
maintenance-frontend.service - Next.js frontend on port 3004
maintenance-backend.service - NestJS backend on port 4004

Legal Manager Project:
legal-manager-web.service - Next.js frontend on port 3005
legal-manager-api.service - NestJS backend on port 4005
 
AI School Project:
ai-school-web.service - Next.js frontend on port 3006

4. ✅ Updated Nginx Configurations
Fixed syntax errors in existing configs
Updated all proxy ports to match new systemd service ports
Created new configuration for AI school project
Removed conflicting default configurations
All configurations now use the new port scheme
5. ✅ Port Assignment
3001: SparkCo Frontend
3002: SparkCo Backend
3003: Book Frontend
3004: Maintenance Frontend
3005: Legal Manager Frontend
3006: AI School Frontend
4003: Book Backend
4004: Maintenance Backend
4005: Legal Manager Backend
