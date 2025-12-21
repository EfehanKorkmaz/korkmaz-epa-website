import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import trTranslations from '../locales/tr.json';
import enTranslations from '../locales/en.json';

const translations = {
    tr: trTranslations,
    en: enTranslations
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('tr');

    // Tarayıcı dilini veya localStorage'daki tercihi algıla
    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
            setLanguage(savedLang);
            return;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            if (browserLang.toLowerCase().startsWith('tr')) {
                setLanguage('tr');
            } else {
                setLanguage('en');
            }
        }
    }, []);

    // Dil değiştir ve localStorage'a kaydet
    const changeLanguage = useCallback((lang) => {
        if (lang === 'tr' || lang === 'en') {
            setLanguage(lang);
            localStorage.setItem('language', lang);
        }
    }, []);

    // Dil değiştir (toggle)
    const toggleLanguage = useCallback(() => {
        const newLang = language === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    }, [language]);

    // Çeviri fonksiyonu - nested keys destekler: t('nav.home')
    const t = useCallback((key) => {
        const keys = key.split('.');
        let result = translations[language];

        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                return key;
            }
        }

        return result;
    }, [language]);

    // Kategori çevirisi
    const translateCategory = useCallback((category) => {
        const categoryTranslations = translations[language].categories;
        return categoryTranslations[category] || category;
    }, [language]);

    // Proje ismi çevirisi - Türkçe kelimeleri İngilizceye çevirir
    const translateProjectName = useCallback((name) => {
        if (language === 'tr') return name; // Türkçe ise olduğu gibi döndür

        const wordTranslations = translations.en.projectWords;
        let translatedName = name;

        // Kelime kelime çevir (uzun kelimelerden başla)
        const sortedWords = Object.keys(wordTranslations).sort((a, b) => b.length - a.length);

        for (const turkishWord of sortedWords) {
            const englishWord = wordTranslations[turkishWord];
            // Büyük/küçük harf duyarsız değiştirme
            const regex = new RegExp(turkishWord, 'gi');
            translatedName = translatedName.replace(regex, englishWord);
        }

        return translatedName;
    }, [language]);

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage: changeLanguage,
            toggleLanguage,
            t,
            translateCategory,
            translateProjectName
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;
