import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoBeyaz from '../assets/logo/kisa-beyaz-cizgili-logo.png';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();

    const menuItems = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.projects'), path: '/projects' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isHome = location.pathname === '/';
    const showTransparent = isHome && !isScrolled;

    const getNavbarClass = () => {
        if (showTransparent) {
            return 'bg-transparent py-6';
        }
        return 'bg-[#042f2e]/95 backdrop-blur-lg shadow-xl py-4 border-b border-white/5';
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarClass()}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* LEFT: Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src={logoBeyaz}
                                alt="Korkmaz EPA İnşaat"
                                className="h-10 lg:h-12 w-auto transition-transform duration-300 hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* CENTER: Navigation Links - Desktop Only */}
                    <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-8 xl:gap-12">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative group py-2"
                                >
                                    <span className={`text-[0.95rem] tracking-wide font-medium transition-colors duration-300 ${location.pathname === item.path
                                        ? 'text-[#14b8a6]'
                                        : 'text-gray-300 group-hover:text-white'
                                        }`}>
                                        {item.name}
                                    </span>
                                    {/* Elegant Underline Effect */}
                                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#14b8a6] transform origin-left transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Language Toggle + CTA Button */}
                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#14b8a6]/50 hover:bg-[#14b8a6]/10 transition-all duration-300"
                            title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
                        >
                            <span className="text-xl filter drop-shadow-md">{language === 'tr' ? '🇹🇷' : '🇺🇸'}</span>
                            <span className="text-xs font-semibold text-gray-300 tracking-wider">
                                {language === 'tr' ? 'TR' : 'EN'}
                            </span>
                        </button>

                        <Link to="/contact" className="hidden lg:block">
                            <button className="btn-premium px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase">
                                {t('nav.getQuote')}
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menü"
                        >
                            <div className="flex flex-col justify-center items-center w-6 gap-1.5">
                                <span className={`block w-6 h-[2px] bg-[#14b8a6] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`block w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-6 h-[2px] bg-[#14b8a6] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden bg-[#042f2e] border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`block py-3 text-lg font-heading tracking-wide border-l-2 pl-4 transition-all ${location.pathname === item.path
                                        ? 'border-[#14b8a6] text-[#14b8a6] bg-white/5'
                                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-6 mt-6 border-t border-white/10">
                                <Link to="/contact">
                                    <button className="w-full btn-premium py-4 rounded-xl font-bold uppercase tracking-widest">
                                        {t('nav.getQuote')}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
