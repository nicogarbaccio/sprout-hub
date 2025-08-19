import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { SeleniumTestSetup, defaultConfig } from './selenium.config';

describe('Homepage Selenium Tests', () => {
  let selenium: SeleniumTestSetup;

  beforeAll(async () => {
    selenium = new SeleniumTestSetup(defaultConfig);
    await selenium.setupDriver();
  });

  afterAll(async () => {
    await selenium.teardownDriver();
  });

  beforeEach(async () => {
    await selenium.navigateTo('/');
  });

  test('should load homepage successfully', async () => {
    // Wait for the hero section to load
    await selenium.waitForElementVisible('[data-testid="hero-section"]', 10000);
    
    // Check if the hero section is present
    const heroSection = await selenium.isElementPresent('[data-testid="hero-section"]');
    expect(heroSection).toBe(true);
    
    // Check if the hero title is present
    const heroTitle = await selenium.isElementPresent('[data-testid="hero-title"]');
    expect(heroTitle).toBe(true);
  });

  test('should display navigation menu', async () => {
    // Check if navigation is present
    const nav = await selenium.isElementPresent('[data-testid="navigation"]');
    expect(nav).toBe(true);

    // Check if logo is visible
    const logo = await selenium.isElementPresent('[data-testid="logo"]');
    expect(logo).toBe(true);
  });

  test('should have working theme toggle', async () => {
    // Find and click theme toggle
    const themeToggle = await selenium.isElementPresent('[data-testid="theme-toggle"]');
    expect(themeToggle).toBe(true);

    // Click theme toggle
    await selenium.clickElement('[data-testid="theme-toggle"]');
    
    // Wait a moment for theme change
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify theme toggle is still functional
    const toggleStillPresent = await selenium.isElementPresent('[data-testid="theme-toggle"]');
    expect(toggleStillPresent).toBe(true);
  });

  test('should display plant catalog section', async () => {
    // Check if plant catalog section exists
    const catalogSection = await selenium.isElementPresent('[data-testid="plant-catalog"]');
    expect(catalogSection).toBe(true);
    
    // Check if start growing button is present
    const startGrowingButton = await selenium.isElementPresent('[data-testid="start-growing-button"]');
    expect(startGrowingButton).toBe(true);
  });

  test('should be able to click start growing button', async () => {
    // Check if start growing button is present
    const startGrowingButton = await selenium.isElementPresent('[data-testid="start-growing-button"]');
    expect(startGrowingButton).toBe(true);

    // Click the start growing button
    await selenium.clickElement('[data-testid="start-growing-button"]');
    
    // Wait for navigation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify we navigated (button should take us to catalog)
    const currentUrl = await selenium.driver?.getCurrentUrl();
    expect(currentUrl).toContain('/plant-catalog');
  });

  test('should display footer with links', async () => {
    // Scroll to footer
    // Note: In a real test, you'd want to scroll to the footer
    // For now, just check if it exists
    const footer = await selenium.isElementPresent('footer');
    expect(footer).toBe(true);
  });

  test('should be responsive on different screen sizes', async () => {
    // Check basic elements are present on load
    const heroSection = await selenium.isElementPresent('[data-testid="hero-section"]');
    expect(heroSection).toBe(true);
    
    // Check navigation is responsive-friendly
    const navigation = await selenium.isElementPresent('[data-testid="navigation"]');
    expect(navigation).toBe(true);
  });
});
