const puppeteer = require('puppeteer');

async function extractFinalLink(initialUrl) {
  let browser;
  try {
    console.log(`[*] Starting extraction for: ${initialUrl}`);
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    console.log('[*] Navigating to initial URL...');
    await page.goto(initialUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for the START VERIFICATION button
    console.log('[*] Waiting for START VERIFICATION button...');
    await page.waitForSelector('button', { timeout: 10000 });
    
    // Click START VERIFICATION button
    console.log('[*] Clicking START VERIFICATION button...');
    const buttons = await page.$$('button');
    if (buttons.length > 0) {
      await buttons[0].click();
    }
    
    // Wait for the page to load after clicking
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Wait for timer to complete (10 seconds)
    console.log('[*] Waiting for timer to complete (10 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 11000));

    // Click VERIFY TO CONTINUE button
    console.log('[*] Clicking VERIFY TO CONTINUE button...');
    const verifyButtons = await page.$$('button');
    if (verifyButtons.length > 0) {
      await verifyButtons[0].click();
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Click CLICK HERE TO CONTINUE button
    console.log('[*] Clicking CLICK HERE TO CONTINUE button...');
    const continueButtons = await page.$$('button');
    if (continueButtons.length > 0) {
      await continueButtons[0].click();
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Wait for GO TO DOWNLOAD button and click it
    console.log('[*] Clicking GO TO DOWNLOAD button...');
    const downloadButtons = await page.$$('button');
    if (downloadButtons.length > 0) {
      await downloadButtons[0].click();
    }

    // Wait for navigation to final page
    console.log('[*] Waiting for final page to load...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the final URL
    const finalUrl = page.url();
    console.log(`[+] Final URL extracted: ${finalUrl}`);

    await browser.close();
    return finalUrl;

  } catch (error) {
    console.error(`[-] Error during extraction: ${error.message}`);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

module.exports = { extractFinalLink };
