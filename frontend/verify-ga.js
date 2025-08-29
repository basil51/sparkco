// Script to verify Google Analytics is working
// Run this in the browser console on your website

console.log('🔍 Checking Google Analytics setup...');

// Check if gtag is loaded
if (typeof window.gtag === 'function') {
  console.log('✅ Google Analytics gtag function is available');
  
  // Check if dataLayer exists
  if (window.dataLayer) {
    console.log('✅ Data layer is available');
    console.log('📊 Current dataLayer:', window.dataLayer);
  } else {
    console.log('❌ Data layer is not available');
  }
  
  // Test sending an event
  try {
    window.gtag('event', 'test_event', {
      event_category: 'Test',
      event_label: 'GA Verification'
    });
    console.log('✅ Test event sent successfully');
  } catch (error) {
    console.log('❌ Failed to send test event:', error);
  }
  
} else {
  console.log('❌ Google Analytics gtag function is not available');
  console.log('🔧 Please check your GA4 setup');
}

// Check for GA4 measurement ID
const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
if (scripts.length > 0) {
  console.log('✅ Google Tag Manager script found');
  scripts.forEach((script, index) => {
    console.log(`📜 Script ${index + 1}:`, script.src);
  });
} else {
  console.log('❌ Google Tag Manager script not found');
}

console.log('🔍 GA Verification complete');
