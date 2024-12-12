import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, ScrollView } from 'react-native';
import { Button, Text, Card, RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function TrainingScreen() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(0);

  const methodsInfo = {
    cesar: {
      title: 'Chiffre de César',
      description: 'Le chiffre de César est un chiffrement par substitution où chaque lettre du texte est décalée d’un certain nombre de positions dans l’alphabet.',
      example: 'Exemple : Si la clé est 3, le texte "Bonjour" deviendra "Erqrxu".',
    },
    affine: {
      title: 'Chiffre Affine',
      description: 'Le chiffre affine est une variante du chiffre de César, mais il utilise une fonction affine pour chiffrer chaque lettre.',
      example: 'Exemple : Pour les clés a=5 et b=8, le texte "Bonjour" devient "Fspvdu".',
    },
    vigenere: {
      title: 'Chiffre de Vigenère',
      description: 'Le chiffre de Vigenère est un chiffrement par substitution polyalphabétique où chaque lettre est décalée selon une clé.',
      example: 'Exemple : Avec la clé "KEY", "Bonjour" devient "Lflpxv".',
    },
    rsa: {
      title: 'RSA',
      description: 'RSA est un algorithme de cryptographie asymétrique utilisé pour sécuriser les données en utilisant une clé publique pour le chiffrement et une clé privée pour le déchiffrement.',
      example: 'Exemple : Le texte "Bonjour" est chiffré avec la clé publique et déchiffré avec la clé privée.',
    },
    aes: {
      title: 'AES',
      description: 'AES est un algorithme de chiffrement symétrique utilisé pour sécuriser les données en utilisant une clé de longueur spécifique (16, 24 ou 32 caractères).',
      example: 'Exemple : Avec la clé "1234567890123456", "Bonjour" est chiffré en texte illisible.',
    },
    hash: {
      title: 'Hachage',
      description: 'Le hachage est une fonction mathématique qui transforme un texte en une valeur fixe, appelée empreinte, pour assurer l’intégrité des données.',
      example: 'Exemple : Le texte "Bonjour" haché en SHA256 devient "05e2a5c6c8a015f6a7d0781a576b0b15f1a319ef8f6ec0a1c9fcbcf0d9c4b453".',
    },
  };

  const quizQuestions = [
    {
      question: 'Quel est l’algorithme utilisé pour chiffrer et déchiffrer avec des clés différentes ?',
      options: ['César', 'Affine', 'RSA', 'AES'],
      correctAnswer: 'RSA',
    },
    {
        question: 'Quel algorithme utilise un décalage de lettres pour le chiffrement ?',
        options: ['César', 'Vigenère', 'AES', 'Hash'],
        correctAnswer: 'César',
      },
      {
        question: 'Quel algorithme utilise une clé publique pour le chiffrement et une clé privée pour le déchiffrement ?',
        options: ['RSA', 'César', 'AES', 'Affine'],
        correctAnswer: 'RSA',
      },
      {
        question: 'Quel algorithme est un chiffrement symétrique ?',
        options: ['AES', 'RSA', 'Vigenère', 'César'],
        correctAnswer: 'AES',
      },
      {
        question: 'Le chiffre Affine nécessite quelles clés ?',
        options: ['Une clé unique', 'Deux clés', 'Une clé publique et une clé privée', 'Une clé et un texte'],
        correctAnswer: 'Deux clés',
      },
      {
        question: 'Quel algorithme est souvent utilisé pour sécuriser les mots de passe ?',
        options: ['César', 'RSA', 'Hash', 'AES'],
        correctAnswer: 'Hash',
      },
      {
        question: 'Quel est l’objectif principal du hachage ?',
        options: ['Chiffrer les données', 'Vérifier l’intégrité des données', 'Générer une clé', 'Chiffrer une clé'],
        correctAnswer: 'Vérifier l’intégrité des données',
      },
      {
        question: 'Dans le chiffre de Vigenère, quel est le rôle de la clé ?',
        options: ['Elle sert à décaler les lettres selon un certain nombre', 'Elle est utilisée pour générer un mot de passe', 'Elle est utilisée pour crypter le texte avec un nombre aléatoire', 'Elle est utilisée pour hacher le texte'],
        correctAnswer: 'Elle sert à décaler les lettres selon un certain nombre',
      },
      {
        question: 'Dans AES, quelle est la longueur minimale de la clé ?',
        options: ['8 caractères', '16 caractères', '24 caractères', '32 caractères'],
        correctAnswer: '16 caractères',
      },
      {
        question: 'Le chiffre César est-il un chiffrement par substitution ?',
        options: ['Oui', 'Non'],
        correctAnswer: 'Oui',
      },
  ];

  const startQuiz = () => setQuizStarted(true);

  const handleAnswer = (questionIndex, selectedAnswer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: selectedAnswer,
    });
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    setScore(score);
  };

  return (
    <ImageBackground source={require('../assets/hacker-bg.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Entraînement au Cryptage et Décryptage</Text>
        
        {!quizStarted ? (
          <View>
            {Object.entries(methodsInfo).map(([key, { title, description, example }]) => (
              <Card key={key} style={styles.card}>
                <Text style={styles.methodTitle}>{title}</Text>
                <Text style={styles.methodDescription}>{description}</Text>
                <Text style={styles.methodExample}>{example}</Text>
              </Card>
            ))}

            <Button mode="contained" onPress={startQuiz} style={styles.generateButton} labelStyle={styles.buttonText}>
              Commencer le Quiz
            </Button>
          </View>
        ) : (
          <View>
            {quizQuestions.map((question, index) => (
              <Card key={index} style={styles.quizCard}>
                <Text style={styles.quizQuestion}>{question.question}</Text>
                {question.options.map((option, idx) => (
                  <View key={idx} style={styles.option}>
                    <RadioButton
                      value={option}
                      status={quizAnswers[index] === option ? 'checked' : 'unchecked'}
                      onPress={() => handleAnswer(index, option)}
                    />
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                ))}
              </Card>
            ))}

            <Button mode="contained" onPress={calculateScore} style={styles.generateButton} labelStyle={styles.buttonText}>
              Calculer le Score
            </Button>
            {score !== 0 && (
              <Text style={styles.score}>Votre Score : {score} / {quizQuestions.length}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed overlay for better contrast
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
  methodTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  methodDescription: {
    fontSize: 16,
    color: '#fff',
  },
  methodExample: {
    fontStyle: 'italic',
    color: '#ddd',
  },
  quizCard: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
  },
  quizQuestion: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  generateButton: {
    backgroundColor: '#f39c12',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
});
