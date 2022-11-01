import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Import Navigator from navigator.js
import Navigator from './navigation/navigator';

function App() {
  return (
    <Navigator />
  )
}

export default () => (
  <>
    <App />
  </>
);
