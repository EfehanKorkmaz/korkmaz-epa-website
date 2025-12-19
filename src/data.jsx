// Ortak veriler - Tüm component ve page'ler bu dosyadan import eder

// Hizmet resimleri - optimize edilmiş WebP versiyonları
import konutProjeleriImg from './assets/Resimler-optimized/hizmetler/konut_projeleri.jpg';
import ticariYapilarImg from './assets/Resimler-optimized/hizmetler/ticari_yapilar.jpg';
import kentselDonusumImg from './assets/Resimler-optimized/hizmetler/kentsel_donusum.jpg';
import taahhutIsleriImg from './assets/Resimler-optimized/hizmetler/taahhut_isleri.jpg';
import tadilatRestorasyonImg from './assets/Resimler-optimized/hizmetler/tadilat_restorasyon.jpg';
import catiSistemleriImg from './assets/Resimler-optimized/hizmetler/cati_sistemleri.jpg';

// Özellikler - About bölümünde kullanılıyor
export const features = [
    { icon: '🏗️', title: 'Kaliteli İşçilik', desc: 'Profesyonel ekip' },
    { icon: '⏰', title: 'Zamanında Teslim', desc: 'Söz verilen tarihte' },
    { icon: '🛡️', title: 'Güvenli İnşaat', desc: 'İSG standartlarında' },
    { icon: '💯', title: '%100 Memnuniyet', desc: 'Müşteri odaklı' },
];

// İstatistikler - Stats bölümünde kullanılıyor
export const stats = [
    { number: 150, suffix: '+', label: 'Tamamlanan Proje', icon: '🏢' },
    { number: 500, suffix: '+', label: 'Mutlu Müşteri', icon: '😊' },
    { number: 20, suffix: '+', label: 'Uzman Çalışan', icon: '👷' },
    { number: 2, suffix: '+', label: 'Aktif Proje', icon: '🚧' },
];

// Hizmetler - Services bölümünde kullanılıyor
export const services = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: 'Konut Projeleri',
        description: 'Modern yaşam alanları için kaliteli ve konforlu konut projeleri sunuyoruz.',
        features: ['Rezidans Projeleri', 'Toplu Konut', 'Lüks Villalar'],
        image: konutProjeleriImg,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
        ),
        title: 'Ticari Yapılar',
        description: 'İş merkezleri, plaza ve ticari kompleksler için anahtar teslim çözümler sunuyoruz.',
        features: ['İş Merkezleri', 'AVM Projeleri', 'Ofis Binaları'],
        image: ticariYapilarImg,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Kentsel Dönüşüm',
        description: 'Güvenli ve modern yaşam alanları için kentsel dönüşüm projeleri yürütüyoruz.',
        features: ['Riskli Yapı Tespiti', 'Proje Yönetimi', 'Hak Sahipliği'],
        image: kentselDonusumImg,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: 'Taahhüt İşleri',
        description: 'Her ölçekte inşaat taahhüt işlerinde profesyonel hizmet sunuyoruz.',
        features: ['Kamu Projeleri', 'Özel Sektör', 'Endüstriyel Tesisler'],
        image: taahhutIsleriImg,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        ),
        title: 'Tadilat ve Restorasyon',
        description: 'Yapılarınızın değerini korumak ve ömrünü uzatmak için profesyonel tadilat, onarım ve güçlendirme hizmetleri sunuyoruz.',
        features: ['Anahtar Teslim Tadilat', 'Bina Güçlendirme', 'Dış Cephe Yenileme'],
        image: tadilatRestorasyonImg,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        title: 'Çatı Sistemleri',
        description: 'Yapılarınızı dış etkenlerden koruyan, yüksek dayanımlı ve enerji tasarrufu sağlayan çatı çözümleriyle yaşam alanlarınızın ömrünü uzatıyoruz.',
        features: ['İleri Derece Isı ve Su Yalıtım Çözümleri', 'Çelik ve Ahşap Çatı Konstrüksiyon Uygulamaları', 'Modern Panel ve Kenet Çatı Sistemleri Kurulumu'],
        image: catiSistemleriImg,
    },
];

// Projeler - Projects bölümünde kullanılıyor
export const projects = [
    {
        title: 'Korkmaz Residence',
        category: 'Konut Projesi',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'İstanbul, Kadıköy',
    },
    {
        title: 'Business Plaza',
        category: 'Ticari Proje',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'İstanbul, Maslak',
    },
    {
        title: 'Green Valley Evleri',
        category: 'Villa Projesi',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Antalya, Kemer',
    },
    {
        title: 'Sunset Towers',
        category: 'Konut Projesi',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'İzmir, Karşıyaka',
    },
    {
        title: 'Metro AVM',
        category: 'Ticari Proje',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Ankara, Çankaya',
    },
    {
        title: 'Park Residence',
        category: 'Konut Projesi',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Bursa, Nilüfer',
    },
];

// Hızlı linkler - Footer'da kullanılıyor
export const quickLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hakkımızda', path: '/about' },
    { name: 'Referanslar', path: '/projects' },
    { name: 'Hizmetler', path: '/services' },
    { name: 'İletişim', path: '/contact' },
];

// Menü öğeleri - Navbar'da kullanılıyor
export const menuItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Kurumsal', path: '/about' },
    { name: 'Referanslar', path: '/projects' },
    { name: 'Hizmetler', path: '/services' },
    { name: 'İletişim', path: '/contact' },
];

// Footer servisleri
export const footerServices = [
    'Konut Projeleri',
    'Ticari Yapılar',
    'Kentsel Dönüşüm',
    'Taahhüt İşleri',
    'Tadilat ve Restorasyon',
    'Çatı Sistemleri',
];

// Sosyal medya linkleri
export const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
];

// İletişim bilgileri
export const contactInfo = {
    phone: '+90 532 353 21 11',
    email: 'info@korkmazepa.com',
    address: 'Osmangazi Mah. Makbul Sk. No: 3 / 3 Darıca KOCAELİ',
    company: 'KORKMAZ EPA İNŞAAT',
    companyFull: 'SANAYİ TİCARET LİMİTED ŞİRKETİ',
};
