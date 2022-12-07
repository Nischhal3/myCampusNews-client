import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { Context } from "../contexts/Context";
import LargeNewsList from "../component/lists/LargeNewsList";
import { useNews } from "../services/NewsService";
import { SearchBar } from "../component/SearchBar";
import HighlightList from "../component/lists/HighlightList";

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

  const _renderitem = ({ item }) => (
    <LargeNewsList navigation={navigation} news={item} />
  )

  const header = () => {
    return (
      <View>
        {
          searchPhrase == "" && newsInterval.filter(news => news.highlighted == 1).length > 0 ? (
            <View style={styles.highlightContainer}>
              <Text style={styles.header}>{newsInterval.filter(news => news.highlighted == 1).length} Highlighted news</Text>
              <FlatList
                horizontal={true}
                data={newsInterval}
                renderItem={({ item }) => (
                  <HighlightList navigation={navigation} news={item} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
            <></>
          )
        }
        {
          searchPhrase == "" ? (
            <Text style={styles.header}>Recent news</Text>
          ) : (
            <Text style={styles.header}>Results</Text>
          )
        }
      </View>
    )
  }

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <SearchBar
          searching={searching}
          setSearching={setSearching}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />

        <View style={newsInterval.filter(news => news.highlighted == 1).length ? styles.newsContainer1 : styles.newsContainer1}>
          {searchByCategory === false ? (
            <FlatList
              ListHeaderComponent={header()}
              data={filteredList(news)}
              renderItem={_renderitem}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.news_id}
            />
          ) : (
            <FlatList
              data={newsByCategory}
              renderItem={_renderitem}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.news_id}
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
  header:{
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  highlightContainer: {
    marginBottom: "5%",
  },
  newsContainer1: {
    marginBottom: "12%",
  },
  newsContainer2: {
    marginBottom: "82%",
  },
});
export default Home;
