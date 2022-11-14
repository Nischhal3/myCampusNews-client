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
  Alert
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

const SingleNews = ({ route, navigation }) => {
  const { token, updateComment, setUpdateComment } = useContext(Context);
  const [comments, setComments] = useState([]);
  const [favorite, setFavorite] = useState(false);
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

  useEffect(() => {
    getComments();
    getFavorite();
  }, [file.news_id,updateComment]);

  return (
    <View style={styles.container}>
      <Text>{file.news_title}</Text>
      <Text>{file.news_time}</Text>
      <Image
        style={styles.image}
        source={{ uri: `${baseUrl}/${file.photoName}` }}
      />
      <Text>{file.news_content}</Text>
      {favorite? (
        <Button
        title="Favorite"
        color="#f194ff"
        onPress={() => {
          userFavorite();
        }}
      />
      ):(
        <Button
        title="Favorite"
        onPress={() => {
          userFavorite();
        }}
      />
      )

      }
      <Button
        title="Add comment"
        onPress={() => {
          openPanel();
        }}
      />
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentList comment={item}/>}
      />
      <SwipeablePanel
        style={styles.panel}
        {...panelProps}
        isActive={isPanelActive}
      >
        <View style={{ alignItems: "center" }}>
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
        </View>
        <SubmitButton title="Send" onPress={handleSubmit(onSubmit)} />
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
  panel: {
    maxHeight: "20%",
  },
});
export default SingleNews;
