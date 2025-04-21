import { useState, useEffect } from 'react';
import axios from 'axios';

const CameraPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [detection, setDetection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recognitionInterval, setRecognitionInterval] = useState(null);

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (recognitionInterval) {
        clearInterval(recognitionInterval);
      }
    };
  }, [recognitionInterval]);

  const startRecognition = () => {
    setIsActive(true);
    setLoading(true);
    setError(null);
    
    // Perform initial detection
    performDetection();
    
    // Set up interval for continuous detection
    const interval = setInterval(() => {
      performDetection();
    }, 5000); // Check every 5 seconds
    
    setRecognitionInterval(interval);
  };

  const stopRecognition = () => {
    setIsActive(false);
    setDetection(null);
    
    if (recognitionInterval) {
      clearInterval(recognitionInterval);
      setRecognitionInterval(null);
    }
  };

  const performDetection = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/detect');
      
      if (response.data.status === 'success') {
        setDetection({
          name: response.data.identity,
          status: response.data.status
        });
      } else {
        setDetection(null);
        setError(response.data.message || 'Recognition failed');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Detection error:', err);
      setError('Failed to connect to detection service');
      setLoading(false);
      stopRecognition();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Face Recognition Camera</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative">
          {/* Camera feed placeholder */}
          <div className="bg-gray-800 w-full h-96 rounded-lg flex items-center justify-center">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {!isActive ? (
              <p className="text-white text-lg">Camera feed will appear here</p>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white text-lg">Camera active - Looking for faces...</p>
              </div>
            )}
            
            {/* Detection box overlay */}
            {isActive && detection && (
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-green-500 rounded-lg flex flex-col justify-end">
                <div className="bg-green-500 text-white p-2">
                  <p className="font-bold">{detection.name}</p>
                  <p className="text-sm">Identity confirmed</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-2 rounded">
                <p>{error}</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-center space-x-4">
            {!isActive ? (
              <button
                onClick={startRecognition}
                className="px-6 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Recognition
              </button>
            ) : (
              <button
                onClick={stopRecognition}
                className="px-6 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white"
              >
                Stop Recognition
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;