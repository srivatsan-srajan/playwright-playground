# Test Reports & Reporters

# Report Generation Flow

```
Playwright

        │

        ▼

Execute Tests

        │

        ▼

Reporter

        │

        ▼

Artifacts

        │

        ▼

HTML / XML / JSON / Console
```

---

# Configuring Reporters

Inside **playwright.config.js**

```javascript
export default defineConfig({

    reporter: 'html'

});
```

---

# Multiple Reporters

Playwright supports multiple reporters simultaneously.

```javascript
reporter: [

    ['list'],

    ['html'],

    ['junit']

]
```

This is the recommended approach for enterprise projects.

---

# Built-in Reporters

Playwright currently provides:

| Reporter | Purpose |
|-----------|----------|
| HTML | Interactive Report |
| List | Terminal Output |
| Dot | Compact CI Output |
| Line | Live Progress |
| JSON | Machine Readable |
| JUnit | CI Servers |
| Blob | Report Merging |
| Github | GitHub Actions |

---

# HTML Reporter

The HTML Reporter is Playwright's flagship reporting solution.

Configuration:

```javascript
reporter: 'html'
```

Open report

```bash
npx playwright show-report
```

Features:

- Passed tests
- Failed tests
- Screenshots
- Videos
- Trace Viewer
- Error Stack
- Duration
- Browser
- Project

Recommended for:

✔ Local Development

✔ CI

✔ Debugging

---

# HTML Report Example

```
Regression Suite

✔ 198 Passed

❌ 2 Failed

↓

Click Failed Test

↓

Screenshot

↓

Video

↓

Trace

↓

Stack Trace
```

---

# List Reporter

```
Login Test

✓ Passed

Checkout Test

✓ Passed

Payment Test

✗ Failed
```

Configuration

```javascript
reporter: 'list'
```

Advantages

- Easy to read
- Excellent locally
- Detailed progress

---

# Dot Reporter

```
.............F.......
```

Configuration

```javascript
reporter: 'dot'
```

Advantages

- Extremely compact
- Ideal for CI

---

# Line Reporter

Continuously updates the same console line.

```
Running 145 of 800 tests...
```

Useful for:

- Long running suites
- CI systems

---

# JSON Reporter

```javascript
reporter: [

['json', {

outputFile: 'results.json'

}]

]
```

Useful for

- Dashboards
- Custom Analytics
- Report Processing

---

# JUnit Reporter

Produces XML.

```javascript
reporter: [

['junit', {

outputFile: 'results.xml'

}]

]
```

Supported by

- Jenkins

- Azure DevOps

- GitLab

- Bamboo

- TeamCity

---

# Blob Reporter

Introduced for distributed execution.

Purpose:

Merge reports from multiple machines.

Useful for:

- Sharded execution
- Large CI pipelines
- Distributed regression

---

# GitHub Reporter

Provides GitHub-friendly annotations.

Useful only inside:

GitHub Actions.

Example

```javascript
reporter: 'github'
```

---

# Combining Reporters

Recommended configuration

```javascript
reporter: [

['list'],

['html'],

['junit']

]
```

Developers

↓

List

Managers

↓

HTML

CI

↓

JUnit

---

# Report Artifacts

A typical failed test generates:

```
HTML Report

↓

Screenshot

↓

Video

↓

Trace

↓

Console Logs
```

Everything required for debugging.

---

# Custom Output Folder

```javascript
reporter: [

['html', {

outputFolder: 'reports'

}]

]
```

Keeps reports organized.

---

# Opening Reports

```bash
npx playwright show-report
```

---

# CI/CD Reporting Strategy

## Local

```
List

HTML
```

---

## Pull Request

```
Dot

JUnit
```

---

## Nightly

```
List

HTML

JUnit
```

---

## Release Validation

```
HTML

JUnit

Blob
```

---

# Real Project Recommendations

## Small Project

```javascript
reporter: [

['html']

]
```

---

## Enterprise Project

```javascript
reporter: [

['list'],

['html'],

['junit']

]
```

---

## GitHub Actions

```javascript
reporter: [

['github'],

['html']

]
```

---

## Distributed Regression

```javascript
reporter: [

['blob']

]
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Extent Reports | HTML Reporter |
| TestNG XML | JUnit Reporter |
| Console Logs | List Reporter |
| Third-party libraries | Built-in reporters |
| Custom integrations | JSON Reporter |

Playwright provides a complete reporting ecosystem without requiring external libraries.

---

# FAQ

### Which reporter should every project use?

The HTML Reporter.

It provides the richest debugging experience.

---

### Why generate JUnit reports?

CI systems understand JUnit XML.

---

### Why use multiple reporters?

Different stakeholders consume reports differently.

Developers → HTML

CI → JUnit

Console → List

---

### Should reports be committed?

Never.

Reports are execution artifacts.

---

# Decision Matrix

| Scenario | Reporter |
|----------|----------|
| Local Development | List + HTML |
| CI | Dot + JUnit |
| Pull Request | Dot |
| Nightly Regression | List + HTML + JUnit |
| Distributed Execution | Blob |
| GitHub Actions | Github + HTML |
| Dashboards | JSON |

---

# Performance Impact

| Reporter | Execution | Storage |
|----------|----------:|--------:|
| List | ⭐ | ⭐ |
| Dot | ⭐ | ⭐ |
| HTML | ⭐⭐ | ⭐⭐⭐ |
| JSON | ⭐⭐ | ⭐⭐ |
| JUnit | ⭐ | ⭐ |
| Blob | ⭐⭐ | ⭐⭐⭐ |

Reporter overhead is generally small compared to browser execution.

---

# Real Project Defaults

## Local Development

```javascript
reporter: [

['list'],

['html']

]
```

---

## Continuous Integration

```javascript
reporter: [

['dot'],

['junit'],

['html']

]
```

---

## Enterprise Regression

```javascript
reporter: [

['list'],

['html'],

['junit'],

['blob']

]
```

---

# Real World Scenario

## Global SaaS Product

The automation suite contains:

- 3,500 UI Tests
- 6 Browser Projects
- 8 CI Agents

Reporting Strategy

Developer

↓

List

QA

↓

HTML

Azure DevOps

↓

JUnit

Distributed Merge

↓

Blob

Every failed test automatically includes:

- Screenshot
- Video
- Trace
- Stack Trace

This allows engineers to investigate failures without rerunning the suite.

---

# Quick Reference

| Environment | Recommended Reporters |
|-------------|-----------------------|
| Local Development | List + HTML |
| Pull Request | Dot |
| CI/CD | Dot + HTML + JUnit |
| Nightly Regression | List + HTML + JUnit |
| GitHub Actions | Github + HTML |
| Distributed Execution | Blob |

---