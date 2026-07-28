const { test, expect } = require('@playwright/test');

test('Assert enabled', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await expect(page.locator('#login')).toBeEnabled();
});
