# Assertions

# Assertion Categories

This chapter covers four major assertion categories.

```
Assertions

├── Standard Assertions
├── UI Assertions
├── API Assertions
└── Soft Assertions
```

---

# Recipes Included

| Recipe | Purpose |
|----------|---------|
| `standard-expect.spec.js` | Standard JavaScript assertions using `expect()` |
| `soft-assertions.spec.js` | Continue execution even when an assertion fails |
| `api-response.spec.js` | Validate HTTP response status |
| `to-be-visible.spec.js` | Verify element visibility |
| `to-be-hidden.spec.js` | Verify hidden elements |
| `to-be-enabled-disabled.spec.js` | Validate enabled/disabled controls |
| `to-be-checked.spec.js` | Validate checkbox state |
| `to-have-text.spec.js` | Exact text validation |
| `to-contain-text.spec.js` | Partial text validation |
| `to-have-value.spec.js` | Verify textbox values |
| `to-have-count.spec.js` | Validate collections |
| `url-title.spec.js` | Verify page URL and title |

---

# Standard Assertions

Standard assertions work with JavaScript objects.

Example:

```javascript
expect(orderIds).toContain("ORD456");
expect(orderIds.length).toBe(3);
```

Use them when validating:

- Arrays
- Objects
- Numbers
- Strings
- API payloads

---

# Web-First Assertions

Playwright assertions automatically wait until the expected condition becomes true.

Example:

```javascript
await expect(locator).toBeVisible();
```

Playwright continuously retries until:

- Success

or

- Timeout

No explicit waits are required.

---

# Assertion Types

## Visibility

```javascript
await expect(locator).toBeVisible();
```

Use for:

- Error messages
- Success messages
- Buttons
- Dialogs

---

## Hidden Elements

```javascript
await expect(locator).toBeHidden();
```

Useful for:

- Loading spinners
- Progress indicators
- Temporary notifications

---

## Text

Exact match

```javascript
await expect(locator).toHaveText("Log in");
```

Partial match

```javascript
await expect(locator).toContainText("Log");
```

Choose the one that best reflects the requirement.

---

## Value

```javascript
await expect(textbox).toHaveValue(email);
```

Ideal for:

- Forms
- Search boxes
- Filters

---

## Count

```javascript
await expect(cards).toHaveCount(4);
```

Useful when verifying:

- Tables
- Product lists
- Search results

---

## Checkbox State

```javascript
await expect(checkbox).toBeChecked();
```

Confirms business state instead of simply clicking the checkbox.

---

## Enabled / Disabled

```javascript
await expect(button).toBeEnabled();
```

Often used before performing critical actions.

---

## URL & Title

```javascript
await expect(page).toHaveURL(...)
await expect(page).toHaveTitle(...)
```

Helpful after navigation.

---

# Soft Assertions

Normally, Playwright stops execution after the first failed assertion.

Soft assertions allow the test to continue.

Example:

```javascript
await expect.soft(page).toHaveTitle(...)
```

Useful when collecting multiple failures during a single validation.

---

# API Assertions

Assertions are not limited to UI.

Example:

```javascript
expect(response.status()).toBe(401);
```

This allows API validation without opening a browser.

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| `assertEquals()` | `expect()` |
| Explicit waits | Retryable assertions |
| Manual polling | Built into assertions |
| `getText()` | `toHaveText()` |

One of Playwright's biggest advantages is that assertions automatically synchronize with the browser.

---

# FAQ

## Why are Playwright assertions less flaky?

Because they automatically retry until:

- The expected state is reached
- The timeout expires

---

## Why use `toHaveText()` instead of `textContent()`?

`toHaveText()` retries automatically and validates browser state.

`textContent()` returns the value immediately.

---

## When should soft assertions be used?

When multiple independent validations should be collected before failing the test.

---

## What makes web-first assertions different?

They understand browser timing and automatically wait for elements to become actionable.

---

## Why shouldn't I use `waitForTimeout()`?

Because browser timing changes.

Assertions should synchronize with the application instead of waiting arbitrary amounts of time.

---

## Which assertion should I use most?

Most UI tests primarily use:

- `toBeVisible()`
- `toHaveText()`
- `toContainText()`
- `toHaveURL()`
- `toHaveCount()`

---