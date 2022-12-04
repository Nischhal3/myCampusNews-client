import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

function Header() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/nokia/nokia.png')} style={styles.nokia} />
            <Text style={styles.text}>
                NEWS
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        width: 100,
        bottom: 10,
    },
    nokia: {
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
    },
    text: {
        fontFamily: 'Goldman-regular',
        fontSize: fontSize.medium,
        color: colors.nokia_blue,
        textAlign: 'center',
        top: -5,
    },
})

export default Header;