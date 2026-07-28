import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const USER = {
  email: 'rahulshetty1@gmail.com',
  password: 'Magiclife1!'
};

const CUSTOMER = {
  name: 'Test User',
  email: USER.email,
  phone: '9999999999'
};

async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill(USER.email);
  await page.getByPlaceholder('••••••').fill(USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

async function createBooking(page, tickets = 1) {
  await page.goto(`${BASE_URL}/events`);
  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();

  for (let i = 1; i < tickets; i++) {
    await page.getByRole('button', { name: '+' }).click();
  }

  await page.getByLabel('Full Name').fill(CUSTOMER.name);
  await page.locator('#customer-email').fill(CUSTOMER.email);
  await page.getByPlaceholder('+91 98765 43210').fill(CUSTOMER.phone);
  await page.locator('.confirm-booking-btn').click();
}

async function openLatestBooking(page) {
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();
}

async function verifyRefund(page, title, message) {
  await page.locator('#check-refund-btn').click();

  const spinner = page.locator('#refund-spinner');
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });

  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText(title);
  await expect(result).toContainText(message);
}

test.describe('Refund Eligibility', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display refund eligibility for a single-ticket booking', async ({ page }) => {
    await test.step('Create booking', async () => {
      await createBooking(page, 1);
    });

    await test.step('Verify refund eligibility', async () => {
      await openLatestBooking(page);
      await verifyRefund(
        page,
        'Eligible for refund',
        'Single-ticket bookings qualify for a full refund'
      );
    });
  });

  test('should display refund ineligibility for a three-ticket booking', async ({ page }) => {
    await test.step('Create booking', async () => {
      await createBooking(page, 3);
    });

    await test.step('Verify refund ineligibility', async () => {
      await openLatestBooking(page);
      await verifyRefund(
        page,
        'Not eligible for refund',
        'Group bookings (3 tickets) are non-refundable'
      );
    });
  });

});