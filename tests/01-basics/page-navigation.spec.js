import { test, expect } from '@playwright/test';

test('navigate between two sites', async ({page})=>{

  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);

  await page.goto('https://playwright.dev/');
  await expect(page).toHaveURL(/playwright/);

  await page.goBack();
  await expect(page).toHaveTitle(/Example/);

  await page.goForward();
  await expect(page).toHaveTitle(/Playwright/);

});
