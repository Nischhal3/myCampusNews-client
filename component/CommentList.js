import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar, ListItem as RNEListItem } from "react-native-elements";
import PropTypes from "prop-types";
import { Context } from "../contexts/Context";
import { getUserById } from '../services/UserService';
import {baseUrl} from '../utils/variables';

const CommentList = ({ comment }) => {
  const { token } = useContext(Context);
  const [commentOwner, setCommentOwner] = useState([]);
  const getUser = async () => {
    const user = await getUserById(comment.u_id, token);
    console.log("user",user);
    setCommentOwner(user)
  };

  useEffect(() => {
    getUser();
  }, [comment.u_id]);

  return (
    <RNEListItem>
      <Avatar
        size="small"
        source={{ uri: `${baseUrl}avatar/${commentOwner.avatar_name}` }}
      ></Avatar>
      <RNEListItem.Title numberOfLines={1}>
          {commentOwner.full_name}:
        </RNEListItem.Title>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1}>
          {comment.comment_content}
        </RNEListItem.Title>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

CommentList.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentList;
