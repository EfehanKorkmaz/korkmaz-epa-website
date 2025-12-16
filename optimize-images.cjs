const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/Resimler';
const outputDir = './src/assets/Resimler-optimized';

// Create output directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(path.join(outputDir, 'hizmetler'))) {
    fs.mkdirSync(path.join(outputDir, 'hizmetler'), { recursive: true });
}

async function optimizeImage(inputPath, outputPath, quality = 80) {
    const stats = fs.statSync(inputPath);
    const sizeBefore = (stats.size / 1024 / 1024).toFixed(2);

    await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath);

    const statsAfter = fs.statSync(outputPath);
    const sizeAfter = (statsAfter.size / 1024 / 1024).toFixed(2);

    console.log(`${path.basename(inputPath)}: ${sizeBefore}MB -> ${sizeAfter}MB`);
}

async function main() {
    console.log('Starting image optimization...\n');

    // Main images
    await optimizeImage(
        path.join(inputDir, 'anasayfaresim.png'),
        path.join(outputDir, 'anasayfaresim.webp'),
        75
    );

    await optimizeImage(
        path.join(inputDir, 'Kurumsal-resim.png'),
        path.join(outputDir, 'Kurumsal-resim.webp'),
        80
    );

    // Service images
    const hizmetler = [
        'kentsel_donusum.png',
        'konut_projeleri.png',
        'proje_danismanligi.png',
        'taahhut_isleri.png',
        'tadilat_restorasyon.png',
        'ticari_yapilar.png'
    ];

    for (const img of hizmetler) {
        await optimizeImage(
            path.join(inputDir, 'hizmetler', img),
            path.join(outputDir, 'hizmetler', img.replace('.png', '.webp')),
            80
        );
    }

    console.log('\n✅ Image optimization complete!');
}

main().catch(console.error);
