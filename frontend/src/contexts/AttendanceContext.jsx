import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAttendance, captureAttendance } from '../utils/api';

const AttendanceContext = createContext();

export const useAttendance = () => {
  return useContext(AttendanceContext);
};

export const AttendanceProvider = ({ children }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDetectedPerson, setLastDetectedPerson] = useState(null);

  const loadAttendanceRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAttendance();
      setAttendanceRecords(data);
    } catch (err) {
      setError('Failed to load attendance records');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const recordAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await captureAttendance();
      
      if (result.status === 'success') {
        setLastDetectedPerson(result.identity);
        await loadAttendanceRecords(); // Refresh the attendance list
        return { success: true, person: result.identity };
      } else {
        setError(result.message || 'Failed to detect face');
        return { success: false, message: result.message };
      }
    } catch (err) {
      setError('An error occurred while capturing attendance');
      console.error(err);
      return { success: false, message: 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load attendance records when the component mounts
    loadAttendanceRecords();
  }, []);

  const value = {
    attendanceRecords,
    loading,
    error,
    lastDetectedPerson,
    loadAttendanceRecords,
    recordAttendance
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};