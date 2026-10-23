const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buildDir = path.join(__dirname, 'ExportFiles', 'Build');
const files = ['ExportFiles.data', 'ExportFiles.framework.js', 'ExportFiles.wasm'];

for (const file of files) {
  const brPath = path.join(buildDir, file + '.br');
  const outPath = path.join(buildDir, file);
  if (fs.existsSync(brPath)) {
    console.log(`Decompressing ${file}.br -> ${file}...`);
    const compressed = fs.readFileSync(brPath);
    const decompressed = zlib.brotliDecompressSync(compressed);
    fs.writeFileSync(outPath, decompressed);
    console.log(`Created ${file} (${(decompressed.length / 1024 / 1024).toFixed(2)} MB)`);
  }
}

const indexPath = path.join(__dirname, 'ExportFiles', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(/ExportFiles\.data\.br/g, 'ExportFiles.data');
indexHtml = indexHtml.replace(/ExportFiles\.framework\.js\.br/g, 'ExportFiles.framework.js');
indexHtml = indexHtml.replace(/ExportFiles\.wasm\.br/g, 'ExportFiles.wasm');
fs.writeFileSync(path.join(__dirname, 'ExportFiles', 'index-uncompressed.html'), indexHtml);
console.log('Successfully created ExportFiles/index-uncompressed.html for zero-config hosts like GitHub Pages or itch.io.');
