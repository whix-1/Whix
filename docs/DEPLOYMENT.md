# Whix VTU Platform - Deployment Guide

## Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git
- AWS/GCP/Vercel account (optional)

## Local Development

```bash
# Clone repository
git clone https://github.com/whix-1/Whix.git
cd Whix

# Setup environment
cp .env.example .env

# Start with Docker
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migrate
```

## Production Deployment

### Using Docker
```bash
# Build images
docker-compose -f docker-compose.yml build

# Deploy
docker-compose -f docker-compose.yml up -d
```

### Using Vercel (Frontend)
```bash
# Deploy frontend
cd frontend
vercel --prod
```

### Using AWS EC2/ECS
```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker tag whix-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/whix-backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/whix-backend:latest
```

### Using Firebase (Mobile)
```bash
cd mobile
npm run build:android
npm run build:ios
npm run submit:android
npm run submit:ios
```

## Database Backups
```bash
# Backup PostgreSQL
docker-compose exec postgres pg_dump -U postgres whix_vtu > backup.sql

# Restore
psql -U postgres whix_vtu < backup.sql
```

## Monitoring
- Sentry: Error tracking
- DataDog: Performance monitoring
- CloudWatch: AWS logs

## SSL/TLS
Use Let's Encrypt with Nginx reverse proxy for HTTPS.

## CI/CD
GitHub Actions configured in `.github/workflows/`
