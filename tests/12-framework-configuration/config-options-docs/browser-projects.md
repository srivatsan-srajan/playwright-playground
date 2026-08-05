# Browser Projects & Multi-Browser Testing

# What is a Browser Project?

A Playwright Project is an independent execution configuration.

Each project can have its own:

- Browser
- Device
- Viewport
- Locale
- Permissions
- Authentication
- Timeouts
- Base URL

Think of a Project as a complete browser profile.

---

# Why Browser Projects?

Without Projects, many automation teams create duplicate test suites.

Example:

```
Chrome Tests

Firefox Tests

Safari Tests

Edge Tests
```

This quickly becomes difficult to maintain.

Instead:

```
Single Test Suite

        │

        ▼

Projects

        │

 ┌──────┼──────┐

 ▼      ▼      ▼

Chrome Firefox WebKit

        │

        ▼

Same Tests
```

One test.

Multiple browsers.

Zero duplication.

---

# Basic Browser Project

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({

    projects: [

        {

            name: 'Chromium',

            use: {

                browserName: 'chromium'

            }

        }

    ]

});
```

---

# Multiple Browser Projects

```javascript
projects: [

{

name: 'Chromium',

use: {

browserName: 'chromium'

}

},

{

name: 'Firefox',

use: {

browserName: 'firefox'

}

},

{

name: 'WebKit',

use: {

browserName: 'webkit'

}

}

]
```

Now every test runs on all three browsers automatically.

---

# Why WebKit Matters

Many teams forget Safari.

Playwright uses WebKit to provide excellent Safari compatibility.

Testing only Chromium is not enough for public-facing applications.

---

# Browser Channels

Projects can launch installed browsers instead of bundled browsers.

Example:

```javascript
projects: [

{

name: 'Google Chrome',

use: {

channel: 'chrome'

}

},

{

name: 'Microsoft Edge',

use: {

channel: 'msedge'

}

}

]
```

Useful when validating production browsers.

---

# Desktop Device Projects

Playwright provides built-in desktop profiles.

Example:

```javascript
import { devices } from '@playwright/test';

projects: [

{

name: 'Desktop Chrome',

use: {

...devices['Desktop Chrome']

}

}

]
```

---

# Mobile Projects

Example:

```javascript
projects: [

{

name: 'iPhone 15',

use: {

...devices['iPhone 15']

}

},

{

name: 'Pixel 8',

use: {

...devices['Pixel 8']

}

}

]
```

The same tests now execute against desktop and mobile devices.

---

# Tablet Projects

```javascript
projects: [

{

name: 'iPad',

use: {

...devices['iPad']

}

}

]
```

Useful for responsive applications.

---

# Locale Projects

Projects can validate localization.

Example:

```javascript
projects: [

{

name: 'English',

use: {

locale: 'en-US'

}

},

{

name: 'French',

use: {

locale: 'fr-FR'

}

}

]
```

Very useful for international applications.

---

# Timezone Projects

Applications often display different information depending on time zone.

```javascript
projects: [

{

name: 'India',

use: {

timezoneId: 'Asia/Kolkata'

}

},

{

name: 'New York',

use: {

timezoneId: 'America/New_York'

}

}

]
```

---

# Color Scheme Projects

Validate dark mode.

```javascript
projects: [

{

name: 'Dark Mode',

use: {

colorScheme: 'dark'

}

},

{

name: 'Light Mode',

use: {

colorScheme: 'light'

}

}

]
```

---

# Permission Projects

Different browser permissions can be configured per project.

Example:

```javascript
projects: [

{

name: 'Location Enabled',

use: {

permissions: ['geolocation']

}

}

]
```

---

# Authentication Projects

Large projects often reuse authenticated sessions.

Example:

```javascript
projects: [

{

name: 'Authenticated',

use: {

storageState: 'playwright/.auth/user.json'

}

}

]
```

Benefits:

- Faster execution
- Skip login
- Stable authentication

---

# Environment Projects

Projects can execute against different environments.

Example:

```javascript
projects: [

{

name: 'QA',

use: {

baseURL: 'https://qa.example.com'

}

},

{

name: 'Staging',

use: {

baseURL: 'https://staging.example.com'

}

}

]
```

The same tests validate multiple deployments.

---

# Project Dependencies

Playwright also supports project dependencies.

Example:

```
Authentication Project

↓

Creates Storage State

↓

Regression Project

↓

Uses Storage State
```

This avoids repeated login steps.

---

# Running All Projects

```bash
npx playwright test
```

Every configured project executes.

---

# Running One Project

```bash
npx playwright test --project=Chromium
```

---

# Running Multiple Projects

```bash
npx playwright test --project=Chromium --project=Firefox
```

---

# Viewing Results

The HTML report groups results by project.

```
Chromium

✔ 120 Passed

Firefox

✔ 120 Passed

WebKit

✔ 118 Passed

2 Failed
```

This makes browser-specific issues easy to identify.

---

# Real Project Recommendations

## Enterprise Internal Application

Projects:

```
Chromium

Firefox
```

Usually sufficient.

---

## Customer Portal

Projects:

```
Chromium

Firefox

WebKit

iPhone

Pixel
```

Recommended.

---

## Banking Application

Projects:

```
Chromium

Firefox

WebKit

Dark Mode

Light Mode
```

---

## International Application

Projects:

```
English

French

German

Japanese
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Separate TestNG suites | Browser Projects |
| Browser capabilities | Project configuration |
| Different execution profiles | Projects |
| Duplicate test code | Shared test suite |

Projects eliminate much of the duplication commonly seen in Selenium frameworks.

---

# FAQ

### Why use Browser Projects?

Projects allow the same tests to execute across multiple browsers, devices, and environments without duplicating code.

---

### Should every commit run all browsers?

Not necessarily.

Many teams run Chromium on every commit and execute the complete browser matrix nightly or before release.

---

### What is the advantage of Authentication Projects?

They reduce execution time by avoiding repeated login operations.

---

### Can projects configure different base URLs?

Yes.

Projects are commonly used to validate QA, Staging, and Production environments.

---

### Can each project have different browser settings?

Yes.

Every project has its own independent `use` configuration.

---

### Can projects share tests?

Yes.

Projects execute the same tests automatically.

---

### Can projects run in parallel?

Yes.

Projects can execute simultaneously depending on worker availability.

---

### Should mobile testing use projects?

Absolutely.

Projects are the recommended way to execute the same tests against desktop and mobile devices.

---

# Decision Matrix

| Scenario | Recommended Projects |
|----------|----------------------|
| Enterprise Portal | Chromium + Firefox |
| Public Website | Chromium + Firefox + WebKit |
| Responsive Application | Desktop + iPhone + Android |
| Banking Application | Browser + Dark Mode |
| International Product | Locale Projects |
| Multi-Environment Validation | QA + Staging + Production |
| Authentication-heavy Suite | Authentication Project + Regression Project |

---

# Performance Impact

| Configuration | Execution Time | Maintenance |
|--------------|---------------:|------------:|
| Single Browser | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Three Browsers | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Browser + Mobile | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Browser + Environment Matrix | ⭐⭐ | ⭐⭐⭐⭐⭐ |

Projects increase execution time but dramatically improve test coverage while avoiding code duplication.

---

# Real Project Defaults

## Local Development

```javascript
projects: [

{

name: 'Chromium',

use: {

browserName: 'chromium'

}

}

]
```

---

## Pull Request Validation

```javascript
projects: [

{

name: 'Chromium',

use: {

browserName: 'chromium'

}

},

{

name: 'Firefox',

use: {

browserName: 'firefox'

}

}

]
```

---

## Nightly Regression

```javascript
projects: [

{

name: 'Chromium',

use: {

browserName: 'chromium'

}

},

{

name: 'Firefox',

use: {

browserName: 'firefox'

}

},

{

name: 'WebKit',

use: {

browserName: 'webkit'

}

},

{

name: 'iPhone 15',

use: {

...devices['iPhone 15']

}

},

{

name: 'Pixel 8',

use: {

...devices['Pixel 8']

}

}

]
```

---

# Real World Scenario

## Enterprise SaaS Application

A global SaaS platform supports:

- Chrome
- Edge
- Firefox
- Safari
- Mobile Browsers

The Playwright configuration includes:

- **PR Pipeline**
  - Chromium
  - Firefox

- **Nightly Regression**
  - Chromium
  - Firefox
  - WebKit
  - iPhone 15
  - Pixel 8
  - Dark Mode
  - Light Mode

- **Release Validation**
  - QA
  - Staging
  - Production

This strategy balances fast feedback during development with comprehensive browser coverage before production releases.

---

# Engineering Tip

Think of **Projects** as execution profiles rather than browser definitions.

A project can represent:

- A browser
- A mobile device
- A locale
- A user role
- A deployment environment
- A theme
- An authenticated session

The more configuration you move into Projects, the cleaner and more maintainable your test code becomes.

---

# Quick Reference

| Use Case | Recommended Project |
|----------|---------------------|
| Local Development | Chromium |
| Pull Requests | Chromium + Firefox |
| Nightly Regression | Chromium + Firefox + WebKit |
| Responsive Testing | Desktop + iPhone + Android |
| Localization | Locale Projects |
| Environment Validation | QA + Staging + Production |
| Login-heavy Applications | Authentication Project |

---