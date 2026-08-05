import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {

  test('Successful login @smoke @regression', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/secure/);
    await expect(page.locator('#flash'))
      .toContainText('You logged into a secure area!');
  });

  test('Invalid password @regression', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash'))
      .toContainText('Your password is invalid!');
  });

  test('Invalid username @sanity', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('invalidUser');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash'))
      .toContainText('Your username is invalid!');
  });

  test('Logout after successful login @smoke', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/login/);
    await expect(page.locator('#flash'))
      .toContainText('You logged out of the secure area!');
  });

});