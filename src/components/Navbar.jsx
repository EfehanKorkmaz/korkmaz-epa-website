import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoBeyaz from '../assets/logo/kisa-beyaz-cizgili-logo.png';
import { menuItems } from '../data';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

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

    // Determine navbar background based on scroll and page
    const getNavbarClass = () => {
        if (showTransparent) {
            // On home page, not scrolled - semi-transparent dark
            return 'bg-black/30 backdrop-blur-md py-4';
        }
        // Scrolled or other pages - solid dark background
        return 'bg-gray-900/95 backdrop-blur-lg shadow-lg py-3';
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarClass()}`}
        >
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex justify-between items-center">
                    {/* LEFT: Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src={logoBeyaz}
                                alt="Korkmaz EPA İnşaat"
                                className="h-12 w-auto transition-all duration-300"
                            />
                        </Link>
                    </div>

                    {/* CENTER: Navigation Links - Desktop Only */}
                    <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-10">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`text-base font-medium transition-all duration-300 ${location.pathname === item.path
                                        ? 'text-teal-400'
                                        : 'text-gray-300 hover:text-teal-300'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: CTA Button */}
                    <div className="flex items-center gap-4">

                        <Link to="/contact" className="hidden lg:block">
                            <motion.button
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 25%, #0f766e 50%, #2dd4bf 75%, #0d9488 100%)',
                                    backgroundSize: '400% 400%',
                                    animation: 'gradientShift 6s ease infinite',
                                    padding: '12px 28px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: 'white',
                                    borderRadius: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 25px rgba(13, 148, 136, 0.35)',
                                    letterSpacing: '0.02em'
                                }}
                            >
                                Teklif Al
                            </motion.button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menü"
                        >
                            <div className="flex flex-col justify-center items-center w-6 h-5">
                                <span className={`block w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`block w-6 h-0.5 rounded-full bg-white my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                                <span className={`block w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-gray-900 mt-2 mx-4 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
                    >
                        <div className="p-4">
                            <ul className="space-y-1">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className={`block py-3 px-4 rounded-xl font-medium text-base transition-colors ${location.pathname === item.path
                                                ? 'bg-teal-900/30 text-teal-400'
                                                : 'text-gray-300 hover:bg-gray-800'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <Link
                                    to="/contact"
                                    className="block py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-center transition-colors"
                                >
                                    Teklif Al
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
