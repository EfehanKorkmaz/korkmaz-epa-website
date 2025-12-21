import { useState, useMemo, useEffect, useRef } from 'react';
import ProjectModal from '../components/ProjectModal';
import cloudinaryData from '../cloudinaryData.json';

// Sayfa başına proje sayısı
const PROJECTS_PER_PAGE = 6;

// Cloudinary optimizeli URL oluştur - küçük boyut için
const getOptimizedUrl = (url, width = 600) => {
    if (!url) return '';
    // /upload/ sonrasına boyut parametreleri ekle
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_fill/`);
};

// Kategori eşleştirme fonksiyonu
const getCategory = (folderName) => {
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

// Cloudinary verilerini projelere dönüştür
const projects = cloudinaryData.map((item, index) => ({
    id: index + 1,
    name: item.folder,
    folder: item.folder,
    folderPath: item.folderPath,
    coverImage: getOptimizedUrl(item.coverImage, 700),
    images: item.images,
    imageCount: item.imageCount,
    category: getCategory(item.folder)
}));

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('Tümü');
    const [currentPage, setCurrentPage] = useState(0);
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const gridRef = useRef(null);

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

    // ÖN YÜKLEME - Başlangıçta tüm cover image'leri yükle
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

    // Filtre değişince sayfa sıfırlansın
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(0);
    };

    // Sayfa geçişi - ANIMASYON YOK, ANINDA
    const goToPage = (page) => {
        if (page >= 0 && page < totalPages) {
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
                        Referanslarımız ve Tecrübelerimiz
                    </h1>
                    <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
                        Yılların birikimi ve deneyimiyle tamamladığımız projelerimiz
                    </p>
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
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    transition: 'all 150ms',
                                    minWidth: '120px',
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
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid with Navigation */}
            <section style={{ padding: '48px 0 96px 0' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
                    {/* Navigation Container */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                        {/* Sol Ok */}
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 0}
                            style={{
                                flexShrink: 0,
                                width: '64px',
                                height: '64px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 100ms',
                                border: 'none',
                                cursor: currentPage > 0 ? 'pointer' : 'not-allowed',
                                backgroundColor: currentPage > 0 ? '#1f2937' : 'rgba(31, 41, 55, 0.3)',
                                color: currentPage > 0 ? 'white' : '#4b5563',
                                boxShadow: currentPage > 0 ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none'
                            }}
                            onMouseOver={(e) => {
                                if (currentPage > 0) {
                                    e.currentTarget.style.backgroundColor = '#14b8a6';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (currentPage > 0) {
                                    e.currentTarget.style.backgroundColor = '#1f2937';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Projects Grid - NO ANIMATION */}
                        <div ref={gridRef} style={{ flex: 1 }}>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '32px'
                                }}
                            >
                                {currentProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: '16px',
                                            backgroundColor: '#1f2937',
                                            aspectRatio: '16/10',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                        }}>
                                            {/* Optimized Image */}
                                            <img
                                                src={project.coverImage}
                                                alt={project.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 200ms'
                                                }}
                                                onMouseOver={(e) => e.target.style.transform = 'scale(1.03)'}
                                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                                loading="eager"
                                                decoding="async"
                                            />

                                            {/* Overlay */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent)',
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
                                                    {project.category}
                                                </span>
                                                <h3 style={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.25rem',
                                                    marginBottom: '4px',
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                                }}>
                                                    {project.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sağ Ok */}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1}
                            style={{
                                flexShrink: 0,
                                width: '64px',
                                height: '64px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 100ms',
                                border: 'none',
                                cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed',
                                backgroundColor: currentPage < totalPages - 1 ? '#1f2937' : 'rgba(31, 41, 55, 0.3)',
                                color: currentPage < totalPages - 1 ? 'white' : '#4b5563',
                                boxShadow: currentPage < totalPages - 1 ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none'
                            }}
                            onMouseOver={(e) => {
                                if (currentPage < totalPages - 1) {
                                    e.currentTarget.style.backgroundColor = '#14b8a6';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (currentPage < totalPages - 1) {
                                    e.currentTarget.style.backgroundColor = '#1f2937';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Sayfa Bilgisi ve Noktalar */}
                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                        {/* Sayfa Noktaları */}
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
                            Sayfa <span style={{ color: '#2dd4bf', fontWeight: 'bold' }}>{currentPage + 1}</span> / {totalPages}
                            <span style={{ margin: '0 12px', color: '#374151' }}>•</span>
                            Toplam <span style={{ color: '#2dd4bf', fontWeight: 'bold' }}>{filteredProjects.length}</span> proje
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

export default ProjectsPage;
