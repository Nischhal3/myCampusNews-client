import React, { createRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import defaultImage from "../../assets/images/blank_image.jpg";
import {
  getAllNewsView,
  postNewsViews,
  useLike,
  userFavorite,
  useNews,
} from "../../services/NewsService";
import { Context } from "../../contexts/Context";
import { baseUrl } from "../../utils/variables";
import {
  formatToDate,
  formatToDistance,
  formatToOnlyDate,
} from "../../utils/timestamp";

// UI Imports
import colors from "../../utils/colors";
import fontSize from "../../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { de } from "date-fns/locale";

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
  var url = "";

  const [newsView, setNewsView] = useState([]);
  const timeInterval = 3000;
  if (news.photoName == "unavailable") {
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
        navigation.navigate("SingleNews", { file: news });
      }}
    >
      {news.highlighted == 1 && (
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
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {news.news_title}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    width: 330,
    height: 180,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.light_grey,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: "3%",
  },
  timeStamp: {
    marginLeft: 4,
    fontFamily: "IBM",
    fontSize: fontSize.small,
    color: colors.light_text,
  },
  contentContainer: {
    width: "100%",
    paddingTop: 2,
    paddingBottom: "2%",
    marginBottom: "2%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: "3%",
  },
  title: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    fontWeight: "bold",
    color: colors.light_text,
  },
});

export default HighlightList;
