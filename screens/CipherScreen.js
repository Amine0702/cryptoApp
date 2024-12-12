import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, ScrollView } from 'react-native';
import { Button, Text, Card, RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {
  cesarEncrypt,
  cesarDecrypt,
  affineEncrypt,
  affineDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  hashText,
  generateRSAKeys,
  rsaEncrypt,
  rsaDecrypt,
} from '../utils/cryptoUtils';




export default function CipherScreen({ route }) {
  const { method } = route.params;
  const [text, setText] = useState('');
  const [action, setAction] = useState('encrypt');
  const [result, setResult] = useState('');
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [loading, setLoading] = useState(false);
  const [rsaKeys, setRsaKeys] = useState({ publicKey: '', privateKey: '' });
  const [password, setPassword] = useState('');

  const handleCipher = () => {
    setLoading(true);
    let output = '';
    setTimeout(() => {
      try {
        switch (method) {
          case 'César':
            const shift = parseInt(key1);
            output = action === 'encrypt' ? cesarEncrypt(text, shift) : cesarDecrypt(text, shift);
            break;
          case 'Affine':
            const a = parseInt(key1);
            const b = parseInt(key2);
            output = action === 'encrypt' ? affineEncrypt(text, a, b) : affineDecrypt(text, a, b);
            break;
          case 'Vigenère':
            output = action === 'encrypt' ? vigenereEncrypt(text, key1) : vigenereDecrypt(text, key1);
            break;
          case 'RSA':
            if (action === 'encrypt') {
              output = rsaEncrypt(text, rsaKeys.publicKey);
            } else if (action === 'decrypt') {
              if (password === '123456') {
                output = rsaDecrypt(text, rsaKeys.privateKey);
              } else {
                output = 'Mot de passe incorrect';
              }
            }
            break;
          case 'Hash':
            output = hashText(text);
            break;
          default:
            output = 'Méthode inconnue';
            break;
        }
      } catch (error) {
        output = `Erreur : ${error.message}`;
      }
      setResult(output);
      setLoading(false);
    }, 1500);
  };

  const handleGenerateKeys = () => {
    const keys = generateRSAKeys();
    setRsaKeys(keys);
  };

  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Méthode : {method}</Text>
        <Card style={styles.card}>
          <TextInput
            style={[styles.input, styles.inputWithPlaceholder]}
            placeholder="Entrez votre texte"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
          />

          {/* Méthode RSA */}
          {method === 'RSA' && (
            <View>
              <TextInput
                style={[styles.input, styles.inputWithPlaceholder]}
                placeholder="Clé publique (générée automatiquement)"
                value={rsaKeys.publicKey}
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.inputWithPlaceholder]}
                placeholder="Clé privée (générée automatiquement)"
                value={rsaKeys.privateKey.replace(/./g, '*')} // Affiche les étoiles
                editable={false}
              />
              {action === 'decrypt' && (
                <TextInput
                  style={[styles.input, styles.inputWithPlaceholder]}
                  placeholder="Entrez le mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              )}
              <Button
                mode="contained"
                onPress={handleGenerateKeys}
                style={styles.generateButton}
                labelStyle={styles.buttonText}
              >
                Générer les clés RSA
              </Button>
            </View>
          )}

          {/* Méthode César */}
          {method === 'César' && (
            <TextInput
              style={[styles.input, styles.inputWithPlaceholder]}
              placeholder="Clé César : Entrez un nombre entier (décalage)"
              value={key1}
              onChangeText={setKey1}
              keyboardType="numeric"
            />
          )}

          {/* Méthode Affine */}
          {method === 'Affine' && (
            <View>
              <TextInput
                style={[styles.input, styles.inputWithPlaceholder]}
                placeholder="Clé 'a' (coprime avec 26)"
                value={key1}
                onChangeText={setKey1}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.inputWithPlaceholder]}
                placeholder="Clé 'b'"
                value={key2}
                onChangeText={setKey2}
                keyboardType="numeric"
              />
            </View>
          )}

          {/* Méthode Vigenère */}
          {method === 'Vigenère' && (
            <TextInput
              style={[styles.input, styles.inputWithPlaceholder]}
              placeholder="Clé Vigenère : Entrez une chaîne de texte"
              value={key1}
              onChangeText={setKey1}
            />
          )}

          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Choisir l'action :</Text>
            <RadioButton.Group onValueChange={setAction} value={action}>
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

          <Button mode="contained" onPress={handleCipher} style={styles.runButton} labelStyle={styles.buttonText}>
            Exécuter
          </Button>
        </Card>

        {loading && <LottieView source={require('../assets/loader.json')} autoPlay loop style={styles.loader} />}

        {result && (
          <Card style={styles.resultCard}>
            <TextInput
              style={styles.resultTextInput}
              value={result}
              editable={false}
              multiline
            />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Réduire l'opacité pour un meilleur contraste
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Ajuster l'arrière-plan pour plus de lisibilité
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
    color: '#fff', // Texte en blanc
    backgroundColor: '#ffff', // Fond plus clair pour les champs de saisie
  },
  inputWithPlaceholder: {
    color: '#000', // Texte en blanc
    placeholderTextColor: '#000', // Placeholder en gris clair pour une meilleure visibilité
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
  generateButton: {
    backgroundColor: '#f39c12',
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
  resultTextInput: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    minHeight: 80,
    paddingHorizontal: 10,
  },
  loader: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

