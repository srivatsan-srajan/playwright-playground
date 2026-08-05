# Device Emulation

# What is Device Emulation?

Device emulation allows Playwright to simulate how a website behaves on another device without requiring the physical hardware.

Instead of changing only the screen size, Playwright configures multiple browser characteristics simultaneously.

```
Playwright

        │

        ▼

Device Descriptor

        │

        ▼

Viewport

User Agent

Touch Support

Device Scale Factor

Mobile Rendering

        │

        ▼

Application
```

---

# Why Use Device Emulation?

Many applications behave differently depending on the device.

Examples include:

- Responsive layouts
- Mobile navigation menus
- Touch gestures
- Mobile-only controls
- Tablet layouts
- Device-specific CSS
- Progressive Web Apps (PWA)

Testing desktop alone is no longer sufficient.

---

# Built-in Device Descriptors

Playwright ships with dozens of predefined devices.

Examples include:

```javascript
import { devices } from '@playwright/test';
```

Common examples:

```javascript
devices['Desktop Chrome']

devices['Desktop Firefox']

devices['Desktop Safari']

devices['iPhone 15']

devices['iPhone 15 Pro']

devices['Pixel 8']

devices['Galaxy S24']

devices['iPad']

devices['iPad Pro']
```

---

# Using Device Descriptors

The easiest way to emulate a device is through browser projects.

Example:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    projects: [

        {

            name: 'Desktop',

            use: {

                ...devices['Desktop Chrome']

            }

        }

    ]

});
```

---

# Multiple Devices

A single test suite can execute across several devices.

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

The same test executes independently against each device.

---

# What Gets Emulated?

A Playwright device descriptor configures much more than screen size.

It includes:

- Viewport
- User Agent
- Device Scale Factor
- Touch Support
- Mobile Rendering
- Default Browser Settings

This provides significantly more realistic testing than manually configuring only a viewport.

---

# Viewport

Each device includes an appropriate viewport.

Example:

```javascript
devices['iPhone 15']
```

Automatically configures the correct screen dimensions.

No manual viewport configuration is required.

---

# User Agent

Each device sends an appropriate browser user agent.

Applications that render different layouts for mobile devices will receive realistic browser information.

---

# Device Scale Factor

Modern mobile devices use high-DPI displays.

Example:

```javascript
deviceScaleFactor: 3
```

produces much sharper rendering than a standard desktop display.

---

# Touch Support

Mobile devices automatically enable touch.

Equivalent to:

```javascript
hasTouch: true
```

This enables:

- Tap
- Swipe
- Touch interactions

instead of traditional mouse behavior.

---

# Mobile Rendering

```javascript
isMobile: true
```

is automatically configured for mobile devices.

This affects browser behavior including:

- Overlay scrollbars
- Viewport handling
- Responsive rendering

---

# Desktop Emulation

Desktop projects typically use:

```javascript
devices['Desktop Chrome']
```

Benefits:

- Stable viewport
- Mouse interactions
- Desktop browser behavior

Ideal for:

- Enterprise applications
- Internal portals
- Admin dashboards

---

# Mobile Emulation

Example:

```javascript
devices['iPhone 15']
```

Useful for:

- Responsive websites
- Customer portals
- E-commerce
- Progressive Web Apps

---

# Tablet Emulation

Example:

```javascript
devices['iPad Pro']
```

Tablet testing often exposes layout issues that are not visible on desktop or mobile devices.

Typical examples include:

- Navigation menus
- Multi-column layouts
- Landscape orientation

---

# Landscape Mode

Devices can also be tested in landscape orientation.

Example:

```javascript
use: {

    ...devices['iPhone 15'],

    isLandscape: true

}
```

Useful when validating:

- Media applications
- Dashboards
- Tablet interfaces

---

# Custom Device Configuration

Sometimes a predefined device is insufficient.

You can override specific properties.

Example:

```javascript
use: {

    ...devices['Desktop Chrome'],

    viewport: {

        width: 1600,

        height: 900

    }

}
```

---

# Testing Multiple Devices

A recommended strategy:

```
Desktop Chrome

↓

Firefox

↓

WebKit

↓

iPhone

↓

Android

↓

Tablet
```

This provides broad browser and device coverage while keeping the test suite maintainable.

---

# Running a Specific Device

Execute only one project.

```bash
npx playwright test --project="iPhone 15"
```

Run Desktop only.

```bash
npx playwright test --project="Desktop"
```

---

# Running All Devices

```bash
npx playwright test
```

Playwright executes every configured project.

---

# Real Project Recommendations

## Internal Enterprise Applications

```javascript
Desktop Chrome
```

is usually sufficient.

---

## Customer Facing Websites

Run:

- Desktop Chrome
- Firefox
- WebKit
- iPhone
- Android

---

## Mobile Applications

Use multiple devices.

Examples:

- iPhone
- Pixel
- Galaxy

---

## Tablet Heavy Applications

Include:

```javascript
iPad

iPad Pro
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| Chrome mobile emulation | Built-in device descriptors |
| Manual user agent changes | Automatic |
| Manual viewport configuration | Automatic |
| Chrome-specific emulation | Cross-browser projects |
| Additional setup | Built-in support |

Playwright provides a much simpler and more consistent approach to device testing than traditional Selenium implementations.

---

# FAQ

### Why use device descriptors instead of changing only the viewport?

Device descriptors configure multiple browser characteristics including viewport, user agent, touch support, and device scale factor, providing much more realistic emulation.

---

### When should desktop-only testing be considered sufficient?

For internal enterprise applications where only desktop browsers are officially supported.

---

### Why include tablet testing?

Tablet layouts frequently expose responsive issues that are not visible on desktop or mobile devices.

---

### Should every application be tested on every available device?

No.

Select devices based on your application's target audience and supported platforms.

---

### Does device emulation require a physical phone?

No.

Playwright emulates supported devices entirely within the browser.

---

### Can I customize a built-in device?

Yes.

Any property can be overridden after spreading the device descriptor.

Example:

```javascript
use: {

    ...devices['iPhone 15'],

    locale: 'fr-FR'

}
```

---

### Should mobile testing replace desktop testing?

No.

Both desktop and mobile experiences should be validated independently.

---

# Decision Matrix

| Scenario | Recommended Device | Why? |
|----------|--------------------|------|
| **Enterprise Web Application** | Desktop Chrome | Most enterprise users work on desktop browsers. |
| **Customer Portal** | Desktop + iPhone + Pixel | Covers the majority of desktop and mobile users. |
| **E-Commerce Website** | Desktop + Android + iPhone + Tablet | Shopping behavior varies significantly across devices. |
| **Progressive Web App (PWA)** | Android + iPhone | Validates mobile-first functionality. |
| **Internal Dashboard** | Desktop Chrome + Firefox | Ensures compatibility for office environments. |
| **Responsive Layout Validation** | Desktop + Tablet + Mobile | Verifies layouts across common breakpoints. |
| **Accessibility Testing** | Multiple Devices | Screen readers, zoom levels, and responsive layouts may differ by device. |

---

# Real Project Defaults

## Local Development

```javascript
projects: [

{

name: 'Desktop',

use: {

...devices['Desktop Chrome']

}

}

]
```

Fast execution with a desktop browser while developing.

---

## CI Pipeline

```javascript
projects: [

{

name: 'Chromium',

use: {

...devices['Desktop Chrome']

}

},

{

name: 'Firefox',

use: {

...devices['Desktop Firefox']

}

},

{

name: 'WebKit',

use: {

...devices['Desktop Safari']

}

}

]
```

Provides cross-browser validation without significantly increasing execution time.

---

## Nightly Regression

```javascript
projects: [

{

name: 'Desktop',

use: {

...devices['Desktop Chrome']

}

},

{

name: 'Firefox',

use: {

...devices['Desktop Firefox']

}

},

{

name: 'WebKit',

use: {

...devices['Desktop Safari']

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

},

{

name: 'iPad',

use: {

...devices['iPad']

}

}

]
```

Provides comprehensive browser and device coverage before release.

---