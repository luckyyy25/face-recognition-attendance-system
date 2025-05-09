import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddFacePage from './pages/AddFacePage';
import LogsPage from './pages/LogsPage';
import CameraPage from './pages/CameraPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
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