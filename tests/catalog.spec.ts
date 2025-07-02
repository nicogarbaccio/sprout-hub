import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setupCleanTest, ensureLoggedOut } from './test-utils';

test('catalog page loads and displays 24 plants at a time', async ({ page }) => {
  await setupCleanTest(page);
  await page.getByTestId('nav-plant-catalog-button').click();
  await expect(page).toHaveURL('/plant-catalog');
  await expect(page.getByText('find your next green companion')).toBeVisible();
  await expect(page.getByTestId('search-input')).toBeVisible();
  await expect(page.getByTestId('filters-button')).toBeVisible();
  // verify 24 plants are displayed
  await expect(page.getByTestId('plant-card')).toHaveCount(24);
  // verify pagination summary shows correct range
  await expect(page.getByText(/showing 1-24 of/i)).toBeVisible();
  // verify plant cards show sign in to add button when user is signed out
  await expect(page.getByText('Sign in to add').first()).toBeVisible();
});

test('search filters plants', async ({ page }) => {
    await setupCleanTest(page);
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