const { test, expect } = require('@playwright/test');

let context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();

  // Set the cookie 'privacyAccepted' with value 'true'
  await context.addCookies([{ name: 'privacyAccepted', value: 'true', domain: 'localhost', path: '/' }]);
});

test('Keyboard Navigation', async () => {
  const page = await context.newPage();
  await page.goto('index.html');

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('MyWebClass.org')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Home')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Content Template')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Previous')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Next')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Learn')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Share')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Educate')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Privacy Policy')

  await page.keyboard.press('Tab');
//  console.log(await page.locator(':focus').innerText());
  expect(await page.locator(':focus').innerText()).toBe('Contact')
});
