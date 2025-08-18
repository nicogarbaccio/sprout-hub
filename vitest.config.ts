import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'src/**/*.{test,spec}.ts',
      'src/**/*.{test,spec}.tsx',
      'src/**/__tests__/*.{test,spec}.ts',
      'src/**/__tests__/*.{test,spec}.tsx',
      'tests/selenium/**/*.{test,spec}.ts', // include Selenium tests
    ],
    exclude: [
      'node_modules',
      'dist',
      'tests/playwright/**', // exclude only Playwright E2E tests
    ],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage-unit',
    },
  },
});


