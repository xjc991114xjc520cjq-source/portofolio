// Run against pnpm dev/preview with Playwright available via NODE_PATH.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const baseUrl = process.env.PORTFOLIO_QA_URL || 'http://127.0.0.1:4173/';
const output = process.env.PORTFOLIO_QA_OUTPUT;
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1700, height: 1000 }, reducedMotion: 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const cards = page.locator('.project-showcase-item');
    for (const index of [0, 1, 3]) {
      const card = cards.nth(index);
      await card.scrollIntoViewIfNeeded();
      await card.focus();
      const images = card.locator('.project-showcase-art-primary');
      assert.equal(await images.count(), 2);
      const first = await images.nth(0).getAttribute('src');
      const second = await images.nth(1).getAttribute('src');
      const started = Date.now();
      await page.waitForFunction(({ index, second }) => document.querySelectorAll('.project-showcase-item')[index].querySelector('img.is-active')?.getAttribute('src') === second, { index, second }, { timeout: 2200 });
      const elapsed = Date.now() - started;
      assert.ok(elapsed >= 1200 && elapsed < 2200, `${index}: unexpected interval ${elapsed}`);
      await images.nth(1).evaluate(image => image.decode());
      await page.waitForTimeout(700);
      assert.ok(await images.nth(1).evaluate(image => image.naturalWidth > 0 && Number(getComputedStyle(image).opacity) > 0.95));
      if (index === 3 && output) await page.screenshot({ path: path.join(output, 'lifestyle-cycle-skirt-desktop.png') });
      await page.waitForFunction(({ index, first }) => document.querySelectorAll('.project-showcase-item')[index].querySelector('img.is-active')?.getAttribute('src') === first, { index, first }, { timeout: 1800 });
      console.log(`Category ${index}: both images loaded, 0 -> 1 -> 0, first switch ${elapsed}ms`);
    }
    await page.locator('.project-showcase-item.is-speaker-cover').evaluate(el => el.blur());
    await page.waitForTimeout(1800);
    assert.ok(await cards.nth(3).locator('img').nth(0).evaluate(image => image.classList.contains('is-active')));
    await cards.nth(3).focus();
    await page.waitForTimeout(250);
    await cards.nth(1).focus();
    await page.waitForTimeout(250);
    await cards.nth(3).focus();
    await page.waitForTimeout(500);
    assert.ok(await cards.nth(3).locator('img').nth(0).evaluate(image => image.classList.contains('is-active')), 'rapid switching must reset the interval');
    await cards.nth(3).click({ force: true });
    await page.locator('.project-detail-panel').waitFor();
    await page.waitForTimeout(1800);
    assert.ok(await cards.nth(3).locator('img').nth(0).evaluate(image => image.classList.contains('is-active')), 'opening detail pauses cover cycling');
    await page.keyboard.press('Escape');
    await page.locator('.project-detail-panel').waitFor({ state: 'detached' });

    for (const width of [900, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      const mobile = page.getByRole('button', { name: '仍然使用移动端浏览' });
      if (await mobile.isVisible()) await mobile.click();
      const card = cards.nth(3);
      await card.scrollIntoViewIfNeeded();
      await card.focus();
      await page.waitForTimeout(2350);
      assert.ok(await card.locator('img').nth(1).evaluate(image => image.classList.contains('is-active') && image.naturalWidth > 0));
      assert.equal(await card.locator('img').nth(1).evaluate(image => getComputedStyle(image).objectPosition), '100% 50%', 'keep fashion subject inside narrow crop');
      assert.ok(await card.locator('.project-showcase-meta').evaluate(el => parseFloat(getComputedStyle(el).bottom) >= 30), 'title remains at bottom');
      if (output) await page.screenshot({ path: path.join(output, `lifestyle-cycle-skirt-${width}.png`) });
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(2000);
    assert.ok(await cards.nth(3).locator('img').nth(0).evaluate(image => image.classList.contains('is-active')), 'respect reduced-motion preference');
    assert.deepEqual(errors, []);
    console.log('COVER_CYCLE_QA_OK');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
