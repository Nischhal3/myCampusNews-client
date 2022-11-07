// npm install @react-navigation/native @react-navigation/native-stack
// npm install react-native-screens react-native-safe-area-context
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import LocalAuth from '../screens/LocalAuth';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // User authentication via finger print or screen lock patter
  useEffect(() => {
    LocalAuth(setIsAuthenticated);
  }, []);

  console.log(isAuthenticated);
  
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>
  );
};

const navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default navigator;
