import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1: sol, 1: sağ
    const [imageLoaded, setImageLoaded] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const preloadCache = useRef(new Map());

    const images = project?.images || [];

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

    // ESC tuşu ile kapat
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

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
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative max-w-5xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
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

                    {/* Image Container with Slide Animation */}
                    <div className="relative aspect-video bg-gray-800 overflow-hidden">
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
                            >
                                {currentImage ? (
                                    <>
                                        {/* Loading spinner - resim yüklenene kadar görünür */}
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
                                        />
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center text-gray-500">
                                        Fotoğraf bulunamadı
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
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
                    </div>

                    {/* Footer - Image Count & Thumbnails */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        {/* Thumbnail Navigation - Dynamic sliding window */}
                        {images.length > 1 && (() => {
                            const maxVisible = 10;
                            const halfVisible = Math.floor(maxVisible / 2);

                            // Calculate start index to keep current image centered
                            let startIdx = Math.max(0, currentIndex - halfVisible);
                            let endIdx = startIdx + maxVisible;

                            // Adjust if we're near the end
                            if (endIdx > images.length) {
                                endIdx = images.length;
                                startIdx = Math.max(0, endIdx - maxVisible);
                            }

                            const visibleImages = images.slice(startIdx, endIdx);

                            return (
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    {/* Sol ok - daha fazla resim varsa */}
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
                                        const isPreloaded = preloadedImages.has(img.url);
                                        return (
                                            <button
                                                key={actualIdx}
                                                onClick={() => goToImage(actualIdx)}
                                                className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${actualIdx === currentIndex
                                                    ? 'border-teal-500 scale-110'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                                    }`}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`Thumbnail ${actualIdx + 1}`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </button>
                                        );
                                    })}

                                    {/* Sağ ok - daha fazla resim varsa */}
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

                        <p className="text-center text-white/60 text-sm">
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
