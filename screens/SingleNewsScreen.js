import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Input,
  TouchableOpacity,
  Icon,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import FormInput, {
  MultilineInput,
  MultilineInputNoBorder,
} from "../component/AppInputs";
import { SubmitButton } from "../component/AppButtons";
import ErrorMessage from "../component/ErrorMessage";
import { useComment, useLike, userFavorite } from "../services/NewsService";
import { Context } from "../contexts/Context";
import CommentList from "../component/CommentList";
import { baseUrl } from "../utils/variables";
import DialogInput from "react-native-dialog-input";

// utils Imports
import { formatToDate, formatToDistance } from "../utils/timestamp";

// UI Imports
import colors from "../utils/colors";
import fontSize from "../utils/fontSize";
import McIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SingleNews = ({ route, navigation }) => {
  const {
    updateComment,
    dialogInputVisible,
    setDialogInputVisible,
    editCommentInput,
    setEditCommentInput,
    updateLike,
    updateFavorite,
  } = useContext(Context);
  const { file } = route.params;
  const scrollViewRef = useRef();
  const {
    postAndRemoveLike,
    getNumberOfLike,
    getUserLike,
    liked,
    likedNumber,
  } = useLike();
  const { checkFavorite, postAndRemoveFavorite, favorite } = userFavorite();
  const { getAllCommentOfNews, postComment, comments } = useComment();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    mode: "onBlur",
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (comment) => {
    try {
      await postComment(comment, file.news_id);
      resetField("content");
    } catch (error) {
      console.error(error);
    }
  };

  const [panelProps] = useState({
    fullWidth: true,
    openLarge: true,
    closeOnTouchOutside: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });

  const noComments = () => {
    return (
      <View style={styles.noComments}>
        <Text style={{}}>No comments found</Text>
      </View>
    );
  };

  useEffect(() => {
    getAllCommentOfNews(file.news_id);
    checkFavorite(file.news_id);
    getUserLike(file.news_id);
    getNumberOfLike(file.news_id);
  }, [file.news_id, updateComment, updateLike, updateFavorite]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}
      ref={scrollViewRef}
    >
      <View style={styles.container}>
        <DialogInput
          isDialogVisible={dialogInputVisible}
          title={"Modify your comment"}
          initValueTextInput={editCommentInput}
          textInputProps={{ autoCorrect: false, autoCapitalize: false }}
          submitInput={(inputText) => {
            setEditCommentInput(inputText), setDialogInputVisible(false);
            // backend put comment
          }}
          closeDialog={() => setDialogInputVisible(false)}
        ></DialogInput>

        <Image
          style={styles.image}
          source={{ uri: `${baseUrl}/${file.photoName}` }}
        />
        {/* <Image style={styles.image} source={require('../assets/images/blank_image.jpg')} /> */}

        <View style={styles.detailContainer}>
          <Text style={styles.title}>{file.news_title}</Text>

          <View style={styles.dateContainer}>
            <McIcons
              name="calendar-clock"
              size={18}
              color={colors.medium_grey}
            />
            <Text style={styles.date}>{formatToDate(file.news_time)}</Text>
          </View>

          <View style={styles.dateDistanceContainer}>
            <McIcons name="update" size={18} color={colors.medium_grey} />
            <Text style={styles.dateDistance}>
              {formatToDistance(file.news_time)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.bookmarkContainer}
              onPress={() => {
                postAndRemoveFavorite(file.news_id);
              }}
            >
              {favorite ? (
                <McIcons name="bookmark" size={28} color={colors.nokia_blue} />
              ) : (
                <McIcons
                  name="bookmark-outline"
                  size={28}
                  color={colors.nokia_blue}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.likesContainer}
              onPress={() => {
                postAndRemoveLike(file.news_id);
              }}
            >
              {liked ? (
                <McIcons name="thumb-up" size={20} color={colors.nokia_blue} />
              ) : (
                <McIcons
                  name="thumb-up-outline"
                  size={20}
                  color={colors.nokia_blue}
                />
              )}
              <Text
                style={[
                  styles.likeNumbers,
                  { color: liked ? colors.nokia_blue : colors.nokia_blue },
                ]}
              >
                {likedNumber}
              </Text>
              {/* <Text>{file.likes}</Text> */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.opContainer}>
          <Text style={styles.op}>{file.news_op}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{file.news_content}</Text>
        </View>

        <View
          style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            width: "100%",
            alignSelf: "center",
            marginTop: 20,
          }}
        />

        <View style={styles.commentContainer}>
          <View style={styles.commentHeaderContainer}>
            <Text style={styles.commentHeader}>
              Comments ({comments.length})
            </Text>
            <TouchableOpacity
              style={styles.addCommentContainer}
              onPress={() => {
                scrollViewRef.current.scrollToEnd({ animated: true });
              }}
            >
              <McIcons
                name="comment-outline"
                size={20}
                color={colors.secondary}
              />
              <Text style={styles.addComment}>Add comment</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            ListEmptyComponent={noComments}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({ item }) => <CommentList comment={item} />}
            maxHeight={400}
          />
        </View>

        <View
          style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            width: "100%",
            alignSelf: "center",
            marginTop: 20,
          }}
        />

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your comment",
              },
              minLength: {
                value: 3,
                message: "Comment has to be at least 3 characters.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <MultilineInputNoBorder
                name="Share your thoughts..."
                textEntry={false}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                textAlign="top"
                width="85%"
              />
            )}
            name="content"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmit(onSubmit)}
          >
            <McIcons
              name="send"
              size={24}
              color={colors.primary}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    paddingHorizontal: "5%",
    minHeight: "100%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
  detailContainer: {
    marginVertical: 10,
  },
  title: {
    fontFamily: "IBM",
    fontSize: fontSize.subtitle,
    fontWeight: "bold",
    color: colors.dark_text,
  },
  dateContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    marginLeft: 2,
    fontFamily: "IBM",
    fontSize: fontSize.small,
    color: colors.medium_grey,
  },
  dateDistanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateDistance: {
    marginLeft: 2,
    fontFamily: "IBM",
    fontSize: fontSize.small,
    color: colors.medium_grey,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 2,
    right: 2,
    alignItems: "center",
  },
  bookmarkContainer: {
    height: 30,
    alignItems: "center",
    marginRight: 15,
  },
  likesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  likeNumbers: {
    fontFamily: "IBM",
    fontSize: fontSize.caption,
    color: colors.dark_text,
  },
  opContainer: {
    marginTop: 0,
  },
  op: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    color: colors.dark_text,
    autoCapitalize: true,
  },
  contentContainer: {
    marginTop: 15,
  },
  content: {
    fontFamily: "IBM",
    fontSize: fontSize.medium,
    color: colors.dark_text,
  },
  noComments: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  commentHeader: {
    fontFamily: "IBM",
    fontSize: fontSize.large,
    color: colors.dark_text,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addComment: {
    marginLeft: 2,
    fontFamily: "IBM",
    fontSize: fontSize.small,
    color: colors.secondary,
  },
  inputContainer: {
    marginTop: "2%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  sendButton: {
    marginTop: 2,
    alignSelf: "flex-start",
    width: "20%",
  },
});
export default SingleNews;
