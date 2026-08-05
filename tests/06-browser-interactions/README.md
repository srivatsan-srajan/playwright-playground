# Browser Interactions

# Browser Interaction Overview

```
Browser

├── Navigation
├── Dialogs
├── Child Windows
├── Frames
└── Mouse Actions
```

Unlike standard UI controls, these features interact directly with browser behavior.

---

# Recipes Included

| Recipe | Purpose |
|---------|---------|
| `navigate-url.spec.js` | Navigate using `goto()`, `goBack()`, and `goForward()`. |
| `child-windows.spec.js` | Handle newly opened browser tabs using `context.waitForEvent('page')`. |
| `handle-dialogs.spec.js` | Work with JavaScript Alert, Confirm, and Prompt dialogs. |
| `handle-frames.spec.js` | Interact with elements inside an iframe using `frameLocator()`. |
| `handle-hovers.spec.js` | Trigger hover events and interact with dynamically revealed content. |

---

# Navigation

Playwright provides browser navigation APIs similar to the Back and Forward buttons.

```javascript
await page.goto(url);
await page.goBack();
await page.goForward();
```

Navigation assertions should verify the resulting page state rather than assuming navigation succeeded.

---

# Child Windows & Tabs

Some applications open documentation, payment gateways, or external content in new tabs.

Playwright handles this cleanly by waiting for the new page event.

```javascript
const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    link.click()
]);
```

This prevents race conditions between clicking the link and the new tab opening.

---

# JavaScript Dialogs

The browser can display several native dialogs:

- Alert
- Confirm
- Prompt

Playwright exposes them through the `dialog` event.

Examples include:

```javascript
dialog.accept();
dialog.dismiss();
dialog.accept('Playwright');
```

Typical validations include:

- Success messages
- Cancel actions
- Prompt input

---

# Working with Frames

Applications frequently embed content inside iframes.

Playwright introduces `frameLocator()` to simplify frame interaction.

```javascript
const frame = page.frameLocator('iframe');

await frame.locator('#editor').fill('Hello');
```

Unlike Selenium, explicit frame switching is not required.

---

# Hover Actions

Hover interactions reveal menus, tooltips, and hidden controls.

Example:

```javascript
await card.hover();
```

Always assert the UI state after hovering instead of assuming the action succeeded.

---

# Selenium vs Playwright

| Selenium | Playwright |
|-----------|------------|
| Window Handles | `waitForEvent('page')` |
| `switchTo().frame()` | `frameLocator()` |
| `Actions.moveToElement()` | `locator.hover()` |
| `driver.navigate().back()` | `page.goBack()` |
| Alert interface | `page.on('dialog')` |

Playwright's event-driven APIs reduce much of the boilerplate traditionally required in Selenium.

---

# Interview Corner

### Why use `Promise.all()` for child windows?

To avoid race conditions. The listener is registered before the click that opens the new page.

---

### Why use `frameLocator()` instead of switching frames?

`frameLocator()` scopes locators directly to the iframe and removes the need for manual context switching.

---

### When should hover actions be tested?

Only when hovering changes application behavior (menus, tooltips, action buttons, etc.).

---

### How are browser dialogs handled?

By subscribing to the `dialog` event and accepting or dismissing it programmatically.

---

# FAQ

## Can Playwright handle multiple tabs?

Yes. Each new tab is represented by a `Page` object within the same `BrowserContext`.

---

## Do I need to switch back from an iframe?

No. `frameLocator()` automatically scopes interactions to the frame.

---

## Should browser navigation always be asserted?

Yes. Verify the destination using URL, title, or page content.

---