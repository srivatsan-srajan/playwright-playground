# Timeouts, Retries & Test Execution

# Execution Architecture

```
Playwright Test Runner

        │

        ▼

Worker Pool

        │

        ▼

Test Files

        │

        ▼

Tests

        │

        ▼

Browser Instances
```

Execution behavior is controlled by a combination of:

- Timeouts
- Retries
- Workers
- Parallel / Serial execution

---

# Timeouts

Timeouts prevent Playwright from waiting indefinitely.

Without timeouts:

```
Click

↓

Application hangs

↓

Automation waits forever
```

With timeouts:

```
Click

↓

Timeout reached

↓

Test fails

↓

Useful diagnostics generated
```

Timeouts improve reliability by failing quickly when expected behavior does not occur.

---

# Types of Timeouts

Playwright provides several timeout mechanisms.

| Timeout | Purpose |
|----------|---------|
| `timeout` | Entire test |
| `expect.timeout` | Assertion timeout |
| `actionTimeout` | Clicks, fills, selections |
| `navigationTimeout` | Page navigation |

Each serves a different purpose.

---

# Test Timeout

Limits the total execution time of a test.

```javascript
export default defineConfig({

    timeout: 30000

});
```

or

```javascript
test.setTimeout(60000);
```

Recommended:

- Unit-sized UI tests → 30 seconds
- Complex workflows → 60–90 seconds

---

# Action Timeout

Limits individual browser actions.

Example:

```javascript
use: {

    actionTimeout: 10000

}
```

Applies to:

- click()
- fill()
- check()
- selectOption()
- dragTo()

---

# Navigation Timeout

Controls navigation operations.

```javascript
use: {

    navigationTimeout: 30000

}
```

Applies to:

- goto()
- reload()
- goBack()
- goForward()

---

# Expect Timeout

Assertions wait automatically.

Default:

```
5 seconds
```

Override:

```javascript
await expect(locator)

    .toHaveText(

        'Dashboard',

        {

            timeout: 10000

        }

    );
```

Use only when necessary.

---

# Timeout Hierarchy

```
Global Timeout

↓

Project Timeout

↓

Test Timeout

↓

Action Timeout

↓

Assertion Timeout
```

More specific configuration overrides broader settings.

---

# Real Project Timeout Recommendations

| Environment | Recommendation |
|-------------|----------------|
| Local Development | 30 seconds |
| CI/CD | 45–60 seconds |
| Slow Test Environment | 60 seconds |
| Production Smoke Tests | 20–30 seconds |

---

# Retries

Retries determine whether Playwright should automatically execute a failed test again.

Example:

```javascript
export default defineConfig({

    retries: 2

});
```

Execution:

```
Attempt 1

↓

Failure

↓

Retry 1

↓

Retry 2

↓

Final Result
```

---

# Why Retries Exist

Retries are designed for:

- Network instability
- Temporary browser issues
- Infrastructure failures
- Intermittent application issues

Retries are **not** intended to hide poor test design.

---

# Retry Recommendations

## Local Development

```javascript
retries: 0
```

You want failures immediately.

---

## CI Pipeline

```javascript
retries: 2
```

Recommended.

---

## Large Enterprise Suites

```javascript
retries: 2
```

or

```javascript
retries: 3
```

only when infrastructure is unstable.

---

# Flaky Tests

Retries should never become a permanent solution.

```
Fail

↓

Retry

↓

Pass

↓

Ignore
```

is dangerous.

Instead:

```
Fail

↓

Retry

↓

Pass

↓

Investigate

↓

Fix
```

Treat retries as diagnostic tools.

---

# Workers

Workers determine how many browser processes execute simultaneously.

Example:

```javascript
export default defineConfig({

    workers: 4

});
```

Execution:

```
Worker 1

Worker 2

Worker 3

Worker 4

↓

Tests execute simultaneously
```

---

# Worker Percentages

Instead of a fixed number:

```javascript
workers: '50%'
```

Playwright uses half of the available CPU cores.

Useful for:

- CI agents
- Shared infrastructure
- Docker containers

---

# Workers vs Browsers

One worker generally owns one browser instance.

```
Worker

↓

Browser

↓

Context

↓

Page
```

More workers typically mean:

- More browsers
- More CPU usage
- Faster execution

---

# Choosing Worker Count

| Machine | Recommendation |
|----------|----------------|
| Developer Laptop | 2–4 |
| CI Runner | 50% |
| Powerful Build Agent | 75% |
| Shared Infrastructure | 50% |

Avoid using every CPU core.

Leave resources for the operating system.

---

# Parallel Execution

Playwright executes test files in parallel by default.

```
login.spec.js

checkout.spec.js

profile.spec.js

search.spec.js

↓

All execute simultaneously
```

This dramatically reduces execution time.

---

# Parallel Tests Inside a File

Normally tests inside one file execute sequentially.

To run them in parallel:

```javascript
test.describe.configure({

    mode: 'parallel'

});
```

Every test becomes independent.

---

# When to Use Parallel Execution

Ideal for:

- Independent tests
- Stateless tests
- Read-only validations
- API testing
- UI smoke tests

Parallel execution is recommended whenever tests do not depend on one another.

---

# Serial Execution

Some workflows require ordered execution.

Example:

```
Create Customer

↓

Create Order

↓

Generate Invoice

↓

Delete Customer
```

Each step depends on the previous one.

Configure:

```javascript
test.describe.configure({

    mode: 'serial'

});
```

---

# When to Use Serial Execution

Appropriate for:

- End-to-end workflows
- Stateful scenarios
- Data dependency
- Ordered business processes

Avoid serial execution unless required.

---

# Parallel vs Serial

| Parallel | Serial |
|-----------|---------|
| Fast | Slower |
| Independent tests | Dependent tests |
| Better CPU utilization | Single workflow |
| Recommended by default | Use sparingly |

---

# Combining Workers and Parallelism

```
Workers

↓

Multiple Test Files

↓

Parallel Tests

↓

Maximum Throughput
```

Most enterprise frameworks use:

- Multiple workers
- Parallel execution
- Serial only where required

---

# Real Project Recommendations

## Local Development

```javascript
workers: 2

retries: 0

timeout: 30000
```

---

## CI Pipeline

```javascript
workers: '50%'

retries: 2

timeout: 45000
```

---

## Nightly Regression

```javascript
workers: '75%'

retries: 2

fullyParallel: true
```

---

## End-to-End Workflow

```javascript
test.describe.configure({

    mode: 'serial'

});
```

---

# Selenium vs Playwright

| Selenium | Playwright |
|----------|------------|
| TestNG/JUnit Parallel Config | Built-in workers |
| Thread Pools | Workers |
| Retry Analyzer | retries |
| Implicit Waits | Auto-waiting + explicit timeouts |
| Sequential by default | Parallel by default |

Playwright provides a simpler and more scalable execution model than traditional Selenium frameworks.

---

# FAQ

### Why are retries useful?

Retries help mitigate temporary infrastructure or network issues but should never replace fixing unstable tests.

---

### Why should serial execution be avoided?

Serial execution reduces throughput and creates dependencies between tests, making suites slower and harder to maintain.

---

### Why use worker percentages instead of fixed numbers?

Worker percentages automatically scale across developer machines and CI environments with different CPU capacities.

---

### Which execution model should be the default?

Parallel execution.

Only use serial execution when tests have unavoidable dependencies.

---

# Decision Matrix

| Scenario | Recommendation |
|----------|----------------|
| Local Development | Workers: 2, Retries: 0 |
| CI Pipeline | Workers: 50%, Retries: 2 |
| Nightly Regression | Workers: 75%, Fully Parallel |
| Smoke Tests | Parallel |
| API Tests | Parallel |
| UI Regression | Parallel |
| Business Workflow | Serial |
| Database Migration Tests | Serial |
| CRUD Validation | Parallel |

---

# Performance Impact

| Setting | Speed | Stability |
|---------|------:|----------:|
| More Workers | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Retries | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Parallel | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Serial | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Long Timeouts | ⭐⭐ | ⭐⭐⭐ |

---

# Real Project Defaults

## Local Development

```javascript
export default defineConfig({

    timeout: 30000,

    retries: 0,

    workers: 2

});
```

---

## Continuous Integration

```javascript
export default defineConfig({

    timeout: 45000,

    retries: 2,

    workers: '50%'

});
```

---

## Enterprise Regression

```javascript
export default defineConfig({

    timeout: 60000,

    retries: 2,

    workers: '75%',

    fullyParallel: true

});
```

---

# Quick Reference

| Feature | Recommended Default |
|----------|---------------------|
| Test Timeout | 30–45 seconds |
| Retries (Local) | 0 |
| Retries (CI) | 2 |
| Workers (Local) | 2–4 |
| Workers (CI) | 50% |
| Parallel Execution | Yes |
| Serial Execution | Only when required |

---