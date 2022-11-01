import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SampleList from './component/SampleList';
import { getAlllNews } from './services/NewsService';

// Import Navigator from navigator.js
import Navigator from './navigation/navigator';

const App = () => {
  const [news, setNews] = useState([]);
  //getAlllNews(setNews);
  console.log('App', news);

  // getAlllNews function is called once after the page is rendered
  useEffect(() => {
    getAlllNews(setNews);
  }, []);

  return (
    <View style={styles.container}>
      <Text>News List!</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => <SampleList news={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
