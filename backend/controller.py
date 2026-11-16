from fastapi import APIRouter, HTTPException, Request, UploadFile, Header
from pydantic import BaseModel, Field
from typing import Literal
from service import UserService, ResourceService, DockerService, CorpService
from emailer import send_contact_email
import json
import os
import re
import time

router = APIRouter()

_contact_attempts: dict[str, list[float]] = {}
_EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=3, max_length=200)
    subject: str = Field(min_length=3, max_length=200)
    message: str = Field(min_length=10, max_length=5000)


@router.post("/contact")
async def send_contact_message(contact: ContactRequest, request: Request):
    if not _EMAIL_PATTERN.match(contact.email):
        raise HTTPException(status_code=400, detail="Invalid email format. Please check your email address.")

    client_host = request.client.host if request.client else "unknown"
    if _contact_rate_limited(client_host):
        raise HTTPException(status_code=429, detail="Too many messages. Please try again later.")

    send_contact_email(contact.name, contact.email, contact.subject, contact.message)
    return {"message": "Message sent successfully! I'll get back to you soon."}


def _contact_rate_limited(client_host: str) -> bool:
    now = time.monotonic()
    recent = [stamp for stamp in _contact_attempts.get(client_host, []) if now - stamp < 600]
    if len(recent) >= 5:
        _contact_attempts[client_host] = recent
        return True
    recent.append(now)
    _contact_attempts[client_host] = recent
    return False

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

@router.post("/resources/upload-image")
async def upload_image(file: UploadFile):
    content_type = file.content_type or ""
    extension = os.path.splitext(file.filename or "")[1].lower()
    allowed_extensions = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp"}
    if not content_type.startswith("image/") and extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="That file isn’t an image. Choose a PNG, JPG, GIF, or SVG.",
        )
    return await ResourceService.upload_image(file)

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

@router.get("/docker/california-app")
async def california_get_app_url():
    return await DockerService.california_get_app_url()


class WebhookCreate(BaseModel):
    url: str = Field(min_length=1, max_length=2000)
    level: Literal["controller", "organization"]
    type: Literal["regular", "filtered"]
    format: Literal["discord", "slack"]
    controller: str = Field(min_length=1, max_length=200)


class SmsDemoRequest(BaseModel):
    fromNumber: str = Field(min_length=1, max_length=40)
    toNumber: str = Field(min_length=1, max_length=40)
    message: str = Field(min_length=1, max_length=500)
    boxId: str = Field(min_length=1, max_length=80)
    slotId: str = Field(min_length=1, max_length=40)


@router.get("/corp/boxes")
async def get_corp_boxes():
    return await CorpService.get_boxes()


@router.get("/corp/messages")
async def get_corp_messages():
    return await CorpService.get_messages()


@router.get("/corp/webhooks")
async def get_corp_webhooks():
    try:
        return await CorpService.list_webhooks()
    except Exception as exc:
        print(f"Webhook list failed: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Could not load webhooks. Apply the Prisma schema so the Webhook table exists.",
        )


@router.post("/corp/webhooks")
async def create_corp_webhook(payload: WebhookCreate):
    try:
        return await CorpService.create_webhook({
            "url": payload.url.strip(),
            "level": payload.level,
            "type": payload.type,
            "format": payload.format,
            "controller": payload.controller,
        })
    except Exception as exc:
        print(f"Webhook create failed: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Could not save the webhook. Apply the Prisma schema so the Webhook table exists.",
        )


@router.post("/corp/sms")
async def send_corp_sms(payload: SmsDemoRequest):
    try:
        return await CorpService.send_sms_demo(
            from_number=payload.fromNumber,
            to_number=payload.toNumber,
            message=payload.message,
            box_id=payload.boxId,
            slot_id=payload.slotId,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) 