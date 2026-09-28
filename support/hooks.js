const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const logger = require('../utils/logger');
const Helper = require('../utils/helper');

// Global browser and page objects
let browser;
let page;

BeforeAll(async function () {
  try {
    logger.info('Launching browser...');
    browser = await chromium.launch({
      headless: process.env.HEADLESS === 'true',
      slowMo: 100, // Slow down actions for better visibility
    });
    logger.info('Browser launched successfully');
  } catch (error) {
    logger.error(`Failed to launch browser: ${error.message}`);
    throw error;
  }
});

AfterAll(async function () {
  try {
    if (browser) {
      await browser.close();
      logger.info('Browser closed successfully');
    }
  } catch (error) {
    logger.error(`Failed to close browser: ${error.message}`);
  }
});

Before(async function ({ pickle }) {
  try {
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page; // Make page available to step definitions
    logger.info(`Starting scenario: ${pickle.name}`);
  } catch (error) {
    logger.error(`Failed to setup scenario: ${error.message}`);
    throw error;
  }
});

After(async function ({ pickle, result }) {
  try {
    // Take screenshot if scenario failed
    if (result.status === 'FAILED') {
      logger.error(`Scenario failed: ${pickle.name}`);
      await Helper.takeScreenshot(page, `failed_${pickle.name.replace(/\s+/g, '_')}`);
    } else {
      logger.info(`Scenario passed: ${pickle.name}`);
    }
    
    await page.close();
  } catch (error) {
    logger.error(`Error in After hook: ${error.message}`);
  }
});