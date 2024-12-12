import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

export default function ModeSelectionScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Choisissez une méthode de cryptage</Text>
        <Card style={styles.card}>
          {/* Boutons pour la méthode de cryptage */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Cipher', { method: 'César' })}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Code César
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Cipher', { method: 'Affine' })}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Code Affine
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Cipher', { method: 'Vigenère' })}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Chiffre Vigenère
          </Button>
          
          {/* Nouveaux boutons pour accéder aux autres pages */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('KeyGeneration')}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Génération de clé
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('TrainingMode')}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Mode Entraînement
          </Button>
        </Card>
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
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 30,
  },
  methodButton: {
    marginVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
