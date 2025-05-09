import { useState } from 'react';

const CameraPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [detections, setDetections] = useState([]);

  const startRecognition = () => {
    setIsActive(true);
    // Simulate detection after 2 seconds
    setTimeout(() => {
      setDetections([{ name: "John Doe", confidence: "98.5%" }]);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Face Recognition Camera</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative">
          {/* Camera feed placeholder */}
          <div className="bg-gray-800 w-full h-96 rounded-lg flex items-center justify-center">
            {!isActive ? (
              <p className="text-white text-lg">Camera feed will appear here</p>
            ) : (
              <img 
                src="/api/placeholder/800/500" 
                alt="Camera feed" 
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            
            {/* Detection box overlay */}
            {isActive && detections.length > 0 && (
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-green-500 rounded-lg flex flex-col justify-end">
                <div className="bg-green-500 text-white p-2">
                  <p className="font-bold">{detections[0].name}</p>
                  <p className="text-sm">Confidence: {detections[0].confidence}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-center">
            <button
              onClick={startRecognition}
              disabled={isActive}
              className={`px-6 py-2 rounded-lg font-medium ${
                isActive 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isActive ? 'Recognition Active' : 'Start Recognition'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;