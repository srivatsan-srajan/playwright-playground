import { test, expect } from '@playwright/test';

test('Click OK alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toContainText('You successfully clicked an alert');
});

test('Click Accept alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toContainText('You clicked: Ok');
});

test('Click Deny alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.once('dialog', dialog => dialog.dismiss());
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toContainText('You clicked: Cancel');
});

test('Click Prompt alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    await page.once('dialog', dialog => dialog.message('Hello, World!'));
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toContainText('You entered: Hello, World!');

    await page.once('dialog', dialog => dialog.dismiss());
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toContainText('You entered: null');
});