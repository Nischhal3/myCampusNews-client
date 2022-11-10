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
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../component/AppInputs";
import ErrorMessage from "../component/ErrorMessage";
import fontSize from "../utils/fontSize";
import colors from "../utils/colors";
import { SubmitButton } from "../component/AppButtons";
import { Context } from "../contexts/Context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putUser, getUserByToken, getUserById } from "../services/UserService";

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(Context);
  const [type, setType] = useState("image");
  const baseUrl = "http://10.0.2.2:3000/";
  var url = "";

  if (user.avatar_name == "unavailable") {
    url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HrjlxizejA_sfkfPhIaAdv5Cxy6A-HGFzA&usqp=CAU";
  } else {
    url = `${baseUrl}avatar/${user.avatar_name}`;
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
          <View style={styles.container}>
            <Pressable onPress={pickImage}>
              <Image style={styles.avatar} source={{ uri: image }} />
            </Pressable>

            <View style={styles.inputContainer}>
              <Text style={styles.headerContent}>USERNAME</Text>
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
                  />
                )}
                name="fullName"
              />

              <ErrorMessage
                error={errors?.fullName}
                message={errors?.fullName?.message}
              />

              <Text style={styles.headerContent}>CONTACT NUMBER</Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Contact number"
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="contactNumber"
              />

              <Text style={styles.headerContent}>E-MAIL</Text>
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
                  />
                )}
                name="email"
              />

              <ErrorMessage
                error={errors?.email}
                message={errors?.email?.message}
              />

              <Text style={styles.headerContent}>EMPLOYEE NUMBER</Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Employee number"
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="employeeNumber"
              />

              <Text style={styles.headerContent}>DEPARTMENT LOCATION</Text>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Department location"
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="departmentLocation"
              />
            </View>
            <SubmitButton title="Save" onPress={handleSubmit(onSubmit)} />
            <SubmitButton title="Cancel" onPress={onCancel} />
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
  container: {
    flex: 1,
    marginHorizontal: "12%",
  },
  headerContainer: {
    marginTop: "25%",
    height: "10%",
  },
  headerTitle: {
    fontSize: fontSize.ultra,
    fontWeight: "bold",
    fontFamily: "IBM",
    color: colors.dark_text,
    marginBottom: 5,
  },
  headerContent: {
    fontSize: fontSize.small,
    fontFamily: "IBM",
    color: colors.dark_grey,
  },
  inputContainer: {
    height: 500,
    justifyContent: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EditProfileScreen;
