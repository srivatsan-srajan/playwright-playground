import { test, expect } from '@playwright/test';

// Recipe: Conditional Banner using Network Mocking

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const USER = {
  email: process.env.EVENT_EMAIL,
  password: process.env.EVENT_PASSWORD
  };

function createEvent(id) {
  return {
    id,
    title: `Sample Event ${id}`,
    category: 'Conference',
    eventDate: '2027-01-01T10:00:00.000Z',
    venue: `Venue ${id}`,
    city: 'Bangalore',
    price: '999',
    totalSeats: 100,
    availableSeats: 80,
    imageUrl: null,
    isStatic: false
  };
}

function buildEventsResponse(count) {
  return {
    data: Array.from({ length: count }, (_, i) => createEvent(i + 1)),
    pagination: { page: 1, totalPages: 1, total: count, limit: 12 }
  };
}

async function mockEvents(page, count) {
  await page.route('**/api/events**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildEventsResponse(count))
    });
  });
}

async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill(USER.email);
  await page.getByLabel('Password').fill(USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

async function verifyEventCount(page, count) {
  const cards = page.getByTestId('event-card');
  await page.goto(`${BASE_URL}/events`);
  await expect(cards.first()).toBeVisible();
  await expect(cards).toHaveCount(count);
}

async function verifyBanner(page, visible) {
  const banner = page.getByText(/sandbox holds up to/i);
  if (visible) {
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('9 bookings');
  } else {
    await expect(banner).toBeHidden();
  }
}

test.describe('Conditional Sandbox Banner', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display banner when six events are returned', async ({ page }) => {
    await test.step('Mock API', async () => { await mockEvents(page, 6); });
    await test.step('Verify cards', async () => { await verifyEventCount(page, 6); });
    await test.step('Verify banner', async () => { await verifyBanner(page, true); });
  });

  test('should hide banner when four events are returned', async ({ page }) => {
    await test.step('Mock API', async () => { await mockEvents(page, 4); });
    await test.step('Verify cards', async () => { await verifyEventCount(page, 4); });
    await test.step('Verify banner', async () => { await verifyBanner(page, false); });
  });

});