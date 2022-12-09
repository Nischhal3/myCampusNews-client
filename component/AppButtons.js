import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const WelcomeScreenButton = (props) => {
  const {onPress, title, color, textColor} = props;
  return (
    <TouchableOpacity 
    onPress={onPress} 
    style={[
      styles.welcomeBtnContainer,
      {backgroundColor: color},
    ]}
    >
      <Text 
      style={[
        styles.welcomeBtnTxt,
        {color: textColor},
      ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const SubmitButton = (props) => {
  const {onPress, title} = props;
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={
        styles.submitBtnContainer
      }
    >
      <Text 
        style={
          styles.submitBtnTxt
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
  
const styles = StyleSheet.create({
  welcomeBtnContainer: {
    backgroundColor: "#124191",
    width: "75%",
    height: 50,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
  },
  welcomeBtnTxt: {
    color: colors.light_text,
    height: "105%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: fontSize.subtitle,
    fontFamily: "Goldman-regular",
    alignSelf: 'center',
  },
  submitBtnContainer: {
    backgroundColor: "#124191",
    width: "100%",
    height: 45,
    borderRadius: 10,
  },
  submitBtnTxt: {
    color: colors.light_text,
    height: "105%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: fontSize.subtitle,
    fontFamily: "Goldman-regular",
  },
})
export { WelcomeScreenButton, SubmitButton };