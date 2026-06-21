const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const watchDir = path.join(__dirname, 'auto_updates');

if (!fs.existsSync(watchDir)) {
  fs.mkdirSync(watchDir);
}

console.log(`Watching directory ${watchDir} for new JS files...`);

fs.watch(watchDir, (eventType, filename) => {
  if (eventType === 'rename' && filename && filename.endsWith('.js')) {
    const filePath = path.join(watchDir, filename);
    // Wait a brief moment to ensure file is fully written
    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        console.log(`Running ${filename}...`);
        exec(`node "${filePath}"`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing ${filename}:`, error);
          }
          if (stdout) console.log(stdout);
          if (stderr) console.error(stderr);
          
          // Delete file after execution
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Failed to delete ${filename}:`, err);
            else console.log(`Deleted ${filename}`);
          });
        });
      }
    }, 500);
  }
});
