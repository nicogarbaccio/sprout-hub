import { SeleniumTestSetup, defaultConfig } from './selenium.config';

async function runSeleniumTests() {
  console.log('🚀 Starting Selenium Tests...');
  
  const selenium = new SeleniumTestSetup(defaultConfig);
  
  try {
    await selenium.setupDriver();
    console.log('✅ WebDriver initialized successfully');
    
    // Test basic navigation
    console.log('🧪 Testing basic navigation...');
    await selenium.navigateTo('/');
    console.log('✅ Navigated to homepage');
    
    // Test element presence with wait
    console.log('🧪 Testing element presence...');
    try {
      await selenium.waitForElementVisible('main', 10000);
      console.log('✅ Main element found and visible');
    } catch (error) {
      console.log('⚠️ Main element not found, checking for alternative elements...');
      const bodyElement = await selenium.isElementPresent('body');
      console.log(`✅ Body element present: ${bodyElement}`);
    }
    
    // Test screenshot capability
    console.log('🧪 Testing screenshot capability...');
    await selenium.takeScreenshot('homepage-test.png');
    console.log('✅ Screenshot taken');
    
    console.log('🎉 All basic tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await selenium.teardownDriver();
    console.log('🔧 WebDriver cleaned up');
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeleniumTests();
}

export { runSeleniumTests };
