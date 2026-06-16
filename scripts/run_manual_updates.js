const fs = require('fs');
const { execSync } = require('child_process');

const files = fs.readdirSync('scripts/manual_seo_updates').filter(f => f.endsWith('.js'));
console.log(`Found ${files.length} update scripts.`);

for (const file of files) {
  try {
    const out = execSync(`node scripts/manual_seo_updates/${file}`, { encoding: 'utf-8' });
    console.log(out.trim());
    fs.unlinkSync(`scripts/manual_seo_updates/${file}`);
  } catch(e) {
    console.error(`Failed on ${file}`, e.message);
  }
}
console.log('Batch complete.');
