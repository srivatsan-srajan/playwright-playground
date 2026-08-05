const { test, expect } = require('@playwright/test');
const { POManager } = require('../11-page-objects/POManager');


test('Client App login', async ({ page }) => {
  const poManager = new POManager(page);
  const username = process.env.EMAIL;
  const password = process.env.PASSWORD;

  const loginPage = poManager.getLoginPage();
  const productName = 'ADIDAS ORIGINAL';
  
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
  
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});