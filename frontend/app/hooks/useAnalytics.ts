'use client'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
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
      window.gtag('config', 'G-S8DQJ18H3H', {
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

  return {
    trackEvent,
    trackPageView,
    trackContactForm,
    trackServiceClick,
    trackProductClick,
    trackNavigation
  }
}
