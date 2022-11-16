import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Avatar, ListItem as RNEListItem } from "react-native-elements";
import PropTypes from "prop-types";
import { Context } from "../contexts/Context";
import { getUserById } from '../services/UserService';
import { baseUrl } from '../utils/variables';
import defaultImage from "../assets/images/blank_avatar.jpg";

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons'

const CommentList = ({ comment }) => {
  const { token, user } = useContext(Context);
  const [commentOwner, setCommentOwner] = useState([]);
  const getUser = async () => {
    const user = await getUserById(comment.u_id, token);
    console.log("user",user);
    setCommentOwner(user)
  };

  useEffect(() => {
    getUser();
  }, [comment.u_id]);

  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  var url = "";

  if (commentOwner.avatar_name == "unavailable") {
      url = uploadDefaultUri;
    } else {
      url = `${baseUrl}avatar/${commentOwner.avatar_name}`;
      // url = uploadDefaultUri;
    }

  return (

    <View style={styles.container} onPress={() => {navigation.navigate()}}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image style={styles.avatar} source={{ uri: url }} />
        {/* <Text>{news.photoName}</Text> */}
      </TouchableOpacity>

      <View style={styles.contentConatiner}>
        <Text style={styles.username}>{commentOwner.full_name}</Text>
        <Text style={styles.comment}>{comment.comment_content}</Text>
        {/* <Text>{news.news_id}</Text> */}
        {/* <Text style={styles.timeStamp}>xx/xx/xxxx</Text> */}
      </View>

      <View style={styles.sideContainer}>
        {user.role == 0 || commentOwner.user_id == user.user_id? (
          <TouchableOpacity onPress={() => {/* delete comment */}}>
            <McIcons name="delete-outline" size={20} color={colors.negative} />
          </TouchableOpacity>
        ) : (
          <>
          </>
        )}
      </View>

    </View>
  );
};

CommentList.propTypes = {
  comment: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    width: "100%",
  },
  imageContainer: {
    marginVertical: 5,
    width: "20%",
    // borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
  },
  contentConatiner: {
    marginLeft: 5,
    width: "70%",
    // borderWidth: 1,
  },
  username: {
    fontFamily: "IBM",
    fontSize: fontSize.small,
    fontWeight: 'bold',
    color: colors.dark_text,
  },
  comment: {
    marginTop: 2,
    fontFamily: "IBM",
    fontSize: fontSize.small,
    color: colors.dark_text,
  },
  timeStamp: {
    // position: 'absolute',
    bottom: 0,
    fontFamily: "IBM",
    fontSize: fontSize.caption,
    color: colors.medium_grey,
  },
  sideContainer: {
    paddingVertical: 2,
  },
})

export default CommentList;
