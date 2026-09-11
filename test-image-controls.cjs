const { chromium } = require('playwright');
const { readFileSync } = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  try {
    const page = await browser.newPage();
    await page.setContent('<div class="foxshot-container"><a href="#"><img width="100" height="100" alt="Logo"></a></div><div class="foxshot-container blur"><img alt="Blurred"></div>');
    await page.addStyleTag({ content: readFileSync(`${__dirname}/dark-bargain.css`, 'utf8') });
    await page.addScriptTag({ content: readFileSync(`${__dirname}/image-controls.js`, 'utf8') });
    const filter = () => page.locator('.foxshot-container:not(.blur) img').evaluate(e => getComputedStyle(e).filter);
    assert.equal(await filter(), 'brightness(0.75) contrast(0.95)');
    assert.equal(await page.locator('.db-logo-toggle').count(), 1);
    await page.locator('.db-logo-toggle').click();
    await page.evaluate(() => document.activeElement.blur());
    await page.mouse.move(600, 400);
    assert.equal(await filter(), 'none');
    await page.locator('.db-logo-toggle').focus();
    await page.keyboard.press('Space');
    await page.evaluate(() => document.activeElement.blur());
    assert.equal(await filter(), 'brightness(0.75) contrast(0.95)');
    assert.equal(await page.locator('canvas').count(), 0);
    console.log('Image dimming, original toggle, keyboard controls and blur exclusion passed.');
  } finally { await browser.close(); }
})();
