// Matomo analytics initialization for Astro site
// This script runs on the client side after the page loads

function initMatomo() {
  const matomoUrl = process.env.NUXT_PUBLIC_MATOMO_URL;
  const matomoSiteId = process.env.NUXT_PUBLIC_MATOMO_SITE_ID;
  
  if (!matomoUrl || !matomoSiteId) {
    console.log('Matomo not configured');
    return;
  }
  
  // Initialize the _paq array
  window._paq = window._paq || [];
  
  // Matomo configuration
  window._paq.push(['setTrackerUrl', `${matomoUrl}matomo.php`]);
  window._paq.push(['setSiteId', matomoSiteId]);
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
  
  // Load Matomo script
  const script = document.createElement('script');
  script.innerHTML = `
    var u = '${matomoUrl}';
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '${matomoSiteId}']);
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
  `;
  script.type = 'text/javascript';
  script.async = true;
  
  // Add script to document
  document.head.appendChild(script);
}

// Initialize Matomo when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMatomo);
} else {
  initMatomo();
}

// Track page changes for client-side navigation
function trackPathChange() {
  const matomoUrl = process.env.NUXT_PUBLIC_MATOMO_URL;
  const matomoSiteId = process.env.NUXT_PUBLIC_MATOMO_SITE_ID;
  
  if (!matomoUrl || !matomoSiteId || !window._paq) return;
  
  // Track the new page
  window._paq.push(['setCustomUrl', `${matomoUrl}${window.location.pathname}${window.location.search}`]);
  window._paq.push(['trackPageView']);
}

// Listen for hash changes (used by Astro's router)
window.addEventListener('hashchange', trackPathChange);

// Listen for popstate events (back/forward navigation)
window.addEventListener('popstate', trackPathChange);