# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies (including devDependencies needed for the build)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Run the build script (e.g., for Angular, TypeScript, etc.)
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Copy package.json and package-lock.json from the builder stage
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the built application from the builder stage
# The output of 'npm run build' for Angular is typically in a 'dist/project-name' folder.
# We copy the entire 'dist' folder from the builder to the '/app/dist' in the final image.
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
# This should point to your Angular SSR server script within the 'dist' folder.
CMD ["node", "dist/tennyson-portfolio/server/server.mjs"] 