import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import i18next from '../i18n';
import RSA from 'react-native-rsa-native'; // Import the RSA library

const KeyGenerationScreen = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);

  const generateKeys = async () => {
    setLoading(true);  // Show loading indicator while generating keys
    try {
      // Generate RSA keys
      const { publicKey, privateKey } = await RSA.generateKeys(2048); // 2048 bit key size
      setPrivateKey(privateKey);
      setPublicKey(publicKey);
    } catch (error) {
      console.error('Key generation error:', error);
      Alert.alert('Error', 'There was an issue generating the keys. Please try again.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{i18next.t('generate_keys')}</Text>
      <Button 
        mode="contained" 
        onPress={generateKeys} 
        style={styles.button}
        loading={loading}  // Show loading spinner on button
        disabled={loading} // Disable button while loading
      >
        {i18next.t('generate_keys')}
      </Button>
      <Card style={styles.card}>
        <Text style={styles.label}>{i18next.t('public_key')}</Text>
        <TextInput
          style={styles.textArea}
          value={publicKey}
          editable={false}
          multiline
        />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.label}>{i18next.t('private_key')}</Text>
        <TextInput
          style={styles.textArea}
          value={privateKey}
          editable={false}
          multiline
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, textAlign: 'center' },
  button: { marginVertical: 20, backgroundColor: '#007bff' },
  card: { marginBottom: 20, padding: 15, backgroundColor: '#1e1e1e' },
  label: { fontSize: 16, color: '#fff', marginBottom: 10 },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
  },
});

export default KeyGenerationScreen;
