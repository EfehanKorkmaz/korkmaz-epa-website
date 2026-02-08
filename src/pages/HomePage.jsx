import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoUzunBeyaz from '../assets/logo/uzun-beyaz-cizgili-logo.png';
import anasayfaArkaplan from '../assets/Resimler-optimized/anasayfaresim.webp';
import { useLanguage } from '../context/LanguageContext';

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const HomePage = () => {
    const { t } = useLanguage();

    const stats = [
        { label: "Years Experience", value: "25+" },
        { label: "Projects Completed", value: "150+" },
        { label: "Happy Clients", value: "100%" },
        { label: "Team Members", value: "40+" }
    ];

    const services = [
        {
            title: t('services.residential') || "Luxury Residential",
            desc: "Custom homes built with uncompromising quality and attention to detail.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            title: t('services.commercial') || "Commercial",
            desc: "State-of-the-art commercial spaces designed for business success.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            title: t('services.contracting') || "General Contracting",
            desc: "End-to-end project management ensuring on-time, on-budget delivery.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-white dark:bg-[#0a1929] min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
                    style={{ backgroundImage: `url(${anasayfaArkaplan})` }}
                >
                    <div className="absolute inset-0 bg-[#0a1929]/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center mt-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center max-w-4xl"
                    >
                        <motion.img
                            src={logoUzunBeyaz}
                            alt="Korkmaz EPA İnşaat"
                            variants={fadeInUp}
                            className="h-48 md:h-64 w-auto mb-8 drop-shadow-2xl opacity-90"
                        />

                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6"
                        >
                            Building <span className="text-gradient-gold">{t('home.slogan') || "Dreams"}</span>
                            <br /> With Precision
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed"
                        >
                            {t('home.description') || "We deliver high-end construction solutions with a focus on quality, innovation, and sustainability. Your vision is our blueprint."}
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <Link to="/projects">
                                <button className="btn-premium px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest shadow-2xl">
                                    {t('home.cta') || "Discover Our Work"}
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-[#0f172a] py-16 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4"
                            >
                                <h3 className="text-4xl md:text-5xl font-heading font-bold text-[#d4af37] mb-2">{stat.value}</h3>
                                <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTRODUCTION / ABOUT BRIEF */}
            <section className="py-24 bg-white dark:bg-[#0a1929]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[#d4af37] font-bold tracking-widest uppercase mb-4 text-sm">Who We Are</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Delivering Excellence in Every <span className="text-[#d4af37]">Structure</span>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                At Korkmaz EPA İnşaat, we combine decades of engineering expertise with modern architectural vision. From luxury residences to complex commercial infrastructures, our commitment to quality never wavers.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/about" className="text-[#0a1929] dark:text-white font-bold border-b-2 border-[#d4af37] pb-1 hover:text-[#d4af37] transition-colors">
                                    More About Us
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[#d4af37] rounded-3xl transform rotate-3 opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                                alt="Construction Site"
                                className="relative rounded-3xl shadow-2xl w-full object-cover h-[400px] grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section className="py-24 bg-gray-50 dark:bg-[#0f172a] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-[#d4af37] font-bold tracking-widest uppercase mb-4 text-sm">Where We Excel</h2>
                        <h3 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">Our Core Services</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-2 group"
                            >
                                <div className="w-16 h-16 bg-[#0a1929] dark:bg-[#0f172a] rounded-xl flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h4 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-4">{service.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
                                <Link to="/services" className="text-[#d4af37] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LATEST PROJECTS TEASER */}
            <section className="py-24 bg-white dark:bg-[#0a1929]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-8">Crafting Landmark Projects</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
                        Browse our portfolio to see how we turn ambitious visions into concrete reality.
                    </p>
                    <Link to="/projects">
                        <button className="border-2 border-[#0a1929] dark:border-white text-[#0a1929] dark:text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#0a1929] hover:text-white dark:hover:bg-white dark:hover:text-[#0a1929] transition-all duration-300">
                            View All Projects
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
