import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Thumbnail için düşük kaliteli URL oluştur
const getThumbnailUrl = (url) => {
    if (!url) return '';
    return url.replace('/upload/', '/upload/f_webp,q_30,w_80,h_80,c_fill/');
};

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1: sol, 1: sağ
    const [imageLoaded, setImageLoaded] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const [isMobile, setIsMobile] = useState(false);
    const preloadCache = useRef(new Map());

    const images = project?.images || [];

    // Mobil cihaz kontrolü
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Resmi preload et
    const preloadImage = useCallback((url) => {
        if (!url || preloadCache.current.has(url)) return;

        const img = new Image();
        img.onload = () => {
            preloadCache.current.set(url, true);
            setPreloadedImages(prev => new Set([...prev, url]));
        };
        img.src = url;
    }, []);

    // Komşu resimleri preload et (önceki ve sonraki 2 resim)
    useEffect(() => {
        if (!images.length) return;

        const indicesToPreload = [
            currentIndex - 2,
            currentIndex - 1,
            currentIndex + 1,
            currentIndex + 2
        ];

        indicesToPreload.forEach(idx => {
            const normalizedIdx = ((idx % images.length) + images.length) % images.length;
            if (images[normalizedIdx]?.url) {
                preloadImage(images[normalizedIdx].url);
            }
        });
    }, [currentIndex, images, preloadImage]);

    // Proje değiştiğinde index'i sıfırla ve cache'i temizle
    useEffect(() => {
        if (project && isOpen) {
            setCurrentIndex(0);
            setDirection(0);
            setImageLoaded(false);
            preloadCache.current.clear();
            setPreloadedImages(new Set());
        }
    }, [project, isOpen]);

    // Geri tuşu ile modal'ı kapat (History API)
    useEffect(() => {
        if (isOpen) {
            // Modal açıldığında history'ye state ekle
            window.history.pushState({ modal: true }, '');

            const handlePopState = (e) => {
                // Geri tuşuna basıldığında modal'ı kapat
                onClose();
            };

            window.addEventListener('popstate', handlePopState);
            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen, onClose]);

    // ESC tuşu ile kapat
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                // ESC ile kapatırken history'yi de geri al
                if (isOpen) window.history.back();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    // Ok tuşları ile geçiş
    useEffect(() => {
        if (!project?.images) return;

        const handleArrow = (e) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };
        window.addEventListener('keydown', handleArrow);
        return () => window.removeEventListener('keydown', handleArrow);
    }, [currentIndex, project?.images?.length]);

    const nextImage = () => {
        if (images.length > 0) {
            setDirection(1);
            setImageLoaded(false);
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (images.length > 0) {
            setDirection(-1);
            setImageLoaded(false);
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    const goToImage = (idx) => {
        if (idx === currentIndex) return;
        setDirection(idx > currentIndex ? 1 : -1);
        setImageLoaded(false);
        setCurrentIndex(idx);
    };

    // Touch handler - tek parmak swipe, iki parmak zoom
    const touchStartRef = useRef({ x: 0, y: 0, time: 0, isSingleTouch: true });

    const handleTouchStart = (e) => {
        // İki veya daha fazla parmak varsa swipe'ı devre dışı bırak (pinch-zoom için)
        if (e.touches.length >= 2) {
            touchStartRef.current.isSingleTouch = false;
            return;
        }
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now(),
            isSingleTouch: true
        };
    };

    const handleTouchEnd = (e) => {
        // İki parmak kullanıldıysa swipe yapma
        if (!touchStartRef.current.isSingleTouch) {
            touchStartRef.current.isSingleTouch = true; // Reset
            return;
        }

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
        const deltaTime = Date.now() - touchStartRef.current.time;

        // Sadece hızlı ve yatay swipe'ları algıla
        const threshold = 80;
        const maxTime = 300; // ms
        const maxVertical = 100; // Dikey hareket sınırı

        if (Math.abs(deltaX) > threshold && deltaTime < maxTime && deltaY < maxVertical) {
            if (deltaX > 0) {
                prevImage();
            } else {
                nextImage();
            }
        }
    };

    if (!isOpen || !project) return null;

    const currentImage = images[currentIndex];

    // Kayma animasyonu varyantları
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm ${isMobile ? 'p-0' : 'p-4'}`}
                onClick={onClose}
            >
                {/* Modal Container - Mobilde tam ekran, dikey */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`relative bg-gray-900 overflow-hidden ${isMobile
                        ? 'w-full h-full rounded-none'
                        : 'max-w-5xl w-full max-h-[90vh] rounded-2xl'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header - Mobilde absolute değil, normal akış */}
                    {isMobile ? (
                        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
                            <div className="flex-1 min-w-0 pr-4">
                                <h2 className="text-sm font-bold text-white uppercase truncate">{project.name}</h2>
                                <span className="text-xs text-teal-400">{project.category}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase">{project.name}</h2>
                                <span className="text-sm text-teal-400">{project.category}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Image Container - Mobilde dikey oran */}
                    <div
                        className={`relative bg-gray-800 overflow-hidden ${isMobile
                            ? 'h-[65vh]'
                            : 'aspect-video'
                            }`}
                    >
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                                // Touch events ile swipe - drag yerine
                                onTouchStart={isMobile ? handleTouchStart : undefined}
                                onTouchEnd={isMobile ? handleTouchEnd : undefined}
                            >
                                {currentImage ? (
                                    <>
                                        {/* Loading spinner */}
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                        <img
                                            src={currentImage.url}
                                            alt={`${project.name} - ${currentIndex + 1}`}
                                            className={`w-full h-full object-contain transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            onLoad={() => setImageLoaded(true)}
                                            onError={(e) => {
                                                e.target.src = project.coverImage || 'https://res.cloudinary.com/duwqt0u27/image/upload/f_auto,q_auto,w_800/sample';
                                                setImageLoaded(true);
                                            }}
                                            draggable={false}
                                        />
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center text-gray-500">
                                        Fotoğraf bulunamadı
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows - Sadece desktop */}
                        {!isMobile && images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Mobil swipe ipucu */}
                        {isMobile && images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                Kaydır
                            </div>
                        )}
                    </div>

                    {/* Footer - Image Count & Thumbnails */}
                    <div className={`bg-gray-900 ${isMobile ? 'p-3' : 'p-4'}`}>
                        {/* Thumbnail Navigation */}
                        {images.length > 1 && (() => {
                            const maxVisible = isMobile ? 6 : 10;
                            const halfVisible = Math.floor(maxVisible / 2);

                            let startIdx = Math.max(0, currentIndex - halfVisible);
                            let endIdx = startIdx + maxVisible;

                            if (endIdx > images.length) {
                                endIdx = images.length;
                                startIdx = Math.max(0, endIdx - maxVisible);
                            }

                            const visibleImages = images.slice(startIdx, endIdx);

                            return (
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {startIdx > 0 && (
                                        <button
                                            onClick={() => goToImage(Math.max(0, currentIndex - 1))}
                                            className="text-white/60 hover:text-white p-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}

                                    {visibleImages.map((img, idx) => {
                                        const actualIdx = startIdx + idx;
                                        return (
                                            <button
                                                key={actualIdx}
                                                onClick={() => goToImage(actualIdx)}
                                                className={`rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${isMobile ? 'w-10 h-10' : 'w-12 h-12'
                                                    } ${actualIdx === currentIndex
                                                        ? 'border-teal-500 scale-105'
                                                        : 'border-transparent opacity-50 hover:opacity-100'
                                                    }`}
                                            >
                                                {/* Düşük kaliteli thumbnail */}
                                                <img
                                                    src={getThumbnailUrl(img.url)}
                                                    alt={`Thumbnail ${actualIdx + 1}`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </button>
                                        );
                                    })}

                                    {endIdx < images.length && (
                                        <button
                                            onClick={() => goToImage(Math.min(images.length - 1, currentIndex + 1))}
                                            className="text-white/60 hover:text-white p-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            );
                        })()}

                        <p className={`text-center text-white/60 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
