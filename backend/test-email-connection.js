// Test script for email connection
const testEmailConnection = async () => {
  try {
    console.log('🧪 Testing Email Connection...');
    
    const response = await fetch('http://localhost:4000/contact/test-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
