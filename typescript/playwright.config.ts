import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({
    path: path.resolve(__dirname, '../resources/.env.qa')
});


export default defineConfig({

  testDir: './tests',

  /* Test execution */
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  /* Assertions */
  expect: {
    timeout: 5 * 1000,
  },

  /* Reports */
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  /* Artifacts */
  outputDir: 'test-results',

  use: {
    baseURL: process.env.BASE_URL ?? 'https://rahulshettyacademy.com/client',

    headless: true,

    viewport: {
      width: 1440,
      height: 900,
    },

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

});