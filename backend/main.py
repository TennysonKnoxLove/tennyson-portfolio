from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from controller import router
from repository import prisma
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to Prisma when the application starts
    print("Connecting to Prisma...")
    
    # DEBUG: Let's see what DATABASE_URL is actually being used
    actual_database_url = os.getenv("DATABASE_URL")
    print(f"DEBUG: DATABASE_URL environment variable = '{actual_database_url}'")
    
    await prisma.connect()
    print("Prisma connected.")
    yield
    # Disconnect from Prisma when the application shuts down
    print("Disconnecting from Prisma...")
    await prisma.disconnect()
    print("Prisma disconnected.")

# Pass the lifespan context manager to the FastAPI app
app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router with /api prefix
app.include_router(router, prefix="/api")

# Mount static files for uploaded images
app.mount("/uploaded-images", StaticFiles(directory="backend/uploaded-images"), name="uploaded-images") 