import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Navbar from '../components/shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
  });

  const toggleNavbar = () => {
    setIsNavbarVisible(prev => !prev);
  };

  const handleResumeOpen = async () => {
    const resumeUrl = user?.profile?.resume;
    if (resumeUrl) {
      const supported = await Linking.canOpenURL(resumeUrl);
      if (supported) {
        await Linking.openURL(resumeUrl);
      } else {
        alert('Cannot open resume URL');
      }
    } else {
      alert('No resume uploaded');
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setEditMode(false);
      } else {
        alert(res.data.message || 'Update failed');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar isVisible={isNavbarVisible} />

       <TouchableOpacity onPress={toggleNavbar} style={styles.hamburger}>
              <Text style={styles.hamburgerText}>≡</Text>
            </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      {user?.profile?.profilePhoto && (
        <Image
          source={{ uri: user?.profile.profilePhoto }}
          style={styles.profileImage}
        />
      )}

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={input.fullname}
            onChangeText={text => setInput(prev => ({ ...prev, fullname: text }))}
          />
        ) : (
          <Text style={styles.info}>{user?.fullname}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={input.email}
            onChangeText={text => setInput(prev => ({ ...prev, email: text }))}
          />
        ) : (
          <Text style={styles.info}>{user?.email}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Phone</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={input.phoneNumber}
            onChangeText={text => setInput(prev => ({ ...prev, phoneNumber: text }))}
          />
        ) : (
          <Text style={styles.info}>{user?.phoneNumber}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Bio</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={input.bio}
            onChangeText={text => setInput(prev => ({ ...prev, bio: text }))}
          />
        ) : (
          <Text style={styles.info}>{user?.profile?.bio}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Skills</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={input.skills}
            onChangeText={text => setInput(prev => ({ ...prev, skills: text }))}
          />
        ) : (
          <Text style={styles.info}>{user?.profile?.skills?.join(', ')}</Text>
        )}
      </View>

      <TouchableOpacity onPress={handleResumeOpen} style={styles.resumeButton}>
        <Text style={styles.resumeButtonText}>View Resume</Text>
      </TouchableOpacity>

      {editMode ? (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save</Text>}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setEditMode(true)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6', // Tailwind gray-100
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a', // Tailwind blue-900
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#6366f1', // indigo-500
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#e0e7ff',
  },
  fieldGroup: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#374151', // gray-700
    fontSize: 15,
  },
  info: {
    fontSize: 16,
    color: '#1f2937', // gray-800
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#111827', // gray-900
  },
  resumeButton: {
    backgroundColor: '#4f46e5', // indigo-600
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  resumeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#10b981', // emerald-500
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#64748b', // slate-500
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
});
