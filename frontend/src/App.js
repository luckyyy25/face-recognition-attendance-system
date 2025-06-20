import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddFacePage from './pages/AddFacePage';
import LogsPage from './pages/LogsPage';
import CameraPage from './pages/CameraPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="pt-24 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-face" element={<AddFacePage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/camera" element={<CameraPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
