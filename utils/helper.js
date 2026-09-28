const logger = require('./logger');

class Helper {
  /**
   * Wait for a specified time
   * @param {number} ms - Time to wait in milliseconds
   */
  static async wait(ms) {
    try {
      await new Promise(resolve => setTimeout(resolve, ms));
      logger.info(`Waited for ${ms}ms`);
    } catch (error) {
      logger.error(`Error during wait: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate random number
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get current timestamp
   * @returns {string} Current timestamp
   */
  static getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Take screenshot with timestamp
   * @param {object} page - Playwright page object
   * @param {string} name - Screenshot name
   * @returns {string} Screenshot path
   */
  static async takeScreenshot(page, name) {
    try {
      const timestamp = this.getTimestamp();
      const screenshotPath = `./screenshots/${name}_${timestamp}.png`;
      await page.screenshot({ path: screenshotPath });
      logger.info(`Screenshot saved: ${screenshotPath}`);
      return screenshotPath;
    } catch (error) {
      logger.error(`Error taking screenshot: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retry function with specified attempts
   * @param {function} fn - Function to retry
   * @param {number} attempts - Number of attempts
   * @param {number} delay - Delay between attempts in ms
   */
  static async retry(fn, attempts = 3, delay = 1000) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === attempts - 1) throw error;
        logger.warn(`Attempt ${i + 1} failed, retrying...`);
        await this.wait(delay);
      }
    }
  }
}

module.exports = Helper;