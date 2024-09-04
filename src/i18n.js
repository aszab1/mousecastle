import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import de from './locales/de.json'
import hu from './locales/hu.json'

// Retrieve saved language or default to English
const savedLanguage = localStorage.getItem('language') || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    hu: { translation: hu }
  },
  lng: savedLanguage, // use save lng or fallback to English
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n

