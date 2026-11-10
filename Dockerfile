# Stage 1: Build the Angular app in tennyson-portfolio/
FROM node:20-alpine AS web-builder

WORKDIR /app

COPY tennyson-portfolio/package.json tennyson-portfolio/package-lock.json ./

RUN npm ci

COPY tennyson-portfolio/ ./

RUN npm run build

# API image. Compose selects this with target: api.
FROM python:3.11-slim AS api

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

# Node.js is needed for Prisma CLI to run `prisma generate`
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY prisma /app/prisma
RUN npx prisma@5.17.0 generate --schema=/app/prisma/schema.prisma

COPY backend/ .
RUN mkdir -p uploaded-images

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Angular production image. This is the default build target.
FROM node:20-alpine AS web

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY tennyson-portfolio/package.json tennyson-portfolio/package-lock.json ./

RUN npm ci --omit=dev

COPY --from=web-builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/tennyson-portfolio/server/server.mjs"]
