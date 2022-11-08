// npm i @expo/vector-icons
// npx expo install expo-font
import React from "react";
import { useFonts } from "expo-font";

// Import Navigator from navigator.js
import Navigator from "./navigation/navigator";
import {MainProvider} from './contexts/Context';

const App = () => {
  let [fontsLoaded] = useFonts({
    "Goldman-regular": require("./assets/fonts/Goldman-Regular.ttf"),
    "Goldman-bold": require("./assets/fonts/Goldman-Bold.ttf"),
    "IBM": require("./assets/fonts/IBMPlexSansHebrew-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
};

export default App;
