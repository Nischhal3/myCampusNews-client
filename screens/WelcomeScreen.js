// npx expo install expo-linear-gradient
import React, {useContext, useEffect, useState} from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Text, Image, Pressable, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import { WelcomeScreenButton } from '../component/AppButtons';

const WelcomeScreen = ( {navigation} ) => {
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
                    <Text style={styles.headerText}>Join now to follow the latest news in Espoo campus!</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {/* <Button 
                        title="Register" 
                        style={styles.registerBtn} 
                        onPress={() => navigation.navigate("Register")} 
                    /> */}
                    <WelcomeScreenButton title="Register" color="transparent" textColor={colors.light_text} onPress={() => navigation.navigate("Register")}/>
                    <WelcomeScreenButton title="Login" color="#fff" textColor={colors.primary_btn} onPress={() => navigation.navigate("Login")}/>
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
    headerText: {
        fontFamily: "Goldman-regular",
        fontSize: fontSize.subtitle,
        color: colors.light_text,
        margin: 30,
    },
    buttonContainer: {
        position: "absolute",
        height: "15%",
        top: "65%",
        left: 0,
        right: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
})

export default WelcomeScreen;