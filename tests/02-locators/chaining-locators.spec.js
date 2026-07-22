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

test('Locator chaining', async ({ page }) => {
  await page.setContent(`<section id="login"><button>Login</button></section>`);

  await expect(page.locator('#login').getByRole('button')).toHaveText('Login');
});
