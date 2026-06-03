(function () {
  const STORAGE_KEY = 'geoEstateAnalytics.v1';
  const SESSION_KEY = 'geoEstateSession.v1';
  const ENDPOINT = window.GEO_ANALYTICS_ENDPOINT || '';
  const startedAt = Date.now();
  const sessionId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { events: [] };
    } catch {
      return { events: [] };
    }
  }

  function writeStore(store) {
    const events = store.events.slice(-1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ events }));
  }

  function safeText(value) {
    return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 180);
  }

  function sendToEndpoint(event) {
    if (!ENDPOINT) return;
    const payload = JSON.stringify(event);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
      return;
    }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(() => {});
  }

  function track(type, data = {}) {
    const event = {
      type,
      data,
      sessionId,
      path: location.pathname,
      hash: location.hash,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    const store = readStore();
    store.events.push(event);
    writeStore(store);
    sendToEndpoint(event);
  }

  function updateSessionDuration() {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      sessionId,
      startedAt,
      updatedAt: Date.now(),
      seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000))
    }));
  }

  window.geoAnalytics = {
    track,
    read: readStore,
    clear() {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    },
    export() {
      return JSON.stringify(readStore(), null, 2);
    }
  };

  track('page_view', {
    title: document.title,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language || ''
  });

  setInterval(updateSessionDuration, 5000);
  updateSessionDuration();

  window.addEventListener('hashchange', () => {
    track('section_jump', { hash: location.hash });
  });

  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    const button = event.target.closest('button');

    if (link) {
      const href = link.getAttribute('href') || '';
      let type = 'link_click';
      if (href.startsWith('tel:')) type = 'call_click';
      if (href.startsWith('sms:')) type = 'sms_click';
      track(type, { href, label: safeText(link.textContent) });
      return;
    }

    if (button) {
      const card = button.closest('.item-card');
      track('button_click', {
        label: safeText(button.textContent || button.getAttribute('aria-label')),
        item: card ? safeText(card.querySelector('h3')?.textContent) : ''
      });
    }
  });

  document.addEventListener('input', event => {
    if (event.target && event.target.id === 'search') {
      clearTimeout(window.__geoSearchTimer);
      window.__geoSearchTimer = setTimeout(() => {
        track('search', { query: safeText(event.target.value) });
      }, 650);
    }
  });

  document.addEventListener('change', event => {
    if (event.target && event.target.id === 'category') {
      track('category_filter', { category: safeText(event.target.value) });
    }
  });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        track('section_view', { section: entry.target.id || entry.target.className || entry.target.tagName });
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.45 });

  document.querySelectorAll('section[id], header[id]').forEach(section => observer.observe(section));

  window.addEventListener('pagehide', () => {
    updateSessionDuration();
    track('session_end', {
      seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000))
    });
  });
})();
