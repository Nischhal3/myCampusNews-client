import React, {useState} from 'react';

const Context = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [drawerFocus, setDrawerFocus] = useState("Home");
  const [updateAvatar, setUpdateAvatar] = useState(0);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export {Context, MainProvider};