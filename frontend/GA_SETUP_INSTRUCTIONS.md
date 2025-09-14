# Google Analytics 4 Setup Instructions

## 🚀 Quick Setup

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Create a new GA4 property** for your website
3. **Get your Measurement ID** (starts with G-XXXXXXXXXX)
4. **Update your environment variables**

## 📝 Environment Setup

### 1. Update .env.local
Replace the placeholder GA ID with your actual Measurement ID:

```bash
# Replace this line in .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Your actual GA4 ID
```

### 2. Restart your development server
```bash
cd frontend
pnpm dev
```

## 📊 What We're Tracking

### ✅ Already Implemented:
- ✅ Page views
- ✅ Contact form submissions
- ✅ Button clicks (hero buttons)
- ✅ Product link clicks
- ✅ Time on page
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Navigation clicks

### 🎯 Conversion Goals:
- Contact form submissions (lead generation)
- Product page visits
- External link clicks to products

## 🔧 Testing Analytics

### 1. Real-time View
- Go to Google Analytics → Real-time → Overview
- Visit your website and watch events appear

### 2. Debug Mode
- Open browser DevTools → Console
- Look for gtag events being fired
- Check Network tab for Google Analytics requests

### 3. Test Events
1. Visit homepage → Should see page_view
2. Scroll down → Should see scroll events at 25%, 50%, 75%
3. Click "Start Your Project" → Should see button click
4. Click "View Our Work" → Should see navigation click
5. Submit contact form → Should see form_submit event

## 📈 Google Analytics Dashboard

### Key Metrics to Monitor:
1. **Users & Sessions** - Traffic growth
2. **Bounce Rate** - Page engagement
3. **Conversion Rate** - Contact form submissions
4. **Top Pages** - Most visited pages
5. **Traffic Sources** - Where visitors come from
6. **Device/Mobile** - Responsive design performance

## 🎯 Goals & Conversions

### Recommended Goals to Set Up:
1. **Contact Form Submissions** - Primary conversion
2. **Product Page Visits** - Product interest
3. **Time on Site** - Engagement quality
4. **External Link Clicks** - Product discovery

## 🔍 Troubleshooting

### If analytics aren't working:
1. Check browser console for JavaScript errors
2. Verify GA Measurement ID is correct
3. Check if ad blockers are interfering
4. Ensure cookies are enabled
5. Wait 24-48 hours for data to appear in GA

### Common Issues:
- **GA ID format**: Must start with G- and be 10+ characters
- **Environment variables**: Must be NEXT_PUBLIC_ prefixed
- **Development mode**: Some events may not fire in dev mode

## 📞 Support

If you need help with GA4 setup:
- Google Analytics Help: https://support.google.com/analytics
- GA4 Documentation: https://developers.google.com/analytics/devguides/collection/ga4
