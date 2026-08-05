# Trace Viewer

# What is Trace Viewer?

Trace Viewer is an interactive debugging tool that records the complete execution of a Playwright test.

Unlike screenshots or videos, Trace Viewer records:

- Browser actions
- Network requests
- DOM snapshots
- Console messages
- Source code
- Timings
- Assertions
- Screenshots

allowing you to replay a failed test step by step.

---

# Why Use Trace Viewer?

Consider a failed login test.

Without tracing you might only know:

```
Login button not found.
```

With Trace Viewer you can answer questions like:

- Was the page still loading?
- Did navigation complete?
- Did another element cover the button?
- Was the locator correct?
- Did JavaScript throw an error?
- Was an API request unsuccessful?
- Did an assertion fail because of timing?

Trace Viewer eliminates much of the guesswork involved in debugging.

---

# How Trace Viewer Works

```
Playwright Test

        │

        ▼

Trace Recording

        │

        ▼

trace.zip

        │

        ▼

Trace Viewer

        │

        ▼

Replay Every Step
```

---

# Configuring Trace Recording

Tracing is configured inside **playwright.config.js**.

```javascript
use: {
    trace: 'retain-on-failure'
}
```

---

# Trace Recording Modes

Playwright supports four trace modes.

| Mode | Description | Recommended |
|------|-------------|-------------|
| `off` | Never record traces | Local Development |
| `on` | Record every test | Debugging |
| `retain-on-failure` | Keep traces only for failed tests | ✅ Recommended |
| `on-first-retry` | Record only during the first retry | Large Test Suites |

---

# Trace: off

```javascript
use: {
    trace: 'off'
}
```

Advantages

- Fastest execution
- Smallest storage footprint

Suitable for:

- Small local experiments
- Quick debugging sessions

---

# Trace: on

```javascript
use: {
    trace: 'on'
}
```

Every test execution produces a trace.

Advantages

- Complete execution history
- Excellent for learning Playwright
- Useful during framework development

Disadvantages

- Larger storage
- Longer execution
- Not recommended for production pipelines

---

# Trace: retain-on-failure

```javascript
use: {
    trace: 'retain-on-failure'
}
```

This is the recommended configuration for most enterprise projects.

Benefits

- Traces generated only when needed
- Excellent debugging support
- Minimal storage impact

---

# Trace: on-first-retry

```javascript
use: {
    trace: 'on-first-retry'
}
```

If a test fails and is retried, Playwright records the retry execution.

Advantages

- Very small storage footprint
- Useful for intermittent failures
- Excellent for large regression suites

---

# Opening a Trace

After execution, Playwright creates a trace archive.

Example:

```
trace.zip
```

Open it using:

```bash
npx playwright show-trace trace.zip
```

A browser window opens with the interactive Trace Viewer.

---

# Anatomy of Trace Viewer

Trace Viewer consists of several panels.

```
Timeline

Actions

DOM Snapshot

Source Code

Network

Console

Metadata
```

Each panel provides a different perspective on the execution.

---

# Timeline

The timeline displays every Playwright action in chronological order.

Examples:

- page.goto()
- click()
- fill()
- expect()
- locator()

Selecting an action updates all other panels.

---

# Action Details

Each recorded action displays:

- Duration
- Locator
- Source file
- Line number
- Action status

This makes it easy to identify slow or failing operations.

---

# DOM Snapshot

Trace Viewer captures the DOM at every recorded action.

You can inspect:

- Element hierarchy
- Text
- Attributes
- Visibility
- Layout

Unlike live browser debugging, the DOM snapshot represents the exact state at that moment in time.

---

# Network Panel

Every HTTP request is recorded.

Information includes:

- URL
- Method
- Status code
- Request headers
- Response headers
- Timing

This is extremely useful when investigating API-related failures.

---

# Console Messages

JavaScript console output is also captured.

Examples include:

- console.log()
- console.error()
- console.warn()

Console messages often explain application failures that are invisible in the UI.

---

# Source Code

Trace Viewer links actions directly to the originating test code.

Example:

```
tests/login.spec.js

Line 28

await page.getByRole('button').click();
```

This allows engineers to jump directly from a failure to the relevant code.

---

# Screenshots

Each action contains an associated screenshot.

Unlike standalone screenshots, Trace Viewer lets you navigate through screenshots chronologically.

---

# Metadata

Additional execution information includes:

- Browser
- Operating System
- Playwright Version
- Viewport
- Device
- Project Name

Useful when debugging environment-specific failures.

---

# Trace vs Screenshot

| Screenshot | Trace Viewer |
|------------|--------------|
| Single image | Complete execution |
| Static | Interactive |
| Small file | Larger archive |
| Final state | Every state |

---

# Trace vs Video

| Video | Trace Viewer |
|--------|--------------|
| Browser recording | Execution recording |
| Visual replay | Browser + DOM + Network + Console |
| User perspective | Engineer perspective |
| Good for demos | Best for debugging |

---

# Trace vs Logs

| Logs | Trace Viewer |
|------|--------------|
| Text only | Interactive execution |
| Manual analysis | Rich visual debugging |
| Limited context | Complete browser context |

---

# Traces in HTML Reports

When using:

```javascript
reporter: 'html'
```

Playwright automatically links trace files for failed tests.

No additional configuration is required.

---

# Real Project Recommendations

## Local Development

```javascript
use: {
    trace: 'on'
}
```

Useful while learning Playwright or debugging framework code.

---

## Continuous Integration

```javascript
use: {
    trace: 'retain-on-failure'
}
```

Recommended.

Provides rich diagnostics with minimal storage impact.

---

## Large Regression Suites

```javascript
use: {
    trace: 'on-first-retry'
}
```

Excellent balance between debugging capability and storage usage.

---

## Investigating Flaky Tests

Temporarily enable:

```javascript
use: {
    trace: 'on'
}
```

to capture every execution.

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Browser logs | Trace Viewer |
| Screenshots | Screenshots + Timeline |
| Manual debugging | Interactive replay |
| Third-party tools | Built-in |

Trace Viewer is one of the biggest advantages Playwright offers over traditional Selenium frameworks.

---

# FAQ

### Why is Trace Viewer considered Playwright's strongest debugging feature?

Because it captures the complete execution of a test, including browser actions, DOM snapshots, network requests, console messages, screenshots, timings, and source code.

---

### What is the recommended production trace configuration?

```javascript
trace: 'retain-on-failure'
```

---

### When should `trace: 'on'` be used?

During framework development, learning Playwright, or investigating difficult failures.

---

### Why is Trace Viewer more useful than videos?

Videos show browser behavior.

Trace Viewer explains browser behavior.

---

### Can Trace Viewer replay successful tests?

Yes.

If tracing is enabled.

---

### Does Trace Viewer require internet access?

No.

Trace archives are completely self-contained.

---

### Are trace files large?

Larger than screenshots but generally smaller than videos recorded for every execution.

---

### Should traces be committed to Git?

No.

Trace files are execution artifacts.

---

# Decision Matrix

| Scenario | Recommended Configuration | Why? |
|----------|---------------------------|------|
| Local Development | `trace: 'on'` | Rich debugging while writing tests. |
| CI/CD | `trace: 'retain-on-failure'` | Captures only useful diagnostics. |
| Large Test Suite | `trace: 'on-first-retry'` | Optimizes storage. |
| Framework Development | `trace: 'on'` | Observe every interaction. |
| Flaky Test Investigation | `trace: 'on'` | Capture all executions until issue is understood. |
| Enterprise Automation | `retain-on-failure` | Best balance between storage and diagnostics. |

---

# Performance Impact

| Configuration | Execution Impact | Storage Impact |
|---------------|-----------------:|---------------:|
| `off` | ⭐ Minimal | ⭐ Minimal |
| `retain-on-failure` | ⭐⭐ Low | ⭐⭐ Low |
| `on-first-retry` | ⭐⭐ Low | ⭐⭐ Low |
| `on` | ⭐⭐⭐ Medium | ⭐⭐⭐⭐ High |

---

# Real Project Defaults

## Local Development

```javascript
use: {
    trace: 'on'
}
```

---

## Continuous Integration

```javascript
use: {
    trace: 'retain-on-failure'
}
```

---

## Enterprise Regression Suite

```javascript
use: {
    trace: 'on-first-retry',
    retries: 2
}
```

---

## Recommended Debugging Configuration

```javascript
use: {

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'

}
```

This combination provides comprehensive diagnostics while keeping CI pipelines efficient.

---
# Quick Reference

| Environment | Recommended Setting |
|-------------|---------------------|
| Local Development | `on` |
| CI/CD | `retain-on-failure` |
| Large Suites | `on-first-retry` |
| Framework Development | `on` |
| Flaky Test Investigation | `on` |

---