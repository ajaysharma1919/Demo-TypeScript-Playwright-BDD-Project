# Playwright TypeScript BDD Test Automation Framework

This repository contains a robust, scalable, and enterprise-grade UI test automation framework built to validate the [Demo Web Shop](https://demowebshop.tricentis.com/) application. 

It transitions traditional Java/Cucumber BDD practices into a modern, lightning-fast Node.js ecosystem using **Playwright**, **TypeScript**, and **playwright-bdd**.

## 🚀 Tech Stack & Core Engine
* **Core Engine:** [Playwright](https://playwright.dev/)
* **Language:** TypeScript
* **Behavior Driven Development (BDD):** Cucumber (via `playwright-bdd`)
* **Design Pattern:** Page Object Model (POM)
* **CI/CD & Reporting:** GitHub Actions & GitHub Pages

## 🏗️ Framework Architecture
The framework is designed with modularity, maintainability, and enterprise scalability in mind. It separates test intent (Behavior) from test implementation (Code).

* **BDD Layer (`src/features`):** Contains Gherkin `.feature` files written in plain business English. This layer acts as the single source of truth for test scenarios.
* **Step Definition Layer (`src/steps`):** Bridges the Gherkin steps to the underlying page interactions using TypeScript. It intercepts dynamic test data (like `[VALID_EMAIL]`) before execution.
* **Page Object Model Layer (`src/pages`):** Encapsulates DOM elements and page-specific interactions. By isolating locators (like `.header-links a.account`) here, UI changes only require updates in one centralized place, drastically minimizing test maintenance.
* **Playwright-BDD Compiler:** At runtime, the `playwright-bdd` engine automatically compiles the `.feature` files and step definitions into native Playwright `.spec.js` files inside the hidden `.features-gen` folder. This eliminates the sluggishness of traditional Cucumber wrappers and allows tests to run at native Playwright speeds.

## 📂 Project Structure
    ├── .github/workflows/    # CI/CD pipeline configurations
    ├── src/
    │   ├── features/         # BDD Gherkin feature files (.feature)
    │   ├── pages/            # Page Object Model (POM) classes
    │   └── steps/            # Cucumber step definitions
    ├── .env                  # Local environment variables (Git Ignored)
    ├── playwright.config.ts  # Global Playwright and BDD configuration
    └── package.json          # Node dependencies and execution scripts

## 💻 Local Setup & Execution for a New Machine

Follow these step-by-step instructions to configure and execute this framework on a completely new machine.

### Prerequisites
1. **Install Node.js:** Ensure you have Node.js version 20 or higher installed. You can download it from [nodejs.org](https://nodejs.org/).
2. **Install Git:** Download and install [Git](https://git-scm.com/).
3. **IDE:** Download and install [Visual Studio Code](https://code.visualstudio.com/) (recommended).

### Step 1: Clone the Repository
Open your terminal (or VS Code terminal) and clone the repository to your local machine:
    
    git clone <your-repository-url>
    cd <your-repository-folder-name>

### Step 2: Install Dependencies and Browsers
Install the necessary Node modules and Playwright-specific browser binaries:

    npm install
    npx playwright install --with-deps

### Step 3: Configure Environment Variables
To ensure secure credential management, create a file named exactly `.env` at the root of the project (at the same level as `package.json`). Add your Demo Web Shop test credentials to this file:

    USER_EMAIL=your_test_email@example.com
    USER_PASSWORD=your_test_password

*(Note: This `.env` file is included in `.gitignore` and will never be pushed to the repository).*

### Step 4: Execute the Tests
The framework utilizes custom NPM scripts for automated BDD compilation and execution.

* **Run tests in Headless mode (Standard for CI/CD):**
      npm run test
* **Run tests in Headed mode (Opens the browser for local debugging):**
      npm run test:headed

## 📊 Test Execution Reports

### Local Reporting
Every test run automatically generates a rich, interactive HTML report using Playwright's native reporter. To view the report on your local machine after a test run, execute:

    npm run report

This will automatically start a local server and open the `playwright-report/index.html` file in your default browser, displaying detailed execution logs, passed/failed statuses, and granular step execution times.

### Cloud Reporting (CI/CD)
The framework is fully integrated with GitHub Actions. On every push to the `main` branch or scheduled nightly run, the tests execute in the cloud.
* **Pipeline Status:** Navigate to the **Actions** tab in the GitHub repository to view live CI/CD pipeline execution.
* **Live HTML Report:** Upon completion, the pipeline automatically deploys the Playwright HTML report to GitHub Pages. You can access the live, publicly viewable report via the repository's GitHub Pages URL (configurable under Repository Settings > Pages).
* **Trace Viewer (Debugging):** For any failed test, a full time-travel trace artifact is securely retained. It captures network logs and a DOM snapshot and can be downloaded directly from the GitHub Actions run summary for deep debugging.