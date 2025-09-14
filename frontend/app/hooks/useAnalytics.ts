'use client'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export const useAnalytics = () => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      })
    }
  }

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-S8DQJ18H3H'
      window.gtag('config', GA_ID, {
        page_path: url
      })
    }
  }

  const trackContactForm = () => {
    trackEvent('form_submit', 'Contact', 'Contact Form Submission')
  }

  const trackServiceClick = (service: string) => {
    trackEvent('click', 'Services', service)
  }

  const trackProductClick = (product: string) => {
    trackEvent('click', 'Products', product)
  }

  const trackNavigation = (section: string) => {
    trackEvent('click', 'Navigation', section)
  }

  const trackButtonClick = (buttonText: string, location: string) => {
    trackEvent('click', 'Button', `${buttonText} - ${location}`)
  }

  const trackProductView = (productName: string) => {
    trackEvent('view_item', 'Product', productName)
  }

  const trackScrollDepth = (percentage: number) => {
    trackEvent('scroll', 'Engagement', `${percentage}%_scroll`, percentage)
  }

  const trackTimeOnPage = (seconds: number) => {
    trackEvent('timing_complete', 'Engagement', 'page_view_time', seconds)
  }

  return {
    trackEvent,
    trackPageView,
    trackContactForm,
    trackServiceClick,
    trackProductClick,
    trackNavigation,
    trackButtonClick,
    trackProductView,
    trackScrollDepth,
    trackTimeOnPage
  }
}
