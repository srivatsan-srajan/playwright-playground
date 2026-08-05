# Global Setup & Global Teardown

# What is Global Setup?

Global Setup executes **once before the first Playwright test starts**.

```
Playwright Starts

        │

        ▼

Global Setup

        │

        ▼

All Test Files

        │

        ▼

Execution
```

Regardless of whether your project contains:

- 5 tests
- 500 tests
- 5,000 tests

Global Setup runs only once.

---

# What is Global Teardown?

Global Teardown executes once after **every Playwright test has completed.**

```
All Tests Finished

        │

        ▼

Global Teardown

        │

        ▼

Cleanup Complete
```

---

# Why Use Global Setup?

Without Global Setup:

```
Login

↓

Test

↓

Login

↓

Test

↓

Login

↓

Test
```

Every test repeats the same initialization.

---

With Global Setup

```
Login Once

↓

Save Authentication

↓

All Tests Reuse It
```

Execution becomes significantly faster.

---

# Configuring Global Setup

Inside **playwright.config.js**

```javascript
export default defineConfig({

    globalSetup: require.resolve('./global-setup')

});
```

---

# Configuring Global Teardown

```javascript
export default defineConfig({

    globalTeardown: require.resolve('./global-teardown')

});
```

---

# Typical Folder Structure

```
project

│

├── playwright.config.js

├── global-setup.js

├── global-teardown.js

├── tests

├── pages

└── utils
```

---

# Example Global Setup

```javascript
import { chromium } from '@playwright/test';

export default async () => {

    const browser = await chromium.launch();

    const page = await browser.newPage();

    // Perform login

    await browser.close();

};
```

---

# Example Global Teardown

```javascript
export default async () => {

    console.log('Cleaning resources...');

};
```

---

# Authentication Setup

One of the most common uses.

```
Launch Browser

↓

Login

↓

Save Storage State

↓

All Tests Reuse Login
```

Example

```javascript
await page.context().storageState({

    path: 'playwright/.auth/user.json'

});
```

Project configuration

```javascript
use: {

    storageState:

        'playwright/.auth/user.json'

}
```

Result:

No repeated login.

---

# Test Data Preparation

Global Setup can:

- Create customers
- Create users
- Seed databases
- Generate API tokens
- Upload reference files

Example

```
Setup

↓

Create Test User

↓

Run 500 Tests

↓

Reuse User
```

---

# Environment Validation

Before executing tests, Global Setup can verify:

- Server availability
- Database connectivity
- API health
- Required files
- Environment variables

Failing early avoids wasting time executing a broken suite.

---

# Mock Server Startup

Some frameworks start mock services before execution.

```
Global Setup

↓

Start Mock API

↓

Execute Tests

↓

Shutdown
```

---

# Cleanup with Global Teardown

Typical cleanup tasks:

- Delete test users
- Delete uploaded files
- Reset database
- Stop mock server
- Archive logs
- Remove temporary folders

---

# Global Setup vs beforeAll()

Many engineers confuse these.

| Global Setup | beforeAll |
|--------------|-----------|
| Runs once | Runs once per file |
| Before every test file | Before tests in a describe/file |
| Entire suite | Current file only |

Use Global Setup for **suite-wide initialization**.

---

# Global Teardown vs afterAll()

| Global Teardown | afterAll |
|-----------------|----------|
| Once after suite | Once after file |
| Entire project | Single test file |

---

# Setup Flow

```
Playwright

↓

Global Setup

↓

Authentication

↓

Environment Validation

↓

Seed Test Data

↓

Execute Tests

↓

Global Teardown

↓

Cleanup
```

---

# Environment Variables

Global Setup is an excellent place to validate required environment variables.

Example

```javascript
if (!process.env.BASE_URL) {

    throw new Error('BASE_URL missing.');

}
```

Fail fast before executing the suite.

---

# Real Project Recommendations

## Authentication

Use Global Setup.

Avoid logging in before every test.

---

## Database Seeding

Use Global Setup.

Create reusable data.

---

## Cleanup

Use Global Teardown.

Delete temporary resources.

---

## Health Checks

Verify APIs before running tests.

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| TestNG @BeforeSuite | Global Setup |
| TestNG @AfterSuite | Global Teardown |
| Shared base class | Global Setup |
| Manual authentication reuse | storageState |

Playwright encourages centralized initialization rather than repetitive suite setup.

---

# FAQ

### Why use Global Setup?

To perform suite-wide initialization once instead of repeating it before every test.

---

### What is the most common use case?

Generating authentication state that all tests reuse.

---

### Why should Global Setup be fast?

Every test suite waits for it to complete.

Slow setup increases total execution time.

---

### Should cleanup always happen?

Ideally yes.

Leaving test data behind makes future executions less predictable.

---

### Can Global Setup launch a browser?

Yes.

It commonly launches a browser to perform authentication.

---

### Can Global Setup call APIs?

Absolutely.

Many projects use APIs instead of the UI to create test data.

---

### Can Global Setup fail the suite?

Yes.

If setup throws an exception, Playwright stops execution.

---

### Is Global Setup required?

No.

Many small projects never need it.

Large enterprise frameworks almost always do.

---

# Decision Matrix

| Scenario | Recommendation |
|----------|----------------|
| Login Once | Global Setup |
| Create Test Data | Global Setup |
| Validate Environment | Global Setup |
| Delete Test Data | Global Teardown |
| Stop Mock Servers | Global Teardown |
| Archive Reports | Global Teardown |
| Per-file Initialization | beforeAll() |
| Per-test Initialization | beforeEach() |

---

# Performance Impact

| Feature | Performance | Benefit |
|----------|------------:|--------:|
| Authentication Setup | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| API Data Seeding | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Environment Validation | ⭐ | ⭐⭐⭐⭐ |
| Cleanup | ⭐ | ⭐⭐⭐⭐ |

A small setup cost often saves significant execution time across the entire suite.

---

# Real Project Defaults

## Global Setup

- Validate environment variables
- Verify server health
- Authenticate once
- Save storage state
- Seed reusable test data

---

## Global Teardown

- Delete temporary test data
- Stop mock services
- Archive execution artifacts
- Remove temporary files

---

# Real World Scenario

## Banking Application

The regression suite contains over **2,000 UI tests**.

Global Setup performs:

- Login as Admin
- Generate authentication state
- Verify API availability
- Seed customer accounts
- Create reusable transactions

Global Teardown:

- Delete created accounts
- Archive logs
- Stop mock payment gateway
- Clean temporary files

This reduces suite execution time by several minutes and ensures consistent test data for every run.

---