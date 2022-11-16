import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SampleList from '../component/SampleList';
import { Context } from '../contexts/Context';
import NewsList from '../component/NewsList';
import { getAlllNews } from '../services/NewsService';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Home = ( {navigation} ) => {
  const [news, setNews] = useState([]);
  const { user, token, updateNews } = useContext(Context);
  const timeInterval = 3000;

  // Fetch data from server every 3 seconds or whenever there is change in updateNews value
  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNews() {
        const response = await getAlllNews(token)
        setNews(response.reverse());
      }
      fetchNews();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [updateNews]);

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
