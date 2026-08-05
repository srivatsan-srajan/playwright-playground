# Browser Launch Configuration

# Browser Launch Architecture

```
Playwright Test

        │

        ▼

playwright.config.js

        │

        ▼

Browser Launch Options

        │

        ▼

Chromium / Firefox / WebKit

        │

        ▼

Application
```

---

# Browser Engines

Playwright supports three browser engines.

| Browser | Engine | Typical Usage |
|----------|--------|---------------|
| Chromium | Blink | Chrome, Edge |
| Firefox | Gecko | Firefox testing |
| WebKit | WebKit | Safari compatibility |

Example:

```javascript
use: {
    browserName: 'chromium'
}
```

Supported values:

```javascript
chromium
firefox
webkit
```

---

# Chromium vs Chrome

Both are not identical.

| Chromium | Chrome |
|-----------|---------|
| Open Source | Google Chrome |
| Bundled with Playwright | Installed separately |
| Default choice | Useful when validating production browser behavior |

Running Google Chrome:

```javascript
use: {
    channel: 'chrome'
}
```

Running Microsoft Edge:

```javascript
use: {
    channel: 'msedge'
}
```

---

# Headless Mode

Headless mode runs the browser without displaying the UI.

```javascript
use: {
    headless: true
}
```

Advantages

- Faster execution
- Lower memory usage
- Ideal for CI/CD
- No desktop session required

---

# Headed Mode

Headed mode launches a visible browser window.

```javascript
use: {
    headless: false
}
```

Advantages

- Easier debugging
- Observe browser behavior
- Demonstrations
- Training

---

# When to Use Headless vs Headed

## Local Development

```javascript
headless: false
```

Recommended.

You can watch the browser execute each step.

---

## Continuous Integration

```javascript
headless: true
```

Recommended.

CI environments generally do not require a visible browser.

---

# Slow Motion

Playwright can intentionally slow browser actions.

```javascript
use: {
    launchOptions: {
        slowMo: 200
    }
}
```

Every Playwright action waits an additional 200 milliseconds.

Useful for:

- Demonstrations
- Learning
- Debugging
- Screen recordings

Avoid using slowMo in CI.

---

# Launch Options

Additional browser startup options are configured through:

```javascript
use: {
    launchOptions: {

    }
}
```

Example:

```javascript
use: {
    launchOptions: {
        slowMo: 100
    }
}
```

---

# Browser Arguments

Launch arguments allow advanced browser customization.

Example:

```javascript
launchOptions: {

    args: [

        '--start-maximized',

        '--disable-notifications'

    ]

}
```

Common arguments:

| Argument | Purpose |
|----------|----------|
| --start-maximized | Opens browser maximized |
| --disable-notifications | Disable browser notifications |
| --incognito | Launch private session |
| --disable-popup-blocking | Allow popups |
| --disable-web-security | Testing only |

---

# Browser Channels

Playwright can launch different browser installations.

```javascript
channel: 'chrome'
```

```javascript
channel: 'msedge'
```

Benefits:

- Validate production browser
- Enterprise Edge testing
- Browser-specific issues

---

# Multiple Browser Projects

Instead of changing browserName repeatedly, configure projects.

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

Run all browsers:

```bash
npx playwright test
```

Run only Firefox:

```bash
npx playwright test --project=Firefox
```

---

# Real Project Recommendations

## Local Development

```javascript
use: {

    headless: false,

    launchOptions: {

        slowMo: 100

    }

}
```

Easy debugging.

---

## CI/CD

```javascript
use: {

    headless: true

}
```

Fastest execution.

---

## Browser Compatibility Testing

```javascript
projects: [

Chromium,

Firefox,

WebKit

]
```

Recommended.

---

# Best Practices

✔ Use Chromium during daily development.

✔ Run all browsers before merging code.

✔ Keep headed mode for debugging.

✔ Keep CI headless.

✔ Avoid unnecessary browser arguments.

✔ Use browser projects instead of maintaining duplicate test suites.

---

# Common Mistakes

❌ Running headed browsers inside CI.

❌ Using slowMo in production pipelines.

❌ Testing only Chromium.

❌ Overusing browser launch arguments.

❌ Assuming Chromium equals Chrome.

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| ChromeDriver | Built-in Chromium |
| GeckoDriver | Built-in Firefox |
| SafariDriver | Built-in WebKit |
| Browser capabilities | launchOptions |
| Separate browser drivers | Bundled browsers |

Playwright removes much of the browser setup traditionally required by Selenium.

---

# FAQs

### Why use Chromium instead of Chrome?

Chromium is bundled with Playwright, ensuring consistent browser versions across environments.

---

### When should Chrome channel be used?

When validating behavior against the installed Google Chrome browser.

---

### Why run headless in CI?

Headless execution is faster, consumes fewer resources, and does not require a desktop session.

---

### What is slowMo?

A debugging feature that inserts a delay after every Playwright action to make browser execution easier to observe.

---

### Is headed mode slower?

Yes.

Rendering a visible browser window increases execution time.

---

### Should every test run across all browsers?

Not necessarily.

Many teams execute Chromium on every commit and run the full browser matrix nightly or before release.

---

### Can browser launch options vary by project?

Yes.

Each Playwright project can override launch settings independently.

---

# Summary

Browser launch configuration determines how Playwright starts the browser before executing any tests.

Key topics covered include:

- Browser engines
- Headless vs headed execution
- Browser channels
- Launch options
- Slow motion execution
- Browser arguments
- Multi-browser projects

Choosing the right browser launch strategy improves debugging, execution speed, and cross-browser reliability.

---

# Decision Matrix

The following recommendations summarize the most common browser launch scenarios encountered in real-world automation projects.

| Scenario | Recommended Configuration | Why? |
|----------|---------------------------|------|
| **Learning Playwright** | `headless: false`<br>`slowMo: 200` | Easier to observe browser actions while learning. |
| **Local Development** | `headless: false`<br>`slowMo: 100` | Makes debugging easier without significantly slowing execution. |
| **Debugging a Failed Test** | `headless: false`<br>`trace: 'on'` | Allows you to observe browser behavior while capturing a trace for detailed analysis. |
| **Daily Development Execution** | `browserName: 'chromium'` | Fastest feedback loop during active development. |
| **Cross-Browser Validation** | Browser Projects (`chromium`, `firefox`, `webkit`) | Ensures the application behaves consistently across supported browsers. |
| **Production Browser Verification** | `channel: 'chrome'` or `channel: 'msedge'` | Validates against the browser installed on end-user machines. |
| **Continuous Integration (CI)** | `headless: true` | Faster execution and lower resource consumption in build pipelines. |
| **Nightly Regression Suite** | `headless: true`<br>All browser projects enabled | Provides comprehensive browser coverage outside normal development hours. |
| **Demonstrations & Training** | `headless: false`<br>`slowMo: 300` | Allows observers to clearly follow each browser action. |
| **Performance Benchmarking** | `headless: true`<br>`slowMo: 0` | Produces more consistent timing measurements by avoiding UI rendering overhead. |

---

# Engineering Tip

Choose browser launch settings based on **the objective of the execution**, not personal preference.

For example:

- During development, prioritize **visibility and debugging**.
- During CI execution, prioritize **speed and reliability**.
- During browser compatibility testing, prioritize **coverage**.
- During demonstrations, prioritize **clarity**.

A well-configured Playwright framework often uses different launch settings for different execution environments rather than relying on a single configuration for every scenario.

# Real Project Defaults

If you're starting a new Playwright project today, these settings provide a solid foundation.

### Local Development

```javascript
use: {
  browserName: 'chromium',
  headless: false,
  trace: 'on',
  screenshot: 'only-on-failure',
  video: 'off'
}
```

### CI/CD

```javascript
use: {
  browserName: 'chromium',
  headless: true,
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

### Cross-Browser Regression

```javascript
projects: [
  { name: 'Chromium' },
  { name: 'Firefox' },
  { name: 'WebKit' }
]
```

These defaults provide a good balance between execution speed, debugging capability, and browser coverage for most enterprise automation projects.