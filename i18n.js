import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "generate_keys": "Generate Keys",
      "public_key": "Public Key",
      "private_key": "Private Key",
    },
  },
  fr: {
    translation: {
      "generate_keys": "Générer des clés",
      "public_key": "Clé publique",
      "private_key": "Clé privée",
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18next;
