const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const svgPath = path.resolve(__dirname, '../public/sitelogo.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // We will render the SVG centered in a white background (or transparent)
    const htmlContent = `
    <html>
        <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh; background: transparent;">
            ${svgContent.replace('<svg', '<svg style="width: 80%; height: 80%;"')}
        </body>
    </html>
    `;
    
    await page.setContent(htmlContent);

    // Generate 512x512
    await page.setViewport({ width: 512, height: 512 });
    await page.screenshot({ path: path.resolve(__dirname, '../public/icon-512x512.png'), omitBackground: true });
    
    // Generate 192x192
    await page.setViewport({ width: 192, height: 192 });
    await page.screenshot({ path: path.resolve(__dirname, '../public/icon-192x192.png'), omitBackground: true });

    // Generate 32x32 (for favicon.ico fallback)
    await page.setViewport({ width: 32, height: 32 });
    await page.screenshot({ path: path.resolve(__dirname, '../src/app/favicon.ico'), omitBackground: true }); // actually .png format inside but browsers accept it

    await browser.close();
    console.log("Successfully generated icon-512x512.png, icon-192x192.png, and favicon.ico from sitelogo.svg");
}

generateIcons().catch(console.error);
