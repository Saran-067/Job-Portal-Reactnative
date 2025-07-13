import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppliedJobTable from '../components/AppliedJobTable';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Navbar from '../components/shared/Navbar';

const ApplicationScreen = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const toggleNavbar = () => setIsNavbarVisible((prev) => !prev);

  useGetAppliedJobs();

  const allAppliedJobs = useSelector((state: RootState) => state.job.allAppliedJobs);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar isVisible={isNavbarVisible} />

      {/* Hamburger Toggle */}
      <TouchableOpacity onPress={toggleNavbar} style={styles.hamburger}>
        <Text style={styles.hamburgerText}>≡</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>📄 Applied Jobs</Text>

      {allAppliedJobs.length > 0 ? (
        <AppliedJobTable appliedJobs={allAppliedJobs} />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.noJobsText}>🕵️‍♂️ You haven’t applied for any jobs yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e7eb', // Tailwind gray-200
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  hamburger: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#6366f1', // indigo-500
    padding: 12,
    borderRadius: 25,
    zIndex: 10,
    elevation: 5,
  },
  hamburgerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsText: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    textAlign: 'center',
  },
});

export default ApplicationScreen;
