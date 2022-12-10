import React, { useContext, useEffect, useState, memo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import defaultImage from '../../assets/images/blank_image.jpg';
import {
  getAllNewsView,
  postNewsViews,
  useLike,
  userFavorite,
} from '../../services/NewsService';
import { Context } from '../../contexts/Context';
import { baseUrl } from '../../utils/variables';

// UI Imports
import colors from '../../utils/colors';
import fontSize from '../../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { formatToOnlyDate } from '../../utils/timestamp';

// Displays all news
const LargeNewsList = ({ navigation, news }) => {
  const { getNumberOfLike, getUserLike, liked, likedNumber } = useLike();
  const { checkFavorite } = userFavorite();
  const { updateFavorite, updateLike, token, user } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  const [newsView, setNewsView] = useState([]);
  const timeInterval = 3000;
  var url = '';

  if (news.photoName == 'unavailable') {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}/${news.photoName}`;
  }

  // Fetching data from database
  useEffect(() => {
    checkFavorite(news.news_id);
    getNumberOfLike(news.news_id);
    getUserLike(news.news_id);

    // Fetching total news view every 3 second interval
    const interval = setInterval(() => {
      async function fetchNewsView() {
        setNewsView(await getAllNewsView(token, news.news_id));
      }
      fetchNewsView();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [updateFavorite, updateLike]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        postNewsViews(token, user.user_id, news.news_id);
        navigation.navigate('SingleNews', { file: news });
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: url }} />
        </View>

        <View style={styles.sideContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryBorder}>
              <Text style={styles.category}>{news.category}</Text>
            </View>
          </View>

          <View style={styles.contentConatiner}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {news.news_title}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <McIcons
              name="calendar-clock"
              size={18}
              color={colors.medium_grey}
            />
            <Text style={styles.timeStamp}>
              {formatToOnlyDate(news.news_time)}
            </Text>
          </View>

          <View style={styles.bottomRight}>
            <View style={styles.likeContainer}>
              {liked ? (
                <McIcons name="thumb-up" size={18} color={colors.medium_grey} />
              ) : (
                <McIcons
                  name="thumb-up-outline"
                  size={18}
                  color={colors.medium_grey}
                />
              )}
              <Text style={styles.likeNumber}>{likedNumber}</Text>
            </View>
            <View style={styles.readContainer}>
              <McIcons
                name="eye-outline"
                size={18}
                color={colors.medium_grey}
              />
              {newsView.length > 0 ? (
                <Text style={styles.readNumber}>{newsView[0].count}</Text>
              ) : (
                ''
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: colors.light_background,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 110,
  },
  imageContainer: {
    width: '30%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sideContainer: {
    width: '68%',
    paddingTop: 2,
  },
  categoryContainer: {
    height: '20%',
  },
  categoryBorder: {
    position: 'absolute',
    backgroundColor: colors.nokia_blue,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
    minWidth: '15%',
  },
  category: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.light_text,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
  },
  timeStamp: {
    marginLeft: 4,
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.medium_grey,
  },
  bottomRight: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
    right: 5,
  },
  contentConatiner: {
    marginTop: 2,
  },
  title: {
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.dark_text,
  },
  readContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  readNumber: {
    fontFamily: 'IBM',
    fontSize: fontSize.caption,
    color: colors.medium_grey,
    marginLeft: 4,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeNumber: {
    fontFamily: 'IBM',
    fontSize: fontSize.caption,
    color: colors.medium_grey,
    marginLeft: 4,
  },
});

export default memo(LargeNewsList);
