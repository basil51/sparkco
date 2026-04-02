// Test script for email connection (local dev: POST /api/contact/test-email)
const base = process.env.API_URL || 'http://localhost:4000';
const secret = process.env.EMAIL_TEST_SECRET;

const testEmailConnection = async () => {
  try {
    console.log('🧪 Testing Email Connection...');
    const headers = {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-email-test-secret': secret } : {}),
    };

    const response = await fetch(`${base.replace(/\/$/, '')}/api/contact/test-email`, {
      method: 'POST',
      headers,
    });

    const result = await response.json();
    
    console.log('📧 Email Connection Response:', result);
    
    if (result.success) {
      console.log('✅ Email connection test completed!');
      console.log('📧 Connection status:', result.connected ? 'Connected' : 'Failed');
    } else {
      console.log('❌ Email connection test failed:', result.message);
    }
  } catch (error) {
    console.log('❌ Error testing email connection:', error.message);
  }
};

// Run the test
testEmailConnection();
