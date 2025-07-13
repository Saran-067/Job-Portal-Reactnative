import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Import your Redux store
import AppNavigator from './src/navigation/AppNavigator'; // Import the AppNavigator

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </Provider>
    );
};

export default App;