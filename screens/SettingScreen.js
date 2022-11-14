import React from 'react';
import { Text, View, Button } from 'react-native';

const SettingScreen = ({ navigation }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Setting screen</Text>
          <Button title="Change password"  onPress={() => {
          navigation.navigate('EditPassword')}}/>
      </View>
    )
  }
  export default SettingScreen;