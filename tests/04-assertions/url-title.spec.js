const { test, expect } = require('@playwright/test');

test('Assert URL and title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await expect(page).toHaveURL(/client/);
  await expect(page).toHaveTitle(/Let's Shop/);
});
