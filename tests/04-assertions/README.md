# Assertions

> Engineering Cookbook – Chapter 04

Assertions are the heart of every automated test.

A test without meaningful assertions is simply a script that performs actions. Assertions transform browser interactions into automated verification by confirming that the application behaves exactly as expected.

Playwright provides one of the most powerful assertion libraries available in UI automation through **web-first assertions**, automatic retries, and built-in synchronization.

---

# Who Should Read This Chapter?

✅ Engineers learning Playwright

✅ Selenium engineers migrating to Playwright

✅ Automation engineers building maintainable frameworks

✅ Interview candidates preparing for Playwright questions

---

# Learning Objectives

After completing this chapter you should be able to:

- Understand Playwright's assertion model
- Differentiate between standard and web-first assertions
- Validate page state reliably
- Use soft assertions
- Verify API responses
- Write robust, non-flaky validations

---

# Why Assertions Matter

Automation consists of two parts:

```
Action

↓

Verification
```

Without verification, automation provides little confidence.

Good assertions answer one question:

> **Did the application behave correctly?**

---

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

# Engineering Insights

## Assert Business Behaviour

Don't assert implementation details.

Good

```
Order created successfully
```

Poor

```
Button clicked
```

---

## Avoid Duplicate Assertions

Each assertion should provide new information.

Five assertions checking the same thing add maintenance without improving confidence.

---

## Prefer Web-First Assertions

Good

```javascript
await expect(locator).toBeVisible();
```

Avoid

```javascript
await page.waitForTimeout(5000);
expect(...)
```

---

# Best Practices

✔ Assert outcomes, not clicks

✔ Prefer retryable assertions

✔ Use soft assertions selectively

✔ Keep assertions readable

✔ One business expectation per assertion

---

# Common Mistakes

❌ Using `textContent()` instead of `toHaveText()`

❌ Comparing element values manually

❌ Using hard waits

❌ Writing assertions that duplicate each other

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

# Interview Corner

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

# FAQ

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

# Future Recipes

As this repository grows, this chapter will include:

- `expect.poll()`
- `expect.toPass()`
- Snapshot assertions
- Visual assertions
- Accessibility assertions
- Custom matchers

---

# Summary

This chapter introduced the most commonly used Playwright assertions, including:

- Standard assertions
- Retryable UI assertions
- Soft assertions
- API assertions

Well-designed assertions are one of the biggest contributors to stable, maintainable automation suites.

---

➡ **Next Chapter:** UI Controls

You'll learn how to automate common user interface components such as dropdowns, tables, alerts, frames, windows, and more.