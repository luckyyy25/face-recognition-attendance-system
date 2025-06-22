from pymongo import MongoClient
from datetime import datetime, timedelta
import os

client = MongoClient("mongodb://localhost:27017/")
db = client["face_recognition_db"]
attendance_collection = db["attendance"]
employees_collection = db["employees"]

def get_attendance():
    records = []
    for record in attendance_collection.find({}, {"_id": 0}):
        record["image"] = record["name"]
        records.append(record)
    return records

def log_attendance(identity):
    current_time = datetime.now()


    identity_filename = os.path.basename(identity)
    identity_path = f"models/{identity_filename}"

    last_entry = attendance_collection.find_one(
        {"name": identity_path},
        sort=[("timestamp", -1)]
    )

    if last_entry:
        last_time = datetime.strptime(last_entry["timestamp"], "%Y-%m-%d %H:%M:%S")
        if current_time - last_time < timedelta(seconds=10):
            print(f"Skipping too frequent logging for {identity_path}")
            return None
        status = "exit" if last_entry.get("status") == "entry" else "entry"
    else:
        status = "entry"

    employee = employees_collection.find_one({"image": identity_path})
    if not employee:
        print(f"Employee not found for identity: {identity_path}")
        return None

    data = {
        "name": identity_path,
        "fullname": employee.get("name"),
        "role": employee.get("role"),
        "id_number": employee.get("id"),
        "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
        "status": status
    }

    attendance_collection.insert_one(data)
    print("Attendance logged with details:", data)

    return {"fullname": employee.get("name"), "status": status}
