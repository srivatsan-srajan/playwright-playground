
# Playwright Basics

> The foundation for every Playwright test.

---

## Why This Chapter Exists

Every automation framework has a learning curve. Before exploring advanced topics such as API testing, network mocking, authentication, or real-world scenarios, it is important to understand the core building blocks that every Playwright test is composed of.

This chapter introduces those building blocks and establishes the terminology used throughout the repository.

---

# Learning Objectives

After completing this chapter you should be able to:

- Understand the Playwright Test Runner
- Explain the Browser → BrowserContext → Page hierarchy
- Navigate to web pages
- Interact with elements
- Execute assertions
- Write clean asynchronous Playwright tests

---

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

# Interview Questions

1. What is BrowserContext?
2. Why are Playwright tests asynchronous?
3. Why are Playwright tests generally less flaky than Selenium tests?
4. What is the difference between Browser, BrowserContext and Page?

---

# FAQ

**Why does Playwright use BrowserContext?**

To provide complete isolation between tests without launching a new browser every time.

**Should every test create its own context?**

Yes. Independent tests are easier to maintain and execute in parallel.

---

# Next Chapter

Continue with **02 - Locators**, where you'll learn the locator strategies that make Playwright tests reliable and readable.
