from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "DesignDNA Backend Running"
    }


@app.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...)
):
    contents = await file.read()

    np_array = np.frombuffer(
        contents,
        np.uint8
    )

    image = cv2.imdecode(
        np_array,
        cv2.IMREAD_COLOR
    )

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # -------------------------
    # Brightness
    # -------------------------
    brightness = float(
        np.mean(gray)
    )

    # -------------------------
    # Contrast
    # -------------------------
    contrast = float(
        np.std(gray)
    )

    # -------------------------
    # Sharpness
    # -------------------------
    sharpness = float(
        cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()
    )

    # -------------------------
    # Design Score
    # -------------------------
    score = 100

    # Brightness
    if brightness < 60:
        score -= 15

    elif brightness > 200:
        score -= 15

    # Contrast
    if contrast < 50:
        score -= 15

    # Sharpness
    if sharpness < 100:
        score -= 20

    score = max(score, 0)

    # -------------------------
    # AI Feedback
    # -------------------------
    feedback = []

    if brightness < 60:
        feedback.append(
            "Image is too dark. Increase brightness."
        )

    elif brightness > 200:
        feedback.append(
            "Image is too bright. Reduce exposure."
        )

    if contrast < 50:
        feedback.append(
            "Increase contrast for better visual impact."
        )

    if sharpness < 100:
        feedback.append(
            "Image appears blurry. Use a sharper image."
        )

    if len(feedback) == 0:
        feedback.append(
            "Design quality looks good."
        )

    # Quality Label
    if score >= 95:
        quality = "Excellent"

    elif score >= 80:
        quality = "Good"

    elif score >= 60:
        quality = "Average"

    else:
        quality = "Needs Improvement"

    return {
        "brightness": round(brightness, 2),
        "contrast": round(contrast, 2),
        "sharpness": round(sharpness, 2),
        "score": score,
        "quality": quality,
        "feedback": feedback
    }