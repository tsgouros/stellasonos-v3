import React from "react";
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { HapticsProvider } from "react-native-custom-haptics";
import { useHaptics } from "react-native-custom-haptics";
import { TouchableOpacity } from "react-native-gesture-handler";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// const Separator = () => {
//     return <View />;
//   }

export default function VibrationPage({ navigation }) {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS];


  const SUCCESS_PATTERN = ["heavy", 300, "Light", 300, "heavy"];

  // [Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
  // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),]
  function wiggle(pattern, type, style) {
    for (let i = 0; i < pattern.length; i++) {
      // const interval = setInterval(
      //      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy),
      //      1000
      //   );
// it will vibrate for 5 seconds
      if (style === "impact"){
        setTimeout(() =>{Haptics.impactAsync(type)}, pattern[i]);
      }
      if (style === "selection"){
        setTimeout(() =>{Haptics.selectionAsync()}, pattern[i]);
      }
      if (style === "notification"){
        setTimeout(() =>{Haptics.notificationAsync(type)}, pattern[i]);
      }}
    
  }



//     for (let i = 0; i < pattern.length; i++) {
//       console.log(i, type);
//       const interval = setInterval(
//            () => type,
//            100
//         );
// // it will vibrate for 5 seconds
//         setTimeout(() => clearInterval(interval), pattern[i]);
//       }    

//     for (let i = 0; i < pattern.length; i++) {
//       const interval = setInterval(
//         () => type,
//             pattern[i]);
// // it will vibrate for 5 seconds
//         setTimeout(() => clearInterval(interval), 10000);
//       }    
               
    
  
 /* function wiggle(pattern, hapVib, type){
  if (hapVib == h){
            for (let i = 0; i < pattern; i++) {
 // // .           if (selImpNot == selection) {
                           if (type == )
                   if (selImpNot == impact) {
                           if (type == )
 
                   if (selImpNot == notification) {
                           if (type == warning ) {

                            const interval = setInterval(
                    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.warning),
              100
            );
            // it will vibrate for 5 seconds
            setTimeout(() => clearInterval(interval), 5000);
                             Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
                           }
                           if (type == success ) {
                            
                           }
                           if (type == error ) {
                            
                           }
 */
 
  //wiggle([1, 1, 3], h, notification, type)
  const { trigger, stop } = useHaptics();
  React.useEffect(() => {
    // stops the haptic pattern on cleanup
    return () => stop();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>Cool Vibes!</Text>

      {/* 100ms in between each haptic impact for 5 seconds */}
      <Text>IMPACT HAPTIC</Text>
      <View style={styles.impactRow}>
        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with trigger"
          onPress={() => {
            wiggle([2000, 10000, 1000], Haptics.NotificationFeedbackType.Success, "notification")

            // const interval = setInterval(
            //   () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy),
            //   100
            // );
            // setTimeout(() => clearInterval(interval), 5000);

          }}
        >
          <View style={styles.square1} />
          <Text>heavy impact </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with trigger"
          onPress={() => {
            const interval = setInterval(
              () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light),
              500
            );
            // it will vibrate for 5 seconds
            setTimeout(() => clearInterval(interval), 5000);
          }}
        >
          <View style={styles.square2} />
          <Text>light impact </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with trigger"
          onPress={() => {
            const interval = setInterval(
              () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
              500
            );
            // it will vibrate for 5 seconds
            setTimeout(() => clearInterval(interval), 5000);
          }}
        >
          <View style={styles.square3} />
          <Text>medium impact</Text>
        </TouchableOpacity>

      </View>

      {/* VIBRATE */}
      <View style={styles.vibrateRow}>
        <TouchableOpacity
          style={styles.centered}
          title="Vibrate with trigger"
          onPress={() => {
            Vibration.vibrate();
          }}
        >
          <View style={styles.square4} />
          <Text>vibrate once </Text>
        </TouchableOpacity>

        <HapticsProvider>
          <View>
          <Button
            style={styles.centered}
            title="impacts with pattern"
            onPress={() => trigger(SUCCESS_PATTERN, true)}
          ></Button>
          </View>
          </HapticsProvider>



      </View>

      {/*       
      <TouchableOpacity 
        style = {styles.centered}
        title="Vibrate with pattern with trigger" onPress=
        {() => {ReactNativeHapticFeedback.trigger("impactLight", )}}
        ><View style= {styles.square}/>
      </TouchableOpacity> */}
      {/* <Separator />
        {Platform.OS == "android"
          ? [
              <View>
                <Button
                  title="Vibrate for 10 seconds"
                  onPress={
                    () => {
                        const interval = setInterval(() => Vibration.vibrate(), 1000);
      // it will vibrate for 5 seconds
      setTimeout(() => clearInterval(interval), 5000);
                    }
                  }
                />
              </View>,
              <Separator />
            ]
          : null} */}
      {/* <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text> */}
      <Button
        title="Vibrate with pattern"
        onPress={() => {
          const interval = setInterval(() => Vibration.vibrate(), 100);
          // it will vibrate for 5 seconds
          setTimeout(() => clearInterval(interval), 10000);
        }}
      />

      {/* <Separator /> */}
      <Button
        title="selection haptic"
        onPress={() => Haptics.selectionAsync()}
      />
      {/* <Separator /> */}
      <Button
        title="impact haptic"
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        color="#FF0000"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // // paddingTop: 44,
    // padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    margin: 75,
    textAlign: "center",
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  square1: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  square2: {
    height: 40,
    width: 40,
    backgroundColor: "green",
    justifyContent: "center",
  },
  square3: {
    height: 40,
    width: 40,
    backgroundColor: "red",
    justifyContent: "center",
  },
  square4: {
    height: 40,
    width: 40,
    backgroundColor: "purple",
    justifyContent: "center",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",

    // if you want to fill rows left to right
  },
  impactRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "wrap",
    position: "relative",
  },
  vibrateRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "wrap",
    position: "relative",
  },
});