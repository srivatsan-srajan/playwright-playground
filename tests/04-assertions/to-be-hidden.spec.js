const { test, expect } = require('@playwright/test');

test('Assert hidden', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await expect(page.locator('.loading')).toBeHidden();
});
