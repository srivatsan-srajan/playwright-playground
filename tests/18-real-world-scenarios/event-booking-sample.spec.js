import { test, expect } from '@playwright/test';

/**
 * Recipe: Create, Book & Verify Event
 * Category: Real World Scenarios
 * Demonstrates:
 *  - test.step()
 *  - Dynamic test data
 *  - Reusable helper functions
 *  - Business workflow validation
 *  - Locator best practices
 */

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const USER = {
  email: 'foo@bar.com',
  password: 'Foob@r123'
};

const BOOKING = {
  customerName: 'Test Student',
  email: 'test.student@example.com',
  phone: '9876543210',
  tickets: 1
};

const EVENT_TEMPLATE = {
  description: 'Playwright test event',
  city: 'Test City',
  venue: 'Test Venue',
  date: '2027-12-31T10:00',
  price: '100',
  seats: '50'
};

async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(USER.email);
  await page.getByLabel('Password').fill(USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

async function findEventCard(page, title) {
  const cards = page.getByTestId('event-card');
  await expect(cards.first()).toBeVisible();
  const card = cards.filter({ hasText: title }).first();
  await expect(card).toBeVisible();
  return card;
}

async function getAvailableSeats(card) {
  return Number(await card.getByText('seat').first().innerText());
}

test('Create event, book it and verify seat reduction', async ({ page }) => {
  const event = { ...EVENT_TEMPLATE, title: `Test Event ${Date.now()}` };
  let bookingRef;
  let seatsBefore;

  await test.step('Login', async () => {
    await login(page);
  });

  await test.step('Create Event', async () => {
    await page.goto(`${BASE_URL}/admin/events`);
    await page.locator('#event-title-input').fill(event.title);
    await page.locator('#admin-event-form textarea').fill(event.description);
    await page.getByLabel('City').fill(event.city);
    await page.getByLabel('Venue').fill(event.venue);
    await page.getByLabel('Event Date & Time').fill(event.date);
    await page.getByLabel('Price ($)').fill(event.price);
    await page.getByLabel('Total Seats').fill(event.seats);
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();
  });

  await test.step('Book Event', async () => {
    await page.goto(`${BASE_URL}/events`);
    const card = await findEventCard(page, event.title);
    seatsBefore = await getAvailableSeats(card);
    await card.getByTestId('book-now-btn').click();

    await expect(page.locator('#ticket-count')).toHaveText(String(BOOKING.tickets));
    await page.getByLabel('Full Name').fill(BOOKING.customerName);
    await page.locator('#customer-email').fill(BOOKING.email);
    await page.getByPlaceholder('+91 98765 43210').fill(BOOKING.phone);
    await page.locator('.confirm-booking-btn').click();

    const ref = page.locator('.booking-ref').first();
    await expect(ref).toBeVisible();
    bookingRef = (await ref.innerText()).trim();
    expect(bookingRef).not.toEqual('');
  });

  await test.step('Verify Booking', async () => {
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const bookingCards = page.locator('#booking-card');
    const card = bookingCards.filter({
      has: page.locator('.booking-ref', { hasText: bookingRef })
    });
    await expect(card).toContainText(event.title);
  });

  await test.step('Verify Seat Reduction', async () => {
    await page.goto(`${BASE_URL}/events`);
    const card = await findEventCard(page, event.title);
    const seatsAfter = await getAvailableSeats(card);
    expect(seatsAfter).toBe(seatsBefore - BOOKING.tickets);
  });
});