# Video Recording

# Why Record Videos?

Logs tell you **what** failed.

Screenshots show **where** it failed.

Videos show **how** it failed.

A recorded browser session helps answer questions such as:

- Was the page still loading?
- Did the popup appear?
- Did the browser navigate unexpectedly?
- Was the element hidden?
- Did an animation prevent the click?
- Did the application freeze?

Videos are especially useful when debugging failures that cannot be reproduced locally.

---

# Configuring Video Recording

Video recording is configured globally inside **playwright.config.js**.

Example:

```javascript
use: {
    video: 'retain-on-failure'
}
```

---

# Video Recording Modes

Playwright supports four recording modes.

| Mode | Description | Recommended |
|------|-------------|-------------|
| `off` | Never record videos | Local Development |
| `on` | Record every test | Rarely |
| `retain-on-failure` | Keep videos only for failed tests | ✅ Recommended |
| `on-first-retry` | Record only when a failed test is retried | Large Test Suites |

---

# Video: off

```javascript
use: {
    video: 'off'
}
```

Advantages

- Fastest execution
- Minimal storage
- Ideal during development

Recommended for:

- Local execution
- Frequent debugging
- Small feature development

---

# Video: on

```javascript
use: {
    video: 'on'
}
```

Every test records a complete browser session.

Advantages

- Complete execution history

Disadvantages

- Large storage requirements
- Longer execution
- Increased CI artifact size

Suitable for:

- Short demo suites
- Training
- Temporary investigations

---

# Video: retain-on-failure

```javascript
use: {
    video: 'retain-on-failure'
}
```

This is the most common production configuration.

Benefits

- Videos only when needed
- Small storage footprint
- Faster pipelines
- Excellent debugging support

Recommended for nearly every enterprise automation project.

---

# Video: on-first-retry

```javascript
use: {
    video: 'on-first-retry'
}
```

Playwright records a video only if a test fails and is retried.

Benefits

- Minimal storage
- Captures flaky failures
- Keeps successful executions lightweight

Useful when:

- Large regression suites
- Thousands of tests
- Retry-enabled CI pipelines

---

# Where are Videos Stored?

By default, Playwright stores videos inside the test output directory.

Typical structure:

```
test-results/

    login-test/

        video.webm

    checkout-test/

        video.webm
```

The exact location can be customized using:

```javascript
outputDir: 'test-results'
```

---

# Viewing Recorded Videos

Videos can be opened using any browser or media player that supports the **WebM** format.

They are also linked automatically inside the Playwright HTML Report.

---

# Videos in HTML Reports

When using:

```javascript
reporter: 'html'
```

failed tests automatically include links to:

- Video
- Trace
- Screenshot
- Error stack
- Console output (when configured)

This creates a complete debugging experience.

---

# Video vs Screenshot

| Video | Screenshot |
|--------|------------|
| Complete execution | Single moment |
| Larger storage | Small storage |
| Best for timing issues | Best for UI validation |
| Shows browser interactions | Shows final state |

Use videos when understanding **how** a failure occurred.

---

# Video vs Trace Viewer

Both features record execution, but they serve different purposes.

| Video | Trace Viewer |
|--------|--------------|
| Browser recording | Complete Playwright execution |
| Visual playback | Step-by-step timeline |
| User perspective | Engineer perspective |
| Good for demonstrations | Best for debugging |

For difficult failures, Trace Viewer usually provides more detailed information.

Videos are excellent companions to traces.

---

# Video Storage Considerations

Recording every test can generate significant storage.

Example:

```
500 Tests

↓

500 Videos

↓

Several GB of artifacts
```

For this reason, avoid recording every successful execution in production pipelines.

---

# Recording in CI/CD

Recommended configuration:

```javascript
use: {

    video: 'retain-on-failure'

}
```

Only failed tests generate video artifacts.

This provides useful debugging information while minimizing storage.

---

# Recording During Local Development

Recommended configuration:

```javascript
use: {

    video: 'off'

}
```

Videos usually slow local execution without providing significant value during active development.

---

# Combining Videos with Traces

A recommended enterprise configuration:

```javascript
use: {

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'

}
```

When a test fails you automatically receive:

- Screenshot
- Video
- Trace
- HTML Report

This dramatically reduces debugging time.

---

# Real Project Recommendations

## Local Development

```javascript
use: {

    video: 'off'

}
```

Fast execution.

---

## CI Pipeline

```javascript
use: {

    video: 'retain-on-failure'

}
```

Recommended.

---

## Large Enterprise Suites

```javascript
use: {

    video: 'on-first-retry'

}
```

Balances debugging with storage efficiency.

---

## Demonstrations

```javascript
use: {

    video: 'on'

}
```

Useful for training sessions and recorded demonstrations.

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Requires third-party libraries | Built-in support |
| Manual configuration | One configuration property |
| Separate reporting integration | Automatic HTML report integration |
| Complex setup | Minimal configuration |

Playwright makes browser recording significantly simpler than traditional Selenium frameworks.

---

# FAQ

### Why shouldn't every test record a video?

Recording every execution increases storage requirements and pipeline duration without providing additional value for successful tests.

---

### What is the recommended production setting?

```javascript
video: 'retain-on-failure'
```

It provides useful debugging artifacts while minimizing storage.

---

### When should `on-first-retry` be used?

For large test suites where retries are enabled and storage optimization is important.

---

### Are videos enough to debug failures?

Not always.

Videos show browser behavior, while Trace Viewer provides detailed Playwright execution information.

Using both together offers the best debugging experience.

---

### Does video recording slow execution?

Yes.

Encoding browser sessions requires additional resources.

---

### Should videos be committed to Git?

No.

Videos are execution artifacts and should remain outside version control.

---

### Can videos be viewed from the HTML report?

Yes.

Playwright automatically links recorded videos to failed tests.

---

### Which format does Playwright use?

Playwright records videos in **WebM** format.

---

# Decision Matrix

| Scenario | Recommended Configuration | Why? |
|----------|---------------------------|------|
| **Local Development** | `video: 'off'` | Fastest execution while writing tests. |
| **CI/CD Pipeline** | `video: 'retain-on-failure'` | Keeps only useful debugging artifacts. |
| **Large Regression Suite** | `video: 'on-first-retry'` | Reduces storage while capturing flaky failures. |
| **Training & Demonstrations** | `video: 'on'` | Records every execution for playback. |
| **Investigating Intermittent Failures** | `video: 'on'` (temporarily) | Captures every browser interaction during troubleshooting. |
| **Enterprise Automation Projects** | `retain-on-failure` + Trace | Best balance of diagnostics and storage efficiency. |

---

# Real Project Defaults

## Local Development

```javascript
use: {
    video: 'off'
}
```

---

## Continuous Integration

```javascript
use: {
    video: 'retain-on-failure'
}
```

---

## Large Enterprise Suite

```javascript
use: {
    video: 'on-first-retry',
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

This combination provides an excellent balance between execution speed and debugging capability.

---

# Quick Reference

| Environment | Recommended Setting |
|-------------|---------------------|
| Local Development | `off` |
| CI/CD | `retain-on-failure` |
| Large Test Suite | `on-first-retry` |
| Demos | `on` |
| Debugging Flaky Tests | `on` (temporarily) |

---