from flask import Flask, jsonify, request, Response, send_from_directory
from flask_cors import CORS
from face_recognition import recognize_face
from database import get_attendance, log_attendance
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from camera_stream import get_latest_frame, start_camera, stop_camera
import cv2
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# MongoDB bağlantısı
client = MongoClient("mongodb://localhost:27017/")
db = client["face_recognition_db"]
employees_col = db["employees"]

# Fotoğraf klasörü
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'models')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Ana endpoint
@app.route('/')
def home():
    return "Face Recognition Attendance System Backend Running!"

# Yüz tanıma endpointi
@app.route('/detect', methods=['GET'])
def detect():
    result = recognize_face()
    if result["status"] == "success":
        attendance_result = log_attendance(result["identity"])
        if attendance_result:
            if attendance_result['status'] == 'entry':
                result["message"] = {
                    "title": "Welcome Back!",
                    "text": f"Nice to see you again, {attendance_result['fullname']}!",
                    "type": "entry"
                }
            else:
                result["message"] = {
                    "title": "Goodbye!",
                    "text": f"Take care, {attendance_result['fullname']}!",
                    "type": "exit"
                }
        else:
            # 1 dakika limiti nedeniyle log atlanmışsa:
            result["message"] = None
    else:
        result["message"] = None  # Başarısız tanıma durumunda da message boş olsun

    return jsonify(result)



@app.route('/models/<path:filename>')
def serve_model_file(filename):
    return send_from_directory('models', filename)

# Katılım ve log kayıtlarını getir
@app.route('/attendance', methods=['GET'])
@app.route('/logs', methods=['GET'])
def attendance():
    return jsonify(get_attendance())

# Yeni çalışan/fotoğraf ekleme
@app.route('/api/employees', methods=['POST'])
def register_employee():
    name = request.form.get('name')
    emp_id = request.form.get('id')
    role = request.form.get('role')
    image = request.files.get('image')

    if not all([name, emp_id, role, image]):
        return jsonify({'error': 'Missing fields'}), 400

    # 🔥 Artık isimde boşluk kalıyor, alt çizgi koymuyoruz
    filename = secure_filename(name) + ".jpg"
    image.save(os.path.join(UPLOAD_FOLDER, filename))

    employees_col.insert_one({
        "name": name,
        "id": emp_id,
        "role": role,
        "image": f"models/{filename}"
    })

    return jsonify({"status": "success", "message": "Employee registered successfully!"})

# Kamera akışı için endpoint
@app.route('/video_feed')
def video_feed():
    def generate_frames():
        while True:
            frame = get_latest_frame()
            if frame is None:
                continue
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                continue
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Kamera durdurma endpointi
@app.route('/stop_camera')
def stop_camera_route():
    stop_camera()
    return jsonify({"status": "camera stopped"})

@app.route('/start_camera')
def start_camera_route():
    start_camera()
    return jsonify({"status": "camera started"})


if __name__ == '__main__':
    app.run(debug=True)
