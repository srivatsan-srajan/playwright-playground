# API-Assisted Testing

> Engineering Cookbook – Chapter 07

Modern automation frameworks rarely rely on UI interactions alone.

Playwright enables engineers to combine backend APIs with browser automation to build tests that are significantly faster, more reliable, and easier to maintain.

Instead of spending time clicking through repetitive setup screens, APIs can prepare test data, authenticate users, create orders, and manipulate application state before the browser is even opened.

This chapter demonstrates how to combine Playwright's APIRequestContext with UI automation to create production-quality automation frameworks.

---

# Who Should Read This Chapter?

✅ Automation Engineers

✅ Playwright Framework Developers

✅ Selenium Engineers migrating to Playwright

✅ Senior QA Engineers

✅ Interview Candidates

---

# Learning Objectives

After completing this chapter you should be able to

- Authenticate using backend APIs

- Create test data through APIs

- Combine API and UI testing

- Build reusable API helper classes

- Intercept network requests

- Mock backend responses

- Manipulate requests before they reach the server

---

# Why API-Assisted Testing?

Traditional UI automation often spends most of its execution time performing repetitive setup.

Example

```

Login

↓

Navigate

↓

Create Order

↓

Navigate Again

↓

Validate

```

Using APIs, the same workflow becomes

```

Authenticate (API)

↓

Create Order (API)

↓

Open Browser

↓

Verify Order (UI)

```

The browser focuses only on validating business behaviour.

---

# Architecture

```

Browser Automation

↑

↓

API Utilities

↓

Application APIs

↓

Database

```

The browser and APIs complement each other rather than competing.

---

# Recipes Included

| Recipe | Purpose |
|----------|---------|
| `api-utils.spec.js` | Reusable utility class for authentication and order creation APIs. |
| `place-order-api.spec.js` | Create an order through APIs and verify it through the UI. |
| `route-example.spec.js` | Intercept API responses and return mocked data to the browser. |
| `intercept-example.spec.js` | Modify outgoing requests to simulate authorization failures and validate application behavior. |

---

# Concepts Covered

## API Authentication

Instead of logging in through the browser, authentication can be performed directly against backend APIs.

Benefits

- Faster execution

- No UI dependency

- Reduced flakiness

---

## API Test Data Creation

The repository demonstrates creating orders through APIs before opening the application UI. :contentReference[oaicite:0]{index=0}

Benefits

- Stable test setup

- Faster execution

- Cleaner UI tests

---

## Reusable API Utilities

The `APiUtils` class encapsulates authentication and order creation, providing reusable methods that can be shared across tests. :contentReference[oaicite:1]{index=1}

Rather than repeating request logic inside every test, helper classes centralize API interactions.

---

## API + UI Hybrid Testing

One of the strongest examples in this chapter is:

```
Create Order

↓

API

↓

Inject Authentication Token

↓

Open Browser

↓

Verify Order History
```

The UI validates business behaviour while APIs handle setup. :contentReference[oaicite:2]{index=2}

---

## Network Interception

Playwright can intercept outgoing requests before they reach the server.

Typical use cases include

- Authorization failures

- Invalid data

- Network failures

- Edge cases

The interception example modifies an outgoing order-details request to simulate an unauthorized access scenario. :contentReference[oaicite:3]{index=3}

---

## Response Mocking

Playwright can completely replace backend responses.

Instead of waiting for the server, the browser receives developer-controlled data.

Typical uses

- Empty search results

- No Orders

- Feature flags

- Error responses

- Boundary conditions

The route example fulfills a request with a mocked "No Orders" response. :contentReference[oaicite:4]{index=4}

---

# Engineering Insights

## UI Should Verify

## APIs Should Prepare

One of the biggest improvements you can make to UI automation is moving setup into backend APIs.

Avoid

```
Login

↓

Create Product

↓

Create Order

↓

Navigate

↓

Validate
```

Prefer

```
Create Product (API)

↓

Create Order (API)

↓

Open Browser

↓

Validate
```

---

## Build API Helpers

Encapsulate APIs into reusable utility classes rather than scattering request logic throughout the test suite.

This improves

- Readability

- Maintainability

- Reusability

---

# Best Practices

✔ Separate API utilities from UI tests

✔ Use APIs for test setup

✔ Validate business behaviour in the browser

✔ Mock only when necessary

✔ Keep mocked responses realistic

---

# Common Mistakes

❌ Testing APIs through the browser

❌ Duplicating request code

❌ Overusing mocked responses

❌ Mocking everything instead of exercising real integrations

❌ Mixing UI setup with business verification

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| RestAssured + Selenium | Built-in APIRequestContext |
| BrowserMob Proxy | page.route() |
| Separate HTTP libraries | Native API support |
| Token injection requires custom code | addInitScript() |

Playwright unifies browser automation and API testing within a single framework.

---

# Interview Corner

## Why combine API and UI testing?

API-assisted testing reduces execution time while allowing the UI to validate real business behaviour.

---

## When should network responses be mocked?

Only when validating browser behaviour independently of backend availability or when reproducing edge cases that are difficult to create in production.

---

## Why create API utility classes?

To centralize authentication, request handling, and payload construction, reducing duplication across tests.

---

## Should every UI test use APIs?

No.

Use APIs for setup.

Use the browser for behaviour verification.

---

# FAQ

## Is API-assisted testing replacing UI testing?

No.

The APIs prepare state.

The UI verifies behaviour.

---

## Why inject tokens into localStorage?

It avoids repeated UI login while keeping browser interactions focused on the feature under test.

---

## When should I mock responses?

When testing UI behaviour under specific backend conditions that are difficult or expensive to reproduce.

---

# Future Recipes

This chapter will later include

- PUT Requests

- DELETE Requests

- PATCH Requests

- GraphQL

- Multipart Upload

- File Download APIs

- Authentication Refresh Tokens

- Contract Testing

- HAR Replay

---

# Summary

This chapter introduced one of the most valuable automation techniques available in Playwright:

- API Authentication
- API Test Data Creation
- Hybrid API + UI Testing
- Network Interception
- Response Mocking
- Reusable API Utilities

Together, these techniques dramatically reduce test execution time while improving reliability and maintainability.

---

➡ **Next Chapter:** File Handling

You'll learn how to work with Excel, JSON, CSV files, uploads, downloads, and external test data.