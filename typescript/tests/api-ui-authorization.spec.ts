import { test, expect, APIRequestContext, Page } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

interface User {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface EventResponse {
    data: {
        id: string;
    }[];
}

interface BookingResponse {
    data: {
        id: string;
    };
}

const USERS: Record<'yahoo' | 'gmail', User> = {
    yahoo: {
        email: process.env.EVENT_EMAIL_USER1!,
        password: process.env.EVENT_PASSWORD_USER1!
    },
    gmail: {
        email: process.env.EVENT_EMAIL_USER2!,
        password: process.env.EVENT_PASSWORD_USER2!
    }
};

const CUSTOMER_PHONE = '9999999999';

async function loginUI(page: Page, user: User): Promise<void> {

    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByLabel('Password').fill(user.password);

    await page.locator('#login-btn').click();

    await expect(
        page.getByRole('link', { name: 'Browse Events →' })
    ).toBeVisible();
}

async function loginAPI(
    request: APIRequestContext,
    user: User
): Promise<string> {

    const response = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: user.email,
            password: user.password
        }
    });

    expect(response.status()).toBe(200);

    const json: LoginResponse = await response.json();

    return json.token;
}

async function getFirstEventId(
    request: APIRequestContext,
    token: string
): Promise<string> {

    const response = await request.get(`${API_URL}/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    expect(response.status()).toBe(200);

    const json: EventResponse = await response.json();

    return json.data[0].id;
}

async function createBooking(
    request: APIRequestContext,
    token: string,
    eventId: string,
    user: User
): Promise<string> {

    const response = await request.post(`${API_URL}/bookings`, {

        headers: {
            Authorization: `Bearer ${token}`
        },

        data: {
            eventId,
            customerName: 'Yahoo User',
            customerEmail: user.email,
            customerPhone: CUSTOMER_PHONE,
            quantity: 1
        }

    });

    expect(response.status()).toBe(201);

    const json: BookingResponse = await response.json();

    return json.data.id;
}

async function verifyAccessDenied(page: Page): Promise<void> {

    await expect(
        page.getByText('Access Denied')
    ).toBeVisible();

    await expect(
        page.getByText(
            'You are not authorized to view this booking'
        )
    ).toBeVisible();
}

test.describe('Booking Authorization', () => {

    test.beforeAll(() => {

        expect(USERS.yahoo.email).toBeTruthy();
        expect(USERS.yahoo.password).toBeTruthy();

        expect(USERS.gmail.email).toBeTruthy();
        expect(USERS.gmail.password).toBeTruthy();

    });

    test(
        'should deny access when a user views another user\'s booking',
        async ({ page, request }) => {

            let bookingId = '';

            await test.step(
                'Create booking via API as Yahoo user',
                async () => {

                    const token = await loginAPI(
                        request,
                        USERS.yahoo
                    );

                    const eventId =
                        await getFirstEventId(
                            request,
                            token
                        );

                    bookingId =
                        await createBooking(
                            request,
                            token,
                            eventId,
                            USERS.yahoo
                        );
                }
            );

            await test.step(
                'Login via UI as Gmail user',
                async () => {
                    await loginUI(
                        page,
                        USERS.gmail
                    );
                }
            );

            await test.step(
                'Attempt to open Yahoo booking',
                async () => {

                    await page.goto(
                        `${BASE_URL}/bookings/${bookingId}`,
                        {
                            waitUntil: 'networkidle'
                        }
                    );

                }
            );

            await test.step(
                'Verify authorization is denied',
                async () => {
                    await verifyAccessDenied(page);
                }
            );

        });

});