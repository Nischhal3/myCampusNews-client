import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { baseUrl } from "../utils/variables";
import defaultImage from "../assets/images/blank_avatar.jpg";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ParagraphList = ({ paragraph }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: `${baseUrl}/${paragraph.p_photo_name}` }} />
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
