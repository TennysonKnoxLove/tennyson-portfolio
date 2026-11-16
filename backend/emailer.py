import json
import os
import urllib.error
import urllib.request

from fastapi import HTTPException

EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send"
DIRECT_ADDRESS = "tennysonknoxlove@gmail.com"


def send_contact_email(name: str, email: str, subject: str, message: str) -> None:
    service_id = os.getenv("EMAILJS_SERVICE_ID", "").strip()
    template_id = os.getenv("EMAILJS_TEMPLATE_ID", "").strip()
    public_key = os.getenv("EMAILJS_PUBLIC_KEY", "").strip()
    if not service_id or not template_id or not public_key:
        raise HTTPException(status_code=503, detail="Email is not configured.")

    payload = {
        "service_id": service_id,
        "template_id": template_id,
        "user_id": public_key,
        "template_params": {
            "from_name": name,
            "from_email": email,
            "subject": subject,
            "message": message,
        },
    }
    status = _post_emailjs(payload)
    if status == 200:
        return
    if status == 412:
        raise HTTPException(
            status_code=503,
            detail=(
                "Couldn't send your message. The email account needs to be reconnected. "
                f"Please email {DIRECT_ADDRESS} directly."
            ),
        )
    if status == 422:
        raise HTTPException(status_code=400, detail="Invalid email format. Please check your email address.")
    if status == 400:
        raise HTTPException(status_code=400, detail="Missing required information. Please fill all fields.")
    raise HTTPException(
        status_code=502,
        detail=f"Couldn't send your message. Please try again, or email {DIRECT_ADDRESS} directly.",
    )


def _post_emailjs(payload: dict) -> int:
    request = urllib.request.Request(
        EMAILJS_URL,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            return response.status
    except urllib.error.HTTPError as error:
        print(f"EmailJS request failed with status {error.code}")
        return error.code
    except urllib.error.URLError:
        print("EmailJS request could not be completed")
        raise HTTPException(
            status_code=502,
            detail=f"Couldn't send your message. Please try again, or email {DIRECT_ADDRESS} directly.",
        ) from None
