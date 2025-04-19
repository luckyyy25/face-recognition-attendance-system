import cv2
from deepface import DeepFace


def recognize_face(frame):
    try:
        # DeepFace kullanarak yüz tanıma yap
        result = DeepFace.find(img_path=frame, db_path="models/", enforce_detection=False)

        if result and len(result[0]) > 0:
            identity = result[0]['identity'][0]  # İlk bulunan yüzü al
            return {"status": "success", "identity": identity}
        else:
            return {"status": "failed", "message": "No face detected"}

    except Exception as e:
        return {"status": "error", "message": str(e)}


def capture_frame():
    cap = cv2.VideoCapture(0)  # Bilgisayar kamerasını aç

    if not cap.isOpened():
        return {"status": "error", "message": "Camera not found"}

    ret, frame = cap.read()  # Kare yakala
    cap.release()  # Kamerayı serbest bırak

    if ret:
        return frame  # Görüntüyü döndür
    else:
        return {"status": "error", "message": "Could not capture frame"}
