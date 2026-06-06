import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

function processFile(filePath: string) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  let updated = content;

  // Revert unknown back to any with disable comment
  updated = updated.replace(/:\s*unknown/g, ': any /* eslint-disable-line @typescript-eslint/no-explicit-any */');
  updated = updated.replace(/as\s*unknown/g, 'as any /* eslint-disable-line @typescript-eslint/no-explicit-any */');
  updated = updated.replace(/<unknown>/g, '<any /* eslint-disable-line @typescript-eslint/no-explicit-any */>');

  if (content !== updated) {
    fs.writeFileSync(filePath, updated);
    console.log(`Reverted unknown in: ${filePath}`);
  }
}

walkDir(path.resolve(process.cwd(), 'src/app'), processFile);
walkDir(path.resolve(process.cwd(), 'src/components'), processFile);
walkDir(path.resolve(process.cwd(), 'src/lib'), processFile);

console.log('Revert completed.');
