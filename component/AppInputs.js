import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const FormInput = (props) => {
    return (
        <View style={styles.formInputContainer}>
            <TextInput
                placeholder={props.name}
                name={props.name}
                textEntry={props.textEntry}
                onChangeText={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
            />
        </View>
    );
  };

  const styles = StyleSheet.create({
    formInputContainer: {
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
    },
  })
  
  export default FormInput;