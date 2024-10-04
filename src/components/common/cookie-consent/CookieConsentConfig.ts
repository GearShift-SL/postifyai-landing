import type { CookieConsentConfig } from 'vanilla-cookieconsent'

// Extend the Window interface to include the dataLayer object
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>
    gtag: (command: string, ...args: unknown[]) => void
  }
}

export const config: CookieConsentConfig = {
  root: '#cc-container',
  disablePageInteraction: false,
  guiOptions: {
    consentModal: {
      layout: 'bar inline',
      position: 'bottom center',
      equalWeightButtons: false,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false
    }
  },
  categories: {
    necessary: {
      readOnly: true
    },
    analytics: {
      enabled: true,
      services: {
        ga: {
          label: 'Google Analytics',
          onAccept: () => {
            console.log('ga4 granted')

            // Grant consent to the Google Analytics service
            window.gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            })
          },
          onReject: () => {
            // Don't enable Google Analytics
            console.log('ga4 rejected')
          },
          // Array of cookies to erase when the service is disabled/rejected
          cookies: [
            {
              name: /^(_ga|_gid)/
            }
          ]
        }
      }
    }
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "Hello traveler, it's cookie time!",
          description:
            'We use cookies primarily for analytics to enhance your experience. By accepting, you agree to our use of these cookies. You can manage your preferences or learn more about our cookie policy.',
          acceptAllBtn: 'Accept all',
          // acceptNecessaryBtn: "Only necessary",
          showPreferencesBtn: 'Manage preferences',
          footer:
            '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>'
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Understanding Cookies',
              description:
                'Cookies are small data files used to store information on your device. They help us improve our site and your experience.'
            },
            {
              title:
                'Essential Cookies <span class="pm__badge">Always Active</span>',
              description:
                "These cookies are essential for the operation of our site. They don't collect personal data and are necessary for features like accessing secure areas.",
              linkedCategory: 'necessary'
            },
            {
              title: 'Analytics Cookies',
              description:
                'We use analytics cookies to understand how visitors interact with our website. This helps us to improve the user experience and the services we offer.',
              linkedCategory: 'analytics'
            },
            {
              title: 'More Information',
              description:
                'For more details about our cookie practices, please visit our <a class="cc__link" href="/privacy-policy">Privacy Policy</a> page.'
            }
          ]
        }
      }
    }
  }
}
