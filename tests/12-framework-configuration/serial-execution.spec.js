import { test, expect } from '@playwright/test';

test.describe.serial('Serial execution', () => {

    test('Home', async ({ page }) => {
        await page.goto('https://playwright.dev');
        await expect(page).toHaveTitle(/Playwright/);
    });

    test('Docs', async ({ page }) => {
        await page.goto('https://playwright.dev/docs/intro');
        await expect(page).toHaveURL(/docs\/intro/);
    });

    test('API', async ({ page }) => {
        await page.goto('https://playwright.dev/docs/api/class-page');
        await expect(page).toHaveURL(/class-page/);
    });

});