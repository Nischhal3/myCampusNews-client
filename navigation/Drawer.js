import React, { useContext, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { Context } from '../contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { baseUrl } from '../utils/variables';
import LocalAuth from '../screens/LocalAuth';

// UI Imports
import defaultAvatar from '../assets/images/blank_avatar.jpg';
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';

function CustomDrawerContent(props) {
  const uploadDefaultUri = Image.resolveAssetSource(defaultAvatar).uri;
  const { user, setIsLoggedIn, drawerFocus, setDrawerFocus } =
    useContext(Context);

  var url = '';

  if (user.avatar_name == 'unavailable') {
    url =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HrjlxizejA_sfkfPhIaAdv5Cxy6A-HGFzA&usqp=CAU';
  } else {
    url = `${baseUrl}avatar/${user.avatar_name}`;
  }

  const logout = () => {
    Alert.alert('Log Out', 'Confirm Logout?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.clear();
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#004D9B', '#80A5CA']}
      style={styles.linearBackground}
    >
      {user.role == 0 ? (
        <>
          <DrawerContentScrollView {...props}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => {
                props.navigation.navigate('Profile');
                setDrawerFocus('Profile');
              }}
            >
              <Image source={{ uri: url }} style={styles.avatar} />
              <View style={styles.userContainer}>
                <Text numberOfLines={1} style={styles.username}>
                  {user.full_name}
                </Text>
                <Text numberOfLines={1} style={styles.email}>
                  {user.email}
                </Text>
              </View>
              <McIcons
                name="account-star"
                size={20}
                color={colors.light_text}
                style={{ position: 'absolute', right: 5, top: 0 }}
              />
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: colors.light_background,
                borderBottomWidth: 2,
                paddingTop: '5%',
                width: '95%',
                alignSelf: 'center',
              }}
            />
            <DrawerItem
              label="News"
              labelStyle={{
                color:
                  drawerFocus == 'Home' ? colors.primary : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="newspaper-variant-outline"
                  size={24}
                  color={
                    drawerFocus == 'Home' ? colors.primary : colors.light_text
                  }
                />
              )}
              style={[styles.drawerItem, { marginTop: '10%' }]}
              onPress={() => {
                props.navigation.navigate('Home');
                setDrawerFocus('Home');
              }}
              activeBackgroundColor={colors.light_background}
              activeTintColor={colors.dark_text}
              focused={drawerFocus == 'Home' ? true : false}
            />
            <DrawerItem
              label="Manage News"
              style={styles.drawerItem}
              labelStyle={{
                color:
                  drawerFocus == 'MNews' ? colors.primary : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="newspaper-variant-multiple-outline"
                  size={24}
                  color={
                    drawerFocus == 'MNews' ? colors.primary : colors.light_text
                  }
                />
              )}
              onPress={() => {
                props.navigation.navigate('MNews');
                setDrawerFocus('MNews');
              }}
              activeBackgroundColor={colors.light_background}
              inactiveTintColor={colors.dark_text}
              focused={drawerFocus == 'MNews' ? true : false}
            />
            <DrawerItem
              label="Manage Users"
              style={styles.drawerItem}
              labelStyle={{
                color:
                  drawerFocus == 'MUsers' ? colors.primary : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="account-details-outline"
                  size={24}
                  color={
                    drawerFocus == 'MUsers' ? colors.primary : colors.light_text
                  }
                />
              )}
              onPress={() => {
                props.navigation.navigate('MUsers');
                setDrawerFocus('MUsers');
              }}
              activeBackgroundColor={colors.light_background}
              inactiveTintColor={colors.dark_text}
              focused={drawerFocus == 'MUsers' ? true : false}
            />
            <DrawerItem
              label="Publish News"
              style={styles.drawerItem}
              labelStyle={{
                color:
                  drawerFocus == 'Publish' ? colors.primary : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="publish"
                  size={24}
                  color={
                    drawerFocus == 'Publish'
                      ? colors.primary
                      : colors.light_text
                  }
                />
              )}
              onPress={() => {
                props.navigation.navigate('Publish');
                setDrawerFocus('Publish');
              }}
              activeBackgroundColor={colors.light_background}
              inactiveTintColor={colors.dark_text}
              focused={drawerFocus == 'Publish' ? true : false}
            />
            <DrawerItem
              label="Drafts"
              labelStyle={{
                color:
                  drawerFocus == 'Draft' ? colors.primary : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="file-edit-outline"
                  size={24}
                  color={
                    drawerFocus == 'Draft' ? colors.primary : colors.light_text
                  }
                />
              )}
              onPress={() => {
                props.navigation.navigate('Draft');
                setDrawerFocus('Draft');
              }}
              activeBackgroundColor={colors.light_background}
              activeTintColor={colors.dark_text}
              focused={drawerFocus == 'Draft' ? true : false}
            />
            <DrawerItem
              label="Bookmarks"
              labelStyle={{
                color:
                  drawerFocus == 'Bookmark'
                    ? colors.primary
                    : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="bookmark-multiple-outline"
                  size={24}
                  color={
                    drawerFocus == 'Bookmark'
                      ? colors.primary
                      : colors.light_text
                  }
                />
              )}
              onPress={() => {
                props.navigation.navigate('Bookmark');
                setDrawerFocus('Bookmark');
              }}
              activeBackgroundColor={colors.light_background}
              activeTintColor={colors.dark_text}
              focused={drawerFocus == 'Bookmark' ? true : false}
            />
          </DrawerContentScrollView>
          <View
            style={{
              borderBottomColor: colors.light_background,
              borderBottomWidth: 2,
              paddingTop: '5%',
              width: '95%',
              alignSelf: 'center',
            }}
          />
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={() => {
                props.navigation.navigate('Setting');
                setDrawerFocus('Setting');
              }}
            >
              <McIcons name="cog-outline" size={30} color={colors.light_text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
              <McIcons name="logout" size={28} color={colors.light_text} />
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <DrawerContentScrollView {...props}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => {
                props.navigation.navigate('Profile');
                setDrawerFocus('Profile');
              }}
            >
              <Image source={{ uri: url }} style={styles.avatar} />
              <View style={styles.userContainer}>
                <Text numberOfLines={1} style={styles.username}>
                  {user.full_name}
                </Text>
                <Text numberOfLines={1} style={styles.email}>
                  {user.email}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: colors.light_background,
                borderBottomWidth: 2,
                paddingTop: '5%',
                width: '95%',
                alignSelf: 'center',
              }}
            />
            <DrawerItem
              label="News"
              labelStyle={{
                color:
                  drawerFocus == 'Home' ? colors.primary : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="newspaper-variant-outline"
                  size={24}
                  color={
                    drawerFocus == 'Home' ? colors.primary : colors.light_text
                  }
                />
              )}
              style={[styles.drawerItem, { marginTop: '10%' }]}
              onPress={() => {
                props.navigation.navigate('Home');
                setDrawerFocus('Home');
              }}
              activeBackgroundColor={colors.light_background}
              activeTintColor={colors.dark_text}
              focused={drawerFocus == 'Home' ? true : false}
            />
            <DrawerItem
              label="Bookmarks"
              labelStyle={{
                color:
                  drawerFocus == 'Bookmark'
                    ? colors.primary
                    : colors.light_text,
              }}
              icon={() => (
                <McIcons
                  name="bookmark-multiple-outline"
                  size={24}
                  color={
                    drawerFocus == 'Bookmark'
                      ? colors.primary
                      : colors.light_text
                  }
                />
              )}
              onPress={() => {
                props.navigation.navigate('Bookmark');
                setDrawerFocus('Bookmark');
              }}
              activeBackgroundColor={colors.light_background}
              activeTintColor={colors.dark_text}
              focused={drawerFocus == 'Bookmark' ? true : false}
            />
          </DrawerContentScrollView>
          <View
            style={{
              borderBottomColor: colors.light_background,
              borderBottomWidth: 2,
              paddingTop: '5%',
              width: '95%',
              alignSelf: 'center',
            }}
          />
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={() => {
                LocalAuth();
                props.navigation.navigate('Setting');
                setDrawerFocus('Setting');
              }}
            >
              <McIcons name="cog-outline" size={30} color={colors.light_text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
              <McIcons name="logout" size={28} color={colors.light_text} />
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearBackground: {
    flex: 1,
  },
  header: {
    margin: '3%',
    marginLeft: 15,
    flexDirection: 'row',
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  userContainer: {
    width: '62%',
    margin: '5%',
    marginLeft: '8%',
  },
  username: {
    color: colors.light_text,
    fontSize: fontSize.large,
    fontFamily: 'IBM',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: colors.light_grey,
    fontSize: fontSize.small,
    fontFamily: 'IBM',
  },
  bookmarksContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: '3%',
    padding: '3%',
  },
  bookmarks: {
    marginLeft: '14%',
    color: colors.light_text,
    fontSize: fontSize.small,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    margin: '5%',
    justifyContent: 'space-between',
  },
  settingContainer: {
    marginLeft: '5%',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '2%',
  },
  logout: {
    color: colors.light_text,
    fontSize: fontSize.medium,
    fontFamily: 'IBM',
  },
});

export default CustomDrawerContent;
