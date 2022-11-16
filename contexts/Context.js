import React, { useEffect, useState } from 'react';
import { getToken } from '../services/UserService';

const Context = React.createContext({});

const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [drawerFocus, setDrawerFocus] = useState('Home');
  const [updateAvatar, setUpdateAvatar] = useState(0);
  const [token, setToken] = useState(null);
  const [newsUpdate, setNewsUpdate] = useState(0);
  const [updateComment, setUpdateComment] = useState(0);
  const [dialogInputVisible, setDialogInputVisible] = useState(false);
  const [editCommentInput, setEditCommentInput] = useState("");
  const [updateLike, setUpdateLike] = useState(0);
  const [updateFavorite, setUpdateFavorite] = useState(0);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        drawerFocus,
        setDrawerFocus,
        updateAvatar,
        setUpdateAvatar,
        token,
        setToken,
        newsUpdate,
        setNewsUpdate,
        updateComment,
        setUpdateComment,
        dialogInputVisible,
        setDialogInputVisible,
        editCommentInput,
        setEditCommentInput,
        updateLike,
        setUpdateLike,
        updateFavorite,
        setUpdateFavorite
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, MainProvider };
