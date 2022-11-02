import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ErrorMessage = (props) => {
  return <Text>{props.error && props.message} </Text>;
};

export default ErrorMessage;
