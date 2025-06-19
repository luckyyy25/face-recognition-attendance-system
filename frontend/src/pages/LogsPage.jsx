import { useState, useEffect } from 'react';
import axios from 'axios';


const extractName = (path) => {
  if (!path) return 'Unknown';
  const fileName = path.split('/').pop().split('.')[0];
  return fileName;
};


const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/logs")
      .then(response => setLogs(response.data))
      .catch(error => console.error("Error fetching logs:", error));
  }, []);



  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="bg-gray-100 p-10 rounded-3xl border border-gray-200 shadow-2xl w-full max-w-6xl">

        <h1 className="text-3xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Entrance / Exit Logs
        </h1>

        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full table-fixed divide-y divide-gray-200 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                 <td className="px-6 py-6 whitespace-nowrap text-left">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img
                        className="h-20 w-20 rounded-full object-cover shadow-md"
                        src={log.image ? `http://localhost:5000/${log.image}` : 'http://localhost:5000/models/default-avatar.png'}
                        alt={log.fullname || 'User'}
                        onError={(e) => {
                          if (!e.target.src.includes('default-avatar.png')) {
                            e.target.onerror = null;
                            e.target.src = 'http://localhost:5000/models/default-avatar.png';
                          }
                        }}
                      />
                    </div>
                    <div className="ml-6 text-left">
                      <div className="text-lg font-bold text-gray-900">
                        {log.fullname || extractName(log.name) || extractName(log.image)}
                      </div>
                    </div>
                  </div>
                </td>
                  <td className="px-6 py-6 whitespace-nowrap text-lg text-gray-800">{log.timestamp}</td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className={`px-5 py-2 inline-flex text-base font-semibold rounded-full
                      ${log.status === 'entry'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'}
                    `}>
                      {log.status === 'entry' ? 'Entry' : 'Exit'}
                    </span>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-10 text-gray-500 text-lg">No logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default LogsPage;
