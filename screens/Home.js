import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SampleList from '../component/SampleList';
import { Context } from '../contexts/Context';
import { getAlllNews } from '../services/NewsService';

const Home = () => {
  const [news, setNews] = useState([]);
  const { user, updateNews } = useContext(Context);
  const timeInterval = 6000;

  // Fetch data from server every one minutes or whenever there si change in updateNews value
  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNews() {
        setNews(await getAlllNews());
      }
      fetchNews();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [updateNews]);

  return (
    <View style={styles.container}>
      <Text>News List!</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => <SampleList news={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
