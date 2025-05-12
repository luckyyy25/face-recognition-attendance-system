# Face Recognition Attendance System

A modern solution for tracking attendance through facial recognition technology. This system uses computer vision to detect and recognize faces, and automatically logs attendance records into a database.

## Features

- **Face Detection & Recognition**: Automatically detect and recognize registered faces
- **Real-time Monitoring**: Live camera feed with real-time face recognition
- **Attendance Logging**: Automatically record entry and exit times
- **User Management**: Easily register new faces with additional information
- **Attendance History**: View logs of all attendance records

## Tech Stack

### Backend
- **Python/Flask**: RESTful API server
- **OpenCV**: Computer vision for face detection
- **DeepFace**: Deep learning framework for face recognition
- **MongoDB**: Database for storing user info and attendance records

### Frontend
- **React**: Modern UI framework
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router**: Navigation between pages

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- Webcam/camera device

### Backend Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/face-recognition-attendance.git
   cd face-recognition-attendance
   ```

2. Set up Python virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install backend dependencies
   ```
   cd backend
   pip install -r requirements.txt
   ```

4. Start MongoDB service
   ```
   # Instructions vary by operating system
   # For Ubuntu: sudo systemctl start mongodb
   # For macOS with Homebrew: brew services start mongodb-community
   ```

5. Start the Flask server
   ```
   python app.py
   ```
   The backend should now be running at http://localhost:5000

### Frontend Setup

1. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

2. Start the React development server
   ```
   npm start
   ```
   The frontend should now be running at http://localhost:3000

## Usage

1. **Register New Faces**
   - Navigate to the "Add Face" page
   - Fill in the user's details and upload a clear photo of their face
   - Click "Register Face"

2. **Start Face Recognition**
   - Navigate to the "Camera" page
   - Click "Start Recognition"
   - The system will start detecting and recognizing faces in the camera feed
   - When a registered face is detected, the system will log the attendance

3. **View Attendance Logs**
   - Navigate to the "Logs" page
   - Browse through the history of attendance records
   - Each record shows the user, timestamp, and entry/exit status

## Project Structure

```
face-recognition-attendance/
├── backend/
│   ├── app.py                # Main Flask application
│   ├── camera_stream.py      # Camera handling
│   ├── database.py           # MongoDB interactions
│   ├── face_recognition.py   # Face detection and recognition
│   └── models/               # Face recognition models & user images
├── frontend/
│   ├── public/               # Static files
│   └── src/
│       ├── components/       # React components
│       ├── context/          # Context providers
│       ├── pages/            # Page components
│       └── App.js            # Main React app
└── README.md
```

## API Endpoints

- `GET /`: Backend status check
- `GET /detect`: Perform face recognition on current camera frame
- `GET /attendance` or `GET /logs`: Get attendance records
- `POST /api/employees`: Register a new employee/face
- `GET /video_feed`: Live camera stream
- `GET /start_camera`: Start camera capture
- `GET /stop_camera`: Stop camera capture

## Troubleshooting

- **Camera not working**: Ensure your camera is properly connected and no other application is using it
- **Face not recognized**: Try improving lighting conditions and ensure face is clearly visible
- **Backend connection errors**: Check if MongoDB is running and Flask server is started
- **Missing dependencies**: Make sure all Python packages and Node modules are installed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenCV and DeepFace libraries for face recognition capabilities
- MongoDB for efficient data storage
- React and TailwindCSS for the modern UI