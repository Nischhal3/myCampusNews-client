import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Button, Pressable } from "react-native";
import { Context } from "../contexts/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

const Profile = ({navigation}) => {
  const { user, setIsLoggedIn } = useContext(Context);
  const [type, setType] = useState("image");
  const [imageSelected, setImageSelected] = useState(false);
  // const userToken = await AsyncStorage.getItem("userToken");
  const baseUrl = "http://10.0.2.2:3000/";
  var url = "";

  if (user.avatar_name == "unavailable") {
    url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HrjlxizejA_sfkfPhIaAdv5Cxy6A-HGFzA&usqp=CAU";
  } else {
    url = `${baseUrl}avatar/${user.avatar_name}`;
  }

  return (
    <View
    style={styles.container}
    >
      <Pressable>
        <Image style={styles.avatar} source={{ uri: url }} />
      </Pressable>
      <Text>CONTACT NUMBER: {user.contact_n}</Text>
      <Text>Email: {user.email}</Text>
      <Text>USER FULL NAME: {user.full_name}</Text>
      <Text>EMPLOYEE NUMBER: {user.employee_n}</Text>
      <Text>DEPARTMENT LOCATION: {user.department_l}</Text>
      <Icon name="account-edit" color="#4F8EF7" size={32} onPress={() => {
          navigation.navigate('EditProfile');
        }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: '100%',
    paddingTop: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  }
});
export default Profile;
