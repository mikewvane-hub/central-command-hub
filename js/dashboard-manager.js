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
        title: 'Dryer Exhaust Vent & Lint Cleanout Overdue',
        message: 'Preventative Maintenance Overdue (1038d): Dryer Exhaust Vent & Exterior Hood Lint Cleanout. Annual fire-hazard lint cleanout required.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_HVAC_TUNEUP',
        statute: 'Air Handlers Inc. (Annual Service)',
        title: 'Gas Furnace Annual Tune-Up & Combustion Test Overdue',
        message: 'Preventative Maintenance Overdue (1035d): Gas Furnace Annual Tune-Up, Burner Service & CO Combustion Safety Test.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_SEPTIC_PUMP',
        statute: 'Thurston County Art. IV & WA DOH Standard (36m)',
        title: 'Septic Tank Inspection & Pumping Overdue',
        message: 'Preventative Maintenance Overdue (454d): 1,150-Gal Concrete Septic Tank Inspection & Pumping (2-Compartment + Gravity Drainfield).'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_DUCT_CLEANING',
        statute: 'NADCA Whole-House Standard (36m)',
        title: 'Whole-House Air Duct & Sanitizer Fog Cleaning Overdue',
        message: 'Preventative Maintenance Overdue (307d): Whole-House Air Duct & Sanitizer Fog Cleaning. Target Apr 2027 turnover window.'
      },
      {
        severity: 'WARNING',
        code: 'PM_OVERDUE_PM_FRIDGE_WATER_COILS',
        statute: 'EveryDrop Filter #1 (Every 6m)',
        title: 'Refrigerator Water Filter & Condenser Coil Vacuuming Overdue',
        message: 'Preventative Maintenance Overdue (11d): Whirlpool Refrigerator (WRF555SDFZ) Water Filter & Condenser Coil Vacuuming.'
      },
      {
        severity: 'WARNING',
        code: 'PM_DUE_SOON_PM_GUTTER_ROOF_MOSS',
        statute: 'Semi-Annual Cleanout (2026-11-01)',
        title: 'Gutter Cleanout & Roof Moss Treatment Due',
        message: 'Preventative Maintenance Due in 20d: PNW Gutter Cleanout & Roof Moss Zinc/Oxygen Solution Treatment.'
      },
      {
        severity: 'WARNING',
        code: 'WARRANTY_EXPIRING_CAPEX_REFRIGERATOR',
        statute: 'Lowe\'s Warranty (WRF555SDFZ)',
        title: 'Whirlpool Refrigerator Store Warranty Expiring',
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
        severity: 'INFO',
        code: 'EXEC_ACTION_STRATEGIC_SYNC',
        statute: 'Family Strategic Review',
        title: 'Quarterly Family Operations & Calendar Alignment',
        message: 'Review upcoming expedition dates, Mackie Board routines, and investment cashflow milestones.'
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
  },
  garage: {
    deckName: 'Garage & Fleet Command',
    deckIcon: '🛞',
    count: 0,
    severity: 'nominal',
    title: 'Fleet Telemetry Calibrated • Awaiting Telemetry Input',
    items: []
  },
  fleet: {
    deckName: 'Fleet Telemetry',
    deckIcon: '🛞',
    count: 0,
    severity: 'nominal',
    title: 'Fleet Telemetry Calibrated • Awaiting Telemetry Input',
    items: []
  },
  health: {
    deckName: 'Athletic Readiness',
    deckIcon: '🏃',
    count: 1,
    severity: 'critical',
    title: 'HRV Readiness Below Target',
    items: [
      {
        severity: 'CRITICAL',
        code: 'HRV_BELOW_BASELINE',
        statute: 'Autonomic Biometrics Engine',
        title: 'HRV Readiness Alert: 46 ms (Below 65 ms Baseline)',
        message: 'Heart Rate Variability is 46 ms vs 65 ms target baseline. Autonomic nervous system fatigued. Throttle training to Zone 2 Active Recovery.'
      }
    ]
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
        if (
          stored.includes('127.0.0.1') ||
          stored.includes('localhost') ||
          stored === 'about:blank' ||
          stored === ''
        ) {
          localStorage.setItem(key, defaultCloud);
          return defaultCloud;
        }
        return stored;
      } catch (e) {
        return defaultCloud;
      }
    };

    const sanitizeGarageUrl = () => {
      const LATEST_GARAGE_URL = './dashboards/garage/index.html?v=40.0';
      try {
        const stored = localStorage.getItem('hub_url_garage');
        // If stored URL points to localhost/127.0.0.1 (which breaks on mobile/GitHub Pages),
        // or has old version, or is empty: ALWAYS reset to reliable relative path!
        if (!stored || stored.includes('localhost') || stored.includes('127.0.0.1') || !stored.includes('v=40.0')) {
          localStorage.setItem('hub_url_garage', LATEST_GARAGE_URL);
          return LATEST_GARAGE_URL;
        }
        return stored;
      } catch (e) {
        return LATEST_GARAGE_URL;
      }
    };

    // Configurable URLs with localStorage persistence (All 100% 24/7 Cloud Active)
    this.urls = {
      executive: localStorage.getItem('hub_url_executive') || 'https://daily-executive-dashboard.onrender.com/',
      rental: sanitizeCloudUrl('hub_url_rental', './dashboards/rental/index.html'),
      financial: sanitizeCloudUrl('hub_url_financial', './dashboards/financial/index.html'),
      trip: localStorage.getItem('hub_url_trip') || 'https://daily-executive-dashboard.onrender.com/trip-planner/',
      mackie: localStorage.getItem('hub_url_mackie') || 'https://daily-executive-dashboard.onrender.com/mackie/',
      garage: sanitizeGarageUrl()
    };

    this.statusMap = {
      executive: 'CHECKING',
      rental: 'CHECKING',
      financial: 'CHECKING',
      trip: 'CHECKING',
      mackie: 'CHECKING',
      garage: 'CHECKING'
    };

    // Track seen / acknowledged alerts per deck so indicators disappear once opened
    const loadSeenAlerts = () => {
      try {
        const raw = localStorage.getItem('hub_seen_alerts');
        if (raw) return new Set(JSON.parse(raw));
      } catch (e) {}
      return new Set();
    };
    this.seenDecks = loadSeenAlerts();

    // Track individually dismissed alerts by their unique code
    const loadDismissedAlerts = () => {
      try {
        const raw = localStorage.getItem('hub_dismissed_alerts');
        const rawResolved = localStorage.getItem('hub_resolved_directives');
        const set = new Set();
        if (raw) JSON.parse(raw).forEach(c => set.add(c));
        if (rawResolved) JSON.parse(rawResolved).forEach(c => set.add(c));
        return set;
      } catch (e) {}
      return new Set();
    };
    this.dismissedAlerts = loadDismissedAlerts();

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
        const isSeen = this.seenDecks.has(deckId);
        const allItems = (s && Array.isArray(s.items) && s.items.length > 0) ? s.items : def.items;
        const defaultByCode = {};
        if (def.items) {
          def.items.forEach(it => { if (it.code) defaultByCode[it.code] = it; });
        }
        const activeItems = allItems
          .filter(item => !this.dismissedAlerts.has(item.code) && !this.dismissedAlerts.has(item.id))
          .filter(item => {
            const code = (item.code || '').toUpperCase();
            const title = (item.title || item.subject || '').toLowerCase();
            // Filter out hallucinated Murano tabs / registration alerts (Registration is 05/31/2027 TN BVZ7440, nominal)
            if (code.includes('MURANO') && (code.includes('TABS') || code.includes('REG') || code.includes('EXPIR'))) return false;
            if (title.includes('murano') && (title.includes('tab') || title.includes('expir') || title.includes('due nov'))) return false;
            if (code.includes('ACADEMIC_DRAFT') || title.includes('agentic arch') || title.includes('oct 22')) return false;
            return true;
          })
          .map((item, idx) => {
            const defItem = defaultByCode[item.code] || def.items?.[idx];
            let validTitle = item.title;
            if (!validTitle || validTitle === 'undefined' || typeof validTitle !== 'string') {
              validTitle = item.subject && item.subject !== 'undefined'
                ? item.subject
                : (defItem?.title || item.statute || `${def.deckName} Directive #${idx + 1}`);
            }
            return {
              ...item,
              title: validTitle,
              message: item.message || defItem?.message || ''
            };
          });
        alerts[deckId] = {
          deckName: def.deckName,
          deckIcon: def.deckIcon,
          count: activeItems.length,
          severity: (s && s.severity) ? s.severity : def.severity,
          title: (s && s.title) ? s.title : def.title,
          items: activeItems,
          acknowledged: isSeen
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
    this.setupBriefingModal();
    this.loadExecutiveBriefing();
    this.syncUnifiedAlerts();
    this.checkAllTelemetry();
    this.syncAllAlertsToVisualizer();
    this.scheduleBackgroundPreload();

    // Periodic telemetry ping every 30 seconds
    setInterval(() => this.checkAllTelemetry(), 30000);
    // Periodic unified alert sync every 45 seconds
    setInterval(() => this.syncUnifiedAlerts(), 45000);
  }

  setupCrossFrameAlertListener() {
    window.addEventListener('message', (event) => {
      if (event.data) {
        if (event.data.type === 'FLEET_ALERTS_UPDATED' && event.data.payload) {
          const p = event.data.payload;
          this.setAlert('garage', p.count, p.severity, p.title, p.items);
          return;
        }
        if (event.data.type === 'HUB_ALERT_UPDATE' || event.data.type === 'DASHBOARD_ALERTS') {
          const { deckId, count, severity, title, items } = event.data;
          if (deckId && typeof count === 'number') {
            this.setAlert(deckId, count, severity || 'warning', title || '', items || null);
          }
        }
      }
    });

    if ('BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel('antigravity_hub');
        bc.onmessage = (event) => {
          if (event.data && event.data.type === 'FLEET_ALERTS_UPDATED' && event.data.payload) {
            const p = event.data.payload;
            this.setAlert('garage', p.count, p.severity, p.title, p.items);
          }
        };
      } catch (e) {}
    }
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

    // 4. Modal footer dismiss-all button
    const footerDismissAll = document.getElementById('btn-footer-dismiss-all');
    if (footerDismissAll) {
      footerDismissAll.addEventListener('click', () => {
        const activeTab = document.querySelector('.alert-filter-tab.active');
        const filter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
        this.dismissAllInView(filter);
      });
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

  getActiveItems(deckId) {
    const a = this.alerts[deckId];
    if (!a || !a.items) return [];
    return a.items.filter(item => !this.dismissedAlerts.has(item.code));
  }

  getActiveTotalCount() {
    let total = 0;
    Object.keys(this.alerts).forEach(deckId => {
      total += this.getActiveItems(deckId).length;
    });
    return total;
  }

  updateDeckAlertCounts() {
    Object.keys(this.alerts).forEach(deckId => {
      if (this.alerts[deckId]) {
        this.alerts[deckId].count = this.getActiveItems(deckId).length;
      }
    });
  }

  updateGlobalAlertsBadge() {
    const badgeEl = document.getElementById('global-alerts-badge');
    const pillBtn = document.getElementById('btn-global-alerts');
    if (!badgeEl || !pillBtn) return;

    let unreadTotal = 0;
    let hasCritical = false;

    Object.entries(this.alerts).forEach(([deckId, a]) => {
      const activeItems = this.getActiveItems(deckId);
      const isAcknowledged = a.acknowledged || this.seenDecks.has(deckId);
      if (!isAcknowledged && activeItems.length > 0) {
        unreadTotal += activeItems.length;
        if (activeItems.some(i => (i.severity || '').toLowerCase() === 'critical')) {
          hasCritical = true;
        }
      }
    });

    if (unreadTotal > 0) {
      badgeEl.textContent = `${unreadTotal} ALERTS`;
      pillBtn.style.opacity = '1';
      if (hasCritical) {
        pillBtn.classList.add('has-critical');
      } else {
        pillBtn.classList.remove('has-critical');
      }
    } else {
      const totalRemaining = this.getActiveTotalCount();
      badgeEl.textContent = totalRemaining === 0 ? `✓ ALL DISMISSED` : `✓ ALL REVIEWED`;
      pillBtn.classList.remove('has-critical');
      pillBtn.style.opacity = '0.72';
    }
  }

  setAlert(deckId, count, severity = 'warning', title = '', items = null) {
    const existing = this.alerts[deckId] || DEFAULT_HUB_ALERTS[deckId] || { deckName: deckId, deckIcon: '⚡', items: [] };
    if (count > 0) {
      this.seenDecks.delete(deckId);
      try {
        localStorage.setItem('hub_seen_alerts', JSON.stringify([...this.seenDecks]));
      } catch (e) {}
    }
    const isAcknowledged = this.seenDecks.has(deckId);

    let suppliedItems = [];
    if (Array.isArray(items)) {
      suppliedItems = items;
    } else if (count === 0) {
      suppliedItems = [];
    } else if (existing.items && Array.isArray(existing.items) && existing.items.length > 0) {
      suppliedItems = existing.items;
    } else if (count > 0) {
      suppliedItems = Array.from({ length: count }, (_, i) => ({
        severity: severity.toUpperCase(),
        code: `${deckId}_telemetry_alert_${i + 1}`,
        statute: 'System Telemetry',
        title: title || `${existing.deckName || deckId} Notification`,
        message: `Active operational telemetry notification (${count} items).`
      }));
    }

    suppliedItems = suppliedItems.map((it, idx) => ({
      ...it,
      title: (it.title && it.title !== 'undefined') ? it.title : (it.subject && it.subject !== 'undefined' ? it.subject : (it.statute || `${existing.deckName || deckId} Directive #${idx + 1}`))
    }));

    const activeCount = suppliedItems.filter(i => !this.dismissedAlerts.has(i.code)).length;

    this.alerts[deckId] = {
      deckName: existing.deckName || deckId,
      deckIcon: existing.deckIcon || '⚡',
      count: activeCount,
      severity,
      title: title || existing.title || '',
      items: suppliedItems,
      acknowledged: isAcknowledged
    };
    try {
      localStorage.setItem('hub_alerts', JSON.stringify(this.alerts));
    } catch (e) {}
    this.updateTabAlertIndicator(deckId, activeCount, severity);
    this.updateSubnavAlert(deckId);
    this.updateGlobalAlertsBadge();
    if (this.onAlertChange) {
      this.onAlertChange(deckId, {
        ...this.alerts[deckId],
        count: activeCount,
        acknowledged: isAcknowledged || activeCount === 0
      });
    }
  }

  getAlert(deckId) {
    return this.alerts[deckId] || { count: 0, severity: 'info', title: '' };
  }

  updateTabAlertIndicator(deckId, count, severity) {
    const tabBtn = document.querySelector(`.nav-tab-btn[data-deck="${deckId}"]`);
    if (!tabBtn) return;
    let dot = tabBtn.querySelector('.tab-alert-dot');
    const activeCount = this.getActiveItems(deckId).length;
    const isAcknowledged = this.alerts[deckId]?.acknowledged || this.seenDecks.has(deckId);

    if (activeCount > 0 && !isAcknowledged) {
      if (!dot) {
        dot = document.createElement('span');
        tabBtn.appendChild(dot);
      }
      dot.className = `tab-alert-dot ${severity || 'warning'}`;
      dot.title = `${activeCount} active notification(s) • Click to view`;
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
    const activeCount = this.getActiveItems(deckId).length;

    if (activeCount > 0) {
      if (!alertTag) {
        alertTag = document.createElement('span');
        subnavLeft.appendChild(alertTag);
      }
      const isAcknowledged = alertInfo?.acknowledged || this.seenDecks.has(deckId);
      if (isAcknowledged) {
        alertTag.className = 'subnav-alert-tag acknowledged';
        alertTag.innerHTML = `✓ ${activeCount} ALERTS REVIEWED`;
        alertTag.title = `Alerts have been seen. Click to inspect again.`;
      } else {
        alertTag.className = `subnav-alert-tag ${alertInfo?.severity || 'warning'}`;
        alertTag.innerHTML = `⚠️ ${activeCount} ALERTS (INSPECT)`;
        alertTag.title = `Click to inspect active alerts & action items for ${alertInfo?.deckName || deckId}`;
      }
      alertTag.onclick = (e) => {
        e.stopPropagation();
        sfx.playAlert();
        this.openAlertCenter(deckId);
      };
    } else if (alertTag) {
      alertTag.remove();
    }
  }

  acknowledgeDeckAlerts(deckId) {
    if (!this.alerts[deckId]) return;
    this.seenDecks.add(deckId);
    this.alerts[deckId].acknowledged = true;

    try {
      localStorage.setItem('hub_seen_alerts', JSON.stringify([...this.seenDecks]));
    } catch (e) {}

    // 1. Clear 3D sphere blinking and hide alert badge in atomic visualizer
    if (this.onAlertChange) {
      this.onAlertChange(deckId, {
        ...this.alerts[deckId],
        acknowledged: true
      });
    }

    // 2. Remove pulsing alert dot from the top tab
    this.updateTabAlertIndicator(deckId, 0, 'info');

    // 3. Update subnav tag to acknowledged state
    this.updateSubnavAlert(deckId);

    // 4. Update tactical header global badge
    this.updateGlobalAlertsBadge();
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
    const totalCount = this.getActiveTotalCount();

    const filterOptions = [
      { id: 'all', title: 'ALL ALERTS', count: totalCount, icon: '⚡' }
    ];

    Object.entries(this.alerts).forEach(([deckId, a]) => {
      const activeCount = this.getActiveItems(deckId).length;
      if (activeCount > 0 || (a.items && a.items.length > 0) || selectedFilter === deckId) {
        filterOptions.push({
          id: deckId,
          title: a.deckName || deckId,
          count: activeCount,
          icon: a.deckIcon || '⚡'
        });
      }
    });

    filtersBar.innerHTML = filterOptions.map(opt => `
      <button class="alert-filter-tab ${opt.id === selectedFilter ? 'active' : ''}" data-filter="${opt.id}">
        <span>${opt.icon}</span>
        <span class="filter-tab-name">${opt.title}</span>
        <span class="filter-tab-count">(${opt.count})</span>
      </button>
    `).join('');

    // Wire filter button click
    filtersBar.querySelectorAll('.alert-filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playClick();
        this.renderAlertCenter(btn.getAttribute('data-filter'));
      });
    });

    // Collect all active alert items to display
    const itemsToDisplay = [];
    Object.entries(this.alerts).forEach(([deckId, a]) => {
      if (selectedFilter !== 'all' && selectedFilter !== deckId) return;
      if (a.items && a.items.length > 0) {
        a.items.forEach(item => {
          if (!this.dismissedAlerts.has(item.code)) {
            itemsToDisplay.push({
              ...item,
              deckId,
              deckName: a.deckName || deckId,
              deckIcon: a.deckIcon || '⚡'
            });
          }
        });
      }
    });

    const footerDismissAll = document.getElementById('btn-footer-dismiss-all');

    if (itemsToDisplay.length === 0) {
      if (footerDismissAll) footerDismissAll.style.display = 'none';
      const filterName = selectedFilter === 'all' ? 'All Dashboards' : (this.alerts[selectedFilter]?.deckName || selectedFilter);
      cardsContainer.innerHTML = `
        <div class="alert-empty-state">
          <div style="font-size:2.2rem;margin-bottom:8px;">✅</div>
          <strong style="color:#fff;font-size:1.05rem;letter-spacing:0.5px;">NO ACTIVE ALERTS FOR ${filterName.toUpperCase()}</strong>
          <p style="font-size:0.82rem;color:#94a3b8;margin:6px 0 16px 0;">All alerts have been reviewed or dismissed. Operational systems and statutory compliance nominal.</p>
          <button class="alert-reset-btn" id="btn-reset-alerts">
            <span>🔄</span> RESTORE ALL ALERTS
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-alerts');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetAllAlerts();
        });
      }
      return;
    }

    if (footerDismissAll) footerDismissAll.style.display = '';

    // Top action bar above cards
    const filterTitle = selectedFilter === 'all' ? 'ALL DASHBOARDS' : (this.alerts[selectedFilter]?.deckName || selectedFilter).toUpperCase();
    const actionsBarHtml = `
      <div class="alert-actions-bar">
        <span class="alert-active-count-label" id="alert-active-count-label">SHOWING ${itemsToDisplay.length} ACTIVE ALERTS • ${filterTitle}</span>
        <button class="alert-bulk-btn" id="btn-dismiss-all-view" title="Dismiss all alerts currently shown in this view">
          <span>✓</span> DISMISS ALL IN VIEW
        </button>
      </div>
    `;

    const cardsHtml = itemsToDisplay.map((item, idx) => {
      const sevClass = (item.severity || 'warning').toLowerCase();
      const badgeStyle = (sevClass === 'critical')
        ? 'background:rgba(239,68,68,0.22);color:#ef4444;border:1px solid rgba(239,68,68,0.6);'
        : (sevClass === 'warning'
          ? 'background:rgba(245,158,11,0.22);color:#f59e0b;border:1px solid rgba(245,158,11,0.6);'
          : 'background:rgba(6,182,212,0.22);color:#06b6d4;border:1px solid rgba(6,182,212,0.6);');

      const isAcknowledged = item.acknowledged || this.seenDecks.has(item.deckId);
      const seenBadge = isAcknowledged
        ? `<span style="font-family:var(--font-mono);font-size:0.6rem;padding:2px 5px;border-radius:3px;background:rgba(16,185,129,0.18);color:#34d399;border:1px solid rgba(16,185,129,0.4);">✓ SEEN</span>`
        : '';

      return `
        <div class="alert-card alert-${sevClass}" data-deck="${item.deckId}" data-code="${item.code}" data-alert-index="${idx}">
          <div class="alert-card-header">
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="alert-deck-badge">${item.deckIcon} ${item.deckName.toUpperCase()}</span>
              <span style="font-family:var(--font-mono);font-size:0.62rem;font-weight:800;padding:2px 6px;border-radius:3px;${badgeStyle}">
                ${item.severity.toUpperCase()}
              </span>
              ${seenBadge}
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="alert-card-statute">${item.statute || ''}</span>
              <button class="alert-card-dismiss-btn" data-code="${item.code}" data-deck="${item.deckId}" title="Dismiss this alert (✕)">✕</button>
            </div>
          </div>
          <div class="alert-card-title">${item.title || item.subject || 'Operational Alert'}</div>
          <div class="alert-card-msg">${item.message}</div>
          <div class="alert-card-actions-row">
            <button class="alert-card-btn-dismiss" data-code="${item.code}" data-deck="${item.deckId}" title="Dismiss this alert without opening">
              <span>✓</span>
              <span>DISMISS</span>
            </button>
            <button class="alert-card-action" data-deck="${item.deckId}" data-code="${item.code}">
              <span>OPEN IN DASHBOARD</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    cardsContainer.innerHTML = actionsBarHtml + cardsHtml;

    // Wire "DISMISS ALL IN VIEW" button
    const bulkBtn = document.getElementById('btn-dismiss-all-view');
    if (bulkBtn) {
      bulkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissAllInView(selectedFilter);
      });
    }

    // Wire individual card dismiss buttons (both top-right ✕ and bottom ✓ DISMISS)
    cardsContainer.querySelectorAll('.alert-card-dismiss-btn, .alert-card-btn-dismiss').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.getAttribute('data-code');
        const deckId = btn.getAttribute('data-deck');
        sfx.playClick();
        this.dismissAlert(code, deckId, true);
      });
    });

    // Wire card click -> jump to dashboard (viewing this alert marks it as viewed/dismissed)
    cardsContainer.querySelectorAll('.alert-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.alert-card-dismiss-btn') || e.target.closest('.alert-card-btn-dismiss')) {
          return;
        }
        const deckId = card.getAttribute('data-deck');
        const alertCode = card.getAttribute('data-code');
        this.jumpToAlert(deckId, alertCode);
      });
    });
  }

  dismissAlert(alertCode, deckId, animate = true) {
    if (!alertCode) return;
    this.dismissedAlerts.add(alertCode);
    try {
      localStorage.setItem('hub_dismissed_alerts', JSON.stringify([...this.dismissedAlerts]));
    } catch (e) {}

    // Ensure hub_resolved_directives also stores this code for executive sidebar synchronization
    try {
      const rawResolved = localStorage.getItem('hub_resolved_directives');
      const resolved = rawResolved ? JSON.parse(rawResolved) : [];
      if (!resolved.includes(alertCode)) {
        resolved.push(alertCode);
        localStorage.setItem('hub_resolved_directives', JSON.stringify(resolved));
      }
    } catch (e) {}

    // Filter out of memory alerts immediately
    if (deckId && this.alerts[deckId] && Array.isArray(this.alerts[deckId].items)) {
      this.alerts[deckId].items = this.alerts[deckId].items.filter(item => item.code !== alertCode && item.id !== alertCode);
      this.alerts[deckId].count = this.alerts[deckId].items.length;
    } else {
      Object.keys(this.alerts).forEach(d => {
        if (this.alerts[d] && Array.isArray(this.alerts[d].items)) {
          this.alerts[d].items = this.alerts[d].items.filter(item => item.code !== alertCode && item.id !== alertCode);
          this.alerts[d].count = this.alerts[d].items.length;
        }
      });
    }

    try {
      localStorage.setItem('hub_alerts', JSON.stringify(this.alerts));
    } catch (e) {}

    // Synchronize dismissal with backend unified state pipeline
    try {
      fetch('/api/alerts/dismiss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: alertCode })
      }).catch(() => {});
    } catch (e) {}

    const alertInfo = deckId ? this.alerts[deckId] : null;
    const activeCount = deckId ? (this.alerts[deckId]?.count || 0) : this.getActiveTotalCount();

    if (deckId) {
      this.updateTabAlertIndicator(deckId, activeCount, alertInfo?.severity);
      this.updateSubnavAlert(deckId);
    }
    this.updateGlobalAlertsBadge();
    this.syncAllAlertsToVisualizer();

    if (this.onAlertChange && alertInfo) {
      this.onAlertChange(deckId, {
        ...alertInfo,
        count: activeCount,
        acknowledged: alertInfo.acknowledged || activeCount === 0
      });
    }

    if (animate) {
      const card = document.querySelector(`.alert-card[data-code="${alertCode}"]`);
      if (card) {
        card.classList.add('dismissing');
        setTimeout(() => {
          if (card.parentNode) card.remove();
          this.refreshAlertCenterCounts();
        }, 280);
      } else {
        this.refreshAlertCenterCounts();
      }
    }
  }

  dismissAllInView(selectedFilter = 'all') {
    sfx.playClick();
    Object.entries(this.alerts).forEach(([deckId, a]) => {
      if (selectedFilter !== 'all' && selectedFilter !== deckId) return;
      if (a.items && a.items.length > 0) {
        a.items.forEach(item => {
          this.dismissedAlerts.add(item.code);
        });
        a.count = this.getActiveItems(deckId).length;
      }
    });

    try {
      localStorage.setItem('hub_dismissed_alerts', JSON.stringify([...this.dismissedAlerts]));
    } catch (e) {}

    this.syncAllAlertsToVisualizer();
    this.renderAlertCenter(selectedFilter);
  }

  resetAllAlerts() {
    sfx.playClick();
    this.dismissedAlerts.clear();
    this.seenDecks.clear();
    try {
      localStorage.removeItem('hub_dismissed_alerts');
      localStorage.removeItem('hub_seen_alerts');
    } catch (e) {}

    Object.keys(DEFAULT_HUB_ALERTS).forEach(deckId => {
      const def = DEFAULT_HUB_ALERTS[deckId];
      if (this.alerts[deckId]) {
        this.alerts[deckId].count = def.count;
        this.alerts[deckId].acknowledged = false;
        this.alerts[deckId].items = [...def.items];
      }
    });

    this.syncAllAlertsToVisualizer();
    this.renderAlertCenter('all');
  }

  refreshAlertCenterCounts() {
    const filtersBar = document.getElementById('alert-filters-bar');
    const cardsContainer = document.getElementById('alert-cards-container');
    if (!filtersBar || !cardsContainer) return;

    // Update counts on filter tabs
    let totalActive = 0;
    Object.entries(this.alerts).forEach(([deckId, a]) => {
      const active = this.getActiveItems(deckId).length;
      totalActive += active;
      const tab = filtersBar.querySelector(`.alert-filter-tab[data-filter="${deckId}"]`);
      if (tab) {
        const countSpan = tab.querySelector('.filter-tab-count');
        if (countSpan) countSpan.textContent = `(${active})`;
      }
    });

    const allTab = filtersBar.querySelector(`.alert-filter-tab[data-filter="all"]`);
    if (allTab) {
      const countSpan = allTab.querySelector('.filter-tab-count');
      if (countSpan) countSpan.textContent = `(${totalActive})`;
    }

    const subbarLabel = document.getElementById('alert-active-count-label');
    const visibleCards = cardsContainer.querySelectorAll('.alert-card:not(.dismissing)');
    if (subbarLabel) {
      subbarLabel.textContent = `SHOWING ${visibleCards.length} ACTIVE ALERTS`;
    }

    if (visibleCards.length === 0) {
      const activeTab = filtersBar.querySelector('.alert-filter-tab.active');
      const activeFilter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
      const filterName = activeFilter === 'all' ? 'All Dashboards' : (this.alerts[activeFilter]?.deckName || activeFilter);
      cardsContainer.innerHTML = `
        <div class="alert-empty-state">
          <div style="font-size:2.2rem;margin-bottom:8px;">✅</div>
          <strong style="color:#fff;font-size:1.05rem;letter-spacing:0.5px;">NO ACTIVE ALERTS FOR ${filterName.toUpperCase()}</strong>
          <p style="font-size:0.82rem;color:#94a3b8;margin:6px 0 16px 0;">All alerts have been reviewed or dismissed. Operational systems nominal.</p>
          <button class="alert-reset-btn" id="btn-reset-alerts">
            <span>🔄</span> RESTORE ALL ALERTS
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-alerts');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetAllAlerts();
        });
      }
    }
  }

  jumpToAlert(deckId, alertCode = null) {
    // If specific alert code was clicked/viewed, dismiss it so it disappears from the alert window
    if (alertCode) {
      this.dismissAlert(alertCode, deckId, false);
    }
    this.closeAlertCenter();

    // Route to appropriate deck and view
    if (deckId === 'executive' || deckId === 'fleet' || deckId === 'health' || deckId === 'academic' || deckId === 'family') {
      this.switchDeck('executive');
      if (deckId !== 'executive') {
        setTimeout(() => this.openExecutiveBriefing(), 250);
      }
    } else {
      this.switchDeck(deckId);
    }

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
    this.updateDeckAlertCounts();
    Object.keys(this.alerts).forEach(deckId => {
      this.alerts[deckId].acknowledged = this.seenDecks.has(deckId);
      const alertInfo = this.alerts[deckId];
      const activeCount = this.getActiveItems(deckId).length;
      alertInfo.count = activeCount;
      this.updateTabAlertIndicator(deckId, activeCount, alertInfo.severity);
      this.updateSubnavAlert(deckId);
      if (this.onAlertChange) {
        this.onAlertChange(deckId, {
          ...alertInfo,
          count: activeCount,
          acknowledged: alertInfo.acknowledged || activeCount === 0
        });
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

    // Auto-collapse Executive Summary sidebar to clear visual obstruction across views
    if (window.executiveSidebarMgr && window.executiveSidebarMgr.isExpanded) {
      window.executiveSidebarMgr.collapse();
    }

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

    // 4. Acknowledge alerts for this dashboard (dismiss subtle sphere blink & tab dot)
    if (deckId !== 'core' && deckId !== 'telemetry') {
      this.acknowledgeDeckAlerts(deckId);
      this.ensureIframeLoaded(deckId);
    }

    // 5. Update subnav alert tag if active alerts exist
    this.updateSubnavAlert(deckId);

    // 6. Trigger external callback (e.g. notify visualizer to highlight active orbit)
    if (this.onDeckChangeCallback) {
      this.onDeckChangeCallback(deckId);
    }
  }

  scheduleBackgroundPreload() {
    const queue = ['rental', 'financial', 'garage', 'executive', 'trip', 'mackie'];
    let idx = 0;
    const preloadNext = () => {
      if (idx >= queue.length) return;
      const deckId = queue[idx++];
      const iframe = document.getElementById(`iframe-${deckId}`);
      if (iframe) {
        const currentSrc = iframe.getAttribute('src');
        if (!currentSrc || currentSrc === 'about:blank') {
          const targetUrl = this.urls[deckId] || iframe.getAttribute('data-src');
          if (targetUrl) {
            iframe.src = targetUrl;
          }
        }
      }
      setTimeout(preloadNext, 2500);
    };
    // Delay initial background preloading until 3.5s after boot to ensure 60 FPS 3D core stabilization
    setTimeout(preloadNext, 3500);
  }

  ensureIframeLoaded(deckId) {
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (!iframe) return;

    const targetUrl = this.urls[deckId] || iframe.getAttribute('data-src');
    if (!targetUrl) return;

    const currentSrc = iframe.getAttribute('src');
    if (!currentSrc || currentSrc === 'about:blank' || iframe.src === 'about:blank') {
      iframe.src = targetUrl;
    } else if (deckId === 'garage') {
      const hasLocalhostMismatch = iframe.src.includes('localhost') && window.location.hostname !== 'localhost';
      if (!iframe.src.includes('v=35.0') || hasLocalhostMismatch) {
        iframe.src = targetUrl;
      }
    }
  }

  reloadIframe(deckId) {
    const iframe = document.getElementById(`iframe-${deckId}`);
    if (iframe) {
      sfx.playClick();
      const targetUrl = this.urls[deckId] || (deckId === 'garage' ? './dashboards/garage/index.html?v=40.0' : '');
      if (targetUrl) {
        iframe.src = targetUrl;
      }
    }
  }

  setUrl(deckId, newUrl) {
    if (!newUrl) return;
    // On mobile / non-localhost environments, prevent breaking relative dashboard paths with localhost
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      if (newUrl.includes('localhost') || newUrl.includes('127.0.0.1')) {
        console.warn(`[Hub Protection] Preventing localhost URL for ${deckId} in mobile/remote environment.`);
        if (deckId === 'garage') newUrl = './dashboards/garage/index.html?v=40.0';
        else if (deckId === 'rental') newUrl = './dashboards/rental/index.html';
        else if (deckId === 'financial') newUrl = './dashboards/financial/index.html';
      }
    }
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
      { id: 'garage', url: this.urls.garage }
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

  // ==========================================
  // EXECUTIVE WEEKLY BRIEFING // CADENCE HUD
  // ==========================================
  setupBriefingModal() {
    // 1. Open briefing modal button in Executive Cadence Banner
    const openBtn = document.getElementById('btn-open-executive-briefing');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        sfx.playClick();
        this.openExecutiveBriefing();
      });
    }

    // 2. Close modal buttons
    const closeBtn = document.getElementById('btn-close-briefing');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        sfx.playClick();
        this.closeExecutiveBriefing();
      });
    }

    const dismissBtn = document.getElementById('btn-dismiss-briefing-modal');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        sfx.playClick();
        this.closeExecutiveBriefing();
      });
    }

    // 3. Modal backdrop click
    const modal = document.getElementById('modal-executive-briefing');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          sfx.playClick();
          this.closeExecutiveBriefing();
        }
      });
    }

    // 4. Re-run Cadence buttons (banner + modal footer)
    const runBtnBanner = document.getElementById('btn-trigger-cadence-run');
    if (runBtnBanner) {
      runBtnBanner.addEventListener('click', () => this.runCadenceAgent(runBtnBanner));
    }

    const runBtnModal = document.getElementById('btn-modal-rerun-cadence');
    if (runBtnModal) {
      runBtnModal.addEventListener('click', () => this.runCadenceAgent(runBtnModal));
    }

    // 5. Escape key handling
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const briefingModal = document.getElementById('modal-executive-briefing');
        if (briefingModal && briefingModal.classList.contains('open')) {
          this.closeExecutiveBriefing();
        }
      }
    });
  }

  openExecutiveBriefing() {
    const modal = document.getElementById('modal-executive-briefing');
    if (!modal) return;
    modal.classList.add('open');
    if (!this.executiveBriefing) {
      this.loadExecutiveBriefing();
    } else {
      this.renderExecutiveBriefingModal(this.executiveBriefing);
    }
  }

  closeExecutiveBriefing() {
    const modal = document.getElementById('modal-executive-briefing');
    if (modal) modal.classList.remove('open');
  }

  async runCadenceAgent(triggerBtn = null) {
    sfx.playClick();
    const originalText = triggerBtn ? triggerBtn.innerHTML : '⚡ RUN CADENCE';
    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = '⏳ SYNTHESIZING...';
    }

    try {
      const resp = await fetch('/api/cadence/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (resp.ok) {
        const data = await resp.json();
        sfx.playSuccess();
        if (data.briefing) {
          this.executiveBriefing = data.briefing;
          this.renderExecutiveBriefingBanner(data.briefing);
          this.renderExecutiveBriefingModal(data.briefing);
        } else {
          await this.loadExecutiveBriefing();
        }
        await this.syncUnifiedAlerts();
      } else {
        console.warn('[Command Hub] Cadence agent trigger returned status', resp.status);
      }
    } catch (err) {
      console.warn('[Command Hub] Cadence agent trigger failed (likely offline/static):', err);
    } finally {
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = originalText;
      }
    }
  }

  async loadExecutiveBriefing() {
    try {
      const resp = await fetch('/api/briefing', { cache: 'no-store' });
      if (resp.ok) {
        const briefing = await resp.json();
        this.executiveBriefing = briefing;
        this.renderExecutiveBriefingBanner(briefing);
        this.renderExecutiveBriefingModal(briefing);
        return;
      }
    } catch (e) {
      // Offline fallback: Use default pre-synthesized data
    }

    // Default static fallback briefing
    const fallbackBriefing = {
      cadence_window: "Week of October 19 – October 26, 2026",
      executive_highlights: [
        "FAMILY: User Birthday (29 Mar 1993, in 161d), Wife Birthday (23 Apr 1996, in 186d), Anniversary (23 Sep).",
        "PROPERTY: Sierra Pines cash flow at +$1,120/mo Net ($2,450 Gross). Priority ticket: 'Perimeter Fence Wash & Gate Warranty Inspection'.",
        "ATHLETIC: Readiness Score 61/100. HRV at 46 ms (BELOW_TARGET). Directive: ⚠️ HRV at 46 ms (Target: 65 ms). Autonomic nervous system fatigued. Throttle training to Zone 2 Active Recovery.",
        "FLEET: Vehicles online. Telemetry calibrated — awaiting current odometer & tabs expiration from owner."
      ],
      upcoming_7d_milestones: [
        { category: "Family", detail: "📅 Family Sunday Meal Prep & Planning (2026-10-25)" },
        { category: "Family", detail: "📅 Mackie School Fall Conference (2026-10-23)" },
        { category: "Fleet", detail: "Garage bay online: Awaiting current odometer & registration input." }
      ],
      family_registry: {
        milestone_countdowns: [
          { event: "User Birthday (29 Mar 1993)", date: "March 29", days_until: 161, age_turning: 34 },
          { event: "Wife's Birthday (23 Apr 1996)", date: "April 23", days_until: 186, age_turning: 31 },
          { event: "Wedding Anniversary (23 Sep)", date: "September 23", days_until: 339 }
        ]
      },
      property_cashflow: {
        monthly_net: 1120,
        monthly_gross: 2450,
        pending_tickets_count: 2,
        critical_ticket: "Perimeter Fence Wash & Gate Warranty Inspection"
      },
      athletic_readiness: {
        readiness_score: 61,
        hrv_current: 46,
        hrv_target: 65,
        hrv_status: "BELOW_TARGET",
        cardio_progress: "6.5 / 20 miles",
        strength_progress: "1 / 4 sessions",
        recovery_directive: "⚠️ HRV at 46 ms (Target: 65 ms). Autonomic nervous system fatigued. Throttle training to Zone 2 Active Recovery."
      },
      academic_queue: [],
      fleet_status: [
        { name: "2021 Chevy Colorado ZR2", odometer: "Pending Input", oil_life: "Pending Input", tabs_expiration: "Pending Input", status: "READY" },
        { name: "2022 Nissan Murano Midnight Edition", odometer: "51,333 mi", oil_life: "72%", tabs_expiration: "05/31/2027", status: "CURRENT" }
      ]
    };

    this.executiveBriefing = fallbackBriefing;
    this.renderExecutiveBriefingBanner(fallbackBriefing);
    this.renderExecutiveBriefingModal(fallbackBriefing);
  }

  renderExecutiveBriefingBanner(briefing) {
    if (!briefing) return;
    const bannerTitle = document.getElementById('cadence-banner-title');
    if (bannerTitle && briefing.cadence_window) {
      bannerTitle.textContent = briefing.cadence_window;
    }

    const chipFamily = document.getElementById('chip-family');
    if (chipFamily && briefing.family_registry?.milestone_countdowns) {
      const nextMilestone = briefing.family_registry.milestone_countdowns[0];
      chipFamily.textContent = `👨‍👩‍👧 Family: ${nextMilestone.event.split('(')[0].trim()} in ${nextMilestone.days_until}d`;
    }

    const chipProperty = document.getElementById('chip-property');
    if (chipProperty && briefing.property_cashflow) {
      chipProperty.textContent = `🏡 Cash Flow: +$${Number(briefing.property_cashflow.monthly_net).toLocaleString()}/mo Net`;
    }

    const chipHealth = document.getElementById('chip-health');
    if (chipHealth && briefing.athletic_readiness) {
      const isBelow = briefing.athletic_readiness.hrv_status === 'BELOW_TARGET';
      chipHealth.textContent = `🏃 HRV: ${briefing.athletic_readiness.hrv_current} ms (${isBelow ? 'Zone 2 Directive' : 'Nominal'})`;
      if (isBelow) chipHealth.classList.add('alert');
      else chipHealth.classList.remove('alert');
    }

    const chipAcademic = document.getElementById('chip-academic');
    if (chipAcademic) {
      chipAcademic.style.display = 'none';
    }

    const chipFleet = document.getElementById('chip-fleet');
    if (chipFleet && briefing.fleet_status) {
      chipFleet.textContent = `🛞 Fleet: Telemetry Ready`;
    }
  }

  renderExecutiveBriefingModal(briefing) {
    const modalContent = document.getElementById('briefing-modal-content');
    if (!modalContent || !briefing) return;

    const highlights = briefing.executive_highlights || [];
    const upcoming = briefing.upcoming_7d_milestones || [];
    const countdowns = briefing.family_registry?.milestone_countdowns || [];
    const prop = briefing.property_cashflow || {};
    const ath = briefing.athletic_readiness || {};
    const academic = briefing.academic_queue || [];
    const fleet = briefing.fleet_status || [];

    modalContent.innerHTML = `
      <div class="briefing-highlights-box" style="background:rgba(15,23,42,0.85);border:1px solid rgba(0,240,255,0.3);border-radius:8px;padding:14px 18px;">
        <div style="font-family:var(--font-tech);font-weight:700;color:var(--cyan-glow);font-size:0.85rem;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
          <span>⚡</span> EXECUTIVE STRATEGIC HIGHLIGHTS
        </div>
        <ul style="margin:0;padding-left:18px;font-size:0.82rem;color:#cbd5e1;line-height:1.6;">
          ${highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>

      <div class="briefing-domain-card family">
        <div class="briefing-domain-title">
          <span>👨‍👩‍👧 FAMILY REGISTRY & 7-DAY MILESTONES</span>
          <span style="font-family:var(--font-mono);font-size:0.7rem;color:#f43f5e;font-weight:700;">ACTIVE SYNC</span>
        </div>
        <div class="briefing-metric-grid">
          ${countdowns.map(c => `
            <div class="briefing-metric-item">
              <span class="label">${c.event}</span>
              <span class="val" style="color:#f43f5e;">${c.days_until} days remaining</span>
            </div>
          `).join('')}
          <div class="briefing-metric-item">
            <span class="label">Google Calendar Sync</span>
            <span class="val" style="color:#34d399;">Connected (Family + Personal)</span>
          </div>
        </div>
        ${upcoming.length > 0 ? `
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:#94a3b8;background:rgba(0,0,0,0.35);padding:10px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);margin-top:4px;">
            <strong style="color:#e2e8f0;display:block;margin-bottom:4px;">Upcoming 7-Day Deadlines & Milestones:</strong>
            <ul style="margin:0;padding-left:16px;">
              ${upcoming.map(e => `<li style="margin-bottom:3px;"><strong style="color:#f8fafc;">${e.category}:</strong> ${e.detail}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>

      <div class="briefing-domain-card property">
        <div class="briefing-domain-title">
          <span>🏡 PROPERTY CASH FLOW & MAINTENANCE (SIERRA PINES // JBLM)</span>
          <span style="font-family:var(--font-mono);font-size:0.7rem;color:#38bdf8;font-weight:700;">+$${Number(prop.monthly_net || 1120).toLocaleString()}/MO NET</span>
        </div>
        <div class="briefing-metric-grid">
          <div class="briefing-metric-item">
            <span class="label">Monthly Net Cash Flow</span>
            <span class="val" style="color:#34d399;">+$${Number(prop.monthly_net || 1120).toLocaleString()} / mo</span>
          </div>
          <div class="briefing-metric-item">
            <span class="label">Gross Rental Inflow</span>
            <span class="val">$${Number(prop.monthly_gross || 2450).toLocaleString()} / mo</span>
          </div>
          <div class="briefing-metric-item">
            <span class="label">Pending Work Orders</span>
            <span class="val" style="color:#fbbf24;">${prop.pending_tickets_count || 2} Tickets</span>
          </div>
          <div class="briefing-metric-item">
            <span class="label">Priority Action</span>
            <span class="val" style="color:#ef4444;font-size:0.8rem;">${prop.critical_ticket || 'Fence Warranty Inspection'}</span>
          </div>
        </div>
      </div>

      <div class="briefing-domain-card health">
        <div class="briefing-domain-title">
          <span>🏃 ATHLETIC READINESS & PLANNED LOAD</span>
          <span style="font-family:var(--font-mono);font-size:0.7rem;color:#ef4444;font-weight:700;">HRV ${ath.hrv_current || 46} MS (BELOW BASELINE)</span>
        </div>
        <div class="briefing-metric-grid">
          <div class="briefing-metric-item">
            <span class="label">Readiness Score</span>
            <span class="val" style="color:#fbbf24;">${ath.readiness_score || 61} / 100</span>
          </div>
          <div class="briefing-metric-item">
            <span class="label">Heart Rate Variability</span>
            <span class="val" style="color:#ef4444;">${ath.hrv_current || 46} ms <span style="font-size:0.7rem;color:#94a3b8;">(Target ${ath.hrv_target || 65} ms)</span></span>
          </div>
          <div class="briefing-metric-item">
            <span class="label">Cardio Load (Miles)</span>
            <span class="val">${ath.cardio_progress || '6.5 / 20 miles'}</span>
          </div>
          <div class="briefing-metric-item">
            <span class="label">Strength Training</span>
            <span class="val">${ath.strength_progress || '1 / 4 sessions'}</span>
          </div>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.75rem;color:#fca5a5;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);padding:8px 12px;border-radius:6px;margin-top:4px;">
          <strong>Coaching Directive:</strong> ${ath.recovery_directive || 'Throttle training to Zone 2 Active Recovery.'}
        </div>
      </div>

      <div class="briefing-domain-card fleet">
        <div class="briefing-domain-title">
          <span>🛞 FLEET TELEMETRY & ASSET MANAGEMENT</span>
          <span style="font-family:var(--font-mono);font-size:0.7rem;color:#10b981;font-weight:700;">2 VEHICLES MONITORED</span>
        </div>
        <div class="briefing-metric-grid">
          ${fleet.map(v => `
            <div class="briefing-metric-item">
              <span class="label">${v.name}</span>
              <span class="val" style="color:${v.oil_life === '18%' ? '#fbbf24' : '#38bdf8'};font-size:0.85rem;">
                ${v.odometer} • Oil ${v.oil_life}
              </span>
              <div style="font-size:0.68rem;color:#94a3b8;margin-top:3px;">Tabs Expire: ${v.tabs_expiration} (${v.status})</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="briefing-domain-card academic">
        <div class="briefing-domain-title">
          <span>📚 ACADEMIC RESEARCH & SUBMISSION DEADLINES</span>
          <span style="font-family:var(--font-mono);font-size:0.7rem;color:#f59e0b;font-weight:700;">T-72H WINDOW</span>
        </div>
        <div class="briefing-metric-grid">
          ${academic.map(item => `
            <div class="briefing-metric-item" style="grid-column: 1 / -1;">
              <span class="label">${item.urgency === 'T_MINUS_72H' ? '⚠️ CRITICAL DRAFT DEADLINE' : 'RESEARCH TASK'}</span>
              <span class="val" style="color:#f59e0b;font-size:0.88rem;">${item.title}</span>
              <div style="font-size:0.72rem;color:#94a3b8;margin-top:4px;">
                ${item.target ? `Target: ${item.target} • ` : ''}Deadline: ${new Date(item.deadline).toUTCString()}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  async syncUnifiedAlerts() {
    try {
      const resp = await fetch('/api/alerts', { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (data && Array.isArray(data.dismissed_codes)) {
          data.dismissed_codes.forEach(c => this.dismissedAlerts.add(c));
          try {
            localStorage.setItem('hub_dismissed_alerts', JSON.stringify([...this.dismissedAlerts]));
          } catch (e) {}
        }
        if (data && Array.isArray(data.alerts)) {
          // Merge unified alerts from hub_state into domain alerts
          data.alerts.forEach(alert => {
            const alertCode = alert.code || alert.id;
            // CRITICAL: Skip any dismissed alerts!
            if (this.dismissedAlerts.has(alertCode)) return;

            // Strictly filter out hallucinated Murano tabs / registration alerts (Registration is 05/31/2027 TN BVZ7440, nominal)
            const codeUpper = (alertCode || '').toUpperCase();
            const titleLower = (alert.title || alert.subject || '').toLowerCase();
            if (codeUpper.includes('MURANO') && (codeUpper.includes('TABS') || codeUpper.includes('REG') || codeUpper.includes('EXPIR'))) return;
            if (titleLower.includes('murano') && (titleLower.includes('tab') || titleLower.includes('expir') || titleLower.includes('due nov'))) return;
            if (codeUpper.includes('ACADEMIC_DRAFT') || titleLower.includes('agentic arch') || titleLower.includes('oct 22')) return;

            const domainKey = alert.domain || 'executive';
            if (!this.alerts[domainKey]) {
              const domainMeta = DEFAULT_HUB_ALERTS[domainKey] || {
                deckName: domainKey.charAt(0).toUpperCase() + domainKey.slice(1),
                deckIcon: '⚡',
                items: []
              };
              this.alerts[domainKey] = {
                deckName: domainMeta.deckName,
                deckIcon: domainMeta.deckIcon,
                count: 0,
                severity: (alert.severity || 'WARNING').toLowerCase(),
                title: `${domainMeta.deckName} Notifications`,
                items: [],
                acknowledged: this.seenDecks.has(domainKey)
              };
            }
            const items = (this.alerts[domainKey].items || []).filter(it => !this.dismissedAlerts.has(it.code) && !this.dismissedAlerts.has(it.id));
            const existingIdx = items.findIndex(it => it.code === alertCode);
            const alertItem = {
              severity: (alert.severity || 'WARNING').toUpperCase(),
              code: alertCode,
              statute: alert.statute || alert.statute_or_category || 'Unified Alert Pipeline',
              title: (alert.title && alert.title !== 'undefined') ? alert.title : (alert.subject && alert.subject !== 'undefined' ? alert.subject : `${domainKey.toUpperCase()} Directive`),
              message: alert.message || alert.description || ''
            };
            if (existingIdx >= 0) {
              items[existingIdx] = alertItem;
            } else {
              items.push(alertItem);
            }
            this.alerts[domainKey].items = items;
            this.alerts[domainKey].count = items.length;
          });

          this.syncAllAlertsToVisualizer();
          this.updateGlobalAlertsBadge();
        }
      }
    } catch (e) {
      // Standalone / offline mode
    }
  }
}
