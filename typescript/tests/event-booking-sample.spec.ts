import { test, expect, Locator, Page } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

interface User {
    email: string;
    password: string;
}

interface Booking {
    customerName: string;
    email: string;
    phone: string;
    tickets: number;
}

interface EventTemplate {
    title?: string;
    description: string;
    city: string;
    venue: string;
    date: string;
    price: string;
    seats: string;
}

const USER: User = {
    email: process.env.EVENT_EMAIL!,
    password: process.env.EVENT_PASSWORD!
};

const BOOKING: Booking = {
    customerName: 'Test Student',
    email: 'test.student@example.com',
    phone: '9876543210',
    tickets: 1
};

const EVENT_TEMPLATE: EventTemplate = {
    description: 'Playwright test event',
    city: 'Test City',
    venue: 'Test Venue',
    date: '2027-12-31T10:00',
    price: '100',
    seats: '50'
};

async function login(page: Page): Promise<void> {

    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(USER.email);
    await page.getByLabel('Password').fill(USER.password);

    await page.locator('#login-btn').click();

    await expect(
        page.getByRole('link', {
            name: 'Browse Events →'
        })
    ).toBeVisible();

}

async function findEventCard(
    page: Page,
    title: string
): Promise<Locator> {

    const cards = page.getByTestId('event-card');

    await expect(cards.first()).toBeVisible();

    const card = cards.filter({
        hasText: title
    }).first();

    await expect(card).toBeVisible();

    return card;

}

async function getAvailableSeats(
    card: Locator
): Promise<number> {

    return Number(
        await card
            .getByText('seat')
            .first()
            .innerText()
    );

}

test.describe('Event Booking', () => {

    test(
        'should create an event, book it and verify seat reduction',
        async ({ page }) => {

            expect(USER.email).toBeTruthy();
            expect(USER.password).toBeTruthy();

            const event: EventTemplate = {
                ...EVENT_TEMPLATE,
                title: `Test Event ${Date.now()}`
            };

            let bookingReference = '';
            let seatsBefore = 0;

            await test.step('Login', async () => {

                await login(page);

            });

            await test.step('Create event', async () => {

                await page.goto(`${BASE_URL}/admin/events`);

                await page.locator('#event-title-input').fill(event.title!);
                await page.locator('#admin-event-form textarea').fill(event.description);
                await page.getByLabel('City').fill(event.city);
                await page.getByLabel('Venue').fill(event.venue);
                await page.getByLabel('Event Date & Time').fill(event.date);
                await page.getByLabel('Price ($)').fill(event.price);
                await page.getByLabel('Total Seats').fill(event.seats);

                await page.locator('#add-event-btn').click();

                await expect(
                    page.getByText('Event created!')
                ).toBeVisible();

            });

            await test.step('Book event', async () => {

                await page.goto(`${BASE_URL}/events`);

                const card = await findEventCard(
                    page,
                    event.title!
                );

                seatsBefore = await getAvailableSeats(card);

                await card
                    .getByTestId('book-now-btn')
                    .click();

                await expect(
                    page.locator('#ticket-count')
                ).toHaveText(
                    String(BOOKING.tickets)
                );

                await page.getByLabel('Full Name')
                    .fill(BOOKING.customerName);

                await page.locator('#customer-email')
                    .fill(BOOKING.email);

                await page.getByPlaceholder('+91 98765 43210')
                    .fill(BOOKING.phone);

                await page.locator('.confirm-booking-btn')
                    .click();

                const reference = page
                    .locator('.booking-ref')
                    .first();

                await expect(reference).toBeVisible();

                bookingReference =
                    (await reference.innerText()).trim();

                expect(bookingReference).not.toEqual('');

            });

            await test.step('Verify booking', async () => {

                await page.getByRole('link', {
                    name: 'View My Bookings'
                }).click();

                await expect(page).toHaveURL(
                    `${BASE_URL}/bookings`
                );

                const bookingCard =
                    page.locator('#booking-card')
                        .filter({
                            has: page.locator(
                                '.booking-ref',
                                {
                                    hasText: bookingReference
                                }
                            )
                        });

                await expect(bookingCard)
                    .toContainText(event.title!);

            });

            await test.step('Verify seat reduction', async () => {

                await page.goto(`${BASE_URL}/events`);

                const card = await findEventCard(
                    page,
                    event.title!
                );

                const seatsAfter =
                    await getAvailableSeats(card);

                expect(seatsAfter)
                    .toBe(
                        seatsBefore - BOOKING.tickets
                    );

            });

        });

});