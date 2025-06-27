import { test, expect } from '@playwright/test';
import { setupCleanTest } from './test-utils';

// Basic smoke test

test('homepage loads and displays correct title', async ({ page }) => {
  await setupCleanTest(page);
  await expect(page).toHaveTitle('SproutHub');
});

test('navigation bar displays logo, plant catalog, and sign in', async ({ page }) => {
  await setupCleanTest(page);
  // Logo
  const logo = page.getByRole('link', { name: /sprouthub/i });
  await expect(logo).toBeVisible();
  // Plant Catalog button
  await expect(page.getByTestId('nav-plant-catalog-button')).toBeVisible();
  // Sign In button
  await expect(page.getByTestId('nav-sign-in-button')).toBeVisible();
});

test('hero section displays headline, subtext, and start growing button', async ({ page }) => {
  await setupCleanTest(page);
  await expect(page.getByRole('heading', { name: /your plants deserve the best care/i })).toBeVisible();
  await expect(page.getByText(/never forget to water your plants again/i)).toBeVisible();
  const startGrowingLink = page.getByRole('link', { name: /start growing/i });
  await expect(startGrowingLink).toBeVisible();
  await expect(startGrowingLink).toHaveAttribute('href', '/plant-catalog');
  // Hero image
  await expect(page.getByTestId('hero-image')).toBeVisible();
});

test('features section displays all feature cards', async ({ page }) => {
  await setupCleanTest(page);
  await expect(page.getByRole('heading', { name: /everything you need to grow/i })).toBeVisible();
  const features = [
    'Plant Encyclopedia',
    'Smart Watering',
    'Photo Collections',
    'Care Reminders',
    'Growth Tracking',
    'Plant Community',
  ];
  for (const feature of features) {
    await expect(page.getByRole('heading', { name: feature })).toBeVisible();
  }
});

test('plant catalog preview displays section and view all plants button', async ({ page }) => {
  await setupCleanTest(page);
  await expect(page.getByRole('heading', { name: /find your next green companion/i })).toBeVisible();
  const viewAll = page.getByRole('button', { name: /view all plants/i });
  await expect(viewAll).toBeVisible();
  // At least one plant card
  await expect(page.locator('[data-testid="plant-card"]').first()).toBeVisible();
});

test('footer displays site info', async ({ page }) => {
  await setupCleanTest(page);
  await expect(page.getByRole('heading', { name: /sprouthub/i })).toBeVisible();
  await expect(page.getByText(/your personal plant care assistant/i)).toBeVisible();
  await expect(page.getByText(/© 2025 sprouthub/i)).toBeVisible();
}); 