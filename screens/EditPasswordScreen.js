import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Context } from "../contexts/Context";
import { SubmitButton } from "../component/AppButtons";
import {
  putUser,
  getUserByToken,
  getUserById,
  putUserPassword,
} from "../services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";
import fontSize from "../utils/fontSize";
import colors from "../utils/colors";
import ErrorMessage from "../component/ErrorMessage";
import { FormInput } from "../component/AppInputs";

const EditPasswordScreen = ({ navigation }) => {
  const { user, setIsLoggedIn, token } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState(false);

  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmNewPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      if (user.password == data.currentPassword) {
        delete data.currentPassword;
        delete data.confirmNewPassword;
        const userData = await putUserPassword(data, token);
        if (userData.message == "User password updated true") {
          resetField("currentPassword");
          resetField("password");
          resetField("confirmNewPassword");
          Alert.alert("Password updated!");
          navigation.navigate("Setting");
        }
      } else {
        Alert.alert("Current password incorrect!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    resetField("currentPassword");
    resetField("password");
    resetField("confirmNewPassword");
    navigation.navigate("Setting");
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
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Change password</Text>
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    required: { value: true, message: "Password not match" },
                    message: "Password cannot be empty",
                    validate: (value) => {
                      if (value === user.password) {
                        return true;
                      } else {
                        return "Passwords do not match.";
                      }
                    },
                  },
                  pattern: {
                    /**
                     *  Password criteria
                     *  Minimum length 8 , atlease 1 digit
                     *  Atleast 1 upper case of lower case character
                     */
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                    message: "Min 8 characters, uppercase & number",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Current password"
                    textEntry={true}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    leftIcon="lock-outline"
                  />
                )}
                name="currentPassword"
              />

              <ErrorMessage
                error={errors?.currentPassword}
                message={errors?.currentPassword?.message}
              />

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Password cannot be empty",
                  },
                  pattern: {
                    /**
                     *  Password criteria
                     *  Minimum length 8 , atlease 1 digit
                     *  Atleast 1 upper case of lower case character
                     */
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                    message: "Min 8 characters, uppercase & number",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="New password"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    textEntry={true}
                    leftIcon="lock-outline"
                  />
                )}
                name="password"
              />

              <ErrorMessage
                error={errors?.newPassword}
                message={errors?.newPassword?.message}
              />

              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "Password not match" },
                  validate: (value) => {
                    const { password } = getValues();
                    if (value === password) {
                      return true;
                    } else {
                      return "Passwords do not match.";
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Confirm New password"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    textEntry={true}
                    leftIcon="lock-check-outline"
                  />
                )}
                name="confirmNewPassword"
              />

              <ErrorMessage
                error={errors?.confirmNewPassword}
                message={errors?.confirmNewPassword?.message}
              />
            </View>

            <SubmitButton title="Save" onPress={handleSubmit(onSubmit)} />
            <SubmitButton title="Cancel" onPress={onCancel} />
            <View style={styles.footerContainer}>
              <Image
                style={styles.footerImage}
                source={require("../assets/nokia/nokia.png")}
              />
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
    height: 350,
    justifyContent: "center",
  },
  footerContainer: {
    marginTop: "35%",
    alignItems: "center",
  },
  footerImage: {
    height: 35,
    width: "30%",
    resizeMode: "contain",
  },
  footerText1: {
    fontFamily: "IBM",
    color: colors.dark_text,
  },
  footerText2: {
    fontFamily: "IBM",
    color: colors.nokia_blue,
  },
});
export default EditPasswordScreen;
