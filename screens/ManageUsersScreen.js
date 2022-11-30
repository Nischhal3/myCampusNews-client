import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import colors from "../utils/colors";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../services/UserService";
import { Context } from "../contexts/Context";
import UserList from "../component/UserList";

const ManageUsersScreen = ({ navigation }) => {
  const { getAllUsers, userList } = useUser();
  const { updateUserList } = useContext(Context);

  useEffect(() => {
    getAllUsers();
  }, [updateUserList]);
  return (
    <View style={styles.container}>
      <View style={styles.usersContainer}>
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <UserList navigation={navigation} otherUser={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    padding: "5%",
  },
  usersContainer: {
    marginTop: 50,
  },
});
export default ManageUsersScreen;
