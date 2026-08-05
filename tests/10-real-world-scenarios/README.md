# End-to-End Business Workflows

# Recipes Included

| Recipe | Business Scenario |
|---------|------------------|
| `place-product-order.spec.js` | Purchase a product and verify the order appears in order history. |
| `event-booking-sample.spec.js` | Create an event, book it, and verify seat availability decreases correctly. |
| `refund-eligibility-check.spec.js` | Verify refund rules for single-ticket and group bookings. |
| `api-ui-authorization.spec.js` | Validate that one authenticated user cannot access another user's booking. |
| `banner-api-example.spec.js` | Mock backend responses to validate conditional UI behaviour. |
| `read-write-from-excel.spec.js` | Download, modify, upload, and verify Excel data. |
| `e2e-flow-page-objects.spec.js` | Execute a complete shopping workflow using the Page Object Model. |

---

# Concepts Covered

## Business Workflow Automation

Rather than testing individual pages, each scenario validates complete user journeys.

Examples include:

- Product ordering
- Event booking
- Authorization
- Refund eligibility
- File processing

The focus is on business behaviour rather than isolated UI components.

---

## Dynamic Test Data

Several scenarios generate or manipulate data dynamically instead of relying on hardcoded values.

Examples include:

- Unique event names
- Runtime booking references
- Downloaded Excel files
- API-created bookings

Dynamic data keeps tests repeatable and independent.

---

## API-Assisted Workflows

The authorization scenario creates data through backend APIs before switching to browser automation for verification. :contentReference[oaicite:7]{index=7}

This approach reduces execution time while keeping UI validation focused on business outcomes.

---

## Reusable Helper Methods

Across the scenarios you'll notice repeated operations extracted into helper functions:

- Login
- Booking creation
- Event lookup
- Authorization
- Refund validation

This keeps business workflows readable while reducing duplication.

---

## Structured Test Steps

Several scenarios use `test.step()` to divide workflows into logical stages.

Typical structure:

```
Login

↓

Create Data

↓

Perform Action

↓

Verify Result
```

This improves both readability and Playwright HTML reports.

---

## Business Rule Validation

A good automation suite validates rules—not just UI.

Examples include:

- Seat count decreases after booking.
- Users cannot access another user's booking.
- Refund eligibility depends on ticket quantity.
- Conditional banners appear only under specific conditions.

These assertions verify application behaviour rather than implementation details.

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| UI setup only | API-assisted setup + UI validation |
| Manual synchronization | Auto-waiting |
| External HTTP libraries | Built-in APIRequestContext |
| Separate reporting steps | `test.step()` integration |
| WebDriver Page Objects | Page Objects + modern Locators |

Playwright enables complete business workflows with significantly less boilerplate than traditional Selenium frameworks.

---

# FAQ

## What makes a good end-to-end automation test?

A good end-to-end test validates an entire business workflow while remaining independent, maintainable, and focused on business outcomes.

---

## Why combine API and UI automation?

APIs prepare data efficiently.

The browser validates what the user actually experiences.

---

## Why use helper methods?

They reduce duplication, improve readability, and centralize maintenance.

---

## What should an end-to-end test verify?

Business rules.

Not simply that buttons were clicked.

---

### Should every test be end-to-end?

No.

Most automation suites contain:

- Unit tests
- API tests
- Component tests
- UI tests
- End-to-end workflows

Each level serves a different purpose.

---

### How long should an end-to-end test be?

Only as long as necessary to validate a single business workflow.

Avoid combining multiple independent scenarios into one large test.

---

### Should business workflows reuse helper methods?

Absolutely.

Well-designed helpers make workflows easier to understand and significantly reduce maintenance costs.

---