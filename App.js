import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ModeSelectionScreen from './screens/ModeSelectionScreen';
import CipherScreen from './screens/CipherScreen';
import 'react-native-get-random-values';
import AESExample from './screens/aes.js'; // Assurez-vous du bon chemin
import TrainingScreen from './screens/entrennementsceen.js'; // Assurez-vous du bon chemin

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
        <Stack.Screen name="Cipher" component={CipherScreen} />
        <Stack.Screen name="AES" component={AESExample} />
        <Stack.Screen name="trainment" component={TrainingScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
