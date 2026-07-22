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

test('filter()', async ({ page }) => {
  await page.setContent('<button>Save</button><button>Cancel</button>');

  const save = page.getByRole('button').filter({ hasText: 'Save' });

  await expect(save).toBeVisible();
});
