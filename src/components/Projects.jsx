import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data';

const Projects = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="projects" className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mb-4">
                        Portfolyomuz
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-teal-900 dark:text-white font-[family-name:var(--font-family-heading)] section-title">
                        Referanslarımız ve Tecrübelerimiz
                    </h2>
                    <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        Şirketimiz yeni kurulmuş olsa da, kurucu kadromuzun inşaat sektöründeki tecrübesiyle hayata geçirdiği projelerden bazıları...
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 shadow-lg hover:shadow-xl card-hover cursor-pointer backdrop-blur-sm"
                        >
                            {/* Image */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <span className="inline-block px-3 py-1 bg-teal-500 text-white text-sm font-semibold rounded-full w-fit mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)] mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {project.location}
                                    </p>

                                    {/* View Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium w-fit opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100"
                                    >
                                        Detayları Gör →
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-teal-900 dark:bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 dark:hover:bg-teal-600 transition-colors"
                    >
                        Tüm Referansları Görüntüle
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
