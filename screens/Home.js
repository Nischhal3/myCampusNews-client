import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../contexts/Context';
import { getToken } from '../services/UserService';

const Home = () => {
  const { token, setToken } = useContext(Context);
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
