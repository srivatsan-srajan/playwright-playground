# Test Data & Files

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

# Selenium vs Playwright

This chapter is intentionally framework-independent.

The same utility layer can be reused with:

- Playwright
- Selenium
- Cypress
- WebdriverIO

Good utility libraries should not depend on the automation framework.

---

# FAQ

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