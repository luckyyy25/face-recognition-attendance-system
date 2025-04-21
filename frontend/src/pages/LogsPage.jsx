import { useState } from 'react';

const LogsPage = () => {
  // Dummy data for demonstration
  const [logs] = useState([
    { id: 1, name: "John Doe", time: "2025-04-21 08:30:15", status: "entry", image: "/api/placeholder/40/40" },
    { id: 2, name: "Jane Smith", time: "2025-04-21 08:45:22", status: "entry", image: "/api/placeholder/40/40" },
    { id: 3, name: "Mike Johnson", time: "2025-04-21 09:05:10", status: "entry", image: "/api/placeholder/40/40" },
    { id: 4, name: "Sarah Wilson", time: "2025-04-21 12:15:45", status: "exit", image: "/api/placeholder/40/40" },
    { id: 5, name: "John Doe", time: "2025-04-21 17:05:30", status: "exit", image: "/api/placeholder/40/40" },
    { id: 6, name: "Mike Johnson", time: "2025-04-21 17:30:12", status: "exit", image: "/api/placeholder/40/40" },
    { id: 7, name: "Jane Smith", time: "2025-04-21 18:00:05", status: "exit", image: "/api/placeholder/40/40" }
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Entrance/Exit Logs</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={log.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{log.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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