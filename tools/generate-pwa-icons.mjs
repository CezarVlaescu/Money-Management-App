import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const input = 'public/icons/money-bloom-icon.svg';
const outputDirectory = 'public/icons';

mkdirSync(outputDirectory, { recursive: true });

await Promise.all(
  sizes.map(size =>
    sharp(input)
      .resize(size, size)
      .png()
      .toFile(`${outputDirectory}/icon-${size}x${size}.png`)
  )
);

console.log('PWA icons generated successfully.');