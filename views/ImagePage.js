import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Modal,
  StyleSheet,
  Animated,
  Image,
  Text,
  Pressable,
  View,
  ImageBackground,
} from "react-native";
import { useRef, useCallback, useState } from "react";
import images from "../images.json";
import { AntDesign } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function ImagePage(props) {
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const translateX = useRef(new Animated.Value(0));
  const translateY = useRef(new Animated.Value(0));
  translateX.current.addListener(({ value }) => {
    if (value < 0) {
      translateX.current.setValue(0); // Move red dot
      setCurrentX(0);               // Move the pointer
    } else {
      setCurrentX(value);
    };
  });
  translateY.current.addListener(({ value }) => {
    if (value < 0) {
      translateY.current.setValue(0);
      setCurrentY(0);
    } else {
      setCurrentY(value);
    }
  });

  console.log("X", translateX);
  console.log("Y", translateY);
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
  const handleX = (delta) => {
    translateX.current.setValue(currentX + delta);      
  };
  const handleY = (delta) => {
    translateY.current.setValue(currentY + delta);
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {images.images[props.selectedImageID].title}: {"\n"}
              {images.images[props.selectedImageID].description}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.tinyLogo}
          source={{ uri: images.images[props.selectedImageID].src }}>
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
        </ImageBackground>
      </View>
      <StatusBar style="auto" />
      <View style={styles.toolBar}>
        <AntDesign
          onPress={() => handleX(-10)}
          name="leftcircleo"
          size={30}
          color="black"
        />
        <AntDesign
          onPress={() => handleX(10)}
          name="rightcircleo"
          size={30}
          color="black"
        />
        <AntDesign
          onPress={() => handleY(-10)}
          name="upcircleo"
          size={30}
          color="black"
        />
        <AntDesign
          onPress={() => handleY(10)}
          name="downcircleo"
          size={30}
          color="black"
        />
        <AntDesign
          onPress={() => setModalVisible(true)}
          name="infocirlceo"
          size={30}
          color="black"
        />
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
    bottom: 10,
    width: 250,
    alignItems: "center",
    textAlign: "center",
  },
  square: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    marginTop: 0,
    borderRadius: "50%",
    opacity: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2.5,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    padding: 5,
    elevation: 2,
    marginTop: 0,
  },
  buttonClose: {
    backgroundColor: "black",
    backgroundColor: "rgba(11, 127, 171, 0.7)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
