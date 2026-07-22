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

test('Placeholder locator', async ({ page }) => {
  await page.setContent(`<input placeholder="Search">`);

  const input = page.getByPlaceholder('Search');
  await input.fill('Playwright');

  await expect(input).toHaveValue('Playwright');
});
