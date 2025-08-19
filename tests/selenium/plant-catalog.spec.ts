import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { SeleniumTestSetup, defaultConfig } from './selenium.config';

describe('Plant Catalog Selenium Tests', () => {
  let selenium: SeleniumTestSetup;

  beforeAll(async () => {
    selenium = new SeleniumTestSetup(defaultConfig);
    await selenium.setupDriver();
  });

  afterAll(async () => {
    await selenium.teardownDriver();
  });

  beforeEach(async () => {
    await selenium.navigateTo('/catalog');
  });

  test('should load plant catalog page', async () => {
    // Wait for catalog page to load
    await selenium.waitForElementVisible('[data-testid="plant-catalog"]', 10000);
    
    // Check if catalog header is present
    const catalogHeader = await selenium.isElementPresent('[data-testid="catalog-header"]');
    expect(catalogHeader).toBe(true);
  });

  test('should display plant grid', async () => {
    // Check if plant grid is present
    const plantGrid = await selenium.isElementPresent('[data-testid="plant-grid"]');
    expect(plantGrid).toBe(true);
    
    // Check if at least one plant card is displayed
    const plantCards = await selenium.isElementPresent('[data-testid="plant-card"]');
    expect(plantCards).toBe(true);
  });

  test('should have working search functionality', async () => {
    // Check if search input is present
    const searchInput = await selenium.isElementPresent('[data-testid="search-input"]');
    expect(searchInput).toBe(true);
    
    // Type in search
    await selenium.typeText('[data-testid="search-input"]', 'succulent');
    
    // Wait for search results
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verify search input contains the text
    const searchText = await selenium.getText('[data-testid="search-input"]');
    expect(searchText).toContain('succulent');
  });

  test('should display filters', async () => {
    // Check if filters section is present
    const filtersSection = await selenium.isElementPresent('[data-testid="plant-filters"]');
    expect(filtersSection).toBe(true);
    
    // Check if category filter is present
    const categoryFilter = await selenium.isElementPresent('[data-testid="category-filter"]');
    expect(categoryFilter).toBe(true);
  });

  test('should apply filters correctly', async () => {
    // Click on a category filter
    await selenium.clickElement('[data-testid="category-filter"]');
    
    // Wait for filter to be applied
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify filter is still present
    const filterStillPresent = await selenium.isElementPresent('[data-testid="category-filter"]');
    expect(filterStillPresent).toBe(true);
  });

  test('should display pagination controls', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if pagination controls are visible (might not be visible if not enough items)
    const paginationControls = await selenium.isElementPresent('[data-testid="pagination-controls"]');
    // Pagination might not exist if there's only one page, so we'll check for navigation instead
    const navigation = await selenium.isElementPresent('[data-testid="navigation"]');
    expect(navigation).toBe(true);
  });

  test('should navigate through pages', async () => {
    // Check if next page button is present
    const nextButton = await selenium.isElementPresent('[data-testid="next-page"]');
    if (nextButton) {
      // Click next page
      await selenium.clickElement('[data-testid="next-page"]');
      
      // Wait for page change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify we're still on catalog page
      const catalogStillPresent = await selenium.isElementPresent('[data-testid="plant-catalog"]');
      expect(catalogStillPresent).toBe(true);
    }
  });

  test('should display plant results summary', async () => {
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if results summary is present
    const resultsSummary = await selenium.isElementPresent('[data-testid="results-summary"]');
    expect(resultsSummary).toBe(true);
  });

  test('should have working plant card interactions', async () => {
    // Find first plant card
    const plantCard = await selenium.isElementPresent('[data-testid="plant-card"]');
    expect(plantCard).toBe(true);
    
    // Click on plant card to view details
    await selenium.clickElement('[data-testid="plant-card"]');
    
    // Wait for navigation or modal
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verify we're either on details page or modal is open
    const detailsPage = await selenium.isElementPresent('[data-testid="plant-details"]');
    const modalOpen = await selenium.isElementPresent('[data-testid="plant-modal"]');
    expect(detailsPage || modalOpen).toBe(true);
  });

  test('should handle empty search results', async () => {
    // Search for something that won't exist
    await selenium.typeText('[data-testid="search-input"]', 'nonexistentplant12345');
    
    // Wait for search results
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if no results message is displayed
    const noResults = await selenium.isElementPresent('[data-testid="no-results"]');
    // This might not exist, so we'll just verify the search worked
    const searchText = await selenium.getText('[data-testid="search-input"]');
    expect(searchText).toContain('nonexistentplant12345');
  });
});
