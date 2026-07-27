import { test, expect } from '@playwright/test';

test('TestId locator', async ({ page }) => {
  await page.setContent(`<button data-testid="save-btn">Save</button>`);

  await expect(page.getByTestId('save-btn')).toHaveText('Save');
});
