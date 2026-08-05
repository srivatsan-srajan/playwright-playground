# Running Playwright Tests with Tags

Typical examples:

- Smoke Tests
- Regression Tests
- Sanity Tests
- API Tests
- UI Tests
- Mobile Tests
- Critical Business Flows

---

# Basic Tag Example

```javascript
test('Successful Login @smoke @regression', async ({ page }) => {

});
```

---

# Running Smoke Tests

```bash
npx playwright test --grep @smoke
```

---

# Running Regression Tests

```bash
npx playwright test --grep @regression
```

---

# Running Sanity Tests

```bash
npx playwright test --grep @sanity
```

---

# Running UI Tests

```bash
npx playwright test --grep @ui
```

---

# Running API Tests

```bash
npx playwright test --grep @api
```

---

# Running Mobile Tests

```bash
npx playwright test --grep @mobile
```

---

# Running Desktop Tests

```bash
npx playwright test --grep @desktop
```

---

# Running Critical Tests

```bash
npx playwright test --grep @critical
```

---

# Running End-to-End Tests

```bash
npx playwright test --grep @e2e
```

---

# Running Visual Tests

```bash
npx playwright test --grep @visual
```

---

# Running Accessibility Tests

```bash
npx playwright test --grep @accessibility
```

---

# Running Multiple Tags (OR)

Run Smoke **or** Sanity tests.

```bash
npx playwright test --grep "@smoke|@sanity"
```

---

# Running Multiple Tags (AND)

Run tests containing both tags.

```bash
npx playwright test --grep "(?=.*@smoke)(?=.*@critical)"
```

Example:

```
@smoke @critical
```

---

# Excluding Tags

Skip smoke tests.

```bash
npx playwright test --grep-invert @smoke
```

---

Skip flaky tests.

```bash
npx playwright test --grep-invert @flaky
```

---

# Combining Tags with Browser Projects

Run Smoke tests in Chromium.

```bash
npx playwright test \
    --project=Chromium \
    --grep @smoke
```

---

Run Regression in Firefox.

```bash
npx playwright test \
    --project=Firefox \
    --grep @regression
```

---

# Combining Tags with Headed Mode

```bash
npx playwright test \
    --grep @smoke \
    --headed
```

---

# Combining Tags with Debug Mode

```bash
npx playwright test \
    --grep @smoke \
    --debug
```

---

# Combining Tags with UI Mode

```bash
npx playwright test \
    --grep @smoke \
    --ui
```

---

# Combining Tags with a Specific File

```bash
npx playwright test \
    tests/login.spec.js \
    --grep @smoke
```

---

# Combining Tags with a Folder

```bash
npx playwright test \
    tests/authentication \
    --grep @regression
```

---

# Running Only Failed Smoke Tests

```bash
npx playwright test \
    --last-failed \
    --grep @smoke
```

---

# Typical Enterprise Pipelines

## Pull Request

```bash
npx playwright test \
    --grep @smoke
```

---

## Nightly Regression

```bash
npx playwright test \
    --grep @regression
```

---

## Critical Business Flows

```bash
npx playwright test \
    --grep @critical
```

---

## Mobile Regression

```bash
npx playwright test \
    --project="Pixel 8" \
    --grep @regression
```

---

## Production Smoke Tests

```bash
npx playwright test \
    --grep "(?=.*@smoke)(?=.*@prod)"
```

---

# Common Enterprise Tags

| Tag | Purpose |
|------|---------|
| `@smoke` | Critical business functionality |
| `@sanity` | Quick feature validation |
| `@regression` | Complete regression suite |
| `@critical` | High-priority business flows |
| `@e2e` | End-to-end workflows |
| `@api` | API testing |
| `@ui` | User interface testing |
| `@mobile` | Mobile-specific scenarios |
| `@desktop` | Desktop-only scenarios |
| `@visual` | Visual regression |
| `@accessibility` | Accessibility validation |
| `@performance` | Performance-related tests |
| `@payments` | Payment functionality |
| `@search` | Search functionality |
| `@authentication` | Login and security |
| `@prod` | Safe to execute in Production |
| `@flaky` | Known unstable tests |

---

# Recommended Tag Strategy

Instead of assigning only one tag, combine multiple categories.

Example:

```javascript
test(
  'Checkout using Visa @smoke @critical @payments @desktop',
  async ({ page }) => {

  }
);
```

Benefits:

- Functional grouping
- Priority grouping
- Platform grouping
- Pipeline flexibility

---

# Real Project Examples

## Pull Request Pipeline

```
@smoke
```

---

## Nightly Regression

```
@regression
```

---

## Release Validation

```
@critical

@regression
```

---

## Mobile Testing

```
@mobile
```

---

## Accessibility Pipeline

```
@accessibility
```

---
# Quick Reference

| Command | Description |
|----------|-------------|
| `--grep @smoke` | Run Smoke tests |
| `--grep @regression` | Run Regression tests |
| `--grep @sanity` | Run Sanity tests |
| `--grep "@smoke\|@sanity"` | Smoke OR Sanity |
| `--grep "(?=.*@smoke)(?=.*@critical)"` | Smoke AND Critical |
| `--grep-invert @flaky` | Exclude Flaky tests |
| `--project=Chromium --grep @smoke` | Smoke on Chromium |
| `--headed --grep @smoke` | Run headed |
| `--debug --grep @smoke` | Debug tagged tests |
| `--ui --grep @smoke` | UI Mode |

---