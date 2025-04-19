#flask
#react
#mongodb
#opencv
#deepface


from flask import Flask, jsonify
from flask_cors import CORS
from face_recognition import recognize_face, capture_frame
from database import save_attendance, get_attendance

app = Flask(__name__)
CORS(app)


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
        save_attendance(result["identity"])  # MongoDB'ye kaydet

    return jsonify(result)


@app.route('/attendance', methods=['GET'])
def attendance():
    records = get_attendance()
    return jsonify(records)


if __name__ == '__main__':
    app.run(debug=True)
