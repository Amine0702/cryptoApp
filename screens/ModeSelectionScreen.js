import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

export default function ModeSelectionScreen({ navigation }) {
  

  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Choisissez une méthode de cryptage</Text>
        <Card style={styles.card}>
          {/* Boutons pour les méthodes de cryptage existantes */}
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

          {/* Nouveaux boutons pour RSA, AES et Hachage */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Cipher', { method: 'RSA' })}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Cryptage RSA
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AES')} // Naviguer vers la page AES
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Cryptage AES
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Cipher', { method: 'Hash' })}
            style={styles.methodButton}
            labelStyle={styles.buttonText}
          >
            Hachage SHA-256
          </Button>
          
          {/* Bouton Mode Entraînement */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('trainment')}
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
  resultCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    width: '100%',
  },
  resultText: { color: '#fff', fontSize: 16 },
});
