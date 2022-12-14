import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getAlllNewsByDraft } from '../services/NewsService';
import { Context } from '../contexts/Context';
import { FlatList } from 'react-native-gesture-handler';

// Import list component
import DraftNewsList from '../component/lists/DraftNewsList';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const DraftScreen = ({ route, navigation }) => {
  const { token } = useContext(Context);
  const [news, setNews] = useState([]);
  const is_draft = 1;
  const timeInterval = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNews() {
        const response = await getAlllNewsByDraft(token, is_draft);
        setNews(response);
      }
      fetchNews();
    }, timeInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Drafted news {  news.length ? news.length : 0 }</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <DraftNewsList navigation={navigation} news={item} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.news_id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    paddingHorizontal: "4%",
  },
  headerContainer: {
    marginBottom: "5%",
  },
  header: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    color: colors.primary,
  },
});

export default DraftScreen;
