import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, ScrollView } from 'react-native';
import { Button, Text, Card, RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native'; // Importer Lottie pour l'animation
import {
  cesarEncrypt,
  cesarDecrypt,
  affineEncrypt,
  affineDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
} from '../utils/cryptoUtils';

export default function CipherScreen({ route }) {
  const { method } = route.params;
  const [text, setText] = useState('');
  const [action, setAction] = useState('encrypt');
  const [result, setResult] = useState('');
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [loading, setLoading] = useState(false); // Ajouter un état pour la gestion du chargement

  const handleCipher = () => {
    setLoading(true); // Début de l'animation de chargement
    let output = '';
    setTimeout(() => { // Simuler un délai de chiffrement
      if (method === 'César') {
        const shift = parseInt(key1);
        output = action === 'encrypt' ? cesarEncrypt(text, shift) : cesarDecrypt(text, shift);
      } else if (method === 'Affine') {
        const a = parseInt(key1);
        const b = parseInt(key2);
        output = action === 'encrypt' ? affineEncrypt(text, a, b) : affineDecrypt(text, a, b);
      } else if (method === 'Vigenère') {
        output = action === 'encrypt' ? vigenereEncrypt(text, key1) : vigenereDecrypt(text, key1);
      }
      setResult(output);
      setLoading(false); // Fin du chargement
    }, 1500); // Le délai de traitement est simulé ici à 1.5 secondes
  };

  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Méthode : {method}</Text>
        <Card style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre texte"
            placeholderTextColor="#ccc"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={styles.input}
            placeholder="Clé principale"
            placeholderTextColor="#ccc"
            value={key1}
            onChangeText={setKey1}
            keyboardType={method === 'Vigenère' ? 'default' : 'numeric'}
          />
          {method === 'Affine' && (
            <TextInput
              style={styles.input}
              placeholder="Clé secondaire"
              placeholderTextColor="#ccc"
              value={key2}
              onChangeText={setKey2}
              keyboardType="numeric"
            />
          )}
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Choisir l'action :</Text>
            <RadioButton.Group
              onValueChange={value => setAction(value)}
              value={action}
            >
              <View style={styles.radioOption}>
                <RadioButton value="encrypt" />
                <Text style={styles.radioText}>Crypter</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="decrypt" />
                <Text style={styles.radioText}>Décrypter</Text>
              </View>
            </RadioButton.Group>
          </View>
          <Button
            mode="contained"
            onPress={handleCipher}
            style={styles.runButton}
            labelStyle={styles.buttonText}
          >
            Exécuter
          </Button>
        </Card>
        
        {/* Afficher l'animation de chargement */}
        {loading && (
          <LottieView
            source={require('../assets/loader.json')} // Tu dois ajouter un fichier .json d'animation
            autoPlay
            loop
            style={styles.loader}
          />
        )}

        {result && (
          <Card style={styles.resultCard}>
            <Text style={styles.resultText}>{result}</Text>
          </Card>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  runButton: {
    backgroundColor: '#2ecc71',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginTop: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  loader: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
