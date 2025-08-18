# Selenium Tests for SproutHub

This directory contains Selenium WebDriver tests for the SproutHub application. These tests complement the existing Playwright and Vitest testing infrastructure by providing additional browser automation capabilities.

## Setup

### Prerequisites

1. **ChromeDriver**: Download from [ChromeDriver Downloads](https://chromedriver.chromium.org/)
2. **GeckoDriver**: Download from [GeckoDriver Releases](https://github.com/mozilla/geckodriver/releases)
3. **Node.js**: Version 18 or higher

### Installation

The required dependencies are already installed:

```bash
npm install --save-dev selenium-webdriver @types/selenium-webdriver
```

### Browser Drivers

Make sure you have the appropriate browser drivers in your PATH or specify their location in the configuration.

## Configuration

The tests use a configuration file (`selenium.config.ts`) that supports:

- **Browsers**: Chrome and Firefox
- **Headless mode**: Configurable headless execution
- **Window size**: Configurable browser window dimensions
- **Base URL**: Configurable application URL

## Running Tests

### Individual Test Files

```bash
# Run homepage tests
npx vitest tests/selenium/homepage.spec.ts

# Run authentication tests
npx vitest tests/selenium/auth.spec.ts

# Run plant catalog tests
npx vitest tests/selenium/plant-catalog.spec.ts
```

### All Selenium Tests

```bash
# Run all Selenium tests
npx vitest tests/selenium/
```

### Manual Test Runner

```bash
# Run the basic test runner
npx tsx tests/selenium/run-tests.ts
```

## Test Structure

### Test Files

- **`homepage.spec.ts`**: Tests for homepage functionality
- **`auth.spec.ts`**: Tests for authentication features
- **`plant-catalog.spec.ts`**: Tests for plant catalog functionality

### Common Test Patterns

Each test file follows this structure:

```typescript
describe('Feature Tests', () => {
  let selenium: SeleniumTestSetup;

  beforeAll(async () => {
    selenium = new SeleniumTestSetup(defaultConfig);
    await selenium.setupDriver();
  });

  afterAll(async () => {
    await selenium.teardownDriver();
  });

  beforeEach(async () => {
    await selenium.navigateTo('/path');
  });

  test('should do something', async () => {
    // Test implementation
  });
});
```

## Available Methods

The `SeleniumTestSetup` class provides these methods:

- `setupDriver()`: Initialize WebDriver
- `teardownDriver()`: Clean up WebDriver
- `navigateTo(path)`: Navigate to a specific path
- `waitForElement(selector, timeout)`: Wait for element to be located
- `waitForElementVisible(selector, timeout)`: Wait for element to be visible
- `clickElement(selector)`: Click on an element
- `typeText(selector, text)`: Type text into an input
- `getText(selector)`: Get text content of an element
- `isElementPresent(selector)`: Check if element exists
- `takeScreenshot(filename)`: Take a screenshot

## Data Attributes

The tests use `data-testid` attributes to locate elements. Make sure your components include these attributes:

```tsx
<button data-testid="submit-button">Submit</button>
<input data-testid="email-input" type="email" />
<div data-testid="plant-card">Plant Card</div>
```

## Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Add appropriate waits** for dynamic content
3. **Handle async operations** properly
4. **Clean up resources** in afterAll hooks
5. **Use descriptive test names** that explain the expected behavior

## Troubleshooting

### Common Issues

1. **Driver not found**: Ensure browser drivers are in your PATH
2. **Element not found**: Check if data-testid attributes are present
3. **Timing issues**: Increase timeout values for slow operations
4. **Browser compatibility**: Test with different browsers

### Debug Mode

To run tests in headed mode (visible browser), modify the configuration:

```typescript
const config: SeleniumTestConfig = {
  ...defaultConfig,
  headless: false
};
```

## Integration with CI/CD

These tests can be integrated into your CI/CD pipeline by:

1. Installing browser dependencies
2. Running tests in headless mode
3. Capturing screenshots on failure
4. Generating test reports

## Contributing

When adding new tests:

1. Follow the existing test structure
2. Add appropriate data-testid attributes to components
3. Include proper error handling
4. Document any new test utilities
5. Update this README if needed
