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

const UserList = ({ navigation, user }) => {
  const { updateUserRole } = useUser();
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  var url = "";

  if (user.avatar_name == "unavailable") {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}avatar/${user.avatar_name}`;
  }

  const changeUserRole = () => {
    user.role == 0 ? updateUserRole(1,user.user_id) : updateUserRole(0,user.user_id)
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Profile", { user: user });
      }}
    >
      <View style={styles.contentConatiner}>
        <Image style={styles.image} source={{ uri: url }} />
        <Text style={styles.username}>{user.full_name}</Text>
        <Text style={styles.userrole}>{user.role == 0 ? "Admin" : "User"}</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            changeUserRole();
          }}
        >
          <McIcons name="account-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: colors.light_grey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  contentConatiner: {
    flexDirection: "row",
    marginLeft: 5,
    marginVertical: 5,
    width: "70%",
    alignItems: "center",
  },
  username: {
    marginLeft: 10,
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.dark_text,
  },
  userrole: {
    position: "absolute",
    marginHorizontal: 250,
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.nokia_blue,
  },
  icon: {
    position: "absolute",
    marginHorizontal: 320,
  },
});

export default UserList;
