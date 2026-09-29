const logger = require('../utils/logger');
const Helper = require('../utils/helper');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - URL to navigate to
   */
  async navigate(url) {
    try {
      await this.page.goto(process.env.BASE_URL);
      logger.info(`Navigated to: ${url}`);
    } catch (error) {
      logger.error(`Failed to navigate to ${url}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    try {
      await this.page.click(selector);
      logger.info(`Clicked on element: ${selector}`);
    } catch (error) {
      logger.error(`Failed to click on ${selector}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Fill text into an input field
   * @param {string} selector - Element selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    try {
      await this.page.fill(selector, text);
      logger.info(`Filled ${selector} with: ${text}`);
    } catch (error) {
      logger.error(`Failed to fill ${selector}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get text from an element
   * @param {string} selector - Element selector
   * @returns {string} Element text
   */
  async getText(selector) {
    try {
      const text = await this.page.textContent(selector);
      logger.info(`Retrieved text from ${selector}: ${text}`);
      return text;
    } catch (error) {
      logger.error(`Failed to get text from ${selector}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
      logger.info(`Element ${selector} is visible`);
    } catch (error) {
      logger.error(`Element ${selector} not visible: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {boolean} True if visible
   */
  async isElementVisible(selector) {
    try {
      const isVisible = await this.page.isVisible(selector);
      logger.info(`Element ${selector} visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      logger.error(`Error checking visibility of ${selector}: ${error.message}`);
      return false;
    }
  }

  /**
   * Get page title
   * @returns {string} Page title
   */
  async getTitle() {
    try {
      const title = await this.page.title();
      logger.info(`Page title: ${title}`);
      return title;
    } catch (error) {
      logger.error(`Failed to get page title: ${error.message}`);
      throw error;
    }
  }
}

module.exports = BasePage;
