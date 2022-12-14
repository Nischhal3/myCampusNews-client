import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Platform,
  Text,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Context } from '../contexts/Context';
import ErrorMessage from '../component/ErrorMessage';
import { login, getUserById } from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import { FormInput } from "../component/AppInputs";
import { SubmitButton } from '../component/AppButtons';

// UI
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import fontSize from '../utils/fontSize';
import colors from '../utils/colors';

const LoginScreen = ({ navigation }) => {
  // Password visible
  const [visible, setVisible] = useState([false]);
  const { setUser, setIsLoggedIn, setToken } = useContext(Context);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      const userData = await login(data);
      if (userData) {
        // Storing token to async storage
        await AsyncStorage.setItem('userToken', userData.token);
        const user = await getUserById(userData.user.user_id,userData.token);
        setUser(user);
        setToken(userData.token);
        setIsLoggedIn(true);
        resetField('email');
        resetField('password');
      }
    } catch (error) {
      Alert.alert('Username or password is incorrect.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Welcome back</Text>
              <Text style={styles.headerContent}>Please login to continue</Text>
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Please enter your email ends with "nokia.com"',
                  },
                  pattern: {
                    value: /\S+@\b(\w*nokia)\b\.\b(\w*com)+$/,
                    message: 'Not valid email.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Email"
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    leftIcon="account-outline"
                  />
                )}
                name="email"
              />

              <ErrorMessage
                error={errors?.email}
                message={errors?.email?.message}
              />

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Please enter your password',
                  },
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
                  <View style={styles.passwordInputWrap}>
                    <FormInput
                      name="Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      textEntry={visible ? true : false}
                      leftIcon="lock-outline"
                    />
                    <TouchableWithoutFeedback onPress={toggleVisible}>
                      <McIcons
                        name={visible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={colors.light_grey}
                        style={styles.visibleIcon}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                )}
                name="password"
              />

              <ErrorMessage
                error={errors?.password}
                message={errors?.password?.message}
              />
            </View>

            <SubmitButton title="Login" onPress={handleSubmit(onSubmit)} />
            <View style={styles.footerContainer}>
              <Image
                style={styles.footerImage}
                source={require('../assets/nokia/nokia.png')}
              />
              <Text>
                <Text style={styles.footerText1}>Do not have an account? </Text>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.footerText2}> Register</Text>
                </TouchableWithoutFeedback>
              </Text>
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
    backgroundColor: colors.light_background,
  },
  container: {
    flex: 1,
    marginHorizontal: '12%',
  },
  headerContainer: {
    marginTop: '25%',
    height: '10%',
  },
  headerTitle: {
    fontSize: fontSize.ultra,
    fontWeight: 'bold',
    fontFamily: 'IBM',
    color: colors.dark_text,
    marginBottom: 5,
  },
  headerContent: {
    fontSize: fontSize.small,
    fontFamily: 'IBM',
    color: colors.dark_grey,
  },
  inputContainer: {
    height: 350,
    justifyContent: 'center',
  },
  passwordInputWrap: {
    width: '100%',
    flexDirection: 'row',
  },
  visibleIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 5,
  },
  footerContainer: {
    marginTop: '35%',
    alignItems: 'center',
  },
  footerImage: {
    height: 35,
    width: '30%',
    resizeMode: 'contain',
  },
  footerText1: {
    fontFamily: 'IBM',
    color: colors.dark_text,
  },
  footerText2: {
    fontFamily: 'IBM',
    color: colors.nokia_blue,
  },
});

export default LoginScreen;
