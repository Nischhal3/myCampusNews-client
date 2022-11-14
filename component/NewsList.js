import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import defaultImage from "../assets/images/blank_image.jpg";

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'

const NewsList = ({ navigation, news }) => {
    const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
    const baseUrl = "http://10.0.2.2:3000/";
    var url = "";

    if (news.photoName == "unavailable") {
        url = uploadDefaultUri;
      } else {
        url = `${baseUrl}avatar/${news.photoName}`;
        // url = uploadDefaultUri;
      }

  return (
    <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate("SingleNews", {singleNews: news})}}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: url }} />
        {/* <Text>{news.photoName}</Text> */}
      </View>

      <View style={styles.contentConatiner}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{news.news_title}</Text>
        <Text style={styles.content} numberOfLines={2} ellipsizeMode='tail'>{news.news_content}</Text>
        {/* <Text>{news.news_id}</Text> */}
        <Text style={styles.timeStamp}>xx/xx/xxxx</Text>
      </View>

      <View style={styles.sideContainer}>
        <TouchableOpacity>
          <McIcons name="bookmark-outline" size={24} color={colors.dark_text} />
        </TouchableOpacity>
      </View>

      <View style={styles.readContainer}>
          <McIcons name="eye-outline" size={18} color={colors.medium_grey} />
          <Text style={styles.readNumber}>123</Text>
        </View> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        height: 110,
        width: "100%",
        // borderWidth: 1,
    },
    imageContainer: {
        width: "25%",
        // borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    contentConatiner: {
        marginLeft: "3%",
        width: "65%",
        // borderWidth: 1,
    },
    title: {
        fontFamily: "IBM",
        fontSize: fontSize.large,
        fontWeight: 'bold',
        color: colors.dark_text,
    },
    content: {
        fontFamily: "IBM",
        fontSize: fontSize.medium,
        color: colors.dark_grey,
    },
    timeStamp: {
        position: 'absolute',
        bottom: 0,
        fontFamily: "IBM",
        fontSize: fontSize.small,
        color: colors.medium_grey,
    },
    sideContainer: {
        // borderWidth: 1,
        justifyContent: 'space-between',
    },
    readContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        right: 0,
    },
    readNumber: {
        fontFamily: "IBM",
        fontSize: fontSize.caption,
        color: colors.medium_grey,
        marginLeft: 2,
    },
})

export default NewsList;