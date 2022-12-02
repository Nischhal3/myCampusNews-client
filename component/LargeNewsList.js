import React, { createRef, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import defaultImage from '../assets/images/blank_image.jpg';
import {
  getAllNewsView,
  postNewsViews,
  useLike,
  userFavorite,
  useNews,
} from '../services/NewsService';
import { Context } from '../contexts/Context';
import { baseUrl } from '../utils/variables';
import {
  formatToDate,
  formatToDistance,
  formatToOnlyDate,
} from '../utils/timestamp';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {de} from 'date-fns/locale';

const LargeNewsList = ({ navigation, news }) => {
  const {
    postAndRemoveLike,
    getNumberOfLike,
    getUserLike,
    liked,
    likedNumber,
  } = useLike();
  const { checkFavorite, postAndRemoveFavorite, favorite, getFavoriteList } =
    userFavorite();
  const { deleteNews } = useNews();
  const { updateFavorite, updateLike, token, user } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  var url = '';

  const [newsView, setNewsView] = useState([]);
  const timeInterval = 3000;
  if (news.photoName == 'unavailable') {
    url = uploadDefaultUri;
  } else {
    url = `${baseUrl}/${news.photoName}`;
    // url = uploadDefaultUri;
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

  useEffect(() => {
    checkFavorite(news.news_id);
    getNumberOfLike(news.news_id);
    getUserLike(news.news_id);
  }, [updateFavorite, updateLike]);

  // Fetching total news view every 3 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchNewsView() {
        setNewsView(await getAllNewsView(token, news.news_id));
      }
      fetchNewsView();
    }, timeInterval);
    return () => clearInterval(interval);
  }, []);

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
          {/* <Text>{news.photoName}</Text> */}
        </View>

        <View style={styles.sideContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{news.category}</Text>
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
          {/* {!favorite ? (
          <TouchableOpacity
            onPress={() => {
              postAndRemoveFavorite(news.news_id);
            }}
          >
            <McIcons
              name="bookmark-outline"
              size={24}
              color={colors.nokia_blue}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              postAndRemoveFavorite(news.news_id);
            }}
          >
            <McIcons name="bookmark" size={24} color={colors.nokia_blue} />
          </TouchableOpacity>
        )} */}
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

          { user.role == 0? (
            <TouchableOpacity style={styles.deleteNewsButton} onPress={() => newsDelete()}>
              <McIcons name="delete" size={18} color={colors.negative} />
              <Text style={styles.deleteNews}>Delete news</Text>
            </TouchableOpacity>
            ) : (
              <>
              </>
            )
          }
        </View>
      </View>

      <View style={styles.contentConatiner}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {news.news_title}
        </Text>
        {/* <Text style={styles.op} numberOfLines={2} ellipsizeMode="tail">
          {news.news_op}
        </Text> */}
        {/* <Text style={styles.content} numberOfLines={1} ellipsizeMode="tail">
          {news.news_content}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginRight: 15,
    width: '100%',
    borderRadius: 5,
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
    height: 135,
  },
  imageContainer: {
    width: '68%',
    height: "100%",
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sideContainer: {
    width: '30%',
    paddingHorizontal: 2,
  },
  categoryContainer: {
    backgroundColor: colors.nokia_blue,
    paddingVertical: 4,
    borderRadius: 3,
    marginBottom: 5,
  },
  category: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.light_text,
    textTransform: 'capitalize',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "5%",
  },
  timeStamp: {
    marginLeft: 4,
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.medium_grey,
  },
  bottomRight: {
    marginTop: "2%",
  },
  deleteNewsButton: {
    padding: 2,
    marginVertical: "8%",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.negative,
    borderRadius: 3,
  },
  deleteNews: {
    marginLeft: 2,
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.negative,
  },
  contentConatiner: {
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.dark_text,
  },
  op: {
    fontFamily: 'IBM',
    fontSize: fontSize.medium,
    color: colors.dark_grey,
  },
  content: {
    fontFamily: 'IBM',
    fontSize: fontSize.medium,
    color: colors.dark_grey,
  },
  readContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 10,
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

export default LargeNewsList;
