import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getAlllNews } from '../services/NewsService';
import SampleList from '../component/SampleList';
import { Context } from '../contexts/Context';
import NewsList from '../component/NewsList';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Home = ( {navigation} ) => {
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
      <Text>News screen</Text>

      <View style={styles.newsContainer}>
        <FlatList
          data={news}
          renderItem={({ item }) => <NewsList navigation={navigation} news={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    padding: "5%",
  },
  newsContainer: {
    marginTop: 50,
  },
});
export default Home;
