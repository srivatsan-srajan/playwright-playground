# Visual Testing

Snapshot tests work best when animations are disabled and dynamic content is controlled.

# Recipes Included

| Recipe | Purpose |
|---------|---------|
| `capture-screenshot.spec.js` | Capture full-page and element-level screenshots for documentation and debugging. |
| `compare-screenshots.spec.js` | Compare the current UI against a stored baseline using Playwright snapshot testing. |

---

# Screenshot Capture

Playwright supports several levels of screenshot capture.

## Full Page

```javascript
await page.screenshot({
    path: "home-page.png"
});
```

Useful for:

- Documentation
- Debugging
- Test evidence

---

## Element Screenshot

```javascript
await locator.screenshot({
    path: "login-button.png"
});
```

Useful when validating a specific component rather than the whole page.

---

# Snapshot Testing

Playwright can compare screenshots against an approved baseline.

```javascript
expect(
    await page.screenshot()
).toMatchSnapshot();
```

If the UI changes unexpectedly, the test fails.

This is one of the easiest ways to detect accidental visual regressions.

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| Third-party libraries | Built-in screenshot support |
| Manual image comparison | `toMatchSnapshot()` |
| Extra tooling required | Native visual assertions |

Visual regression testing is significantly easier to implement in Playwright because it is integrated directly into the assertion framework.

---

# FAQ

## What is visual regression testing?

Comparing the current UI against a previously approved baseline image to detect unexpected visual changes.

---

## When should screenshots be captured?

- Failure diagnostics
- Documentation
- Visual regression
- Bug reporting

---

## Should every page use snapshot testing?

No.

Visual testing is most valuable for:

- Design systems
- Shared UI components
- Marketing pages
- Critical user journeys

---

## Why do snapshot tests fail unexpectedly?

Common reasons include:

- Browser version changes
- Font differences
- Animations
- Dynamic content
- Responsive layout changes

---

## Should baseline images be committed to Git?

Yes.

Baseline images are part of the expected behaviour and should be version controlled alongside the tests.

---