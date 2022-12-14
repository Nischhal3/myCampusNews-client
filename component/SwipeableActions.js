import Animated from "react-native-reanimated";
import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useComment } from "../services/NewsService";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const renderRightActions = (
  progress = Animated.AnimatedInterpolation,
  dragAnimatedValue = Animated.AnimatedInterpolation,
) => {
//   const { deleteComment } = useComment();

  return (
    <View style={styles.swipedRow}>
      <Animated.View style={styles.deleteButton}>
        <TouchableOpacity onPress={() => {console.log("clikced")}}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  swipedRow: {
    flex: 1,
    alignSelf: "center",
    marginLeft: "20%",
    height: "50%",
    // borderWidth: 1,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.negative,
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    borderRadius: 10,
  },
  deleteText: {
    textAlign: "center",
    color: colors.light_text,
    fontWeight: "bold",
    padding: 3,
  },
});

export { renderRightActions };
