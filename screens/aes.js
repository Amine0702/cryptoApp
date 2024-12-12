import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Card, RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import CryptoJS from 'crypto-js'; // Utilisation de crypto-js pour AES

const AESExample = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState(''); // Zone de texte pour la clé
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [action, setAction] = useState('encrypt');
  const [loading, setLoading] = useState(false);

  // Fonction de chiffrement
  const encryptText = () => {
    setLoading(true);
    if (key.length === 16 && text) { // Vérifier que la clé est bien de 16 caractères
      const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Un vecteur d'initialisation de 16 caractères
      const ciphertext = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), { iv: iv }).toString();
      setEncryptedText(ciphertext);
      setLoading(false);
    } else {
      alert("Veuillez entrer du texte et une clé de chiffrement valide (16 caractères).");
      setLoading(false);
    }
  };

  // Fonction de déchiffrement
  const decryptText = () => {
    setLoading(true);
    if (key.length === 16 && encryptedText) { // Vérifier que la clé est bien de 16 caractères
      const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Un vecteur d'initialisation de 16 caractères
      const bytes = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(key), { iv: iv });
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedText(originalText || "Erreur: le texte déchiffré n'est pas valide.");
      setLoading(false);
    } else {
      alert("Veuillez entrer une clé valide de 16 caractères et un texte chiffré.");
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>AES - Cryptage/Décryptage</Text>
        <Card style={styles.card}>
          <TextInput
            style={[styles.input, styles.inputWithPlaceholder]}
            placeholder="Entrez le texte à chiffrer"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={[styles.input, styles.inputWithPlaceholder]}
            placeholder="Clé AES (16 caractères)"
            value={key}
            onChangeText={setKey}
            secureTextEntry
          />

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

          {/* Bouton Exécuter */}
          <View style={styles.buttonContainer}>
            <Button
              title={action === 'encrypt' ? "Crypter" : "Décrypter"}
              onPress={action === 'encrypt' ? encryptText : decryptText}
              color="white"
              style={styles.runButton}
            />
          </View>

          {loading && <LottieView source={require('../assets/loader.json')} autoPlay loop style={styles.loader} />}
          
          {/* Résultats */}
          {encryptedText && action === 'encrypt' && (
            <Card style={styles.resultCard}>
              <Text style={styles.resultLabel}>Texte Chiffré</Text>
              <TextInput
                style={styles.resultTextInput}
                value={encryptedText}
                editable={false}
                multiline
                selectTextOnFocus
              />
            </Card>
          )}
          {decryptedText && action === 'decrypt' && (
            <Card style={styles.resultCard}>
              <Text style={styles.resultLabel}>Texte Déchiffré</Text>
              <TextInput
                style={styles.resultTextInput}
                value={decryptedText}
                editable={false}
                multiline
                selectTextOnFocus
              />
            </Card>
          )}
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#ffff',
  },
  inputWithPlaceholder: {
    color: '#000',
    placeholderTextColor: '#fff',
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
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'green', 
    padding: 10,
    borderRadius: 10,
  },
  runButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  loader: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  resultCard: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultTextInput: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    minHeight: 80,
    paddingHorizontal: 10,
  },
});

export default AESExample;
