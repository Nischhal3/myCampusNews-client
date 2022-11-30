import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../services/UserService";
import { Context } from "../contexts/Context";
import UserList from "../component/UserList";

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ManageUsersScreen = ({ navigation }) => {
  const { getAllUsers, userList } = useUser();
  const { updateUserList } = useContext(Context);

  useEffect(() => {
    getAllUsers();
  }, [updateUserList]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Users management</Text>
      </View>
      <View style={styles.usersContainer}>
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <UserList navigation={navigation} user={item} />
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
    paddingHorizontal: "4%",
  },
  headerContainer: {
    marginBottom: "2%",
  },
  header: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    color: colors.dark_text,
  },
  usersContainer: {
    marginBottom: 45,
  },
});
export default ManageUsersScreen;
