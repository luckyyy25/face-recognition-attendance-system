import { useState, useEffect } from 'react';
import axios from 'axios';

const LogsPage = () => {
  const [logsByDate, setLogsByDate] = useState({});
  const [expandedDates, setExpandedDates] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/logs")
      .then(response => {
        const groupedLogs = {};

        response.data.forEach(log => {
          const date = log.timestamp.split(' ')[0];
          if (!groupedLogs[date]) {
            groupedLogs[date] = [];
          }
          groupedLogs[date].push(log);
        });

        setLogsByDate(groupedLogs);
      })
      .catch(error => console.error("Error fetching logs:", error));
  }, []);

  const toggleDate = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const getDayName = (dateString) => {
    const options = { weekday: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Entrance/Exit Logs</h1>

      {Object.keys(logsByDate).sort((a, b) => b.localeCompare(a)).map(date => (
        <div key={date} className="mb-4 border rounded-lg shadow dark:border-gray-700">
          <div
            onClick={() => toggleDate(date)}
            className="cursor-pointer bg-gray-200 dark:bg-gray-800 px-6 py-4 font-semibold text-lg flex justify-between items-center"
          >
            <span className="dark:text-white">{date} ({getDayName(date)})</span>
            <span className="dark:text-white">{expandedDates[date] ? '▲' : '▼'}</span>
          </div>

          {expandedDates[date] && (
            <div className="bg-white dark:bg-gray-900">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {logsByDate[date].map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-full object-cover"
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
                          <div className="ml-4">
                            <div className="text-lg font-medium text-gray-900 dark:text-white">{log.fullname || log.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800 dark:text-gray-300">{log.id_number || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800 dark:text-gray-300">{log.role || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800 dark:text-gray-300">{log.timestamp.split(' ')[1]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-sm leading-6 font-semibold rounded-full ${
                          log.status === 'entry'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status === 'entry' ? 'Entry' : 'Exit'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LogsPage;
