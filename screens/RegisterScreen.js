import React, { useState } from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import FormInput from '../component/FormInput';
import ErrorMessage from '../component/ErrorMessage';

const Register = () => {
  const [text, onChangeText] = useState('Useless Text');
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log('Form data', data);
    resetField('username');
    resetField('email');
    resetField('password');
    resetField('confirmPassword');
  };
  return (
    <SafeAreaView>
      <Text>Register</Text>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'This is required.' },
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
          />
        )}
        name="username"
      />

      <ErrorMessage
        error={errors?.username}
        message={errors?.username?.message}
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'This is required.' },
          pattern: {
            value: /\S+@\b(\w*nokia)\b\.\b(\w*com)+$/,
            message: 'Not valid email.',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            name="email"
            textEntry={false}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="email"
      />

      <ErrorMessage error={errors?.email} message={errors?.email?.message} />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'This field cannot be empty' },
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
          required: { value: true, message: 'This field cannot be empty' },
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
            name="confirmPassword"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            textEntry={true}
          />
        )}
        name="confirmPassword"
      />

      <ErrorMessage
        error={errors?.confirmPassword}
        message={errors?.confirmPassword?.message}
      />
      <Button title="Submit" color="#f194ff" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

export default Register;
