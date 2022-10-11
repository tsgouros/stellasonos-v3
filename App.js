import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import ImagePage from './views/ImagePage.js';

const SELECTED_IMAGE = 11
export default function App() {
  return (
    <View style={styles.container}>
      <ImagePage selectedImageID = {SELECTED_IMAGE}  ></ImagePage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
