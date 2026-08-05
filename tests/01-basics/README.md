# Playwright Basics

Playwright manages browser lifecycle automatically when using fixtures.

# Playwright Architecture

```
Browser
   │
BrowserContext
   │
   ├── Page
   ├── Page
   └── Page
```

A BrowserContext behaves like an isolated browser profile. Cookies, local storage and sessions are isolated between contexts, making Playwright tests reliable by default.

---

# Core Objects

## Browser
Represents the running browser process.

## BrowserContext
Provides complete test isolation. Prefer a fresh context per test.

## Page
Represents a browser tab and is where almost all interactions occur.

---

# Typical Test Flow

1. Launch browser
2. Create context
3. Create page
4. Navigate
5. Locate elements
6. Perform actions
7. Assert expected behaviour

---

# Async / Await

Playwright APIs are asynchronous. Always `await` actions and assertions.

```javascript
await page.goto("https://example.com");
await page.getByRole("button", { name: "Login" }).click();
await expect(page).toHaveTitle(/Example/);
```

---

# Best Practices

- One business scenario per test.
- Use semantic locators (`getByRole`, `getByLabel`, `getByTestId`).
- Prefer web-first assertions.
- Avoid `waitForTimeout()`.
- Keep tests independent.

---

# Common Mistakes

- Using fixed waits.
- Sharing state between tests.
- Creating very large tests covering multiple scenarios.
- Depending on brittle XPath selectors.

---

# Selenium Comparison

| Selenium | Playwright |
|-----------|------------|
| WebDriver | Browser |
| Driver session | BrowserContext |
| WebElement | Locator |
| Explicit waits | Auto waiting + retryable assertions |

---

# FAQ

**Why does Playwright use BrowserContext?**

To provide complete isolation between tests without launching a new browser every time.

**Should every test create its own context?**

Yes. Independent tests are easier to maintain and execute in parallel.

---