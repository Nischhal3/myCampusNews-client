import React from 'react';
import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const WelcomeScreenButton = (props) => {
const {onPress, title, color, textColor, outline} = props;
    return (
      <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.appBtnContainer,
        {backgroundColor: color},
      ]}
      >
        <Text 
        style={[
          styles.appBtnTxt,
          {color: textColor},
        ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    appBtnContainer: {
      backgroundColor: "#124191",
      width: "80%",
      height: 50,
      borderColor: "#fff",
      borderWidth: 2,
      borderRadius: 10,
    },
    appBtnTxt: {
      color: colors.light_text,
      height: "105%",
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: fontSize.subtitle,
      fontFamily: "Goldman-regular",
    },
  })
  export default WelcomeScreenButton;