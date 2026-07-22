import { test, expect } from '@playwright/test';

test('independent browser contexts', async ({ browser }) => {

  const admin = await browser.newContext();
  const customer = await browser.newContext();

  const adminPage = await admin.newPage();
  const customerPage = await customer.newPage();

  await adminPage.goto('https://example.com');
  await customerPage.goto('https://playwright.dev/');

  await expect(adminPage).toHaveTitle(/Example/);
  await expect(customerPage).toHaveTitle(/Playwright/);

  await admin.close();
  await customer.close();

});

/*
Useful for:
- multi-user workflows
- permission testing
- isolated cookies
*/
