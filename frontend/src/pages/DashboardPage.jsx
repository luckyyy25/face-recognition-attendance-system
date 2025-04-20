import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserClock, FaUsers, FaClock } from 'react-icons/fa';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    presentToday: 0,
    absent: 0,
    totalUsers: 0,
    lateArrivals: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [chartData, setChartData] = useState({});

  // Fetch data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would be replaced with actual API calls
        setTimeout(() => {
          // Simulate API responses
          setStats({
            presentToday: 45,
            absent: 12,
            totalUsers: 57,
            lateArrivals: 8
          });
          
          setRecentActivity([
            { id: 1, name: 'John Doe', action: 'checked in', time: '08:30 AM', status: 'entry' },
            { id: 2, name: 'Jane Smith', action: 'checked out', time: '05:15 PM', status: 'exit' },
            { id: 3, name: 'Robert Johnson', action: 'checked in', time: '09:05 AM', status: 'entry' },
            { id: 4, name: 'Emily Davis', action: 'checked out', time: '04:55 PM', status: 'exit' },
            { id: 5, name: 'Michael Brown', action: 'checked in', time: '08:45 AM', status: 'entry' }
          ]);
          
          setChartData({
            labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            datasets: [
              {
                label: 'Check In',
                data: [15, 20, 5, 2, 0, 3, 0, 0, 0, 0],
                backgroundColor: '#4F46E5'
              },
              {
                label: 'Check Out',
                data: [0, 1, 2, 3, 10, 5, 4, 7, 10, 15],
                backgroundColor: '#10B981'
              }
            ]
          });
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Present Today"
              value={stats.presentToday}
              icon={<FaUserCheck className="h-6 w-6" />}
              color="bg-primary"
            />
            <StatCard
              title="Absent"
              value={stats.absent}
              icon={<FaUserClock className="h-6 w-6" />}
              color="bg-danger"
            />
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<FaUsers className="h-6 w-6" />}
              color="bg-warning"
            />
            <StatCard
              title="Late Arrivals"
              value={stats.lateArrivals}
              icon={<FaClock className="h-6 w-6" />}
              color="bg-secondary"
            />
          </div>
          
          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h2>
                <AttendanceChart data={chartData} />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <RecentActivity activities={recentActivity} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;