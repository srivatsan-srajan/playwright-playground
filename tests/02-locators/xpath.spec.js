// =========================================================
// Enterprise Playwright Recipe
// =========================================================
//
// Sections:
// - Objective
// - Best Practices
// - Interview Notes
// - Exercise
//
// =========================================================


import { test, expect } from '@playwright/test';

test('XPath', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('//input[@id="username"]').fill('tomsmith');
  await page.locator('//input[@id="password"]').fill('SuperSecretPassword!');
  await page.locator('//button[@type="submit"]').click();

  await expect(page.locator('#flash')).toContainText('You logged');
});

/*
Use XPath sparingly when relationships are difficult with CSS.
*/
