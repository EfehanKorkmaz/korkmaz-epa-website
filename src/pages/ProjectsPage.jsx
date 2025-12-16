import { motion } from 'framer-motion';

// Import transparent construction scene illustration
import constructionScene from '../assets/Resmimiz.png';

const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 transition-colors duration-300 overflow-hidden">
            {/* Hero Section */}
            <section
                className="pb-4 lg:pb-6 bg-gradient-to-b from-gray-800 to-gray-900"
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
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white font-[family-name:var(--font-family-heading)] mb-4"
                    >
                        Referanslarımız ve Tecrübelerimiz
                    </motion.h1>

                    {/* Warning Tape */}
                    <div className="relative w-full max-w-4xl overflow-hidden mt-2 mb-12">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            className="absolute inset-0 flex items-center"
                        >
                            <div className="flex whitespace-nowrap">
                                {[...Array(10)].map((_, i) => (
                                    <span key={i} className="mx-4 text-yellow-400 font-bold text-sm tracking-widest">
                                        ⚠️ YAPIM AŞAMASINDA ⚠️ UNDER CONSTRUCTION ⚠️
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <div
                            className="h-8 w-full"
                            style={{
                                background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 20px, #111827 20px, #111827 40px)',
                                opacity: 0.3
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Under Construction Section */}
            <section className="py-8 lg:py-12 flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">

                    {/* Main Construction Scene Illustration - Centered */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-8 mt-8 flex justify-center w-full"
                    >
                        <motion.div
                            className="overflow-hidden"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img
                                src={constructionScene}
                                alt="İnşaat Sahnesi - Yapım Aşamasında"
                                className="w-full max-w-md lg:max-w-lg object-contain"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Main Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-gray-800/50 backdrop-blur-sm border border-teal-500/30 rounded-3xl p-8 lg:p-10 mb-8 w-full max-w-2xl"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-[family-name:var(--font-family-heading)]">
                            🚧 Bu Sayfa Yapım Aşamasında
                        </h2>

                        <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                            Referanslarımız ve projelerimiz yakında burada yayınlanacak.
                            Kurucu kadromuzun yılların deneyimiyle hayata geçirdiği projeleri sizlerle paylaşmak için çalışıyoruz.
                        </p>

                        {/* Progress Bar */}
                        <div className="max-w-md mx-auto mb-6">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>İçerik Hazırlığı</span>
                                <span>Yakında...</span>
                            </div>
                            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '65%' }}
                                    transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        <p className="text-teal-400 text-sm font-medium">
                            ✨ Çok yakında hazır olacak!
                        </p>
                    </motion.div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <p className="text-gray-500 mb-4">
                            Projelerimiz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-full hover:from-teal-500 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            İletişime Geçin
                        </a>
                    </motion.div>

                    {/* Bottom Warning Tape */}
                    <div className="relative mt-12 overflow-hidden w-full">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: '-100%' }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            className="absolute inset-0 flex items-center"
                        >
                            <div className="flex whitespace-nowrap">
                                {[...Array(10)].map((_, i) => (
                                    <span key={i} className="mx-4 text-yellow-400 font-bold text-sm tracking-widest">
                                        🔨 TECRÜBELERİMİZ YAKINDA 🔨 ÇOK YAKINDA 🔨
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <div
                            className="h-8 w-full"
                            style={{
                                background: 'repeating-linear-gradient(-45deg, #f59e0b, #f59e0b 20px, #111827 20px, #111827 40px)',
                                opacity: 0.3
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;
