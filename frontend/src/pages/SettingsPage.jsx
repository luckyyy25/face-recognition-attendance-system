import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import { FaSave, FaKey, FaBell, FaDatabase, FaClock } from 'react-icons/fa';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'Face Recognition Attendance System',
    companyName: 'ACME Corporation',
    adminEmail: 'admin@example.com',
    timezone: 'UTC+0',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserAlert: true,
    failedRecognitionAlert: true,
    systemUpdates: true,
    dailyReports: false
  });
  
  const [backupSettings, setBackupSettings] = useState({
    automaticBackup: true,
    backupFrequency: 'daily',
    backupTime: '00:00',
    keepBackupsFor: '30'
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('General settings saved successfully!');
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('Notification settings saved successfully!');
  };

  const handleBackupSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('Backup settings saved successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('Password changed successfully!');
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleBackupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBackupSettings({
      ...backupSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

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
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
          
          <div className="bg-white rounded-lg shadow">
            <div className="flex flex-wrap border-b">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'general'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('general')}
              >
                General
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'backup'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('backup')}
              >
                Backup & Restore
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'security'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'general' && (
                <form onSubmit={handleGeneralSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        System Name
                      </label>
                      <input
                        type="text"
                        name="systemName"
                        value={generalSettings.systemName}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={generalSettings.companyName}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        name="adminEmail"
                        value={generalSettings.adminEmail}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={generalSettings.timezone}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="UTC+0">UTC+0 (London, Lisbon)</option>
                        <option value="UTC-5">UTC-5 (New York, Toronto)</option>
                        <option value="UTC-8">UTC-8 (Los Angeles, Vancouver)</option>
                        <option value="UTC+1">UTC+1 (Berlin, Paris, Rome)</option>
                        <option value="UTC+8">UTC+8 (Beijing, Singapore)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Format
                      </label>
                      <select
                        name="dateFormat"
                        value={generalSettings.dateFormat}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Format
                      </label>
                      <select
                        name="timeFormat"
                        value={generalSettings.timeFormat}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="24h">24-hour (14:30)</option>
                        <option value="12h">12-hour (2:30 PM)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
              
              {activeTab === 'notifications' && (
                <form onSubmit={handleNotificationSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                        Enable email notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newUserAlert"
                        name="newUserAlert"
                        checked={notificationSettings.newUserAlert}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="newUserAlert" className="ml-2 block text-sm text-gray-700">
                        Alert when new user is registered
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="failedRecognitionAlert"
                        name="failedRecognitionAlert"
                        checked={notificationSettings.failedRecognitionAlert}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="failedRecognitionAlert" className="ml-2 block text-sm text-gray-700">
                        Alert on failed recognition attempts
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="systemUpdates"
                        name="systemUpdates"
                        checked={notificationSettings.systemUpdates}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="systemUpdates" className="ml-2 block text-sm text-gray-700">
                        System update notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dailyReports"
                        name="dailyReports"
                        checked={notificationSettings.dailyReports}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="dailyReports" className="ml-2 block text-sm text-gray-700">
                        Send daily attendance reports
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center"
                    >
                      <FaBell className="mr-2" />
                      Save Notification Settings
                    </button>
                  </div>
                </form>
              )}
              
              {activeTab === 'backup' && (
                <form onSubmit={handleBackupSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="automaticBackup"
                        name="automaticBackup"
                        checked={backupSettings.automaticBackup}
                        onChange={handleBackupChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="automaticBackup" className="ml-2 block text-sm text-gray-700">
                        Enable automatic backups
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Backup Frequency
                        </label>
                        <select
                          name="backupFrequency"
                          value={backupSettings.backupFrequency}
                          onChange={handleBackupChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Backup Time
                        </label>
                        <input
                          type="time"
                          name="backupTime"
                          value={backupSettings.backupTime}
                          onChange={handleBackupChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Keep Backups For (days)
                        </label>
                        <input
                          type="number"
                          name="keepBackupsFor"
                          value={backupSettings.keepBackupsFor}
                          onChange={handleBackupChange}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center mr-2"
                      >
                        <FaDatabase className="mr-2" />
                        Create Manual Backup
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save Backup Settings
                    </button>
                  </div>
                </form>
              )}
              
              {activeTab === 'security' && (
                <form onSubmit={handleChangePassword} className="max-w-md">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center"
                    >
                      <FaKey className="mr-2" />
                      Change Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;