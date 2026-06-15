const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filesToFix = [
  'insert_vivo_y200e.js',
  'insert_vivo_y22.js',
  'insert_vivo_y28.js',
  'insert_vivo_y300.js',
  'insert_vivo_y36.js',
  'insert_vivo_y58.js',
  '../insert_y300_pro.js',
  'insert_vivo_t2.js',
  'insert_vivo_t2_pro.js',
  'insert_vivo_t3.js',
  'insert_vivo_t3x.js',
  'insert_vivo_t3_pro.js',
  'insert_vivo_t1.js'
];

for (let filename of filesToFix) {
  const filePath = path.join(__dirname, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract name to create slug
  const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
  if (nameMatch) {
    const name = nameMatch[1];
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Inject slug right after name
    content = content.replace(/name:\s*["'][^"']+["']/, `name: "${name}",\n      slug: "${slug}"`);
    
    // Map camelCase to snake_case for DB consistency
    content = content.replace(/launchPrice:/g, 'price_usd:');
    content = content.replace(/seoOverview:/g, 'seo_overview:');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filename}`);
    
    try {
      execSync(`node "${filePath}"`, { stdio: 'inherit' });
    } catch (e) {
      console.log(`Failed to run ${filename}`);
    }
  }
}
