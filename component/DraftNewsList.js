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
  const hello = () => {
    navigation.navigate('Publish', { news: news, isDraft: true });
  };
  return (
    <TouchableOpacity onPress={hello}>
      <View>
        <Text>{news.news_title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
export default DraftNewsList;
