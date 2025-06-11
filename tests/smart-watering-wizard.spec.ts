import { test, expect } from '@playwright/test';

test.describe('Smart Watering Wizard', () => {
  test.beforeEach(async ({ page }) => {
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

  test('should complete the full smart watering wizard flow', async ({ page }) => {
    // Navigate to plant catalog
    await page.goto('/plant-catalog');
    
    // Add a Bird of Paradise plant
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    
    // Wait for the add plant dialog
    await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' })).toBeVisible();
    
    // Click the smart watering button within the dialog
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Wait for the smart watering wizard dialog
    await expect(page.getByRole('dialog', { name: 'Smart Watering Schedule' })).toBeVisible();
    
    // Step 1: Plant Size
    await expect(page.getByRole('heading', { name: 'How big is your Bird of Paradise?' })).toBeVisible();
    await expect(page.getByText('Step 1 of 4')).toBeVisible();
    
    // Select Medium size
    await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 2: Environmental Conditions
    await expect(page.getByRole('heading', { name: 'What are the environmental conditions?' })).toBeVisible();
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    
    // Select High light
    await page.getByRole('heading', { name: 'High Light (Direct sunlight 6+ hours)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 3: Personal Preferences
    await expect(page.getByRole('heading', { name: 'What are your care preferences?' })).toBeVisible();
    await expect(page.getByText('Step 3 of 4')).toBeVisible();
    
    // Select frequent care
    await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 4: Results
    await expect(page.getByRole('heading', { name: 'Your Personalized Schedule' })).toBeVisible();
    await expect(page.getByText('Step 4 of 4')).toBeVisible();
    
    // Expect calculated schedule to be shorter than default (should be 6 days instead of 7)
    await expect(page.getByText('Water every 6 days')).toBeVisible();
    
    // Apply the schedule
    await page.getByRole('button', { name: 'Apply This Schedule' }).click();
    
    // Should be back in the add plant dialog with updated schedule
    await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' })).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByText('Every 6 days')).toBeVisible();
  });

  test('should validate each step before allowing continuation', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    // Add a plant and open smart watering wizard
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Try to continue without making a selection
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
    
    // Make a selection and verify button is enabled
    await page.getByRole('heading', { name: 'Small (up to 6")' }).click();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  test('should show different schedules based on environmental factors', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    // Test with low light conditions
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Go through wizard with low light conditions
    await page.getByRole('heading', { name: 'Large (2+ feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'Low Light (Indirect light, away from windows)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'I prefer low-maintenance care' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Low light should result in longer watering interval
    await expect(page.getByText('Water every')).toBeVisible();
    const scheduleText = await page.locator('text=/Water every \\d+ days/').textContent();
    expect(scheduleText).toMatch(/Water every [8-9] days/); // Should be longer than default 7 days
  });

  test('should allow canceling the wizard', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Close the wizard
    await page.getByRole('dialog', { name: 'Smart Watering Schedule' }).getByRole('button', { name: 'Close' }).click();
    
    // Should be back in the add plant dialog
    await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' })).toBeVisible();
    await expect(page.getByRole('dialog', { name: 'Smart Watering Schedule' })).not.toBeVisible();
  });

  test('should show progress indicators throughout the wizard', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Check step 1 progress
    await expect(page.getByText('Step 1 of 4')).toBeVisible();
    await expect(page.getByText('25% complete')).toBeVisible();
    
    // Proceed to step 2
    await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Check step 2 progress
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    await expect(page.getByText('50% complete')).toBeVisible();
    
    // Proceed to step 3
    await page.getByRole('heading', { name: 'Medium Light (Bright indirect light, near windows)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Check step 3 progress
    await expect(page.getByText('Step 3 of 4')).toBeVisible();
    await expect(page.getByText('75% complete')).toBeVisible();
    
    // Proceed to step 4
    await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Check step 4 progress
    await expect(page.getByText('Step 4 of 4')).toBeVisible();
    await expect(page.getByText('100% complete')).toBeVisible();
  });

  test('should calculate different schedules for different plant sizes', async ({ page }) => {
    await page.goto('/plant-catalog');
    
    // Test small plant
    await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
    await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
    
    // Small plant with standard conditions
    await page.getByRole('heading', { name: 'Small (up to 6")' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'Medium Light (Bright indirect light, near windows)' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Small plants should need more frequent watering
    const scheduleText = await page.locator('text=/Water every \\d+ days/').textContent();
    expect(scheduleText).toMatch(/Water every [4-6] days/); // Should be shorter than default
  });
}); 