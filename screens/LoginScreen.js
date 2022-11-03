// npm install react-hook-form
import React from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, View, Text, Platform, StatusBar } from 'react-native';

function LoginScreen() {
    return (
        <SafeAreaView style={styles.androidSafeArea}>
            <Text>LoginScreen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
})

export default LoginScreen;