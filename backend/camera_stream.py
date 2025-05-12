import cv2
import threading

camera = None
last_frame = None
running = False
thread = None

def update_frames():
    global last_frame, camera, running
    while running and camera and camera.isOpened():
        success, frame = camera.read()
        if success:
            last_frame = frame

def start_camera():
    global camera, running, thread
    if not running:
        camera = cv2.VideoCapture(0)
        running = True
        thread = threading.Thread(target=update_frames, daemon=True)
        thread.start()

def stop_camera():
    global running, camera
    running = False
    if camera and camera.isOpened():
        camera.release()
        camera = None

def get_latest_frame():
    return last_frame
