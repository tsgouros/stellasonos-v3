import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';

// Utils and other pages
import { ContainerStyles, ButtonStyles, TextStyles } from '../utils/styles';

export default function Intro({ navigation }) {
  return (
    <View style={ContainerStyles.defaultContainer}>
      <Text style={TextStyles.blackTextSmall}>Just a placeholder for the eventual intro screen... By default, this opens every time the app is started.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={ButtonStyles.blackButton}>
        <Text style={TextStyles.whiteTextSmall}>Go to Home page</Text>
      </TouchableOpacity>

      {/* Alternative button design */}
      {/* <Button onPress={() => navigation.navigate('Home')} title="Go to Home page"/> */}

      <StatusBar style="auto" />
    </View>
  );
}

