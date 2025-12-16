import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../data';

const Services = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="services" className="py-24 lg:py-32 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mb-4">
                        Hizmetlerimiz
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-teal-900 dark:text-white font-[family-name:var(--font-family-heading)] section-title">
                        Faaliyet ve Uzmanlık Alanlarımız
                    </h2>
                    <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Kapsamlı hizmet yelpazemizle inşaat sektöründeki tüm ihtiyaçlarınıza profesyonel çözümler sunuyoruz.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-teal-200 dark:hover:border-teal-600 card-hover min-h-[380px] flex flex-col"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 rounded-2xl flex items-center justify-center text-teal-700 dark:text-teal-400 mb-6 group-hover:from-teal-100 group-hover:to-teal-200 dark:group-hover:from-teal-800/50 dark:group-hover:to-teal-700/50 transition-all duration-300">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-teal-900 dark:text-white font-[family-name:var(--font-family-heading)] mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Link */}
                            <div className="mt-auto pt-4">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center text-teal-700 dark:text-teal-400 font-semibold group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors"
                                >
                                    Detaylı Bilgi
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500/0 to-teal-500/5 rounded-bl-[100px] rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
