import React, { useEffect, useState } from 'react';
import { getToken } from '../services/UserService';

const Context = React.createContext({});

const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [formToggle, setFormToggle] = useState(true);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(0);
  const [media, setMedia] = useState([]);
  const [updateAvatar, setUpdateAvatar] = useState(0);
  const [token, setToken] = useState(null);

  // Fetching token from async storage
  useEffect(() => {
    async function fetchToken() {
      setToken(await getToken());
    }
    fetchToken();
  }, []);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        formToggle,
        setFormToggle,
        update,
        setUpdate,
        loading,
        setLoading,
        updateMessage,
        setUpdateMessage,
        media,
        setMedia,
        updateAvatar,
        setUpdateAvatar,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, MainProvider };
