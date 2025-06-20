import { FaUserPlus, FaClipboardList, FaCamera } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-25rem)] bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        <div className="bg-white/40 backdrop-blur-md p-10 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-center mb-6 text-primary text-5xl">
            <FaUserPlus />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Add New Users</h2>
          <p className="text-gray-700 mb-6">
            Register new users and their facial data quickly.
          </p>
          <a href="/add-face" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition">
            Register Face
          </a>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-10 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-center mb-6 text-success text-5xl">
            <FaClipboardList color="#F3D5BD"  />
          </div>
          <h2 className="text-2xl font-semibold mb-3">View Attendance</h2>
          <p className="text-gray-700 mb-6">
            Monitor attendance records and logs easily.
          </p>
          <a href="/logs" className="inline-block bg-[#F3D5BD] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition">
         View Logs
        </a>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-10 rounded-3xl shadow-lg hover:scale-105 transition">
          <div className="flex justify-center mb-6 text-secondary text-5xl">
            <FaCamera />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Start Recognition</h2>
          <p className="text-gray-700 mb-6">
            Activate real-time face recognition instantly.
          </p>
          <a href="/camera" className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition">
            Start Camera
          </a>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
