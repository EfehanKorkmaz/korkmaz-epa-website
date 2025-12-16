import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { contactInfo } from '../data';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_ch5rjbo';
const EMAILJS_TEMPLATE_ID = 'template_xwcwc0v';
const EMAILJS_PUBLIC_KEY = 'k1P9R4GXT-9wyac4L';

// Popular country codes with flag images from CDN
const countryCodes = [
    { code: '+90', country: 'TR', flagUrl: 'https://flagcdn.com/24x18/tr.png' },
    { code: '+1', country: 'US', flagUrl: 'https://flagcdn.com/24x18/us.png' },
    { code: '+44', country: 'GB', flagUrl: 'https://flagcdn.com/24x18/gb.png' },
    { code: '+49', country: 'DE', flagUrl: 'https://flagcdn.com/24x18/de.png' },
    { code: '+33', country: 'FR', flagUrl: 'https://flagcdn.com/24x18/fr.png' },
    { code: '+31', country: 'NL', flagUrl: 'https://flagcdn.com/24x18/nl.png' },
    { code: '+39', country: 'IT', flagUrl: 'https://flagcdn.com/24x18/it.png' },
    { code: '+34', country: 'ES', flagUrl: 'https://flagcdn.com/24x18/es.png' },
    { code: '+7', country: 'RU', flagUrl: 'https://flagcdn.com/24x18/ru.png' },
    { code: '+994', country: 'AZ', flagUrl: 'https://flagcdn.com/24x18/az.png' },
];

// Format phone number as XXX XXX XX XX
const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format as XXX XXX XX XX
    let formatted = '';
    if (digits.length > 0) formatted += digits.slice(0, 3);
    if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
    if (digits.length > 6) formatted += ' ' + digits.slice(6, 8);
    if (digits.length > 8) formatted += ' ' + digits.slice(8, 10);

    return formatted;
};

const ContactPage = () => {
    const [formData, setFormData] = useState({
        ad_soyad: '',
        telefon: '',
        email: '',
        konu: '',
        mesaj: ''
    });
    const [countryCode, setCountryCode] = useState('+90');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Get selected country object
    const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Combine country code with phone number for email
            const dataToSend = {
                ...formData,
                telefon: `${countryCode} ${formData.telefon}`
            };
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                dataToSend,
                EMAILJS_PUBLIC_KEY
            );
            setSubmitStatus('success');
            setFormData({
                ad_soyad: '',
                telefon: '',
                email: '',
                konu: '',
                mesaj: ''
            });
            setCountryCode('+90');
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <section
                className="pb-16 lg:pb-24 bg-gradient-to-b from-gray-800 to-gray-900"
                style={{ paddingTop: '160px' }}
            >
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: '100%'
                        }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white font-[family-name:var(--font-family-heading)] mb-6"
                    >
                        Bizimle İletişime Geçin
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            maxWidth: '42rem',
                            textAlign: 'center',
                            width: '100%'
                        }}
                        className="text-gray-400 text-lg leading-relaxed"
                    >
                        Projeleriniz hakkında konuşmak veya sorularınızı sormak için bize ulaşın.
                    </motion.p>
                </div>
            </section>

            {/* Smooth transition gradient */}
            <div
                className="h-20 -mt-10 relative z-10"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(17,24,39,0.5) 50%, transparent 100%)'
                }}
            />

            {/* Contact Content */}
            <section className="py-24 -mt-10" style={{ paddingBottom: '120px' }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}>
                    <div className="grid lg:grid-cols-2 gap-16 max-w-7xl w-full">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)] mb-8">
                                İletişim Bilgileri
                            </h2>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-start gap-4 p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-sm hover:shadow-lg transition-all card-hover">
                                    <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center text-teal-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Telefon</h3>
                                        <a
                                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                            className="text-xl font-bold text-teal-400 hover:text-teal-300 transition-colors"
                                        >
                                            {contactInfo.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4 p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-sm hover:shadow-lg transition-all card-hover">
                                    <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center text-teal-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Adres</h3>
                                        <p className="text-gray-400">
                                            {contactInfo.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4 p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-sm hover:shadow-lg transition-all card-hover">
                                    <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center text-teal-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">E-posta</h3>
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="text-teal-400 hover:text-teal-300 transition-colors"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)] mb-8">
                                Mesaj Gönderin
                            </h2>

                            {/* Success Message */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-teal-900/50 border border-teal-500 rounded-xl text-teal-300"
                                >
                                    ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-300"
                                >
                                    ❌ Mesaj gönderilemedi. Lütfen tekrar deneyin veya doğrudan bizi arayın.
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-base font-semibold text-gray-200 mb-3">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            name="ad_soyad"
                                            value={formData.ad_soyad}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-600 bg-gray-800/80 text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder:text-gray-500"
                                            placeholder="Adınız Soyadınız"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-base font-semibold text-gray-200 mb-3">
                                            Telefon
                                        </label>
                                        <div className="flex gap-3">
                                            {/* Custom Country Code Dropdown */}
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className="w-36 px-4 py-4 rounded-2xl border border-gray-600 bg-gray-800/80 text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer flex items-center justify-between"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <img src={selectedCountry.flagUrl} alt="" className="w-6 h-auto rounded-sm" />
                                                        <span>{selectedCountry.code}</span>
                                                    </span>
                                                    <svg
                                                        className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {isDropdownOpen && (
                                                    <div className="absolute top-full left-0 mt-2 w-44 bg-gray-800 border border-gray-600 rounded-2xl shadow-xl z-50 overflow-hidden">
                                                        {countryCodes.map((country) => (
                                                            <button
                                                                key={country.code}
                                                                type="button"
                                                                onClick={() => {
                                                                    setCountryCode(country.code);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700 transition-colors text-left ${countryCode === country.code ? 'bg-teal-900/50 text-teal-300' : 'text-white'
                                                                    }`}
                                                            >
                                                                <img src={country.flagUrl} alt="" className="w-6 h-auto rounded-sm" />
                                                                <span className="text-lg">{country.code}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <input
                                                type="tel"
                                                name="telefon"
                                                value={formData.telefon}
                                                onChange={(e) => {
                                                    const formatted = formatPhoneNumber(e.target.value);
                                                    setFormData(prev => ({ ...prev, telefon: formatted }));
                                                }}
                                                required
                                                maxLength={13}
                                                className="w-full px-5 py-4 rounded-2xl border border-gray-600 bg-gray-800/80 text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder:text-gray-500"
                                                placeholder="5XX XXX XX XX"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-base font-semibold text-gray-200 mb-3">
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-600 bg-gray-800/80 text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder:text-gray-500"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-base font-semibold text-gray-200 mb-3">
                                        Konu
                                    </label>
                                    <select
                                        name="konu"
                                        value={formData.konu}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-600 bg-gray-800/80 text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                                    >
                                        <option value="">Konu Seçin</option>
                                        <option value="Konut Projesi">Konut Projesi</option>
                                        <option value="Ticari Proje">Ticari Proje</option>
                                        <option value="Kentsel Dönüşüm">Kentsel Dönüşüm</option>
                                        <option value="Taahhüt İşleri">Taahhüt İşleri</option>
                                        <option value="Diğer">Diğer</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-base font-semibold text-gray-200 mb-3">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        name="mesaj"
                                        value={formData.mesaj}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-600 bg-gray-800/80 text-white text-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none placeholder:text-gray-500"
                                        placeholder="Projeniz hakkında bize bilgi verin..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    style={{
                                        width: '100%',
                                        padding: '22px 40px',
                                        background: isSubmitting
                                            ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)'
                                            : 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        letterSpacing: '0.5px',
                                        border: 'none',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        boxShadow: isSubmitting
                                            ? 'none'
                                            : '0 15px 40px rgba(13, 148, 136, 0.4)'
                                    }}
                                >
                                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
