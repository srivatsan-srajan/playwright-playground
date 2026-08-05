# API-Assisted Testing

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

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| RestAssured + Selenium | Built-in APIRequestContext |
| BrowserMob Proxy | page.route() |
| Separate HTTP libraries | Native API support |
| Token injection requires custom code | addInitScript() |

Playwright unifies browser automation and API testing within a single framework.

---

# FAQ

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