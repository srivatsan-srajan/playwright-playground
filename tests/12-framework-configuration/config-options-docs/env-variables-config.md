# Environment Variables & Configuration Management

# Common Environment Variables

Examples include:

```
BASE_URL

API_URL

USERNAME

PASSWORD

API_KEY

AUTH_TOKEN

HEADLESS

BROWSER

LOCALE

TIMEZONE
```

---

# Accessing Environment Variables

Node.js exposes environment variables through:

```javascript
process.env
```

Example:

```javascript
const baseUrl = process.env.BASE_URL;
```

---

# Using BASE_URL

Instead of:

```javascript
await page.goto('https://qa.example.com');
```

Use:

```javascript
await page.goto(process.env.BASE_URL);
```

The same test works everywhere.

---

# Configuring Base URL

A common pattern:

```javascript
use: {

    baseURL: process.env.BASE_URL

}
```

Tests become cleaner.

Instead of:

```javascript
await page.goto(process.env.BASE_URL + '/login');
```

You simply write:

```javascript
await page.goto('/login');
```

---

# Using dotenv

Most Playwright projects use **dotenv** to load environment variables from a file.

Install:

```bash
npm install dotenv
```

Load it:

```javascript
import 'dotenv/config';
```

Now values from a `.env` file become available through `process.env`.

---

# Example .env File

```text
BASE_URL=https://qa.example.com

USERNAME=testuser

PASSWORD=secret123

HEADLESS=true
```

Do **not** commit sensitive `.env` files to source control.

---

# Multiple Environment Files

Many projects maintain one file per environment.

```
.env.local

.env.dev

.env.qa

.env.uat

.env.staging

.env.production
```

Each contains environment-specific values.

---

# Selecting an Environment

Example:

```bash
ENV=qa npx playwright test
```

Inside the configuration:

```javascript
const environment = process.env.ENV || 'local';
```

Load the appropriate configuration based on the selected environment.

---

# Configuration Objects

Instead of reading environment variables throughout your tests, centralize them.

Example:

```javascript
export const config = {

    baseUrl: process.env.BASE_URL,

    username: process.env.USERNAME,

    password: process.env.PASSWORD

};
```

Now tests access:

```javascript
config.baseUrl
```

rather than `process.env` everywhere.

---

# Avoid Hardcoded Credentials

Avoid:

```javascript
const password = 'Password123';
```

Prefer:

```javascript
const password = process.env.PASSWORD;
```

This keeps credentials outside source control.

---

# Feature Flags

Environment variables are useful for enabling or disabling functionality.

Example:

```javascript
if (process.env.ENABLE_VISUAL_TESTS === 'true') {

    // Execute visual tests

}
```

---

# Browser Selection

Example:

```text
BROWSER=chromium
```

Configuration:

```javascript
browserName: process.env.BROWSER
```

---

# Headless Execution

```text
HEADLESS=true
```

Configuration:

```javascript
headless:

process.env.HEADLESS === 'true'
```

---

# Environment Validation

Before running tests, verify required variables exist.

Example:

```javascript
if (!process.env.BASE_URL) {

    throw new Error('BASE_URL not configured.');

}
```

Fail fast.

---

# Secrets Management

Enterprise projects rarely store production secrets in `.env` files.

Instead they use:

- GitHub Secrets
- Azure Key Vault
- AWS Secrets Manager
- HashiCorp Vault
- Jenkins Credentials

Playwright simply reads values from `process.env`.

---

# Configuration Folder

A common structure:

```
config/

    environments.js

    qa.js

    staging.js

    production.js
```

Keeps configuration organized.

---

# Example Environment Object

```javascript
export default {

    baseUrl: process.env.BASE_URL,

    retries: 2,

    timeout: 30000

};
```

---

# Real Project Recommendations

## Local Development

Use:

```
.env.local
```

---

## QA

Use:

```
.env.qa
```

---

## Staging

Use:

```
.env.staging
```

---

## Production

Prefer secure secret management instead of local files.

---
# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Java Properties | Environment Variables |
| Config Classes | `process.env` + Config Objects |
| Multiple XML Files | `.env` Files |
| Separate Test Suites | Same Tests, Different Configuration |

---

# FAQ

### Why use environment variables?

To separate configuration from automation code, allowing the same tests to run in multiple environments.

---

### Why shouldn't credentials be hardcoded?

Hardcoded secrets create security risks and make maintenance difficult.

---

### Why centralize configuration?

It improves maintainability, readability, and consistency.

---

### Why validate environment variables before execution?

To fail immediately when required configuration is missing.

---

### Should every environment have its own `.env` file?

Yes.

This is a common and maintainable approach.

---

### Should `.env` files be committed?

Usually no.

Sensitive files should be ignored using `.gitignore`.

A `.env.example` file can be committed to document required variables.

---

### Can Playwright switch environments without changing tests?

Yes.

Changing the environment variables is sufficient.

---

### Can CI systems provide environment variables?

Yes.

Most CI/CD platforms inject environment variables securely at runtime.

---

# Decision Matrix

| Scenario | Recommended Approach |
|----------|----------------------|
| Local Development | `.env.local` |
| QA | `.env.qa` |
| Staging | `.env.staging` |
| Production | Secret Manager |
| Browser Selection | Environment Variable |
| Credentials | Secret Manager / CI Secrets |
| URLs | `BASE_URL` |

---

# Performance Impact

| Practice | Performance | Maintainability |
|----------|------------:|----------------:|
| Hardcoded Values | ⭐⭐⭐⭐⭐ | ⭐ |
| Environment Variables | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Config Objects | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Secret Managers | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

Environment variables have virtually no runtime cost but dramatically improve maintainability.

---

# Real Project Defaults

## Local

```
.env.local
```

---

## QA

```
.env.qa
```

---

## CI/CD

Inject values using the pipeline.

Example:

```
BASE_URL

USERNAME

PASSWORD

API_KEY
```

---

## Configuration

```javascript
use: {

    baseURL: process.env.BASE_URL,

    headless: process.env.HEADLESS === 'true'

}
```

---

# Real World Scenario

## Global E-Commerce Platform

The same Playwright suite executes against:

- Local
- QA
- UAT
- Staging
- Production

The only differences are:

- URLs
- Credentials
- API Keys
- Feature Flags

All configuration comes from environment variables.

No test code changes are required between environments, significantly reducing maintenance effort and minimizing deployment risk.

---