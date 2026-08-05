# Screenshots

A screenshot immediately answers questions like:

- Was the page loaded?
- Did the dialog appear?
- Was the user logged in?
- Was the correct page displayed?
- Did the element exist?
- Was the UI broken?

Instead of relying solely on logs, screenshots provide visual evidence of the application's state.

---

# Automatic Screenshots

Playwright can automatically capture screenshots during test execution.

Configure screenshots globally inside **playwright.config.js**.

```javascript
use: {
    screenshot: 'only-on-failure'
}
```

---

# Screenshot Modes

Playwright supports three screenshot modes.

| Mode | Description | Recommended |
|------|-------------|-------------|
| `off` | Never capture screenshots | Local development |
| `on` | Capture after every test | Rarely recommended |
| `only-on-failure` | Capture only failed tests | ✅ Recommended |

---

# Screenshot: off

```javascript
use: {
    screenshot: 'off'
}
```

Use when:

- Local debugging
- Fast execution
- Screenshots are unnecessary

---

# Screenshot: on

```javascript
use: {
    screenshot: 'on'
}
```

Every test generates a screenshot.

Advantages

- Complete visual history

Disadvantages

- Large storage requirements
- Longer execution time
- Most screenshots are unnecessary

---

# Screenshot: only-on-failure

```javascript
use: {
    screenshot: 'only-on-failure'
}
```

Recommended for most projects.

Benefits

- Minimal storage
- Faster execution
- Useful debugging artifacts
- Cleaner reports

---

# Manual Screenshots

Screenshots can also be captured explicitly.

Example:

```javascript
await page.screenshot({
    path: 'screenshots/homepage.png'
});
```

---

# Full Page Screenshot

Normally Playwright captures only the visible viewport.

To capture the complete page:

```javascript
await page.screenshot({

    path: 'screenshots/fullpage.png',

    fullPage: true

});
```

Useful for:

- Landing pages
- Documentation
- Long dashboards
- Responsive validation

---

# Element Screenshot

Capture only a specific element.

Example:

```javascript
await page.locator('#login-form').screenshot({

    path: 'screenshots/login-form.png'

});
```

Useful for:

- Buttons
- Forms
- Cards
- Charts
- Error messages

---

# Screenshot File Format

Playwright currently supports:

```text
PNG
JPEG
```

PNG is recommended because it is lossless and suitable for UI debugging.

---

# Screenshot Naming

Avoid names such as:

```text
image.png

test.png

screenshot.png
```

Prefer descriptive names.

Examples:

```text
login-page.png

checkout-success.png

cart-summary.png

order-confirmation.png
```

Meaningful names simplify troubleshooting.

---

# Capturing Screenshots Before Assertions

Sometimes capturing a screenshot before an assertion helps diagnose failures.

Example:

```javascript
await page.screenshot({

    path: 'before-login.png'

});

await expect(page.getByRole('heading')).toContainText('Dashboard');
```

---

# Screenshots Inside HTML Reports

When using the HTML reporter, Playwright automatically links captured screenshots to failed tests.

This allows engineers to inspect failures without opening the application.

---

# Screenshots in CI/CD

A common CI strategy is:

```javascript
use: {

    screenshot: 'only-on-failure'

}
```

Every failed test automatically includes a screenshot as part of the build artifacts.

This significantly reduces debugging time.

---

# Screenshots vs Trace Viewer

Screenshots provide a **single snapshot**.

Trace Viewer provides a **complete recording** of the test.

| Screenshots | Trace Viewer |
|-------------|--------------|
| Static image | Full execution replay |
| Small storage | Larger storage |
| Fast to inspect | Rich debugging information |
| Good for simple failures | Best for complex failures |

They complement each other rather than replace one another.

---

# Screenshots vs Visual Testing

A screenshot is simply an image captured during execution.

Visual testing compares screenshots against a baseline to detect UI differences.

Example:

```javascript
await expect(page).toHaveScreenshot();
```

Visual testing builds upon the screenshot capability.

---

# Real Project Recommendations

## Local Development

```javascript
use: {

    screenshot: 'off'

}
```

Recommended for faster execution.

---

## Continuous Integration

```javascript
use: {

    screenshot: 'only-on-failure'

}
```

Recommended.

Provides useful debugging information without excessive storage.

---

## UI Documentation

Use manual full-page screenshots.

```javascript
await page.screenshot({

    fullPage: true

});
```

---

## Component Validation

Capture element screenshots.

```javascript
await page.locator('.dashboard-card').screenshot({

    path: 'dashboard-card.png'

});
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| `getScreenshotAs()` | `page.screenshot()` |
| Full-page requires additional libraries | Built-in support |
| Element screenshots require workarounds | Built-in support |
| Manual configuration | Integrated with Playwright Test |

Playwright provides a much simpler and more integrated screenshot experience than Selenium.

---

# FAQ

### When should screenshots be captured automatically?

Typically only when a test fails.

Capturing screenshots for every successful test usually increases storage requirements without providing additional value.

---

### What is the advantage of element screenshots?

They isolate a specific component, making debugging easier than reviewing an entire page.

---

### Why combine screenshots with Trace Viewer?

Screenshots show the final state.

Trace Viewer shows every step that led to that state.

---

### Are screenshots sufficient for debugging?

For simple failures, yes.

For complex timing or interaction issues, traces provide significantly more information.

---

### Should screenshots be enabled in every project?

Yes, but typically only on failure.

---

### Should screenshots be committed to Git?

No.

Generated screenshots should remain test artifacts.

---

### Are screenshots expensive?

Capturing a single screenshot is inexpensive.

Capturing thousands of screenshots unnecessarily increases storage and execution time.

---

### Can Playwright capture only part of a page?

Yes.

Element screenshots allow capturing only a specific locator.

---

# Decision Matrix

| Scenario | Recommendation | Why? |
|----------|----------------|------|
| **Local Development** | `screenshot: 'off'` | Fastest execution while actively developing tests. |
| **CI/CD Pipeline** | `screenshot: 'only-on-failure'` | Provides useful debugging artifacts without excessive storage. |
| **UI Documentation** | `page.screenshot({ fullPage: true })` | Captures the complete page for documentation or reviews. |
| **Component Validation** | `locator.screenshot()` | Focuses on a specific UI component. |
| **Debugging Layout Issues** | Full-page screenshot | Helps identify rendering and responsive problems. |
| **Visual Regression Testing** | `toHaveScreenshot()` | Compares screenshots against a known baseline. |

---

# Real Project Defaults

## Local Development

```javascript
use: {

    screenshot: 'off'

}
```

---

## CI/CD

```javascript
use: {

    screenshot: 'only-on-failure'

}
```

---

## Visual Testing Projects

```javascript
await expect(page).toHaveScreenshot();
```

Use Playwright's built-in visual comparison instead of manually comparing images.

---