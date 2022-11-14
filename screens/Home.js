import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SampleList from '../component/SampleList';
import { Context } from '../contexts/Context';
import { getAlllNews } from '../services/NewsService';

const Home = ({navigation }) => {
  const [news, setNews] = useState([]);
  const { user, token, updateNews } = useContext(Context);
  const timeInterval = 3000;

  // Fetch data from server every 3 seconds or whenever there is change in updateNews value
  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNews() {
        setNews(await getAlllNews(token));
      }
      fetchNews();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [updateNews]);

  return (
    <View style={styles.container}>
      <FlatList
        data={news.reverse()}
        renderItem={({ item }) => <SampleList news={item} navigation={navigation}/> }
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
export default Home;
