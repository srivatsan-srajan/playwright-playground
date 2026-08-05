import { test, expect } from '@playwright/test';

test.describe.parallel('Parallel execution', () => {

  test('Search for Playwright', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('Search for GitHub', async ({ page }) => {
    await page.goto('https://github.com');
    await expect(page).toHaveTitle(/GitHub/);
  });

  test('Search for Google', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle(/Google/);
  });

});