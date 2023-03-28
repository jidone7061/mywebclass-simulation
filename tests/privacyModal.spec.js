const { test, expect } = require('@playwright/test');

const pages = ['index.html', 'template-content.html', 'contact.html','privacy.html'];

for (const pageUrl of pages) {
    test(`Privacy Modal Test - ${pageUrl}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        // Clear cookies before starting the test
        await context.clearCookies();

        // Navigate to the page
        await page.goto(pageUrl);

        // Check that the modal appears
        const modal = await page.$('#privacyModal');
        expect(modal).toBeTruthy();

        // Check that the modal content is correct
        const modalContent = await modal.$eval('.modal-body', el => el.textContent);
        expect(modalContent).toContain('We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.');
        expect(modalContent).toContain('We collect your personal data for the purpose of improving your browsing experience, and we will only process it with your consent. By clicking the \"Accept\" button, you agree to the processing of your personal data in accordance with this policy.');
        expect(modalContent).toContain('To learn more about how we handle your personal data, please read our full Privacy Policy.');

        // Click the Decline button and check that the page redirects to Google then go back
        page.locator('.modal-content #declineBtn').click()
        await page.waitForNavigation()
        expect(page.url()).toBe('https://www.google.com/');
        await page.goBack();

        // Click the Accept button and check that the modal closes and sets the cookie
        await page.locator('.modal-content #acceptBtn').click()
        await page.waitForSelector('body.modal-open', { state: 'detached' });
        expect(await modal.isVisible()).toBeFalsy();
        const cookies = await context.cookies();
        const privacyAccepted = cookies.find(cookie => cookie.name === 'privacyAccepted');
        expect(privacyAccepted.value).toEqual('true');

        // Navigate back to the page and check that the modal does not appear
        await page.reload( {waitUntil: 'domcontentloaded' });
        expect(await modal.isVisible()).toBeFalsy();

        // Close the context
        await context.close();
    });
}
