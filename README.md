# Tennyson Portfolio

Angular portfolio site, a FastAPI API, and a Postgres database.

## Requirements

- Node.js 20
- Python 3.11
- Docker, if you want to run the full stack in containers

## Run with Docker

From the repository root:

```bash
docker compose up --build
```

| Service | URL |
| --- | --- |
| Site | http://localhost:8080 |
| API | http://localhost:8000 |
| Postgres | localhost:5432 (`postgres` / `postgres`, database `portfolio`) |

The site image is a production build. Its API address comes from `tennyson-portfolio/src/environments/environment.prod.ts`.

Create the database tables once Postgres is up:

```bash
docker compose exec api npx prisma@5.17.0 db push --schema=/app/prisma/schema.prisma
```

Stop the stack with `docker compose down`.

## Run locally

### Database

Start only Postgres:

```bash
docker compose up db
```

Create `prisma/.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio
```

Generate the Prisma client and create the tables:

```bash
npx prisma@5.17.0 generate --schema=prisma/schema.prisma
npx prisma@5.17.0 db push --schema=prisma/schema.prisma
```

The API reads `DATABASE_URL` from `prisma/.env`.

### API

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API listens on http://localhost:8000.

### Site

```bash
cd tennyson-portfolio
npm install
npm start
```

The dev server listens on http://localhost:4200 and calls the API at `http://localhost:8000`, from `src/environments/environment.ts`.
