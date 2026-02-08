import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectModal from '../components/ProjectModal';
import cloudinaryData from '../cloudinaryData.json';
import { useLanguage } from '../context/LanguageContext';

// Cloudinary optimizeli URL oluştur
const getOptimizedUrl = (url, width = 800) => {
    if (!url) return '';
    return url.replace('/upload/', `/upload/f_webp,q_100,w_${width},c_fill/`);
};

// Proje ismi düzeltmeleri haritası
const projectNameFixes = {
    'Gökçe Nefes': 'Gökçe Nefes',
    'Gökçe Vital': 'Gökçe Vital',
    'Gökçe parla 2023': 'Gökçe Parla',
    'Gökçe yapı beosis iş merkezi 2021': 'Gökçe Beosis',
    'Hüseyin aslantürk KONUT 2022': 'Konut 2022',
};

// Featured proje klasör isimleri
const FEATURED_PROJECT_FOLDER = 'Gökçe Nefes';
const MAIN_PROJECT_FOLDERS = [
    'Gökçe Vital',
    'Gökçe parla 2023',
    'Gökçe yapı beosis iş merkezi 2021',
    'Hüseyin aslantürk KONUT 2022'
];

// Tüm projeleri işle
const allProjects = cloudinaryData.map((item, index) => ({
    id: index + 1,
    name: projectNameFixes[item.folder] || item.folder,
    folder: item.folder,
    folderPath: item.folderPath,
    coverImage: getOptimizedUrl(item.coverImage, 600),
    images: item.images,
    imageCount: item.imageCount
}));

// Featured proje
const featuredProject = allProjects.find(p => p.folder === FEATURED_PROJECT_FOLDER);

// Ana projeler
const mainProjects = MAIN_PROJECT_FOLDERS.map(folder =>
    allProjects.find(p => p.folder === folder)
).filter(Boolean);

const ProjectsPage = () => {
    const { t, translateProjectName } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Mobil cihaz kontrolü
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#042f2e' }}>
            {/* Hero Section - Title Only */}
            <section
                style={{
                    paddingTop: '160px',
                    paddingBottom: '40px',
                    background: 'linear-gradient(to bottom, #0f766e, #042f2e)'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 'bold',
                            letterSpacing: '0.025em',
                            color: 'white',
                            marginBottom: '16px',
                            fontFamily: 'var(--font-family-heading)'
                        }}
                    >
                        {t('projects.title')}
                    </h1>
                    <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
                        {t('projects.subtitle')}
                    </p>
                </div>
            </section>

            {/* Devam Eden Projemiz - Featured Project */}
            {featuredProject && (
                <section style={{ padding: '40px 0 60px 0' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '24px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-family-heading)'
                        }}
                        >
                            {t('projects.ongoingProject')}
                        </h2>

                        <motion.div
                            onClick={() => setSelectedProject(featuredProject)}
                            style={{ cursor: 'pointer' }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '20px',
                                backgroundColor: '#115e59',
                                aspectRatio: isMobile ? '16/10' : '21/9',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <img
                                    src={getOptimizedUrl(featuredProject.coverImage, 1200)}
                                    alt={featuredProject.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    loading="eager"
                                />

                                {/* Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(10, 25, 41, 0.9), rgba(10, 25, 41, 0.2), transparent)',
                                    opacity: 0.8
                                }} />

                                {/* Content */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: isMobile ? '24px' : '40px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: isMobile ? 'center' : 'flex-start'
                                }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 20px',
                                        backgroundColor: '#14b8a6',
                                        color: '#042f2e',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        borderRadius: '50px',
                                        marginBottom: '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        <span style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: '#042f2e',
                                            animation: 'pulse 2s infinite'
                                        }}></span>
                                        {t('projects.ongoing')}
                                    </span>
                                    <h3 style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: isMobile ? '1.75rem' : '2.5rem',
                                        textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontFamily: 'var(--font-family-heading)'
                                    }}>
                                        {translateProjectName(featuredProject.name)}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Başlıca Projelerimiz - Main Projects */}
            <section style={{ padding: '40px 0 60px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '32px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-family-heading)'
                    }}>
                        {t('projects.mainProjects')}
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: isMobile ? '20px' : '32px'
                    }}>
                        {mainProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    ease: 'easeOut'
                                }}
                                onClick={() => setSelectedProject(project)}
                                style={{ cursor: 'pointer' }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '16px',
                                    backgroundColor: '#115e59',
                                    aspectRatio: '16/10',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <img
                                        src={project.coverImage}
                                        alt={project.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 300ms'
                                        }}
                                        loading="eager"
                                    />

                                    {/* Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(10, 25, 41, 0.9), rgba(10, 25, 41, 0.3), transparent)',
                                        opacity: 0.7
                                    }} />

                                    {/* Content */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <h3 style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                            textTransform: 'uppercase',
                                            fontFamily: 'var(--font-family-heading)'
                                        }}>
                                            {translateProjectName(project.name)}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diğer Projelerimiz Butonu */}
            <section style={{ padding: '40px 0 100px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                    <Link
                        to="/projects/all"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '18px 48px',
                            background: 'linear-gradient(135deg, #14b8a6 0%, #aa8c2c 100%)',
                            color: '#042f2e',
                            fontSize: '1.125rem',
                            fontWeight: '800',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            boxShadow: '0 10px 40px -10px rgba(212, 175, 55, 0.4)',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 20px 50px -10px rgba(212, 175, 55, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(212, 175, 55, 0.4)';
                        }}
                    >
                        {t('projects.otherProjects')}
                        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            {/* Pulse Animation CSS */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;

