import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow user to sign up', async ({ page }) => {
    // Click the sign up button
    await page.getByRole('link', { name: /sign up/i }).click();
    
    // Fill in the sign up form
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/username/i).fill('testuser');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('Password123');
    await page.getByLabel(/confirm password/i).fill('Password123');
    
    // Submit the form
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Verify we're redirected to my-plants page
    await expect(page).toHaveURL('/my-plants');
  });

  test('should allow user to log in', async ({ page }) => {
    // Click the login button
    await page.getByRole('link', { name: /sign in/i }).click();
    
    // Fill in the login form
    await page.getByLabel(/username or email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('Password123');
    
    // Submit the form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Verify we're redirected to my-plants page
    await expect(page).toHaveURL('/my-plants');
  });

  test('should show error for invalid login', async ({ page }) => {
    await page.getByRole('link', { name: /sign in/i }).click();
    
    // Fill in with invalid credentials
    await page.getByLabel(/username or email/i).fill('wrong@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Verify error message is shown
    await expect(page.getByText(/invalid username\/email or password/i)).toBeVisible();
  });

  test('should show error for password mismatch during signup', async ({ page }) => {
    await page.getByRole('link', { name: /sign up/i }).click();
    
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/username/i).fill('testuser');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('Password123');
    await page.getByLabel(/confirm password/i).fill('Different123');
    
    await page.getByRole('button', { name: /create account/i }).click();
    
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });
}); 