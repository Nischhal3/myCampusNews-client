import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Context } from "../contexts/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import defaultAvatar from "../assets/images/blank_avatar.jpg";
import { useUser } from "../services/UserService";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Profile = ({ navigation, route = {} }) => {
  const { deleteUser } = useUser();
  const uploadDefaultUri = Image.resolveAssetSource(defaultAvatar).uri;
  const { user, setIsLoggedIn } = useContext(Context);
  const [type, setType] = useState("image");
  const [imageSelected, setImageSelected] = useState(false);
  const baseUrl = "http://10.0.2.2:3000/";
  var url = "";

  if (route.params == undefined) {
    if (user.avatar_name == "unavailable") {
      url = uploadDefaultUri;
    } else {
      url = `${baseUrl}avatar/${user.avatar_name}`;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.editProfileIcon}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <McIcons
            name="account-edit-outline"
            size={28}
            color={colors.secondary}
          />
        </TouchableOpacity>

        <Image style={styles.avatar} source={{ uri: url }} />

        <View style={styles.userContainer}>
          <Text style={styles.username}>{user.full_name}</Text>
          <Text style={styles.role}>{user.role == 0 ? "Admin" : "User"}</Text>
        </View>

        <View
          style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            width: "100%",
            alignSelf: "center",
          }}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.contactInfo}>Contact Information</Text>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="phone-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>CONTACT NUMBER</Text>
            </View>
            <Text style={styles.infoItem}>{user.contact_n}</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="email-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>EMAIL</Text>
            </View>
            <Text style={styles.infoItem}>{user.email}</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="card-account-details-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>EMPLOYEE NUMBER</Text>
            </View>
            <Text style={styles.infoItem}>{user.employee_n}</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="office-building-marker-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>DEPARTMENT LOCATION</Text>
            </View>
            <Text style={styles.infoItem}>{user.department_l}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    if (route.params.user.avatar_name == "unavailable") {
      url = uploadDefaultUri;
    } else {
      url = `${baseUrl}avatar/${route.params.user.avatar_name}`;
    }
    return (
      <View style={styles.container}>
         <TouchableOpacity
          style={styles.backArrowIcon}
          onPress={() => navigation.navigate("MUsers")}
        >
          <McIcons
            name="arrow-left"
            size={28}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteUserIcon}
          onPress={() => {navigation.navigate("MUsers");deleteUser(route.params.user.user_id)}}
        >
          <McIcons
            name="delete-outline"
            size={28}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <Image style={styles.avatar} source={{ uri: url }} />

        <View style={styles.userContainer}>
          <Text style={styles.username}>{route.params.user.full_name}</Text>
          <Text style={styles.role}>
            {route.params.user.role == 0 ? "Admin" : "User"}
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            width: "100%",
            alignSelf: "center",
          }}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.contactInfo}>Contact Information</Text>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="phone-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>CONTACT NUMBER</Text>
            </View>
            <Text style={styles.infoItem}>{route.params.user.contact_n}</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="email-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>EMAIL</Text>
            </View>
            <Text style={styles.infoItem}>{route.params.user.email}</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="card-account-details-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>EMPLOYEE NUMBER</Text>
            </View>
            <Text style={styles.infoItem}>{route.params.user.employee_n}</Text>
          </View>

          <View style={styles.infoItemContainer}>
            <View style={styles.infoItemIconText}>
              <McIcons
                name="office-building-marker-outline"
                size={24}
                color={colors.dark_text}
              />
              <Text style={styles.infoItemText}>DEPARTMENT LOCATION</Text>
            </View>
            <Text style={styles.infoItem}>
              {route.params.user.department_l}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    paddingHorizontal: "5%",
  },
  editProfileIcon: {
    position: "absolute",
    top: 0,
    right: 15,
  },
  backArrowIcon: {
    position: "absolute",
    top: 0,
    left: 15,
  },
  deleteUserIcon: {
    position: "absolute",
    top: 0,
    right: 15,
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  userContainer: {
    paddingTop: "5%",
    alignSelf: "center",
    paddingBottom: "10%",
  },
  username: {
    fontSize: fontSize.subtitle,
    fontWeight: "bold",
    color: colors.dark_text,
  },
  role: {
    fontFamily: "IBM",
    fontSize: fontSize.regular,
    color: colors.nokia_blue,
  },
  infoContainer: {
    marginTop: "5%",
    margin: "3%",
  },
  contactInfo: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    color: colors.dark_grey,
    marginBottom: "8%",
  },
  infoItemContainer: {
    margin: "2%",
    marginBottom: "8%",
  },
  infoItemIconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoItemText: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.dark_text,
    marginLeft: "5%",
  },
  infoItem: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    color: colors.primary,
    marginTop: 5,
  },
});
export default Profile;
