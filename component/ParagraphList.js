import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { baseUrl } from "../utils/variables";
import defaultImage from "../assets/images/blank_avatar.jpg";
import Animated from "react-native-reanimated";
import { Video } from "expo-av";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ParagraphList = ({ paragraph, preview }) => {
  const videoRef = useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {paragraph.p_photo_name === "unavailable" ? (
          <></>
        ) : paragraph.m_type === "video" ? (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{ uri: `${baseUrl}/${paragraph.p_photo_name}` }}
            useNativeControls={true}
            isLooping
            resizeMode="contain"
            onError={(error) => {
              console.error("<Video> error", error);
            }}
          ></Video>
        ) : (
          <Image
            style={styles.image}
            source={preview? {uri: paragraph.p_photo_name } : { uri: `${baseUrl}/${paragraph.p_photo_name}`}}
          />
        )}
        <Text style={styles.imageDescription}>{paragraph.p_photo_description}</Text>
      </View>
      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>{paragraph.p_content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  imageContainer: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
  imageDescription: {
    padding: 2,
    fontFamily: "IBM",
    fontSize: fontSize.small,
    color: colors.dark_grey,
  },
  paragraphContainer: {
    // borderWidth: 1
  },
  paragraph: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    color: colors.dark_text,
  },
});

export default ParagraphList;
