import { test, expect } from '@playwright/test';

test('verify Example Domain', async ({ page }) => {

  await page.goto('https://example.com');

  await expect(page).toHaveURL(/example\.com/);
  await expect(page).toHaveTitle(/Example Domain/);

  const heading = page.getByRole('heading', { name: 'Example Domain' });
  await expect(heading).toBeVisible();

  await expect(page.locator('p').first()).toContainText('illustrative');

});
