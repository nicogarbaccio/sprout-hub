# Test info

- Name: Smart Watering Wizard >> should complete the full smart watering wizard flow
- Location: /Users/nicogarbaccio/Development/code/Projects/sprouthub-bloom-tracker/tests/smart-watering-wizard.spec.ts:26:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'What are the environmental conditions?' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('heading', { name: 'What are the environmental conditions?' })

    at /Users/nicogarbaccio/Development/code/Projects/sprouthub-bloom-tracker/tests/smart-watering-wizard.spec.ts:51:97
```

# Page snapshot

```yaml
- dialog "Smart Watering Schedule":
  - heading "Smart Watering Schedule" [level=2]:
    - img
    - text: Smart Watering Schedule
  - text: Step 2 of 4 50% complete
  - progressbar
  - img
  - text: Plant Size
  - img
  - text: Environment
  - img
  - text: Preferences
  - img
  - text: Results
  - img
  - heading "Environmental Conditions" [level=3]
  - paragraph: These factors affect how quickly your plant uses water
  - img
  - text: Light Conditions
  - heading "Low" [level=4]
  - paragraph: Low Light (North windows, far from windows)
  - heading "Medium" [level=4]
  - paragraph: Medium Light (East/West windows, filtered)
  - img
  - heading "High" [level=4]
  - paragraph: High Light (South windows, direct sun)
  - img
  - text: Room Temperature
  - heading "Cool" [level=4]
  - paragraph: Cool (60-70°F)
  - heading "Normal" [level=4]
  - paragraph: Normal (70-75°F)
  - img
  - heading "Warm" [level=4]
  - paragraph: Warm (75°F+)
  - img
  - text: Air Humidity
  - heading "Dry" [level=4]
  - paragraph: Dry (< 40%)
  - heading "Normal" [level=4]
  - paragraph: Normal (40-60%)
  - img
  - heading "Humid" [level=4]
  - paragraph: Humid (60%+)
  - button "Previous":
    - img
    - text: Previous
  - button "Continue":
    - text: Continue
    - img
  - button "Close":
    - img
    - text: Close
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Smart Watering Wizard', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('/auth');
   6 |     
   7 |     // Try to sign in first, fallback to sign up if needed
   8 |     await page.getByTestId('sign-in-email').fill('test@example.com');
   9 |     await page.getByTestId('sign-in-password').fill('testpassword123');
   10 |     await page.getByTestId('sign-in-button').click();
   11 |
   12 |     // If sign in fails and we're redirected to sign up, create account
   13 |     try {
   14 |       await page.waitForURL('/', { timeout: 2000 });
   15 |     } catch (error) {
   16 |       // If we're still on auth page, might need to sign up
   17 |       await page.getByRole('tab', { name: 'Sign Up' }).click();
   18 |       await page.getByTestId('sign-up-email').fill('test@example.com');
   19 |       await page.getByTestId('sign-up-password').fill('testpassword123');
   20 |       await page.getByTestId('sign-up-button').click();
   21 |       
   22 |       await page.waitForURL('/');
   23 |     }
   24 |   });
   25 |
   26 |   test('should complete the full smart watering wizard flow', async ({ page }) => {
   27 |     // Navigate to plant catalog
   28 |     await page.goto('/plant-catalog');
   29 |     
   30 |     // Add a Bird of Paradise plant
   31 |     await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
   32 |     
   33 |     // Wait for the add plant dialog
   34 |     await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' })).toBeVisible();
   35 |     
   36 |     // Click the smart watering button within the dialog
   37 |     await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
   38 |     
   39 |     // Wait for the smart watering wizard dialog
   40 |     await expect(page.getByRole('dialog', { name: 'Smart Watering Schedule' })).toBeVisible();
   41 |     
   42 |     // Step 1: Plant Size
   43 |     await expect(page.getByRole('heading', { name: 'How big is your Bird of Paradise?' })).toBeVisible();
   44 |     await expect(page.getByText('Step 1 of 4')).toBeVisible();
   45 |     
   46 |     // Select Medium size
   47 |     await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
   48 |     await page.getByRole('button', { name: 'Continue' }).click();
   49 |     
   50 |     // Step 2: Environmental Conditions
>  51 |     await expect(page.getByRole('heading', { name: 'What are the environmental conditions?' })).toBeVisible();
      |                                                                                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   52 |     await expect(page.getByText('Step 2 of 4')).toBeVisible();
   53 |     
   54 |     // Select High light
   55 |     await page.getByRole('heading', { name: 'High Light (Direct sunlight 6+ hours)' }).click();
   56 |     await page.getByRole('button', { name: 'Continue' }).click();
   57 |     
   58 |     // Step 3: Personal Preferences
   59 |     await expect(page.getByRole('heading', { name: 'What are your care preferences?' })).toBeVisible();
   60 |     await expect(page.getByText('Step 3 of 4')).toBeVisible();
   61 |     
   62 |     // Select frequent care
   63 |     await page.getByRole('heading', { name: 'I like to check on my plants frequently' }).click();
   64 |     await page.getByRole('button', { name: 'Continue' }).click();
   65 |     
   66 |     // Step 4: Results
   67 |     await expect(page.getByRole('heading', { name: 'Your Personalized Schedule' })).toBeVisible();
   68 |     await expect(page.getByText('Step 4 of 4')).toBeVisible();
   69 |     
   70 |     // Expect calculated schedule to be shorter than default (should be 6 days instead of 7)
   71 |     await expect(page.getByText('Water every 6 days')).toBeVisible();
   72 |     
   73 |     // Apply the schedule
   74 |     await page.getByRole('button', { name: 'Apply This Schedule' }).click();
   75 |     
   76 |     // Should be back in the add plant dialog with updated schedule
   77 |     await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' })).toBeVisible();
   78 |     await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByText('Every 6 days')).toBeVisible();
   79 |   });
   80 |
   81 |   test('should validate each step before allowing continuation', async ({ page }) => {
   82 |     await page.goto('/plant-catalog');
   83 |     
   84 |     // Add a plant and open smart watering wizard
   85 |     await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
   86 |     await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
   87 |     
   88 |     // Try to continue without making a selection
   89 |     await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
   90 |     
   91 |     // Make a selection and verify button is enabled
   92 |     await page.getByRole('heading', { name: 'Small (up to 6")' }).click();
   93 |     await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();
   94 |   });
   95 |
   96 |   test('should show different schedules based on environmental factors', async ({ page }) => {
   97 |     await page.goto('/plant-catalog');
   98 |     
   99 |     // Test with low light conditions
  100 |     await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
  101 |     await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
  102 |     
  103 |     // Go through wizard with low light conditions
  104 |     await page.getByRole('heading', { name: 'Large (2+ feet)' }).click();
  105 |     await page.getByRole('button', { name: 'Continue' }).click();
  106 |     
  107 |     await page.getByRole('heading', { name: 'Low Light (Indirect light, away from windows)' }).click();
  108 |     await page.getByRole('button', { name: 'Continue' }).click();
  109 |     
  110 |     await page.getByRole('heading', { name: 'I prefer low-maintenance care' }).click();
  111 |     await page.getByRole('button', { name: 'Continue' }).click();
  112 |     
  113 |     // Low light should result in longer watering interval
  114 |     await expect(page.getByText('Water every')).toBeVisible();
  115 |     const scheduleText = await page.locator('text=/Water every \\d+ days/').textContent();
  116 |     expect(scheduleText).toMatch(/Water every [8-9] days/); // Should be longer than default 7 days
  117 |   });
  118 |
  119 |   test('should allow canceling the wizard', async ({ page }) => {
  120 |     await page.goto('/plant-catalog');
  121 |     
  122 |     await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
  123 |     await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
  124 |     
  125 |     // Close the wizard
  126 |     await page.getByRole('dialog', { name: 'Smart Watering Schedule' }).getByRole('button', { name: 'Close' }).click();
  127 |     
  128 |     // Should be back in the add plant dialog
  129 |     await expect(page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' })).toBeVisible();
  130 |     await expect(page.getByRole('dialog', { name: 'Smart Watering Schedule' })).not.toBeVisible();
  131 |   });
  132 |
  133 |   test('should show progress indicators throughout the wizard', async ({ page }) => {
  134 |     await page.goto('/plant-catalog');
  135 |     
  136 |     await page.getByRole('heading', { name: 'Bird of Paradise' }).locator('..').locator('..').getByRole('button', { name: 'Add to Collection' }).click();
  137 |     await page.getByRole('dialog', { name: 'Add Bird of Paradise to Collection' }).getByRole('button', { name: 'Find optimal schedule for this plant' }).click();
  138 |     
  139 |     // Check step 1 progress
  140 |     await expect(page.getByText('Step 1 of 4')).toBeVisible();
  141 |     await expect(page.getByText('25% complete')).toBeVisible();
  142 |     
  143 |     // Proceed to step 2
  144 |     await page.getByRole('heading', { name: 'Medium (6" to 2 feet)' }).click();
  145 |     await page.getByRole('button', { name: 'Continue' }).click();
  146 |     
  147 |     // Check step 2 progress
  148 |     await expect(page.getByText('Step 2 of 4')).toBeVisible();
  149 |     await expect(page.getByText('50% complete')).toBeVisible();
  150 |     
  151 |     // Proceed to step 3
```