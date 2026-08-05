const { test, expect } = require('@playwright/test');

test('Standard assertions', () => {
  const orderIds = ['ORD123', 'ORD456', 'ORD789'];
  expect(orderIds).toContain('ORD456');
  expect(orderIds.length).toBe(3);
});
