import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DraftScreen = ({ route, navigations }) => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    async function fetchNews() {}
    fetchNews();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Draft News</Text>
    </View>
  );
};
export default DraftScreen;
