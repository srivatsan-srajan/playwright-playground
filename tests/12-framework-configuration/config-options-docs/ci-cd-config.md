# CI/CD Configuration

# Typical CI Pipeline

```
Checkout Source

↓

Install Node Modules

↓

Install Browsers

↓

Build Application

↓

Run Playwright Tests

↓

Generate Reports

↓

Archive Artifacts

↓

Publish Results
```

---

# Installing Browsers

Most CI agents start with a clean environment.

Install Playwright browsers:

```bash
npx playwright install
```

Linux runners often require additional browser dependencies.

```bash
npx playwright install --with-deps
```

---

# Running Tests

Typical command:

```bash
npx playwright test
```

Run a specific project:

```bash
npx playwright test --project=Chromium
```

Run only smoke tests:

```bash
npx playwright test --grep @smoke
```

---

# Recommended CI Configuration

```javascript
export default defineConfig({

    retries: 2,

    workers: '50%',

    reporter: [

        ['dot'],

        ['html'],

        ['junit']

    ],

    use: {

        headless: true,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'

    }

});
```

This provides an excellent balance between speed and diagnostics.

---

# Headless Execution

CI pipelines normally execute browsers without a graphical interface.

```javascript
use: {

    headless: true

}
```

Benefits:

- Faster execution
- Lower memory usage
- Suitable for Linux runners
- No display server required

---

# Retries

Infrastructure failures occasionally occur.

Recommended:

```javascript
retries: 2
```

Avoid excessive retries.

Retries should never hide flaky tests.

---

# Workers

Use available CPU resources efficiently.

```javascript
workers: '50%'
```

Using percentages allows Playwright to scale automatically across different build agents.

---

# Browser Projects

CI commonly executes multiple browser projects.

Example:

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

---

# Artifact Management

Preserve useful debugging artifacts.

Recommended:

- HTML Report
- Screenshots
- Videos
- Trace Files
- JUnit XML

These should remain available even after the pipeline finishes.

---

# HTML Reports

Generate automatically.

```javascript
reporter: [

['html']

]
```

After execution:

```bash
npx playwright show-report
```

---

# JUnit Reports

Most CI systems understand JUnit XML.

Example:

```javascript
reporter: [

['junit', {

outputFile: 'results.xml'

}]

]
```

Supported by:

- Jenkins
- Azure DevOps
- GitLab
- TeamCity
- Bamboo

---

# Pipeline Optimization

Recommended execution order:

```
Lint

↓

Unit Tests

↓

API Tests

↓

Playwright Smoke

↓

Deploy

↓

Regression Tests
```

This provides fast feedback while minimizing wasted execution.

---

# Smoke Tests

Tag important tests.

```javascript
test('Login @smoke', async () => {

});
```

Run:

```bash
npx playwright test --grep @smoke
```

Ideal for pull requests.

---

# Nightly Regression

A typical nightly job executes:

- Chromium
- Firefox
- WebKit
- Mobile Projects
- Visual Tests
- Accessibility Tests

Nightly pipelines prioritize coverage over speed.

---

# Pull Request Validation

Recommended:

```
Chromium

↓

Smoke Tests

↓

Fast Feedback
```

Keep execution under 10–15 minutes whenever possible.

---

# Release Validation

Recommended:

```
Multiple Browsers

↓

Regression Suite

↓

Reports

↓

Artifacts

↓

Deployment Approval
```

---

# Browser Installation Caching

Installing browsers on every build increases pipeline time.

Most CI platforms support caching.

Cache:

```
node_modules

Playwright Browsers
```

This can significantly reduce build duration.

---

# Environment Variables

Avoid hardcoding credentials.

Example:

```javascript
process.env.BASE_URL

process.env.USERNAME

process.env.PASSWORD
```

CI systems should inject these securely.

---

# Secrets Management

Store secrets in the CI platform.

Examples:

- GitHub Secrets
- Azure DevOps Library
- Jenkins Credentials
- GitLab Variables
- AWS Secrets Manager

Never commit secrets to Git.

---

# Handling Failures

A failed test should automatically provide:

- HTML Report
- Screenshot
- Trace
- Video
- Console Logs

Engineers should rarely need to rerun a build simply to understand a failure.

---

# Real Project Recommendations

## Local Development

```
Chromium

Headed

Trace On

Workers: 2
```

---

## Pull Request

```
Chromium

Smoke Tests

Headless

Workers: 50%
```

---

## Nightly

```
All Browsers

All Devices

Regression Suite

Parallel
```

---

## Release Pipeline

```
Cross Browser

Full Regression

Reports

Artifacts

Approval
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Selenium Grid | Built-in Parallel Workers |
| Third-party reports | HTML Reporter |
| Manual browser management | `playwright install` |
| Separate retry libraries | Built-in retries |
| Custom screenshots | Built-in screenshots, videos, traces |

Playwright significantly reduces CI pipeline complexity by providing browser management, reporting, diagnostics, and parallel execution out of the box.

---

# FAQ

### Why should Playwright run headlessly in CI?

Headless execution consumes fewer resources, runs faster, and does not require a graphical display.

---

### Why archive traces and videos?

They allow engineers to diagnose failures without rerunning the pipeline.

---

### Why use smoke tests for pull requests?

Smoke tests provide rapid feedback while keeping build times short.

---

### Why use browser caching?

Caching browsers reduces installation time and speeds up every build.

---

### Should every commit execute the full regression suite?

No.

Run smoke tests on every commit.

Execute the full regression suite nightly or before release.

---

### Should reports be archived?

Yes.

Reports and artifacts are invaluable when investigating failures.

---

### Can CI inject environment variables?

Yes.

All major CI platforms support secure environment variables and secrets.

---

### Should Playwright install browsers every build?

Only if they are not already cached.

Caching browsers significantly improves build performance.

---

# Decision Matrix

| Scenario | Recommended Strategy |
|----------|----------------------|
| Local Development | Chromium + Headed |
| Pull Request | Chromium + Smoke Tests |
| CI Build | Chromium + Firefox |
| Nightly | Full Browser Matrix |
| Release | Cross-Browser Regression |
| Hotfix | Smoke Tests + Critical Flows |

---

# Performance Impact

| Configuration | Speed | Reliability |
|---------------|------:|------------:|
| Headless | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Browser Cache | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Retries | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Parallel Workers | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Trace on Failure | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

# Real Project Defaults

## Pull Request Pipeline

```javascript
use: {

    headless: true,

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure'

}

workers: '50%'

retries: 1
```

---

## Nightly Regression

```javascript
workers: '75%'

retries: 2

fullyParallel: true

projects: [

Chromium,

Firefox,

WebKit,

iPhone,

Pixel

]
```

---

## Release Validation

```javascript
workers: '50%'

retries: 2

reporter: [

['html'],

['junit']

]
```

Archive all artifacts.

---

# Real World Scenario

## Enterprise Banking Platform

The engineering team maintains over **4,000 Playwright tests**.

Pipeline strategy:

### Pull Request

- Chromium
- Smoke Tests
- 8-minute execution
- HTML Report

### Nightly

- Chromium
- Firefox
- WebKit
- Mobile Projects
- Accessibility Tests
- Visual Regression

### Release Pipeline

- Full Cross-Browser Regression
- HTML Report
- JUnit Report
- Trace
- Video
- Screenshots
- Deployment Approval

This approach delivers rapid developer feedback while ensuring comprehensive validation before production releases.

---

# Engineering Tip

**Optimize your pipeline for feedback, not just execution speed.**

A fast pipeline that provides poor diagnostics wastes engineering time. Conversely, a slow pipeline delays development.

A balanced Playwright CI strategy should provide:

- Fast smoke test feedback for developers
- Comprehensive regression coverage before release
- Rich debugging artifacts for failures
- Efficient resource utilization through parallel execution and caching

---

# Quick Reference

| Pipeline Stage | Recommended Configuration |
|----------------|---------------------------|
| Local Development | Headed + Chromium |
| Pull Request | Headless + Smoke Tests |
| CI Build | Headless + Chromium + Firefox |
| Nightly | Full Browser Matrix |
| Release | Cross-Browser + Reports + Artifacts |
| Hotfix | Smoke + Critical Business Flows |

---