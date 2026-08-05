import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/client';
const INVALID_ORDER_ID = '621661f884b053f6765465b6'; // Order belonging to another user

test('@QW Security - Request Interception', async ({ page }) => {

    const userEmail = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // Validate environment variables
    expect(userEmail).toBeTruthy();
    expect(password).toBeTruthy();

    // Login
    await page.goto(BASE_URL);

    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill(password);
    await page.locator("[value='Login']").click();

    // Wait for dashboard to load
    await expect(
        page.locator('.card-body').first()
    ).toBeVisible();

    // Navigate to Orders
    await page.locator("button[routerlink*='myorders']").click();

    // Intercept the request and replace the order id
    await page.route(
        '**/api/ecom/order/get-orders-details?id=*',
        async route => {
            await route.continue({
                url: `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${INVALID_ORDER_ID}`
            });
        }
    );

    // Attempt to view the order
    await page.getByRole('button', { name: 'View' }).first().click();

    // Verify authorization failure
    await expect(
        page.getByText('You are not authorize to view this order')
    ).toBeVisible();

});