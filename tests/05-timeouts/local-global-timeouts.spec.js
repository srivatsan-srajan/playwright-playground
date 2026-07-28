const { test, expect } = require('@playwright/test');

test('Local timeout', async ({ page }) => {
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // wait and assert the error message is visible
   await expect(page.getByText('credentials invalid')).toBeVisible({timeout: 30_000});
});

test('Custom expect timeout', async ({ page }) => {
  const extendExpect = expect.configure({ timeout: 30_000 });
  await page.goto('https://demo.realworld.show/login');

  // supply invalid credentials to generate the error message
  await page.getByPlaceholder('Email').fill('sadadsa');
  await page.getByPlaceholder('Password').fill('sadadsa');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // wait and assert the error message is visible
   await extendExpect(page.getByText('credentials invalid')).toBeVisible();
});

test('Test level timeout', async ({ page }) => {
  test.setTimeout
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
 * - navigationTimeout
 * - actionTimeout
 * - expectTimeout
 * - overall execution timeout
 * 
 * Local timeouts can be set in the test file itself, as shown above.
 * 
 * The local timeout will override the global timeout for that specific test.
 * 
 */