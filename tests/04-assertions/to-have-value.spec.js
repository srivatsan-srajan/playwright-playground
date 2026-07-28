const { test, expect } = require('@playwright/test');

test('Assert textbox value', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  const email = page.locator('#userEmail');
  await email.fill('foo@bar.com');
  await expect(email).toHaveValue('foo@bar.com');
});
