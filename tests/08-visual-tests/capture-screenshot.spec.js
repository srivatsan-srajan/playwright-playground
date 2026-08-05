import { test, expect } from '@playwright/test';

test('Capture full page screenshot', async ({page})=>
 {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    await expect(page.getByText('Broken Images')).toBeVisible();
    await page.screenshot({ path: 'images/screenshots/full-page.png', fullPage: true });
 
 });

 test('Capture visible viewport screenshot', async ({page})=>
 {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    await expect(page.getByText('Broken Images')).toBeVisible();
    await page.screenshot({ path: 'images/screenshots/viewport-page.png' });
 
 });

 test('Capture element screenshot', async ({page})=>
 {
    await page.goto('https://the-internet.herokuapp.com/context_menu');
    await expect(page.locator('#hot-spot')).toBeVisible();
    await page.locator('#hot-spot').screenshot({ path: 'images/screenshots/element-image.png' });
 
 });