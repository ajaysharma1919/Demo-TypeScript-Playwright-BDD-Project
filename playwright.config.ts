import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define where our BDD feature files and step definitions live
const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: 'src/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  // Automatically run tests in parallel (Handles what ThreadLocal did in Java)
  fullyParallel: true,
  // Generate a sleek HTML report
  reporter: 'html',
  
  use: {
    // Run headless by default for CI/CD, as requested by the recruiter
    headless: true,
    // Take screenshots automatically if a test fails
    screenshot: 'only-on-failure',
    // Record trace for easier debugging on failure
    trace: 'retain-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});