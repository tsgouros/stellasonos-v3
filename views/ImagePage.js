import { StatusBar } from "expo-status-bar";
import { StyleSheet, Animated, Image, Text, View } from "react-native";
import { useRef, useCallback } from "react";
import images from "../images.json";
import { AntDesign } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function ImagePage(props) {
  console.log(images.images[props.selectedImageID].src);
  const translateX = useRef(new Animated.Value(0));
  const translateY = useRef(new Animated.Value(0));
  const onPanGestureEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: translateX.current,
            translationY: translateY.current,
          },
        },
      ],
      { useNativeDriver: true }
    )
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {images.images[props.selectedImageID].title}: {"\n"}
        {images.images[props.selectedImageID].description}
      </Text>
      <View style={styles.imageContainer}>
      <Image
            style={styles.tinyLogo}
            source={{ uri: images.images[props.selectedImageID].src }}
          ></Image>
        <PanGestureHandler onGestureEvent={onPanGestureEvent}>
          <Animated.View
            style={[
              styles.square,
              {
                transform: [
                  {
                    translateX: translateX.current,
                  },
                  {
                    translateY: translateY.current,
                  },
                ],
              },
            ]}
          />
          
        </PanGestureHandler>
        
      </View>
      <StatusBar style="auto" />
      <View style={styles.toolBar}>
        <AntDesign name="leftcircleo" size={50} color="black" />
        <AntDesign name="rightcircleo" size={50} color="black" />
        <AntDesign name="upcircleo" size={50} color="black" />
        <AntDesign name="downcircleo" size={50} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 350,
    height: 450,
    backgroundColor: "#000",
    margin: 0,
  },
  tinyLogo: {
    flex: 1,
    width: null,
    height: null,
    margin: 0,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  toolBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 350,
    top: 50,
  },
  text: {
    bottom: 75,

    width: 250,
    alignItems: "center",
    textAlign: "center",
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: "#28b5b5",
    marginTop: 0,
    borderRadius: '50%',
    opacity: 0.8,
  },
});
