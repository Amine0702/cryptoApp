export const vigenereEncrypt = (text, key) => {
    if (!key || !/^[a-zA-Z]+$/.test(key)) {
      return "Erreur : La clé doit contenir uniquement des lettres et ne doit pas être vide.";
    }
  
    let keyIndex = 0;
    return text
      .split('')
      .map(char => {
        if (/[a-zA-Z]/.test(char)) {
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 65 : 97;
          const keyChar = key[keyIndex % key.length].toLowerCase();
          const shift = keyChar.charCodeAt(0) - 97;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  };
  
  export const vigenereDecrypt = (text, key) => {
    if (!key || !/^[a-zA-Z]+$/.test(key)) {
      return "Erreur : La clé doit contenir uniquement des lettres et ne doit pas être vide.";
    }
  
    let keyIndex = 0;
    return text
      .split('')
      .map(char => {
        if (/[a-zA-Z]/.test(char)) {
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 65 : 97;
          const keyChar = key[keyIndex % key.length].toLowerCase();
          const shift = keyChar.charCodeAt(0) - 97;
          keyIndex++;
          return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
        }
        return char;
      })
      .join('');
  };
  