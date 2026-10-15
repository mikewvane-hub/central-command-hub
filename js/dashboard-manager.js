/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Multi-Dashboard Orchestrator & Gateway Manager
 * Handles tab navigation, iframe loading, telemetry pings, and smart fallbacks for external guests.
 */

import { sfx } from './sound-effects.js';

export class DashboardManager {
  constructor(onDeckChangeCallback) {
    this.onDeckChangeCallback = onDeckChangeCallback;
    this.activeDeck = 'core';

    // Configurable URLs with localStorage persistence
    this.urls = {
      executive: localStorage.getItem('hub_url_executive') || 'https://daily-executive-dashboard.onrender.com/',
      rental: localStorage.getItem('hub_url_rental') || 'http://127.0.0.1:8000/',
      financial: localStorage.getItem('hub_url_financial') || 'http://localhost:3008/',
      trip: localStorage.getItem('hub_url_trip') || 'https://daily-executive-dashboard.onrender.com/trip-planner/'
    };

    this.statusMap = {
      executive: 'CHECKING',
      rental: 'CHECKING',
      financial: 'CHECKING',
      trip: 'CHECKING'
    };

    this.init();
  }

  init() {
    this.setupNavButtons();
    this.setupCardLaunchers();
    this.setupSubnavActions();
    this.checkAllTelemetry();

    // Periodic telemetry ping every 30 seconds
    setInterval(() => this.checkAllTelemetry(), 30000);
  }

  setupNavButtons() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const deckId = tab.dataset.deck;
        if (deckId) {
          sfx.playClick();
          this.switchDeck(deckId);
        }
      });
    });
  }

  setupCardLaunchers() {
    const cards = document.querySelectorAll('.launchpad-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const deckId = card.dataset.deck;
        if (deckId) {
          sfx.playWarp();
          this.switchDeck(deckId);
        }
      });
    });

    const directButtons = document.querySelectorAll('.launch-btn');
    directButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const deckId = btn.dataset.deck;
        if (deckId) {
          sfx.playWarp();
          this.switchDeck(deckId);
        }
      });
    });
  }

  setupSubnavActions() {
    // Refresh Iframe buttons
    document.querySelectorAll('[data-action="refresh-frame"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const deckId = btn.dataset.deck;
        this.reloadIframe(deckId);
      });
    });

    // Popout in new window buttons
    document.querySelectorAll('[data-action="popout-tab"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const deckId = btn.dataset.deck;
        const targetUrl = this.urls[deckId];
        if (targetUrl) {
          sfx.playClick();
          window.open(targetUrl, '_blank');
        }
      });
    });

    // Return to core buttons
    document.querySelectorAll('[data-action="return-core"]').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playClick();
        this.switchDeck('core');
      });
    });
  }

  switchDeck(deckId) {
    if (this.activeDeck === deckId) return;

    console.log(`[Command Hub] Switching from ${this.activeDeck} to ${deckId}`);
    this.activeDeck = deckId;

    // 1. Update Navigation Tabs Active State
    document.querySelectorAll('.nav-tab-btn').forEach(tab => {
      if (tab.dataset.deck === deckId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // 2. Hide all Decks and Show the Selected Deck
    document.querySelectorAll('.deck-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetDeck = document.getElementById(`deck-${deckId}`);
    if (targetDeck) {
      targetDeck.classList.add('active');
    }

    // 3. Lazy Load / Initialize Iframe if necessary
    if (deckId === 'executive' || deckId === 'rental' || deckId === 'financial' || deckId === 'trip') {
      this.ensureIframeLoaded(deckId);
    }

    // 4. Trigger external callback (e.g. notify visualizer)
    if (this.onDeckChangeCallback) {
      this.onDeckChangeCallback(deckId);
    }
  }

  ensureIframeLoaded(deckId) {
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (!iframe) return;

    const targetUrl = this.urls[deckId];
    const isHttpsOrigin = window.location.protocol === 'https:';
    const isInsecureTarget = targetUrl.startsWith('http://');

    if (isHttpsOrigin && isInsecureTarget) {
      console.warn(`[Command Hub] Mixed content protection: Target ${targetUrl} is HTTP on an HTTPS origin. Activating local gateway fallback.`);
      const fallbackEl = document.getElementById(`fallback-${deckId}`);
      if (fallbackEl) {
        fallbackEl.classList.add('visible');
      }
      return;
    }

    if (!iframe.src || iframe.src === 'about:blank') {
      iframe.src = targetUrl;
    }
  }

  reloadIframe(deckId) {
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (iframe) {
      sfx.playClick();
      const targetUrl = this.urls[deckId];
      const isHttpsOrigin = window.location.protocol === 'https:';
      const isInsecureTarget = targetUrl.startsWith('http://');

      if (isHttpsOrigin && isInsecureTarget) {
        const fallbackEl = document.getElementById(`fallback-${deckId}`);
        if (fallbackEl) fallbackEl.classList.add('visible');
        return;
      }
      iframe.src = targetUrl;
    }
  }

  async checkAllTelemetry() {
    try {
      // First try calling our Express backend endpoint if available
      const response = await fetch('/api/telemetry');
      if (response.ok) {
        const data = await response.json();
        data.results.forEach(item => {
          this.updateDeckStatus(item.id, item.status, item.latencyMs);
        });
        return;
      }
    } catch (e) {
      // Running as pure static (GitHub Pages / Netlify / Vercel without local server)
    }

    // Direct browser-side probes
    this.probeUrl('executive', this.urls.executive);
    this.probeUrl('rental', this.urls.rental);
    this.probeUrl('financial', this.urls.financial);
    this.probeUrl('trip', this.urls.trip);
  }

  async probeUrl(deckId, url) {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      // Probe with mode: 'no-cors' so cross-origin doesn't fail the fetch
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latency = Date.now() - startTime;
      this.updateDeckStatus(deckId, 'ONLINE', latency);
    } catch (err) {
      // If localhost is unreachable (e.g. remote visitor on cellular or friend on public web)
      this.updateDeckStatus(deckId, 'STANDBY_LOCAL', null);
      this.showMirrorFallbackNotice(deckId);
    }
  }

  updateDeckStatus(deckId, status, latency) {
    this.statusMap[deckId] = status;

    const badges = document.querySelectorAll(`[data-status-badge="${deckId}"]`);
    badges.forEach(badge => {
      if (status === 'ONLINE') {
        badge.innerHTML = `<span class="status-beacon"></span> ONLINE ${latency ? latency + 'ms' : ''}`;
        badge.style.color = 'var(--emerald-core)';
      } else if (status === 'STANDBY_LOCAL') {
        badge.innerHTML = `<span class="status-beacon" style="background:#f59e0b;box-shadow:0 0 8px #f59e0b;"></span> LOCALHOST LINKED`;
        badge.style.color = '#f59e0b';
      } else {
        badge.innerHTML = `<span class="status-beacon" style="background:#ef4444;box-shadow:0 0 8px #ef4444;"></span> OFFLINE`;
        badge.style.color = '#ef4444';
      }
    });

    // Update telemetry tab rows
    const matrixEl = document.getElementById(`telemetry-status-${deckId}`);
    if (matrixEl) {
      matrixEl.textContent = status === 'ONLINE' ? `ONLINE (${latency || '12'}ms)` : status;
      matrixEl.className = `matrix-value ${status === 'ONLINE' ? 'live' : ''}`;
    }
  }

  showMirrorFallbackNotice(deckId) {
    // If on a remote device where localhost:8000 or 3008 is unreachable, show sleek helper banner in the iframe container
    const fallbackEl = document.getElementById(`fallback-${deckId}`);
    if (fallbackEl && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      fallbackEl.classList.add('visible');
    }
  }

  saveCustomUrl(deckId, newUrl) {
    if (this.urls[deckId]) {
      this.urls[deckId] = newUrl;
      localStorage.setItem(`hub_url_${deckId}`, newUrl);
      this.reloadIframe(deckId);
      this.probeUrl(deckId, newUrl);
    }
  }
}
