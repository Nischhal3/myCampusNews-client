import React, { createRef, useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import defaultImage from '../../assets/images/blank_image.jpg';
import { Context } from "../../contexts/Context";
import { baseUrl } from "../../utils/variables";
import { useNews } from '../../services/NewsService';
import { formatToOnlyDate } from '../../utils/timestamp';

// UI Imports
import colors from "../../utils/colors";
import fontSize from "../../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ManageNewsList = ({ navigation, news }) => {
  const [highlight, setHighlight] = useState([true]);
  const { user } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  var url = "";

  if (news.photoName == "unavailable") {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}/${news.photoName}`;
  }

  const { deleteNews,updateNewsHighlight } = useNews();

  const switchHighlight = () => {
    news.highlighted == 0 ? updateNewsHighlight(1,news.news_id) : updateNewsHighlight(0,news.news_id)
    // setHighlight(!highlight);
  }

  const newsDelete = () => {
    Alert.alert(
      `Delete news ${news.news_content}?`,
      'This action cannot be undo.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel button clicked'), style: 'cancel'},
        {text: 'Delete', onPress: () => deleteNews(news.news_id), style: 'destructive'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('SingleNews', { file: news, path: "manageNews"}  );
      }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: url }} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.date}>{formatToOnlyDate(news.news_time)}</Text>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{news.news_title}</Text>
      </View>

      <TouchableOpacity
        style={styles.highlightContainer}
        onPress = {() => {switchHighlight()}}
      >
        {news.highlighted == 1 ? (
          <Text style={[
            styles.highlight,
            { color: highlight? colors.nokia_blue : colors.primary },
          ]}>
            Highlight
          </Text>
        ) : (
          <Text style={[
            styles.highlight,
            { color: highlight? colors.nokia_blue : colors.primary },
          ]}>
            Regular
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => newsDelete()}>
        <McIcons name="delete" size={18} color={colors.negative} />   
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.light_background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
    flexDirection: "row",
    padding: 3,
  },
  imageContainer: {
    // borderWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 2,
  },
  contentContainer: {
    marginLeft: "4%",
    paddingVertical: 2,
    width: "45%",
  },
  date: {
    fontFamily: "IBM",
    fontSize: fontSize.caption,
    fontWeight: "bold",
    color: colors.dark_grey,
    // marginBottom: 2,
  },
  title: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.dark_text,
  },
  highlightContainer: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: "10%",
  },
  highlight: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    fontWeight: "bold",
    color: colors.positive,
  },
  icon: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: "1%",
  },
});

export default ManageNewsList;