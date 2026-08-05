const { test, expect } = require('@playwright/test');

test('Assert visible', async ({ page }) => {
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // wait and assert the error message is visible
  // add a wait for the error message to appear, as it may take some time to show up

  // see text-locator.spec.js for a different approach to wait for the error message to appear
  await expect(page.getByText('credentials invalid')).toBeVisible({ timeout: 30_000 });
});

/**
 * Usually used for on the fly text messages, like error messages, success messages, etc. 
 */