import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { RootParamList } from '../types/navigation';
 // Import from types
import { RadioButton } from 'react-native-paper';

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

const LoginScreen = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'student', // Default role
  });

  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const changeEventHandler = (name: string, value: string) => {
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async () => {
    if (!input.email || !input.password || !input.role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    dispatch(setLoading(true));
    try {
      // console.log('Submitting login with input:', input);
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' }
        // withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Save user data to Redux
        Alert.alert('Success', res.data.message);

        // Navigate to JobListingScreen after successful login
        navigation.navigate('JobListing');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignupNavigation = () => {
    navigation.navigate('Register'); // Navigate to the Register screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={input.email}
        onChangeText={(text) => changeEventHandler('email', text)}
        keyboardType="email-address"
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
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignupNavigation} disabled={loading}>
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
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

export default LoginScreen;
