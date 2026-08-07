# Playwright with TypeScript

This folder contains a curated **TypeScript implementation** of selected Playwright automation scenarios from the main JavaScript project.

The objective is **not** to duplicate every JavaScript example, but to demonstrate how the same automation can be implemented using modern TypeScript practices, strong typing, reusable Page Objects, and clean project organization.

---

## Highlights

* TypeScript with strict type checking
* Modern Playwright APIs
* Page Object Model (POM)
* Typed utility classes
* API and UI automation
* Network interception and mocking
* Excel download / upload automation
* Real-world end-to-end scenarios
* Chromium execution with Playwright Test

---

## Project Structure

```text
typescript/
│
├── tests/              # Test specifications
├── pages/              # Page Object Model classes
├── utils/              # Reusable utility classes
├── models/             # Domain models

├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# Design Goals

This implementation focuses on writing Playwright tests the way they would typically be developed in a professional engineering team.

Key principles include:

* Strong typing throughout the project
* Minimal code duplication
* Readable Page Objects
* Reusable utility classes
* Business-oriented test methods
* Modern locator strategies
* Assertion-driven synchronization
* Clear separation between tests and framework code

The intent is to showcase **clean automation design** rather than build an overly abstract framework.

---

# Technologies

* Playwright
* TypeScript
* Node.js
* ExcelJS
* dotenv

---

# Getting Started

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Configuration

The project reads environment variables from the shared repository environment file located at:

```text
resources/.env.qa
```

Typical variables include:

```text
EMAIL=
PASSWORD=

EVENT_EMAIL=
EVENT_PASSWORD=

EVENT_EMAIL_USER1=
EVENT_PASSWORD_USER1=

EVENT_EMAIL_USER2=
EVENT_PASSWORD_USER2=
```

---

# Running Tests

Run the complete suite

```bash
npx playwright test
```

Run a single test

```bash
npx playwright test tests/place-product-order.spec.ts
```

Run headed

```bash
npx playwright test --headed
```

Run in debug mode

```bash
npx playwright test --debug
```

View the HTML report

```bash
npx playwright show-report
```

---

# Implemented Examples

## Page Object Model

Demonstrates:

* Page abstraction
* Typed locators
* Business methods
* Reusable navigation
* Assertion-based synchronization

---

## API + UI Authorization

Shows how API calls and browser automation can be combined to validate authorization scenarios.

---

## Network Mocking

Examples include:

* Response interception
* Mocked API payloads
* UI validation using mocked responses

---

## Excel Automation

Demonstrates:

* Downloading Excel files
* Updating workbook contents with ExcelJS
* Uploading modified files
* Verifying application behavior

---

## Event Booking

A complete end-to-end workflow covering:

* Authentication
* Event creation
* Booking
* Verification
* Refund eligibility scenarios

---

# TypeScript Features

The implementation demonstrates several TypeScript concepts including:

* Interfaces
* Enums
* Strong typing
* Generic utility methods
* Async/await
* Strict compiler configuration
* Typed Page Objects

---

# Notes

This folder is intentionally **not** a one-to-one conversion of the JavaScript examples.

Where appropriate, the implementation has been refined to take advantage of TypeScript features and improve code readability while preserving the original learning objectives.

Some scenarios interact with publicly hosted demonstration applications whose data is shared among all users. Because of this, tests that create or modify server-side data may occasionally be affected by backend state. This repository keeps those examples intentionally lightweight to illustrate Playwright techniques rather than implementing a full test-data management framework.

---

# Related Project

The JavaScript implementation can be found in the sibling folders of this repository and follows the original learning progression.

The TypeScript module complements those examples by demonstrating how the same automation patterns can be implemented using modern TypeScript practices.

---
## Purpose

This repository serves as a practical showcase of modern Playwright automation using both JavaScript and TypeScript, with an emphasis on clean architecture, maintainability, and real-world automation techniques.