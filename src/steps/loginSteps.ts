import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';

const { Given, When, Then } = createBdd();

Given('I am on the Demo Web Shop login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
});

When('I login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Securely pull credentials from .env file
  await loginPage.login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
});

Then('I should be logged in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifySuccessfulLogin(process.env.USER_EMAIL as string);
});

When('I attempt to login with email {string} and password {string}', async ({ page }, email, password) => {
  const loginPage = new LoginPage(page);
  
  // Intercept the placeholder and dynamically inject the secure .env email
  const finalEmail = email === '[VALID_EMAIL]' ? process.env.USER_EMAIL as string : email;
  
  await loginPage.login(finalEmail, password);
});

Then('I should see the error message {string}', async ({ page }, errorMessage) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyErrorMessage(errorMessage);
});

Then('the password field should be masked', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyPasswordIsMasked();
});

Then('the Remember Me checkbox should be present and unchecked', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyRememberMeCheckbox();
});

Then('the Forgot Password link should be visible', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyForgotPasswordLink();
});

When('I fill in valid credentials and press Enter', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginWithEnter(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
});