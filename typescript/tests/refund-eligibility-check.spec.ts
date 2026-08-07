import { test, expect, Locator, Page } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

interface User {
    email: string;
    password: string;
}

interface Customer {
    name: string;
    email: string;
    phone: string;
}

const USER: User = {
    email: process.env.EVENT_EMAIL!,
    password: process.env.EVENT_PASSWORD!
};

const CUSTOMER: Customer = {
    name: 'Test User',
    email: USER.email,
    phone: '9999999999'
};

async function login(page: Page): Promise<void> {

    expect(USER.email).toBeTruthy();
    expect(USER.password).toBeTruthy();

    await page.goto(`${BASE_URL}/login`);

    await page.getByLabel('Email').fill(USER.email);
    await page.getByPlaceholder('••••••').fill(USER.password);

    await page.locator('#login-btn').click();

    await expect(
        page.getByRole('link', {
            name: 'Browse Events →'
        })
    ).toBeVisible();

}

async function createBooking(
    page: Page,
    tickets = 1
): Promise<void> {

    await page.goto(`${BASE_URL}/events`);

    const bookNowButton = page
        .getByTestId('book-now-btn')
        .filter({
            hasText: 'Book Now'
        })
        .first();

    await expect(bookNowButton).toBeVisible();
    await expect(bookNowButton).toBeEnabled();

    await bookNowButton.click();

    await expect(
        page.getByLabel('Full Name')
    ).toBeVisible();

    const incrementButton =
        page.getByRole('button', {
            name: '+'
        });

    for (let i = 1; i < tickets; i++) {

        await incrementButton.click();

        await expect(
            incrementButton
        ).toBeEnabled();

    }

    await page
        .getByLabel('Full Name')
        .fill(CUSTOMER.name);

    await page
        .locator('#customer-email')
        .fill(CUSTOMER.email);

    await page
        .getByPlaceholder('+91 98765 43210')
        .fill(CUSTOMER.phone);

    await page
        .locator('.confirm-booking-btn')
        .click();

    await expect(
        page.getByRole('link', {
            name: 'View My Bookings'
        })
    ).toBeVisible();

}

async function openLatestBooking(
    page: Page
): Promise<void> {

    await page
        .getByRole('link', {
            name: 'View My Bookings'
        })
        .click();

    await expect(page)
        .toHaveURL(`${BASE_URL}/bookings`);

    await page
        .getByRole('link', {
            name: 'View Details'
        })
        .first()
        .click();

    await expect(
        page.getByText(
            'Booking Information'
        )
    ).toBeVisible();

}

async function verifyRefund(
    page: Page,
    expectedTitle: string,
    expectedMessage: string
): Promise<void> {

    await page
        .locator('#check-refund-btn')
        .click();

    const spinner =
        page.locator('#refund-spinner');

    await expect(spinner).toBeVisible();

    await expect(spinner)
        .toBeHidden({
            timeout: 6000
        });

    const result =
        page.locator('#refund-result');

    await expect(result).toBeVisible();

    await expect(result)
        .toContainText(expectedTitle);

    await expect(result)
        .toContainText(expectedMessage);

}

test.describe('Refund Eligibility', () => {

    test.beforeEach(async ({ page }) => {

        await login(page);

    });

    test(
        'should display refund eligibility for a single-ticket booking',
        async ({ page }) => {

            await test.step(
                'Create booking',
                async () => {
                    await createBooking(page, 1);
                }
            );

            await test.step(
                'Verify refund eligibility',
                async () => {

                    await openLatestBooking(page);

                    await verifyRefund(
                        page,
                        'Eligible for refund',
                        'Single-ticket bookings qualify for a full refund'
                    );

                }
            );

        });

    test(
        'should display refund ineligibility for a three-ticket booking',
        async ({ page }) => {

            await test.step(
                'Create booking',
                async () => {
                    await createBooking(page, 3);
                }
            );

            await test.step(
                'Verify refund ineligibility',
                async () => {

                    await openLatestBooking(page);

                    await verifyRefund(
                        page,
                        'Not eligible for refund',
                        'Group bookings (3 tickets) are non-refundable'
                    );

                }
            );

        });

});