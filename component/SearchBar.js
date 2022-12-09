import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { SelectList } from "react-native-dropdown-select-list";
import { newsCategory } from '../utils/variables';
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
  const { setSearchByCategory ,setSearchUpdate,searchUpdate,setSearchOptions,newsByCategory, setNewsByCategory} = useContext(Context);
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
            : searchOption == 1? styles.notSearchingInputContainer : [styles.notSearchingInputContainer, {paddingVertical: 0}]
        }
      >
        <Menu
          visible={visible}
          anchor={
            visible ?
            <McIcons
              name="filter-variant-remove"
              size={24}
              color={colors.dark_text}
              onPress={showMenu}
            /> 
            : 
            searchOption === 1 ?
              <McIcons
                  name="magnify"
                  size={24}
                  color={colors.dark_text}
                  onPress={showMenu}
                />
              : <McIcons
                name="filter-variant"
                size={24}
                color={colors.dark_text}
                onPress={showMenu}
              />
          }
          onRequestClose={hideMenu}
          style={{top: 110}}
        >
          <MenuItem
            onPress={() => {
              hideMenu();
              setSearchOption(1);
              setSearchByCategory(false);
              setNewsByCategory([]);
            }}
            textStyle={styles.menuItemText}
          >
            By title
          </MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              setSearchOption(2);
              setSearchByCategory(true);
              setSearching(false);
            }}
            textStyle={styles.menuItemText}
          >
            By category
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
            fontFamily="IBM"
            placeholder="Select a category"
            searchPlaceholder="Search"
            inputStyles={{textTransform: "capitalize"}}
            boxStyles={{left: 10, width: 250, borderWidth: 0, textTransform: "capitalize"}}
            dropdownStyles={{left: 10, width: "100%", borderWidth: 0}}
            dropdownTextStyles={{textTransform: "capitalize"}}
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

const SimpleSearchBar = ({searching, setSearching, searchPhrase, setSearchPhrase}) => {
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
                <McIcons name="backspace-outline" size={20} color={colors.negative}/>
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
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
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
  menuItemText: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    color: colors.dark_text,
  },
});

export {SearchBar, SimpleSearchBar};
