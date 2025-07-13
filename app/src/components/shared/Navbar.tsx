// components/shared/Navbar.tsx

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface NavbarProps {
  isVisible: boolean;
  onClose?: () => void; // Optional callback for auto-close on selection
}

const Navbar: React.FC<NavbarProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      dispatch(logout());
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
    if (onClose) onClose();
  };

  const isStudent = user?.role === 'student';

  return (
    <Animated.View style={[styles.navbar, { transform: [{ translateX }] }]}>
      <Text style={styles.logo}>
        {isStudent ? '🎓 Student Panel' : '🏢 Recruiter Panel'}
      </Text>

      {isStudent ? (
        <>
          <NavButton label="Jobs" onPress={() => handleNavigate('JobListing')} />
          <NavButton label="Search" onPress={() => handleNavigate('Search')} />
          <NavButton label="Applications" onPress={() => handleNavigate('Application')} />
        </>
      ) : (
        <>
          <NavButton label="Dashboard" onPress={() => handleNavigate('Dashboard')} />
          <NavButton label="Post Job" onPress={() => handleNavigate('PostJob')} />
          <NavButton label="My Jobs" onPress={() => handleNavigate('MyJobs')} />
        </>
      )}

      <NavButton label="Profile" onPress={() => handleNavigate('Profile')} />

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const NavButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.link} onPress={onPress}>
    <Text style={styles.linkText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: SCREEN_WIDTH * 0.65,
    backgroundColor: '#1f2937', // Tailwind gray-800
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 5,
    elevation: 10,
    borderRightWidth: 1,
    borderRightColor: '#374151', // Tailwind gray-700
  },
  logo: {
    color: '#60a5fa', // Tailwind blue-400
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  link: {
    paddingVertical: 12,
    borderBottomColor: '#374151',
    borderBottomWidth: 1,
  },
  linkText: {
    fontSize: 16,
    color: '#f3f4f6', // Tailwind gray-100
    textAlign: 'center',
  },
  logout: {
    marginTop: 40,
    backgroundColor: '#dc2626', // Tailwind red-600
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Navbar;
