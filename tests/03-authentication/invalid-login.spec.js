/**
 * Recipe: Invalid Login
 * Concepts: Navigation, Textboxes, Assertions, Error Validation
 * Application: Rahul Shetty Login Practice
 */

const {test, expect} = require("@playwright/test");

test("Invalid Login", async ({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await page.locator('#username').fill("rahulshettyacademy");
await page.locator('#password').fill("wrongpassword");
await page.locator('#signInBtn').click();
let error = await page.locator("[style*='block']").textContent();
await expect(error).toBe("Incorrect username/password.");
});