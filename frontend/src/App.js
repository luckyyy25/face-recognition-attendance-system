import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddFacePage from './pages/AddFacePage';
import LogsPage from './pages/LogsPage';
import CameraPage from './pages/CameraPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        <Navbar />
        <div className="pt-24 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-face" element={<AddFacePage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/camera" element={<CameraPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
