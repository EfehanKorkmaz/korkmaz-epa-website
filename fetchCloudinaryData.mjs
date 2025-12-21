// Cloudinary'den tüm fotoğrafları çekip JSON dosyası oluşturan script
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary yapılandırması
cloudinary.config({
    cloud_name: 'duwqt0u27',
    api_key: '264898371152388',
    api_secret: 'CKvGDbOa-ozT6aRkC5adyFB3eyw'
});

async function fetchAllProjects() {
    try {
        console.log('Cloudinary\'den klasörler ve fotoğraflar çekiliyor...\n');

        // Önce kök klasörleri listele
        console.log('Kök klasörler listeleniyor...');
        const rootFolders = await cloudinary.api.root_folders();
        console.log('Kök klasörler:', rootFolders.folders.map(f => f.name));

        // referanslar klasörünün altındaki klasörleri bul
        let targetPath = '';
        for (const folder of rootFolders.folders) {
            if (folder.name.includes('referans')) {
                console.log(`\nBulunan referans klasörü: ${folder.name}`);
                targetPath = folder.path;

                // Alt klasörleri kontrol et
                try {
                    const subFolders = await cloudinary.api.sub_folders(folder.path);
                    console.log(`Alt klasörler:`, subFolders.folders.map(f => f.name));

                    // referanslarim veya benzeri bir klasör var mı?
                    for (const sub of subFolders.folders) {
                        if (sub.name.includes('referans')) {
                            targetPath = sub.path;
                            console.log(`Hedef klasör: ${targetPath}`);
                        }
                    }
                } catch (e) {
                    console.log('Alt klasör yok, proje klasörleri burada olabilir');
                }
            }
        }

        if (!targetPath) {
            console.log('referanslar klasörü bulunamadı, tüm klasörleri tarayacağım...');
            targetPath = '';
        }

        // Hedef klasördeki alt klasörleri çek
        let folders = [];
        try {
            const foldersResult = await cloudinary.api.sub_folders(targetPath || 'referanslar');
            folders = foldersResult.folders;
        } catch (e) {
            // Direkt referanslarım dene
            try {
                const foldersResult = await cloudinary.api.sub_folders('referanslarım');
                folders = foldersResult.folders;
                targetPath = 'referanslarım';
            } catch (e2) {
                console.log('Klasör bulunamadı, API ile tüm resimleri çekiyorum...');
            }
        }

        console.log(`\n${folders.length} proje klasörü bulundu.\n`);

        const projects = [];

        for (const folder of folders) {
            const folderName = folder.name;
            const folderPath = folder.path;

            console.log(`İşleniyor: ${folderName}`);

            try {
                // Bu klasördeki tüm fotoğrafları çek - search API kullan
                const searchResult = await cloudinary.search
                    .expression(`asset_folder="${folderPath}"`)
                    .max_results(100)
                    .execute();

                const images = searchResult.resources.map(r => ({
                    public_id: r.public_id,
                    url: r.secure_url,
                    format: r.format
                }));

                // Kapak resmini bul (dosya adında "kapak" veya "Kapak" geçen)
                let coverImage = images.find(img =>
                    img.public_id.toLowerCase().includes('kapak')
                );

                // Kapak bulunamazsa ilk resmi kullan
                if (!coverImage && images.length > 0) {
                    coverImage = images[0];
                }

                projects.push({
                    folder: folderName,
                    folderPath: folderPath,
                    coverImage: coverImage ? coverImage.url : null,
                    coverPublicId: coverImage ? coverImage.public_id : null,
                    images: images,
                    imageCount: images.length
                });

                console.log(`  -> ${images.length} fotoğraf bulundu`);
            } catch (e) {
                console.log(`  -> Hata: ${e.message}`);
                projects.push({
                    folder: folderName,
                    folderPath: folderPath,
                    coverImage: null,
                    coverPublicId: null,
                    images: [],
                    imageCount: 0
                });
            }
        }

        // JSON dosyasına kaydet
        const outputPath = './src/cloudinaryData.json';
        fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf-8');
        console.log(`\n✅ Veriler ${outputPath} dosyasına kaydedildi!`);

        // Özet
        console.log('\n📊 ÖZET:');
        console.log(`Toplam klasör: ${projects.length}`);
        console.log(`Toplam fotoğraf: ${projects.reduce((sum, p) => sum + p.imageCount, 0)}`);

        return projects;
    } catch (error) {
        console.error('Hata:', error);
        throw error;
    }
}

fetchAllProjects();

