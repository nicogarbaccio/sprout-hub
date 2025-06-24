import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setupCleanTest, ensureLoggedOut } from './test-utils';

test('auth page loads and displays correct info', async ({ page }) => {
  // Ensure clean state before test
  await setupCleanTest(page);
  
  await expect(page).toHaveTitle('SproutHub');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByTestId('sign-in-trigger')).toBeVisible();
  await expect(page.getByTestId('sign-up-trigger')).toBeVisible();
  await expect(page.getByTestId('sign-in-email')).toBeVisible();
  await expect(page.getByTestId('sign-in-password')).toBeVisible();
});

test('sign in with valid credentials', async ({ page }) => {
  // Ensure clean state before test
  await setupCleanTest(page);
  
  await page.getByRole('button', { name: 'Sign In' }).click();
  if (!process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
    throw new Error('Missing TEST_EMAIL or TEST_PASSWORD in environment variables');
  }
  await page.getByTestId('sign-in-email').fill(process.env.TEST_EMAIL);
  await page.getByTestId('sign-in-password').fill(process.env.TEST_PASSWORD);
  await page.getByTestId('sign-in-button').click();
  // Wait for the page to leave /auth after successful sign in
  await expect(page).not.toHaveURL('/auth');
});

test('invalid credentials get rejected', async ({ page }) => {
  // Ensure clean state before test
  await setupCleanTest(page);
  
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('sign-in-email').fill('invalid@example.com');
  await page.getByTestId('sign-in-password').fill('wrongpassword');
  await page.getByTestId('sign-in-button').click();
  // Expect the unique error toast to appear
  await expect(page.getByTestId('sign-in-error-toast')).toBeVisible();
});

