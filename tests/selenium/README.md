# sprouthub Selenium WebDriver Test Suite

A comprehensive end-to-end testing framework for **sprouthub**. Built with Selenium WebDriver, TypeScript, and Vitest, this test suite validates critical plant management workflows, user authentication, catalog browsing, and smart watering features across multiple browsers and devices.

## sprouthub Application Overview

**sprouthub** is a full-stack plant care tracker that helps users manage their indoor gardens with intelligent features:

- **Plant Collection Management**: Add, organize, and track personal plant collections by rooms
- **Smart Watering System**: AI-powered watering recommendations based on environmental factors
- **Plant Catalog**: Browse and search a curated library of plants with detailed care guides
- **Care Activity Tracking**: Log watering, fertilizing, and other care activities with timestamps
- **PWA Features**: Offline support, mobile-first design, and native iOS app capabilities

## Test Architecture Overview

This testing framework implements a **Page Object Model (POM) variant** specifically designed for sprouthub's plant care workflows. The architecture separates test logic from browser automation details, ensuring maintainable validation of:

- **Authentication flows** (sign-up, sign-in, user sessions)
- **Plant management workflows** (adding plants, room organization, care tracking)
- **Search and filtering functionality** (plant catalog, care history)
- **Smart watering interactions** (preferences, scheduling, postpone features)
- **Responsive design patterns** (mobile-first UI, PWA features)

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

### sprouthub
 Test Organization

| Test File | Coverage | Test Count | Plant Care Focus Area |
|-----------|----------|------------|----------------------|
| `basic.spec.ts` | Core plant care functionality | 4 tests | sprouthub loading, plant management elements, core navigation |
| `homepage.spec.ts` | Plant care onboarding | 7 tests | Plant care hero section, garden navigation, "Start Growing" CTA |
| `auth.spec.ts` | Plant enthusiast authentication | 6 tests | User profiles, plant care preferences, secure garden access |
| `plant-catalog.spec.ts` | Plant discovery & selection | 10 tests | Species search, care guide filtering, plant collection building |

### Test Architecture Pattern

```typescript
describe('sprouthub Plant Care Tests', () => {
  let selenium: SeleniumTestSetup;

  beforeAll(async () => {
    // Initialize WebDriver for plant care testing
    selenium = new SeleniumTestSetup(defaultConfig);
    await selenium.setupDriver();
  });

  afterAll(async () => {
    // Cleanup and close browser session
    await selenium.teardownDriver();
  });

  beforeEach(async () => {
    // Start fresh on sprouthub homepage for each test
    await selenium.navigateTo('/');
  });

  test('should allow user to start their plant care journey', async () => {
    // Arrange: Wait for sprouthub hero section to load
    await selenium.waitForElementVisible('[data-testid="hero-section"]', 10000);
    
    // Act: Click "Start Growing" to begin plant care onboarding
    await selenium.clickElement('[data-testid="start-growing-button"]');
    
    // Assert: Verify navigation to plant catalog for species selection
    const catalogVisible = await selenium.isElementPresent('[data-testid="plant-catalog"]');
    expect(catalogVisible).toBe(true);
  }, 15000); // Extended timeout for plant data loading
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

## sprouthub Element Selection Strategy

### Plant Care data-testid Approach
This framework implements **data-testid** attributes specifically designed for SproutHub's plant care workflows, following testing best practices for:
- **Plant Care Stability**: Independent of UI themes and seasonal design changes
- **Garden Clarity**: Self-documenting plant management test intent
- **Care Performance**: Efficient selectors for large plant collections

```tsx
// sprouthub Plant Care Component Examples
<button data-testid="add-plant-button" className="btn-primary">
  Add Plant to Collection
</button>
<input data-testid="search-input" type="search" placeholder="Search plants..." />
<div data-testid="plant-card" className="plant-card-container">
  <img data-testid="plant-image" src="..." alt="Monstera Deliciosa" />
  <h3 data-testid="plant-name">Monstera Deliciosa</h3>
  <button data-testid="water-plant-button">Water Plant</button>
</div>
<section data-testid="watering-schedule" className="care-schedule">
  <button data-testid="postpone-watering">Postpone Watering</button>
</section>
```

### sprouthub Selection Hierarchy
1. **Primary**: `[data-testid="plant-specific-element"]` (plant care features)
2. **Fallback**: Semantic HTML elements (`nav`, `main`, `section`)
3. **Plant Care**: Plant-specific classes (`.plant-card`, `.watering-button`)
4. **Last Resort**: Generic CSS classes (structural elements only)

### sprouthub Implemented Test IDs
| Plant Care Feature | Test IDs | Plant Management Purpose |
|-------------------|----------|--------------------------|
| Plant Navigation | `navigation`, `logo`, `start-growing-button` | Garden app navigation |
| Authentication | `sign-in-email`, `sign-in-password` | Plant enthusiast profiles |
| Plant Discovery | `plant-grid`, `plant-card`, `search-input` | Species browsing & selection |
| Plant Collection | `my-plants-collection`, `add-plant-button` | Personal garden management |
| Care Features | `water-plant-button`, `watering-schedule` | Smart watering system |
| UI Controls | `theme-toggle`, `pagination-controls` | Garden app preferences |

## sprouthub Plant Care Testing Scenarios

### Core Plant Management Workflows

#### Plant Collection Management
```typescript
test('should allow user to build their plant collection', async () => {
  // Navigate to plant catalog for species discovery
  await selenium.navigateTo('/catalog');
  await selenium.waitForElementVisible('[data-testid="plant-grid"]', 10000);
  
  // Select a plant species (e.g., Monstera Deliciosa)
  await selenium.clickElement('[data-testid="plant-card"]');
  await selenium.waitForElementVisible('[data-testid="add-plant-button"]', 5000);
  
  // Add plant to personal collection
  await selenium.clickElement('[data-testid="add-plant-button"]');
  await selenium.waitForElementVisible('[data-testid="plant-added-success"]', 3000);
});
```

#### Smart Watering System Validation
```typescript
test('should handle smart watering recommendations', async () => {
  // Access plant collection
  await selenium.navigateTo('/my-plants');
  await selenium.waitForElementVisible('[data-testid="my-plants-collection"]', 8000);
  
  // Check watering schedule for a plant
  await selenium.clickElement('[data-testid="plant-card"]');
  await selenium.waitForElementVisible('[data-testid="watering-schedule"]', 5000);
  
  // Test postpone watering functionality
  const postponeButton = await selenium.isElementPresent('[data-testid="postpone-watering"]');
  if (postponeButton) {
    await selenium.clickElement('[data-testid="postpone-watering"]');
    await selenium.waitForElementVisible('[data-testid="watering-postponed"]', 3000);
  }
});
```

#### Plant Discovery & Search
```typescript
test('should enable effective plant species discovery', async () => {
  // Search for specific plant categories
  await selenium.navigateTo('/catalog');
  await selenium.waitForElementVisible('[data-testid="search-input"]', 5000);
  
  // Test plant search functionality
  await selenium.typeText('[data-testid="search-input"]', 'succulent');
  await selenium.waitForElementVisible('[data-testid="plant-grid"]', 8000);
  
  // Verify filtered results show relevant plants
  const plantCards = await selenium.isElementPresent('[data-testid="plant-card"]');
  expect(plantCards).toBe(true);
});
```

### Plant Care User Experience Testing

#### Responsive Plant Care Interface
```typescript
test('should provide optimal plant care experience on mobile', async () => {
  // Test mobile-first plant management interface
  await selenium.navigateTo('/');
  await selenium.waitForElementVisible('[data-testid="hero-section"]', 5000);
  
  // Verify mobile navigation works for plant features
  await selenium.clickElement('[data-testid="mobile-menu-trigger"]');
  await selenium.waitForElementVisible('[data-testid="mobile-menu"]', 3000);
  
  // Test plant care theme toggle (light/dark for day/night gardening)
  await selenium.clickElement('[data-testid="theme-toggle"]');
  // Theme change validation would depend on implementation
});
```

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

### sprouthub CI/CD Pipeline Configuration
```yaml
# sprouthub Plant Care Testing Pipeline
name: sprouthub E2E Plant Care Tests
on: [push, pull_request]

jobs:
  sprouthub-plant-care-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start sprouthub application
        run: npm run dev &
        
      - name: Wait for sprouthub to be ready
        run: npx wait-on http://localhost:8080
        
      - name: Run plant care E2E tests
        run: npm run test:e2e
        env:
          CI: true
          SPROUTHUB_ENV: test
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
