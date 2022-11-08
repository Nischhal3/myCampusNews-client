import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Context } from '../contexts/Context';

const Profile = () => {
    const { user} = useContext(Context);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>user id: {user.user_id}</Text>
        <Text>user email: {user.email}</Text>
        <Text>user full name: {user.full_name}</Text>
      </View>
    )
  }
  export default Profile;