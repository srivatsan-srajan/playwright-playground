# Playwright Locators

## Recommended Locator Priority

| Priority | Locator | Typical Usage |
|---:|---|---|
| 1 | `getByRole()` | Buttons, links, menus |
| 2 | `getByLabel()` | Forms |
| 3 | `getByPlaceholder()` | Inputs |
| 4 | `getByTestId()` | Stable application hooks |
| 5 | `getByText()` | Visible content |
| 6 | CSS | Component-specific selection |
| 7 | XPath | Last resort |

---

# Recipes In This Chapter

| File | Purpose |
|---|---|
| `chaining-locators.spec.js` | Review this recipe for the locator technique demonstrated. |
| `css-locators.spec.js` | Review this recipe for the locator technique demonstrated. |
| `label-locators.spec.js` | Review this recipe for the locator technique demonstrated. |
| `locator-filter.spec.js` | Review this recipe for the locator technique demonstrated. |
| `nth-match.spec.js` | Review this recipe for the locator technique demonstrated. |
| `placeholder-locator.spec.js` | Review this recipe for the locator technique demonstrated. |
| `role-locators.spec.js` | Review this recipe for the locator technique demonstrated. |
| `testid.spec.js` | Review this recipe for the locator technique demonstrated. |
| `text-locators.spec.js` | Review this recipe for the locator technique demonstrated. |
| `xpath.spec.js` | Review this recipe for the locator technique demonstrated. |

---

# Locator Decision Guide

```text
Accessible role available?
        │
      Yes ─────► getByRole()
        │
        No
        │
Form control?
        │
      Yes ─────► getByLabel()
        │
        No
        │
Stable data-testid?
        │
      Yes ─────► getByTestId()
        │
        No
        │
Visible text?
        │
      Yes ─────► getByText()
        │
        No
        │
CSS
        │
XPath (only if necessary)
```

---

# Examples

## Role Locator

```js
await page.getByRole('button', { name: 'Login' }).click();
```

## Chained Locator

```js
const card = page.getByTestId('event-card')
                 .filter({ hasText: 'AI Conference' });

await card.getByRole('button', { name: 'Book Now' }).click();
```

## Frame Locator

```js
const frame = page.frameLocator('iframe');
await frame.getByRole('button', { name: 'Close' }).click();
```

---

# Engineering Insights

- Prefer intent-based locators over DOM-based selectors.
- Store reusable locators in variables.
- Keep selectors readable.
- Avoid unnecessary `nth()` usage.
- Don't fight strict mode—improve the locator instead.

---

# Selenium vs Playwright

| Selenium | Playwright |
|---|---|
| `findElement()` | `locator()` |
| `WebElement` | `Locator` |
| Explicit waits | Auto-waiting |
| Stale element issues | Lazy locator evaluation |

---
# FAQ

**Should I always use CSS?**  
No. Prefer semantic locators first.

**Why doesn't Playwright return WebElements?**  
Because `Locator` objects resolve elements only when actions or assertions execute.

---
