import React, {useContext, useEffect} from 'react';
import { Alert, useWindowDimensions, StyleSheet, View, Image, Text, BackHandler } from 'react-native';
import { Context } from '../contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentScrollView,
    DrawerItemList,   
    DrawerItem,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {color} from 'react-native-reanimated';

function CustomDrawerContent( props ) {
    const width = useWindowDimensions().width * 0.3
    const { user, setIsLoggedIn , drawerFocus, setDrawerFocus } = useContext(Context);

    const logout = () => {
        Alert.alert('Log Out', 'Confirm Logout?', [
            {text: 'Cancel'},
            {
              text: 'Yes',
              onPress: () => {
                AsyncStorage.clear();
                setIsLoggedIn(false);
              },
            },
        ]);
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        // locations={[0, 0.24, 0.45, 1]}
        colors={['#004D9B', '#80A5CA']}
        style={styles.linearBackground}
        >
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/blank_avatar.jpg')} style={styles.avatar}/>
                    <View style={styles.userContainer}>
                        <Text numberOfLines={1} style={styles.username}>{user.full_name}</Text>
                        <Text numberOfLines={1} style={styles.email}>{user.email}</Text>
                    </View>
                </View>
                {/* <DrawerItemList {...props} /> */}
                <View style={{
                    borderBottomColor: colors.light_background,
                    borderBottomWidth: 2,
                    paddingTop: "5%",
                    width: "95%",
                    alignSelf: 'center',
                }}/>
                <DrawerItem
                label="News"
                labelStyle={{color: drawerFocus == "Home"? colors.primary : colors.light_text}}
                style={[styles.drawerItem, {marginTop: "10%"}]}
                onPress={() => {props.navigation.navigate("Home"); setDrawerFocus("Home")}}
                activeBackgroundColor={colors.light_background}
                activeTintColor={colors.dark_text}
                focused={drawerFocus == "Home"? true : false}
                />
                <DrawerItem
                label="Notifications"
                style={styles.drawerItem}
                labelStyle={{color: drawerFocus == "Notification"? colors.primary : colors.light_text}}
                onPress={() => {props.navigation.navigate("Notification"); setDrawerFocus("Notification")}}
                activeBackgroundColor={colors.light_background}
                inactiveTintColor={colors.dark_text}
                focused={drawerFocus == "Notification"? true : false}
                />
            </DrawerContentScrollView>
            <View style={{
                borderBottomColor: colors.light_background,
                borderBottomWidth: 2,
                paddingTop: "5%",
                width: "95%",
                alignSelf: 'center',
            }}/>
            <View style={styles.footer}>
                <View>
                    <DrawerItem 
                    label="Settings"
                    labelStyle={{color: colors.light_text}}
                    style={styles.setting}
                    onPress={() => {props.navigation.navigate("Setting"); setDrawerFocus("Setting")}}
                    />
                </View>
                <View>
                    <DrawerItem 
                    label="Logout"
                    labelStyle={{color: colors.light_text}}
                    style={styles.logout}
                    onPress={logout}
                    />
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearBackground: {
        flex: 1,
    },
    header: {
        margin: "3%",
        flexDirection: 'row',
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 50,
    },
    userContainer: {
        width: "63%",
        margin: "5%",
        marginLeft: "8%",
    },
    username: {
        color: colors.light_text,
        fontSize: fontSize.large,
        fontFamily: "IBM",
        fontWeight: 'bold',
        marginBottom: 2,
    },
    email: {
        color: colors.light_grey,
        fontSize: fontSize.small,
        fontFamily: "IBM",
    },
    footer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // width: "100%",
    },
    setting: {
        // width: "80%",
        // flex: 1,
        // alignSelf: 'center',
    },
    logout: {
        // width: "80%",
        // flex: 1,
        // alignSelf: 'center',
    },
})

export default CustomDrawerContent;