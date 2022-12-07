import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import defaultImage from '../../assets/images/blank_image.jpg';
import { baseUrl } from '../../utils/variables';
import { Context } from '../../contexts/Context';

// UI Imports
import colors from '../../utils/colors';
import fontSize from '../../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { deleteNews, useNews } from '../../services/NewsService';

const DraftNewsList = ({ navigation, news }) => {
  const { setDrawerFocus, token, draft, setDraft } = useContext(Context);
  const { getAllParagraphOfNews } = useNews();

  const navigatioToPubishNews = async () => {
    const response = await getAllParagraphOfNews(news.news_id);
    navigation.navigate('Publish', {
      news: news,
      paragraph: response,
      preview: false,
      fromDraft: true,
    }),
      setDrawerFocus('Publish');
    setDraft(draft + 1);
  };

  const deleteDraftNews = async () => {
    Alert.alert(
      `Delete news ${news.news_content}?`,
      'This action cannot be undo.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel button clicked'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteNews(token, news.news_id),
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <TouchableOpacity onPress={navigatioToPubishNews}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `${baseUrl}/${news.photoName}` }}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {news.news_title}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.op} numberOfLines={1} ellipsizeMode="tail">
              {news.news_op}
            </Text>
          </View>
        </View>

        <View style={styles.sideContainer}>
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={() => deleteDraftNews()}
          >
            <McIcons name="delete-outline" size={24} color={colors.negative} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 70,
    height: 65,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mainContainer: {
    width: '70%',
    marginLeft: 10,
  },
  titleContainer: {
    marginBottom: 5,
  },
  title: {
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
  op: {
    fontFamily: 'IBM',
    fontSize: fontSize.medium,
    color: colors.dark_grey,
  },
  sideContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default DraftNewsList;
