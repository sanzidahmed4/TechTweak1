const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../scripts');

function scrubFile(filePath) {
  const ext = path.extname(filePath);
  if (ext !== '.js' && ext !== '.ts' && ext !== '.mjs') return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const uriRegex = /(['"`])mongodb:\/\/[^'"`]+(['"`])/g;
  
  if (uriRegex.test(content)) {
    content = content.replace(uriRegex, 'process.env.MONGODB_URI');
    
    // Add dotenv if not present
    if (!content.includes('dotenv')) {
      if (content.includes('import ')) {
        content = "import dotenv from 'dotenv';\ndotenv.config({ path: '.env.local' });\n" + content;
      } else {
        content = "require('dotenv').config({ path: '.env.local' });\n" + content;
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Scrubbed: ${filePath}`);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      scrubFile(fullPath);
    }
  }
}

traverseDir(directoryPath);
console.log('Scrubbing complete!');
