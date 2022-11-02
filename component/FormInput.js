import React from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FormInput = (props) => {
  return (
    <SafeAreaView>
      <TextInput
        placeholder={props.name}
        name={props.name}
        textEntry={props.textEntry}
        onChangeText={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </SafeAreaView>
  );
};

export default FormInput;
