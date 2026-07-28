const { test, expect } = require('@playwright/test');

test('Assert exact text', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await expect(page.locator('.login-title')).toHaveText('Log in');
});
