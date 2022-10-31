import React from 'react';
import { Text, View } from 'react-native';

const SampleList = ({ news }) => {
  return (
    <View>
      <Text>{news.news_title}</Text>
      <Text>{news.news_content}</Text>
      <Text>{news.news_id}</Text>
      <Text>{news.photoName}</Text>
    </View>
  );
};

export default SampleList;
