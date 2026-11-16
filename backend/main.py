from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from controller import router
from repository import UPLOAD_DIR, prisma
from dotenv import load_dotenv
from pathlib import Path

# Secrets live only in the repo-root .env. Existing process env (Docker) wins.
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to Prisma when the application starts
    print("Connecting to Prisma...")
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

# Include router
app.include_router(router)

# Mount static files for uploaded images
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploaded-images", StaticFiles(directory=str(UPLOAD_DIR)), name="uploaded-images") 