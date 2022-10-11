import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

// Utils and other pages
import { ContainerStyles, ButtonStyles, TextStyles } from '../utils/styles';

export default function Home({ navigation }) {
  var cards = ["Image 1", "Image 2", "Image 3",  "Image 4",  "Image 5"]

  return (
    <View style={ContainerStyles.defaultContainer}>
      <Swiper
        cards={cards}
        renderCard={(card) => {
          return (
            <View style={ContainerStyles.defaultCard}>
              <Text style={TextStyles.blackTextLarge}>{card}</Text>
            </View>
          )
        }}
        onSwiped={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => {console.log('onSwipedAll')}}
        cardIndex={0}
        backgroundColor={'#FFF'}
        stackSize= {3}
      />
      <StatusBar style="auto" />
    </View>
  );
}
