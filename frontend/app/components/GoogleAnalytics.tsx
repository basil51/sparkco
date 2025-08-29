'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  // Replace with your actual Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = 'G-S8DQJ18H3H' // Your GA4 ID

  return (
    <>
      {/* Google Analytics 4 Tracking Code */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      
      {/* Google Analytics 4 Event Tracking */}
      <Script id="ga-events" strategy="afterInteractive">
        {`
          // Track page views
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          });

          // Track contact form submissions
          document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.querySelector('form');
            if (contactForm) {
              contactForm.addEventListener('submit', function() {
                gtag('event', 'form_submit', {
                  event_category: 'Contact',
                  event_label: 'Contact Form Submission'
                });
              });
            }
          });
        `}
      </Script>
    </>
  )
}
