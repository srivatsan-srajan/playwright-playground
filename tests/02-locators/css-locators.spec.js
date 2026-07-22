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

test('CSS Locators', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('#flash')).toContainText('You logged');
});

/*
Objective:
Learn robust CSS selectors.

Best Practices:
- Keep selectors short.
- Prefer ids when available.

Interview:
When is CSS preferable to XPath?

Exercise:
Rewrite using getByRole().
*/
