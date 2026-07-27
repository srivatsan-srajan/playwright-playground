import { test, expect } from '@playwright/test';

test('filter()', async ({ page }) => {
  page.goto('https://rahulshettyacademy.com/angularpractice/shop');

  await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();

  
});
