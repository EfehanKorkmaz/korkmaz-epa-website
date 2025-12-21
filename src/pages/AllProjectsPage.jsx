import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectModal from '../components/ProjectModal';
import cloudinaryData from '../cloudinaryData.json';
import { useLanguage } from '../context/LanguageContext';

// Sayfa başına proje sayısı
const PROJECTS_PER_PAGE = 6;

// Cloudinary optimizeli URL oluştur
const getOptimizedUrl = (url, width = 600) => {
    if (!url) return '';
    return url.replace('/upload/', `/upload/f_webp,q_100,w_${width},c_fill/`);
};

// Kategori düzeltmeleri haritası (folder -> category)
const categoryOverrides = {
    'Gökçe Nefes': 'Konut',
    'Gökçe Vital': 'Konut',
    'Gökçe parla 2023': 'Konut',
    'Gökçe yapı beosis iş merkezi 2021': 'Ticari',
};

// Kategori eşleştirme fonksiyonu
const getCategory = (folderName) => {
    // Önce override kontrolü
    if (categoryOverrides[folderName]) {
        return categoryOverrides[folderName];
    }

    const name = folderName.toLowerCase();

    if (name.includes('çatı') || name.includes('cati')) return 'Çatı Sistemleri';
    if (name.includes('konut') || name.includes('villa')) return 'Konut';
    if (name.includes('belediye') || name.includes('mezarlık') || name.includes('muhtarlık')) return 'Kamu';
    if (name.includes('fabrika') || name.includes('gosb') || name.includes('liman') || name.includes('kantar')) return 'Endüstriyel';
    if (name.includes('iş merkezi') || name.includes('taksi')) return 'Ticari';
    if (name.includes('prefabrik') || name.includes('prabrik')) return 'Prefabrik';
    if (name.includes('güçlendirme') || name.includes('tadilat')) return 'Güçlendirme';
    if (name.includes('beton') || name.includes('istinat') || name.includes('kayrak') || name.includes('kalıpçı')) return 'Betonarme';
    if (name.includes('basket')) return 'Spor Tesisleri';

    return 'Diğer';
};

// Proje ismi düzeltmeleri haritası
const projectNameFixes = {
    'aslantürk makine fabrika bekçi kulübesi': 'Fabrika Bekçi Kulübesi',
    'Marina Bayramoğluu Yat Limanı 2021': 'Marina Bayramoğlu Yat Limanı 2021',
    'dilovası prabrik yeri': 'Dilovası Prefabrik Altyapı',
    'Dilek hanım çatı': 'Çatı Bakımı ve Onarımı',
    'Eren çatı': 'Çatı Tadilatı ve Membran',
    'Şule hanım çatı BAYRAMOĞLU 2021': 'Çatı Çalışması 3 Bayramoğlu 2021',
    'Hüseyin aslantürk KONUT 2022': 'Konut 2022',
    'Hakan Şahin Konut': 'Darıca Konut',
    'Hacıoğulları Küçükyalı Geçici Beton Santrali Betonarme İşleri': 'Küçükyalı Beton Santrali',
    'GÖZDE KONUT 2021': 'Osmangazi Konut 2021',
    'Mehmet Bey Villa Çevre Düzenleme Bayramoğlu 2022': 'Villa Çevre Düzenleme Bayramoğlu 2022',
    'OSMAN SAYILI İŞ MERKEZİ BİNASI OSMANGAZİ 2016': 'İş Merkezi Binası Osmangazi 2016',
    'Ömer Atıcı Konut 2021': 'Atıcı Konut 2021',
    'Yusuf aka çatı kat 2021': 'Eskihisar Çatı ve Tadilat 2021',
    'Yusuf Destek 2022': 'Bayramoğlu Villa 2022',
};

// Cloudinary verilerini projelere dönüştür
const projects = cloudinaryData.map((item, index) => ({
    id: index + 1,
    name: projectNameFixes[item.folder] || item.folder,
    folder: item.folder,
    folderPath: item.folderPath,
    coverImage: getOptimizedUrl(item.coverImage, 400),
    images: item.images,
    imageCount: item.imageCount,
    category: getCategory(item.folder)
}));

const AllProjectsPage = () => {
    const { t, translateCategory, translateProjectName } = useLanguage();
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('Tümü');
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1);
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const gridRef = useRef(null);

    // Mobil cihaz kontrolü
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Benzersiz kategorileri al
    const categories = useMemo(() => {
        const cats = ['Tümü', ...new Set(projects.map(p => p.category))];
        return cats.sort((a, b) => {
            if (a === 'Tümü') return -1;
            if (b === 'Tümü') return 1;
            return a.localeCompare(b, 'tr');
        });
    }, []);

    // Filtrelenmiş projeler
    const filteredProjects = useMemo(() => {
        return filter === 'Tümü'
            ? projects
            : projects.filter(p => p.category === filter);
    }, [filter]);

    // Toplam sayfa sayısı
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

    // Mevcut sayfadaki projeler
    const currentProjects = useMemo(() => {
        const start = currentPage * PROJECTS_PER_PAGE;
        return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    // Grid bölgesi görünürlüğünü takip et
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsGridVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Ön yükleme
    useEffect(() => {
        const allCovers = filteredProjects.map(p => p.coverImage);
        allCovers.forEach(url => {
            if (!preloadedImages.has(url)) {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    setPreloadedImages(prev => new Set([...prev, url]));
                };
            }
        });
    }, [filteredProjects]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(0);
    };

    const goToPage = (page, direction = 1) => {
        if (page >= 0 && page < totalPages) {
            setSlideDirection(direction);
            setCurrentPage(page);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#111827' }}>
            {/* Hero Section */}
            <section
                style={{
                    paddingTop: '160px',
                    paddingBottom: '48px',
                    background: 'linear-gradient(to bottom, #1f2937, #111827)'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
                    <h1
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 'bold',
                            letterSpacing: '0.025em',
                            color: 'white',
                            marginBottom: '16px'
                        }}
                    >
                        {t('projects.allProjectsTitle')}
                    </h1>
                    <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', marginBottom: '24px' }}>
                        {t('projects.subtitle')}
                    </p>
                    <Link
                        to="/projects"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#14b8a6',
                            fontSize: '14px',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}
                    >
                        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('projects.backToMain')}
                    </Link>
                </div>
            </section>

            {/* Filter Buttons */}
            <section style={{ padding: '32px 0 48px 0', backgroundColor: '#111827' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleFilterChange(category)}
                                style={{
                                    padding: isMobile ? '10px 16px' : '12px 24px',
                                    borderRadius: '12px',
                                    fontSize: isMobile ? '12px' : '14px',
                                    fontWeight: '600',
                                    transition: 'all 150ms',
                                    minWidth: isMobile ? '90px' : '120px',
                                    cursor: 'pointer',
                                    border: filter === category ? 'none' : '1px solid #374151',
                                    background: filter === category
                                        ? 'linear-gradient(to right, #14b8a6, #0d9488)'
                                        : '#1f2937',
                                    color: filter === category ? 'white' : '#d1d5db',
                                    boxShadow: filter === category ? '0 10px 25px -5px rgba(20, 184, 166, 0.3)' : 'none'
                                }}
                                onMouseOver={(e) => {
                                    if (filter !== category) {
                                        e.target.style.backgroundColor = '#374151';
                                        e.target.style.color = 'white';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (filter !== category) {
                                        e.target.style.backgroundColor = '#1f2937';
                                        e.target.style.color = '#d1d5db';
                                    }
                                }}
                            >
                                {category === 'Tümü' ? t('projects.all') : translateCategory(category)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fixed Navigation Arrows */}
            <AnimatePresence>
                {!isMobile && isGridVisible && currentPage > 0 && (
                    <motion.button
                        key="left-arrow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={() => goToPage(currentPage - 1, -1)}
                        style={{
                            position: 'fixed',
                            left: '24px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 40,
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'rgba(31, 41, 55, 0.9)',
                            color: 'white',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(8px)'
                        }}
                        whileHover={{
                            backgroundColor: '#14b8a6',
                            scale: 1.1
                        }}
                    >
                        <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                )}

                {!isMobile && isGridVisible && currentPage < totalPages - 1 && (
                    <motion.button
                        key="right-arrow"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={() => goToPage(currentPage + 1, 1)}
                        style={{
                            position: 'fixed',
                            right: '24px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 40,
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'rgba(31, 41, 55, 0.9)',
                            color: 'white',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(8px)'
                        }}
                        whileHover={{
                            backgroundColor: '#14b8a6',
                            scale: 1.1
                        }}
                    >
                        <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Projects Grid */}
            <section style={{ padding: '48px 0 96px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div ref={gridRef} style={{ flex: 1, overflow: 'hidden' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: slideDirection * 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: slideDirection * -100 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                    gap: isMobile ? '20px' : '32px',
                                    willChange: 'transform, opacity'
                                }}
                            >
                                {currentProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                            ease: 'easeOut'
                                        }}
                                        onClick={() => setSelectedProject(project)}
                                        style={{
                                            cursor: 'pointer',
                                            willChange: 'transform, opacity',
                                            transform: 'translateZ(0)'
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: '16px',
                                            backgroundColor: '#1f2937',
                                            aspectRatio: '16/10',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                        }}>
                                            <img
                                                src={project.coverImage}
                                                alt={project.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 200ms'
                                                }}
                                                loading="eager"
                                                decoding="async"
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent)',
                                                opacity: 0.7
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                padding: '24px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '6px 16px',
                                                    backgroundColor: 'rgba(20, 184, 166, 0.9)',
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    borderRadius: '50px',
                                                    marginBottom: '12px',
                                                    width: 'fit-content'
                                                }}>
                                                    {translateCategory(project.category)}
                                                </span>
                                                <h3 style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.25rem',
                                                    marginBottom: '4px',
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {translateProjectName(project.name)}
                                                </h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToPage(idx)}
                                    style={{
                                        height: '12px',
                                        width: idx === currentPage ? '40px' : '12px',
                                        borderRadius: '50px',
                                        transition: 'all 100ms',
                                        backgroundColor: idx === currentPage ? '#14b8a6' : '#4b5563',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => {
                                        if (idx !== currentPage) {
                                            e.target.style.backgroundColor = '#6b7280';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (idx !== currentPage) {
                                            e.target.style.backgroundColor = '#4b5563';
                                        }
                                    }}
                                />
                            ))}
                        </div>

                        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                            {t('projects.page')} <span style={{ color: '#2dd4bf', fontWeight: 'bold' }}>{currentPage + 1}</span> / {totalPages}
                            <span style={{ margin: '0 12px', color: '#374151' }}>•</span>
                            {t('projects.total')} <span style={{ color: '#2dd4bf', fontWeight: 'bold' }}>{filteredProjects.length}</span> {t('projects.project')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default AllProjectsPage;
