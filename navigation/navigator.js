import React, { useContext, useEffect } from 'react';

// Import Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Context } from '../contexts/Context';
import LocalAuth from '../screens/LocalAuth';

// Import Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import Home from '../screens/Home';
import SingleNewsScreen from '../screens/SingleNewsScreen';
import Profile from '../screens/Profile';
import SettingScreen from '../screens/SettingScreen';
import ManageNewsScreen from '../screens/ManageNewsScreen';
import ManageUsersScreen from '../screens/ManageUsersScreen';
import PublishNewsScreen from '../screens/PublishNewsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import PreviewScreen from '../screens/PreviewScreen';
import DraftScreen from '../screens/DraftScreen';

// UI Imports
import colors from '../utils/colors';

// Import Custom Drawer
import CustomDrawerContent from './Drawer';
import { getUserByToken, getUserById } from '../services/UserService';

// Import Custom Header
import Header from '../component/Header';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  const { token, setUser } = useContext(Context);

  // Fetching and storing user details from database if token exists
  const getUserDetailsByToken = async () => {
    if (token != null) {
      try {
        const userData = await getUserByToken(token);
        const user = await getUserById(userData.user.user_id, token);
        setUser(user);
      } catch (error) {
        console.error('Drawer error', error);
      }
    }
  };

  useEffect(() => {
    LocalAuth();
    getUserDetailsByToken();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      backBehavior="initialRoute"
      screenOptions={{
        drawerType: 'front',
        headerTitleAlign: 'center',
        headerStyle: {
          maxHeight: 100,
          backgroundColor: colors.backgroundColor,
        },
        headerTitle: (props) => <Header {...props} />,
        drawerActiveBackgroundColor: colors.light_background,
      }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="SingleNews" component={SingleNewsScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
      <Drawer.Screen name="MNews" component={ManageNewsScreen} />
      <Drawer.Screen name="MUsers" component={ManageUsersScreen} />
      <Drawer.Screen name="Publish" component={PublishNewsScreen} />
      <Drawer.Screen name="Preview" component={PreviewScreen} />
      <Drawer.Screen name="Draft" component={DraftScreen} />
      <Drawer.Screen name="EditPassword" component={EditPasswordScreen} />
      <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
    </Drawer.Navigator>
  );
};

const StackScreen = () => {
  const { isLoggedIn, setIsLoggedIn, token } = useContext(Context);

  // Biometric authentication and token based auto-login
  useEffect(() => {
    //LocalAuth();
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
