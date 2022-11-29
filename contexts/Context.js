import React, { useEffect, useState } from 'react';

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
  const [editCommentInput, setEditCommentInput] = useState('');
  const [updateLike, setUpdateLike] = useState(0);
  const [updateFavorite, setUpdateFavorite] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState(0);
  const [draft, setDraft] = useState(0);
  const [searchByCategory, setSearchByCategory] = useState(false);
  const [searchUpdate, setSearchUpdate] = useState(0);
  const [searchOptions, setSearchOptions] = useState('');
  const [newsByCategory, setNewsByCategory] = useState([]);
  // const [userList, setUserList] = useState([]);
  const [updateUserList, setUpdateUserList] = useState(0);
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
        setUpdateFavorite,
        loading,
        setLoading,
        updateCommentId,
        setUpdateCommentId,
        draft,
        setDraft,
        searchByCategory,
        setSearchByCategory,
        searchUpdate,
        setSearchUpdate,
        searchOptions,
        setSearchOptions,
        newsByCategory,
        setNewsByCategory,
        // userList,
        // setUserList,
        updateUserList,
        setUpdateUserList
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, MainProvider };
