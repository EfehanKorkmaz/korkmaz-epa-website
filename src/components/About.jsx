import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { features } from '../data';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="about" className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Image Side */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Modern şantiye"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent" />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-teal-500 rounded-2xl -z-10" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-block px-4 py-1.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mb-4">
                            {t('about.title')}
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-teal-900 dark:text-white font-[family-name:var(--font-family-heading)] mb-6">
                            {t('about.subtitle').split(' ').slice(0, 3).join(' ')}
                            <span className="gradient-text"> {t('about.subtitle').split(' ').slice(3).join(' ')}</span>
                        </h2>

                        <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 space-y-4">
                            <p>{t('about.paragraph1')}</p>
                            <p>{t('about.paragraph2')}</p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {features.map((feature) => (
                                <motion.div
                                    key={feature.title}
                                    variants={itemVariants}
                                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-600 transition-all card-hover"
                                >
                                    <span className="text-2xl">{feature.icon}</span>
                                    <div>
                                        <p className="font-semibold text-teal-900 dark:text-white">
                                            {/* Feature başlıkları ve açıklamaları buraya eklenebilir, 
                                                ancak şu an features dizisi data.js'den geliyor. 
                                                Gerekirse features için de çeviri eklenebilir. */}
                                            {feature.title}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            href="#services"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-900 dark:bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 dark:hover:bg-teal-600 transition-colors"
                        >
                            {t('nav.services')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
