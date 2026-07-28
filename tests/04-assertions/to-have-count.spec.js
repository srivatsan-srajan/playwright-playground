const { test, expect } = require('@playwright/test');

test('Assert count', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.card-body')).toHaveCount(4);
});
