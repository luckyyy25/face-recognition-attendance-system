import cv2
from deepface import DeepFace
from camera_stream import get_latest_frame

def recognize_face():
    try:
        frame = get_latest_frame()
        if frame is None:
            return {"status": "error", "message": "No camera frame available"}

        # Gri görüntüye çevir
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Haar cascade ile yüz algıla
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        if len(faces) == 0:
            return {"status": "failed", "message": "No face detected"}

        # DeepFace ile tanıma yap
        result = DeepFace.find(img_path=frame, db_path="models/", enforce_detection=False)
        if result and len(result[0]) > 0:
            identity_path = result[0]['identity'][0]
            identity_filename = identity_path.split("/")[-1]
            return {"status": "success", "identity": f"models/{identity_filename}"}
        else:
            return {"status": "failed", "message": "Face not recognized"}

    except Exception as e:
        return {"status": "error", "message": str(e)}
