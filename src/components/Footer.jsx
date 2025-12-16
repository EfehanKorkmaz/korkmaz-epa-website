import { Link } from 'react-router-dom';
import { quickLinks, footerServices, socialLinks, contactInfo } from '../data';

const Footer = () => {
    return (
        <footer className="bg-gray-900 dark:bg-black text-white relative">
            {/* CTA Section with animated gradient */}
            <div
                className="relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 25%, #0f766e 50%, #14b8a6 75%, #0d9488 100%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 8s ease infinite'
                }}
            >
                {/* Animated glow effect */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 50%, rgba(45, 212, 191, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
                        animation: 'pulseGlow 4s ease-in-out infinite alternate'
                    }}
                />
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '48px',
                    paddingBottom: '48px'
                }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl w-full">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-family-heading)]">
                                Projeniz İçin Hazır Mısınız?
                            </h3>
                            <p className="text-teal-100 mt-2">
                                Hayalinizdeki yapıyı birlikte inşa edelim.
                            </p>
                        </div>
                        <a
                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                            style={{
                                padding: '20px 48px',
                                background: 'white',
                                color: '#0f766e',
                                borderRadius: '16px',
                                fontWeight: '800',
                                fontSize: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
                            }}
                        >
                            <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Hemen Arayın
                        </a>
                    </div>
                </div>
            </div>

            {/* Smooth transition from CTA to Footer with Dry Ice Effect */}
            <div
                className="h-24 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(to bottom, rgba(13, 148, 136, 0.3) 0%, transparent 100%)'
                }}
            >
                {/* Dry Ice Particle 1 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '2%',
                        width: '300px',
                        height: '5px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                        filter: 'blur(3px)',
                        animation: 'dryIce1 6s ease-in-out infinite'
                    }}
                />
                {/* Dry Ice Particle 2 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15%',
                        width: '350px',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                        filter: 'blur(2px)',
                        animation: 'dryIce2 7s ease-in-out infinite'
                    }}
                />
                {/* Dry Ice Particle 3 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '30%',
                        width: '280px',
                        height: '6px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                        filter: 'blur(4px)',
                        animation: 'dryIce3 5s ease-in-out infinite'
                    }}
                />
                {/* Dry Ice Particle 4 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '12px',
                        left: '48%',
                        width: '400px',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.55) 50%, transparent 100%)',
                        filter: 'blur(3px)',
                        animation: 'dryIce4 8s ease-in-out infinite'
                    }}
                />
                {/* Dry Ice Particle 5 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '6px',
                        left: '65%',
                        width: '320px',
                        height: '5px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.65) 50%, transparent 100%)',
                        filter: 'blur(3px)',
                        animation: 'dryIce5 6.5s ease-in-out infinite'
                    }}
                />
                {/* Dry Ice Particle 6 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '18px',
                        left: '82%',
                        width: '350px',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                        filter: 'blur(2px)',
                        animation: 'dryIce6 7.5s ease-in-out infinite'
                    }}
                />
            </div>

            {/* Main Footer */}
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '32px',
                paddingBottom: '64px'
            }}>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl w-full">
                    {/* Company Info */}
                    <div>
                        <div className="mb-6">
                            <h4 className="text-xl font-bold font-[family-name:var(--font-family-heading)] text-white mb-2">
                                {contactInfo.company}
                            </h4>
                            <p className="text-teal-400 text-sm">
                                {contactInfo.companyFull}
                            </p>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Kaliteli işçilik ve güvenilir hizmet anlayışıyla modern yaşam alanları inşa ediyoruz.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 bg-white/10 hover:bg-teal-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold font-[family-name:var(--font-family-heading)] mb-6">
                            Hızlı Linkler
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold font-[family-name:var(--font-family-heading)] mb-6">
                            Hizmetlerimiz
                        </h4>
                        <ul className="space-y-3">
                            {footerServices.map((service) => (
                                <li key={service}>
                                    <Link
                                        to="/services"
                                        className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold font-[family-name:var(--font-family-heading)] mb-6">
                            İletişim
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-teal-400 transition-colors">
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-teal-400 transition-colors">
                                    {contactInfo.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '24px',
                    paddingBottom: '24px'
                }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl w-full">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © 2025 Korkmaz İnşaat. Tüm Hakları Saklıdır.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-teal-400 transition-colors">Gizlilik Politikası</a>
                            <a href="#" className="hover:text-teal-400 transition-colors">Kullanım Şartları</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
