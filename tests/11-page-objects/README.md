# Page Object Model (POM)

> **Engineering Cookbook – Chapter 11**

As automation suites grow, maintaining locators and UI interactions directly inside test files quickly becomes difficult.

The **Page Object Model (POM)** is one of the most widely adopted design patterns in UI automation. It separates page-specific implementation details from business workflows, resulting in cleaner, more maintainable, and reusable test code.

This chapter demonstrates a complete Page Object Model implementation using Playwright, including a Page Object Manager that centralizes page creation and simplifies test composition.

---

# Who Should Read This Chapter?

✅ Automation Engineers

✅ Framework Developers

✅ SDETs

✅ Selenium Engineers migrating to Playwright

✅ Interview Candidates

---

# Learning Objectives

After completing this chapter you should be able to:

- Understand the Page Object Model
- Design reusable page classes
- Encapsulate UI interactions
- Build a Page Object Manager
- Separate business workflows from page implementation
- Create maintainable automation frameworks

---

# Why Use the Page Object Model?

Without POM:

```
Test

↓

Locators

↓

Actions

↓

Assertions
```

Every test duplicates implementation details.

With POM:

```
Test

↓

Page Objects

↓

Playwright

↓

Application
```

Tests describe **business intent**, while page objects handle UI implementation.

---

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

# Engineering Insights

## Tests Should Read Like Documentation

Good:

```javascript
await loginPage.validLogin(username, password);

await dashboardPage.searchProductAddCart(productName);

await cartPage.Checkout();
```

Even someone unfamiliar with Playwright can understand the business flow.

---

## Keep Assertions Close to the Business Flow

Some assertions naturally belong inside page objects because they verify page-specific behaviour.

Examples:

- Product displayed in cart
- Order confirmation
- Email verification

Other assertions—such as verifying an end-to-end business outcome—are often clearer when kept in the test itself.

Aim for a balance: page objects should encapsulate page behaviour, while tests should express business intent.

---

## Avoid "God" Page Objects

A page object should represent one page or component.

Avoid creating a single class that knows about the entire application.

Smaller page objects are easier to maintain and reuse.

---

# Best Practices

✔ One page per class.

✔ Keep locators private to page objects.

✔ Expose business methods.

✔ Reuse page objects across tests.

✔ Use a Page Object Manager when the framework grows.

✔ Keep page objects focused.

---

# Common Mistakes

❌ Putting assertions everywhere.

❌ Exposing locators publicly.

❌ Copying locators between tests.

❌ Creating page objects with hundreds of methods.

❌ Mixing unrelated pages into one class.

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

# Interview Corner

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

# FAQ

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

# Future Recipes

This chapter will expand to include:

- Component Object Model
- Base Page
- Fluent Page Objects
- Page Object Fixtures
- Dependency Injection
- Generic Table Components
- Modal Dialog Components
- Navigation Components
- Reusable Widgets

---

# Summary

This chapter demonstrates how to design a maintainable automation framework using the Page Object Model.

Key concepts include:

- Encapsulation
- Separation of concerns
- Reusable page classes
- Centralized page management
- Business-oriented APIs
- Maintainable test architecture

The Page Object Model is one of the most valuable design patterns in UI automation and forms the foundation of scalable Playwright and Selenium frameworks.

---

➡ **Next Chapter:** Reporting & Test Execution

Learn how to generate rich HTML reports, organize execution results, capture diagnostics, and integrate reporting into CI/CD pipelines.