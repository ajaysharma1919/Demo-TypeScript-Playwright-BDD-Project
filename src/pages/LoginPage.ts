import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://demowebshop.tricentis.com/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('#Email').fill(email);
    await this.page.locator('#Password').fill(password);
    await this.page.locator('input.login-button').click();
  }

  async loginWithEnter(email: string, password: string) {
    await this.page.locator('#Email').fill(email);
    await this.page.locator('#Password').fill(password);
    // Simulate pressing the Enter key on the keyboard
    await this.page.locator('#Password').press('Enter');
  }

  async verifyPasswordIsMasked() {
    const passwordInput = this.page.locator('#Password');
    // Using soft assertion here
    await expect.soft(passwordInput).toHaveAttribute('type', 'password');
  }

  async verifyRememberMeCheckbox() {
    const rememberMe = this.page.locator('#RememberMe');
    // Using soft assertions here
    await expect.soft(rememberMe).toBeVisible();
    await expect.soft(rememberMe).not.toBeChecked();
  }

  async verifyForgotPasswordLink() {
    const forgotPassword = this.page.locator('a[href="/passwordrecovery"]');
    // Using soft assertion here
    await expect.soft(forgotPassword).toBeVisible();
  }

  async verifyErrorMessage(expectedText: string) {
    // getByText handles both top-level summary errors and field-level validation errors seamlessly
    const errorMsg = this.page.getByText(expectedText);
    await expect(errorMsg).toBeVisible();
  }

  async verifySuccessfulLogin(email: string) {
    // Using a robust, unique CSS selector targeting the header explicitly
    const accountLink = this.page.locator('.header-links a.account');
    await expect(accountLink).toHaveText(email);
  }
}