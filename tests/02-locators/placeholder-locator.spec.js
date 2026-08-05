import { test, expect } from '@playwright/test';

test('Placeholder locator', async ({ page }) => {
  await page.goto('https://demo.realworld.show/login');

  const input = page.getByPlaceholder('Email');
  await input.fill('foo@bar.com');

  await expect(input).toHaveValue('foo@bar.com');
});

/**
 * DOM should support placeholder attribute for this test to work. 
 */