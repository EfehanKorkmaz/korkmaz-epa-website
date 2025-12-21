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

    const changeLanguage = useCallback((lang) => {
        if (lang === 'tr' || lang === 'en') {
            setLanguage(lang);
            localStorage.setItem('language', lang);
        }
    }, []);

    const toggleLanguage = useCallback(() => {
        const newLang = language === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    }, [language]);

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

    const translateCategory = useCallback((category) => {
        const categoryTranslations = translations[language].categories;
        return categoryTranslations[category] || category;
    }, [language]);

    // Akıllı proje ismi çevirisi
    const translateProjectName = useCallback((name) => {
        if (language === 'tr') return name;

        let result = name.toLowerCase();

        // 1. Hanım/Bey kalıplarını işle: "[İsim] Hanım" → "Ms. [İsim]'s"
        // Bu en önce çalışmalı ki isimler korunsun
        result = result.replace(/(\S+)\s+hanım/gi, (match, name) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            return `Ms. ${capitalizedName}'s`;
        });
        result = result.replace(/(\S+)\s+bey/gi, (match, name) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            return `Mr. ${capitalizedName}'s`;
        });

        // 2. Bağlamsal çeviriler (compound terms) - uzun ifadelerden kısalara
        const contextualReplacements = [
            // "ve" bağlacı
            [/\s+ve\s+/gi, ' and '],

            // Çalışma/çalışması kalıpları
            [/çeşitli\s+çalışmalar(ı)?/gi, 'Various Works'],
            [/çalışması/gi, 'Work'],
            [/çalışmaları/gi, 'Works'],
            [/çalışmalar/gi, 'Works'],

            // Prefabrik kombinasyonları
            [/prefabrik\s+temel(i)?/gi, 'Prefabricated Building Foundation'],
            [/prefabrik\s+yapı(sı)?/gi, 'Prefabricated Building'],
            [/prefabrik\s+yer(i)?/gi, 'Prefabricated Site'],
            [/prabrik\s+yer(i)?/gi, 'Prefabricated Site'], // typo versiyonu
            [/prefabrik/gi, 'Prefabricated Building'],
            [/prabrik/gi, 'Prefabricated'], // typo versiyonu

            // Belediye + suffix
            [/belediye(si)?\s+köprü/gi, 'Municipality Bridge'],
            [/belediye(si)?/gi, 'Municipality'],

            // Çatı kombinasyonları
            [/çatı\s+katı/gi, 'Attic'],
            [/çatı\s+tadilat(ı)?/gi, 'Roof Renovation'],
            [/çatı/gi, 'Roof'],

            // Konut kombinasyonları
            [/konut\s+inşaatı/gi, 'Residential Construction'],
            [/konut/gi, 'Residence'],

            // Diğer yaygın terimler
            [/taksi\s+durağı\s+temel(i)?/gi, 'Taxi Stand Foundation'],
            [/taksi\s+durağı/gi, 'Taxi Stand'],
            [/bekçi\s+kulübesi/gi, 'Guard House'],
            [/basket\s+sahası/gi, 'Basketball Court'],
            [/bilişim\s+vadisi/gi, 'Technology Valley'],
            [/teras\s+kapama/gi, 'Terrace Enclosure'],
            [/yat\s+limanı/gi, 'Marina'],
            [/beton\s+santral(i)?/gi, 'Concrete Plant'],
            [/saha\s+betonu/gi, 'Field Concrete'],
            [/çevre\s+düzenleme/gi, 'Landscaping'],
            [/mezarlık\s+merdiven/gi, 'Cemetery Stairs'],
            [/mezarlığı/gi, 'Cemetery'],
            [/mezarlık/gi, 'Cemetery'],
            [/giriş\s+kapısı/gi, 'Entrance Gate'],
            [/istinat\s+duvarı/gi, 'Retaining Wall'],
            [/ek\s+bina/gi, 'Additional Building'],
            [/iş\s+merkezi/gi, 'Business Center'],
            [/taşı/gi, 'Stone'],
            [/taş/gi, 'Stone'],

            // Tekil kelimeler
            [/fabrika/gi, 'Factory'],
            [/temel(i)?/gi, 'Foundation'],
            [/tadilat(ı)?/gi, 'Renovation'],
            [/güçlendirme/gi, 'Strengthening'],
            [/inşaat(ı)?/gi, 'Construction'],
            [/villa/gi, 'Villa'],
            [/endüstriyel/gi, 'Industrial'],
            [/ticari/gi, 'Commercial'],
            [/makine/gi, 'Machine'],
            [/yapı(sı)?/gi, 'Building'],
            [/kat(ı)?/gi, 'Floor']
        ];

        for (const [pattern, replacement] of contextualReplacements) {
            result = result.replace(pattern, replacement);
        }

        // 3. Kelime başlarını büyük harf yap (Title Case)
        result = result.replace(/\b\w/g, char => char.toUpperCase());

        // 4. "Ms." ve "Mr." düzeltmeleri
        result = result.replace(/\bMs\./g, 'Ms.');
        result = result.replace(/\bMr\./g, 'Mr.');

        return result;
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
