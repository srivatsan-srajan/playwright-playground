/**
 * Recipe: Successful Login
 * Concepts: Navigation, Authentication, Checkboxes, Assertions, Lists
 * Application: Rahul Shetty Academy - Login Practice
 */

const { test, expect } = require("@playwright/test");

test("Successful Login", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator('#password').fill("Learning@830$3mK2");
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    await expect(page.getByText('Samsung')).toBeVisible();
});