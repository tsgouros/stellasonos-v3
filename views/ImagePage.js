import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import images from '../images.json';
import { AntDesign } from '@expo/vector-icons';


export default function ImagePage(props) {
    console.log(images.images[props.selectedImageID].src)
  return (
      <View style={styles.container}>
                <Text style={styles.text} > {images.images[props.selectedImageID].title}: {"\n"}{images.images[props.selectedImageID].description}</Text>

        <View style={styles.imageContainer}>
          
        <Image  style={styles.tinyLogo} source= {{uri: images.images[props.selectedImageID].src}}></Image>
        </View>
         
        <StatusBar style="auto"/>

        <View style = {styles.toolBar}>
        <AntDesign name="leftcircleo" size={50} color="black" />
        <AntDesign name="rightcircleo" size={50} color="black" />
        <AntDesign name="upcircleo" size={50} color="black" />
        <AntDesign  name="downcircleo" size={50}  color="black" />


        </View>
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
  imageContainer: {
    width: 350,
    height: 300,
    backgroundColor: '#000',
  },
  tinyLogo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 350,
    top: 50,
  },
  text: { 
    bottom: 75,

    width: 250,
    alignItems: 'center',
    textAlign: 'center', 

  }
});
