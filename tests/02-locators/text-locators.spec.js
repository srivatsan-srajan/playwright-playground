import { test, expect } from '@playwright/test';

test('Text locator', async ({ page }) => {
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // wait and assert the error message is visible
  await expect(
    page.getByText('credentials invalid')
  ).toBeVisible();
});

/**
 * Usually used for on the fly text messages, like error messages, success messages, etc. 
 */