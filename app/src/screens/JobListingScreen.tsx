import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import useGetAllJobs from '../hooks/useGetAllJobs';
import Job from '../components/job';
import Navbar from '../components/shared/Navbar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const JobListingScreen = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);
  const { loading, error } = useGetAllJobs();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.statusText}>Loading jobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.statusText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar isVisible={isNavbarVisible} onClose={() => setIsNavbarVisible(false)} />

      {/* Hamburger Toggle Button */}
      <TouchableOpacity onPress={toggleNavbar} style={styles.hamburger}>
        <Text style={styles.hamburgerText}>≡</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>Available Jobs</Text>
        <FlatList
          data={allJobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Job job={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
  },
  hamburger: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 6,
  },
  hamburgerText: {
    color: '#f3f4f6',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default JobListingScreen;
