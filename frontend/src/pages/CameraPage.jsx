import { useEffect, useState, useRef } from 'react';

const CameraPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const audioRef = useRef(null);

  const startRecognition = async () => {
    setIsActive(true);
    await fetch('http://localhost:5000/start_camera');

    const id = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:5000/detect?ts=${Date.now()}`);
        const data = await response.json();

        if (data.status === 'success' && data.message) {
          setMessage(data.message);
          if (audioRef.current) audioRef.current.play();

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } else {
          setMessage(null);
        }
      } catch (error) {
        console.error('Face detection error:', error);
        setMessage(null);
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
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="bg-gray-100 p-10 rounded-3xl border border-gray-200 shadow-2xl w-full max-w-5xl">

        <h1 className="text-3xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Face Recognition Camera
        </h1>

        <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-[32rem] flex items-center justify-center">
          {isActive ? (
            <img
              src={`http://localhost:5000/video_feed?ts=${Date.now()}`}
              alt="Camera feed"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-white text-lg">Click below to start recognition</p>
          )}

          {isActive && message && (
            <div className={`absolute top-6 left-6 px-6 py-3 rounded-xl shadow-lg animate-bounce text-lg font-semibold
              ${message.type === 'entry' ? 'bg-green-500 text-white' : message.type === 'exit' ? 'bg-purple-500 text-white' : 'bg-yellow-500 text-white'}`}>
              <div>{message.title}</div>
              <div>{message.text}</div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={startRecognition}
            disabled={isActive}
            className={`px-10 py-4 rounded-full font-semibold text-lg transition ${
              isActive
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-indigo-700 shadow-md'
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
    </div>
  );
};

export default CameraPage;
