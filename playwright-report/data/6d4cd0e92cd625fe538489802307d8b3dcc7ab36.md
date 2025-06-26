# Test info

- Name: sign in with valid credentials
- Location: /Users/nicogarbaccio/Development/code/Projects/sprouthub/tests/auth.spec.ts:17:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/
Call log:
  - navigating to "http://localhost:8080/", waiting until "load"

    at setupCleanTest (/Users/nicogarbaccio/Development/code/Projects/sprouthub/tests/test-utils.ts:69:14)
    at /Users/nicogarbaccio/Development/code/Projects/sprouthub/tests/auth.spec.ts:19:9
```

# Test source

```ts
   1 | import { Page } from '@playwright/test';
   2 |
   3 | /**
   4 |  * Clear all authentication-related storage to ensure test isolation
   5 |  */
   6 | export async function clearAuthState(page: Page) {
   7 |   // Clear localStorage - handle potential security errors
   8 |   await page.evaluate(() => {
   9 |     try {
   10 |       localStorage.clear();
   11 |     } catch (error) {
   12 |       // Ignore security errors when localStorage is not accessible
   13 |       console.log('Could not clear localStorage:', error);
   14 |     }
   15 |   });
   16 |
   17 |   // Clear sessionStorage - handle potential security errors
   18 |   await page.evaluate(() => {
   19 |     try {
   20 |       sessionStorage.clear();
   21 |     } catch (error) {
   22 |       // Ignore security errors when sessionStorage is not accessible
   23 |       console.log('Could not clear sessionStorage:', error);
   24 |     }
   25 |   });
   26 |
   27 |   // Clear all cookies
   28 |   const context = page.context();
   29 |   await context.clearCookies();
   30 |
   31 |   // Clear IndexedDB (Supabase might use this for auth) - handle potential security errors
   32 |   await page.evaluate(() => {
   33 |     try {
   34 |       if (window.indexedDB) {
   35 |         return new Promise<void>((resolve) => {
   36 |           // Get all database names and delete them
   37 |           if (window.indexedDB.databases) {
   38 |             window.indexedDB.databases().then((databases) => {
   39 |               const promises = databases.map((db) => {
   40 |                 if (db.name) {
   41 |                   return new Promise<void>((deleteResolve) => {
   42 |                     const deleteReq = window.indexedDB.deleteDatabase(db.name!);
   43 |                     deleteReq.onsuccess = () => deleteResolve();
   44 |                     deleteReq.onerror = () => deleteResolve();
   45 |                   });
   46 |                 }
   47 |                 return Promise.resolve();
   48 |               });
   49 |               Promise.all(promises).then(() => resolve());
   50 |             }).catch(() => resolve());
   51 |           } else {
   52 |             resolve();
   53 |           }
   54 |         });
   55 |       }
   56 |     } catch (error) {
   57 |       // Ignore errors when IndexedDB is not accessible
   58 |       console.log('Could not clear IndexedDB:', error);
   59 |     }
   60 |   });
   61 | }
   62 |
   63 | /**
   64 |  * Setup function to be called at the beginning of each test
   65 |  * to ensure clean state
   66 |  */
   67 | export async function setupCleanTest(page: Page) {
   68 |   // Navigate to home page to start fresh
>  69 |   await page.goto('/');
      |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/
   70 |   
   71 |   // Wait for the page to be fully loaded
   72 |   await page.waitForLoadState('networkidle');
   73 |   
   74 |   // Clear auth state after page loads to avoid security errors
   75 |   await clearAuthState(page);
   76 | }
   77 |
   78 | /**
   79 |  * Check if user is currently authenticated
   80 |  */
   81 | export async function isUserAuthenticated(page: Page): Promise<boolean> {
   82 |   try {
   83 |     // Check if we're on an authenticated page or if auth elements are present
   84 |     const isOnAuthPage = page.url().includes('/auth');
   85 |     const hasSignInButton = await page.getByRole('button', { name: 'Sign In' }).isVisible().catch(() => false);
   86 |     
   87 |     // If we're not on auth page and don't see sign in button, likely authenticated
   88 |     return !isOnAuthPage && !hasSignInButton;
   89 |   } catch (error) {
   90 |     return false;
   91 |   }
   92 | }
   93 |
   94 | /**
   95 |  * Ensure user is logged out - useful for tests that need to start unauthenticated
   96 |  */
   97 | export async function ensureLoggedOut(page: Page) {
   98 |   try {
   99 |     const isAuth = await isUserAuthenticated(page);
  100 |     
  101 |     if (isAuth) {
  102 |       // Try to find and click logout button
  103 |       try {
  104 |         // Look for profile/settings menu first
  105 |         const profileButton = page.getByTestId('profile-menu-trigger');
  106 |         if (await profileButton.isVisible()) {
  107 |           await profileButton.click();
  108 |           await page.getByTestId('logout-button').click();
  109 |         }
  110 |       } catch (error) {
  111 |         // If logout button not found, clear auth state manually
  112 |         await clearAuthState(page);
  113 |         await page.reload();
  114 |       }
  115 |     }
  116 |     
  117 |     // Wait for page to settle
  118 |     await page.waitForLoadState('networkidle');
  119 |   } catch (error) {
  120 |     // Clear auth state and reload as fallback
  121 |     await clearAuthState(page);
  122 |     await page.reload();
  123 |     await page.waitForLoadState('networkidle');
  124 |   }
  125 | } 
```