import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: true,

  retries: 2,

  workers: '75%',

  timeout: 60 * 1000,

  expect: {
    timeout: 10 * 1000
  },

  reporter: [

    ['dot'],

    ['html', {
      outputFolder: 'playwright-report'
    }],

    ['junit', {
      outputFile: 'test-results/results.xml'
    }]

  ],

  use: {

    baseURL: process.env.BASE_URL,

    headless: true,

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    ignoreHTTPSErrors: false,

    actionTimeout: 10000,

    navigationTimeout: 30000,

    viewport: {
      width: 1440,
      height: 900
    },

    locale: 'en-US',

    timezoneId: 'UTC'

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
    },

    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari']
      }
    }

  ]

});