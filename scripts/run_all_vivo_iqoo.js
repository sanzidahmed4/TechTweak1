const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scriptsDir = path.join(__dirname);
const files = fs.readdirSync(scriptsDir);

const vivoIqooScripts = files.filter(f => 
  (f.startsWith('insert_vivo_') || f.startsWith('insert_iqoo_')) && 
  (f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.mjs'))
);

// Add the mistakenly placed y300_pro script
const rootDir = path.join(__dirname, '..');
if (fs.existsSync(path.join(rootDir, 'insert_y300_pro.js'))) {
  vivoIqooScripts.push('../insert_y300_pro.js');
}

console.log(`Found ${vivoIqooScripts.length} scripts to execute.`);

let success = 0;
let failed = 0;

for (const script of vivoIqooScripts) {
  const scriptPath = script.startsWith('../') ? path.join(__dirname, script) : path.join(scriptsDir, script);
  console.log(`\nExecuting: ${script}`);
  
  try {
    if (script.endsWith('.ts')) {
      execSync(`npx tsx "${scriptPath}"`, { stdio: 'inherit' });
    } else {
      execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    }
    success++;
  } catch (error) {
    console.error(`Failed to execute ${script}`);
    failed++;
  }
}

console.log(`\nExecution Complete! Success: ${success}, Failed: ${failed}`);
