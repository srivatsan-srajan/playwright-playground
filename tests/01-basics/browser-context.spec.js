import { test, expect } from '@playwright/test';

test('independent browser contexts', async ({ browser }) => {

  const adminContext = await browser.newContext();
  const customerContext = await browser.newContext();

  const adminPage = await adminContext.newPage();
  const customerPage = await customerContext.newPage();

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
