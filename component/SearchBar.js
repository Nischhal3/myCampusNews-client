// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, TouchableOpacity, Text } from "react-native";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SearchBar = ({searching, setSearching, searchPhrase, setSearchPhrase}) => {
  return (
    <View style={styles.container}>
      <View style={searching ? styles.isSearchingInputContainer : styles.notSearchingInputContainer}>
        <McIcons name="magnify" size={24} color={colors.dark_text}/>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setSearching(true);
          }}
        />
        {searching && (
            <TouchableOpacity style={styles.clearButton} onPress={() => setSearchPhrase("")}>
                <McIcons name="close" size={24} color={colors.dark_text}/>
            </TouchableOpacity>
        )}
      </View>
      {searching && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => {Keyboard.dismiss(), setSearching(false)}}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        // margin: 15,
        // justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        paddingBottom: 10,
        // borderWidth: 1,
    },
    notSearchingInputContainer: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        alignItems: "center",
    },
    isSearchingInputContainer: {
        padding: 10,
        flexDirection: "row",
        width: "85%",
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        alignItems: "center",
    },
    input: {
        fontSize: fontSize.medium,
        marginLeft: 10,
        width: "80%",
    },
    clearButton: {
        position: "absolute",
        right: "2%",
    },
    cancelButton: {
        marginLeft: "2%",
    },
    cancel: {
        fontFamily: "IBM",
        fontSize: fontSize.medium,
        color: colors.negative
    },
});

export default SearchBar;