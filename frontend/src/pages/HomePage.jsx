const HomePage = () => {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Face Recognition Attendance System</h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern solution for tracking attendance through facial recognition technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Add New Users</h2>
            <p className="text-gray-600 mb-4">Register new faces to the system with personal information.</p>
            <a href="/add-face" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Register Face
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">View Attendance</h2>
            <p className="text-gray-600 mb-4">Check entrance and exit logs of registered users.</p>
            <a href="/logs" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Logs
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Start Recognition</h2>
            <p className="text-gray-600 mb-4">Open camera view to start recognizing faces.</p>
            <a href="/camera" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Camera
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;