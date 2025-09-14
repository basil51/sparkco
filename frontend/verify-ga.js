// Google Analytics Verification Script
// Run this in browser console to test GA4 implementation

console.log('🔍 Google Analytics Verification Starting...');

// Check if gtag is loaded
if (typeof gtag !== 'undefined') {
  console.log('✅ gtag function is available');
} else {
  console.log('❌ gtag function not found');
}

// Check GA4 configuration
if (window.dataLayer) {
  console.log('✅ DataLayer is initialized');
  console.log('📊 DataLayer events:', window.dataLayer);
} else {
  console.log('❌ DataLayer not found');
}

// Test event tracking
console.log('🧪 Testing event tracking...');
if (typeof gtag !== 'undefined') {
  gtag('event', 'test_event', {
    event_category: 'verification',
    event_label: 'manual_test',
    value: 1
  });
  console.log('✅ Test event sent');
}

// Check for GA script in DOM
const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
if (gaScript) {
  console.log('✅ GA4 script found in DOM');
  console.log('📋 GA Script src:', gaScript.src);
} else {
  console.log('❌ GA4 script not found in DOM');
}

console.log('🎯 Verification complete! Check Google Analytics Real-time events.');
