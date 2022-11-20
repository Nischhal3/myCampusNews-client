import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import defaultImage from '../assets/images/blank_image.jpg';
import colors from '../utils/colors';
import { baseUrl } from '../utils/variables';

const DraftNewsList = ({ navigation, news }) => {
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  let url = '';
  if (news.photoName == 'unavailable') {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}/${news.photoName}`;
    // url = uploadDefaultUri;
  }
  const navigatioToPubishNews = () => {
    navigation.navigate('Publish', { news: news, isDraft: true });
  };

  return (
    <TouchableOpacity onPress={navigatioToPubishNews}>
      <View>
        <Text>{news.news_title}</Text>
        <Text>{news.news_content}</Text>
        <Text>{news.news_op}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
export default DraftNewsList;
