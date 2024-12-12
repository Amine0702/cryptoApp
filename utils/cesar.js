export const cesarEncrypt = (text, shift) => {
    if (shift < 1 || shift >= 26) {
      return "Erreur : La clé doit être comprise entre 1 et 25.";
    }
  
    return text
      .split('')
      .map(char => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        return char;
      })
      .join('');
  };
  
  export const cesarDecrypt = (text, shift) => {
    if (shift < 1 || shift >= 26) {
      return "Erreur : La clé doit être comprise entre 1 et 25.";
    }
  
    return cesarEncrypt(text, 26 - shift);
  };
  