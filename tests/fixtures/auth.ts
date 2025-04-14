import { test as base, Page } from '@playwright/test';
import { TestDB } from '../utils/test-db';

type AuthFixtures = {
  authenticatedPage: Page;
  testDB: TestDB;
};

export const test = base.extend<AuthFixtures>({
  testDB: async ({}, use) => {
    const testDB = TestDB.getInstance();
    await use(testDB);
  },

  authenticatedPage: async ({ page, testDB }, use) => {
    // Navigate to signin page
    await page.goto('/auth/signin');
    
    // Get test user from test database
    const testUser = testDB.getUserByEmail('test@example.com');
    if (!testUser) {
      throw new Error('Test user not found in test database');
    }
    
    // Fill in signin form
    await page.getByLabel(/username or email/i).fill(testUser.email);
    await page.getByLabel(/password/i).fill('Password123'); // We know this is the password from our test data
    
    // Submit form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for navigation to complete
    await page.waitForURL('/my-plants');
    
    // Use the authenticated page in the test
    await use(page);
  },
});

export { expect } from '@playwright/test'; 