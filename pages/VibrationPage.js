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

// const Separator = () => {
//     return <View />;
//   }

export default function VibrationPage({ navigation }) {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS];

  const PATTERN_DESC =
    Platform.OS === "android"
      ? "wait 1s, vibrate 2s, wait 3s"
      : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";

  const SUCCESS_PATTERN = ["heavy", 300, "light", 300, "heavy"];

  const { trigger, stop } = useHaptics();
  React.useEffect(() => () => stop(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>Cool Vibes!</Text>
      <TouchableOpacity 
        style = {styles.centered}
        title="Vibrate with trigger" onPress=
        {() => {
          // [Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),
          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy ),]
          const interval = setInterval(
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.heavy),
            100
          );
          // it will vibrate for 5 seconds
          setTimeout(() => clearInterval(interval), 10000);
        }}
        ><View style= {styles.square}/>
      </TouchableOpacity>
      <View>
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
      </View>
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
      <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
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
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light)}
        color="#FF0000"
      />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    margin: 24,
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  square: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    justifyContent: "center",

  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
