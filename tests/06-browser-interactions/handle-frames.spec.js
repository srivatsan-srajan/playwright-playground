import { test, expect } from '@playwright/test';

test('Handle iFrame - RahulShetty', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const iframe = page.frameLocator('#courses-iframe');
    await expect(iframe.getByRole('link', { 'name': "Login" })).toBeVisible();
  
});

test('Handle iFrame - HeroKuApp', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/iframe');
    const iframe = page.frameLocator('#mce_0_ifr');
    await expect(iframe.getByRole('paragraph')).toHaveText('Your content goes here.');

});