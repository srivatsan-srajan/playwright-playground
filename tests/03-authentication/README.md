# Authentication

# Recipes Included

| Recipe | Purpose |
|----------|---------|
| `invalid-login.spec.js` | Validate incorrect credentials and verify the appropriate error message is displayed. |
| `successful-login.spec.js` | Authenticate with valid credentials and verify that the application successfully loads authenticated content. |
| `register-login.spec.js` | Register a brand-new user and immediately log in using the newly created account. |

---

# Authentication Concepts Covered

## Navigation

Every authentication flow begins with navigation.

Examples include:

- Opening login pages
- Opening registration pages
- Returning to login after successful registration

---

## Form Automation

This chapter demonstrates automation of common form controls including:

- Text boxes
- Password fields
- Checkboxes
- Radio buttons
- Dropdown lists

These same techniques apply throughout the rest of the repository.

---

## Negative Authentication

Negative tests are just as important as successful login tests.

Typical validations include:

- Invalid username
- Invalid password
- Missing credentials
- Incorrect error messages

Example:

```
Username: rahulshettyacademy
Password: wrongpassword

↓

Expected Result

Incorrect username/password.
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|------------|------------|
| WebDriver | BrowserContext |
| findElement() | Locator |
| WebElement | Locator |
| Explicit Wait | Auto Waiting |
| Thread.sleep() | Retryable Assertions |

Playwright dramatically reduces flakiness by combining lazy locators, actionability checks, and retryable assertions.

---

# FAQ

## Why shouldn't every test perform UI login?

Authentication is usually not the feature under test.

Business scenario tests should often begin with an authenticated session using:

- storageState()
- API Login
- Authentication Fixtures

This reduces execution time and unnecessary failures.

---

## What should an authentication test verify?

A complete authentication test validates:

- Successful authentication
- Failed authentication
- Error handling
- Session creation
- Landing page
- User-specific content

---

## Why are Playwright login tests generally more reliable?

Because Playwright automatically waits for:

- Element visibility
- Element stability
- Navigation
- Assertions

without requiring explicit waits.

---

## Should credentials be stored in Git?

No.

Use:

- `.env`
- CI/CD Secrets
- GitHub Secrets

---

## Should login be repeated in every test?

Not necessarily.

Authentication itself should be tested thoroughly.

Other business workflows can reuse authenticated sessions.

---

## Why is BrowserContext useful for authentication?

Every BrowserContext has its own:

- Cookies
- Local Storage
- Session Storage

making tests isolated and parallel-friendly.

---