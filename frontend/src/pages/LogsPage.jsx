import { useState, useEffect } from 'react';
import axios from 'axios';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/logs")
      .then(response => setLogs(response.data))
      .catch(error => console.error("Error fetching logs:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Entrance/Exit Logs</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={log.image
                          ? `http://localhost:5000/${log.image}`
                          : 'http://localhost:5000/models/default-avatar.png'}
                        alt={log.fullname || log.name || 'User'}
                        onError={(e) => {
                          if (!e.target.src.includes('default-avatar.png')) {
                            e.target.onerror = null;
                            e.target.src = 'http://localhost:5000/models/default-avatar.png';
                          }
                        }}
                      />
                    </div>
                    <div className="ml-5">
                      <div className="text-lg font-medium text-gray-900">{log.fullname || log.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="text-base text-gray-800">{log.timestamp}</div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-sm leading-6 font-semibold rounded-full ${
                    log.status === 'entry' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {log.status === 'entry' ? 'Entry' : 'Exit'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
