const { test, expect } = require('@playwright/test');

test('Assert checked', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const checkbox = page.locator('#terms');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});
