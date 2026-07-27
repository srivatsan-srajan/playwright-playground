import { test, expect } from '@playwright/test';

test('CSS Locators', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('#flash')).toContainText('You logged');
});