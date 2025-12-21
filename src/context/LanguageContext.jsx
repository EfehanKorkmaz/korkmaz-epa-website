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
        // Türkçe modda değişiklik yok
        if (language === 'tr') return name;

        // İngilizce çeviriler için mapping (Türkçe isim -> İngilizce isim)
        const projectNameMappings = {
            'Fabrika Bekçi Kulübesi': 'Factory Guard House',
            'Marina Bayramoğlu Yat Limanı 2021': 'Marina Bayramoglu Yacht Port 2021',
            'Dilovası Prefabrik Altyapı': 'Dilovasi Prefabricated Infrastructure',
            'Çatı Bakımı ve Onarımı': 'Roof Maintenance and Repair',
            'Çatı Tadilatı ve Membran': 'Roof Renovation and Membrane',
            'Çatı Çalışması 3 Bayramoğlu 2021': 'Roofing Work 3 Bayramoglu 2021',
            'Konut 2022': 'Residence 2022',
            'Darıca Konut': 'Darica Residence',
            'Küçükyalı Beton Santrali': 'Kucukyali Concrete Plant',
            'Osmangazi Konut 2021': 'Osmangazi Residence 2021',
            'Villa Çevre Düzenleme Bayramoğlu 2022': 'Villa Landscaping Bayramoglu 2022',
            'İş Merkezi Binası Osmangazi 2016': 'Business Center Building Osmangazi 2016',
            'Atıcı Konut 2021': 'Atici Residence 2021',
            'Bayramoğlu Villa 2022': 'Bayramoglu Villa 2022',
            'Eskihisar Çatı ve Tadilat 2021': 'Eskihisar Roof and Renovation 2021',
            'Gökçe Nefes': 'Gokce Nefes',
            'Gökçe Vital': 'Gokce Vital',
            'Gökçe Parla': 'Gokce Parla',
            'Gökçe Beosis': 'Gokce Beosis',
        };

        // Tam eşleşme kontrolü
        if (projectNameMappings[name]) {
            return projectNameMappings[name];
        }

        // 1. Önce stringi temizle ve hazırla
        // Türkçe karakterler için özel lowercase işlemi (İ -> i)
        let result = name.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();

        // Özel durumlar ve Typo düzeltmeleri
        result = result.replace(/bayramoğluu/gi, 'bayramoğlu');
        result = result.replace(/\blima\b(?!n)/gi, 'limanı');

        // 2. Hanım/Bey kalıplarını işle: "[İsim] Hanım" → "Ms. [İsim]'s"
        result = result.replace(/(\S+)\s+hanım/gi, (match, name) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            return `Ms. ${capitalizedName}'s`;
        });
        result = result.replace(/(\S+)\s+bey/gi, (match, name) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            return `Mr. ${capitalizedName}'s`;
        });

        // 3. Bağlamsal çeviriler (compound terms)
        const contextualReplacements = [
            // "ve" bağlacı
            [/\s+ve\s+/gi, ' and '],

            // En uzun ifadeler (Longest Match First)
            [/gebze\s+teknik\s+üniversitesi/gi, 'Gebze Technical University'],
            [/kalıpçı\s+ustası\s+takımı/gi, 'Formwork Master Team'],
            [/osman\s+sayılı\s+iş\s+merkezi\s+binası/gi, 'Osman Sayılı Business Center Building'],
            [/nenehatun\s+residence\s+inşaat(ı)?/gi, 'Nenehatun Residence Construction'],

            // Tuzla Municipality Case
            [/belediye(si)?\s+çeşitli\s+alanlarda/gi, 'Municipality Various Areas'],
            [/municipality\s+çeşitli\s+alanlarda/gi, 'Municipality Various Areas'],

            // Villa Bayramoglu Case
            [/ilave\s+ek/gi, 'Additional Extension'],

            // Yeni Darıca Cemetery Case
            // "Yeni Darica Cemetery Kapi Girisi" -> "New Darica Cemetery Entrance Gate"
            [/yeni\s+darıca\s+ce?metery\s+kapı\s+girişi/gi, 'New Darica Cemetery Entrance Gate'],
            [/kapı\s+girişi/gi, 'Entrance Gate'],
            [/yeni/gi, 'New'],

            // Yusuf Destek Case
            // "Yusuf Destek" -> "Yusuf Destek Residence" (Sadece isim kalmışsa tür ekle)
            [/yusuf\s+destek/gi, 'Yusuf Destek Residence'],

            // Saat Kulesi Yanı
            [/saat\s+kules[iı]\s+yan[iı]\s+(residence|konut)/gi, 'Residence Near Clock Tower'],
            [/saat\s+kules[iı]\s+yan[iı]/gi, 'Next to Clock Tower'],

            // Orta uzunluktaki ifadeler
            [/iş\s+merkezi\s+bina(sı)?/gi, 'Business Center Building'],
            [/muhtarlık\s+merdiven(i)?/gi, 'Headman\'s Office Stairs'],
            [/muhtarlık\s+merdiveni/gi, 'Headman\'s Office Stairs'],
            [/muhtarlık/gi, 'Headman\'s Office'],

            [/ek\s+derslik/gi, 'Additional Classroom'],
            [/kantar\s+yeri/gi, 'Weighbridge Site'],
            [/kayrak\s+taşı/gi, 'Slate Stone'],
            [/ustalık\s+dönemi/gi, 'Mastery Period'],
            [/geçici/gi, 'Temporary'],

            // "İşleri" için daha kapsamlı regex
            [/işleri/gi, 'Works'],
            [/isleri/gi, 'Works'],

            [/istinat\s+work/gi, 'Retaining Wall'],
            [/istinat\s+duvarı/gi, 'Retaining Wall'],
            [/istinat/gi, 'Retaining Wall'],

            [/prefabrik\s+temel(i)?/gi, 'Prefabricated Building Foundation'],
            [/prefabrik\s+yapı(sı)?/gi, 'Prefabricated Building'],
            [/prefabrik\s+yer(i)?/gi, 'Prefabricated Site'],
            [/prabrik\s+yer(i)?/gi, 'Prefabricated Site'],
            [/prabrik/gi, 'Prefabricated'],

            [/belediye(si)?\s+çeşitli\s+çalışmalar(ı)?/gi, 'Municipality Various Works'],
            [/belediye(si)?\s+köprü/gi, 'Municipality Bridge'],

            [/taksi\s+durağı\s+temel(i)?/gi, 'Taxi Stand Foundation'],
            [/taksi\s+durağı/gi, 'Taxi Stand'],

            [/bekçi\s+kulübesi/gi, 'Guard House'],
            [/basket\s+sahası/gi, 'Basketball Court'],
            [/bilişim\s+vadisi/gi, 'Technology Valley'],
            [/teras\s+kapama/gi, 'Terrace Enclosure'],

            [/yat\s+limanı/gi, 'Marina'],
            [/sefine\s+liman(ı)?/gi, 'Sefine Port'],
            [/liman(ı)?/gi, 'Port'],

            [/beton\s+santral(i)?/gi, 'Concrete Plant'],
            [/betonarme/gi, 'Reinforced Concrete'],
            [/saha\s+betonu/gi, 'Field Concrete'],
            [/çevre\s+düzenleme/gi, 'Landscaping'],

            [/mezarlık\s+merdiven/gi, 'Cemetery Stairs'],
            [/mezarlığı/gi, 'Cemetery'],
            [/mezarlık/gi, 'Cemetery'],

            [/giriş\s+kapısı/gi, 'Entrance Gate'],
            [/ek\s+bina/gi, 'Additional Building'],
            [/iş\s+merkezi/gi, 'Business Center'],
            [/mahallesi/gi, 'Neighborhood'],
            [/mahalle/gi, 'Neighborhood'],

            // Çalışma kelimeleri
            [/çeşitli\s+çalışmalar(ı)?/gi, 'Various Works'],
            [/çalışması/gi, 'Work'],
            [/çalışmaları/gi, 'Works'],
            [/çalışmalar/gi, 'Works'],

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
            [/kat(ı)?/gi, 'Floor'],
            [/belediye(si)?/gi, 'Municipality'],
            [/çatı/gi, 'Roof'],
            [/konut/gi, 'Residence'],
            [/taşı/gi, 'Stone'],
            [/taş/gi, 'Stone']
        ];

        for (const [pattern, replacement] of contextualReplacements) {
            result = result.replace(pattern, replacement);
        }

        // 4. Kelime başlarını büyük harf yap (Title Case)
        result = result.replace(/\b\w/g, char => char.toUpperCase());

        // 5. "Ms.", "Mr.", "And" düzeltmeleri
        result = result.replace(/\bMs\./g, 'Ms.');
        result = result.replace(/\bMr\./g, 'Mr.');
        result = result.replace(/\bAnd\b/g, 'and');

        // 6. Son temizlikler
        result = result.replace(/Retaining Wall Work/gi, 'Retaining Wall');

        if (result.match(/Marina.*Marina/i)) {
            result = result.replace(/^Marina\s+/i, '');
        }

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
