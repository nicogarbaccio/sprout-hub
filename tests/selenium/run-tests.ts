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
    
    // Test element presence
    console.log('🧪 Testing element presence...');
    const mainElement = await selenium.isElementPresent('main');
    console.log(`✅ Main element present: ${mainElement}`);
    
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
