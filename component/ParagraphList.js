import React, { useContext, useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Avatar, ListItem as RNEListItem } from "react-native-elements";
import PropTypes from "prop-types";
import { Context } from "../contexts/Context";
import { getUserById } from "../services/UserService";
import { useComment } from "../services/NewsService";
import { baseUrl } from "../utils/variables";
import defaultImage from "../assets/images/blank_avatar.jpg";
import { Swipeable } from "react-native-gesture-handler";
// import { renderRightActions } from "./SwipeableActions";
import Animated from "react-native-reanimated";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ParagraphList = ({ paragraph }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: `${baseUrl}/${paragraph.p_photo_name}` }} />
      <View>
        <Text>{paragraph.p_photo_description}</Text>
      </View>

      <View>
        <Text>{paragraph.p_content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
});

export default ParagraphList;
