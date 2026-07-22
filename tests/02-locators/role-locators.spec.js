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

test('Role locators', async ({ page }) => {
  await page.goto('https://playwright.dev');

  const link = page.getByRole('link', { name: 'Get started' });

  await expect(link).toBeVisible();
  await link.click();

  await expect(page).toHaveURL(/intro/);
});

/*
Preferred locator in modern Playwright because it uses accessibility semantics.
*/
