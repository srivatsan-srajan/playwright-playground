const { test, expect } = require('@playwright/test');

test('Local timeout', async ({ page }) => {
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // wait and assert the error message is visible
  await expect(page.getByText('credentials invalid')).toBeVisible({ timeout: 30_000 });
});

test('Custom expect timeout', async ({ page }) => {
  const customExpect = expect.configure({ timeout: 30_000 });
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // wait and assert the error message is visible
  await customExpect(page.getByText('credentials invalid')).toBeVisible();
});

test('Test level timeout', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // wait and assert the error message is visible
  await expect(page.getByText('credentials invalid')).toBeVisible();
});

/**
 * Globally, timeouts can be set in playwright.config.js file.
 * 
 * - timeout
 * - expect.timeout
 * - actionTimeout
 * - navigationTimeout
 * 
 * Local timeouts can be set in the test file itself, as shown above.
 * 
 * The local assertion timeout overrides the configured expect timeout for that specific assertion.
 * 
 */