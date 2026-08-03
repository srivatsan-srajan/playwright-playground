# Test Data & Files

> **Engineering Cookbook – Chapter 09**

Real-world automation frameworks rarely rely on hardcoded values.

Instead, they load, manipulate, and persist data from external sources such as Excel workbooks, JSON documents, CSV files, configuration files, downloads, and uploads.

This chapter demonstrates how to build a reusable data access layer that keeps test code clean while centralizing all file operations into well-designed utility classes.

Rather than scattering file manipulation throughout the automation suite, the framework exposes a simple API that can be reused across hundreds of tests.

---

# Who Should Read This Chapter?

✅ Automation Engineers

✅ Playwright Engineers

✅ SDETs

✅ Framework Developers

✅ Interview Candidates

---

# Learning Objectives

After completing this chapter you should be able to:

- Build reusable utility classes
- Read and update Excel workbooks
- Search worksheets dynamically
- Append new rows
- Read complete worksheets
- Read individual rows and columns
- Encapsulate third-party libraries
- Design reusable data-access APIs

---

# Why Test Data Matters

Most enterprise automation frameworks separate **test logic** from **test data**.

Instead of writing:

```javascript
await page.fill('#username', 'admin');
await page.fill('#password', 'Password123');
```

data is loaded from an external source.

```
Tests

↓

Test Data Layer

↓

Excel / JSON / CSV

↓

Application
```

This separation improves maintainability, reuse, and readability.

---

# Architecture

This chapter demonstrates a layered architecture.

```
Playwright Tests

        │

        ▼

ExcelUtils Client

        │

        ▼

ExcelUtils Library

        │

        ▼

ExcelJS

        │

        ▼

Workbook
```

Each layer has a single responsibility:

| Layer | Responsibility |
|--------|----------------|
| Tests | Business workflows |
| Client | Demonstrates utility usage |
| ExcelUtils | Reusable data access API |
| ExcelJS | Third-party library |
| Workbook | Physical Excel file |

This separation keeps business tests free from low-level file manipulation.

---

# Recipes Included

| Recipe | Purpose |
|---------|---------|
| `excel-utils.js` | Production-style utility library for interacting with Excel workbooks. |
| `excel-utils-client.js` | Demonstrates every public method exposed by the utility library. |

Future recipes will include:

- JSON utilities
- CSV utilities
- YAML support
- XML parsing
- Environment configuration
- File uploads
- File downloads
- PDF utilities

---

# Concepts Covered

## Workbook Management

The utility provides helper methods to:

- Load workbooks
- Save workbooks
- Access worksheets safely

Rather than exposing ExcelJS directly, the utility encapsulates the implementation details and exposes a much cleaner API. :contentReference[oaicite:0]{index=0}

---

## Reading Data

Several read operations are supported:

### Read a Single Cell

Retrieve a value using row and column coordinates. :contentReference[oaicite:1]{index=1}

---

### Read an Entire Row

Useful for:

- Test data
- User records
- Configuration values :contentReference[oaicite:2]{index=2}

---

### Read an Entire Column

Ideal for extracting datasets without manually iterating through cells. :contentReference[oaicite:3]{index=3}

---

### Read the Entire Worksheet

Returns worksheet contents as a structured collection that can easily be consumed by tests or reports. :contentReference[oaicite:4]{index=4}

---

## Searching

Instead of hardcoding row numbers, the framework searches for values dynamically.

```
Worksheet

↓

Search Value

↓

Return Row + Column
```

This makes tests more resilient when worksheet contents change. :contentReference[oaicite:5]{index=5}

---

## Updating Data

Two update strategies are demonstrated.

### Update by Position

```
Row

↓

Column

↓

Update Value
```

Suitable when the exact coordinates are known. :contentReference[oaicite:6]{index=6}

---

### Update by Search

```
Find Cell

↓

Update Matching Value
```

Much more flexible for dynamic spreadsheets. :contentReference[oaicite:7]{index=7}

---

## Appending Rows

Appending data is useful for:

- Reports
- Audit logs
- Test results
- Export files

The utility exposes a single method instead of requiring callers to calculate the next available row. :contentReference[oaicite:8]{index=8}

---

## Convenience APIs

One of the strongest design decisions in this chapter is the `updateValue()` method.

Instead of requiring callers to:

- Load workbook
- Retrieve worksheet
- Search
- Update
- Save

everything is performed through a single reusable API. :contentReference[oaicite:9]{index=9}

This significantly simplifies test code.

---

# Engineering Insights

## Tests Should Express Intent

Good:

```javascript
await ExcelUtils.updateValue({
    filePath,
    sheetName,
    searchText,
    replaceText
});
```

Poor:

```javascript
Load Workbook

↓

Loop Rows

↓

Loop Columns

↓

Update Cell

↓

Save Workbook
```

The first communicates **what** the test is trying to accomplish.

The second exposes unnecessary implementation details.

---

## Encapsulate Third-Party Libraries

Tests should never depend directly on ExcelJS.

Instead:

```
Tests

↓

ExcelUtils

↓

ExcelJS
```

If the underlying library changes in the future, only the utility layer requires modification.

---

## Small APIs Scale Better

The utility exposes focused methods such as:

- `readCell()`
- `findCell()`
- `updateCell()`
- `appendRow()`

Each method performs one task well, making the API predictable and easy to extend. :contentReference[oaicite:10]{index=10}

---

# Best Practices

✔ Keep test data separate from test logic.

✔ Encapsulate file operations.

✔ Throw meaningful exceptions.

✔ Build reusable helper classes.

✔ Keep public APIs small and focused.

✔ Validate worksheet existence before use.

✔ Reuse utilities across multiple frameworks.

---

# Common Mistakes

❌ Embedding ExcelJS code directly inside Playwright tests.

❌ Hardcoding row numbers.

❌ Repeating workbook loading logic.

❌ Forgetting to save changes.

❌ Ignoring missing worksheet errors.

❌ Mixing business logic with file manipulation.

---

# Selenium vs Playwright

This chapter is intentionally framework-independent.

The same utility layer can be reused with:

- Playwright
- Selenium
- Cypress
- WebdriverIO

Good utility libraries should not depend on the automation framework.

---

# Interview Corner

## Why build an `ExcelUtils` class?

To encapsulate third-party dependencies, eliminate duplicated code, and provide a reusable API tailored to the automation framework.

---

## Why separate the client from the utility?

The client demonstrates usage and serves as executable documentation, while the utility contains reusable implementation logic.

---

## Why is searching by value preferable to hardcoded coordinates?

Spreadsheets evolve. Searching makes tests more resilient to structural changes.

---

## Why throw an exception when a worksheet is missing?

Fail fast with a descriptive error rather than allowing unrelated operations to fail later.

---

# FAQ

### Why not use ExcelJS directly in every test?

Because tests should describe business behaviour, not workbook manipulation. Centralizing file operations makes the suite easier to maintain and easier to evolve.

---

### Can this architecture support JSON or CSV?

Yes.

The same design pattern can be applied to:

- JSON
- CSV
- YAML
- XML
- Properties files
- Environment files

giving the framework a consistent data-access layer regardless of the file format.

---

### Should utility classes know about Playwright?

No.

Utility libraries should remain independent of the test framework wherever possible.

---

# Future Recipes

As this chapter grows, it will include:

- JSON utilities
- CSV utilities
- YAML parsing
- XML processing
- PDF reading
- ZIP extraction
- File downloads
- File uploads
- Image comparison helpers
- Environment configuration management

---

# Summary

This chapter demonstrates how to design a reusable **test data management layer** rather than simply reading Excel files.

Key capabilities include:

- Workbook management
- Worksheet access
- Reading and updating cells
- Dynamic searching
- Row appending
- Convenience APIs
- Encapsulation of third-party libraries

These patterns form the foundation of scalable automation frameworks and can be reused across Playwright, Selenium, Cypress, or any other UI automation technology.

---

➡ **Next Chapter:** Realworld Examples

Learn how to capture screenshots, perform visual regression testing, and use snapshot comparisons to detect unexpected UI changes.