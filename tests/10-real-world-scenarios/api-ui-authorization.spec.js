
import { test, expect } from '@playwright/test';

/**
 * Recipe: Authorization Validation (API + UI)
 * Difficulty: Advanced
 *
 * Concepts:
 * - API-assisted UI testing
 * - APIRequestContext
 * - Authorization validation
 * - Cross-user security testing
 * - test.step()
 */

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';

const USERS = {
  yahoo: {
    email: 'Use your own credentials - 1',
    password: ''
  },
  gmail: {
    email: 'Use your own credentials - 2',
    password: ''
  }
};

const CUSTOMER = {
  phone: '9999999999'
};

async function loginUI(page, user) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

async function loginAPI(request, user) {
  const response = await request.post(`${API_URL}/auth/login`, {
    data: { email: user.email, password: user.password }
  });

  expect(response.status()).toBe(200);
  return (await response.json()).token;
}

async function getFirstEventId(request, token) {
  const response = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  expect(response.status()).toBe(200);

  const json = await response.json();
  return json.data[0].id;
}

async function createBooking(request, token, eventId, user) {
  const response = await request.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId,
      customerName: 'Yahoo User',
      customerEmail: user.email,
      customerPhone: CUSTOMER.phone,
      quantity: 1
    }
  });

  expect(response.status()).toBe(200);

  return (await response.json()).data.id;
}

async function verifyAccessDenied(page) {
  await expect(page.getByText('Access Denied')).toBeVisible();
  await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
}

test.describe('Booking Authorization', () => {

  test('should deny access when a user views another user\'s booking', async ({ page, request }) => {

    let bookingId;

    await test.step('Create booking via API as Yahoo user', async () => {
      const token = await loginAPI(request, USERS.yahoo);
      const eventId = await getFirstEventId(request, token);
      bookingId = await createBooking(request, token, eventId, USERS.yahoo);
    });

    await test.step('Login via UI as Gmail user', async () => {
      await loginUI(page, USERS.gmail);
    });

    await test.step('Open Yahoo booking directly', async () => {
      await page.goto(`${BASE_URL}/bookings/${bookingId}`, {
        waitUntil: 'networkidle'
      });
    });

    await test.step('Verify authorization is denied', async () => {
      await verifyAccessDenied(page);
    });

  });

});
