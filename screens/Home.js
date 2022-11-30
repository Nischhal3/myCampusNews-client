import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import SampleList from "../component/SampleList";
import { Context } from "../contexts/Context";
import NewsList from "../component/NewsList";
import LargeNewsList from "../component/LargeNewsList";
import { useNews } from "../services/NewsService";
import { SearchBar } from "../component/SearchBar";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";

const Home = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searching, setSearching] = useState(false);
  const {
    setNewsUpdate,
    newsUpdate,
    searchByCategory,
    searchUpdate,
    searchOptions,
    newsByCategory,
    setNewsByCategory,
  } = useContext(Context);
  const {
    getAlllNews,
    getAlllNewsIninterval,
    newsInterval,
    news,
    getAlllNewsByCategory,
  } = useNews();
  const [notificationState, setNotificationState] = useState(true);
  const timeInterval = 3000;
  const isDraft = 0;

  const notification = () => {
    getAlllNewsIninterval(isDraft);
    if (news.length > 0 && newsInterval.length > 0) {
      if (news[0].news_time < newsInterval[0].news_time) {
        if (notificationState == true) {
          Dialog.show(
            {
              type: ALERT_TYPE.WARNING,
              textBody: "Admin has just published a news!",
              button: "close",
              onHide: () => {
                setNewsUpdate(newsUpdate + 1);
                setNotificationState(true);
              },
            },
            setNotificationState(false)
          );
        }
      } else if (news[0].news_time > newsInterval[0].news_time) {
        setNewsUpdate(newsUpdate + 1);
      }
    }
  };
  useEffect(() => {
    getAlllNews(isDraft);
  }, [newsUpdate]);

  useEffect(() => {
    searchByCategory && getAlllNewsByCategory(searchOptions);
  }, [searchUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      !searchByCategory && notification();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [newsInterval, searchByCategory]);

  const filteredList = (news) => {
    if (searchPhrase == "") {
      return news;
    } else {
      const filtered = news.filter((i) =>
        i.news_title.toLowerCase().includes(searchPhrase.toLowerCase())
      );
      return filtered;
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <SearchBar
          searching={searching}
          setSearching={setSearching}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />

        <View style={styles.newsContainer}>
          {searchByCategory === false ? (
            <FlatList
              data={filteredList(news)}
              renderItem={({ item }) => (
                <LargeNewsList navigation={navigation} news={item} />
              )}
              showsVerticalScrollIndicator={false}
              // showsHorizontalScrollIndicator={false}
              // horizontal={true}
            />
          ) : (
            <FlatList
              data={newsByCategory}
              renderItem={({ item }) => (
                <LargeNewsList navigation={navigation} news={item} />
              )}
              showsVerticalScrollIndicator={false}
              // showsHorizontalScrollIndicator={false}
              // horizontal={true}
            />
          )}
        </View>

        <StatusBar style="auto" />
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    padding: "2%",
  },
  newsContainer: {
    marginBottom: "10%",
  },
});
export default Home;
