import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAlllNews } from '../services/NewsService';
import { Context } from '../contexts/Context';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import DraftNewsList from '../component/DraftNewsList';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Saved drafts</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <DraftNewsList navigation={navigation} news={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
  },
  headerContainer: {
    // borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: "2%",
  },
  header: {
    fontFamily: "IBM",
    fontSize: fontSize.subtitle,
  },
  listContainer: {
    marginHorizontal: "2%",
  },
})

export default DraftScreen;
