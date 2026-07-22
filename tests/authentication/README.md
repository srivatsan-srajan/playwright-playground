# Authentication

Authentication is one of the most common scenarios in UI automation. This section covers login, logout, session management, authentication state, and related best practices.

---

## What You'll Learn

- Successful Login
- Invalid Login
- Session Persistence
- Storage State
- Multiple User Sessions
- Authentication Helpers

---

## Playwright APIs Used

- page.goto()
- page.locator()
- locator.fill()
- locator.click()
- expect()
- browser.newContext()
- storageState()

---

## Best Practices

- Prefer web-first assertions.
- Avoid explicit waits.
- Keep credentials outside test code.
- Reuse authentication state when appropriate.
- Use meaningful locator names.

---

## Common Mistakes

- Using `waitForTimeout()`
- Hard-coded sleeps
- Brittle XPath locators
- Duplicating login code across tests

---

## FAQ

### Why use `expect(locator).toHaveText()` instead of `locator.textContent()`?

`toHaveText()` is a **web-first assertion**. It automatically retries until the expected text appears (or the timeout expires), making tests significantly more reliable.

`textContent()` retrieves the current value immediately. If the UI hasn't finished updating, the test may fail even though the application is working correctly.

**Preferred**

```javascript
await expect(errorMessage).toHaveText("Incorrect username/password.");
```

**Less Reliable**

```javascript
const text = await errorMessage.textContent();
expect(text).toBe("Incorrect username/password.");
```

---

### Why is Playwright generally less flaky than Selenium?

Playwright was designed with modern web applications in mind. Some of the features that improve test stability include:

- Auto-waiting
- Retryable assertions
- Strict locators
- Actionability checks before interactions
- Built-in waiting for navigation and network events

These reduce the need for explicit waits and make tests more deterministic.

---

### When should I use `browser.newContext()` instead of the built-in `page` fixture?

Use the built-in `page` fixture for most tests.

Create a new `BrowserContext` when you need:

- Multiple independent users
- Separate authentication states
- Different browser permissions
- Isolated cookies and local storage

---

### Should I use CSS, XPath, or `getByRole()`?

General recommendation:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. CSS selectors
5. XPath (only when necessary)

This order usually results in the most readable and maintainable tests.

---

## Recipes

| Recipe | Description |
|---------|-------------|
| invalid-login.spec.js | Verify invalid login |
| successful-login.spec.js | Successful authentication |
| session-state.spec.js | Reuse authenticated session |