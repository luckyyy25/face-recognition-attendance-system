# Flask + MongoDB + OpenCV + DeepFace
from flask import Flask, jsonify, request
from flask_cors import CORS
from face_recognition import recognize_face, capture_frame
from database import save_attendance, get_attendance, log_attendance
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

# MongoDB bağlantısı
client = MongoClient("mongodb://localhost:27017/")
db = client["face_recognition_db"]
employees_col = db["employees"]

# Fotoğrafların kaydedileceği klasör
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'models')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/')
def home():
    return "Face Recognition Attendance System Backend Running!"


@app.route('/detect', methods=['GET'])
def detect():
    frame = capture_frame()

    if isinstance(frame, dict):  # Kamera hatası kontrolü
        return jsonify(frame)

    result = recognize_face(frame)

    if result["status"] == "success":
        log_attendance(result["identity"])  # MongoDB'ye "entry"/"exit" ile kaydet

    return jsonify(result)


@app.route('/attendance', methods=['GET'])
def attendance():
    records = get_attendance()
    return jsonify(records)


@app.route('/logs', methods=['GET'])
def logs():
    records = get_attendance()
    return jsonify(records)


@app.route('/api/employees', methods=['POST'])
def register_employee():
    name = request.form.get('name')
    emp_id = request.form.get('id')
    role = request.form.get('role')
    image = request.files.get('image')

    if not all([name, emp_id, role, image]):
        return jsonify({'error': 'Missing fields'}), 400

    filename = secure_filename(f"{name.replace(' ', '_')}.jpg")
    image.save(os.path.join(UPLOAD_FOLDER, filename))

    employees_col.insert_one({
        "name": name,
        "id": emp_id,
        "role": role,
        "image": f"models/{filename}"
    })

    return jsonify({"status": "success", "message": "Employee registered successfully!"})


if __name__ == '__main__':
    app.run(debug=True)
