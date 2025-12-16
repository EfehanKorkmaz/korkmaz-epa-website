import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../data';

const ServicesPage = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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
                        Faaliyet ve Uzmanlık Alanlarımız
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
                        Kapsamlı hizmet yelpazemizle inşaat sektöründeki tüm ihtiyaçlarınıza profesyonel çözümler sunuyoruz.
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

            {/* Services Grid */}
            <section ref={ref} className="py-24 -mt-10" style={{ paddingBottom: '120px' }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-teal-600 flex flex-col card-hover"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-60" />
                                    {/* Icon overlay */}
                                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-teal-600/90 rounded-xl flex items-center justify-center text-white shadow-lg">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-family-heading)] mb-3 group-hover:text-teal-400 transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2 mt-auto">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-gray-400">
                                                <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
