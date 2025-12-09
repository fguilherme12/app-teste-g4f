import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    env: {
      SEED_USER_EMAIL: process.env.SEED_USER_EMAIL || 'admin@test.com',
      SEED_USER_PASSWORD: process.env.SEED_USER_PASSWORD || 'admin123',
    },
    setupNodeEvents() {
    },
  },
});

