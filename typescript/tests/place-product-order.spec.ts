import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/client';

test.describe('Place Product Order', () => {

    test('should place an order successfully', async ({ page }) => {

        const email = process.env.EMAIL!;
        const password = process.env.PASSWORD!;

        const PRODUCT_NAME = 'ZARA COAT 3';

        await page.goto(BASE_URL);

        await page
            .getByPlaceholder('email@example.com')
            .fill(email);

        await page
            .getByPlaceholder('enter your passsword')
            .fill(password);

        await page
            .getByRole('button', { name: 'Login' })
            .click();

        await expect(
            page.locator('.card-body').first()
        ).toBeVisible();

        await page
            .locator('.card-body')
            .filter({
                hasText: PRODUCT_NAME
            })
            .getByRole('button', {
                name: 'Add to Cart'
            })
            .click();

        await page
            .getByRole('listitem')
            .getByRole('button', {
                name: 'Cart'
            })
            .click();

        await expect(
            page.getByText(PRODUCT_NAME)
        ).toBeVisible();

        await page
            .getByRole('button', {
                name: 'Checkout'
            })
            .click();

        await page
            .getByPlaceholder('Select Country')
            .pressSequentially('ind');

        await page
            .getByRole('button', {
                name: 'India'
            })
            .nth(1)
            .click();

        await page
            .getByText('PLACE ORDER')
            .click();

        await expect(
            page.getByText('Thankyou for the order.')
        ).toBeVisible();

    });

});