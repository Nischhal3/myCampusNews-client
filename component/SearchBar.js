// SearchBar.js
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { SelectList } from "react-native-dropdown-select-list";
import { baseUrl, newsCategory } from '../utils/variables';
import { useNews } from '../services/NewsService';
import { Context } from '../contexts/Context';

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SearchBar = ({
  searching,
  setSearching,
  searchPhrase,
  setSearchPhrase,
}) => {
  const { setNewsUpdate, newsUpdate,setSearchByCategory ,setSearchUpdate,searchUpdate,setSearchOptions,newsByCategory, setNewsByCategory} = useContext(Context);
  const { getAlllNewsByCategory} = useNews();
  const [visible, setVisible] = useState(false);
  const [searchOption, setSearchOption] = useState(1);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const [selected, setSelected] = React.useState("");

  return (
    <View style={styles.container}>
      <View
        style={
          searching
            ? styles.isSearchingInputContainer
            : styles.notSearchingInputContainer
        }
      >
        <Menu
          visible={visible}
          anchor={
            <McIcons
              name="magnify"
              size={24}
              color={colors.dark_text}
              onPress={showMenu}
            />
          }
          onRequestClose={hideMenu}
        >
          <MenuItem
            onPress={() => {
              hideMenu();
              setSearchOption(1);
              setSearchByCategory(false);
              setNewsByCategory([]);
            }}
          >
            Title
          </MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              setSearchOption(2);
              setSearchByCategory(true);
            }}
          >
            Category
          </MenuItem>
        </Menu>
        {searchOption === 1 ? (
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setSearching(true);
            }}
          />
        ) : (
          <SelectList
            setSelected={(option) => setSelected(option)}
            onSelect={()=>{setSearchUpdate(searchUpdate + 1),setSearchOptions(selected)}}
            data={newsCategory}
            defaultOption={{ label: 'General News', value: 'general' }}
          />
        )}

        {searching && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchPhrase("")}
          >
            <McIcons
              name="backspace-outline"
              size={20}
              color={colors.negative}
            />
          </TouchableOpacity>
        )}
      </View>
      {searching && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            Keyboard.dismiss(), setSearching(false);
          }}
        >
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
    color: colors.secondary,
  },
});

export default SearchBar;
