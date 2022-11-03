import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const FormInput = (props) => {
    const {leftIcon, rightIcon} = props;
    return (
        <View style={styles.formInputContainer}>
            <McIcons name={leftIcon} size={28} color='#000000' />
            <TextInput
                placeholder={props.name}
                name={props.name}
                textEntry={props.textEntry}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                style={styles.formInputText}
            />
            <McIcons name={rightIcon} size={28} color='#000000' />
        </View>
    );
  };

  const styles = StyleSheet.create({
    formInputContainer: {
        borderBottomColor: "#000000",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        alignItems: 'center',
    },
    formInputText: {
        marginLeft: 5,
    },
  })
  
  export default FormInput;