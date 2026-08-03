# Authentication

> Engineering Cookbook – Chapter 03

Authentication is one of the most common workflows automated in UI testing. Almost every web application requires users to authenticate before accessing business functionality, making login and registration scenarios foundational automation skills.

This chapter demonstrates how to automate authentication workflows using Playwright while following engineering best practices that keep tests reliable, readable, and maintainable.

---

# Who Should Read This Chapter?

✅ Engineers learning Playwright

✅ Selenium engineers migrating to Playwright

✅ QA engineers building automation frameworks

✅ Interview candidates preparing for Playwright questions

---

# Learning Objectives

After completing this chapter you should be able to:

- Automate login forms
- Validate authentication failures
- Register new users
- Verify successful authentication
- Build reusable authentication helpers
- Design reliable authentication tests

---

# Authentication Lifecycle

Every application follows a similar authentication journey.

```
User

↓

Registration

↓

Login

↓

Authenticated Session

↓

Business Actions

↓

Logout
```

This chapter covers the first three stages.

Future chapters will extend this to authenticated business workflows.

---

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

## Successful Authentication

A successful login test should verify more than simply clicking the Login button.

Typical assertions include:

- Correct page title
- Dashboard visibility
- User-specific content
- Product listings
- Navigation options

Avoid validating implementation details.

Always validate business outcomes.

---

## Registration Workflow

Registration is a complete business workflow.

Your example demonstrates:

- User Registration
- Personal Details
- Password Creation
- Terms Acceptance
- Login using newly created account

This is a much stronger automation example than simply testing a login form.

---

# Engineering Insights

## Authentication Tests Should Test Authentication

Avoid this:

```
Login

↓

Add Product

↓

Checkout

↓

Create Order

↓

Download Invoice

↓

Logout
```

This is testing five business features in one test.

Instead:

Authentication tests should focus on authentication.

Business workflows belong in separate tests.

---

## Generate Unique Test Data

Registration tests should avoid hardcoded users.

Instead generate:

- Unique email addresses
- Random usernames
- Dynamic phone numbers

This keeps registration tests repeatable.

---

## Reuse Login Logic

As your framework grows, move login into reusable helper methods.

Example:

```javascript
await login(page, email, password);
```

instead of repeating the same login steps across every test.

---

# Best Practices

✔ Keep login tests independent

✔ Use meaningful test names

✔ Store credentials outside source code

✔ Assert business behaviour

✔ Avoid hard-coded waits

✔ Create reusable authentication helpers

---

# Common Mistakes

❌ Using `waitForTimeout()`

❌ Reusing the same registration account

❌ Hardcoding credentials in multiple files

❌ Combining authentication with unrelated business scenarios

❌ Verifying only URL changes instead of authenticated state

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

# Interview Corner

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

# FAQ

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

# Future Recipes

This chapter will eventually include:

- Logout
- Forgot Password
- Reset Password
- API Login
- storageState()
- OAuth Login
- Single Sign-On (SSO)
- Multi-Factor Authentication (MFA)
- Cookie Authentication

---

# Summary

This chapter introduced the complete authentication lifecycle:

- Negative Login
- Successful Login
- User Registration
- Authentication Best Practices
- Reliable Form Automation

These workflows form the foundation for every authenticated business scenario you'll automate later in the repository.

---

➡ **Next Chapter:** Assertions

You'll learn how to build reliable, web-first validations using Playwright's retryable assertion library.