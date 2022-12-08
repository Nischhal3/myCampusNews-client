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
    const {leftIcon, textColor, width, height, minHeight, maxHeight, textAlign} = props;
    return (
        <View style={[styles.multilineInputContainer, {width: width, height: height, minHeight: minHeight, maxHeight: maxHeight, marginBottom: props.marginBottom}]}>
            <McIcons name={leftIcon} size={28} color='#000000' />
            <TextInput
                placeholder={props.name}
                name={props.name}
                secureTextEntry={props.textEntry}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                style={[styles.multilineInputText, {color: textColor}]}
                keyboardType="default"
                multiline={true}
                textAlignVertical={textAlign}
            />
        </View>
    );
  }
  const MultilineInputNoBorder = (props) => {
    const {leftIcon, textColor, width, height, minHeight, maxHeight, textAlign} = props;
    return (
        <View style={[styles.multilineInputNoBorderContainer, {width: width, height: height, minHeight: minHeight, maxHeight: maxHeight}]}>
            <McIcons name={leftIcon} size={28} color='#000000' />
            <TextInput
                placeholder={props.name}
                name={props.name}
                secureTextEntry={props.textEntry}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                style={[styles.multilineInputText, {color: textColor}]}
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
        marginBottom: 2,
    },
    multilineInputContainer: {
        borderWidth: 1,
        borderColor: colors.light_grey,
        borderRadius: 5,
        flexDirection: "row",
        width: "100%",
        padding: 4,
    },
    multilineInputNoBorderContainer: {
        flexDirection: "row",
        width: "100%",
        padding: 4,
    },
    multilineInputText: {
        marginLeft: 5,
    },
  })
  
  export {FormInput, MultilineInput, MultilineInputNoBorder};