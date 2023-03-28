const { test, expect } = require('@playwright/test');

const pages = ['index.html', 'template-content.html', 'contact.html','privacy.html'];

for (const pageURL of pages) {

    test(`Check page title - ${pageURL}`, async ({ page }) => {
      // Navigate to the page
      await page.goto(pageURL);

      // Get the page title
      const pageTitle = await page.title();

      // Check that the page title matches the expected value
      expect(pageTitle).toBe('MyWebClass.org');
    });
}