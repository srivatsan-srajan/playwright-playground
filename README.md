# Playwright Playground

> A structured Playwright learning repository featuring practical examples, engineering best practices, reusable utilities, and real-world automation scenarios.

---

## Overview

**Playwright Playground** is a structured collection of Playwright examples designed to help developers and QA engineers learn Playwright progressively—from browser automation fundamentals to advanced automation patterns.

Rather than serving as a collection of isolated code snippets, the repository is organized into topic-based sections with detailed documentation, practical examples, and engineering insights that can be used as a long-term reference.

---

## Learning Approach

This repository is primarily inspired by the excellent **Playwright course by Rahul Shetty**.

The folder structure broadly follows the learning progression of the course so that learners can easily navigate concepts in a familiar order.

However, this repository is **not a direct copy** of the course material.

Throughout the repository I have:

- reorganized topics into a structured reference library
- expanded every section with detailed documentation
- added engineering notes, FAQs, and best practices
- modified several examples to use alternative public applications where they better demonstrate a Playwright concept
- refactored selected tests to showcase cleaner Playwright patterns
- added original utilities and real-world automation scenarios beyond the course

The goal is to preserve the learning journey while building a reusable Playwright reference repository.

---

## Repository Highlights

- Progressive learning path from fundamentals to advanced topics
- Detailed README for every section
- 100+ practical Playwright examples
- Real-world automation scenarios
- API-assisted testing
- Page Object Model implementation
- Visual testing examples
- Excel-based test data utilities
- Framework configuration reference
- CI/CD configuration examples
- Environment configuration
- Interview-friendly explanations and best practices

---

## Repository Structure

```text
01-basics
02-locators
03-authentication
04-assertions
05-timeouts
06-browser-interactions
07-api-assisted-testing
08-visual-tests
09-test-data-and-files
10-real-world-scenarios
11-page-object-model
12-framework-configuration
examples
resources
```

Each section contains:

- Practical examples
- Detailed README
- Best practices
- Common pitfalls
- Engineering notes
- Playwright APIs used

---

## Who is this repository for?

This repository is intended for:

- Developers learning Playwright
- QA Engineers transitioning from Selenium
- Automation Engineers looking for practical examples
- Engineers preparing for Playwright interviews
- Teams building or modernizing Playwright automation frameworks

---

## Technology Stack

- Playwright
- JavaScript
- Node.js
- ExcelJS
- GitHub Actions
- Azure Pipelines

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/srivatsan-srajan/playwright-playground.git
cd playwright-playground
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npm run install:browsers
```

Run all tests

```bash
npm test
```

Run headed

```bash
npm run headed
```

Open Playwright UI

```bash
npm run ui
```

View HTML report

```bash
npm run report
```

---

## Repository Philosophy

This repository documents my journey of learning Playwright while gradually evolving tutorial examples into production-oriented automation patterns.

The emphasis is not only on **how** to use Playwright APIs, but also on **why** certain approaches are preferred, when they should be used, and how they fit into real automation projects.

As the repository grows, it will continue to evolve with newer Playwright features, improved engineering practices, and additional real-world examples.

---

## Contributing

Suggestions, corrections, and discussions are always welcome.

If you find a better Playwright approach or identify an opportunity to improve a recipe or explanation, feel free to open an issue or submit a pull request.

---

## License

Licensed under the MIT License.