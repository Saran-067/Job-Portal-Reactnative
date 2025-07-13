import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import JobListingScreen from '../screens/JobListingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Navbar from '../components/shared/Navbar';
import SearchScreen from '../screens/SearchScree';
import ProfileScreen from '../screens/ProfileScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* Vertical Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="JobListing" component={JobListingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Application" component={ApplicationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ title: 'Search Jobs' }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default AppNavigator;