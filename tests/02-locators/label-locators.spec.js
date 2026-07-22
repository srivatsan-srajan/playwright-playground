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

test('Label locators', async ({ page }) => {
  await page.setContent(`
    <label>Email <input type="email"></label>
    <label>Password <input type="password"></label>
  `);

  await page.getByLabel('Email').fill('foo@test.com');
  await page.getByLabel('Password').fill('secret');

  await expect(page.getByLabel('Email')).toHaveValue('foo@test.com');
});
