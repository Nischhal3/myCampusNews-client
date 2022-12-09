import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../services/UserService";
import { Context } from "../contexts/Context";
import UserList from "../component/lists/UserList";
import { SimpleSearchBar } from "../component/SearchBar";

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const ManageUsersScreen = ({ navigation }) => {
  const { getAllUsers, userList } = useUser();
  const { updateUserList } = useContext(Context);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searching, setSearching] = useState(false);

  const filteredUsers = (users) => {
    if (searchPhrase == "") {
      return users;
    } else {
      const filtered = users.filter((i) =>
        i.full_name.toLowerCase().includes(searchPhrase.toLowerCase())
      );
      return filtered;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [updateUserList]);

  return (
    <View style={styles.container}>
      <SimpleSearchBar
        searching={searching}
        setSearching={setSearching}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <View style={styles.usersContainer}>
        <FlatList
          data={filteredUsers(userList)}
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
    paddingHorizontal: "4%",
  },
  headerContainer: {
    marginBottom: "5%",
  },
  header: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    color: colors.dark_text,
  },
  usersContainer: {
    marginBottom: "20%",
  },
});
export default ManageUsersScreen;
