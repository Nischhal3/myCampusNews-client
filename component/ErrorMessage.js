import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const ErrorMessage = (props) => {
  return <Text style={styles.errorText}>{props.error && props.message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.negative,
    fontFamily: 'IBM',
    marginBottom: 5,
  },
});
export default ErrorMessage;
