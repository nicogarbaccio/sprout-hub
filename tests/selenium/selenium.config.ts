import { Builder, WebDriver, By, until, WebElement } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';

export interface SeleniumTestConfig {
  browser: 'chrome' | 'firefox';
  headless?: boolean;
  windowSize?: { width: number; height: number };
  baseUrl: string;
}

export class SeleniumTestSetup {
  public driver: WebDriver | null = null;
  private config: SeleniumTestConfig;

  constructor(config: SeleniumTestConfig) {
    this.config = config;
  }

  async setupDriver(): Promise<WebDriver> {
    if (this.driver) {
      return this.driver;
    }

    let builder = new Builder();

    if (this.config.browser === 'chrome') {
      const chromeOptions = new ChromeOptions();
      if (this.config.headless) {
        chromeOptions.addArguments('--headless');
      }
      if (this.config.windowSize) {
        chromeOptions.addArguments(`--window-size=${this.config.windowSize.width},${this.config.windowSize.height}`);
      }
      chromeOptions.addArguments('--no-sandbox');
      chromeOptions.addArguments('--disable-dev-shm-usage');
      builder = builder.forBrowser('chrome').setChromeOptions(chromeOptions);
    } else if (this.config.browser === 'firefox') {
      const firefoxOptions = new FirefoxOptions();
      if (this.config.headless) {
        firefoxOptions.addArguments('--headless');
      }
      if (this.config.windowSize) {
        firefoxOptions.addArguments(`--width=${this.config.windowSize.width}`);
        firefoxOptions.addArguments(`--height=${this.config.windowSize.height}`);
      }
      builder = builder.forBrowser('firefox').setFirefoxOptions(firefoxOptions);
    }

    this.driver = await builder.build();
    return this.driver;
  }

  async teardownDriver(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  async navigateTo(path: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    await this.driver.get(`${this.config.baseUrl}${path}`);
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<WebElement> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    return await this.driver.wait(until.elementLocated(By.css(selector)), timeout);
  }

  async waitForElementVisible(selector: string, timeout: number = 10000): Promise<WebElement> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    const element = await this.waitForElement(selector, timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async clickElement(selector: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    const element = await this.waitForElementVisible(selector);
    await element.click();
  }

  async typeText(selector: string, text: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    const element = await this.waitForElementVisible(selector);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(selector: string): Promise<string> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    const element = await this.waitForElementVisible(selector);
    return await element.getText();
  }

  async isElementPresent(selector: string): Promise<boolean> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    try {
      await this.driver.findElement(By.css(selector));
      return true;
    } catch {
      return false;
    }
  }

  async takeScreenshot(filename: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call setupDriver() first.');
    }
    const screenshot = await this.driver.takeScreenshot();
    // In a real setup, you'd want to save this to a file
    console.log(`Screenshot taken: ${filename}`);
  }
}

// Default configuration
export const defaultConfig: SeleniumTestConfig = {
  browser: 'chrome',
  headless: true,
  windowSize: { width: 1920, height: 1080 },
  baseUrl: 'http://localhost:8080' // Vite dev server actual port
};
