import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoUzunBeyaz from '../assets/logo/uzun-beyaz-cizgili-logo.png';
import anasayfaArkaplan from '../assets/Resimler-optimized/anasayfaresim.webp';

const HomePage = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${anasayfaArkaplan})`
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center w-full"
                    style={{ marginTop: '-60px' }}
                >
                    {/* Logo */}
                    <motion.img
                        src={logoUzunBeyaz}
                        alt="Korkmaz EPA İnşaat"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        style={{ height: '380px', width: 'auto', marginBottom: '-40px' }}
                    />

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(1.875rem, 5vw, 3.75rem)',
                            fontWeight: '700',
                            color: 'white',
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}
                        className="font-[family-name:var(--font-family-heading)]"
                    >
                        "Size yeni bir dünya inşa ediyoruz."
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                            color: '#d1d5db',
                            maxWidth: '42rem',
                            marginBottom: '12px',
                            textAlign: 'center',
                            lineHeight: '1.75'
                        }}
                    >
                        Kalite, güven ve yenilikçi yaklaşımlarla hayallerinizi gerçeğe dönüştürüyoruz.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{ marginTop: '0px' }}
                    >
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.08, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 25%, #0f766e 50%, #2dd4bf 75%, #0d9488 100%)',
                                    backgroundSize: '400% 400%',
                                    animation: 'gradientShift 6s ease infinite',
                                    padding: '24px 56px',
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: 'white',
                                    borderRadius: '20px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 40px rgba(13, 148, 136, 0.4)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span>İletişime Geçin</span>
                                    <motion.svg
                                        style={{ width: '24px', height: '24px' }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        animate={{ x: [0, 6, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomePage;
