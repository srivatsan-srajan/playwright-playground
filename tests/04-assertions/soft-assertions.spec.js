const { test, expect } = require('@playwright/test');

test('Soft assertions', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await expect.soft(page).toHaveTitle(/Shop/);
  await expect.soft(page.locator('#login')).toBeVisible();
});
