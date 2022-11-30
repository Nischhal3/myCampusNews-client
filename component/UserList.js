import React, { createRef, useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import defaultImage from "../assets/images/blank_avatar.jpg";
import { Context } from "../contexts/Context";
import { baseUrl } from "../utils/variables";
import { useUser } from "../services/UserService";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UserList = ({ navigation, otherUser }) => {
  const { user } = useContext(Context);
  const { updateUserRole } = useUser();
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  var url = "";

  if (otherUser.avatar_name == "unavailable") {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}avatar/${otherUser.avatar_name}`;
  }

  const changeUserRole = () => {
    otherUser.role == 0
      ? updateUserRole(1, otherUser.user_id)
      : updateUserRole(0, otherUser.user_id);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Profile", { user: otherUser });
      }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: url }} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{otherUser.full_name}</Text>
        <Text style={styles.email}>{otherUser.email}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text
          style={[
            styles.userrole,
            { color: otherUser.role == 0 ? colors.nokia_blue : colors.primary },
          ]}
        >
          {otherUser.role == 0 ? "Admin" : "User"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          changeUserRole();
        }}
      >
        {user.user_id != otherUser.user_id && (otherUser.role == 0 ? (
          <McIcons
            name="account-arrow-down-outline"
            size={24}
            color={colors.negative}
          />
        ) : (
          <McIcons
            name="account-arrow-up-outline"
            size={24}
            color={colors.positive}
          />
        ))}
        
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // borderRadius: 20,
    backgroundColor: colors.light_background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: "row",
  },
  imageContainer: {
    // borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  contentContainer: {
    marginLeft: "4%",
    paddingVertical: 2,
    // borderWidth: 1,
  },
  username: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.dark_text,
    marginBottom: 2,
  },
  email: {
    fontFamily: "IBM",
    fontSize: fontSize.small,
    fontWeight: "bold",
    color: colors.dark_grey,
  },
  roleContainer: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: "15%",
  },
  userrole: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.nokia_blue,
  },
  icon: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: "2%",
  },
});

export default UserList;
