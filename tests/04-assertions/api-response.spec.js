const { test, expect } = require('@playwright/test');

test('Assert API response', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  expect(response.status()).toBe(401);
});
