import { test, expect } from '@playwright/test';

test('Capture full page screenshot', async ({page})=>
 {
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    await expect(page.getByText('Broken Images')).toBeVisible();
    await page.screenshot({ path: 'full-page.png' });
 
 });

 test('Capture element screenshot', async ({page})=>
 {
    await page.goto('https://the-internet.herokuapp.com/context_menu');
    await page.locator('#hot-spot').screenshot({ path: 'element-image.png' });
 
 });