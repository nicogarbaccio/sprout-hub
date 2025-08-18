import { SeleniumTestSetup, defaultConfig } from './selenium.config';

describe('Authentication Selenium Tests', () => {
  let selenium: SeleniumTestSetup;

  beforeAll(async () => {
    selenium = new SeleniumTestSetup(defaultConfig);
    await selenium.setupDriver();
  });

  afterAll(async () => {
    await selenium.teardownDriver();
  });

  beforeEach(async () => {
    await selenium.navigateTo('/auth');
  });

  test('should load authentication page', async () => {
    // Wait for auth page to load
    await selenium.waitForElementVisible('[data-testid="auth-page"]', 10000);
    
    // Check if auth form is present
    const authForm = await selenium.isElementPresent('[data-testid="auth-form"]');
    expect(authForm).toBe(true);
  });

  test('should display sign in form by default', async () => {
    // Check if sign in form is visible
    const signInForm = await selenium.isElementPresent('[data-testid="signin-form"]');
    expect(signInForm).toBe(true);
  });

  test('should switch to sign up form', async () => {
    // Click on sign up tab/link
    await selenium.clickElement('[data-testid="signup-tab"]');
    
    // Wait for sign up form to be visible
    await selenium.waitForElementVisible('[data-testid="signup-form"]', 5000);
    
    // Verify sign up form is present
    const signUpForm = await selenium.isElementPresent('[data-testid="signup-form"]');
    expect(signUpForm).toBe(true);
  });

  test('should validate form inputs', async () => {
    // Try to submit empty form
    await selenium.clickElement('[data-testid="submit-button"]');
    
    // Wait for validation errors
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if validation errors are displayed
    const validationErrors = await selenium.isElementPresent('[data-testid="validation-error"]');
    expect(validationErrors).toBe(true);
  });

  test('should handle form input correctly', async () => {
    // Fill in email field
    await selenium.typeText('[data-testid="email-input"]', 'test@example.com');
    
    // Fill in password field
    await selenium.typeText('[data-testid="password-input"]', 'password123');
    
    // Verify input values
    const emailValue = await selenium.getText('[data-testid="email-input"]');
    expect(emailValue).toContain('test@example.com');
  });

  test('should show password visibility toggle', async () => {
    // Check if password visibility toggle exists
    const passwordToggle = await selenium.isElementPresent('[data-testid="password-toggle"]');
    expect(passwordToggle).toBe(true);
    
    // Click password toggle
    await selenium.clickElement('[data-testid="password-toggle"]');
    
    // Wait for toggle effect
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify toggle is still functional
    const toggleStillPresent = await selenium.isElementPresent('[data-testid="password-toggle"]');
    expect(toggleStillPresent).toBe(true);
  });

  test('should display forgot password link', async () => {
    // Check if forgot password link exists
    const forgotPasswordLink = await selenium.isElementPresent('[data-testid="forgot-password-link"]');
    expect(forgotPasswordLink).toBe(true);
  });

  test('should have proper form accessibility', async () => {
    // Check if form has proper labels
    const emailLabel = await selenium.isElementPresent('label[for="email"]');
    expect(emailLabel).toBe(true);
    
    const passwordLabel = await selenium.isElementPresent('label[for="password"]');
    expect(passwordLabel).toBe(true);
  });
});
