const https = require('https');

const urls = [
  "https://img.appledb.dev/device@256/iPhone12,3/Space%20Gray.png",
  "https://img.appledb.dev/device@512/iPhone12,3/Space%20Gray.png",
  "https://img.appledb.dev/device@256/iPhone12,3/SpaceGray.png",
  "https://img.appledb.dev/device@512/iPhone12,3/SpaceGray.png"
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'error', error: e.message });
    });
  });
}

async function run() {
  for (const url of urls) {
    const result = await checkUrl(url);
    console.log(`${result.url}: ${result.status}`);
  }
}

run();
