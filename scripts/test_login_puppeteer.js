const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching headless Chrome...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    console.log("Navigating to http://localhost:3000/login...");
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });

    console.log("Typing credentials...");
    await page.type('input[name="email"]', 'admin@techtweak.com');
    await page.type('input[name="password"]', 'password123');

    console.log("Clicking submit...");
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {})
    ]);

    // Check if we are redirected to /admin
    const url = page.url();
    console.log("Current URL after submit:", url);

    if (url.includes('/admin')) {
        console.log("✅ Successfully logged in and redirected to /admin!");
    } else {
        // Look for error message
        const errorText = await page.evaluate(() => {
            const el = document.querySelector('.text-red-600 p');
            return el ? el.innerText : 'No error message found';
        });
        console.log("❌ Failed to login. URL:", url);
        console.log("Error message on screen:", errorText);
    }

    await browser.close();
})();
