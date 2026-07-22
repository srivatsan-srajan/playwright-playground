import { test, expect } from '@playwright/test';

test.describe('Launch Browser', () => {

  test('open Playwright website and validate title', async ({ page }) => {

    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

    await expect(
      page.getByRole('link', { name: 'Get started' })
    ).toBeVisible();

  });

});