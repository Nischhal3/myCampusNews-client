import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getAlllNews } from '../services/NewsService';
import SampleList from '../component/SampleList';
import { Context } from '../contexts/Context';

const Home = () => {
  const [news, setNews] = useState([]);
  const { user} = useContext(Context);
  // Fetching all news from database
  useEffect(() => {
    async function fetchNews() {
      setNews(await getAlllNews());
    }
    fetchNews();
  }, []);

  console.log('from home data', user);

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
