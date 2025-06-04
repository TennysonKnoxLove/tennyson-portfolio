from fastapi import APIRouter, HTTPException, UploadFile, Header
from service import UserService, ResourceService, PortfolioService, DockerService
import json

router = APIRouter()

def transform_resource_for_frontend(resource):
    """Transform resource data from database format to frontend format"""
    if not resource:
        return resource
    
    # Convert the resource to dict if it's not already
    resource_dict = dict(resource) if hasattr(resource, '__dict__') else resource
    
    # Parse JSON strings back to objects/arrays
    try:
        if 'tags' in resource_dict and isinstance(resource_dict['tags'], str):
            resource_dict['tags'] = json.loads(resource_dict['tags'])
    except (json.JSONDecodeError, TypeError):
        resource_dict['tags'] = []
    
    try:
        if 'location' in resource_dict and isinstance(resource_dict['location'], str):
            resource_dict['location'] = json.loads(resource_dict['location'])
    except (json.JSONDecodeError, TypeError):
        resource_dict['location'] = {}
    
    try:
        if 'availability' in resource_dict and isinstance(resource_dict['availability'], str):
            resource_dict['availability'] = json.loads(resource_dict['availability'])
    except (json.JSONDecodeError, TypeError):
        resource_dict['availability'] = {}
    
    return resource_dict

@router.post("/auth/login")
async def login_user(login_data: dict):
    user = await UserService.login_user(login_data)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Return the expected LoginResponse format
    return {
        "user": {
            "id": user.id,
            "username": user.username,
            "createdAt": user.createdAt.isoformat() if hasattr(user, 'createdAt') and user.createdAt else "",
            "updatedAt": user.updatedAt.isoformat() if hasattr(user, 'updatedAt') and user.updatedAt else ""
        },
        "message": f"Login successful for {user.username}"
    }

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    user = await UserService.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/resources")
async def get_resources():
    resources = await ResourceService.get_all_resources()
    return [transform_resource_for_frontend(resource) for resource in resources]

@router.post("/resources")
async def create_resource(resource_data: dict, x_user_id: str = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=400, detail="X-User-Id header is required")
    
    # Construct location object from separate fields
    location_obj = {
        "address": resource_data.get("address", ""),
        "zip": resource_data.get("zipCode", ""),
        "city": resource_data.get("city", ""),
        "state": resource_data.get("state", "")
    }
    
    # Only include fields that are directly in the Prisma model (no relation fields)
    complete_resource_data = {
        "name": resource_data.get("name", ""),
        "description": resource_data.get("description", ""),
        "image": resource_data.get("image", ""),
        "tags": json.dumps(resource_data.get("tags", [])),  # Convert array to JSON string
        "location": json.dumps(location_obj),  # Convert location object to JSON string
        "availability": json.dumps(resource_data.get("availability", {})),  # Convert object to JSON string
        "resourceOwnerId": x_user_id,
        "price": float(resource_data.get("price", 0.0))
    }
    
    created_resource = await ResourceService.create_resource(complete_resource_data)
    return transform_resource_for_frontend(created_resource)

@router.get("/resources/my-resources")
async def get_my_resources(x_user_id: str = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=400, detail="X-User-Id header is required")
    
    resources = await ResourceService.get_my_resources(user_id=x_user_id)
    return [transform_resource_for_frontend(resource) for resource in resources]

@router.delete("/resources/{resource_id}")
async def delete_resource(resource_id: str):
    success = await ResourceService.delete_resource(resource_id)
    if not success:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"message": "Resource deleted successfully"}

@router.get("/portfolio")
async def get_portfolio_data():
    return await PortfolioService.get_portfolio_data()

@router.post("/resources/upload-image")
async def upload_image(file: UploadFile):
    return await ResourceService.upload_image(file)

@router.post("/docker/start")
async def start_containers():
    return await DockerService.start_containers()

@router.post("/docker/stop")
async def stop_containers():
    return await DockerService.stop_containers()

@router.get("/docker/status")
async def get_container_status():
    return await DockerService.get_container_status()

# California Project endpoints
@router.post("/docker/compose-up")
async def california_start_containers():
    return await DockerService.california_start_containers()

@router.post("/docker/compose-down")
async def california_stop_containers():
    return await DockerService.california_stop_containers()

@router.get("/docker/health-check")
async def california_health_check():
    return await DockerService.california_health_check()

@router.get("/docker/california-app")
async def california_get_app_url():
    return await DockerService.california_get_app_url()

@router.get("/docker/montana-app")
async def montana_get_app_url():
    return await DockerService.montana_get_app_url()

# Montana Project endpoints
@router.post("/docker/montana-compose-up")
async def montana_start_containers():
    return await DockerService.montana_start_containers()

@router.post("/docker/montana-compose-down")
async def montana_stop_containers():
    return await DockerService.montana_stop_containers()

@router.get("/docker/montana-status")
async def montana_get_container_status():
    return await DockerService.montana_get_container_status()

@router.get("/docker/montana-health-check")
async def montana_health_check():
    return await DockerService.montana_health_check() 