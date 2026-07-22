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

test('TestId locator', async ({ page }) => {
  await page.setContent(`<button data-testid="save-btn">Save</button>`);

  await expect(page.getByTestId('save-btn')).toHaveText('Save');
});
