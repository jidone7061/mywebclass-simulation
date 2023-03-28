import { test, expect } from '@playwright/test';

test('Consent flow test', async ({ page }) => {
  await page.goto('index.html'); // Replace with the URL of your website

  // Check that the cookie doesn't exist when first loading
  const initialCookie = await page.context().cookies();
  expect(initialCookie.find((cookie) => cookie.name === 'privacyAccepted')).toBeUndefined();

  // Check that window.dataLayer contains the specified argument
  const dataLayerInitial = await page.evaluate(() => window.dataLayer);
  expect(dataLayerInitial).toContainEqual({ 0: 'consent', 1: 'default', 2: { ad_storage: 'denied', analytics_storage: 'denied' } });

  // Click the button with id 'acceptBtn'
  await page.click('#acceptBtn');

  // Check that the privacyAccepted cookie is set to true
  const updatedCookie = await page.context().cookies();
  expect(updatedCookie.find((cookie) => cookie.name === 'privacyAccepted' && cookie.value === 'true')).toBeTruthy();

  // Check that window.dataLayer has the specified argument after the button click
  const dataLayerUpdated = await page.evaluate(() => window.dataLayer);
  expect(dataLayerUpdated).toContainEqual({ 0: 'consent', 1: 'update', 2: { ad_storage: 'granted', analytics_storage: 'granted' } });

  // Clear everything except the cookie and reload the page
  await page.evaluate(() => {
    window.dataLayer = [];
  });
  await page.reload();

  // Check that window.dataLayer still contains the specified argument after the page reload
  const dataLayerAfterReload = await page.evaluate(() => window.dataLayer);
  expect(dataLayerAfterReload).toContainEqual({ 0: 'consent', 1: 'update', 2: { ad_storage: 'granted', analytics_storage: 'granted' } });
});