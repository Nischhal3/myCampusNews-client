import React, { createRef, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import defaultImage from '../../assets/images/blank_image.jpg';
import {
  getAllNewsView,
  postNewsViews,
  useLike,
  userFavorite,
  useNews,
} from '../../services/NewsService';
import { Context } from '../../contexts/Context';
import { baseUrl } from '../../utils/variables';
import {
  formatToDate,
  formatToDistance,
  formatToOnlyDate,
} from '../../utils/timestamp';

// UI Imports
import colors from '../../utils/colors';
import fontSize from '../../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {de} from 'date-fns/locale';

const HighlightList = ({ navigation, news }) => {
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
        </View>

          <View style={styles.dateContainer}>
            <McIcons
              name="calendar-clock"
              size={18}
              color={colors.light_text}
            />
            <Text style={styles.timeStamp}>
              {formatToOnlyDate(news.news_time)}
            </Text>
          </View>

        <View style={styles.contentContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{news.category}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {news.news_title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3,
    // elevation: 4,
    // backgroundColor: colors.light_background,
  },
  mainContainer: {
    width: 320,
    height: 200,
    marginRight: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.light_grey,
  },
  imageContainer: {
    width: '100%',
    height: "100%",
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // headerContainer: {
  //   paddingHorizontal: "2%",
  //   width: "100%",
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   backgroundColor: colors.nokia_blue,
  //   borderWidth: 1,
  //   borderColor: colors.light_background,
  //   padding: 5,
  // },
  categoryContainer: {
    width: "37%",
    backgroundColor: colors.nokia_blue,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.light_text,
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
    position: 'absolute',
    top: 5,
    left: 5,
  },
  timeStamp: {
    marginLeft: 4,
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.light_text,
  },
  // bottomRight: {
  //   // marginTop: "2%",
  //   position: 'absolute',
  //   right: 5,
  //   bottom: 2,
  // },
  contentContainer: {
    width: "100%",
    // marginTop: 5,
    // marginBottom: 20,
    // paddingHorizontal: 5,
    paddingTop: 2,
    paddingHorizontal: "1%",
    marginBottom: "2%",
    // height: 75,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: "2%",
  },
  title: {
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.light_text,
  },
  // readContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   // marginLeft: 10,
  // },
  // readNumber: {
  //   fontFamily: 'IBM',
  //   fontSize: fontSize.caption,
  //   color: colors.medium_grey,
  //   marginLeft: 4,
  // },
  // likeContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // likeNumber: {
  //   fontFamily: 'IBM',
  //   fontSize: fontSize.caption,
  //   color: colors.medium_grey,
  //   marginLeft: 4,
  // },
});

export default HighlightList;