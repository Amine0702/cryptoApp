import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenue dans CryptoApp</Text>
        <Text style={styles.subtitle}>
          Cryptez et décryptez vos messages avec des algorithmes modernes et sécurisés.
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ModeSelection')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Démarrer
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  subtitle: { fontSize: 18, color: '#ddd', textAlign: 'center', marginBottom: 30 },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
