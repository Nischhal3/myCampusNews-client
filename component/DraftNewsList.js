import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import defaultImage from '../assets/images/blank_image.jpg';
import { baseUrl } from '../utils/variables';
import { Context } from '../contexts/Context';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { deleteNews } from '../services/NewsService';

const DraftNewsList = ({ navigation, news }) => {
  const { setDrawerFocus, token } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  let url = '';

  if (news.photoName == 'unavailable') {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}/${news.photoName}`;
    // url = uploadDefaultUri;
  }

  const navigatioToPubishNews = () => {
    navigation.navigate('Publish', { news: news }), setDrawerFocus('Publish');
  };

  const deleteDraftNews = async () => {
    try {
      const deleteDraftNews = await deleteNews(token, news.news_id);
      console.log('delete', deleteDraftNews);
    } catch (error) {
      console.log('Post news', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={navigatioToPubishNews}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: url }} />
          {/* <Text>{news.photoName}</Text> */}
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
            onPress={deleteDraftNews}
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
    width: '20%',
    height: '100%',
    // borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mainContainer: {
    width: '70%',
    marginLeft: 5,
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
  },
  sideContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default DraftNewsList;
