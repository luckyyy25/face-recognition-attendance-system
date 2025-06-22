# Face Recognition Attendance System

A comprehensive attendance tracking solution that leverages facial recognition technology to automatically monitor and log attendance. The system provides real-time face detection and recognition with an intuitive web-based interface for managing users and viewing attendance records.

## Key Features

**Automated Face Recognition**
- Real-time face detection using OpenCV's Haar cascade classifiers
- Advanced face recognition powered by DeepFace deep learning framework
- Automatic entry and exit logging with timestamp tracking
- Smart duplicate prevention with 1-minute minimum intervals between logs

**User Management**
- Easy registration of new faces with personal information
- Support for multiple user roles: Employee, Manager, Intern
- Image upload and preview functionality
- Secure file handling with proper validation

**Attendance Tracking**
- Comprehensive attendance history with entry/exit status
- Real-time visual feedback for recognized faces
- MongoDB-based data persistence
- Detailed logs with user information and timestamps

**Modern Web Interface**
- Responsive React-based frontend with TailwindCSS styling
- Live camera feed with overlay notifications
- Interactive dashboard with quick access to all features
- Mobile-friendly design with glassmorphism UI effects

## Technology Stack

### Backend Architecture
- **Flask**: Lightweight Python web framework for RESTful API
- **OpenCV**: Computer vision library for image processing and face detection
- **DeepFace**: Facebook's deep learning framework for face recognition
- **MongoDB**: NoSQL database for storing user profiles and attendance records
- **pymongo**: Python MongoDB driver for database operations

### Frontend Architecture
- **React 18**: Modern JavaScript framework with hooks and functional components
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **Axios**: Promise-based HTTP client for API communication
- **React Router**: Declarative routing for single-page application navigation
- **React Icons**: Comprehensive icon library for UI elements

## System Requirements

### Hardware Requirements
- Webcam or USB camera device
- Minimum 4GB RAM (8GB recommended)
- 2GB available disk space
- Processor: Intel i3 or AMD equivalent (i5+ recommended)

### Software Prerequisites
- Python 3.8 or higher
- Node.js 16.0 or higher
- MongoDB 4.4 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Guide

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/face-recognition-attendance.git
   cd face-recognition-attendance
   ```

### Backend Configuration

2. **Create Python Virtual Environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Configure MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```

5. **Start Flask Server**
   ```bash
   python app.py
   ```
   The backend API will be available at http://localhost:5000

### Frontend Configuration

6. **Install Node.js Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start React Development Server**
   ```bash
   npm start
   ```
   The frontend application will be available at http://localhost:3000

## Usage Instructions

### Registering New Users

1. Navigate to the "Add Face" section in the web interface
2. Complete the registration form with the following information:
   - Full Name: User's complete name
   - ID Number: Unique identifier (employee ID,  ID, etc.)
   - Role: Select from Employee, Manager, or Intern
   - Photo: Upload a clear, front-facing photograph
3. Submit the form to register the user in the system

### Operating Face Recognition

1. Go to the "Camera" section
2. Click "Start Recognition" to activate the camera feed
3. Position users in front of the camera for face detection
4. The system will automatically:
   - Detect faces in the camera feed
   - Match faces against registered users
   - Log attendance with entry/exit status
   - Display confirmation messages for recognized users

### Viewing Attendance Records

1. Access the "Logs" section to view attendance history
2. Review comprehensive records including:
   - User photographs and names
   - Timestamp of each entry/exit
   - Status indicators (entry in green, exit in red)
   - Chronological ordering of all attendance events

## Project Architecture

```
face-recognition-attendance/
├── backend/
│   ├── app.py                    # Main Flask application and API routes
│   ├── camera_stream.py          # Camera handling and frame management
│   ├── database.py               # MongoDB operations and data management
│   ├── face_recognition.py       # Face detection and recognition logic
│   ├── requirements.txt          # Python package dependencies
│   └── models/                   # Directory for face recognition models and user images
├── frontend/
│   ├── public/                   # Static assets and HTML template
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   └── Navbar.jsx        # Navigation component
│   │   ├── context/              # React context providers
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/                # Main page components
│   │   │   ├── HomePage.jsx      # Dashboard and navigation
│   │   │   ├── AddFacePage.jsx   # User registration form
│   │   │   ├── CameraPage.jsx    # Face recognition interface
│   │   │   └── LogsPage.jsx      # Attendance history viewer
│   │   ├── App.js                # Main React application
│   │   ├── index.js              # Application entry point
│   │   └── index.css             # Global styles and animations
│   ├── package.json              # Node.js dependencies and scripts
│   └── tailwind.config.js        # TailwindCSS configuration
├── .gitignore                    # Git ignore patterns
└── README.md                     # Project documentation
```

## API Documentation

### Core Endpoints

**GET /** - System status check
- Returns backend operational status

**GET /detect** - Face recognition
- Performs face detection and recognition on current camera frame
- Returns recognition results with user identity and status

**GET /logs** - Attendance records
- Retrieves all attendance records from database
- Returns chronological list of entry/exit events

**POST /api/employees** - User registration
- Accepts form data with user information and photograph
- Creates new user profile in database
- Stores face recognition data for future matching

**GET /video_feed** - Live camera stream
- Provides real-time video feed from camera
- Returns MJPEG stream for web display

**GET /start_camera** - Initialize camera
- Activates camera capture system
- Prepares system for face recognition

**GET /stop_camera** - Terminate camera
- Safely stops camera capture
- Releases camera resources

## Database Schema

### Users Collection (employees)
```javascript
{
  "_id": ObjectId,
  "name": "User Full Name",
  "id": "Unique Identifier",
  "role": "employee|manager|intern",
  "image": "models/filename.jpg"
}
```

### Attendance Collection
```javascript
{
  "_id": ObjectId,
  "name": "models/filename.jpg",
  "fullname": "User Full Name",
  "role": "employee|manager|intern",
  "timestamp": "YYYY-MM-DD HH:MM:SS",
  "status": "entry|exit"
}
```

## Troubleshooting Guide

### Common Issues and Solutions

**Camera Access Problems**
- Verify camera is properly connected and recognized by system
- Ensure no other applications are using the camera
- Check camera permissions in browser settings
- Try different USB ports or camera devices

**Face Recognition Accuracy**
- Ensure adequate lighting conditions
- Position face directly toward camera
- Maintain consistent distance from camera
- Use high-quality images during registration
- Avoid excessive background clutter

**Database Connection Errors**
- Verify MongoDB service is running
- Check database connection string in configuration
- Ensure proper database permissions
- Restart MongoDB service if necessary

**API Communication Issues**
- Confirm Flask server is running on port 5000
- Check firewall settings for port access
- Verify CORS configuration for cross-origin requests
- Review browser console for network errors

**Performance Optimization**
- Reduce camera resolution if processing is slow
- Limit number of concurrent face recognition requests
- Optimize image sizes during user registration
- Consider hardware upgrades for better performance

## Security Considerations

### Data Protection
- User photographs are stored locally in the models directory
- Database does not store sensitive personal information beyond basic identifiers
- All API endpoints use CORS protection
- File uploads are validated and sanitized

### Access Control
- System currently operates without authentication (suitable for internal networks)
- Consider implementing user authentication for production environments
- Restrict API access to authorized clients only
- Regular backup of user data and attendance records

## Development and Customization

### Adding New Features
- Extend API endpoints in `backend/app.py`
- Create new React components in `frontend/src/components/`
- Modify database schema in `backend/database.py`
- Update UI styling in TailwindCSS configuration

### Configuration Options
- Adjust face recognition threshold in `face_recognition.py`
- Modify attendance logging intervals in `database.py`
- Customize UI colors and themes in `tailwind.config.js`
- Configure camera settings in `camera_stream.py`

## Contributing Guidelines

1. Fork the repository and create a feature branch
2. Follow existing code style and conventions
3. Add appropriate tests for new functionality
4. Update documentation for any API changes
5. Submit pull request with detailed description of changes

## License and Acknowledgments

This project is licensed under the MIT License, allowing for both personal and commercial use with proper attribution.

### Third-Party Libraries
- OpenCV for computer vision capabilities
- DeepFace for advanced face recognition algorithms
- MongoDB for reliable data storage
- React ecosystem for modern web development
- TailwindCSS for responsive design framework
