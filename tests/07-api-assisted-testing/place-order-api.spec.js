import { test, expect, request } from '@playwright/test';
import { ApiUtils } from './api-utils.js';

const BASE_URL = 'https://rahulshettyacademy.com/client';
const PRODUCT_NAME = 'ZARA COAT 3';

const loginPayload = {
    userEmail: process.env.EMAIL,
    userPassword: process.env.PASSWORD
};

let orderResponse;

test.beforeAll(async () => {
    expect(loginPayload.userEmail).toBeTruthy();
    expect(loginPayload.userPassword).toBeTruthy();

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);

    orderResponse = await apiUtils.createOrder(PRODUCT_NAME);
});

test('@API Place the Order', async ({ page }) => {

    // Inject the authentication token before the application loads.
    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, orderResponse.token);

    await page.goto(BASE_URL);

    await page.locator("button[routerlink*='myorders']").click();

    await expect(
        page.locator('tbody')
    ).toBeVisible();

    const rows = page.locator('tbody tr');

    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderId = await rows
            .nth(i)
            .locator('th')
            .textContent();

        if (rowOrderId?.includes(orderResponse.orderId)) {

            await rows
                .nth(i)
                .getByRole('button', { name: 'View' })
                .click();

            break;
        }
    }

    await expect(
        page.locator('.col-text')
    ).toContainText(orderResponse.orderId);

});