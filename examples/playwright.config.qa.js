import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? '50%' : 2,

  timeout: 45 * 1000,

  expect: {
    timeout: 10 * 1000
  },

  reporter: [
    ['list'],
    ['html'],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  use: {

    baseURL: process.env.BASE_URL,

    headless: true,

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    ignoreHTTPSErrors: true,

    actionTimeout: 10000,

    navigationTimeout: 30000,

    viewport: {
      width: 1440,
      height: 900
    }

  },

  projects: [

    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }

  ]

});