// Simple test script for the contact API
const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    company: "Test Company",
    phone: "+1234567890",
    service: "Web Development",
    message: "This is a test message to verify the contact form API is working correctly."
  };

  try {
    console.log('🧪 Testing Contact Form API...');
    
    const response = await fetch('http://localhost:4000/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('📧 API Response:', result);
    
    if (result.success) {
      console.log('✅ Contact form API is working!');
    } else {
      console.log('❌ Contact form API failed:', result.message);
    }
  } catch (error) {
    console.log('❌ Error testing API:', error.message);
  }
};

// Run the test
testContactForm();
