import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SampleList from '../component/SampleList';
import { Context } from '../contexts/Context';
import NewsList from '../component/NewsList';
import LargeNewsList from '../component/LargeNewsList';
import { getAlllNews } from '../services/NewsService';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const { user, token, updateNews } = useContext(Context);
  const timeInterval = 3000;
  const is_draft = 0;

  // Fetch data from server every 3 seconds or whenever there is change in updateNews value
  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNews() {
        const response = await getAlllNews(token, is_draft);
        setNews(response.reverse());
      }
      fetchNews();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [updateNews]);

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>Search bar</Text>

      <View style={styles.newsContainer}>
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <LargeNewsList navigation={navigation} news={item} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    padding: '2%',
  },
  newsContainer: {
    marginTop: 15,
  },
});
export default Home;
