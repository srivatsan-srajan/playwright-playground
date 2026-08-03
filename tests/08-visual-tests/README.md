# Visual Testing

> Engineering Cookbook – Chapter 08

Visual testing validates the appearance of an application rather than its underlying HTML or JavaScript.

Traditional assertions answer questions like:

- Is the button visible?
- Does the text match?
- Was the order created?

Visual testing answers a different question:

> **Does the application still look correct?**

Playwright includes first-class support for screenshots and snapshot comparisons, making visual regression testing straightforward to implement.

---

# Who Should Read This Chapter?

✅ UI Automation Engineers

✅ Frontend Engineers

✅ QA Engineers

✅ Design System Teams

✅ Interview Candidates

---

# Learning Objectives

After completing this chapter you should be able to:

- Capture screenshots
- Capture element screenshots
- Build baseline images
- Detect visual regressions
- Understand snapshot testing
- Apply visual testing in CI pipelines

---

# Why Visual Testing?

Functional assertions verify behaviour.

Visual assertions verify appearance.

Together they provide much stronger confidence.

Example

```
Button exists

↓

Button is clickable

↓

Button has correct styling
```

The first two are functional.

The third is visual.

---

# Visual Testing Workflow

```
Application

↓

Capture Screenshot

↓

Compare with Baseline

↓

Images Match?

↓

PASS / FAIL
```

---

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

# Engineering Insights

## Functional Tests Cannot Detect Everything

Consider:

```
Login Button

✓ Visible

✓ Clickable

✗ Wrong color

✗ Text overlaps

✗ Icon missing
```

A functional test passes.

A visual test fails.

Both are necessary.

---

## Capture the Smallest Area Possible

Good

```
Login Button
```

Better than

```
Entire Home Page
```

Smaller snapshots:

- Execute faster
- Produce smaller diffs
- Are easier to review

---

# Best Practices

✔ Capture only stable UI

✔ Disable animations when possible

✔ Prefer component screenshots

✔ Review baseline updates carefully

✔ Keep baseline images under version control

---

# Common Mistakes

❌ Updating every failed snapshot without review

❌ Capturing dynamic content (timestamps, ads, rotating banners)

❌ Comparing entire pages when only one component matters

❌ Ignoring browser differences

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| Third-party libraries | Built-in screenshot support |
| Manual image comparison | `toMatchSnapshot()` |
| Extra tooling required | Native visual assertions |

Visual regression testing is significantly easier to implement in Playwright because it is integrated directly into the assertion framework.

---

# Interview Corner

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

# FAQ

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

# Future Recipes

This chapter will expand to include:

- Masked screenshots
- Clipped screenshots
- Screenshot thresholds
- Ignore regions
- Mobile visual testing
- Cross-browser comparison
- Dark mode testing
- Percy / Applitools integration
- GitHub Actions visual regression

---

# Summary

This chapter introduced Playwright's visual testing capabilities:

- Screenshot capture
- Element screenshots
- Snapshot comparison
- Visual regression testing

Combined with functional assertions, visual testing helps detect UI regressions that traditional automation cannot identify.

---

➡ **Next Chapter:** File Handling

You'll learn how to execute Playwright tests automatically on every commit and integrate reporting into your development workflow.