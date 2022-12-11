import React from 'react';
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
import { FormInput } from '../component/AppInputs';
import ErrorMessage from '../component/ErrorMessage';
import { register } from '../services/UserService';
import fontSize from '../utils/fontSize';
import colors from '../utils/colors';
import { SubmitButton } from '../component/AppButtons';

const Register = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;

      const userData = await register(data);
      console.log('From register page', userData);

      if (userData.status == 200) {
        Alert.alert('Success', 'Successfully signed up.');
        resetField('fullName');
        resetField('email');
        resetField('password');
        resetField('confirmPassword');
      } else {
        Alert.alert(userData.message);
      }
    } catch (error) {
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
              <Text style={styles.headerTitle}>Register</Text>
              <Text style={styles.headerContent}>
                Please fill in your details below
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Please enter your username',
                  },
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
                name="fullName"
              />

              <ErrorMessage
                error={errors?.fullName}
                message={errors?.fullName?.message}
              />

              <Controller
                control={control}
                rules={{
                  required: { value: true, message: 'Please enter your email' },
                  pattern: {
                    value: /\S+@\b(\w*nokia)\b\.\b(\w*com)+$/,
                    message: 'Not valid email.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Email Address"
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    leftIcon="email-outline"
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
                    message: 'Password cannot be empty',
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

              <Controller
                control={control}
                rules={{
                  required: { value: true, message: 'Password not match' },
                  validate: (value) => {
                    const { password } = getValues();
                    if (value === password) {
                      return true;
                    } else {
                      return 'Passwords do not match.';
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    name="Confirm Password"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    textEntry={true}
                    leftIcon="lock-check-outline"
                  />
                )}
                name="confirmPassword"
              />

              <ErrorMessage
                error={errors?.confirmPassword}
                message={errors?.confirmPassword?.message}
              />
            </View>

            <SubmitButton title="Register" onPress={handleSubmit(onSubmit)} />
            <View style={styles.footerContainer}>
              <Image
                style={styles.footerImage}
                source={require('../assets/nokia/nokia.png')}
              />
              <Text style={styles.footerText}>
                <Text style={styles.footerText1}>
                  Already have an account?{' '}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.footerText2}> Log In</Text>
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

export default Register;
