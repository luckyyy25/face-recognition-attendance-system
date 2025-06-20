from pymongo import MongoClient
from datetime import datetime, timedelta

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

    last_entry = attendance_collection.find_one(
        {"name": identity},
        sort=[("timestamp", -1)]
    )

    # Eğer daha önce giriş yapılmışsa
    if last_entry:
        last_time = datetime.strptime(last_entry["timestamp"], "%Y-%m-%d %H:%M:%S")
        if current_time - last_time < timedelta(minutes=1):
            print(f"Skipping too frequent logging for {identity}")
            return None  # 1 dk kuralı: log kaydedilmiyor
        status = "exit" if last_entry.get("status") == "entry" else "entry"
    else:
        status = "entry"

    employee = employees_collection.find_one({"image": identity})
    if not employee:
        print(f"Employee not found for identity: {identity}")
        return None

    data = {
        "name": identity,
        "fullname": employee.get("name"),
        "role": employee.get("role"),
        "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
        "status": status
    }

    attendance_collection.insert_one(data)
    print("Attendance logged with details:", data)

    return {"fullname": employee.get("name"), "status": status}
