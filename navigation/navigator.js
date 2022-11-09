// npm install @react-navigation/native @react-navigation/native-stack
// npm install react-native-screens react-native-safe-area-context
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Context } from '../contexts/Context';
import LocalAuth from '../screens/LocalAuth';

// Import Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NotificationScreen from "../screens/NotificationScreen";
import SettingScreen from "../screens/SettingScreen";
import ManageNewsScreen from "../screens/ManageNewsScreen";
import ManageUsersScreen from "../screens/ManageUsersScreen";
import PublishNewsScreen from "../screens/PublishNewsScreen";
import EditProfileScreen from '../screens/EditProfileScreen';

// UI Imports
import colors from "../utils/colors";

// Import Custom Drawer
import CustomDrawerContent from "./Drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        backBehavior="initialRoute"
        screenOptions={{
          drawerType: "front",
          headerTitleAlign: 'center',
          headerStyle: {
            height: "13%",
            backgroundColor: colors.backgroundColor,
          },
          drawerActiveBackgroundColor: colors.light_background,
          // drawerActiveTintColor: colors.light_text,
          // headerShown: false,
        }}
      >
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notification" component={NotificationScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
        <Drawer.Screen name="MNews" component={ManageNewsScreen} />
        <Drawer.Screen name="MUsers" component={ManageUsersScreen} />
        <Drawer.Screen name="Publish" component={PublishNewsScreen} />
        <Drawer.Screen name='EditProfile' component={EditProfileScreen} />
      </Drawer.Navigator>
    );
  };

const StackScreen = () => {
  const { isLoggedIn, setIsLoggedIn, token } = useContext(Context);
  // Biometric authentication and token based auto-login
  useEffect(() => {
    LocalAuth();
    token == null ? setIsLoggedIn(false) : setIsLoggedIn(true);
  }, [token]);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Drawer"
            component={DrawerScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
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
      )}
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
