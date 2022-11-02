// npx expo install expo-font
import React from 'react';
import {useFonts} from 'expo-font';

// Import Navigator from navigator.js
import Navigator from './navigation/navigator';

const App = () => {

  let [fontsLoaded] = useFonts({
    "Goldman-regular": require("./assets/fonts/Goldman-Regular.ttf"),
    "Goldman-bold": require("./assets/fonts/Goldman-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Navigator />
  );

};

export default App;
