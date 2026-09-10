// Run with Playwright available: node test-deal-page.cjs
const { chromium } = require('playwright');
const { readFileSync } = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  try {
    const page = await browser.newPage();
    for (const headline of [
      'Monitor $229 Delivered @ Store',
      '20% off Monitors @ Store',
      '$50 off a $500 Spend @ Store',
      'Monitor $229, Keyboard $49 @ Store',
      'Free Game @ Store',
    ]) {
      await page.setContent(`<main><div id="main"><h1 id="title">${headline}</h1>
        <div class="node node-ozbdeal node-page"><div class="n-left"><div class="n-vote">10</div></div>
        <div class="n-right"><div class="right"><div class="foxshot-container">Image</div>
        <div class="gotodeal"><a href="/goto/1">Go to deal</a></div>
        <div class="cashback"><a id="cashback">Cashback</a></div></div>
        <div class="submitted">Today by User</div><div class="content">Description</div></div></div>
        <div class="nodefooter"><div class="nodemeta"><button id="share">Share</button></div></div>
        <h2 id="relatedstores">Related Stores</h2><section class="relatedstores">Store</section></div>
        <div id="sidebar"></div></main>`);
      await page.evaluate(() => {
        document.querySelector('#share').addEventListener('click', () => { window.shared = true; });
        document.querySelector('#cashback').addEventListener('click', () => { window.cashbackOpened = true; });
      });
      const script = readFileSync(`${__dirname}/deal-page.js`, 'utf8');
      await page.addScriptTag({ content: script });
      await page.addScriptTag({ content: script });
      assert.equal(await page.locator('.db-store-card').count(), 1);
      assert.equal(await page.locator('.db-offer, .db-offer-price').count(), 0);
      assert.equal(await page.locator('.node-page #title').count(), 1);
      assert.equal(await page.locator('#sidebar .relatedstores').count(), 1);
      assert.equal(await page.locator('#relatedstores').count(), 0);
      assert.equal(await page.locator('.db-store-card > .gotodeal a').getAttribute('href'), '/goto/1');
      assert.equal(await page.locator('#title').textContent(), headline);
      await page.locator('.db-store-card > .cashback a').click();
      assert.equal(await page.evaluate(() => window.cashbackOpened), true);
      await page.locator('#share').click();
      assert.equal(await page.evaluate(() => window.shared), true);
    }
    console.log('Deal sidebar: single/multiple/free offers, preserved controls, and repeat execution passed.');
  } finally {
    await browser.close();
  }
})();
