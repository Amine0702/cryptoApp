import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ModeSelectionScreen from './screens/ModeSelectionScreen';
import CipherScreen from './screens/CipherScreen';
import KeyGenerationScreen from './screens/KeyGenerationScreen';
import TrainingModeScreen from './screens/TrainingModeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
        <Stack.Screen name="Cipher" component={CipherScreen} />
        <Stack.Screen name="KeyGeneration" component={KeyGenerationScreen} />
        <Stack.Screen name="TrainingMode" component={TrainingModeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
