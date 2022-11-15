import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { FormInput } from "../component/AppInputs";
import ErrorMessage from "../component/ErrorMessage";
import { SubmitButton } from "../component/AppButtons";
import { Context } from "../contexts/Context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putUser, getUserByToken, getUserById } from "../services/UserService";
import defaultAvatar from "../assets/images/blank_avatar.jpg";

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'

const EditProfileScreen = ({ navigation }) => {
  const uploadDefaultUri = Image.resolveAssetSource(defaultAvatar).uri;
  const { user, setUser } = useContext(Context);
  const [type, setType] = useState("image");
  const baseUrl = "http://10.0.2.2:3000/";
  var url = "";

  if (user.avatar_name == "unavailable") {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}avatar/${user.avatar_name}`;
    // url = uploadDefaultUri;
  }

  const [image, setImage] = useState(url);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setType(result.type);
    }
  };

  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: user.full_name,
      contactNumber: user.contact_n,
      email: user.email,
      employeeNumber: user.employee_n,
      departmentLocation: user.department_l,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("contactNumber", data.contactNumber);
    formData.append("employeeNumber", data.employeeNumber);
    formData.append("departmentLocation", data.departmentLocation);
    const filename = image.split("/").pop();
    let fileExtension = filename.split(".").pop();
    fileExtension = fileExtension === "jpg" ? "jpeg" : fileExtension;
    formData.append("avatar", {
      uri: image,
      name: filename,
      type: type + "/" + fileExtension,
    });
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await putUser(formData, token);
      Alert.alert(response.message);
      if (response.message == "User info updated") {
        const userData = await getUserById(user.user_id, token);
        setUser(userData);
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    resetField("fullName");
    resetField("contactNumber");
    resetField("email");
    resetField("employeeNumber");
    resetField("departmentLocation");
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.cancelContainer} onPress={onCancel}>
            <McIcons name="arrow-left" size={32} color={colors.negative} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Profile</Text>
          <TouchableOpacity style={styles.saveContainer} onPress={handleSubmit(onSubmit)}>
            <McIcons name="content-save-edit-outline" size={32} color={colors.positive} />
          </TouchableOpacity>

          <View style={styles.container}>

            <TouchableOpacity onPress={pickImage}>
              <Image style={styles.avatar} source={{ uri: image }} />
            </TouchableOpacity>

            <View style={styles.inputContainer}>

              <View style={styles.inputItemContainer}>

              <Text style={styles.inputItemHeader}>USERNAME</Text>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your username",
                    },
                    minLength: {
                      value: 3,
                      message: "Username has to be at least 3 characters.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      name="Username"
                      textEntry={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      textColor={colors.primary}
                    />
                  )}
                  name="fullName"
                />

                <ErrorMessage
                  error={errors?.fullName}
                  message={errors?.fullName?.message}
                />
              </View>

              <View style={styles.inputItemContainer}>
                <Text style={styles.inputItemHeader}>CONTACT NUMBER</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      name="Contact number"
                      textEntry={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      textColor={colors.primary}
                    />
                  )}
                  name="contactNumber"
                />
              </View>

              <View style={styles.inputItemContainer}>
                <Text style={styles.inputItemHeader}>EMAIL</Text>
                <Controller
                  control={control}
                  rules={{
                    required: { value: true, message: "Please enter your email" },
                    pattern: {
                      value: /\S+@\b(\w*nokia)\b\.\b(\w*com)+$/,
                      message: "Not valid email.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      name="Email Address"
                      textEntry={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      textColor={colors.primary}
                    />
                  )}
                  name="email"
                />

                <ErrorMessage
                  error={errors?.email}
                  message={errors?.email?.message}
                />
              </View>

              <View style={styles.inputItemContainer}>
                <Text style={styles.inputItemHeader}>EMPLOYEE NUMBER</Text>

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      name="Employee number"
                      textEntry={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      textColor={colors.primary}
                    />
                  )}
                  name="employeeNumber"
                />
              </View>

              <View style={styles.inputItemContainer}>
                <Text style={styles.inputItemHeader}>DEPARTMENT LOCATION</Text>

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      name="Department location"
                      textEntry={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      textColor={colors.primary}
                    />
                  )}
                  name="departmentLocation"
                />
              </View>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  cancelContainer: {
    position: 'absolute',
    left: "4%",
    top: "2%",
  },
  saveContainer: {
    position: 'absolute',
    right: "4%",
    top: "2%",
  },
  header: {
    marginTop: "4%",
    textAlign: 'center',
    fontSize: fontSize.regular,
    fontWeight: 'bold',
    color: colors.dark_text,
  },
  container: {
    flex: 1,
    marginTop: "5%",
    padding: "5%",
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  inputContainer: {
    flex: 1,
    margin: "5%",
    justifyContent: "space-evenly",
    // borderWidth: 1,
  },
  inputItemContainer: {
    marginBottom: 5,
  },
  inputItemHeader: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.dark_text,
  },
});
export default EditProfileScreen;
