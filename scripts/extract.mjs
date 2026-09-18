import fs from 'node:fs';

const s = fs.readFileSync('../../Me/assets/index-74280fd8.js', 'utf8');
const out = s.slice(1080000);
fs.writeFileSync('extract-out.js', out);
console.log('done, len', out.length);
