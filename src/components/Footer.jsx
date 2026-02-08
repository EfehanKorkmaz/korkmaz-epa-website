import { Link } from 'react-router-dom';
import { socialLinks, contactInfo } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    const quickLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.projects'), path: '/projects' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const footerServices = [
        t('services.residential'),
        t('services.commercial'),
        t('services.urbanRenewal'),
        t('services.contracting'),
        t('services.renovation'),
        t('services.roofing'),
    ];

    return (
        <footer className="bg-[#0f766e] text-white relative border-t border-white/5">
            {/* CTA Section */}
            <div className="relative overflow-hidden bg-[#042f2e]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#115e59] to-[#0f766e] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-4xl font-bold font-heading text-white mb-2">
                                {t('footer.cta')}
                            </h3>
                            <p className="text-gray-400 text-lg">
                                {t('footer.ctaSubtitle')}
                            </p>
                        </div>
                        <a
                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                            className="bg-[#14b8a6] hover:bg-[#0d9488] text-[#042f2e] px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-gold-500/20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {t('footer.callNow')}
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Company Info */}
                    <div>
                        <h4 className="text-2xl font-bold font-heading text-white mb-6">
                            {t('contact.companyName')}
                        </h4>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            {t('footer.companyDesc')}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#14b8a6] hover:border-[#14b8a6] transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold font-heading text-[#14b8a6] mb-6">
                            {t('footer.quickLinks')}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#14b8a6] transition-colors"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold font-heading text-[#14b8a6] mb-6">
                            {t('footer.ourServices')}
                        </h4>
                        <ul className="space-y-3">
                            {footerServices.map((service) => (
                                <li key={service}>
                                    <Link
                                        to="/services"
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#14b8a6] transition-colors"></span>
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold font-heading text-[#14b8a6] mb-6">
                            {t('footer.contact')}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{t('contact.fullAddress')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <svg className="w-5 h-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                                    {contactInfo.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        {t('footer.allRights')}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-[#14b8a6] transition-colors">{t('footer.privacy')}</a>
                        <a href="#" className="hover:text-[#14b8a6] transition-colors">{t('footer.terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
