import { test, expect } from './fixtures/auth';

test.describe('Protected Routes', () => {
  test('should access protected route when authenticated', async ({ authenticatedPage }) => {
    // Try to access a protected route
    await authenticatedPage.goto('/my-plants');
    
    // Verify we can access the page
    await expect(authenticatedPage).toHaveURL('/my-plants');
    await expect(authenticatedPage.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should redirect to signin when accessing protected route unauthenticated', async ({ page }) => {
    // Try to access a protected route without being logged in
    await page.goto('/my-plants');
    
    // Verify we're redirected to signin
    await expect(page).toHaveURL('/auth/signin');
  });

  test('should maintain session across page reloads', async ({ authenticatedPage }) => {
    // Access a protected route
    await authenticatedPage.goto('/my-plants');
    
    // Reload the page
    await authenticatedPage.reload();
    
    // Verify we're still on the protected route
    await expect(authenticatedPage).toHaveURL('/my-plants');
  });

  test('should access my-account page when authenticated', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/my-account');
    await expect(authenticatedPage).toHaveURL('/my-account');
    await expect(authenticatedPage.getByRole('heading', { level: 1, name: /my account/i })).toBeVisible();
  });
}); 