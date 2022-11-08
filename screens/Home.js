import React from 'react';
import { Text, View } from 'react-native';
import { getToken } from '../services/UserService';

const Home = () => {
  getToken();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home screen</Text>
    </View>
  );
};
export default Home;
