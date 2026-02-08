import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { features, stats } from '../data';
import kurumsalResim from '../assets/Resimler-optimized/Kurumsal-resim.webp';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Feature key mapping (from data.jsx order)
    const featureKeys = ['quality', 'onTime', 'safety', 'satisfaction'];

    return (
        <div className="min-h-screen bg-[#0a1929] transition-colors duration-300">
            {/* Hero Section */}
            <section
                className="pb-16 lg:pb-24 bg-gradient-to-b from-[#0f172a] to-[#0a1929]"
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
                        {t('about.pageTitle')}
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
                        {t('about.pageDescription')}
                    </motion.p>
                </div>
            </section>

            {/* Smooth transition gradient */}
            <div
                className="h-24 -mt-12 relative z-10"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 25, 41, 0.5) 50%, transparent 100%)'
                }}
            />

            {/* About Content */}
            <section className="py-24 -mt-12">
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}>
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={kurumsalResim}
                                    alt="Modern şantiye"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/80 to-transparent" />
                            </div>
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-[#d4af37] rounded-2xl -z-10" />
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {t('about.paragraph1')}
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed" style={{ marginBottom: '80px' }}>
                                {t('about.paragraph2')}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4" style={{ marginTop: '40px' }}>
                                {features.map((feature, index) => {
                                    const featureKey = featureKeys[index];
                                    return (
                                        <div
                                            key={featureKey}
                                            className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/5 shadow-lg hover:shadow-xl hover:border-[#d4af37]/50 hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <span className="text-3xl text-[#d4af37]">{feature.icon}</span>
                                            <div>
                                                <p className="font-bold text-lg text-white mb-1">
                                                    {t(`features.${featureKey}`)}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {t(`features.${featureKey}Desc`)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Smooth transition to stats */}
            <div
                className="h-32 relative"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.5) 50%, rgba(15, 23, 42, 1) 100%)'
                }}
            />

            {/* Stats Section */}
            <section ref={ref} className="py-24 bg-[#0f172a] -mt-32" style={{ paddingBottom: '120px' }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        style={{ textAlign: 'center', marginBottom: '48px', width: '100%' }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-white font-[family-name:var(--font-family-heading)] mb-4">
                            {t('about.statsTitle')} <span className="text-[#d4af37]">Korkmaz EPA</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
                        {stats.map((stat, index) => {
                            const statKeys = ['projects', 'customers', 'employees', 'active'];
                            const statKey = statKeys[index];
                            return (
                                <motion.div
                                    key={statKey}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '20px',
                                        padding: '32px',
                                        textAlign: 'center',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    whileHover={{ scale: 1.05, y: -5, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                                >
                                    <span style={{ fontSize: '2.5rem', marginBottom: '12px', display: 'block', color: '#d4af37' }}>{stat.icon}</span>
                                    <div style={{
                                        fontSize: '3rem',
                                        fontWeight: '800',
                                        color: 'white',
                                        marginBottom: '8px',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                                    }}>
                                        {stat.number}{stat.suffix}
                                    </div>
                                    <p style={{ color: '#9ca3af', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t(`stats.${statKey}`)}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
