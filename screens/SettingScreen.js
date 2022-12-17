import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SettingScreen = ({ navigation }) => {
  const [isDarkmode, setDarkmode] = useState(false);
  const [isPrivate, setPrivate] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const switchDarkmode = () => setDarkmode((previousState) => !previousState);
  const switchPrivate = () => setPrivate((previousState) => !previousState);
  const switchNotification = () => setNotification((previousState) => !previousState);

  return (
    <View style={styles.container}>

      <View style={styles.accountContainer}>
        <View style={styles.containerHeader}>
          <McIcons name="account-circle-outline" size={24} color={colors.dark_text}/>
          <Text style={styles.header}>Account</Text>
        </View>

        <TouchableOpacity style={styles.containerItem} onPress={() => {navigation.navigate("EditProfile")}}>
          <Text style={styles.containerItemText}>Edit profile</Text>
          <McIcons name="chevron-right" size={24} color={colors.dark_text}/>
        </TouchableOpacity>
        <View style={styles.containerItem}>
          <Text style={styles.containerItemText}>Dark mode</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: colors.dark_grey, true: colors.secondary }}
            thumbColor={isDarkmode ? colors.nokia_blue : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={switchDarkmode}
            value={isDarkmode}
          />
        </View>
        <View style={styles.containerItem}>
          <Text style={styles.containerItemText}>Private profile</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: colors.dark_grey, true: colors.secondary }}
            thumbColor={isPrivate ? colors.nokia_blue : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={switchPrivate}
            value={isPrivate}
          />
        </View>
      </View>

      <View style={styles.notificationContainer}>
        <View style={styles.containerHeader}>
          <McIcons name="bell-outline" size={24} color={colors.dark_text}/>
          <Text style={styles.header}>Notification</Text>
        </View>

        <View style={styles.containerItem}>
          <Text style={styles.containerItemText}>Notification</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: colors.dark_grey, true: colors.secondary }}
            thumbColor={isNotification ? colors.nokia_blue : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={switchNotification}
            value={isNotification}
          />
        </View>
      </View>

      <View style={styles.privacyContainer}>
        <View style={styles.containerHeader}>
          <McIcons name="shield-lock-outline" size={24} color={colors.dark_text}/>
          <Text style={styles.header}>Privacy and Security</Text>
        </View>

        <TouchableOpacity style={styles.containerItem} onPress={() => { navigation.navigate('EditPassword') }}>
          <Text style={styles.containerItemText}>Change password</Text>
          <McIcons name="chevron-right" size={24} color={colors.dark_text}/>
        </TouchableOpacity>
        <View style={styles.containerItem}>
          <Text style={styles.containerItemText}>Terms of services</Text>
          <McIcons name="chevron-right" size={24} color={colors.dark_text}/>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteAccButton}>
        <Text style={styles.deleteAcc}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: "4%",
    marginBottom: "5%",
  },
  header: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    marginLeft: 10,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: "10%",
  },
  containerItemText: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
  },
  switch: {
    right: -10,
    height: 25,
  },
  accountContainer: {
    marginTop: "10%",
  },
  notificationContainer: {
    marginTop: "10%",
  },
  privacyContainer: {
    marginTop: "10%",
  },
  deleteAccButton: {
    marginTop: "10%",
    marginHorizontal: "8%",
  },
  deleteAcc: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    color: colors.negative,
  },
})

export default SettingScreen;
