# Selenium WebDriver Test Suite

A comprehensive end-to-end testing framework built with Selenium WebDriver, TypeScript, and Vitest. This test suite provides robust browser automation for modern web applications with advanced patterns, reliable element selection strategies, and scalable test architecture.

## Architecture Overview

This testing framework implements a **Page Object Model (POM) variant** with centralized configuration and utility classes. The architecture separates test logic from browser automation details, ensuring maintainable and reliable test execution across different environments.

## Prerequisites & Setup

### System Requirements
- **Node.js**: Version 18+ 
- **Chrome/Chromium**: Latest stable version
- **ChromeDriver**: Auto-managed via Selenium Manager (4.0+)
- **Firefox**: Latest stable version (optional)
- **GeckoDriver**: Auto-managed via Selenium Manager (optional)

### Dependencies
```bash
# Core testing framework
npm install --save-dev selenium-webdriver @types/selenium-webdriver
npm install --save-dev vitest typescript tsx
```

### Driver Management
This framework leverages **Selenium Manager** for automatic driver management, eliminating manual driver installation and PATH configuration. Selenium Manager automatically:
- Downloads compatible browser drivers
- Manages driver versions
- Handles browser-driver compatibility

## Configuration

The tests use a configuration file (`selenium.config.ts`) that supports:

- **Browsers**: Chrome and Firefox
- **Headless mode**: Configurable headless execution
- **Window size**: Configurable browser window dimensions
- **Base URL**: Configurable application URL

## Test Execution

### Available Commands

```bash
# Primary Commands
npm run test                       # Execute full test suite (default: E2E)
npm run test:e2e                   # Execute all E2E tests
npm run test:watch                 # Watch mode for active development

# Individual Test Suites
npm run test:basic                 # Core functionality validation
npm run test:homepage              # Landing page and navigation tests  
npm run test:auth                  # Authentication flow testing
npm run test:catalog               # Catalog and search functionality

# Development Commands  
npm run test:e2e:watch             # E2E watch mode for active development
npm run test:manual                # Manual execution with detailed logging

# Advanced Execution
npx vitest tests/selenium/ --reporter=verbose    # Detailed test output
npx vitest tests/selenium/ --run --silent        # CI-friendly execution
```

### Execution Modes

**Headless Mode (Default)**
- Optimized for CI/CD pipelines
- Faster execution, lower resource usage
- Suitable for automated testing environments

**Headed Mode (Debug)**
```typescript
const debugConfig: SeleniumTestConfig = {
  ...defaultConfig,
  headless: false
};
```

## Test Suite Architecture

### Test Organization

| Test File | Coverage | Test Count | Focus Area |
|-----------|----------|------------|------------|
| `basic.spec.ts` | Core functionality | 4 tests | Page loading, element presence, basic interactions |
| `homepage.spec.ts` | Landing page | 7 tests | Hero section, navigation, CTAs, responsive design |
| `auth.spec.ts` | Authentication | 6 tests | Form validation, input handling, theme integration |
| `catalog.spec.ts` | Product catalog | 10 tests | Search, filtering, pagination, card interactions |

### Test Architecture Pattern

```typescript
describe('Feature Test Suite', () => {
  let selenium: SeleniumTestSetup;

  beforeAll(async () => {
    // Driver initialization with configuration
    selenium = new SeleniumTestSetup(defaultConfig);
    await selenium.setupDriver();
  });

  afterAll(async () => {
    // Cleanup and resource management
    await selenium.teardownDriver();
  });

  beforeEach(async () => {
    // Fresh page state for each test
    await selenium.navigateTo('/target-route');
  });

  test('should validate specific behavior', async () => {
    // Arrange: Setup test conditions
    await selenium.waitForElementVisible('[data-testid="target"]', 10000);
    
    // Act: Perform user actions
    await selenium.clickElement('[data-testid="action-button"]');
    
    // Assert: Verify expected outcomes
    const result = await selenium.isElementPresent('[data-testid="success"]');
    expect(result).toBe(true);
  }, 15000); // Custom timeout for complex operations
});
```

## Core Testing Methods

### Driver Management
```typescript
// Lifecycle management
await selenium.setupDriver()              // Initialize WebDriver with configuration
await selenium.teardownDriver()           // Clean up resources and close browser

// Navigation  
await selenium.navigateTo('/path')        // Navigate to specific route
```

### Element Interaction Strategies
```typescript
// Smart waiting patterns (recommended)
await selenium.waitForElement(selector, timeout)         // Wait for DOM presence
await selenium.waitForElementVisible(selector, timeout)  // Wait for visibility

// User action simulation
await selenium.clickElement(selector)                    // Click with retry logic
await selenium.typeText(selector, text)                  // Type with clear + input

// Data extraction
const text = await selenium.getText(selector)            // Extract element text
const exists = await selenium.isElementPresent(selector) // Boolean existence check

// Debugging utilities
await selenium.takeScreenshot(filename)                  // Capture browser state
```

### Advanced Patterns
```typescript
// Conditional interactions
const elementExists = await selenium.isElementPresent('[data-testid="optional"]');
if (elementExists) {
  await selenium.clickElement('[data-testid="optional"]');
}

// Multi-step workflows with validation
await selenium.waitForElementVisible('[data-testid="form"]', 10000);
await selenium.typeText('[data-testid="email"]', 'user@example.com');
await selenium.typeText('[data-testid="password"]', 'secure123');
await selenium.clickElement('[data-testid="submit"]');
await selenium.waitForElementVisible('[data-testid="success"]', 5000);
```

## Element Selection Strategy

### data-testid Approach
This framework implements **data-testid** attributes as the primary element selection strategy, following testing best practices for:
- **Stability**: Independent of UI changes and CSS modifications
- **Clarity**: Self-documenting test intent
- **Performance**: Efficient CSS selector performance

```tsx
// Component implementation
<button data-testid="submit-button" className="btn-primary">
  Submit Form
</button>
<input data-testid="email-input" type="email" placeholder="Enter email" />
<div data-testid="plant-card" className="card-container">
  <img data-testid="plant-image" src="..." alt="Plant" />
  <h3 data-testid="plant-name">Monstera Deliciosa</h3>
</div>
```

### Selection Hierarchy
1. **Primary**: `[data-testid="specific-element"]`
2. **Fallback**: Semantic HTML elements (`nav`, `main`, `footer`)
3. **Last Resort**: CSS classes (only for structural elements)

### Implemented Test IDs
| Component | Test IDs | Purpose |
|-----------|----------|---------|
| Navigation | `navigation`, `logo`, `mobile-menu-trigger` | App navigation |
| Authentication | `sign-in-email`, `sign-in-password` | Form validation |
| Plant Catalog | `plant-grid`, `plant-card`, `search-input` | Product interaction |
| UI Controls | `theme-toggle`, `pagination-controls` | User preferences |

## Testing Best Practices

### Test Design Principles
1. **Explicit Waits**: Always use `waitForElementVisible()` instead of implicit waits
2. **Isolation**: Each test should be independent and not rely on previous test state
3. **Descriptive Naming**: Test names should clearly describe the expected behavior
4. **Resource Management**: Proper driver cleanup in `afterAll()` hooks
5. **Error Handling**: Graceful failure with meaningful error messages

### Performance Optimization
```typescript
// ✅ Good: Explicit waits with reasonable timeouts
await selenium.waitForElementVisible('[data-testid="content"]', 10000);

// ❌ Avoid: Arbitrary delays
await new Promise(resolve => setTimeout(resolve, 3000));

// ✅ Good: Conditional interactions
const exists = await selenium.isElementPresent('[data-testid="optional"]');
if (exists) { /* interact */ }
```

### Common Patterns
```typescript
// Test isolation pattern
beforeEach(async () => {
  await selenium.navigateTo('/fresh-page');
  // Reset any global state if needed
});

// Multi-assertion validation
test('should complete user workflow', async () => {
  await selenium.clickElement('[data-testid="start"]');
  await selenium.waitForElementVisible('[data-testid="step-1"]', 5000);
  
  await selenium.typeText('[data-testid="input"]', 'test-data');
  await selenium.clickElement('[data-testid="continue"]');
  await selenium.waitForElementVisible('[data-testid="step-2"]', 5000);
  
  const success = await selenium.isElementPresent('[data-testid="success"]');
  expect(success).toBe(true);
});
```

## Troubleshooting Guide

### Resolution Strategies

| Issue | Symptom | Solution |
|-------|---------|----------|
| **Driver Issues** | `WebDriverError: unknown error` | Selenium Manager handles automatically |
| **Element Not Found** | `NoSuchElementError` | Verify data-testid exists; increase timeout |
| **Timing Issues** | `TimeoutError` | Add explicit waits; check async operations |
| **Stale Elements** | `StaleElementReferenceError` | Re-locate element after DOM changes |

### Debug Configuration
```typescript
const debugConfig: SeleniumTestConfig = {
  browser: 'chrome',
  headless: false,           // Visual debugging
  windowSize: { width: 1920, height: 1080 },
  baseUrl: 'http://localhost:8080'
};
```

## CI/CD Integration

### Pipeline Configuration
```yaml
# Example GitHub Actions workflow
name: Selenium Tests
on: [push, pull_request]

jobs:
  selenium-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start application
        run: npm run dev &
        
      - name: Wait for application
        run: npx wait-on http://localhost:8080
        
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true
```

### Environment Variables
```bash
# Test environment configuration
SELENIUM_BROWSER=chrome          # Browser selection
SELENIUM_HEADLESS=true          # Headless mode for CI
SELENIUM_TIMEOUT=30000          # Global timeout setting
SELENIUM_BASE_URL=http://localhost:8080  # Application URL
```

## Advanced Features

### Cross-Browser Testing
```typescript
const browserConfigs = [
  { browser: 'chrome', headless: true },
  { browser: 'firefox', headless: true }
];

// Run tests across multiple browsers
browserConfigs.forEach(config => {
  describe(`Tests on ${config.browser}`, () => {
    // Test implementation
  });
});
```

### Test Results & Reporting
- **JSON Reports**: Test execution results in structured format
- **Screenshots**: Automatic capture on test failures
- **Performance Metrics**: Page load times and interaction speeds
- **Coverage Reports**: Integration with Vitest coverage tools

## Framework Extensions

This Selenium framework is designed for extensibility:

1. **Page Object Model**: Easily implement POM patterns
2. **Data-Driven Testing**: CSV/JSON test data integration  
3. **Custom Matchers**: Extend expect() with domain-specific assertions
4. **Parallel Execution**: Multi-browser concurrent testing
5. **Visual Testing**: Screenshot comparison capabilities

---

**Framework Version**: 1.0.0 | **Selenium WebDriver**: 4.x | **Node.js**: 18+
