const https = require('https');

const urls = [
  "https://img.appledb.dev/device@256/iPhone16,1/Natural%20Titanium.png",
  "https://img.appledb.dev/device@256/iPhone16,1/Blue%20Titanium.png",
  "https://img.appledb.dev/device@256/iPhone16,1/White%20Titanium.png",
  "https://img.appledb.dev/device@256/iPhone16,1/Black%20Titanium.png",
  "https://img.appledb.dev/device@256/iPhone15,2/Deep%20Purple.png",
  "https://img.appledb.dev/device@256/iPhone15,2/Space%20Black.png",
  "https://img.appledb.dev/device@256/iPhone15,2/Gold.png",
  "https://img.appledb.dev/device@256/iPhone15,2/Silver.png"
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
