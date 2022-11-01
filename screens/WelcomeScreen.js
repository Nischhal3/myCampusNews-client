// npm install react-native-linear-gradient
import React, {useContext, useEffect, useState} from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Text } from 'react-native';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        flex: 1
    }
})

export default WelcomeScreen;