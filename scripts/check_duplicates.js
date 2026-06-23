const fs = require('fs');
const content = fs.readFileSync('src/app/phones/[brand]/[model]/page.tsx', 'utf8');
const labels = content.match(/label: \"([^\"]+)\"/g);
if (labels) {
    const counts = {};
    labels.forEach(l => {
        counts[l] = (counts[l] || 0) + 1;
    });
    let found = false;
    Object.keys(counts).forEach(k => {
        if (counts[k] > 1) {
            console.log('Duplicate label:', k, counts[k]);
            found = true;
        }
    });
    if(!found) console.log('No duplicate labels found in page.tsx');
}
