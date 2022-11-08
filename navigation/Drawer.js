import React, {useContext} from 'react';
import {Alert, useWindowDimensions, StyleSheet} from 'react-native';
import { Context } from '../contexts/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentScrollView,
    DrawerItemList,   
    DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent( props ) {
    const width = useWindowDimensions().width * 0.3

    return (
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label="News"
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Notifications"
          onPress={() => props.navigation.navigate("Notification")}
        />
      </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({

})

export default CustomDrawerContent;