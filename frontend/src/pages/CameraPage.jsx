import { useEffect, useState, useRef } from 'react';

const CameraPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const audioRef = useRef(null);

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

          // 5 saniye sonra mesajı kaldır
          setTimeout(() => {
            setIdentity(null);
          }, 5000);
        } else {
          // Tanıma başarısızsa kimliği sıfırla
          setIdentity(null);
        }
      } catch (error) {
        console.error('Face detection error:', error);
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
      stopCamera(); // sayfa terk edildiğinde kamera durdurulsun
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Face Recognition Camera</h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative">
          <div className="bg-gray-800 w-full h-96 rounded-lg flex items-center justify-center overflow-hidden relative">
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
