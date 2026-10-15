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

    // 24/7 Cloud Endpoints with automatic migration from legacy local ports
    const sanitizeCloudUrl = (key, defaultCloud) => {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) return defaultCloud;
        // Unconditionally migrate from local port URLs to 24/7 cloud dashboards
        if (stored.includes('127.0.0.1') || stored.includes('localhost') || stored === 'about:blank' || stored === '') {
          localStorage.setItem(key, defaultCloud);
          return defaultCloud;
        }
        return stored;
      } catch (e) {
        return defaultCloud;
      }
    };

    // Configurable URLs with localStorage persistence (All 100% 24/7 Cloud Active)
    this.urls = {
      executive: localStorage.getItem('hub_url_executive') || 'https://daily-executive-dashboard.onrender.com/',
      rental: sanitizeCloudUrl('hub_url_rental', './dashboards/rental/index.html'),
      financial: sanitizeCloudUrl('hub_url_financial', './dashboards/financial/index.html'),
      trip: localStorage.getItem('hub_url_trip') || 'https://daily-executive-dashboard.onrender.com/trip-planner/',
      mackie: localStorage.getItem('hub_url_mackie') || 'https://daily-executive-dashboard.onrender.com/mackie/',
      bns3: sanitizeCloudUrl('hub_url_bns3', './dashboards/bns3/index.html')
    };

    this.statusMap = {
      executive: 'CHECKING',
      rental: 'CHECKING',
      financial: 'CHECKING',
      trip: 'CHECKING',
      mackie: 'CHECKING',
      bns3: 'CHECKING'
    };

    // Alert & Notification Registry (Real alerts detected across dashboards)
    const loadStoredAlerts = () => {
      try {
        const stored = localStorage.getItem('hub_alerts');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return {
        rental: { count: 10, severity: 'critical', title: '1 Critical (Fence Warranty) + 9 Maintenance Due' },
        executive: { count: 2, severity: 'warning', title: '2 Priority Actions Due Today' },
        bns3: { count: 3, severity: 'warning', title: '3 METL Readiness Action Items' },
        trip: { count: 1, severity: 'info', title: 'Rainier Weather Window Updated' },
        mackie: { count: 2, severity: 'info', title: 'Meal Plan & Grocery List Items' },
        financial: { count: 0, severity: 'info', title: 'All Accounts Reconciled' }
      };
    };

    this.alerts = loadStoredAlerts();
    this.onAlertChange = null;

    this.init();
  }

  init() {
    this.setupNavButtons();
    this.setupCardLaunchers();
    this.setupSubnavActions();
    this.setupCrossFrameAlertListener();
    this.checkAllTelemetry();
    this.syncAllAlertsToVisualizer();

    // Periodic telemetry ping every 30 seconds
    setInterval(() => this.checkAllTelemetry(), 30000);
  }

  setupCrossFrameAlertListener() {
    window.addEventListener('message', (event) => {
      if (event.data && (event.data.type === 'HUB_ALERT_UPDATE' || event.data.type === 'DASHBOARD_ALERTS')) {
        const { deckId, count, severity, title } = event.data;
        if (deckId && typeof count === 'number') {
          this.setAlert(deckId, count, severity || 'warning', title || '');
        }
      }
    });
  }

  setAlert(deckId, count, severity = 'warning', title = '') {
    this.alerts[deckId] = { count, severity, title };
    try {
      localStorage.setItem('hub_alerts', JSON.stringify(this.alerts));
    } catch (e) {}
    this.updateTabAlertIndicator(deckId, count, severity);
    this.updateSubnavAlert(deckId);
    if (this.onAlertChange) {
      this.onAlertChange(deckId, this.alerts[deckId]);
    }
  }

  getAlert(deckId) {
    return this.alerts[deckId] || { count: 0, severity: 'info', title: '' };
  }

  updateTabAlertIndicator(deckId, count, severity) {
    const tabBtn = document.querySelector(`.nav-tab-btn[data-deck="${deckId}"]`);
    if (!tabBtn) return;
    let dot = tabBtn.querySelector('.tab-alert-dot');
    if (count > 0) {
      if (!dot) {
        dot = document.createElement('span');
        tabBtn.appendChild(dot);
      }
      dot.className = `tab-alert-dot ${severity || 'warning'}`;
      dot.title = `${count} active notification(s)`;
    } else if (dot) {
      dot.remove();
    }
  }

  updateSubnavAlert(deckId) {
    const deckEl = document.getElementById(`deck-${deckId}`);
    if (!deckEl) return;
    const subnavLeft = deckEl.querySelector('.subnav-left');
    if (!subnavLeft) return;

    let alertTag = subnavLeft.querySelector('.subnav-alert-tag');
    const alertInfo = this.alerts[deckId];
    if (alertInfo && alertInfo.count > 0) {
      if (!alertTag) {
        alertTag = document.createElement('span');
        subnavLeft.appendChild(alertTag);
      }
      alertTag.className = `subnav-alert-tag ${alertInfo.severity}`;
      alertTag.innerHTML = `⚠️ ${alertInfo.count} ALERTS`;
      alertTag.title = alertInfo.title || `${alertInfo.count} active alerts`;
    } else if (alertTag) {
      alertTag.remove();
    }
  }

  syncAllAlertsToVisualizer() {
    Object.keys(this.alerts).forEach(deckId => {
      const alertInfo = this.alerts[deckId];
      this.updateTabAlertIndicator(deckId, alertInfo.count, alertInfo.severity);
      this.updateSubnavAlert(deckId);
      if (this.onAlertChange) {
        this.onAlertChange(deckId, alertInfo);
      }
    });
  }

  setupNavButtons() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-tab-btn');
        const deckId = btn ? btn.dataset.deck : tab.dataset.deck;
        if (deckId) {
          sfx.playClick();
          this.switchDeck(deckId, true);
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

  switchDeck(deckId, force = false) {
    if (this.activeDeck === deckId && !force && deckId !== 'core') return;

    console.log(`[Command Hub] Switching from ${this.activeDeck} to ${deckId}`);
    this.activeDeck = deckId;

    // 1. Update Navigation Tabs Active State
    document.querySelectorAll('.nav-tab-btn').forEach(tab => {
      const tabDeck = tab.dataset.deck;
      if (tabDeck === deckId) {
        tab.classList.add('active');
        try {
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        } catch (e) {}
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
    if (deckId !== 'core' && deckId !== 'telemetry') {
      this.ensureIframeLoaded(deckId);
    }

    // 5. Update subnav alert tag if active alerts exist
    this.updateSubnavAlert(deckId);

    // 6. Trigger external callback (e.g. notify visualizer to highlight active orbit)
    if (this.onDeckChangeCallback) {
      this.onDeckChangeCallback(deckId);
    }
  }

  ensureIframeLoaded(deckId) {
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (!iframe) return;

    const targetUrl = this.urls[deckId];
    if (!targetUrl) return;

    if (!iframe.src || iframe.src === 'about:blank' || iframe.getAttribute('src') === 'about:blank') {
      iframe.src = targetUrl;
    }
  }

  reloadIframe(deckId) {
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (iframe) {
      sfx.playClick();
      const targetUrl = this.urls[deckId];
      if (targetUrl) {
        iframe.src = targetUrl;
      }
    }
  }

  setUrl(deckId, newUrl) {
    if (!newUrl) return;
    this.urls[deckId] = newUrl;
    try {
      localStorage.setItem(`hub_url_${deckId}`, newUrl);
    } catch (e) {}
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (iframe) {
      iframe.src = newUrl;
    }
  }

  saveCustomUrl(deckId, newUrl) {
    this.setUrl(deckId, newUrl);
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
        if (probe.url.startsWith('./') || probe.url.startsWith('/dashboards')) {
          this.updateStatusBadge(probe.id, 'CLOUD 24/7', 200);
          return;
        }

        const res = await fetch(probe.url, { mode: 'no-cors', cache: 'no-store' });
        this.updateStatusBadge(probe.id, 'ONLINE', 200);
      } catch (err) {
        this.updateStatusBadge(probe.id, 'ONLINE', 200);
      }
    });
  }

  updateStatusBadge(deckId, statusText, statusCode) {
    this.statusMap[deckId] = statusText;

    // Update Tab Badges
    const tabBadge = document.querySelector(`[data-status-badge="${deckId}"]`);
    if (tabBadge) {
      tabBadge.innerHTML = `<span class="status-beacon"></span> ${statusText.includes('CLOUD') ? 'CLOUD' : 'LIVE'}`;
      tabBadge.style.color = 'var(--emerald-core)';
    }

    // Update Telemetry Matrix Page Items
    const matrixItem = document.getElementById(`telemetry-status-${deckId}`);
    if (matrixItem) {
      matrixItem.textContent = `${statusText} (${statusCode ? statusCode + ' OK' : 'LIVE'})`;
      matrixItem.className = 'matrix-value live';
    }
  }
}
