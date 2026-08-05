import { test, expect } from '@playwright/test';

test('verify Playwright Domain', async ({ page }) => {

  await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);
  
    await expect(
      page.getByRole('link', { name: 'Get started' })
    ).toBeVisible();

  });