import { test, expect } from '@playwright/test';

test('Handle iFrame', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/frames');
    await page.getByRole('link', { name: 'iFrame' }).click();

    const iframe = page.frameLocator('iframe[title="Rich Text Area"]');
    await page.on('dialog', dialog => dialog.dismiss());
    await page.getByRole('button', {'name':"Close"}).click();
    await frame.locator('#tinymce').fill('Hello Playwright!');

    
});