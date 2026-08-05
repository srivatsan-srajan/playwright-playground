# Configuration & Execution

Read details about each configuration inside the config-options-docs folder.

## Browser Launch Configuration

Configure browser startup behaviour.

Topics include:

- browserName
- channel
- headless
- launchOptions
- slowMo
- Chromium vs Chrome vs Edge

---

## Viewport

Control browser size and screen characteristics.

Topics include:

- viewport
- null viewport
- deviceScaleFactor
- hasTouch
- isMobile

---

## Device Emulation

Run tests using desktop, tablet and mobile profiles.

Topics include:

- Desktop Chrome
- Pixel devices
- iPhone devices
- iPads
- Device descriptors

---

## Screenshots

Capture screenshots for debugging and reporting.

Topics include:

- off
- on
- only-on-failure
- Full page screenshots
- Element screenshots

---

## Video Recording

Record browser sessions.

Topics include:

- off
- on
- retain-on-failure
- on-first-retry

---

## Trace Viewer

One of Playwright's most powerful debugging features.

Topics include:

- Trace collection
- Trace Viewer
- show-trace
- Trace strategies
- Debugging failed tests

---

## SSL Certificate Handling

Run tests against environments using self-signed certificates.

Topics include:

- ignoreHTTPSErrors
- Corporate environments
- Internal servers

---

## Browser Permissions

Grant browser permissions during test execution.

Examples include:

- Clipboard
- Camera
- Microphone
- Notifications
- Geolocation

---

## Timeouts

Understand the different timeout mechanisms available in Playwright.

Topics include:

- timeout
- actionTimeout
- navigationTimeout
- expect timeout

---

## Retries

Configure retry behaviour for unstable environments.

Topics include:

- retries
- Retry strategies
- Avoiding flaky tests

---

## Workers

Control test execution concurrency.

Topics include:

- workers
- Worker percentages
- CI recommendations

---

## Parallel & Serial Execution

Understand different execution models.

Topics include:

- fullyParallel
- test.describe.parallel()
- test.describe.serial()

Example tests included.

---

## Browser Projects

Execute the same test suite across multiple browsers and devices.

Topics include:

- Chromium
- Firefox
- WebKit
- Mobile browsers
- Project overrides

---

## Reporters

Generate useful reports after execution.

Topics include:

- HTML
- List
- Dot
- JSON
- JUnit

---

## Test Discovery

Learn how Playwright discovers tests.

Topics include:

- testDir
- testMatch
- testIgnore

---

## Output Directory

Control where Playwright stores:

- Screenshots
- Videos
- Traces
- Downloads

---

## Global Setup & Teardown

Perform project initialization before the test suite executes.

Typical use cases:

- Authentication
- Test data creation
- Database cleanup

---

## Base URL

Simplify navigation using:

```javascript
await page.goto('/login');
```

instead of hardcoded URLs.

---

## Environment Variables

Store configuration outside source code.

Topics include:

- .env
- process.env
- dotenv

---

## CI/CD Configuration

Recommended configuration for:

- GitHub Actions
- Azure DevOps
- Jenkins
- GitLab CI

Topics include:

- forbidOnly
- retries
- workers
- trace
- reporters

---

## Test Tagging

Organize test execution using tags.

Examples:

- @smoke
- @sanity
- @regression
- @api
- @visual

Example test included.

---

## Running Playwright

A practical reference for commonly used CLI commands.

Examples include:

```bash
npx playwright test

npx playwright test --headed

npx playwright test --debug

npx playwright test --ui

npx playwright test --project=chromium

npx playwright test --grep @smoke

npx playwright test --workers=4

npx playwright test --repeat-each=5

npx playwright show-report

npx playwright show-trace trace.zip

npx playwright codegen
```

---

# Example Files Included

```
playwright.config.example.js

parallel-execution.spec.js

serial-execution.spec.js

test-tags.spec.js
```

These examples demonstrate many of the concepts discussed throughout this chapter.

---

# Engineering Best Practices

✔ Keep browser configuration inside `playwright.config.js`.

✔ Separate local and CI configuration.

✔ Enable traces on failures.

✔ Record videos only when necessary.

✔ Prefer browser projects over duplicated test suites.

✔ Store secrets in environment variables.

✔ Keep retries low and investigate flaky tests.

✔ Use tags to organize execution.

---

# Common Mistakes

❌ Hardcoding URLs.

❌ Recording videos for every test.

❌ Ignoring traces.

❌ Using excessive retries.

❌ Mixing browser configuration with test logic.

❌ Running everything serially.

❌ Committing credentials.

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Browser capabilities | `playwright.config.js` |
| Thread count | workers |
| Browser matrix | projects |
| Explicit waits | Built-in auto waiting |
| External reporting tools | Built-in reporters |

---

# FAQ

### Why does Playwright centralize configuration?

To reduce duplication, improve maintainability, and ensure consistent behaviour across the entire test suite.

---

### When should browser projects be used?

When the same test suite must execute across multiple browsers, devices, or environments.

---

### Why shouldn't retries hide flaky tests?

Retries should improve reliability in unstable environments, not mask problems in the application or automation.

---

### What is the biggest advantage of Trace Viewer?

It allows engineers to replay failed tests step-by-step, making debugging significantly easier than relying on screenshots or logs alone.

---

### Should every project use a `playwright.config.js`?

Yes. Even small projects benefit from centralized configuration.

---

### Should local and CI configurations be identical?

Usually not. Local execution prioritizes debugging, while CI prioritizes speed, diagnostics, and repeatability.

---

### Should browser settings be configured inside tests?

Only when a specific test requires different behaviour. Otherwise, prefer project-level configuration.

---