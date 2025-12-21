# Crypto App

## Overview
Mobile application for text encryption and decryption using multiple classical and modern cryptographic algorithms.

## Features
- Encrypt and decrypt text with multiple algorithms:
  - AES
  - Caesar
  - Vigenere
  - Affine
- Mode selection and key management
- Interactive screens for testing and practicing encryption
- Cross-platform (iOS & Android) using React Native

## Folder Structure
- `assets/` - icons, images, loader animations
- `app/` - utility functions and encryption algorithms
- `screens/` - UI screens and navigation
- `App.js` - main entry point
- `i18n.js` - localization support

## Technologies
- React Native
- JavaScript
- Expo

## Security Concepts Applied
- Symmetric & classical cryptography
- Secure key handling (stored in-memory, not in plain text)
- Input validation for text encryption/decryption
- Algorithm selection and mode management


## Usage
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the app: `expo start`
