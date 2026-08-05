# Page Object Model (POM)

These page objects intentionally follow a straightforward implementation to illustrate the Page Object Model. Larger automation frameworks may introduce additional abstractions such as base page classes, dependency injection, or navigation patterns based on the team's needs.

# Framework Architecture

```
Tests

        │

        ▼

POManager

        │

        ├──────────────┐
        ▼              ▼
 LoginPage      DashboardPage
        │              │
        ▼              ▼
 CartPage     OrdersReviewPage
        │              │
        └──────────────┐
                       ▼
              OrdersHistoryPage
```

The `POManager` acts as a factory, creating and exposing page objects from a single place. :contentReference[oaicite:0]{index=0}

---

# Recipes Included

| Class | Responsibility |
|---------|---------------|
| `POManager.js` | Central factory for creating and exposing page objects. |
| `LoginPage.js` | Handles authentication and navigation to the application. |
| `DashboardPage.js` | Product search, cart navigation, and order navigation. |
| `CartPage.js` | Shopping cart validation and checkout actions. |
| `OrdersReviewPage.js` | Checkout, country selection, and order submission. |
| `OrdersHistoryPage.js` | Order lookup and order verification. |

---

# Design Principles

## One Page = One Class

Each page object should represent exactly one page (or one significant UI component).

Examples:

- Login Page
- Dashboard
- Cart
- Checkout
- Order History

Each class is responsible only for its own UI. :contentReference[oaicite:1]{index=1} :contentReference[oaicite:2]{index=2}

---

## Encapsulate Locators

Locators belong inside page objects.

Good

```javascript
await loginPage.validLogin(email, password);
```

Poor

```javascript
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill(password);
await page.locator('#login').click();
```

The second approach leaks implementation details into every test.

---

## Expose Business Operations

Notice that the page objects expose methods such as:

- `validLogin()`
- `searchProductAddCart()`
- `navigateToCart()`
- `Checkout()`
- `SubmitAndGetOrderId()`

The test interacts with business operations rather than individual locators. :contentReference[oaicite:3]{index=3} :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5} :contentReference[oaicite:6]{index=6}

---

## Page Object Manager

Rather than creating every page manually:

```javascript
const login = new LoginPage(page);
const dashboard = new DashboardPage(page);
const cart = new CartPage(page);
```

the framework uses a centralized manager:

```javascript
const poManager = new POManager(page);

const loginPage = poManager.getLoginPage();
const dashboardPage = poManager.getDashboardPage();
```

This improves consistency and makes dependency management simpler. :contentReference[oaicite:7]{index=7}

---

# Business Workflow

The accompanying example demonstrates an entire purchasing workflow using page objects.

```
Login

↓

Dashboard

↓

Cart

↓

Checkout

↓

Order Review

↓

Order History
```

The test itself becomes a readable description of the user journey rather than a sequence of low-level browser interactions. :contentReference[oaicite:8]{index=8}

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| PageFactory | Page Objects |
| `@FindBy` annotations | `Locator` fields |
| WebElement caching | Lazy locators |
| Manual waits | Auto-waiting |
| WebDriver | `Page` |

Playwright's `Locator` API naturally complements the Page Object Model because locators are evaluated lazily and automatically wait for elements to become actionable.

---

# FAQ

## Why use the Page Object Model?

To improve maintainability by separating UI implementation from business workflows.

---

## What belongs inside a page object?

- Locators
- Page-specific actions
- Page-specific validations

---

## What should remain in the test?

Business workflows and scenario-specific assertions.

---

## Why introduce a Page Object Manager?

It centralizes object creation, reduces boilerplate, and provides a single place to manage page object lifecycles.

---

### Should every application use a Page Object Manager?

Not necessarily.

Small projects may create page objects directly.

As the framework grows, a manager improves organization and consistency.

---

### Should helper methods go inside page objects?

Only if they represent behaviour belonging to that page.

Cross-cutting utilities should remain separate.

---

### Can one page object call another?

Generally, avoid tight coupling.

Navigation methods can return the next page object if appropriate, but keeping orchestration in the test often results in clearer workflows.

---