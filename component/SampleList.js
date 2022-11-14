import React from 'react';
import { Text, View } from 'react-native';
import {Avatar, ListItem as RNEListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {baseUrl} from '../utils/variables';

const SampleList = ({ navigation, news }) => {
  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('SingleNews',{file: news});
      }}
    >
      <Avatar
        size="large"
        source={{uri: `${baseUrl}/${news.photoName}`}}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {news.news_title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {news.news_time}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

SampleList.propTypes = {
  news: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default SampleList;
