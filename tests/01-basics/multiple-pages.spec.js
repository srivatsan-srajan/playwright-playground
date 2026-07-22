import { test, expect } from '@playwright/test';

test.only('handle popup window', async ({ page, context }) => {

  await page.goto('https://example.com');

  const popupPromise=context.waitForEvent('page');

  await page.evaluate(() => {
    window.open('https://playwright.dev/');
  });

  const popup=await popupPromise;

  await popup.waitForLoadState();

  await expect(popup).toHaveTitle(/Playwright/);

  expect(context.pages().length).toBeGreaterThan(1);

  await popup.close();

});

/*
Challenge
---------
Navigate all open pages and print titles.
*/
