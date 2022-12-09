import React,  { useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { userFavorite } from "../services/NewsService";
import { Context } from "../contexts/Context";

// Import list component
import NewsList from '../component/lists/NewsList';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';

const BookmarkScreen = ({navigation}) => {
  const { getFavoriteList, favoriteList,favorite } = userFavorite();
  const { updateFavorite,updateLike } = useContext(Context);

  useEffect(() => {
    getFavoriteList();
  }, [updateFavorite,favorite,updateLike]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bookmarked news ( {favoriteList.length} )</Text>
      </View>
      <View style={styles.newsContainer}>
        <FlatList
          data={favoriteList}
          renderItem={({ item }) => (
            <NewsList navigation={navigation} news={item} />
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
export default BookmarkScreen;