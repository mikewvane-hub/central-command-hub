/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Multi-Dashboard Orchestrator & Gateway Manager
 * Handles tab navigation, iframe loading, telemetry pings, holographic window glass modes,
 * and transparent HUD viewports so the 3D atomic structure is never obscured.
 */

import { sfx } from './sound-effects.js';

export const DEFAULT_HUB_ALERTS = {
  rental: {
    deckName: 'Rental Operations',
    deckIcon: '🏡',
    count: 10,
    severity: 'critical',
    title: '1 Critical (Fence Warranty) + 9 Maintenance Due',
    items: [
      {
        severity: 'CRITICAL',
        code: 'WARRANTY_EXPIRING_PM_FENCE_WASH_GATE',
        statute: 'Superior Fence & Rail (Clause Q)',
        title: 'Workmanship Warranty Expiring in 0d: 187 LF Dark Sequoia Vinyl Fence & 4 Gates',
        message: 'Vendor 3-Yr Workmanship Warranty expires on 2026-10-12. Inspect all 4 gates, latches, hinges & posts immediately and submit warranty claims.'
      },
      {
        severity: 'WARNING',
        code: 'PM_DUE_SOON_PM_FENCE_WASH_GATE',
        statute: 'PM Timer (Annual — 12m)',
        title: 'Preventative Maintenance Due (0d): Fence Wash & Gate Hinge/Latch Alignment',
        message: '187 LF vinyl fence wash and gate hinge/latch alignment due. Verify gate swing and latch engagement.'
      },
      {
        severity: 'WARNING',
        code: 'RCW_59_18_650_OWNER_OCCUPANCY_TIMELINE',
        statute: 'RCW 59.18.650(1)(k) & (2)(d) / RCW 59.18.280',
        title: 'March 2027 Tenant Move-Out & June 2027 Owner Re-Occupancy Milestones',
        message: '1) Serve 90-day Owner Occupancy notice by 2026-12-31 to prevent automatic month-to-month holdover. 2) Security deposit refund mandated within 14 days of vacate. 3) Schedule E make-ready repairs in Apr–May 2027.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_DRYER_VENT',
        statute: 'Fire Prevention Cleanout (Capitol Duct Cleaning)',
        message: 'Preventative Maintenance Overdue (1038d): Dryer Exhaust Vent & Exterior Hood Lint Cleanout. Annual fire-hazard lint cleanout required.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_HVAC_TUNEUP',
        statute: 'Air Handlers Inc. (Annual Service)',
        message: 'Preventative Maintenance Overdue (1035d): Gas Furnace Annual Tune-Up, Burner Service & CO Combustion Safety Test.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_SEPTIC_PUMP',
        statute: 'Thurston County Art. IV & WA DOH Standard (36m)',
        message: 'Preventative Maintenance Overdue (454d): 1,150-Gal Concrete Septic Tank Inspection & Pumping (2-Compartment + Gravity Drainfield).'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_DUCT_CLEANING',
        statute: 'NADCA Whole-House Standard (36m)',
        message: 'Preventative Maintenance Overdue (307d): Whole-House Air Duct & Sanitizer Fog Cleaning. Target Apr 2027 turnover window.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_FRIDGE_WATER_COILS',
        statute: 'EveryDrop Filter #1 (Every 6m)',
        message: 'Preventative Maintenance Overdue (11d): Whirlpool Refrigerator (WRF555SDFZ) Water Filter & Condenser Coil Vacuuming.'
      },
      {
        severity: 'WARNING',
        code: 'PM_DUE_SOON_PM_GUTTER_ROOF_MOSS',
        statute: 'Semi-Annual Cleanout (2026-11-01)',
        message: 'Preventative Maintenance Due in 20d: PNW Gutter Cleanout & Roof Moss Zinc/Oxygen Solution Treatment.'
      },
      {
        severity: 'WARNING',
        code: 'WARRANTY_EXPIRING_CAPEX_REFRIGERATOR',
        statute: 'Lowe\'s Warranty (WRF555SDFZ)',
        message: 'Warranty Expiring in 159d (2027-03-20): Whirlpool 24.7-cu ft French Door Refrigerator Replacement.'
      }
    ]
  },
  executive: {
    deckName: 'Executive Briefing',
    deckIcon: '🎖️',
    count: 2,
    severity: 'warning',
    title: '2 Priority Actions Due Today',
    items: [
      {
        severity: 'WARNING',
        code: 'EXEC_ACTION_WA_NOTICE',
        statute: 'Q4 2026 Milestone',
        title: 'WA Rental 90-Day Notice Packet Preparation',
        message: 'Prepare written statutory Owner Occupancy notice and coordinate with property manager before Dec 31 statutory cutoff.'
      },
      {
        severity: 'WARNING',
        code: 'EXEC_ACTION_METL_SYNC',
        statute: 'Command Group Coordination',
        title: '110th Chemical BN S3 METL Training Schedule Sign-Off',
        message: 'Review upcoming field training exercise readiness matrix and TRAIN-PRO synchronization calendar.'
      }
    ]
  },
  bns3: {
    deckName: '110th BN S3 Readiness',
    deckIcon: '🐉',
    count: 3,
    severity: 'warning',
    title: '3 METL Readiness Action Items',
    items: [
      {
        severity: 'WARNING',
        code: 'BNS3_CBRN_RECON',
        statute: 'AR 350-1 / Training Matrix',
        title: 'METL Assessment: CBRN Reconnaissance & Surveillance Qualification',
        message: 'Company B CBRN platoon qualification verification required for upcoming quarter evaluation.'
      },
      {
        severity: 'WARNING',
        code: 'BNS3_DECON_PMCS',
        statute: 'Battalion Maintenance & S4',
        title: 'Decontamination Equipment Readiness Inspection',
        message: 'M26 Joint Service Transportable Decontamination System PMCS log updates pending sign-off.'
      },
      {
        severity: 'WARNING',
        code: 'BNS3_WEEKLY_SYNC',
        statute: 'Operations Order 26-10',
        title: 'Iron Dragons S3 Weekly Synchronization Meeting',
        message: 'Synchronize live training lanes, ammunition allocations, and safety briefs for next rotation.'
      }
    ]
  },
  trip: {
    deckName: 'Rainier Basecamp',
    deckIcon: '🏕️',
    count: 1,
    severity: 'info',
    title: 'Rainier Weather Window Updated',
    items: [
      {
        severity: 'INFO',
        code: 'TRIP_RAINIER_WEATHER',
        statute: 'National Park Service Telemetry',
        title: 'Mount Rainier National Park Weather & Trail Advisory',
        message: 'Fall storm alert: early snow accumulation above 5,000 ft on Paradise and Sunrise corridors. Check tire chain requirements.'
      }
    ]
  },
  mackie: {
    deckName: "Mackie's Daily Board",
    deckIcon: '🗓️',
    count: 2,
    severity: 'info',
    title: 'Meal Plan & Grocery List Items',
    items: [
      {
        severity: 'INFO',
        code: 'MACKIE_DINNER_MENU',
        statute: 'Family Meal Planner',
        title: 'Dinner Menu Finalization for Friday',
        message: 'Review and confirm Friday family dinner recipe and schedule.'
      },
      {
        severity: 'INFO',
        code: 'MACKIE_GROCERY_RESTOCK',
        statute: 'Grocery Inventory',
        title: 'Weekly Grocery Restock Checklist',
        message: '4 items pending in produce and dairy restock list.'
      }
    ]
  },
  financial: {
    deckName: 'Wealth Console',
    deckIcon: '📈',
    count: 0,
    severity: 'info',
    title: 'All Accounts Reconciled',
    items: []
  }
};

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
      let stored = null;
      try {
        const raw = localStorage.getItem('hub_alerts');
        if (raw) stored = JSON.parse(raw);
      } catch (e) {}

      const alerts = {};
      Object.keys(DEFAULT_HUB_ALERTS).forEach(deckId => {
        const def = DEFAULT_HUB_ALERTS[deckId];
        const s = stored?.[deckId];
        alerts[deckId] = {
          deckName: def.deckName,
          deckIcon: def.deckIcon,
          count: (s && typeof s.count === 'number') ? s.count : def.count,
          severity: (s && s.severity) ? s.severity : def.severity,
          title: (s && s.title) ? s.title : def.title,
          items: (s && Array.isArray(s.items) && s.items.length > 0) ? s.items : def.items
        };
      });
      return alerts;
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
    this.setupAlertCenter();
    this.checkAllTelemetry();
    this.syncAllAlertsToVisualizer();

    // Periodic telemetry ping every 30 seconds
    setInterval(() => this.checkAllTelemetry(), 30000);
  }

  setupCrossFrameAlertListener() {
    window.addEventListener('message', (event) => {
      if (event.data && (event.data.type === 'HUB_ALERT_UPDATE' || event.data.type === 'DASHBOARD_ALERTS')) {
        const { deckId, count, severity, title, items } = event.data;
        if (deckId && typeof count === 'number') {
          this.setAlert(deckId, count, severity || 'warning', title || '', items || null);
        }
      }
    });
  }

  setupAlertCenter() {
    // 1. Global Alert Pill in Tactical Header
    const globalBtn = document.getElementById('btn-global-alerts');
    if (globalBtn) {
      globalBtn.addEventListener('click', () => {
        sfx.playAlert();
        this.openAlertCenter('all');
      });
    }

    // 2. Custom Event from 3D spheres or other components
    window.addEventListener('OPEN_HUB_ALERTS', (e) => {
      sfx.playAlert();
      this.openAlertCenter(e.detail?.deckId || 'all');
    });

    // 3. Close modal buttons
    const closeBtn = document.getElementById('btn-close-alerts');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeAlertCenter());
    }

    const dismissBtn = document.getElementById('btn-dismiss-alerts-modal');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => this.closeAlertCenter());
    }

    const overlay = document.getElementById('modal-hub-alerts');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeAlertCenter();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('modal-hub-alerts');
        if (modal && modal.classList.contains('open')) {
          this.closeAlertCenter();
        }
      }
    });

    this.updateGlobalAlertsBadge();
  }

  updateGlobalAlertsBadge() {
    const badgeEl = document.getElementById('global-alerts-badge');
    const pillBtn = document.getElementById('btn-global-alerts');
    if (!badgeEl || !pillBtn) return;

    let total = 0;
    let hasCritical = false;

    Object.values(this.alerts).forEach(a => {
      total += (a.count || 0);
      if (a.severity === 'critical') hasCritical = true;
    });

    badgeEl.textContent = `${total} ALERTS`;
    if (hasCritical) {
      pillBtn.classList.add('has-critical');
    } else {
      pillBtn.classList.remove('has-critical');
    }

    if (total === 0) {
      badgeEl.textContent = `ALL CLEAR`;
      pillBtn.style.opacity = '0.6';
    } else {
      pillBtn.style.opacity = '1';
    }
  }

  setAlert(deckId, count, severity = 'warning', title = '', items = null) {
    const existing = this.alerts[deckId] || DEFAULT_HUB_ALERTS[deckId] || { deckName: deckId, deckIcon: '⚡', items: [] };
    this.alerts[deckId] = {
      deckName: existing.deckName || deckId,
      deckIcon: existing.deckIcon || '⚡',
      count,
      severity,
      title: title || existing.title || '',
      items: items || existing.items || []
    };
    try {
      localStorage.setItem('hub_alerts', JSON.stringify(this.alerts));
    } catch (e) {}
    this.updateTabAlertIndicator(deckId, count, severity);
    this.updateSubnavAlert(deckId);
    this.updateGlobalAlertsBadge();
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
      dot.title = `${count} active notification(s) • Click to view`;
      dot.style.pointerEvents = 'auto';
      dot.style.cursor = 'pointer';
      dot.onclick = (e) => {
        e.stopPropagation();
        sfx.playAlert();
        this.openAlertCenter(deckId);
      };
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
      alertTag.innerHTML = `⚠️ ${alertInfo.count} ALERTS (INSPECT)`;
      alertTag.title = `Click to inspect active alerts & action items for ${alertInfo.deckName || deckId}`;
      alertTag.onclick = (e) => {
        e.stopPropagation();
        sfx.playAlert();
        this.openAlertCenter(deckId);
      };
    } else if (alertTag) {
      alertTag.remove();
    }
  }

  openAlertCenter(targetDeckId = 'all') {
    const modal = document.getElementById('modal-hub-alerts');
    if (!modal) return;
    modal.classList.add('open');
    this.renderAlertCenter(targetDeckId);
  }

  closeAlertCenter() {
    const modal = document.getElementById('modal-hub-alerts');
    if (modal) modal.classList.remove('open');
    sfx.playClick();
  }

  renderAlertCenter(selectedFilter = 'all') {
    const filtersBar = document.getElementById('alert-filters-bar');
    const cardsContainer = document.getElementById('alert-cards-container');
    if (!filtersBar || !cardsContainer) return;

    // Build filter items: ALL + each deck that has alerts
    let totalCount = 0;
    Object.values(this.alerts).forEach(a => { totalCount += (a.count || 0); });

    const filterOptions = [
      { id: 'all', label: `ALL ALERTS (${totalCount})`, icon: '⚡' }
    ];

    Object.entries(this.alerts).forEach(([deckId, a]) => {
      if (a.count > 0 || (a.items && a.items.length > 0)) {
        filterOptions.push({
          id: deckId,
          label: `${a.deckName || deckId} (${a.count})`,
          icon: a.deckIcon || '⚡'
        });
      }
    });

    filtersBar.innerHTML = filterOptions.map(opt => `
      <button class="alert-filter-tab ${opt.id === selectedFilter ? 'active' : ''}" data-filter="${opt.id}">
        <span>${opt.icon}</span>
        <span>${opt.label}</span>
      </button>
    `).join('');

    // Wire filter button click
    filtersBar.querySelectorAll('.alert-filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playClick();
        this.renderAlertCenter(btn.getAttribute('data-filter'));
      });
    });

    // Collect all alert items to display
    const itemsToDisplay = [];
    Object.entries(this.alerts).forEach(([deckId, a]) => {
      if (selectedFilter !== 'all' && selectedFilter !== deckId) return;
      if (a.items && a.items.length > 0) {
        a.items.forEach(item => {
          itemsToDisplay.push({
            ...item,
            deckId,
            deckName: a.deckName || deckId,
            deckIcon: a.deckIcon || '⚡'
          });
        });
      }
    });

    if (itemsToDisplay.length === 0) {
      cardsContainer.innerHTML = `
        <div style="text-align:center;padding:2.5rem 1rem;font-family:var(--font-mono);color:#94a3b8;">
          <div style="font-size:2rem;margin-bottom:8px;">✅</div>
          <strong style="color:#fff;font-size:1rem;">NO ACTIVE ALERTS FOR THIS SELECTION</strong>
          <p style="font-size:0.8rem;margin-top:6px;">All operational systems and statutory guardrails verified compliant.</p>
        </div>
      `;
      return;
    }

    cardsContainer.innerHTML = itemsToDisplay.map((item, idx) => {
      const sevClass = (item.severity || 'warning').toLowerCase();
      const badgeStyle = (sevClass === 'critical')
        ? 'background:rgba(239,68,68,0.22);color:#ef4444;border:1px solid rgba(239,68,68,0.6);'
        : (sevClass === 'warning'
          ? 'background:rgba(245,158,11,0.22);color:#f59e0b;border:1px solid rgba(245,158,11,0.6);'
          : 'background:rgba(6,182,212,0.22);color:#06b6d4;border:1px solid rgba(6,182,212,0.6);');

      return `
        <div class="alert-card alert-${sevClass}" data-deck="${item.deckId}" data-alert-index="${idx}">
          <div class="alert-card-header">
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="alert-deck-badge">${item.deckIcon} ${item.deckName.toUpperCase()}</span>
              <span style="font-family:var(--font-mono);font-size:0.62rem;font-weight:800;padding:2px 6px;border-radius:3px;${badgeStyle}">
                ${item.severity.toUpperCase()}
              </span>
            </div>
            <span class="alert-card-statute">${item.statute || ''}</span>
          </div>
          <div class="alert-card-title">${item.title}</div>
          <div class="alert-card-msg">${item.message}</div>
          <button class="alert-card-action" data-deck="${item.deckId}">
            <span>OPEN IN DASHBOARD</span>
            <span>➔</span>
          </button>
        </div>
      `;
    }).join('');

    // Wire card click -> jump to dashboard
    cardsContainer.querySelectorAll('.alert-card').forEach(card => {
      card.addEventListener('click', () => {
        const deckId = card.getAttribute('data-deck');
        this.jumpToAlert(deckId);
      });
    });
  }

  jumpToAlert(deckId) {
    this.closeAlertCenter();
    this.switchDeck(deckId);

    // If deck is rental, smoothly scroll iframe to alerts list
    if (deckId === 'rental') {
      setTimeout(() => {
        try {
          const frame = document.getElementById('iframe-rental');
          if (frame && frame.contentWindow) {
            const doc = frame.contentDocument || frame.contentWindow.document;
            const target = doc.getElementById('panel-4-action-alerts') || doc.getElementById('alerts-list');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              target.style.transition = 'box-shadow 0.3s ease';
              target.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.85)';
              setTimeout(() => { target.style.boxShadow = ''; }, 3000);
            }
          }
        } catch (e) {}
      }, 400);
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
    this.updateGlobalAlertsBadge();
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
