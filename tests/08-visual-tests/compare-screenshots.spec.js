import { test, expect } from '@playwright/test';

// this test is designed to fail, to demonstrate the screenshot comparison feature of Playwright
test('Visual comparison - expected failure example', async ({page})=>
 {
    await page.goto('https://flightaware.com/');
    await expect(page).toHaveURL(/flightaware/);
    expect(await page.screenshot()).toMatchSnapshot('images/screenshots/baseline.png');
 
 });