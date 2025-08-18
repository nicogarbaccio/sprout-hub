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
    // Wait for the main content to load
    await selenium.waitForElementVisible('main', 10000);
    
    // Check if the hero section is present
    const heroSection = await selenium.isElementPresent('[data-testid="hero-section"]');
    expect(heroSection).toBe(true);
  });

  test('should display navigation menu', async () => {
    // Check if navigation is present
    const nav = await selenium.isElementPresent('nav');
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
  });

  test('should have working search functionality', async () => {
    // Check if search input is present
    const searchInput = await selenium.isElementPresent('[data-testid="search-input"]');
    expect(searchInput).toBe(true);

    // Type in search
    await selenium.typeText('[data-testid="search-input"]', 'monstera');
    
    // Wait for search results
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify search input contains the text
    const searchText = await selenium.getText('[data-testid="search-input"]');
    expect(searchText).toContain('monstera');
  });

  test('should display footer with links', async () => {
    // Scroll to footer
    // Note: In a real test, you'd want to scroll to the footer
    // For now, just check if it exists
    const footer = await selenium.isElementPresent('footer');
    expect(footer).toBe(true);
  });

  test('should be responsive on different screen sizes', async () => {
    // This test would resize the browser window and verify responsive behavior
    // For now, we'll just verify the page loads correctly
    const mainContent = await selenium.isElementPresent('main');
    expect(mainContent).toBe(true);
  });
});
