const BasePage = require('./BasePage');
const Locators = require('./Locators');
const logger = require('../utils/logger');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Login with username and password
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    try {
      await this.fill(Locators.loginPage.usernameInput, username);
      await this.click(Locators.loginPage.login);
      await this.fill(Locators.loginPage.passwordInput, password);
      await this.click(Locators.loginPage.loginButton);
      logger.info(`Logged in with username: ${username}`);
    } catch (error) {
      logger.error(`Login failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get error message
   * @returns {string} Error message text
   */
  async getErrorMessage() {
    try {
      return await this.getText(Locators.loginPage.errorMessage);
    } catch (error) {
      logger.error(`Failed to get error messages: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if login button is visible
   * @returns {boolean} True if visible
   */
  async isLoginButtonVisible() {
    try {
      return await this.isElementVisible(Locators.loginPage.loginButton);
    } catch (error) {
      logger.error(`Failed to check login button visibility: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage() {
    try {
      await this.navigate(process.env.LOGIN_URL);
      logger.info('Navigated to login page');
    } catch (error) {
      logger.error(`Failed to navigate to login page: ${error.message}`);
      throw error;
    }
  }
}

module.exports = LoginPage;