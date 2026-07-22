# Playwright Playground

> A hands-on Playwright cookbook featuring practical recipes, real-world automation scenarios, best practices, and engineering insights.

---

## Overview

**Playwright Playground** is a curated collection of Playwright automation recipes built while learning and exploring Playwright through practical examples and real-world applications.

Unlike repositories that simply replicate tutorial code, this project focuses on writing clean, maintainable, and production-oriented automation examples. Each recipe demonstrates one or more Playwright concepts and is organized into topic-based chapters for easy navigation.

The goal is to build a reference repository that is useful not only while learning Playwright, but also as a long-term automation handbook.

---

## Objectives

This repository aims to:

* Learn Playwright through practical examples.
* Build a reusable reference for common automation tasks.
* Showcase clean automation design and coding practices.
* Demonstrate real-world end-to-end testing scenarios.
* Document Playwright concepts in an organized manner.
* Continuously improve tutorial examples with production-oriented practices.

---

## Applications Used

This repository primarily uses publicly available applications for learning and experimentation.

* Rahul Shetty Academy – Login Practice
* Rahul Shetty Academy – Client Application
* Other public demo applications where appropriate

---

## Repository Structure

```text
playwright-playground/

README.md

01-browser/
02-locators/
03-ui-controls/
04-navigation/
05-waits/
06-popups/
07-frames/
08-api-testing/
09-network/
10-authentication/
11-tables/
12-file-handling/
13-page-object-model/
14-fixtures/
15-reporting/
16-ci-cd/
17-design-patterns/
18-real-world-scenarios/
99-interview-preparation/
```

---

## Folder Structure

Each topic follows a consistent structure.

```text
10-authentication/

README.md
FAQ.md

01-invalid-login.spec.js
02-successful-login.spec.js
03-session-state.spec.js
```

### README.md

Each folder contains a README describing:

* Overview
* Concepts covered
* Playwright APIs used
* Best practices
* Common mistakes
* Recipe index

### FAQ.md

Each folder also contains a FAQ document answering common questions encountered while learning that topic.

Examples include:

* Why use `toHaveText()` instead of `textContent()`?
* When should `BrowserContext` be used?
* Why avoid `waitForTimeout()`?
* CSS vs XPath vs `getByRole()`

---

## Recipe Format

Each recipe begins with a short header describing its purpose.

```javascript
/**
 * Recipe: Invalid Login
 * Concepts: Navigation, Authentication, Assertions
 * Application: Rahul Shetty Academy - Login Practice
 */
```

The recipe focuses on the implementation, while detailed explanations are documented in the corresponding README and FAQ.

---

## Coding Principles

The examples in this repository follow a few simple principles.

* Prefer readability over cleverness.
* Demonstrate one primary concept per recipe whenever possible.
* Keep recipes small and focused.
* Use meaningful locator names.
* Prefer Playwright's web-first assertions.
* Avoid unnecessary waits.
* Prefer semantic locators where appropriate.
* Build examples that resemble real-world automation.

---

## Learning Roadmap

| Status | Topic                 |
| ------ | --------------------- |
| 🚧     | Browser               |
| 🚧     | Authentication        |
| ⬜      | Locators              |
| ⬜      | UI Controls           |
| ⬜      | Navigation            |
| ⬜      | Waits                 |
| ⬜      | Popups                |
| ⬜      | Frames                |
| ⬜      | API Testing           |
| ⬜      | Network               |
| ⬜      | Tables                |
| ⬜      | File Handling         |
| ⬜      | Page Object Model     |
| ⬜      | Fixtures              |
| ⬜      | Reporting             |
| ⬜      | CI/CD                 |
| ⬜      | Design Patterns       |
| ⬜      | Real-World Scenarios  |
| ⬜      | Interview Preparation |

---

## Technology Stack

* Playwright
* JavaScript
* Node.js
* Visual Studio Code

---

## Running the Project

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/10-authentication/01-invalid-login.spec.js
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

---

## Repository Philosophy

This repository is not intended to be a copy of any course.

Instead, it serves as a personal learning companion that expands upon tutorial examples by:

* Writing cleaner code.
* Applying engineering best practices.
* Organizing examples by concept rather than lesson order.
* Building reusable automation recipes.
* Capturing practical knowledge through documentation and FAQs.

The emphasis is on understanding **why** a particular Playwright feature or approach is preferred—not just **how** to use it.

---

## Contributing

Suggestions, improvements, and discussions are always welcome.

If you notice a better Playwright approach or an opportunity to improve a recipe, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
