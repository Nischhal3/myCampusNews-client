import React, {useContext} from 'react';
import { Alert, useWindowDimensions, StyleSheet, View } from 'react-native';
import { Context } from '../contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentScrollView,
    DrawerItemList,   
    DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent( props ) {
    const width = useWindowDimensions().width * 0.3
    const {setIsLoggedIn} = useContext(Context);

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

    return (
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label="News"
          style={styles.DrawerItem}
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Notifications"
          style={styles.DrawerItem}
          onPress={() => props.navigation.navigate("Notification")}
        />
        <View>
            <DrawerItem 
              label="Logout"
              style={styles.DrawerItem}
              onPress={logout}
            />
        </View>
      </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    DrawerItem: {
       
    },
})

export default CustomDrawerContent;