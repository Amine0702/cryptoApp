// Fonction pour calculer le PGCD (plus grand commun diviseur)
const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
  };
  
  // Fonction pour vérifier que 'a' et 26 sont copremiers
  const isCoprimeWith26 = a => gcd(a, 26) === 1;
  
  export const affineEncrypt = (text, a, b) => {
    if (!isCoprimeWith26(a)) {
      return "Erreur : La clé 'a' doit être copremière avec 26.";
    }
    if (b < 0 || b >= 26) {
      return "Erreur : La clé 'b' doit être comprise entre 0 et 25.";
    }
  
    return text
      .split('')
      .map(char => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((a * (char.charCodeAt(0) - 97) + b) % 26) + 97);
        }
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((a * (char.charCodeAt(0) - 65) + b) % 26) + 65);
        }
        return char;
      })
      .join('');
  };
  
  export const affineDecrypt = (text, a, b) => {
    if (!isCoprimeWith26(a)) {
      return "Erreur : La clé 'a' doit être copremière avec 26.";
    }
    if (b < 0 || b >= 26) {
      return "Erreur : La clé 'b' doit être comprise entre 0 et 25.";
    }
  
    // Calcul de l'inverse modulaire de 'a'
    const modInverse = (a, m) => {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
      }
      return null;
    };
  
    const aInv = modInverse(a, 26);
    return text
      .split('')
      .map(char => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((aInv * (char.charCodeAt(0) - 97 - b + 26)) % 26) + 97);
        }
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((aInv * (char.charCodeAt(0) - 65 - b + 26)) % 26) + 65);
        }
        return char;
      })
      .join('');
  };
  