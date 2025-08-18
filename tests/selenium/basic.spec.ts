import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { SeleniumTestSetup, defaultConfig } from './selenium.config';

describe('Basic Selenium Tests', () => {
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

  test('should load homepage and find basic elements', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if body element is present
    const bodyElement = await selenium.isElementPresent('body');
    expect(bodyElement).toBe(true);
    
    // Check if we can find any text content
    const bodyText = await selenium.getText('body');
    expect(bodyText.length).toBeGreaterThan(0);
    
    // Check if we can find the hero section we added data-testid to
    const heroSection = await selenium.isElementPresent('[data-testid="hero-section"]');
    expect(heroSection).toBe(true);
  }, 10000);

  test('should find hero title', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if hero title is present
    const heroTitle = await selenium.isElementPresent('[data-testid="hero-title"]');
    expect(heroTitle).toBe(true);
    
    // Get the title text
    const titleText = await selenium.getText('[data-testid="hero-title"]');
    expect(titleText).toContain('Your plants deserve the');
  }, 10000);

  test('should find start growing button', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if start growing button is present
    const startButton = await selenium.isElementPresent('[data-testid="start-growing-button"]');
    expect(startButton).toBe(true);
    
    // Check if button text is correct
    const buttonText = await selenium.getText('[data-testid="start-growing-button"]');
    expect(buttonText).toContain('Start Growing');
  }, 10000);

  test('should be able to click start growing button', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click the start growing button
    await selenium.clickElement('[data-testid="start-growing-button"]');
    
    // Wait for navigation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify we're still on a page (button should navigate to catalog)
    const bodyElement = await selenium.isElementPresent('body');
    expect(bodyElement).toBe(true);
  }, 10000);
});
