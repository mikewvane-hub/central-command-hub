/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Multi-Dashboard Orchestrator & Gateway Manager
 * Handles tab navigation, iframe loading, telemetry pings, holographic window glass modes,
 * and transparent HUD viewports so the 3D atomic structure is never obscured.
 */

import { sfx } from './sound-effects.js';

export class DashboardManager {
  constructor(onDeckChangeCallback) {
    this.onDeckChangeCallback = onDeckChangeCallback;
    this.activeDeck = 'core';
    this.glassMode = 'glass'; // 'glass' (82%) | 'ghost' (58%) | 'solid' (98%)

    // Configurable URLs with localStorage persistence
    this.urls = {
      executive: localStorage.getItem('hub_url_executive') || 'https://daily-executive-dashboard.onrender.com/',
      rental: localStorage.getItem('hub_url_rental') || 'http://127.0.0.1:8000/',
      financial: localStorage.getItem('hub_url_financial') || 'http://localhost:3008/',
      trip: localStorage.getItem('hub_url_trip') || 'https://daily-executive-dashboard.onrender.com/trip-planner/',
      mackie: localStorage.getItem('hub_url_mackie') || 'https://daily-executive-dashboard.onrender.com/mackie/',
      bns3: localStorage.getItem('hub_url_bns3') || 'http://localhost:3011/'
    };

    this.statusMap = {
      executive: 'CHECKING',
      rental: 'CHECKING',
      financial: 'CHECKING',
      trip: 'CHECKING',
      mackie: 'CHECKING',
      bns3: 'CHECKING'
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
    // Glass Translucency Mode Toggle
    document.querySelectorAll('[data-action="toggle-glass"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.cycleGlassMode();
      });
    });

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

    // Return to core / minimize to orbit buttons
    document.querySelectorAll('[data-action="return-core"]').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playClick();
        this.switchDeck('core');
      });
    });
  }

  cycleGlassMode() {
    sfx.playClick();
    if (this.glassMode === 'glass') {
      this.glassMode = 'ghost';
    } else if (this.glassMode === 'ghost') {
      this.glassMode = 'solid';
    } else {
      this.glassMode = 'glass';
    }

    const labels = {
      glass: '💎 Glass (82%)',
      ghost: '👻 Ghost (58%)',
      solid: '🛡️ Solid (98%)'
    };

    document.querySelectorAll('.holographic-window').forEach(win => {
      win.classList.remove('glass-mode-glass', 'glass-mode-ghost', 'glass-mode-solid');
      win.classList.add(`glass-mode-${this.glassMode}`);
    });

    document.querySelectorAll('[data-action="toggle-glass"]').forEach(btn => {
      btn.textContent = labels[this.glassMode];
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

    // 3. Adjust floating circles overlay visibility
    const nodesOverlay = document.getElementById('orbiting-nodes-overlay');
    if (nodesOverlay) {
      if (deckId === 'core') {
        nodesOverlay.classList.remove('background-mode');
      } else {
        nodesOverlay.classList.add('background-mode');
      }
    }

    // 4. Lazy Load / Initialize Iframe if necessary
    if (deckId === 'executive' || deckId === 'rental' || deckId === 'financial' || deckId === 'trip' || deckId === 'mackie' || deckId === 'bns3') {
      this.ensureIframeLoaded(deckId);
    }

    // 5. Trigger external callback (e.g. notify visualizer to highlight active orbit)
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

  setUrl(deckId, newUrl) {
    if (!newUrl) return;
    this.urls[deckId] = newUrl;
    localStorage.setItem(`hub_url_${deckId}`, newUrl);
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (iframe) {
      iframe.src = newUrl;
    }
  }

  async checkAllTelemetry() {
    // 1. Check local server telemetry endpoint first if available
    try {
      const resp = await fetch('/api/telemetry', { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (data.results && Array.isArray(data.results)) {
          data.results.forEach(res => {
            this.updateStatusBadge(res.id, res.status, res.statusCode);
          });
          return;
        }
      }
    } catch (e) {
      // Running standalone / GitHub Pages without local express telemetry proxy
    }

    // 2. Fallback: Direct ping probes
    const probes = [
      { id: 'executive', url: this.urls.executive },
      { id: 'rental', url: this.urls.rental },
      { id: 'financial', url: this.urls.financial },
      { id: 'trip', url: this.urls.trip },
      { id: 'mackie', url: this.urls.mackie },
      { id: 'bns3', url: this.urls.bns3 }
    ];

    probes.forEach(async (probe) => {
      try {
        const isHttpsOrigin = window.location.protocol === 'https:';
        if (isHttpsOrigin && probe.url.startsWith('http://')) {
          this.updateStatusBadge(probe.id, 'LOCAL PORT', 200);
          return;
        }

        const res = await fetch(probe.url, { mode: 'no-cors', cache: 'no-store' });
        this.updateStatusBadge(probe.id, 'ONLINE', 200);
      } catch (err) {
        this.updateStatusBadge(probe.id, 'CONNECTING', 0);
      }
    });
  }

  updateStatusBadge(deckId, statusText, statusCode) {
    this.statusMap[deckId] = statusText;

    // Update Tab Badges
    const tabBadge = document.querySelector(`[data-status-badge="${deckId}"]`);
    if (tabBadge) {
      if (statusText === 'ONLINE' || statusText.includes('PORT')) {
        tabBadge.innerHTML = `<span class="status-beacon"></span> ${statusText}`;
      } else {
        tabBadge.innerHTML = `<span class="status-beacon" style="background:#f59e0b;box-shadow:0 0 6px #f59e0b;"></span> ${statusText}`;
      }
    }

    // Update Telemetry Matrix Page Items
    const matrixItem = document.getElementById(`telemetry-status-${deckId}`);
    if (matrixItem) {
      matrixItem.textContent = `${statusText} (${statusCode ? statusCode + ' OK' : 'PENDING'})`;
      matrixItem.className = (statusText === 'ONLINE' || statusText.includes('PORT')) ? 'matrix-value live' : 'matrix-value pending';
    }
  }
}
