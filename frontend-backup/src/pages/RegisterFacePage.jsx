import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import { FaCamera, FaUser, FaEnvelope, FaIdCard, FaPhone } from 'react-icons/fa';

const RegisterFacePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    phone: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    // Kamera açılır
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError('Camera access denied or not available');
      }
    };
    startCamera();
  }, []);

  const captureFace = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.employeeId || !formData.phone || !capturedImage) {
      setError('Please fill all fields and capture your face');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // API isteği simülasyonu
      setTimeout(() => {
        console.log('Registered:', { ...formData, face: capturedImage });
        setSuccess(true);
        setLoading(false);
        setFormData({
          name: '',
          email: '',
          employeeId: '',
          phone: '',
          department: ''
        });
        setCapturedImage(null);
      }, 1500);
    } catch (err) {
      setError('An error occurred while submitting data.');
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {sidebarOpen && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Register Face</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Alanı */}
            <div className="bg-white p-6 rounded-lg shadow">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && <div className="text-red-600">{error}</div>}
                {success && <div className="text-green-600">Registration successful!</div>}

                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Employee ID"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-indigo-600"
                >
                  {loading ? 'Registering...' : 'Register Face'}
                </button>
              </form>
            </div>

            {/* Kamera Alanı */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-md shadow mb-4" />
              <canvas ref={canvasRef} className="hidden" />
              <button
                onClick={captureFace}
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
              >
                <FaCamera className="mr-2" />
                Capture Face
              </button>
              {capturedImage && (
                <img src={capturedImage} alt="Captured Face" className="mt-4 rounded-md border w-48 h-auto" />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterFacePage;