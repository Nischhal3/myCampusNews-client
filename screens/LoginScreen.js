// npm install react-hook-form
import React, {useContext, useEffect, useState } from 'react';
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
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Context } from '../contexts/Context';
import FormInput from '../component/AppInputs';
import ErrorMessage from '../component/ErrorMessage';
import { login } from '../services/UserService';
import fontSize from '../utils/fontSize';
import colors from '../utils/colors';
import { SubmitButton } from '../component/AppButtons';

const LoginScreen = ({ navigation }) => {
    // Password visible
    const [visible, setVisible] = useState([true]);
  
    const toggleVisible = () => {
        setVisible(!visible)
    };

    const {setIsLoggedIn, setUser} = useContext(Context);
  
    const {
      control,
      handleSubmit,
      resetField,
      formState: { errors },
      getValues,
    } = useForm({
      defaultValues: {
        userName: '',
        password: '',
      },
      mode: 'onBlur',
    });
  
    const onSubmit = async (data) => {
      console.log('Login data', data);
  
      try {
        // need login in service
        const userData = await login(data);
        if (userData) {
            // need token
            // await AsyncStorage.setItem('userToken', userData.token);
            // setUser(userData.user);
            // setIsLoggedIn(true);
            // resetField('userName');
            // resetField('password');
        }
      } catch (error) {
        Alert.alert('Username or password is incorrect.');
        console.error(error);
      }
    };
  
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Welcome back</Text>
            <Text style={styles.headerContent}>Please login to continue</Text>
          </View>
  
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Please enter your username' },
                minLength: {
                  value: 3,
                  message: 'Username has to be at least 3 characters.',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  name="Username"
                  textEntry={false}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  leftIcon="account-outline"
                />
              )}
              name="userName"
            />
  
            <ErrorMessage
              error={errors?.fullName}
              message={errors?.fullName?.message}
            />
  
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Password cannot be empty' },
                pattern: {
                  /**
                   *  Password criteria
                   *  Minimum length 8 , atlease 1 digit
                   *  Atleast 1 upper case of lower case character
                   */
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message: 'Min 8 characters, uppercase & number',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  name="Password"
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
              error={errors?.password}
              message={errors?.password?.message}
            />
          </View>
      
          <SubmitButton title="Login" onPress={handleSubmit(onSubmit)}/>
          <View style={styles.footerContainer}>
            <Image style={styles.footerImage} source={require("../assets/nokia/nokiawhite.png")} />
            <Text style={styles.footerText}>
              <Text style={styles.footerText1}>Do not have an account? </Text>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Register")} >
                  <Text style={styles.footerText2}> Register</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    androidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
      marginHorizontal: "12%",
    },
    headerContainer: {
      marginTop: "25%",
      height: "10%",
      // marginBottom: "10%",
      // justifyContent: "space-around",
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
      height: 300,
      justifyContent: "center",
    },
    footerContainer: {
      marginBottom: "10%",
      alignItems: "center",
      justifyContent: 'flex-end',
      flex: 1,
    },
    footerImage: {
      width: "35%",
    },
    footerText: {
      flexDirection: 'column',
      flax: 1,
      justifyContent: 'space-around',
      top: "-5%",
    },
    footerText1: {
      fontFamily: "IBM",
      color: colors.dark_text,
    },
    footerText2Container: {
      // marginLeft: 5,
    },
    footerText2: {
      fontFamily: "IBM",
      color: colors.nokia_blue,
    },
  })

export default LoginScreen;