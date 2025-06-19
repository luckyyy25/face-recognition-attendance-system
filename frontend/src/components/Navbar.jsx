import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-20 top-0 left-0 backdrop-blur-lg bg-white/50 shadow-lg transition duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            FaceTrack
          </span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavItem to="/" label="Home" />
          <NavItem to="/add-face" label="Add Face" />
          <NavItem to="/logs" label="Logs" />
          <NavItem to="/camera" label="Camera" />
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-indigo-500 transition transform hover:scale-110"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md px-6 pb-4 shadow-lg">
          <NavItem to="/" label="Home" mobile />
          <NavItem to="/add-face" label="Add Face" mobile />
          <NavItem to="/logs" label="Logs" mobile />
          <NavItem to="/camera" label="Camera" mobile />
        </div>
      )}
    </nav>
  );
};

// Extracted NavItem component for cleaner code
const NavItem = ({ to, label, mobile }) => (
  <Link
    to={to}
    className={`${
      mobile ? 'block py-2 text-lg' : 'relative group font-medium text-lg'
    } text-gray-700 hover:text-indigo-500 transition`}
  >
    {label}
    {!mobile && (
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
    )}
  </Link>
);

export default Navbar;
