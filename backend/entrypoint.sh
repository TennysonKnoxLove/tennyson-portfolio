#!/bin/sh
set -eu

schema=/app/prisma/schema.prisma
attempt=1

until npx --yes prisma@5.17.0 db push --schema="$schema" --skip-generate; do
  if [ "$attempt" -ge 15 ]; then
    echo "Prisma schema was not applied. The database did not become ready."
    exit 1
  fi
  echo "Waiting for the database before applying the Prisma schema ($attempt)..."
  attempt=$((attempt + 1))
  sleep 2
done

exec uvicorn main:app --host 0.0.0.0 --port 8000
