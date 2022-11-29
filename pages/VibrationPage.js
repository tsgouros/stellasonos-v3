import React from "react";
import { Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet } from "react-native";
import * as Haptics from 'expo-haptics';



const Separator = () => {
    return <View style={Platform.OS === "android" ? styles.separator : null} />;
  }
  
export default function VibrationPage({ navigation }) {
  
    const ONE_SECOND_IN_MS = 1000;
  
    const PATTERN = [
       1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
    ];
  
    const PATTERN_DESC =
      Platform.OS === "android"
        ? "wait 1s, vibrate 2s, wait 3s"
        : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>Cool Vibes!</Text>
        <View>
          <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
        </View>
        <Separator />
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
          : null}
        <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
        <Button
          title="Vibrate with pattern"
          onPress={
            () => {
                const interval = setInterval(() => Vibration.vibrate(), 0);
// it will vibrate for 5 seconds
setTimeout(() => clearInterval(interval), 5000);
            }
          }
        />
        <Separator />
        <Button
          title="Vibrate with pattern until cancelled"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        />
        <Separator />
        <Button
          title="Stop vibration pattern"
          onPress={() => Vibration.cancel()}
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
      padding: 8
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center"
    },
    paragraph: {
      margin: 24,
      textAlign: "center"
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth
    }
  });
  
