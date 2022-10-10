import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import images from '../images.json'


export default function ImagePage(props) {
    console.log(images.images[props.selectedImageID].src)
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source= {{uri: images.images[props.selectedImageID].src}}></Image> 
      <StatusBar style="auto" />
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
  tinyLogo: {
    width: 500,
    height: 500,
  },
});
