# Viewport & Device Scaling

# What is a Viewport?

A viewport is the **visible area of a web page** inside the browser.

```
+--------------------------------------+
| Browser Window                       |
|                                      |
|  +-------------------------------+   |
|  |                               |   |
|  |          Viewport             |   |
|  |                               |   |
|  +-------------------------------+   |
|                                      |
+--------------------------------------+
```

The viewport determines:

- Layout rendering
- Responsive breakpoints
- Element positioning
- Scroll behavior
- Visible content

---

# Default Viewport

Playwright launches browsers using a default viewport.

```javascript
use: {
    viewport: {
        width: 1280,
        height: 720
    }
}
```

This provides consistent execution across machines.

---

# Custom Viewport

Specify your own browser dimensions.

```javascript
use: {
    viewport: {
        width: 1440,
        height: 900
    }
}
```

Useful when testing:

- Enterprise applications
- Internal dashboards
- Large desktop monitors

---

# Common Desktop Resolutions

| Resolution | Typical Usage |
|------------|---------------|
| 1280 × 720 | Default Playwright |
| 1366 × 768 | Budget laptops |
| 1440 × 900 | Standard developer laptops |
| 1536 × 864 | Windows scaling |
| 1920 × 1080 | Full HD desktops |
| 2560 × 1440 | Large monitors |

---

# Mobile Viewports

Example:

```javascript
use: {
    viewport: {
        width: 390,
        height: 844
    }
}
```

Typical mobile viewport sizes:

| Device | Viewport |
|----------|-----------|
| iPhone 15 | 393 × 852 |
| Pixel 8 | 412 × 915 |
| iPhone SE | 375 × 667 |

In most cases, use Playwright's built-in device descriptors instead of manually configuring mobile dimensions.

---

# Tablet Viewports

Example:

```javascript
use: {
    viewport: {
        width: 820,
        height: 1180
    }
}
```

Common tablet testing:

- iPad
- iPad Pro
- Android Tablets

---

# Disabling the Default Viewport

Sometimes you want Playwright to use the browser's native window size.

```javascript
use: {
    viewport: null
}
```

Why?

This allows browser launch arguments such as:

```javascript
launchOptions: {
    args: ['--start-maximized']
}
```

to control the browser size.

---

# Maximized Browser

Example:

```javascript
use: {

    viewport: null,

    launchOptions: {

        args: ['--start-maximized']

    }

}
```

Useful for:

- Manual debugging
- Demonstrations
- Exploratory automation

---

# Device Scale Factor

Modern displays often contain more pixels than their logical resolution.

Playwright allows configuring this using:

```javascript
use: {

    deviceScaleFactor: 2

}
```

Examples:

| Scale | Typical Device |
|---------|----------------|
| 1 | Standard monitor |
| 2 | Retina MacBook |
| 3 | Modern smartphones |

Higher values produce sharper rendering and more closely emulate high-DPI devices.

---

# isMobile

```javascript
use: {

    isMobile: true

}
```

Enables mobile-specific browser behavior.

Effects include:

- Mobile viewport behavior
- Overlay scrollbars
- Touch-friendly rendering

Normally this is configured automatically when using built-in device descriptors.

---

# hasTouch

```javascript
use: {

    hasTouch: true

}
```

Simulates touch-enabled devices.

Useful when validating:

- Swipe gestures
- Touch interactions
- Mobile applications

---

# Viewport vs Window Size

Many engineers confuse these.

Viewport

```
Area available to the web page.
```

Window Size

```
Entire browser window.
```

With

```javascript
viewport: null
```

the browser window controls the viewport.

Otherwise Playwright controls the viewport independently.

---

# Responsive Testing

One test can execute across multiple viewport sizes.

Example:

```
Desktop

↓

Tablet

↓

Mobile
```

using Playwright Projects.

This provides much stronger confidence than testing only one screen size.

---

# Real Project Recommendations

## Desktop Applications

```javascript
viewport: {

    width: 1440,

    height: 900

}
```

Recommended.

---

## Responsive Applications

Use Playwright Device Descriptors.

Example:

```javascript
devices['Desktop Chrome']

devices['iPhone 15']

devices['Pixel 8']
```

---

## Local Debugging

```javascript
viewport: null

args: ['--start-maximized']
```

Recommended.

---

## CI/CD

Use fixed viewport sizes.

Avoid:

```javascript
viewport: null
```

to ensure consistent execution across build agents.

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| `driver.manage().window().setSize()` | `viewport` |
| Browser window size | Browser window or viewport |
| Mobile emulation via Chrome options | Built-in device descriptors |
| Manual resize | Project-based execution |

Playwright makes responsive testing significantly easier through centralized viewport configuration and device emulation.

---

# FAQ

### Why use a fixed viewport?

A fixed viewport ensures consistent rendering across different developer machines and CI environments.

---

### When should `viewport: null` be used?

Primarily for local debugging or demonstrations where you want the browser window to determine the viewport size.

Avoid it in CI pipelines.

---

### Why use device descriptors instead of manually specifying mobile dimensions?

Device descriptors configure multiple browser characteristics such as viewport, touch support, user agent, and device scale factor, resulting in more realistic mobile emulation.

---

### What is Device Scale Factor?

It represents the ratio between physical pixels and CSS pixels, allowing Playwright to emulate high-DPI displays such as Retina screens.

---

### Does changing the viewport resize the browser window?

Not necessarily.

Playwright controls the viewport independently unless `viewport: null` is specified.

---

### Should every project test multiple viewport sizes?

Responsive web applications should.

Desktop-only enterprise applications may only require desktop viewport validation.

---

### Is viewport configuration enough for mobile testing?

No.

For realistic mobile testing, prefer Playwright's built-in device descriptors, which also configure touch support, user agent, and other device characteristics.

---

# Decision Matrix

| Scenario | Recommended Configuration | Why? |
|----------|---------------------------|------|
| **Desktop Enterprise Applications** | `viewport: { width: 1440, height: 900 }` | Common resolution for enterprise users and developers. |
| **Responsive Web Applications** | Use Playwright Device Descriptors | Provides realistic mobile, tablet, and desktop testing. |
| **Local Debugging** | `viewport: null` + `--start-maximized` | Easier to observe browser behavior during development. |
| **CI/CD Execution** | Fixed viewport (1280×720 or 1440×900) | Consistent execution across build agents. |
| **Mobile Testing** | `devices['iPhone 15']` or `devices['Pixel 8']` | Simulates real mobile devices beyond viewport size. |
| **High-DPI Display Validation** | `deviceScaleFactor: 2` | Mimics Retina and modern high-resolution displays. |
| **Touch Interaction Testing** | `hasTouch: true` | Enables touch-specific browser behavior. |

---

# Real Project Defaults

## Local Development

```javascript
use: {
    viewport: null,

    launchOptions: {
        args: ['--start-maximized']
    }
}
```

---

## CI/CD

```javascript
use: {
    viewport: {
        width: 1440,
        height: 900
    }
}
```

---

## Responsive Regression Suite

```javascript
projects: [

    {
        name: 'Desktop',
        use: {
            ...devices['Desktop Chrome']
        }
    },

    {
        name: 'iPhone 15',
        use: {
            ...devices['iPhone 15']
        }
    },

    {
        name: 'Pixel 8',
        use: {
            ...devices['Pixel 8']
        }
    }

]
```

---