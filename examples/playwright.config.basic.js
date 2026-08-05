import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000
  },

  use: {

    browserName: 'chromium',

    headless: true,

    viewport: {
      width: 1280,
      height: 720
    },

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'

  },

  reporter: 'html'

});