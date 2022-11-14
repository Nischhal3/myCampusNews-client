import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'


const SingleNewsScreen = ({route}) => {
    const {singleNews} = route.params;
    return (
        <View style={styles.container}>
            <Text>{singleNews.news_title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.light_background,
    },
})

export default SingleNewsScreen;