from pymongo import MongoClient
from datetime import datetime, timedelta

# MongoDB bağlantısını kur
client = MongoClient("mongodb://localhost:27017/")
db = client["face_recognition_db"]  # Veritabanı adı
collection = db["attendance"]  # Kayıtların tutulacağı koleksiyon

def save_attendance(name):
    """Giriş/Çıkış bilgisini de içeren katılım kaydı ekler."""
    # Şu anki zamanı al
    current_time = datetime.now()

    # Son kaydı kontrol et
    last_entry = collection.find_one({"name": name}, sort=[("timestamp", -1)])

    # Varsayılan olarak giriş ("entry") belirle
    status = "entry"

    if last_entry:
        last_time = datetime.strptime(last_entry["timestamp"], "%Y-%m-%d %H:%M:%S")

        # Eğer kişi son 5 dakika içinde kaydedildiyse, yeni kayıt ekleme
        if current_time - last_time < timedelta(minutes=5):
            print(f"Skipping duplicate entry for {name}")
            return

        # Eğer son kayıt "entry" ise, bu "exit" olacak
        if last_entry.get("status") == "entry":
            status = "exit"

    # Yeni veriyi oluştur ve MongoDB'ye kaydet
    data = {
        "name": name,
        "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
        "status": status
    }

    collection.insert_one(data)
    print("Attendance logged:", data)  # Debugging için

    return {"status": "success", "message": f"Attendance saved for {name}", "entry_type": status}

def get_attendance():
    """Veritabanındaki tüm kayıtları getirir."""
    records = list(collection.find({}, {"_id": 0}))
    return records

def log_attendance(identity):
    """Giriş-Çıkış takibini yapar ve MongoDB'ye kaydeder."""
    current_time = datetime.now()

    # Son kaydı kontrol et
    last_entry = collection.find_one({"name": identity}, sort=[("timestamp", -1)])

    # Varsayılan olarak giriş (entry) belirle
    status = "entry"

    if last_entry:
        last_time = datetime.strptime(last_entry["timestamp"], "%Y-%m-%d %H:%M:%S")

        # Eğer son 5 dakika içinde kayıt varsa, yeni kayıt ekleme
        if current_time - last_time < timedelta(minutes=5):
            print(f"Skipping duplicate entry for {identity}")
            return

        # Eğer son kayıtta giriş (entry) varsa, çıkış (exit) olarak güncelle
        if last_entry.get("status") == "entry":
            status = "exit"

    # Yeni veriyi oluştur ve MongoDB'ye kaydet
    data = {
        "name": identity,
        "timestamp": current_time.strftime("%Y-%m-%d %H:%M:%S"),
        "status": status
    }

    collection.insert_one(data)
    print("Attendance logged:", data)  # Debugging için
