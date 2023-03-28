const { test } = require('@playwright/test')
const { axe, injectAxe, checkA11y } = require('axe-playwright')

const pages = ['index.html', 'template-content.html', 'contact.html','privacy.html'];

for (const pageUrl of pages) {
    test(`Test Accessibility - ${pageUrl}`, async ({ page }) => {
        // Navigate to the home page
        await page.goto(pageUrl);

        // Inject axe into the page
        await injectAxe(page);

        // Run axe on the page
        const results = await checkA11y(page, null, {
            axeOptions: {},
            detailedReport: true,
            detailedReportOptions: {html: true}
        });
    });
}