import React,  { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import colors from "../utils/colors";
import { StatusBar } from "expo-status-bar";
import { userFavorite } from "../services/NewsService";
import { Context } from "../contexts/Context";
import NewsList from '../component/NewsList';

const BookmarkScreen = ({navigation}) => {
  const { getFavoriteList, favoriteList,favorite } = userFavorite();
  const { updateFavorite,updateLike } = useContext(Context);

  useEffect(() => {
    getFavoriteList();
  }, [updateFavorite,favorite,updateLike]);

  return (
    <View style={styles.container}>
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
    padding: "5%",
  },
  newsContainer: {
    marginTop: 50,
  },
});
export default BookmarkScreen;