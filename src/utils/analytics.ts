// Matomo analytics for Astro site
const MATOMO_URL = import.meta.env.NUXT_PUBLIC_MATOMO_URL || ''
const MATOMO_SITE_ID = import.meta.env.NUXT_PUBLIC_MATOMO_SITE_ID || ''

export function trackPageView(path?: string) {
  if (!MATOMO_URL || !MATOMO_SITE_ID) return
  
  // @ts-ignore
  if (window._paq) {
    // @ts-ignore
    window._paq.push(['setCustomUrl', `${MATOMO_URL}${path || window.location.pathname}`])
    // @ts-ignore
    window._paq.push(['trackPageView'])
  }
}

export function trackEvent(category: string, action: string, name?: string, value?: number) {
  if (!MATOMO_URL || !MATOMO_SITE_ID) return
  
  // @ts-ignore
  if (window._paq) {
    // @ts-ignore
    window._paq.push(['trackEvent', category, action, name || '', value || 0])
  }
}

export function initializeMatomo() {
  if (!MATOMO_URL || !MATOMO_SITE_ID) return
  
  // @ts-ignore
  window._paq = window._paq || []
  
  // Initialize Matomo
  const script = document.createElement('script')
  script.innerHTML = `
    var u = '${MATOMO_URL}';
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    
    (function() {
      var d = document;
      var g = d.createElement('script');
      var s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript';
      g.async = true;
      g.src = u + 'matomo.js';
      s.parentNode.insertBefore(g, s);
    })();
  `
  script.type = 'text/javascript'
  script.async = true
  document.head.appendChild(script)
}

export function isMatomoEnabled() {
  return !!(MATOMO_URL && MATOMO_SITE_ID)
}
