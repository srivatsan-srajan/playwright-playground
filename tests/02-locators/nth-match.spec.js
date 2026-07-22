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

test('nth()', async ({ page }) => {
  await page.setContent('<ul><li>One</li><li>Two</li><li>Three</li></ul>');

  await expect(page.locator('li').nth(1)).toHaveText('Two');
});
