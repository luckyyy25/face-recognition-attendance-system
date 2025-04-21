import cv2
import face_recognition
import os

# Folder containing known face images
KNOWN_FACES_DIR = "models/"

# Load known faces on startup
known_face_encodings = []
known_face_names = []

# Load sample faces from models directory
for filename in os.listdir(KNOWN_FACES_DIR):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        # Get the person's name from the filename
        name = os.path.splitext(filename)[0]
        
        # Load image file
        image_path = os.path.join(KNOWN_FACES_DIR, filename)
        image = face_recognition.load_image_file(image_path)
        
        # Try to get face encodings (might fail if no face found)
        try:
            encoding = face_recognition.face_encodings(image)[0]
            known_face_encodings.append(encoding)
            known_face_names.append(name)
            print(f"Loaded face model for: {name}")
        except IndexError:
            print(f"No face found in {filename}")

def recognize_face(frame):
    try:
        # Convert the image from BGR color (OpenCV) to RGB (face_recognition)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Find all face locations and encodings in the current frame
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
        
        # If no faces are found
        if not face_encodings:
            return {"status": "failed", "message": "No face detected"}
        
        for face_encoding in face_encodings:
            # Compare face with known faces
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            
            # Use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            if len(face_distances) > 0:
                best_match_index = face_distances.argmin()
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]
                    return {"status": "success", "identity": name}
        
        # If we got here, no match was found
        return {"status": "failed", "message": "Unknown person"}

    except Exception as e:
        return {"status": "error", "message": str(e)}

def capture_frame():
    cap = cv2.VideoCapture(0)  # Open computer camera
    
    if not cap.isOpened():
        return {"status": "error", "message": "Camera not found"}
    
    ret, frame = cap.read()  # Capture frame
    cap.release()  # Release camera
    
    if ret:
        return frame  # Return the image
    else:
        return {"status": "error", "message": "Could not capture frame"}