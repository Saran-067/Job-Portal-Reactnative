import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { RootParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const SignupScreen = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student', // Default role
    profilePhoto: null as string | null, // Store the profile photo URI
  });

  const [imageLoading, setImageLoading] = useState(false); // Loading state for image picker
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use the useNavigation hook

  const changeEventHandler = (name: string, value: string) => {
    setInput({ ...input, [name]: value });
  };

  // Function to pick an image from the device
  const pickImage = async () => {
    setImageLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to your photo library to upload a profile picture.');
      setImageLoading(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use `MediaTypeOptions`
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 0.5, // Reduce image quality to save bandwidth
    });

    if (!result.canceled) {
      setInput({ ...input, profilePhoto: result.assets[0].uri });
    }
    setImageLoading(false);
  };

  // Function to clear the selected image
  const clearImage = () => {
    setInput({ ...input, profilePhoto: null });
  };

  const submitHandler = async () => {
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);

    if (input.profilePhoto) {
      // Append the profile photo to FormData
      const file = {
        uri: input.profilePhoto,
        name: 'profile.jpg', // Default file name
        type: 'image/jpeg', // Default file type
      };
      formData.append('profilePhoto', file as any); // Use `as any` to bypass TypeScript errors
    }

    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        Alert.alert('Success', res.data.message);
        // Navigate to the home screen or perform other actions
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Profile Picture Upload */}
      <View style={styles.profilePhotoContainer}>
        {input.profilePhoto ? (
          <>
            <Image source={{ uri: input.profilePhoto }} style={styles.profilePhoto} />
            <TouchableOpacity onPress={clearImage} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            {imageLoading ? (
              <ActivityIndicator color="#0000ff" />
            ) : (
              <Text style={styles.uploadButtonText}>Upload Profile Photo</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={input.fullname}
        onChangeText={(text) => changeEventHandler('fullname', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={input.email}
        onChangeText={(text) => changeEventHandler('email', text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={input.phoneNumber}
        onChangeText={(text) => changeEventHandler('phoneNumber', text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={input.password}
        onChangeText={(text) => changeEventHandler('password', text)}
        secureTextEntry
      />

      {/* Radio Buttons for Role Selection */}
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Select Role:</Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioItem}>
            <RadioButton
              value="student"
              status={input.role === 'student' ? 'checked' : 'unchecked'}
              onPress={() => changeEventHandler('role', 'student')}
            />
            <Text style={styles.radioText}>Student</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton
              value="recruiter"
              status={input.role === 'recruiter' ? 'checked' : 'unchecked'}
              onPress={() => changeEventHandler('role', 'recruiter')}
            />
            <Text style={styles.radioText}>Recruiter</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={submitHandler}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Signup</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular profile photo
  },
  uploadButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#0000ff',
  },
  clearButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  radioContainer: {
    marginBottom: 15,
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: '#0000ff',
    marginTop: 20,
  },
});

export default SignupScreen;