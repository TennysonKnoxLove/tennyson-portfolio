# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8000

# Set the working directory in the container
WORKDIR /app/backend

# Install system dependencies that might be needed by psycopg2 or other libs
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm (needed for Prisma CLI to run `prisma generate`)
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Prisma schema to generate the client
COPY ../prisma ./prisma

# Generate Prisma Client
# This is a crucial step for Prisma to work correctly in production.
RUN npx prisma generate --schema=./prisma/schema.prisma

# Copy the rest of the backend application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application
# Ensure main:app points to your FastAPI instance in your main.py
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 