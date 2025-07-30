import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const imagesDir = join(__dirname, '../../assets/images');
const outputFile = join(__dirname, '../../assets/data/project-images.json');

const files = readdirSync(imagesDir);
const imageFiles = files.filter(file => /\.(png|jpe?g|gif|webp|svg)$/i.test(file));

writeFileSync(outputFile, JSON.stringify(imageFiles, null, 2));
console.log(`✅ Generated project-images.json with ${imageFiles.length} images`);
