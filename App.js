import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';

// Navigation-related imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Utils and other pages
import Intro from './pages/Intro';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: false  // Hide the app header
        }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Placeholder" component={Placeholder} />
      </Stack.Navigator>
    </NavigationContainer>

    // TODO: Add ImagePage to the stack navigator
  );
}

