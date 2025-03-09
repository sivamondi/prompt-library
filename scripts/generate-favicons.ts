import sharp from 'sharp';
import fs from 'fs/promises';

async function generateFavicons() {
  const sizes = [16, 32, 48, 64, 128, 256];
  const svgBuffer = await fs.readFile('public/favicon.svg');

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`public/favicon-${size}x${size}.png`);
  }
}

generateFavicons().catch(console.error); 