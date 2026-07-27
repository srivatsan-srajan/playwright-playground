import { test, expect } from '@playwright/test';
import { assert } from 'node:console';

test('Label locators', async ({ page }) => {
let pageURL = "https://rahulshettyacademy.com/angularpractice/";

await page.goto(pageURL);

// identify a component by label and intelligently click it 

// checkbox & radio
await page.getByLabel("Check me out if you Love IceCreams!").check();
await page.getByLabel("Student").check();

// identify drodown by label and selectOption
await page.getByLabel("Gender").selectOption("Male");

// verify selection
await expect(page.getByLabel("Check me out if you Love IceCreams!")).toBeChecked();
await expect (page.getByLabel("Student")).toBeChecked();
await expect(page.getByLabel("Gender")).toHaveValue("Male");
  
});

/**
 *  getByLabel is not efficient for ui controls that need to be typed in to, like textBoxes
 * apply when click action is involved on the resultant component
 */
