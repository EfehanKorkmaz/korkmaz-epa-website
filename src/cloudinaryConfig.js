// Cloudinary yapılandırması - Yeni hesap (duwqt0u27)
export const CLOUD_NAME = 'duwqt0u27';
export const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// API Bilgileri (Frontend için sadece Cloud Name yeterli, bu bilgiler backend için)
// API Key: 264898371152388
// API Secret: Güvenli yerde saklayın

// Resim URL'si oluşturma yardımcı fonksiyonu
export const getImageUrl = (folder, imageName, options = {}) => {
    const { width, height, quality = 'auto', format = 'auto' } = options;

    let transformations = `f_${format},q_${quality}`;
    if (width) transformations += `,w_${width}`;
    if (height) transformations += `,h_${height}`;

    return `${BASE_URL}/${transformations}/referanslar/referanslarim/${folder}/${imageName}`;
};

// Kapak resmi URL'si (ilk resim veya belirtilen resim)
export const getCoverImageUrl = (folder, coverImage, width = 600) => {
    return `${BASE_URL}/f_auto,q_auto,w_${width},c_fill/referanslar/referanslarim/${folder}/${coverImage}`;
};

// Galeri resmi URL'si
export const getGalleryImageUrl = (folder, imageName) => {
    return `${BASE_URL}/f_auto,q_auto/referanslar/referanslarim/${folder}/${imageName}`;
};
