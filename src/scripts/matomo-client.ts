// Client-side Matomo analytics for Astro
// Vite processes this module, replacing import.meta.env.PUBLIC_*

function initMatomo(): void {
  const matomoUrl = (import.meta.env.PUBLIC_MATOMO_URL || '').replace(/\/+$/, '') + '/';
  const matomoSiteId = import.meta.env.PUBLIC_MATOMO_SITE_ID || '';

  if (!matomoUrl || !matomoSiteId) {
    console.log('Matomo analytics not configured for Astro site');
    return;
  }

  window._paq = window._paq || [];

  window._paq.push(['setTrackerUrl', `${matomoUrl}matomo.php`]);
  window._paq.push(['setSiteId', matomoSiteId]);
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);

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
  document.head.appendChild(script);
}

function trackPathChange(): void {
  const matomoUrl = (import.meta.env.PUBLIC_MATOMO_URL || '').replace(/\/+$/, '') + '/';
  const matomoSiteId = import.meta.env.PUBLIC_MATOMO_SITE_ID || '';

  if (!matomoUrl || !matomoSiteId || !window._paq) return;

  window._paq.push(['setCustomUrl', `${matomoUrl}${window.location.pathname}${window.location.search}`]);
  window._paq.push(['trackPageView']);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMatomo);
} else {
  initMatomo();
}

window.addEventListener('hashchange', trackPathChange);
window.addEventListener('popstate', trackPathChange);
