import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-blue-600">FaceTrack</Link>
          <div className="flex space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/add-face" className="px-3 py-2 text-gray-700 hover:text-blue-600">Add Face</Link>
            <Link to="/logs" className="px-3 py-2 text-gray-700 hover:text-blue-600">Logs</Link>
            <Link to="/camera" className="px-3 py-2 text-gray-700 hover:text-blue-600">Camera</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;