const https = require('https');

const urls = [
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs-max.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro-max.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2020.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-mini.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-plus.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg",
  "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg"
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'error', error: e.message });
    });
  });
}

async function run() {
  const results = [];
  for (const url of urls) {
    const result = await checkUrl(url);
    results.push(result);
    console.log(`${result.url}: ${result.status}`);
  }
}

run();
