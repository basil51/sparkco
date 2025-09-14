'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  // Replace with your actual Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-S8DQJ18H3H' // Your GA4 ID

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

          // Enhanced event tracking
          document.addEventListener('DOMContentLoaded', function() {
            // Track contact form submissions
            const contactForm = document.querySelector('form');
            if (contactForm) {
              contactForm.addEventListener('submit', function() {
                gtag('event', 'form_submit', {
                  event_category: 'Contact',
                  event_label: 'Contact Form Submission',
                  custom_parameter_1: 'lead_generation'
                });
              });
            }

            // Track button clicks
            const trackButtonClick = function(buttonText, buttonLocation) {
              gtag('event', 'click', {
                event_category: 'Button',
                event_label: buttonText,
                custom_parameter_1: buttonLocation
              });
            };

            // Track hero buttons
            const startProjectBtn = document.querySelector('button');
            if (startProjectBtn && startProjectBtn.textContent.includes('Start Your Project')) {
              startProjectBtn.addEventListener('click', function() {
                trackButtonClick('Start Your Project', 'hero_section');
              });
            }

            // Track product link clicks
            const productLinks = document.querySelectorAll('a[href*="sparkco.vip"], a[href*="eduvibe.vip"]');
            productLinks.forEach(function(link) {
              link.addEventListener('click', function() {
                gtag('event', 'click', {
                  event_category: 'Product',
                  event_label: this.href,
                  custom_parameter_1: 'external_link'
                });
              });
            });

            // Track time on page
            let startTime = Date.now();
            window.addEventListener('beforeunload', function() {
              const timeSpent = Math.round((Date.now() - startTime) / 1000);
              gtag('event', 'timing_complete', {
                name: 'page_view_time',
                value: timeSpent,
                event_category: 'engagement'
              });
            });

            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', function() {
              const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                gtag('event', 'scroll', {
                  event_category: 'engagement',
                  event_label: scrollPercent + '%_scroll',
                  value: scrollPercent
                });
              }
            });
          });
        `}
      </Script>
    </>
  )
}
