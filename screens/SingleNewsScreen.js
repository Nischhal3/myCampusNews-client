import React, { createRef, useContext, useEffect, useState } from "react";
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
import { SwipeablePanel } from "rn-swipeable-panel";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../component/AppInputs";
import { SubmitButton } from "../component/AppButtons";
import ErrorMessage from "../component/ErrorMessage";
import { getAllCommentOfNews, postComment, postFavorite, removeFavorite, checkFavorite } from "../services/NewsService";
import { Context } from "../contexts/Context";
import CommentList from '../component/CommentList';
import {baseUrl} from '../utils/variables';

// utils Imports
import {formatToDate, formatToDistance} from "../utils/timestamp";

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'

const SingleNews = ({ route, navigation }) => {
  const { token, updateComment, setUpdateComment } = useContext(Context);
  const [comments, setComments] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const { file } = route.params;

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
      console.log("data", comment);
      const comments = await postComment(comment, file.news_id, token);
      setUpdateComment(updateComment + 1)
      console.log(comments);
      resetField("content");
      setIsPanelActive(false);
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

  const openPanel = () => {
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
  };

  const getComments = async () => {
    try {
      const comments = await getAllCommentOfNews(file.news_id, token);
      if(comments.message != "comment not found"){
        setComments(comments.reverse());
        console.log("getComments", comments);
      }
    } catch (error) {
       console.log("getComments error", error);
       setComments([]);
    }
  };

  const userFavorite = async() => {
    try {
      if(!favorite){
        const response = await postFavorite(file.news_id, token);
        setFavorite(true);
        Alert.alert(response.message);
      }else{
        const response = await removeFavorite(file.news_id, token);
        setFavorite(false);
        Alert.alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFavorite = async () => {
    try {
      const response = await checkFavorite(file.news_id, token);
      console.log("response",response.status)
      if(response.status == 200){
        setFavorite(true);
      }else{
        setFavorite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const noComments = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No comment found</Text>
      </View>
    );
  };

  useEffect(() => {
    getComments();
    getFavorite();
  }, [file.news_id,updateComment]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>

      <View style={styles.container}>

        <Image style={styles.image} source={{ uri: `${baseUrl}/${file.photoName}` }} />
        {/* <Image style={styles.image} source={require('../assets/images/blank_image.jpg')} /> */}

        <View style={styles.detailContainer}>
            <Text style={styles.title}>{file.news_title}</Text>

            <View style={styles.dateContainer}>
            <McIcons name="calendar-clock" size={18} color={colors.medium_grey} />
                <Text style={styles.date}>{formatToDate(file.news_time)}</Text>
            </View>
            
            <View style={styles.dateDistanceContainer}>
                <McIcons name="update" size={18} color={colors.medium_grey} />
                <Text style={styles.dateDistance}>{formatToDistance(file.news_time)}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bookmarkContainer} onPress={() => { userFavorite() }}>
                    {favorite? (
                        <McIcons name="bookmark" size={28} color={colors.primary} />
                    ) : (
                        <McIcons name="bookmark-outline" size={28} color={colors.dark_text} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.likesContainer} onPress={() => { setLiked(!liked) }}>
                    {liked? (
                        <McIcons name="thumb-up" size={18} color={colors.primary} />
                    ) : (
                        <McIcons name="thumb-up-outline" size={18} color={colors.dark_text} />
                    )}
                    <Text style={[styles.likeNumbers, {color: liked? colors.primary : colors.dark_text}]}>123</Text>
                    {/* <Text>{file.likes}</Text> */}
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.contentContainer}>
            <Text style={styles.content}>{file.news_content}</Text>
        </View>

        <View style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            width: "100%",
            alignSelf: 'center',
            marginTop: 20,
        }}/>

        <View style={styles.commentContainer}>    
            <View style={styles.commentHeaderContainer}>
                <Text style={styles.commentHeader}>Comments ({comments.length})</Text>
                <TouchableOpacity style={styles.addCommentContainer} onPress={() => { openPanel() }}>
                    <McIcons name="comment-outline" size={20} color={colors.secondary} />
                    <Text style={styles.addComment}>Add comment</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={comments}
                ListEmptyComponent={noComments}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                renderItem={({ item }) => <CommentList comment={item}/>}
                maxHeight={200}
            />
        </View>

      </View>
      
      <SwipeablePanel
        style={styles.panel}
        {...panelProps}
        isActive={isPanelActive}
        noBackgroundOpacity={true}
        showCloseButton={true}
        noBar={true}
        closeRootStyle={{backgroundColor: colors.light_background}}
        closeIconStyle={{backgroundColor: colors.dark_text}}
      >
        <View style={styles.pannelContainer}>
            <Text style={styles.pannelHeader}>Comments</Text>
            <FlatList
                data={comments}
                ListEmptyComponent={noComments}
                showsVerticalScrollIndicator={false}
                // nestedScrollEnabled={true}
                renderItem={({ item }) => <CommentList comment={item}/>}
                maxHeight={200}
            />
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
              <FormInput
                name="Your comment"
                textEntry={false}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="content"
          />
          <ErrorMessage
            error={errors?.comment}
            message={errors?.comment?.message}
          />
        <SubmitButton title="Send" onPress={handleSubmit(onSubmit)} />
        </View>
      </SwipeablePanel>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light_background,
        paddingHorizontal: "5%",
        minHeight: "100%",
        borderWidth: 1,
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
        fontWeight: 'bold',
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
        bottom: 0,
        right: 2,
    },
    bookmarkContainer: {
        height: 30,
        alignItems: "center",
        marginRight: 20,
    },
    likesContainer: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    likeNumbers: {
        fontFamily: "IBM",
        fontSize: fontSize.caption,
        color: colors.dark_text,
    },
    commentContainer: {
        marginTop: 10,
    },
    commentHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
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
    panel: {
        width: "98%",
        height: "50%",
        borderWidth: 2,
        borderColor: colors.light_grey,
    },
    pannelContainer: {
        height: "100%",
        marginTop: 10,
        padding: 10,
        // borderWidth: 1,
    },
    pannelHeader: {
        fontFamily: "IBM",
        fontSize: fontSize.large,
        color: colors.dark_text,
        marginBottom: 20,
    },
});
export default SingleNews;
