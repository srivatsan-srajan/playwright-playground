import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {

  test('Successful login @smoke @regression', async ({ page }) => {
    await page.goto('https://example.com/login');

    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);
  });

  test('Invalid password @regression', async ({ page }) => {
    await page.goto('https://example.com/login');

    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Password').fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Forgot Password @smoke', async ({ page }) => {
    await page.goto('https://example.com/login');

    await page.getByRole('link', { name: 'Forgot Password?' }).click();

    await expect(page).toHaveURL(/forgot-password/);
  });

  test('Create new account @sanity @regression', async ({ page }) => {
    await page.goto('https://example.com/register');

    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Password').fill('Password123');

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL(/welcome/);
  });

});