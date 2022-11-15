import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const FormInput = (props) => {
    const {leftIcon, rightIcon, textColor} = props;
    return (
        <View style={styles.formInputContainer}>
            <McIcons name={leftIcon} size={28} color='#000000' />
            <TextInput
                placeholder={props.name}
                name={props.name}
                secureTextEntry={props.textEntry}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                style={[styles.formInputText, {color: textColor}]}
                keyboardType="default"
            />
            <McIcons name={rightIcon} size={28} color='#000000' />
        </View>
    );
  };

  const MultilineInput = (props) => {
    const {leftIcon, textColor, width, height, textAlign} = props;
    return (
        <View style={styles.multilineInputContainer}>
            <McIcons name={leftIcon} size={28} color='#000000' />
            <TextInput
                placeholder={props.name}
                name={props.name}
                secureTextEntry={props.textEntry}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                style={[styles.multilineInputText, {color: textColor, width: width, height: height}]}
                keyboardType="default"
                multiline={true}
                textAlignVertical={textAlign}
            />
        </View>
    );
  }

  const styles = StyleSheet.create({
    formInputContainer: {
        borderBottomColor: colors.dark_background,
        borderBottomWidth: 0.5,
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
    },
    formInputText: {
        marginLeft: 5,
    },
    multilineInputContainer: {
        borderWidth: 1,
        borderColor: colors.light_grey,
        borderRadius: 10,
        flexDirection: "row",
        width: "100%",
        padding: 4,
    },
    multilineInputText: {
        marginLeft: 5,
    },
  })
  
  export {FormInput, MultilineInput};