import { useEffect, useState, useRef } from 'react';

const CameraPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [showCrowdWarning, setShowCrowdWarning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const audioRef = useRef(null);
  const crowdAudioRef = useRef(null);
  const CROWD_LIMIT = 2; // easily changeable limit

  const startRecognition = async () => {
    setIsActive(true);
    await fetch('http://localhost:5000/start_camera');

    const id = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:5000/detect?ts=${Date.now()}`);
        const data = await response.json();

        if (data.status === 'success') {
          const name = data.identity.split('/').pop().split('.')[0];
          setIdentity(name);
          if (audioRef.current) audioRef.current.play();

          setTimeout(() => {
            setIdentity(null);
          }, 5000);
        } else {
          setIdentity(null);
        }

        // Crowd detection logic
        const facesResponse = await fetch(`http://localhost:5000/faces_count?ts=${Date.now()}`);
        const facesData = await facesResponse.json();
        if (facesData.count > CROWD_LIMIT) {
          if (!showCrowdWarning) {
            setShowCrowdWarning(true);
            if (crowdAudioRef.current) crowdAudioRef.current.play();
            setTimeout(() => {
              setShowCrowdWarning(false);
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setIdentity(null);
      }
    }, 4000);

    setIntervalId(id);
  };

  const stopCamera = async () => {
    try {
      await fetch('http://localhost:5000/stop_camera');
    } catch (error) {
      console.error('Failed to stop camera:', error);
    }
    clearInterval(intervalId);
    setIsActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Face Recognition Camera</h1>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md relative">
        <div className="relative bg-gray-800 dark:bg-black w-full h-96 rounded-lg flex items-center justify-center overflow-hidden">
          {isActive ? (
            <img
              src={`http://localhost:5000/video_feed?ts=${Date.now()}`}
              alt="Camera feed"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-white text-lg">Click the button to start camera</p>
          )}

          {isActive && identity && (
            <div className="absolute top-5 left-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-bounce z-20">
              Welcome, <strong>{identity}</strong>
            </div>
          )}

          {showCrowdWarning && (
            <div className="absolute inset-0 bg-red-600 bg-opacity-80 flex items-center justify-center z-30">
              <h2 className="text-4xl font-bold text-white">⚠ CROWD DETECTED</h2>
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

      <audio ref={audioRef}>
        <source
          src="https://www.myinstants.com/media/sounds/mouse-click.mp3"
          type="audio/mpeg"
        />
      </audio>

      <audio ref={crowdAudioRef}>
        <source
          src="https://www.myinstants.com/media/sounds/alarm.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default CameraPage;
