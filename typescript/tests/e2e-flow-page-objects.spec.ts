import { test, expect } from '@playwright/test';

import { POManager } from '../pages/POManager';

test.describe('End-to-End Order Flow', () => {

    test('should place an order successfully', async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const ordersReviewPage = poManager.getOrdersReviewPage();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();

        const email = process.env.EMAIL!;
        const password = process.env.PASSWORD!;

        const PRODUCT_NAME = 'ADIDAS ORIGINAL';

        await test.step('Login to the application', async () => {

            await loginPage.goto();
            await loginPage.login(email, password);

        });

        await test.step('Add product to cart', async () => {

            await dashboardPage.addProductToCart(PRODUCT_NAME);
            await dashboardPage.navigateToCart();

        });

        await test.step('Verify cart and checkout', async () => {

            await cartPage.verifyProductIsDisplayed(PRODUCT_NAME);
            await cartPage.checkout();

        });

        await test.step('Review and submit order', async () => {

            await ordersReviewPage.searchCountryAndSelect(
                'ind',
                'India'
            );

        });

        const orderId = await ordersReviewPage.submitAndGetOrderId();

        await test.step('Verify order history', async () => {

            await dashboardPage.navigateToOrders();

            await ordersHistoryPage.openOrder(orderId);

            expect(
                orderId.includes(
                    await ordersHistoryPage.getOrderId()
                )
            ).toBeTruthy();

        });

    });

});