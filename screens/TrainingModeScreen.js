import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrainingModeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mode Entraînement</Text>
      <Text style={styles.description}>Apprenez à utiliser les algorithmes de cryptage.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  description: { fontSize: 16, color: '#ccc' },
});

export default TrainingModeScreen;
