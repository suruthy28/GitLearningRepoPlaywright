const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/LoginPage');
const logger = require('../../utils/logger');
const faker = require('faker');

// Initialize page object
let loginPage;

Given('I am on the login page', async function () {
  try {
    loginPage = new LoginPage(this.page);
    await loginPage.navigateToLoginPage();
    logger.info('Navigated to login page successfully');
  } catch (error) {
    logger.error(`Failed to navigate to login page: ${error.message}`);
    throw error;
  }
});

When('I enter valid username and password', async function () {
  try {
    const username = process.env.VALID_USERNAME;
    const password = process.env.VALID_PASSWORD;
    await loginPage.login(username, password);
    logger.info(`Entered valid credentials`);
  } catch (error) {
    logger.error(`Failed to enter valid credentials: ${error.message}`);
    throw error;
  }
});

When('I enter invalid username and password', async function () {
  try {
    const username = process.env.INVALID_USERNAME;
    const password = process.env.INVALID_PASSWORD;
    await loginPage.login(username, password);
    logger.info(`Entered invalid credentials`);
  } catch (error) {
    logger.error(`Failed to enter invalid credentials: ${error.message}`);
    throw error;
  }
});


When('I click the login button', async function () {
  try {
    // Login button is clicked in login() method, this is for clarity
    logger.info('Login button clicked');
  } catch (error) {
    logger.error(`Failed to click login button: ${error.message}`);
    throw error;
  }
});

Then('I should be logged in successfully', async function () {
  try {
    // Add verification logic here
    const currentUrl = this.page.url();
    logger.info(`Current URL after login: ${currentUrl}`);
    // You can add assertions here
  } catch (error) {
    logger.error(`Login verification failed: ${error.message}`);
    throw error;
  }
});

Then('I should see an error message', async function () {
  try {
    const errorMessage = await loginPage.getErrorMessage();
    logger.info(`Error message displayed: ${errorMessage}`);
    // Add assertion to verify error message
  } catch (error) {
    logger.error(`Failed to verify error message: ${error.message}`);
    throw error;
  }
});