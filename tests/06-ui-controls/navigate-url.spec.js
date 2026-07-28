import { test, expect } from '@playwright/test';

test('Navigate to URL', async ({ page }) => {
  await page.goto('https://google.com');
  await page.goto('https://github.com');
  await page.goBack();

  await expect(page).toHaveURL(/google/);

  await page.goForward();
  await expect(page).toHaveURL(/github/);


  
});