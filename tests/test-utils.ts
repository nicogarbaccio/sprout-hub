import { Page } from '@playwright/test';

/**
 * Clear all authentication-related storage to ensure test isolation
 */
export async function clearAuthState(page: Page) {
  // Clear localStorage - handle potential security errors
  await page.evaluate(() => {
    try {
      localStorage.clear();
    } catch (error) {
      // Ignore security errors when localStorage is not accessible
      console.log('Could not clear localStorage:', error);
    }
  });

  // Clear sessionStorage - handle potential security errors
  await page.evaluate(() => {
    try {
      sessionStorage.clear();
    } catch (error) {
      // Ignore security errors when sessionStorage is not accessible
      console.log('Could not clear sessionStorage:', error);
    }
  });

  // Clear all cookies
  const context = page.context();
  await context.clearCookies();

  // Clear IndexedDB (Supabase might use this for auth) - handle potential security errors
  await page.evaluate(() => {
    try {
      if (window.indexedDB) {
        return new Promise<void>((resolve) => {
          // Get all database names and delete them
          if (window.indexedDB.databases) {
            window.indexedDB.databases().then((databases) => {
              const promises = databases.map((db) => {
                if (db.name) {
                  return new Promise<void>((deleteResolve) => {
                    const deleteReq = window.indexedDB.deleteDatabase(db.name!);
                    deleteReq.onsuccess = () => deleteResolve();
                    deleteReq.onerror = () => deleteResolve();
                  });
                }
                return Promise.resolve();
              });
              Promise.all(promises).then(() => resolve());
            }).catch(() => resolve());
          } else {
            resolve();
          }
        });
      }
    } catch (error) {
      // Ignore errors when IndexedDB is not accessible
      console.log('Could not clear IndexedDB:', error);
    }
  });
}

/**
 * Setup function to be called at the beginning of each test
 * to ensure clean state
 */
export async function setupCleanTest(page: Page) {
  // Navigate to home page to start fresh
  await page.goto('/');
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Clear auth state after page loads to avoid security errors
  await clearAuthState(page);
}

/**
 * Check if user is currently authenticated
 */
export async function isUserAuthenticated(page: Page): Promise<boolean> {
  try {
    // Check if we're on an authenticated page or if auth elements are present
    const isOnAuthPage = page.url().includes('/auth');
    const hasSignInButton = await page.getByRole('button', { name: 'Sign In' }).isVisible().catch(() => false);
    
    // If we're not on auth page and don't see sign in button, likely authenticated
    return !isOnAuthPage && !hasSignInButton;
  } catch (error) {
    return false;
  }
}

/**
 * Ensure user is logged out - useful for tests that need to start unauthenticated
 */
export async function ensureLoggedOut(page: Page) {
  try {
    const isAuth = await isUserAuthenticated(page);
    
    if (isAuth) {
      // Try to find and click logout button
      try {
        // Look for profile/settings menu first
        const profileButton = page.getByTestId('profile-menu-trigger');
        if (await profileButton.isVisible()) {
          await profileButton.click();
          await page.getByTestId('logout-button').click();
        }
      } catch (error) {
        // If logout button not found, clear auth state manually
        await clearAuthState(page);
        await page.reload();
      }
    }
    
    // Wait for page to settle
    await page.waitForLoadState('networkidle');
  } catch (error) {
    // Clear auth state and reload as fallback
    await clearAuthState(page);
    await page.reload();
    await page.waitForLoadState('networkidle');
  }
} 