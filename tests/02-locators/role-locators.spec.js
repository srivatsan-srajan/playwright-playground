import { test, expect } from '@playwright/test';

test('Role Locators 1', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // get all images on the page
  const images = page.getByRole('img');
  for (const image of await images.all()) {
    console.log(await image.getAttribute('alt'));
  }
  await expect(images).toHaveCount(20);

});

test('Role Locators 2', async ({ page }) => {
   // locate a tag by link and click it
  await page.goto('https://demo.realworld.show/');
  await page.getByRole('link', { name: 'ai', exact: true }).click();
  
  
});

/*
Preferred locator in modern Playwright because it uses accessibility semantics.
*/
