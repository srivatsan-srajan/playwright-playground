import { test, expect } from '@playwright/test';


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
    await expect(page.getByLabel("Student")).toBeChecked();
    await expect(page.getByLabel("Gender")).toHaveValue("Male");

});

/**
 *  getByLabel() is primarily intended for form controls associated with accessible labels. 
 *  For text fields, it works well when the input has a proper <label> association.
 */
