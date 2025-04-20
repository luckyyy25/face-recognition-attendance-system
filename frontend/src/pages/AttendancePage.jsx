import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import { useAttendance } from '../contexts/AttendanceContext';
import { FaCamera, FaSearch, FaCalendarAlt, FaUserCheck, FaUserClock } from 'react-icons/fa';
import { format } from 'date-fns';

const AttendancePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [statusFilter, setStatusFilter] = useState('all');
  const { attendanceRecords, loading, error, recordAttendance, lastDetectedPerson } = useAttendance();
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureResult, setCaptureResult] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCapture = async () => {
    setCaptureLoading(true);
    setCaptureResult(null);
    
    try {
      const result = await recordAttendance();
      setCaptureResult(result);
    } catch (err) {
      setCaptureResult({ success: false, message: 'An error occurred' });
    } finally {
      setCaptureLoading(false);
    }
  };

  // Filter records based on search, date, and status
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(filter.toLowerCase());
    const matchesDate = dateFilter ? record.timestamp.includes(dateFilter) : true;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="lg:block hidden">
          <Sidebar />
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Attendance Management</h1>
          
          {/* Capture Face Section */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-900">Record Attendance</h2>
                <p className="text-gray-600">Capture your face to mark attendance</p>
              </div>
              
              <div className="flex flex-col items-center">
                <button
                  onClick={handleCapture}
                  disabled={captureLoading}
                  className="bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-600 flex items-center"
                >
                  <FaCamera className="mr-2" />
                  {captureLoading ? 'Processing...' : 'Capture Face'}
                </button>
                
                {captureResult && (
                  <div className={`mt-2 text-sm ${captureResult.success ? 'text-green-600' : 'text-red-600'}`}>
                    {captureResult.success 
                      ? `Successfully recorded attendance for ${captureResult.person}` 
                      : captureResult.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Attendance Records Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Attendance Records</h2>
              
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                {/* Date Filter */}
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="entry">Entry</option>
                  <option value="exit">Exit</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 p-4">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{record.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{record.timestamp}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              record.status === 'entry' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {record.status === 'entry' ? 'Check In' : 'Check Out'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendancePage;