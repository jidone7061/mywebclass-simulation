const { test, expect } = require('@playwright/test');

const pages = ['index.html', 'template-content.html', 'contact.html','privacy.html'];

for (const pageUrl of pages) {
    test(`Verify SEO meta tags - ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);

      // Verify charset and viewport meta tags exist
      expect(await page.locator('head > meta[charset="UTF-8"]').count()).toBe(1);
      expect(await page.locator('head > meta[name="viewport"]').count()).toBe(1);

      // Verify basic meta info meta tags exist
      expect(await page.locator('head > meta[name="keywords"]').count()).toBe(1);
      expect(await page.locator('head > meta[name="author"]').count()).toBe(1);
      expect(await page.locator('head > meta[name="description"]').count()).toBe(1);

      // Verify OpenGraph meta tags exist
      expect(await page.locator('head > meta[property="og:title"]').count()).toBe(1);
      expect(await page.locator('head > meta[property="og:description"]').count()).toBe(1);
      expect(await page.locator('head > meta[property="og:image"]').count()).toBe(1);
      expect(await page.locator('head > meta[property="og:url"]').count()).toBe(1);
    });
}
