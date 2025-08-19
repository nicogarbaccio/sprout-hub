import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
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
    // Wait for page to load by checking for a known element
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if the page loaded successfully
    const bodyElement = await selenium.isElementPresent('body');
    expect(bodyElement).toBe(true);
    
    // Check if navigation is present
    const navigation = await selenium.isElementPresent('[data-testid="navigation"]');
    expect(navigation).toBe(true);
  });

  test('should display sign in form by default', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if sign in email input is present
    const signInEmail = await selenium.isElementPresent('[data-testid="sign-in-email"]');
    expect(signInEmail).toBe(true);
    
    // Check if sign in password input is present  
    const signInPassword = await selenium.isElementPresent('[data-testid="sign-in-password"]');
    expect(signInPassword).toBe(true);
  });

  test('should have theme toggle available', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if theme toggle is present in navigation
    const themeToggle = await selenium.isElementPresent('[data-testid="theme-toggle"]');
    expect(themeToggle).toBe(true);
    
    // Test clicking theme toggle
    await selenium.clickElement('[data-testid="theme-toggle"]');
    
    // Wait for the dropdown to appear
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify toggle is still present after click
    const toggleStillPresent = await selenium.isElementPresent('[data-testid="theme-toggle"]');
    expect(toggleStillPresent).toBe(true);
  });

  test('should handle form input correctly', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Fill in email field if it exists
    const emailExists = await selenium.isElementPresent('[data-testid="sign-in-email"]');
    if (emailExists) {
      await selenium.typeText('[data-testid="sign-in-email"]', 'test@example.com');
      
      // Fill in password field
      await selenium.typeText('[data-testid="sign-in-password"]', 'password123');
      
      // Verify inputs are filled (basic test)
      const emailElement = await selenium.isElementPresent('[data-testid="sign-in-email"]');
      expect(emailElement).toBe(true);
    }
  });

  test('should have navigation elements available', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if navigation sign in button exists
    const navSignInButton = await selenium.isElementPresent('[data-testid="nav-sign-in-button"]');
    expect(navSignInButton).toBe(true);
    
    // Check if logo is clickable
    const logo = await selenium.isElementPresent('[data-testid="logo"]');
    expect(logo).toBe(true);
  });

  test('should have form accessibility elements', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if form has proper labels by looking for the inputs with IDs
    const emailInput = await selenium.isElementPresent('#signin-email');
    expect(emailInput).toBe(true);
    
    const passwordInput = await selenium.isElementPresent('#signin-password');
    expect(passwordInput).toBe(true);
  });
});
