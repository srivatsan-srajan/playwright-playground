import { test, expect } from '@playwright/test';

test.describe.serial('Serial execution', () => {

  test('Step 1', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('Step 2', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');
    await expect(page).toHaveURL(/docs/);
  });

  test('Step 3', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/test-intro');
    await expect(page).toHaveURL(/test-intro/);
  });

});