import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setupCleanTest, ensureLoggedOut } from './test-utils';

test('catalog page loads and hides filters with upsell when logged out', async ({ page }) => {
  await setupCleanTest(page);
  await page.getByTestId('nav-plant-catalog-button').click();
  await expect(page).toHaveURL('/plant-catalog');
  await expect(page.getByText('find your next green companion')).toBeVisible();
  await expect(page.getByTestId('search-input')).toBeHidden();
  await expect(page.getByTestId('filters-button')).toBeHidden();
  // verify 24 plants are displayed
  await expect(page.getByTestId('plant-card')).toHaveCount(24);
  // verify pagination summary shows correct range
  await expect(page.getByText(/showing 1-24 of/i)).toBeVisible();
  // Upsell replaces pagination when logged out
  await expect(page.getByTestId('auth-upsell')).toBeVisible();
  // verify plant cards show sign in to add button when user is signed out
  await expect(page.getByText('Sign in to add').first()).toBeVisible();
});

test('search filters plants', async ({ page }) => {
    await setupCleanTest(page);
    // Sign in first so filters are available
    await page.getByTestId('nav-sign-in-button').click();
    if (!process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
      throw new Error('Missing TEST_EMAIL or TEST_PASSWORD in environment variables');
    }
    await page.getByTestId('sign-in-email').fill(process.env.TEST_EMAIL);
    await page.getByTestId('sign-in-password').fill(process.env.TEST_PASSWORD);
    await page.getByTestId('sign-in-button').click();
    await expect(page).not.toHaveURL('/auth');

    // Now navigate to catalog and use filters
    await page.getByTestId('nav-plant-catalog-button').click();
    await expect(page).toHaveURL('/plant-catalog');
    await expect(page.getByText('find your next green companion')).toBeVisible();
    await expect(page.getByTestId('search-input')).toBeVisible();
    await expect(page.getByTestId('filters-button')).toBeVisible();
    // search for 'aloe vera'
    await page.getByTestId('search-input').fill('aloe vera');
    // verify only aloe vera plants are displayed
    await expect(page.getByTestId('plant-card')).toHaveCount(1);
    // verify pagination summary shows correct range
    await expect(page.getByText(/showing 1-1 of/i)).toBeVisible();
})