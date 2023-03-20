const { test, expect } = require('@playwright/test');
const lighthouse = require('lighthouse/core/index.cjs');
const { writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { chromium } = require('playwright');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/templates/template-content.html',
//  'http://localhost:3000/privacy.html',  // currently nonexistent
//  'http://localhost:3000/contact.html'  // currently nonexistent
];

const reportFolder = './test-results';

async function runLighthouse(url, browser) {
  const { wsEndpoint } = browser;

  const options = {
    output: 'html',
    logLevel: 'info',
    port: 9222,
  };

  const runnerResult = await lighthouse(url, options);

  return runnerResult;
}

test.describe.serial('Lighthouse tests', () => {
  let browser;

  test.beforeAll(async () => {
    browser = await chromium.launch({
        args: ['--remote-debugging-port=9222'],
        headless: true
        });
    mkdirSync(reportFolder, { recursive: true });
  });

  test.afterAll(async () => {
    await browser.close();
  });

  for (const url of urls) {
    test(`Lighthouse test for ${url}`, async () => {
      test.slow()

      const runnerResult = await runLighthouse(url, browser);

      const reportHtml = runnerResult.report;
      writeFileSync(resolve(reportFolder, `${new URL(url).hostname}.html`), reportHtml);

      expect(runnerResult.lhr).toBeDefined();
      // expect(runnerResult.lhr.categories.performance.score).toBeGreaterThanOrEqual(0.9);

    })
  }
})