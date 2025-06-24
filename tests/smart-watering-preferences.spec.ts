import { test, expect } from '@playwright/test';
import { setupCleanTest } from './test-utils';

test.describe('Smart Watering Preferences', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure clean state before each test
    await setupCleanTest(page);
    
    // Navigate to auth page and sign in with clean state
    await page.goto('/auth');
    
    // Try to sign in first, fallback to sign up if needed
    await page.getByTestId('sign-in-email').fill('test@example.com');
    await page.getByTestId('sign-in-password').fill('testpassword123');
    await page.getByTestId('sign-in-button').click();

    // If sign in fails and we're redirected to sign up, create account
    try {
      await page.waitForURL('/', { timeout: 2000 });
    } catch (error) {
      // If we're still on auth page, might need to sign up
      await page.getByRole('tab', { name: 'Sign Up' }).click();
      await page.getByTestId('sign-up-email').fill('test@example.com');
      await page.getByTestId('sign-up-password').fill('testpassword123');
      await page.getByTestId('sign-up-button').click();
      
      await page.waitForURL('/');
    }
  });

  test('should save and remember user preferences across wizard sessions', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    // First plant - set preferences
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Go through steps and set specific preferences
    await page.getByRole('heading', { name: 'Large (2+ feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'High Light (Direct sunlight 6+ hours)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'I prefer low-maintenance care' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Close wizard without applying
    await page.getByRole('dialog', { name: 'Smart Watering Schedule' }).getByRole('button', { name: 'Close' }).click();
    
    // Close plant dialog
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Close' }).click();
    
    // Try second plant and verify preferences are remembered
    await page.getByRole('heading', { name: 'African Violet' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add African Violet to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Step 1 - size should not be remembered (plant-specific)
    await page.getByRole('heading', { name: 'Small (up to 6")' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 2 - environmental preferences should be remembered
    await expect(page.getByRole('heading', { name: 'High Light (Direct sunlight 6+ hours)' })).toHaveAttribute('aria-selected', 'true');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 3 - care preferences should be remembered
    await expect(page.getByRole('heading', { name: 'I prefer low-maintenance care' })).toHaveAttribute('aria-selected', 'true');
  });

  test('should update preferences when user changes them', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Set initial preferences
    await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'Low Light (Indirect light, away from windows)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Get initial result
    const initialSchedule = await page.locator('text=/Water every \\d+ days/').textContent();
    
    // Go back and change preferences
    await page.getByRole('button', { name: 'Previous' }).click(); // Back to step 3
    await page.getByRole('button', { name: 'Previous' }).click(); // Back to step 2
    
    // Change light condition
    await page.getByRole('heading', { name: 'High Light (Direct sunlight 6+ hours)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify schedule changed
    const newSchedule = await page.locator('text=/Water every \\d+ days/').textContent();
    expect(newSchedule).not.toBe(initialSchedule);
  });

  test('should handle preferences for different environmental conditions', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    // Test low light conditions
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'Low Light (Indirect light, away from windows)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    const lowLightSchedule = await page.locator('text=/Water every \\d+ days/').textContent();
    
    // Close and test high light
    await page.getByRole('dialog', { name: 'Smart Watering Schedule' }).getByRole('button', { name: 'Close' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'High Light (Direct sunlight 6+ hours)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    const highLightSchedule = await page.locator('text=/Water every \\d+ days/').textContent();
    
    // High light should result in more frequent watering than low light
    const lowLightDays = parseInt(lowLightSchedule?.match(/\d+/)?.[0] || '0');
    const highLightDays = parseInt(highLightSchedule?.match(/\d+/)?.[0] || '0');
    expect(highLightDays).toBeLessThan(lowLightDays);
  });
}); 