// npx expo install expo-linear-gradient
import React, {useContext, useEffect, useState} from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
    return (
        <LinearGradient 
            start={{x: 1, y: 0}} end={{x: 0, y: 1}}
            locations={[0, 0.24, 0.45, 1]}
            colors={['#2A6AAA', '#004D9B', '#004D9B', '#80A5CA']} 
            style={styles.linearBackground}
            >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require("../assets/nokia/nokiablue.png")} />
                </View>
                <View style={styles.buttonContainer}>

                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearBackground: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: "25%",
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {

    },
})

export default WelcomeScreen;