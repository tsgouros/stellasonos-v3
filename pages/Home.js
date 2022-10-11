import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';

// Utils and other pages
import { ContainerStyles, ButtonStyles, TextStyles } from '../utils/styles';

export default function Home({ navigation }) {
  return (
    <View style={ContainerStyles.defaultContainer}>
      <Text>Homepage here</Text>
      <StatusBar style="auto" />
    </View>
  );
}