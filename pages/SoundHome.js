import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import React from "react";
import { ContainerStyles, ImageStyles, TextStyles } from "../utils/styles";
import images from "../images.json";

export default function SoundHome({ route, navigation }) {
  const soundconfig = route.params.soundconfig;
  console.log("SoundHome initParams: ", route.params);

  var cards = [];
  for (var i = 0; i < images.images.length; i++) {
    cards.push(buildCard(images.images[i]));
  }

  return (
    <View style={ContainerStyles.defaultContainer}>
      <Swiper
        cards={cards}
        renderCard={(card) => {
          return <View style={ContainerStyles.defaultCard}>{card}</View>;
        }}
        onSwipedAll={() => {
          console.log("All cards have been swiped.");
        }}
        onSwipedRight={(cardIndex) => {
          navigateToSoundPage(
            images.images[cardIndex],
            navigation,
            soundconfig
          );
        }}
        onSwipedTop={(cardIndex) => {
          navigateToSoundPage(
            images.images[cardIndex],
            navigation,
            soundconfig
          );
        }}
        onTapCard={(cardIndex) => {
          navigateToSoundPage(
            images.images[cardIndex],
            navigation,
            soundconfig
          );
        }}
        // Do we actually want onTapCard to do something? (What if user accidentally taps?)
        // TODO: Add a button to the bottom of the card stack to "Reload all cards and start over"
        cardIndex={0}
        backgroundColor={"#FFF"}
        stackSize={3}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function buildCard(image) {
  return (
    <View style={ContainerStyles.defaultContainer}>
      <Text style={TextStyles.blackTextMedium}>{image.title}</Text>
      <Image style={ImageStyles.defaultImage} source={{ uri: image.src }} />
    </View>
  );
}

function navigateToSoundPage(image, navigation, soundconfig) {
  navigation.navigate("SoundPage", { image: image, soundconfig: soundconfig });
  console.log("Navigating to Image page with image: " + image.title);
  console.log("NavigateToSoundPage Config file:", soundconfig);
}
