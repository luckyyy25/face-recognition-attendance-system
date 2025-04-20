import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import StatCard from '../components/dashboard/StatCard';
import AttendanceChart from '../components/dashboard/AttendanceChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useAttendance } from '../contexts/AttendanceContext';
import { FaUserCheck, FaUserClock, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import { format } from 'date-fns';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { attendanceRecords, loading } = useAttendance();
  const [stats, setStats] = useState({
    presentToday: 0,
    absentToday: 0,
    totalUsers: 0,
    attendanceRate: 0
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Calculate dashboard statistics
    if (attendanceRecords.length > 0) {
      const today = format(new Date(), 'yyyy-MM-dd');
      const presentToday = attendanceRecords.filter(
        record => record.timestamp.includes(today) && record.status === 'entry'
      ).length;
      
      // For demo purposes, assume we have 50 total users
      const totalUsers = 50;
      const absentToday = totalUsers - presentToday;
      const attendanceRate = Math.round((presentToday / totalUsers) * 100);
      
      setStats({
        presentToday,
        absentToday,
        totalUsers,
        attendanceRate
      });
      
      // Create chart data for the last 7 days
      const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return format(date, 'MM-dd');
      }).reverse();
      
      // Mock data for the chart
      const entryCounts = [23, 30, 28, 32, 40, 25, presentToday];
      const exitCounts = [20, 28, 25, 30, 38, 22, presentToday - 5];
      
      setChartData({
        labels: lastSevenDays,
        datasets: [
          {
            label: 'Check In',
            data: entryCounts,
            backgroundColor: 'rgba(79, 70, 229, 0.6)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1
          },
          {
            label: 'Check Out',
            data: exitCounts,
            backgroundColor: 'rgba(239, 68, 68, 0.6)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1
          }
        ]
      });
      
      // Create recent activities
      const sortedRecords = [...attendanceRecords]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
      
      const activities = sortedRecords.map((record, index) => ({
        id: index,
        name: record.name,
        action: record.status === 'entry' ? 'Checked In' : 'Checked Out',
        status:        record.status,
        time: format(new Date(record.timestamp), 'MMM d, yyyy h:mm a')
      }));

      setRecentActivities(activities);
    }
  }, [attendanceRecords]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {sidebarOpen && <div className="lg:block hidden"><Sidebar /></div>}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Present Today" value={stats.presentToday} icon={<FaUserCheck />} color="bg-green-500" />
            <StatCard title="Absent Today" value={stats.absentToday} icon={<FaUserClock />} color="bg-red-500" />
            <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="bg-yellow-500" />
            <StatCard title="Attendance Rate" value={`${stats.attendanceRate}%`} icon={<FaCalendarCheck />} color="bg-blue-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Overview</h2>
              <AttendanceChart data={chartData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
