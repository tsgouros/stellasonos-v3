import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Modal,
  Alert,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";

import { Dimensions } from "react-native";
import { Button } from "@rneui/base";
import { Player } from "@react-native-community/audio-toolkit";

import {TouchableOpacity } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


export default function SoundPage({ route, navigation }) {
  // vibration _______________________________________________________
  // https://www.npmjs.com/package/react-native-haptic-feedback
  // strings to go in ReactNativeHapticFeedback.trigger("...") that work for android and ios:
  // impactHeavy, impactMedium, impactLight, rigid, soft, notificationSuccess, notificationWarning
  // notifiationError 

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN1 = [100, 10, 100, 10, 100, 10, 100, 10, 100];
  const PATTERN2 = [550, 550];
  const PATTERN3 = [10, 0.1, 10, 0.1, 10,0.1, 10, 0.1, 10, 0.1, 10, 0.1, 10, 0.1];
  const PATTERN = [
    1 * 1000,
    2 * 1000,
    3 * 1000
  ];
  // ________________________________________________
  const VIBRATION_DURATION = 100; // Adjust the duration as needed

  let intervalId = null;

  const handlePressIn = () => {
    console.log("v");
    //console.log("location x: " + event.nativeEvent.locationX - xMax - 20)
    clearInterval();
    intervalId = setInterval(() => {
      ReactNativeHapticFeedback.trigger('impactHeavy', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: true,
      });
      //ReactNativeHapticFeedback.trigger("impactHeavy");
    }, VIBRATION_DURATION);
  };

  const handlePressOut = () => {
    console.log("end v");
    if (intervalId != null) {
      clearInterval(intervalId);
    }
  };
  // __________________________________________

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function wiggle(pattern, style) { // was async
    for (let i = 0; i < pattern.length; i++) {
      if (style === "impactLight") {
        ReactNativeHapticFeedback.trigger('impactLight', {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: true,
        });
        //ReactNativeHapticFeedback.trigger("impactLight");
        await delay(pattern[i]); // was await
      }
      if (style === "impactMedium") {
        ReactNativeHapticFeedback.trigger('impactMedium', {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: true,
        });
        //ReactNativeHapticFeedback.trigger("impactMedium");
        await delay(pattern[i]);
      }

      if (style === "impactHeavy") {
        ReactNativeHapticFeedback.trigger('impactHeavy', {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: true,
        });
        //ReactNativeHapticFeedback.trigger("impactHeavy");
        await delay(pattern[i]);
      }
    }
  }

  // //wiggle([1, 1, 3], h, notification, type)
  // const { trigger, stop } = useHaptics();
  // React.useEffect(() => {
  //   // stops the haptic pattern on cleanup
  //   return () => stop();
  // }, []);
  // end vibration_______________________________________________

  const image = route.params.image;
  const soundconfig = route.params.soundconfig;
  // Uncomment the line below to check that sound config JSON is being passed in from App.js properly
  //console.log("SoundPage routeParams:", route.params);

  const pan = useRef(new Animated.ValueXY()).current;
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [sound, setSound] = useState(null);

  const xPadding = 45;

  // The looping feature that comes with the audio toolkit is inadequate because it leaves a dead air gap.
  // We'll set that looping setting to false and do our own version of looping.
  const playerOne = new Player(soundconfig.mp3Url, {
    autoDestroy: false,
    mixWithOthers: true,
  }).prepare((err) => {
    if (err) {
      console.log("error in player1:");
      console.log(err);
    } else {
      playerOne.looping = false;
    }
  });

  // Same as above but for the second player. Allows for looping.
  const playerTwo = new Player(soundconfig.mp3Url, {
    autoDestroy: false,
    mixWithOthers: true,
  }).prepare((err) => {
    if (err) {
      console.log("error in player2: ");
      console.log(err);
    } else {
      playerTwo.looping = false;
    }
  });

  // Start two overlapping looped players.
  async function playReal() {
    
    playSteppedSound(playerOne, "one", 1.0);
    //console.log("waiting", playerOne.duration / 2, "ms to play two");
    playerID["two"] = setTimeout(() => {
      playSteppedSound(playerTwo, "two", 1.0);
    }, playerOne.duration / 2);
  }

  // Use this to stop the two players.
  var playerID = { one: 0, two: 0 };

  // We can vary this to control the volume. It will be a little
  // rough given the fading in and out, but could work.
  var playerVol = soundconfig.initialVolume;

  // Loop a sound so that it plays over and over. Also fades in.
  async function playSteppedSound(player, id) {
    player.play((err) => {
      if (err) {
        console.log(
          "error playing: playerID",
          id, "; PLAYER: ",player,
          "; volume",
          playerVol,
          "; state",
          player.state
        );
        console.log("ERROR in PLAYSTEPPEDSOUND: ", err);
      } else {
        //console.log("playing", id, "volume", playerVol, "state", player.state);
      }
    });

    // Start playing low.
    player.volume = 0.125 * playerVol;

    // Arrange a series of volume increases over a second's time.
    setTimeout(() => {
      player.volume = 0.25 * playerVol;
    }, 125);
    setTimeout(() => {
      player.volume = 0.375 * playerVol;
    }, 250);
    setTimeout(() => {
      player.volume = 0.5 * playerVol;
    }, 500);
    setTimeout(() => {
      player.volume = 0.625 * playerVol;
    }, 625);
    setTimeout(() => {
      player.volume = 0.75 * playerVol;
    }, 750);
    setTimeout(() => {
      player.volume = 0.875 * playerVol;
    }, 875);
    setTimeout(() => {
      player.volume = playerVol;
    }, 1000);

    // Save the id of the looped player, so it can be stopped
    // when necessary.  Also note that we stop the player at
    // its duration. I don't know why, but this seems to make
    // the restart happen without dead air.
    playerID[id] = setTimeout(() => {
      player.stop();
      console.log("restart", id, player.duration);
      playSteppedSound(player, id);
    }, player.duration);
  }

  // Set the player volume, in all the places it should be set.
  async function setPlayerVolume(newVolume) {
    //console.log("set volume to", newVolume);
    playerVol = newVolume;
    playerOne.volume = newVolume;
    playerTwo.volume = newVolume;
  }

  async function playSoundToolkit() {
    try {
      playerOne.play();
      //console.log("playing playerOne");
      // Start a second sound to play, but it only plays if
      // playerOne lasts more than 5s.
      setTimeout(() => {
        if (playerOne.isPlaying) {
          playerTwo.play();
          //console.log("playing playerTwo");
        }
      }, 5000);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  }

  async function playPause(player) {
    if (player.duration <= 0) {
      return;
    }
  
    player.playPause((err, paused) => {
      if (err) {
        // Handle the error, perhaps by setting state or logging it
        console.error(err.message);
      }
    });
  }
  
  const stopBothPlayers = () => {
    playPause(playerOne);
    playPause(playerTwo);
  };

  // When stopping, we not only have to stop the players from
  // playing, but we also have to stop the asynchronous (setTimeout)
  // requests that might be lurking to restart the players.
  // async function stopSoundToolkit() {
  //   console.log(
  //     "stopping everything, including",
  //     playerID["one"],
  //     "and",
  //     playerID["two"]
  //   );
  //   playerOne.stop();
  //   playerTwo.stop();
  //   clearTimeout(playerID["one"]);
  //   clearTimeout(playerID["two"]);
  //   playerID["one"] = 0;
  //   playerID["two"] = 0;
  // }

  async function stopSoundToolkit() {
    console.log(
      "stopping everything, including",
      playerID["one"],
      "and",
      playerID["two"]
    );
    playerOne.stop();
    playerTwo.stop();
  
    // Clear all volume change timeouts
    for (const id in playerID) {
      if (id !== "one" && id !== "two" && playerID[id] !== 0) {
        clearTimeout(playerID[id]);
        playerID[id] = 0;
      }
    }
  
    clearTimeout(playerID["one"]);
    clearTimeout(playerID["two"]);
    playerID["one"] = 0;
    playerID["two"] = 0;
  }
  

  // calculating actual width and height of touch area
  // const xMax = Dimensions.get("window").width / 2 - xPadding;
  // const yMax = Dimensions.get("window").height / 6 + 125;

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onStartShouldSetPanResponderCapture: () => true,
  //     onPanResponderGrant: (e, r) => {
  //       // prevent the dot from moving out of bounds
  //       pan.setOffset({
  //         x:
  //           pan.x._value > xMax
  //             ? xMax
  //             : pan.x._value < -xMax
  //             ? -xMax
  //             : pan.x._value,
  //         y:
  //           pan.y._value > yMax
  //             ? yMax
  //             : pan.y._value < -yMax
  //             ? -yMax
  //             : pan.y._value,
  //       });
  //     },
  //     onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
  //       useNativeDriver: false,
  //       onPanResponderRelease: (event, gestureState) => {
  //         //After the change in the location
  //       },
  //     }),
  //     onPanResponderRelease: (e, r) => {
  //       pan.flattenOffset();
  //       setCurrentY(pan.y._value);
  //       setCurrentX(pan.x._value);
  //     },
  //   })
  // ).current;
  const xMax = Dimensions.get("window").width / 2 - xPadding;
  const yMax = Dimensions.get("window").height / 6 + 125;
  const [canTriggerVibration, setCanTriggerVibration] = useState(true);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Handle the continuous movement here
        const { moveX, moveY } = gestureState;
        console.log('X:', moveX, 'Y:', moveY);
        // Adjust vibration intensity based on moveX and moveY
        //const vibrationIntensity = calculateVibrationIntensity(moveX, moveY);

        // Trigger haptic feedback
        if (canTriggerVibration) {
          if (moveX < 100) {
            setCanTriggerVibration(false);
            ReactNativeHapticFeedback.trigger('impactLight', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: true,
            });
          } else {
            setCanTriggerVibration(false);
            ReactNativeHapticFeedback.trigger('impactHeavy', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: true,
            });
          }
        }
        // ReactNativeHapticFeedback.trigger('impactHeavy', {
        //   enableVibrateFallback: false,
        //   ignoreAndroidSystemSettings: true,
        // });
      },
    })
  ).current;
  useEffect(() => {
    const timer = setInterval(() => {
      setCanTriggerVibration(true);
    }, 1000);

    return () => clearInterval(timer);
  }, [canTriggerVibration]);
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponderCapture: () => true,
  //     onPanResponderGrant: () => {
  //       pan.setOffset({
  //         x: pan.x._value,
  //         y: pan.y._value,
  //       });
  //     },
  //     onPanResponderMove: Animated.event(
  //       [null, { dx: pan.x, dy: pan.y }],
  //       {
  //         useNativeDriver: false,
  //         listener: (event, gestureState) => {
  //           const newX = Math.min(Math.max(pan.x._value, -xMax), xMax);
  //           const newY = Math.min(Math.max(pan.y._value, -yMax), yMax);
  //           pan.setValue({ x: newX, y: newY });
  //           // Check X-axis position and trigger vibration patterns
  //           //if (newX > xThreshold) {
  //           // Check X-axis distance moved
  //           //const distanceMoved = Math.abs(newX - pan.x._offset);

  //           // Trigger haptic feedback if the distance threshold is exceeded
  //           //if (distanceMoved >= 50) {
  //           //handlePressIn();
  //           //   console.log("Vibrate!");
  //           // }
  //           console.log("new x  " + newX);
  //         },
  //       }
  //     ),
  //     onPanResponderRelease: () => {
  //       pan.flattenOffset();
  //       //handlePressOut();
  //     },
  //   })
  // ).current;


  // update current x and y values in the state for later
  pan.x.addListener(({ value }) => {
    setCurrentX(value);
  });
  pan.y.addListener(({ value }) => {
    setCurrentY(value);
  });

  const handleX = (delta) => {
    var newX =
      currentX + delta > xMax
        ? xMax
        : currentX + delta < -xMax
        ? -xMax
        : currentX + delta;
    pan.setValue({ x: newX, y: currentY });
  };

  const handleY = (delta) => {
    var newY =
      currentY + delta > yMax
        ? yMax
        : currentY + delta < -yMax
        ? -yMax
        : currentY + delta;
    pan.setValue({ x: currentX, y: newY });
  };

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          playerOne.destroy();
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {image.title}: {"\n"}
              {image.description}
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
      <View style={styles.container}>
        {/* Preventing the dot from going out of bounds------- */}
        {/* <Animated.View
          style={{
            transform: [
              {
                translateX: pan.x.interpolate({
                  inputRange: [-xMax, xMax],
                  outputRange: [-xMax, xMax],
                  extrapolate: "clamp",
                }),
              },
              {
                translateY: pan.y.interpolate({
                  inputRange: [-yMax, yMax],
                  outputRange: [-yMax, yMax],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
          {...panResponder.panHandlers}
        >
          <View style={styles.circle} />
        </Animated.View> */}
        <TouchableOpacity
        style={styles.imageContainer}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        //activeOpacity={1} // To remove the default opacity effect
      >
        <View
          style={styles.imageContainer}
          {...panResponder.panHandlers}
          //onStartShouldSetResponder={() => true}
          // onResponderMove={(event) => {
          //   pan.setValue({
          //     x: event.nativeEvent.locationX - xMax - 20,
          //     y: event.nativeEvent.locationY - yMax - 20,
          //   });
            
          //   ReactNativeHapticFeedback.trigger('impactHeavy', {
          //     enableVibrateFallback: false,
          //     ignoreAndroidSystemSettings: true,
          //   });
            // add to new panhandler onmove
            // setPlayerVolume(event.nativeEvent.locationX / 150);

            /*
            Where the actual motion is taking place
            */
            //playSoundToolkit();
          //}}
        >
         
          <ImageBackground
            style={styles.tinyLogo}
            source={{ uri: image.src }}
          ></ImageBackground>
          
        </View>
        </TouchableOpacity>
      </View>

      {/* <Text style={[styles.header, styles.paragraph]}>Cool Vibes!</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View style={{ padding: 5 }}>
          <Text style={{ width: 75, textAlign: "center", color: "black" }}>PATTERN 1</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <View style={styles.impactRow}>
        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with heavy impact pattern"
          onPress={() =>
            wiggle(PATTERN1, "impactHeavy")
          }
        >
          <View style={styles.squareHI} />
          <Text style={{ fontSize: 10, color: "black" }}>Heavy Impact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with trigger"
          onPress={() =>
            wiggle(PATTERN1, "impactMedium")
          }
        >
          <View style={styles.squareMI} />
          <Text style={{ fontSize: 10, color: "black" }}>Medium Impact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with trigger"
          onPress={() =>
            wiggle(PATTERN1, "impactLight")
          }
        >
          <View style={styles.squareLI} />
          <Text style={{ fontSize: 10, color: "black" }}>Light Impact</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.centered}
          onPress={() =>
            wiggle(
              PATTERN1,
              Haptics.NotificationFeedbackType.Warning,
              "selection"
            )
          }
        >
          <View style={styles.squareSP} />
          <Text style={{ fontSize: 10 }}>Selection Pattern</Text>
        </TouchableOpacity>
      </View> */}

      {/* ----------------------------------------------------------------------- */}

      {/* <View style={styles.impactRow2}>
        <TouchableOpacity
          style={styles.centered}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}

        >
          <View style={styles.rectTouch} />
          <Text style={{ fontSize: 10, color: "black" }}>Touch or touch and drag to vibrate</Text>
        </TouchableOpacity>
        </View> */}

      {
        <View style={styles.toolBar}>
          {/* <AntDesign
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
        /> */}
          {/* <View>
        <Button onPress={playSoundToolkit}>Play Sound</Button>
      </View>
      <View>
        <Button onPress={stopSoundToolkit}>Stop Sound</Button>
      </View> */}
          <Button onPress={playReal}>Play Sound</Button>
          <Button onPress={playSoundToolkit}>Play other Sound</Button>
          <Button onPress={stopSoundToolkit}>Stop Sound</Button>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: "red",
    borderRadius: 40,
  },
  imageContainer: {
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height / 1.3,
    backgroundColor: "#000",
    margin: 0,
    zIndex: -1,
    elevation: -1,
    position: "absolute",
  },
  tinyLogo: {
    flex: 1,
    width: null,
    height: null,
    margin: 0,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  absolute: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  toolBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 350,
    paddingBottom: 30,
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
      height: 2,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
