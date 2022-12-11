import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNews } from '../services/NewsService';
import { Context } from '../contexts/Context';
import ManageNewsList from '../component/lists/ManageNewsList';
import { SimpleSearchBar } from '../component/SearchBar';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const ManageNewsScreen = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searching, setSearching] = useState(false);
  const { newsUpdate } = useContext(Context);
  const { getAlllNews, news } = useNews();
  const isDraft = 0;

  const filteredNews = (news) => {
    if (searchPhrase == '') {
      return news;
    } else {
      const filtered = news.filter((i) =>
        i.news_title.toLowerCase().includes(searchPhrase.toLowerCase())
      );
      return filtered;
    }
  };

  useEffect(() => {
    getAlllNews(isDraft);
  }, [newsUpdate]);

  return (
    <View style={styles.container}>
      <SimpleSearchBar
        searching={searching}
        setSearching={setSearching}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <View style={styles.newsContainer}>
        <FlatList
          data={filteredNews(news)}
          renderItem={({ item }) => (
            <ManageNewsList navigation={navigation} news={item} />
          )}
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
    paddingHorizontal: '4%',
  },
  headerContainer: {
    marginBottom: '5%',
  },
  header: {
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    color: colors.dark_text,
  },
  newsContainer: {
    marginBottom: '20%',
  },
});
export default ManageNewsScreen;
