import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAlllNews } from '../services/NewsService';
import { Context } from '../contexts/Context';
import { FlatList } from 'react-native-gesture-handler';
import LargeNewsList from '../component/LargeNewsList';
import { StatusBar } from 'expo-status-bar';
import DraftNewsList from '../component/DraftNewsList';

const DraftScreen = ({ route, navigation }) => {
  const { token } = useContext(Context);
  const [news, setNews] = useState([]);
  const is_draft = 1;
  const timeInterval = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNews() {
        const response = await getAlllNews(token, is_draft);
        setNews(response);
      }
      fetchNews();
    }, timeInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <DraftNewsList navigation={navigation} news={item} />
          )}
          showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={false}
          // horizontal={true}
        />
        {/* <FlatList
          data={news}
          renderItem={({ item }) => <NewsList navigation={navigation} news={item} />}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>

      <StatusBar style="auto" />
    </View>
  );
};
export default DraftScreen;
