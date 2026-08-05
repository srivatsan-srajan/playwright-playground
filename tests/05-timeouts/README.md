# Timeout Strategies

Playwright provides multiple levels of timeout configuration, allowing you to control how long actions, assertions, navigation, or entire tests are allowed to execute.

Choosing the appropriate timeout level keeps tests both reliable and performant.

---

## Timeout Hierarchy

```
Global Configuration
        │
        ▼
Test Timeout
        │
        ▼
Expect Timeout
        │
        ▼
Per Assertion Timeout
```

The closer the timeout is to the assertion, the more targeted the configuration becomes.

---

## 1. Local Assertion Timeout

```javascript
await expect(locator).toBeVisible({
    timeout: 30000
});
```

This timeout only affects the current assertion.

### Use Cases

- Slow loading error messages
- Toast notifications
- Long-running UI updates
- Third-party integrations

This is usually the preferred solution because it only affects a single verification.

---

## 2. Custom Expect Timeout

```javascript
const customExpect = expect.configure({
    timeout: 30000
});

await customExpect(locator).toBeVisible();
```

This creates a reusable assertion object with a custom timeout.

Useful when multiple assertions in the same test require longer waiting periods.

---

## 3. Test Timeout

```javascript
test.setTimeout(60000);
```

Controls the maximum execution time for the entire test.

This includes:

- Navigation
- User actions
- Assertions
- Helper methods

Use sparingly.

Long test timeouts often indicate that the test should be refactored.

---

## 4. Global Timeouts

Configured inside

```
playwright.config.js
```

Examples include

```javascript
timeout

expect.timeout

actionTimeout

navigationTimeout
```

Global settings provide sensible defaults for the entire project.

Individual tests can override them whenever necessary.

---

# Selenium Comparison

| Selenium | Playwright |
|-----------|------------|
| Explicit Wait | Web-first assertions |
| FluentWait | Configurable expect timeout |
| Implicit Wait | Not required |
| Thread.sleep() | Strongly discouraged |

---

# FAQ

### Which timeout should be increased first?

The local assertion timeout.

Increase the timeout closest to the operation that requires additional waiting before changing global project settings.

---s