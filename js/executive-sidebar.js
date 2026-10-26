/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Executive Summary Sidebar Orchestrator
 * Fixed, collapsible right-hand operations HUD providing unified
 * Priority Directives (Life Ops) and Platform Diagnostics & Backlog.
 */

import { sfx } from './sound-effects.js';
import { enrichAlertCountdown } from './date-utils.js';

export const PLATFORM_DIAGNOSTICS_DATA = [
  {
    id: 'diag-001',
    category: 'PERFORMANCE FIX',
    categoryClass: 'cat-fix',
    origin: 'Garage 3D Viewport',
    deckId: 'garage',
    timestamp: '2026-10-19 17:15 UTC',
    title: 'Fix 3D Garage Lag',
    technicalTitle: 'WebGL Context Re-Acquisition Delay',
    description: 'Speeds up loading when switching between 3D view and photo mode on your phone or laptop.',
    technicalDescription: 'Three.js canvas context rebuild delay (~120ms) observed when toggling between 2D Photo Studio and 3D Interactive Bay on mobile WebGL2 runtimes.',
    status: 'ACTIVE_INVESTIGATION',
    assignedAgent: 'scene-architect'
  },
  {
    id: 'diag-002',
    category: 'ACTION REQUIRED',
    categoryClass: 'cat-regression',
    origin: 'Rental Ledger & JBLM Terminal',
    deckId: 'rental',
    timestamp: '2026-10-19 16:40 UTC',
    title: 'Rental Fence Warranty Expiring',
    technicalTitle: 'Clause Q Workmanship Warranty Expiration',
    description: 'Superior Fence warranty ends today. Check the new fence and upload gate latch photos.',
    technicalDescription: 'Superior Fence & Rail workmanship warranty reached T-0d expiration. Inspection checklist and gate latch photos pending upload.',
    status: 'ACTION_MANDATORY',
    assignedAgent: 'property-ops-cadence'
  },
  {
    id: 'diag-003',
    category: 'NEW FEATURE',
    categoryClass: 'cat-feature',
    origin: 'Fleet Telemetry Console',
    deckId: 'garage',
    timestamp: '2026-10-19 14:22 UTC',
    title: 'Wireless Car Diagnostics (OBD-II)',
    technicalTitle: 'OBD-II Bluetooth BLE Stream Integration',
    description: 'Connect phone to Chevy Colorado & Nissan Murano via Bluetooth to track transmission fluid temperature live.',
    technicalDescription: 'Ingest real-time ELM327 BLE telemetry stream for Chevy Colorado ZR2 & Nissan Murano to track transmission fluid thermal decay.',
    status: 'BACKLOG_PRIORITY',
    assignedAgent: 'telemetry-ingest'
  },
  {
    id: 'diag-005',
    category: 'NEW FEATURE',
    categoryClass: 'cat-feature',
    origin: 'Executive Cadence Engine',
    deckId: 'executive',
    timestamp: '2026-10-18 18:00 UTC',
    title: 'Sunday Weekly Summary Automation',
    technicalTitle: 'Automated Sunday 18:00 Encrypted Briefing Dispatch',
    description: 'Automatically send your consolidated family & operations summary every Sunday at 6:00 PM.',
    technicalDescription: 'Executive Cadence Agent should generate and dispatch an encrypted markdown & PDF summary to family operations channel at 18:05 EST.',
    status: 'BACKLOG_REVIEW',
    assignedAgent: 'executive-cadence-agent'
  },
  {
    id: 'diag-006',
    category: 'DISPLAY FIX',
    categoryClass: 'cat-fix',
    origin: 'Galaxy Z Fold 8 Viewport',
    deckId: 'core',
    timestamp: '2026-10-18 09:30 UTC',
    title: 'Galaxy Z Fold 8 Screen Optimization',
    technicalTitle: 'Dynamic Safe-Area Viewport Transition',
    description: 'Fix screen glitch and smooth out the view when unfolding or folding your Z Fold 8.',
    technicalDescription: 'Fold/unfold sensor orientation event triggers double reflow on Android Chrome before locking aspect ratio 1.08:1.',
    status: 'TRIAGED',
    assignedAgent: 'device-optimizer'
  }
];

export const AGENT_ROUTING_MAP = {
  'diag-001': {
    targetAgent: 'scene-architect',
    modelTier: 'flash',
    priority: 'HIGH',
    contextParameters: {
      subsystem: 'Three.js / WebGL2 Context',
      targetFiles: ['js/atomic-core.js', 'dashboards/garage/src/components/garage/ThreeDGarageScene.jsx'],
      issue: 'WebGL context reacquisition delay on mobile/desktop mode toggle'
    }
  },
  'diag-003': {
    targetAgent: 'telemetry-ingest',
    modelTier: 'flash_lite',
    priority: 'HIGH',
    contextParameters: {
      subsystem: 'OBD-II / ELM327 BLE Adapter',
      targetFiles: ['src/services/telemetry/obd2TelemetrySchema.js', 'src/services/telemetry/telemetryService.js'],
      issue: 'BLE stream ingestion for GM & Nissan transmission fluid thermal telemetry'
    }
  },
  'diag-002': {
    targetAgent: 'property-ops-cadence',
    modelTier: 'flash_lite',
    priority: 'HIGH',
    contextParameters: {
      subsystem: 'Rental Asset Warranty',
      targetFiles: ['dashboards/rental/index.html'],
      issue: 'Clause Q workmanship warranty expiration checklist & gate latch proof'
    }
  },
  'diag-005': {
    targetAgent: 'executive-cadence-agent',
    modelTier: 'flash',
    priority: 'MEDIUM',
    contextParameters: {
      subsystem: 'Executive Cadence Engine',
      targetFiles: ['agents/weekly_cadence_agent.py', 'server.js'],
      issue: 'Automated Sunday 18:00 encrypted briefing dispatch'
    }
  },
  'diag-006': {
    targetAgent: 'device-optimizer',
    modelTier: 'flash_lite',
    priority: 'LOW',
    contextParameters: {
      subsystem: 'Galaxy Z Fold 8 Viewport Engine',
      targetFiles: ['js/device-optimizer.js'],
      issue: 'Dynamic safe-area viewport fold/unfold double reflow'
    }
  }
};

export const TILE_METADATA = {
  garage: { name: 'GARAGE & FLEET', icon: '🔧', color: '#f59e0b' },
  rental: { name: 'RENTAL OPS', icon: '🏠', color: '#38bdf8' },
  financial: { name: 'WEALTH & ASSETS', icon: '📈', color: '#8b5cf6' },
  trip: { name: 'RAINIER BASECAMP', icon: '🏔️', color: '#10b981' },
  mackie: { name: "MACKIE'S BOARD", icon: '🎯', color: '#f43f5e' },
  executive: { name: 'EXECUTIVE CADENCE', icon: '⭐', color: '#00f0ff' },
  core: { name: 'COMMAND PLATFORM', icon: '🌌', color: '#6366f1' },
  health: { name: 'HEALTH & READINESS', icon: '❤️', color: '#10b981' },
  family: { name: 'FAMILY OPERATIONS', icon: '👨‍👩‍👧', color: '#f43f5e' }
};

export class ExecutiveSidebarManager {
  constructor(options = {}) {
    this.visualizer = options.visualizer || null;
    this.dashboardMgr = options.dashboardMgr || null;
    
    // Global reference for outside modules & diagnostics
    window.executiveSidebarMgr = this;

    // Default open on wide desktop screens (>= 1400px), collapsed on smaller displays
    this.isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1400 : true;
    this.isExpanded = this.isDesktop;
    this.currentStream = 'directives'; // 'directives' | 'diagnostics'
    this.currentFilter = 'all';        // 'all' | 'P0' | 'P1' | 'INFO'
    
    this.diagnostics = [...PLATFORM_DIAGNOSTICS_DATA];
    
    // Persistent resolved & acknowledged directives
    try {
      const rawResolved = localStorage.getItem('hub_resolved_directives');
      this.resolvedCodes = rawResolved ? new Set(JSON.parse(rawResolved)) : new Set();
    } catch (e) {
      this.resolvedCodes = new Set();
    }

    try {
      const rawDismissed = localStorage.getItem('hub_dismissed_alerts');
      if (rawDismissed) {
        JSON.parse(rawDismissed).forEach(c => this.resolvedCodes.add(c));
      }
    } catch (e) {}

    try {
      const rawAck = localStorage.getItem('hub_acknowledged_directives');
      this.acknowledgedCodes = rawAck ? new Set(JSON.parse(rawAck)) : new Set();
    } catch (e) {
      this.acknowledgedCodes = new Set();
    }

    // Persistent C2 actions & backlog state rehydration
    try {
      this.dispatchedTasks = JSON.parse(localStorage.getItem('c2-actions') || '[]');
    } catch (e) {
      this.dispatchedTasks = [];
    }

    try {
      this.backlogItems = JSON.parse(localStorage.getItem('hub_platform_backlog_items') || '[]');
    } catch (e) {
      this.backlogItems = [];
    }

    // Handled & Denied items persistence so actioned items remain disappeared
    try {
      this.handledItems = new Set(JSON.parse(localStorage.getItem('hub_handled_diagnostics') || '[]'));
    } catch (e) {
      this.handledItems = new Set();
    }

    try {
      this.deniedItems = new Set(JSON.parse(localStorage.getItem('hub_denied_diagnostics') || '[]'));
    } catch (e) {
      this.deniedItems = new Set();
    }

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('antigravity_c2_actions');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'TASK_DISPATCHED') {
            try {
              this.dispatchedTasks = JSON.parse(localStorage.getItem('c2-actions') || '[]');
              this.render();
            } catch (e) {}
          }
        };
      } catch (e) {}
    }

    this.container = null;
    this.backdrop = null;

    this.init();
  }

  init() {
    this.container = document.getElementById('executive-sidebar');
    this.backdrop = document.getElementById('sidebar-backdrop');
    if (!this.container) return;

    // Apply initial state
    this.applyExpandedState(false);

    // Bind Expand/Collapse buttons
    this.setupToggleControls();

    // Bind Stream & Filter Tabs
    this.setupStreamTabs();

    // Setup outside click listener for automatic collapse
    this.setupOutsideClickListener();

    // Initialize Floating HUD Action Log Dock
    this.initC2ActionDock();

    // Bind Responsive Resize listener
    window.addEventListener('resize', () => this.handleResize());

    // Flush any pending tasks from mobile/GitHub Pages sync to local disk
    this.syncPendingActions();

    // Clear any lingering orbital hover highlights if mouse exits sidebar entirely
    this.container.addEventListener('mouseleave', () => {
      if (this.visualizer && typeof this.visualizer.clearAllPulseSpheres === 'function') {
        this.visualizer.clearAllPulseSpheres();
      }
    });

    // Initial render
    this.render();
  }

  async syncPendingActions() {
    try {
      const pendingStr = localStorage.getItem('hub_pending_antigravity_sync');
      if (!pendingStr) return;
      const pending = JSON.parse(pendingStr);
      if (!Array.isArray(pending) || pending.length === 0) return;

      console.log(`[Antigravity Sync] Synchronizing ${pending.length} pending actions with project folder...`);
      const remaining = [];
      for (const item of pending) {
        try {
          const res = await fetch(item.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.payload)
          });
          if (!res.ok) {
            remaining.push(item);
          }
        } catch (e) {
          remaining.push(item);
        }
      }
      if (remaining.length === 0) {
        localStorage.removeItem('hub_pending_antigravity_sync');
        console.log('[Antigravity Sync] All pending actions synchronized successfully.');
      } else {
        localStorage.setItem('hub_pending_antigravity_sync', JSON.stringify(remaining));
      }
    } catch (e) {}
  }

  async postToAntigravityServer(endpoint, payload) {
    // 1. Try direct relative fetch (works seamlessly when running on local server)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    // 2. If relative fetch fails (e.g. browsing on GitHub Pages), attempt local LAN server endpoints
    const fallbackHosts = [
      'http://localhost:4000',
      'http://192.168.1.154:4000'
    ];
    for (const host of fallbackHosts) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1200);
        const res = await fetch(`${host}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (res.ok) {
          console.log(`[Antigravity Remote Sync] Dispatched to ${host}${endpoint}`);
          return await res.json();
        }
      } catch (err) {}
    }

    // 3. Fallback: Queue in localStorage so it synchronizes automatically when connected
    try {
      const pending = JSON.parse(localStorage.getItem('hub_pending_antigravity_sync') || '[]');
      pending.push({ endpoint, payload, time: Date.now() });
      localStorage.setItem('hub_pending_antigravity_sync', JSON.stringify(pending));
    } catch (e) {}
    return null;
  }

  setupOutsideClickListener() {
    // When clicking anything else on the page (launchpad tiles, tabs, 3D canvas, background),
    // automatically collapse the sidebar so it never blocks the view of opened modules.
    document.addEventListener('click', (e) => {
      if (!this.isExpanded) return;

      const isInsideSidebar = e.target.closest('#executive-sidebar');
      const isToggleBtn = e.target.closest('#sidebar-toggle-btn');
      const isGlobalAlerts = e.target.closest('#btn-global-alerts');
      const isRailBtn = e.target.closest('.rail-action-btn');

      if (!isInsideSidebar && !isToggleBtn && !isGlobalAlerts && !isRailBtn) {
        this.collapse();
      }
    }, true); // Capture phase ensures outside interaction triggers even if children invoke stopPropagation
  }

  handleResize() {
    const wasDesktop = this.isDesktop;
    this.isDesktop = window.innerWidth >= 1400;

    if (wasDesktop !== this.isDesktop) {
      if (!this.isDesktop) {
        // Auto-collapse into drawer when dropping below 1400px
        this.isExpanded = false;
        this.applyExpandedState(true);
      } else {
        // Auto-expand docked sidebar on widescreen desktop
        this.isExpanded = true;
        this.applyExpandedState(true);
      }
    }
  }

  setupToggleControls() {
    // Chevron toggle anchored to left border
    const chevronBtn = document.getElementById('sidebar-toggle-btn');
    if (chevronBtn) {
      chevronBtn.addEventListener('click', () => {
        sfx.playClick();
        this.toggle();
      });
    }

    // Collapsed rail button
    const railExpandBtn = document.getElementById('rail-btn-expand');
    if (railExpandBtn) {
      railExpandBtn.addEventListener('click', () => {
        sfx.playClick();
        this.expand();
      });
    }

    // Rail Directives icon button
    const railDirectivesBtn = document.getElementById('rail-btn-directives');
    if (railDirectivesBtn) {
      railDirectivesBtn.addEventListener('click', () => {
        sfx.playClick();
        this.setStream('directives');
        this.expand();
      });
    }

    // Rail Diagnostics icon button
    const railDiagnosticsBtn = document.getElementById('rail-btn-diagnostics');
    if (railDiagnosticsBtn) {
      railDiagnosticsBtn.addEventListener('click', () => {
        sfx.playClick();
        this.setStream('diagnostics');
        this.expand();
      });
    }

    // Header collapse button
    const headerCollapseBtn = document.getElementById('btn-sidebar-collapse');
    if (headerCollapseBtn) {
      headerCollapseBtn.addEventListener('click', () => {
        sfx.playClick();
        this.collapse();
      });
    }

    // Header refresh button
    const headerRefreshBtn = document.getElementById('btn-sidebar-refresh');
    if (headerRefreshBtn) {
      headerRefreshBtn.addEventListener('click', () => {
        sfx.playClick();
        this.refreshFeeds();
      });
    }

    // Backdrop click (mobile drawer overlay)
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => {
        sfx.playClick();
        this.collapse();
      });
    }

    // Global Header Alerts Pill (⚠️ 18 ALERTS) -> toggles sidebar
    const globalAlertsBtn = document.getElementById('btn-global-alerts');
    if (globalAlertsBtn) {
      globalAlertsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sfx.playClick();
        if (this.isExpanded) {
          this.collapse();
        } else {
          this.expand();
          this.setStream('directives');
        }
      });
    }

    // Sidebar footer actions
    const btnCadence = document.getElementById('btn-sidebar-rerun-cadence');
    if (btnCadence && this.dashboardMgr) {
      btnCadence.addEventListener('click', () => {
        this.dashboardMgr.runCadenceAgent(btnCadence);
      });
    }

    const btnFooterRefresh = document.getElementById('btn-sidebar-footer-refresh');
    if (btnFooterRefresh) {
      btnFooterRefresh.addEventListener('click', () => {
        sfx.playClick();
        this.refreshFeeds();
      });
    }

    // Keyboard shortcut: Alt + [ to toggle sidebar
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === '[' || e.key === '{')) {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  setupStreamTabs() {
    const tabDirectives = document.getElementById('tab-btn-directives');
    const tabDiagnostics = document.getElementById('tab-btn-diagnostics');

    if (tabDirectives) {
      tabDirectives.addEventListener('click', () => {
        sfx.playClick();
        this.setStream('directives');
      });
    }

    if (tabDiagnostics) {
      tabDiagnostics.addEventListener('click', () => {
        sfx.playClick();
        this.setStream('diagnostics');
      });
    }

    // Sub-filter pills (ALL, P0 CRITICAL, P1 REQUIRED, INFO)
    const filterPills = document.querySelectorAll('.sidebar-filter-pills .filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        sfx.playClick();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentFilter = pill.getAttribute('data-filter') || 'all';
        this.render();
      });
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    this.applyExpandedState(true);
  }

  expand() {
    this.isExpanded = true;
    this.applyExpandedState(true);
  }

  collapse() {
    this.isExpanded = false;
    if (this.visualizer && typeof this.visualizer.clearAllPulseSpheres === 'function') {
      this.visualizer.clearAllPulseSpheres();
    }
    this.applyExpandedState(true);
  }

  applyExpandedState(animate = true) {
    if (!this.container) return;

    const chevronBtn = document.getElementById('sidebar-toggle-btn');
    const chevronIcon = chevronBtn ? chevronBtn.querySelector('.toggle-icon') : null;

    if (this.isExpanded) {
      this.container.classList.remove('collapsed');
      this.container.classList.add('expanded');
      document.body.classList.add('sidebar-open');
      document.body.classList.remove('sidebar-collapsed');
      if (chevronIcon) chevronIcon.textContent = '⇥';
      if (chevronBtn) {
        chevronBtn.title = 'Collapse Executive Sidebar (Alt + [)';
        chevronBtn.setAttribute('aria-expanded', 'true');
      }

      if (this.backdrop && !this.isDesktop) {
        this.backdrop.classList.add('active');
      }

      // Notify visualizer to offset camera on desktop widescreen
      if (this.visualizer) {
        this.visualizer.setSidebarWidth(this.isDesktop ? 380 : 0);
      }
    } else {
      this.container.classList.add('collapsed');
      this.container.classList.remove('expanded');
      document.body.classList.remove('sidebar-open');
      document.body.classList.add('sidebar-collapsed');
      if (chevronIcon) chevronIcon.textContent = '⇤';
      if (chevronBtn) {
        chevronBtn.title = 'Expand Executive Sidebar (Alt + [)';
        chevronBtn.setAttribute('aria-expanded', 'false');
      }

      if (this.backdrop) {
        this.backdrop.classList.remove('active');
      }

      // Collapsed rail width is 48px on desktop, 0 on mobile/small displays
      if (this.visualizer) {
        this.visualizer.setSidebarWidth(this.isDesktop ? 48 : 0);
      }
    }
  }

  setStream(streamName) {
    this.currentStream = streamName;
    if (this.visualizer && typeof this.visualizer.clearAllPulseSpheres === 'function') {
      this.visualizer.clearAllPulseSpheres();
    }
    const tabDirectives = document.getElementById('tab-btn-directives');
    const tabDiagnostics = document.getElementById('tab-btn-diagnostics');
    const streamDirectives = document.getElementById('stream-directives');
    const streamDiagnostics = document.getElementById('stream-diagnostics');

    if (streamName === 'directives') {
      if (tabDirectives) {
        tabDirectives.classList.add('active');
        tabDirectives.setAttribute('aria-selected', 'true');
      }
      if (tabDiagnostics) {
        tabDiagnostics.classList.remove('active');
        tabDiagnostics.setAttribute('aria-selected', 'false');
      }
      if (streamDirectives) streamDirectives.classList.add('active');
      if (streamDiagnostics) streamDiagnostics.classList.remove('active');
    } else {
      if (tabDiagnostics) {
        tabDiagnostics.classList.add('active');
        tabDiagnostics.setAttribute('aria-selected', 'true');
      }
      if (tabDirectives) {
        tabDirectives.classList.remove('active');
        tabDirectives.setAttribute('aria-selected', 'false');
      }
      if (streamDiagnostics) streamDiagnostics.classList.add('active');
      if (streamDirectives) streamDirectives.classList.remove('active');
    }

    this.render();
  }

  getAllDirectives() {
    const directives = [];
    const domainAlerts = (this.dashboardMgr && this.dashboardMgr.alerts) 
      ? this.dashboardMgr.alerts 
      : {};

    // Rehydrate resolved codes from localStorage to ensure cross-component synchronization
    try {
      const rawResolved = localStorage.getItem('hub_resolved_directives');
      if (rawResolved) JSON.parse(rawResolved).forEach(c => this.resolvedCodes.add(c));
      const rawDismissed = localStorage.getItem('hub_dismissed_alerts');
      if (rawDismissed) JSON.parse(rawDismissed).forEach(c => this.resolvedCodes.add(c));
    } catch (e) {}

    const KNOWN_DIRECTIVE_TITLES = {
      'PM_OVERDUE_PM_DRYER_VENT': 'Dryer Exhaust Vent & Lint Cleanout Overdue',
      'PM_OVERDUE_PM_HVAC_TUNEUP': 'Gas Furnace Annual Tune-Up & Combustion Test Overdue',
      'PM_OVERDUE_PM_SEPTIC_PUMP': 'Septic Tank Inspection & Pumping Overdue',
      'PM_OVERDUE_PM_DUCT_CLEANING': 'Whole-House Air Duct & Sanitizer Fog Cleaning Overdue',
      'PM_OVERDUE_PM_FRIDGE_WATER_COILS': 'Refrigerator Water Filter & Condenser Coil Vacuuming Overdue',
      'PM_DUE_SOON_PM_GUTTER_ROOF_MOSS': 'Gutter Cleanout & Roof Moss Treatment Due',
      'WARRANTY_EXPIRING_CAPEX_REFRIGERATOR': 'Whirlpool Refrigerator Store Warranty Expiring',
      'WARRANTY_EXPIRING_PM_FENCE_WASH_GATE': 'Fence & Gates Workmanship Warranty Review',
      'PM_DUE_SOON_PM_FENCE_WASH_GATE': 'Annual Fence Wash & Gate Alignment PM',
      'RCW_59_18_650_OWNER_OCCUPANCY_TIMELINE': 'March 2027 Tenant Move-Out & June 2027 Owner Re-Occupancy Milestones',
      'EXEC_ACTION_WA_NOTICE': 'WA Rental 90-Day Notice Packet Preparation',
      'EXEC_ACTION_STRATEGIC_SYNC': 'Quarterly Family Operations & Calendar Alignment',
      'TRIP_RAINIER_WEATHER': 'Mount Rainier National Park Weather & Trail Advisory',
      'MACKIE_DINNER_MENU': 'Dinner Menu Finalization for Friday',
      'MACKIE_GROCERY_RESTOCK': 'Weekly Grocery Restock Checklist',
      'HEALTH_HRV_BELOW_TARGET': 'HRV Readiness Alert: 46 ms (Below 65 ms Baseline)',
      'HRV_BELOW_BASELINE': 'HRV Readiness Alert: 46 ms (Below 65 ms Baseline)',
      'CHEVY_COLORADO_ZR2_OIL_DECAY': '2021 Chevy Colorado ZR2 Oil Life at 18%',
      'COLORADO_ZR2_OIL_18PCT': 'Colorado ZR2 Oil Life at 18% (Service Due Soon)'
    };

    const domainKeys = ['rental', 'garage', 'fleet', 'executive', 'trip', 'mackie', 'financial', 'health'];

    domainKeys.forEach(deckId => {
      const group = domainAlerts[deckId];
      if (!group || !Array.isArray(group.items)) return;

      group.items.forEach(item => {
        const code = item.code || `${deckId}_${item.title || item.subject || 'alert'}`;
        if (this.resolvedCodes.has(code) || (this.dashboardMgr && this.dashboardMgr.dismissedAlerts && this.dashboardMgr.dismissedAlerts.has(code))) {
          return;
        }

        // Strictly exclude hallucinated academic / draft due dates
        if (code.includes('ACADEMIC') || code.includes('agentic_arch') || item.title?.includes('Autonomous Multi-Domain') || item.title?.includes('Oct 22')) {
          return;
        }

        // Strictly exclude hallucinated Murano tab / registration alerts (Registration is verified 05/31/2027 TN BVZ7440, nominal)
        if (code.includes('MURANO') && (code.includes('TABS') || code.includes('REG') || code.includes('EXPIR'))) {
          return;
        }
        if (typeof item.title === 'string' && item.title.toLowerCase().includes('murano') && (item.title.toLowerCase().includes('tab') || item.title.toLowerCase().includes('expir') || item.title.toLowerCase().includes('due nov'))) {
          return;
        }

        let priorityLevel = 'INFO';
        const sev = (item.severity || 'INFO').toUpperCase();
        if (sev === 'CRITICAL') priorityLevel = 'P0';
        else if (sev === 'WARNING' || sev === 'REQUIRED') priorityLevel = 'P1';

        // Filter out duplicates if garage/fleet share items
        if (directives.some(d => d.code === code)) return;

        // Resolve crisp, human-readable subject (guaranteed never undefined)
        let subject = item.title;
        if (!subject || subject === 'undefined' || typeof subject !== 'string' || subject.trim().length === 0) {
          subject = (item.subject && item.subject !== 'undefined')
            ? item.subject
            : (KNOWN_DIRECTIVE_TITLES[code] 
               || (item.statute && item.statute !== 'undefined' ? item.statute : null)
               || (code ? code.replace(/_/g, ' ') : `${group.deckName || deckId.toUpperCase()} Directive`));
        }

        let message = item.message;
        if (!message || message === 'undefined' || typeof message !== 'string' || message.trim().length === 0) {
          message = item.description || (item.statute ? `Reference: ${item.statute}` : 'Active operational directive requiring review.');
        }

        const baseDirective = {
          deckId: deckId === 'fleet' ? 'garage' : deckId,
          deckName: group.deckName || deckId.toUpperCase(),
          deckIcon: group.deckIcon || '⚡',
          code: code,
          severity: sev,
          priorityLevel: priorityLevel, // 'P0', 'P1', 'INFO'
          dueDate: item.dueDate || item.due_date,
          title: subject,
          message: message,
          statute: item.statute || 'Central Hub Telemetry',
          timestamp: '2026-10-19 17:54 UTC',
          acknowledged: this.acknowledgedCodes.has(code)
        };

        directives.push(enrichAlertCountdown(baseDirective));
      });
    });

    // Sort: P0 first, then P1, then INFO
    directives.sort((a, b) => {
      const order = { P0: 0, P1: 1, INFO: 2 };
      return (order[a.priorityLevel] ?? 3) - (order[b.priorityLevel] ?? 3);
    });

    return directives;
  }

  getActiveDiagnostics() {
    return this.diagnostics.filter(d => !this.handledItems.has(d.id) && !this.deniedItems.has(d.id));
  }

  render() {
    this.updateCounters();
    if (this.currentStream === 'directives') {
      this.renderDirectives();
    } else {
      this.renderDiagnostics();
    }
  }

  updateCounters() {
    const directives = this.getAllDirectives();
    const p0Count = directives.filter(d => d.priorityLevel === 'P0').length;
    const p1Count = directives.filter(d => d.priorityLevel === 'P1').length;
    const activeDiagnostics = this.getActiveDiagnostics();
    const diagCount = activeDiagnostics.length;

    // Header Stat Strip
    const countCritEl = document.getElementById('sidebar-count-critical');
    if (countCritEl) countCritEl.textContent = p0Count;

    const countReqEl = document.getElementById('sidebar-count-required');
    if (countReqEl) countReqEl.textContent = p1Count;

    const countBacklogEl = document.getElementById('sidebar-count-backlog');
    if (countBacklogEl) countBacklogEl.textContent = diagCount;

    // Stream Tab Badges
    const badgeDirectives = document.getElementById('badge-stream-directives');
    if (badgeDirectives) badgeDirectives.textContent = directives.length;

    const badgeDiagnostics = document.getElementById('badge-stream-diagnostics');
    if (badgeDiagnostics) badgeDiagnostics.textContent = diagCount;

    // Rail Badges
    const railBadgeDirectives = document.getElementById('rail-badge-directives');
    if (railBadgeDirectives) railBadgeDirectives.textContent = directives.length;

    const railBadgeDiagnostics = document.getElementById('rail-badge-diagnostics');
    if (railBadgeDiagnostics) railBadgeDiagnostics.textContent = diagCount;

    // Synchronize Header Alerts Pill
    const globalBadge = document.getElementById('global-alerts-badge');
    if (globalBadge) {
      globalBadge.textContent = `${directives.length} ALERTS`;
    }
  }

  renderDirectives() {
    const container = document.getElementById('directives-cards-container');
    if (!container) return;

    let items = this.getAllDirectives();

    if (this.currentFilter !== 'all') {
      items = items.filter(d => d.priorityLevel === this.currentFilter);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="sidebar-empty-state">
          <div class="empty-icon">✅</div>
          <div class="empty-title">ALL DIRECTIVES RESOLVED</div>
          <p class="empty-sub">No active ${this.currentFilter === 'all' ? '' : this.currentFilter} items logged across child nodes. Central operational status nominal.</p>
          <button class="empty-reset-btn" id="btn-sidebar-reset-directives">RESTORE RESOLVED ITEMS</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-sidebar-reset-directives');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resolvedCodes.clear();
          this.acknowledgedCodes.clear();
          try {
            localStorage.removeItem('hub_resolved_directives');
            localStorage.removeItem('hub_acknowledged_directives');
            localStorage.removeItem('hub_dismissed_alerts');
            localStorage.removeItem('hub_alerts');
          } catch (e) {}
          if (this.dashboardMgr) {
            this.dashboardMgr.dismissedAlerts.clear();
            this.dashboardMgr.syncUnifiedAlerts();
          }
          this.render();
          this.showToast('DIRECTIVES RESTORED', 'All active alerts and life ops items reset to monitoring state.', '🔄', 'info');
        });
      }
      return;
    }

    container.innerHTML = items.map(item => {
      const deckId = item.deckId || 'core';
      const tileMeta = TILE_METADATA[deckId] || { name: item.deckName.toUpperCase(), icon: item.deckIcon || '⚡', color: '#00f0ff' };
      const tileClass = `tile-${deckId}`;
      const badgeClass = item.priorityLevel === 'P0' ? 'badge-p0' : (item.priorityLevel === 'P1' ? 'badge-p1' : 'badge-info');
      const badgeLabel = item.priorityLevel === 'P0' ? 'P0 CRITICAL' : (item.priorityLevel === 'P1' ? 'P1 REQUIRED' : 'INFO');
      const ackClass = item.acknowledged ? 'acknowledged' : '';

      return `
        <div class="stream-card directive-card ${tileClass} ${badgeClass} ${ackClass}" 
             data-code="${item.code}" 
             data-deck="${deckId}" 
             tabindex="0">
          
          <!-- Card Header HUD Strip: Tile Identification & Severity Badge -->
          <div class="card-header-strip">
            <div class="tile-indicator-pill">
              <span>${tileMeta.icon}</span>
              <span>${tileMeta.name}</span>
            </div>
            <div class="card-badge ${badgeClass}">${badgeLabel}</div>
          </div>

          <!-- Card Title & Description (Guaranteed Never Undefined) -->
          <div class="card-title">${item.title || item.subject || 'Priority Directive'}</div>
          <div class="card-message">${item.message || item.description || ''}</div>
          
          <div class="card-statute-row">
            <span class="statute-label">REF:</span>
            <span class="statute-val">${item.statute || 'Central Hub Telemetry'}</span>
          </div>

          <!-- Action Items Execution Bar -->
          <div class="card-action-bar">
            <button class="btn-card-action btn-ack" data-action="ack" title="Acknowledge item">
              ${item.acknowledged ? '✓ ACKED' : 'Acknowledge'}
            </button>
            <button class="btn-card-action btn-open" data-action="open" title="Open corresponding dashboard node">
              Open Node ↗
            </button>
            <button class="btn-card-action btn-resolve" data-action="resolve" title="Mark resolved and clear alert">
              Quick Resolve ✓
            </button>
          </div>

        </div>
      `;
    }).join('');

    this.bindDirectiveCardEvents(container);
  }

  bindDirectiveCardEvents(container) {
    container.addEventListener('mouseleave', () => {
      if (this.visualizer && typeof this.visualizer.clearAllPulseSpheres === 'function') {
        this.visualizer.clearAllPulseSpheres();
      }
    });

    const cards = container.querySelectorAll('.stream-card');

    cards.forEach(card => {
      const deckId = card.getAttribute('data-deck');
      const code = card.getAttribute('data-code');

      // 1. Hover/Click synchronization with 3D canvas orbital spheres
      card.addEventListener('mouseenter', () => {
        if (this.visualizer && deckId) {
          this.visualizer.pulseSphere(deckId);
        }
      });

      card.addEventListener('mouseleave', () => {
        if (this.visualizer && deckId) {
          this.visualizer.clearPulseSphere(deckId);
        }
      });

      // 2. Action buttons
      const btnAck = card.querySelector('[data-action="ack"]');
      if (btnAck) {
        btnAck.addEventListener('click', (e) => {
          e.stopPropagation();
          sfx.playClick();
          this.acknowledgeDirective(code, card);
        });
      }

      const btnOpen = card.querySelector('[data-action="open"]');
      if (btnOpen) {
        btnOpen.addEventListener('click', (e) => {
          e.stopPropagation();
          sfx.playWarp();
          this.openNode(deckId, code);
        });
      }

      const btnResolve = card.querySelector('[data-action="resolve"]');
      if (btnResolve) {
        btnResolve.addEventListener('click', (e) => {
          e.stopPropagation();
          sfx.playSuccess();
          this.resolveDirective(code, card, deckId);
        });
      }

      // Clicking card body also navigates to node
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-action')) return;
        sfx.playClick();
        this.openNode(deckId, code);
      });
    });
  }

  acknowledgeDirective(code, cardElement) {
    if (!code) return;
    this.acknowledgedCodes.add(code);
    try {
      localStorage.setItem('hub_acknowledged_directives', JSON.stringify([...this.acknowledgedCodes]));
    } catch (e) {}
    if (cardElement) {
      cardElement.classList.add('acknowledged');
      const ackBtn = cardElement.querySelector('[data-action="ack"]');
      if (ackBtn) ackBtn.textContent = '✓ ACKED';
    }
    this.showToast('DIRECTIVE ACKNOWLEDGED', `Item ${code.substring(0, 24)}... marked as acknowledged.`, '👁️', 'info');
  }

  resolveDirective(code, cardElement, deckId) {
    if (!code) return;
    this.resolvedCodes.add(code);

    // 1. Persist resolved state to localStorage
    try {
      localStorage.setItem('hub_resolved_directives', JSON.stringify([...this.resolvedCodes]));
    } catch (e) {}

    // 2. Synchronize with dashboardMgr dismissedAlerts
    if (this.dashboardMgr) {
      this.dashboardMgr.dismissAlert(code, deckId, false);
    } else {
      try {
        const rawDismissed = localStorage.getItem('hub_dismissed_alerts');
        const dismissed = rawDismissed ? JSON.parse(rawDismissed) : [];
        if (!dismissed.includes(code)) {
          dismissed.push(code);
          localStorage.setItem('hub_dismissed_alerts', JSON.stringify(dismissed));
        }
      } catch (e) {}
    }

    // 3. Persist to server backend API
    try {
      fetch('/api/alerts/dismiss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      }).catch(() => {});
    } catch (e) {}

    // 4. Update visual DOM and counters
    if (cardElement) {
      cardElement.classList.add('card-resolving');
      setTimeout(() => {
        cardElement.remove();
        this.updateCounters();
        const container = document.getElementById('directives-cards-container');
        if (container && container.querySelectorAll('.stream-card').length === 0) {
          this.render();
        }
      }, 300);
    }
    this.showToast('DIRECTIVE RESOLVED', `Item successfully closed and permanently cleared from alerts pipeline.`, '✅', 'success');
  }

  openNode(deckId, code) {
    if (this.visualizer && deckId) {
      this.visualizer.pulseSphere(deckId);
      setTimeout(() => {
        if (this.visualizer && typeof this.visualizer.clearPulseSphere === 'function') {
          this.visualizer.clearPulseSphere(deckId);
        }
      }, 1000);
    }

    if (this.dashboardMgr) {
      if (deckId === 'health' || deckId === 'academic' || deckId === 'family') {
        this.dashboardMgr.switchDeck('executive');
      } else {
        this.dashboardMgr.switchDeck(deckId);
      }
    }

    // On mobile / small screens, auto-close drawer upon navigation
    if (!this.isDesktop) {
      this.collapse();
    }
  }

  renderDiagnostics() {
    const container = document.getElementById('diagnostics-cards-container');
    if (!container) return;

    let items = this.getActiveDiagnostics();

    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'P0') items = items.filter(d => d.category.includes('ACTION') || d.category.includes('FIX'));
      else if (this.currentFilter === 'P1') items = items.filter(d => d.category.includes('PERFORMANCE') || d.category.includes('DISPLAY'));
      else if (this.currentFilter === 'INFO') items = items.filter(d => d.category.includes('FEATURE'));
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="sidebar-empty-state">
          <div class="empty-icon">✅</div>
          <div class="empty-title">ALL ITEMS ACTIONED</div>
          <p class="empty-sub">All platform recommendations have been dispatched to Antigravity agents, saved to backlog, or dismissed.</p>
          <button class="empty-reset-btn" id="btn-sidebar-reset-diagnostics">RESTORE RECOMMENDATIONS</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-sidebar-reset-diagnostics');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.handledItems.clear();
          this.deniedItems.clear();
          try {
            localStorage.removeItem('hub_handled_diagnostics');
            localStorage.removeItem('hub_denied_diagnostics');
          } catch (e) {}
          this.render();
          this.showToast('RECOMMENDATIONS RESTORED', 'All platform items reset to active review state.', '🔄', 'info');
        });
      }
      return;
    }

    container.innerHTML = items.map(item => {
      const deckId = item.deckId || 'core';
      const tileMeta = TILE_METADATA[deckId] || { name: 'SYSTEM CORE', icon: '🌌', color: '#6366f1' };
      const tileClass = `tile-${deckId}`;
      const catClass = item.categoryClass || 'cat-feature';
      const routing = AGENT_ROUTING_MAP[item.id] || {
        targetAgent: item.assignedAgent || 'antigravity-worker',
        priority: 'MEDIUM',
        contextParameters: {}
      };

      return `
        <div class="stream-card diagnostic-card ${tileClass} ${catClass}" 
             data-id="${item.id}" 
             data-deck="${deckId}" 
             tabindex="0">
          
          <!-- Category Tag, Tile Pill & Origin -->
          <div class="card-header-strip">
            <div class="tile-indicator-pill">
              <span>${tileMeta.icon}</span>
              <span>${tileMeta.name}</span>
            </div>
            <span class="diag-origin-tag">${item.origin}</span>
          </div>

          <!-- Human-Friendly Title -->
          <div class="card-title" style="font-size:0.92rem;font-weight:700;color:#ffffff;margin-bottom:4px;">
            ${item.title}
          </div>

          <!-- Simple, Easy-to-Understand Description -->
          <div class="card-message" style="font-size:0.82rem;color:#cbd5e1;line-height:1.45;margin-bottom:6px;">
            ${item.description}
          </div>

          <!-- Subtle Tech Ref -->
          <div class="card-statute-row" style="margin-bottom:6px;">
            <span class="statute-label" style="font-size:0.63rem;color:#64748b;">REF:</span>
            <span class="statute-val" style="font-size:0.65rem;color:#94a3b8;font-family:var(--font-mono);">${item.technicalTitle || item.title} • Agent: ${routing.targetAgent}</span>
          </div>

          <!-- Status Pills Row (Shows Working / Dispatched) -->
          <div class="card-pills-row"></div>

          <!-- Quick Actions: Generate Agent Task, Push to Backlog, Deny -->
          <div class="card-action-bar diag-actions" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-diag-action btn-gen-task" 
                    data-action="gen-task" 
                    title="Dispatch Antigravity agent and create task in project folder">
              ⚡ Generate Agent Task
            </button>
            <button class="btn-diag-action btn-push-backlog" 
                    data-action="push-backlog" 
                    title="Save to persistent project backlog (/tasks/backlog/)">
              📋 Push to Backlog
            </button>
            <button class="btn-diag-action btn-deny" 
                    data-action="deny" 
                    title="Dismiss and ignore this item">
              ✕ Deny
            </button>
          </div>

        </div>
      `;
    }).join('');

    this.bindDiagnosticCardEvents(container);
  }

  bindDiagnosticCardEvents(container) {
    container.addEventListener('mouseleave', () => {
      if (this.visualizer && typeof this.visualizer.clearAllPulseSpheres === 'function') {
        this.visualizer.clearAllPulseSpheres();
      }
    });

    const cards = container.querySelectorAll('.stream-card');

    cards.forEach(card => {
      const diagId = card.getAttribute('data-id');
      const deckId = card.getAttribute('data-deck');

      // 1. Hover synchronization
      card.addEventListener('mouseenter', () => {
        if (this.visualizer && deckId) {
          this.visualizer.pulseSphere(deckId);
        }
      });

      card.addEventListener('mouseleave', () => {
        if (this.visualizer && deckId) {
          this.visualizer.clearPulseSphere(deckId);
        }
      });

      // 2. Action buttons
      const btnGenTask = card.querySelector('[data-action="gen-task"]');
      if (btnGenTask) {
        btnGenTask.addEventListener('click', (e) => {
          e.stopPropagation();
          this.generateAgentTask(diagId, btnGenTask, card);
        });
      }

      const btnPushBacklog = card.querySelector('[data-action="push-backlog"]');
      if (btnPushBacklog) {
        btnPushBacklog.addEventListener('click', (e) => {
          e.stopPropagation();
          this.pushToBacklog(diagId, btnPushBacklog, card);
        });
      }

      const btnDeny = card.querySelector('[data-action="deny"]');
      if (btnDeny) {
        btnDeny.addEventListener('click', (e) => {
          e.stopPropagation();
          this.denyDiagnostic(diagId, btnDeny, card);
        });
      }

      // Clicking card body navigates to node
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-diag-action')) return;
        sfx.playClick();
        this.openNode(deckId, diagId);
      });
    });
  }

  generateAgentTask(diagId, buttonEl, cardEl) {
    if (buttonEl && buttonEl.classList.contains('loading')) return;

    const item = this.diagnostics.find(d => d.id === diagId);
    if (!item) return;

    const routing = AGENT_ROUTING_MAP[diagId] || {
      targetAgent: item.assignedAgent || 'antigravity-worker',
      priority: 'HIGH',
      contextParameters: { origin: item.origin, deckId: item.deckId }
    };

    const num = Math.floor(1000 + Math.random() * 9000);
    const taskId = `TK-${num}`;
    const uuid = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    sfx.playClick();

    // Disable buttons on this card during dispatch
    if (cardEl) {
      cardEl.querySelectorAll('.btn-diag-action').forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
      });
    }

    // 1. Show immediate In-Progress state
    if (buttonEl) {
      buttonEl.classList.add('loading');
      buttonEl.innerHTML = `<span class="spinner-tactical"></span> Working...`;
    }

    const pillContainer = cardEl ? cardEl.querySelector('.card-pills-row') : null;
    if (pillContainer) {
      pillContainer.innerHTML = `<div class="diag-status-pill pill-inprogress">⚡ IN PROGRESS // Migrating to Antigravity (${routing.targetAgent})...</div>`;
    }

    // 2. Perform dispatch, write project files & update C2 action queue
    setTimeout(() => {
      const payload = {
        taskId: taskId,
        uuid: uuid,
        diagId: diagId,
        title: item.title,
        simpleDescription: item.description,
        technicalDescription: item.technicalDescription || item.description,
        sourceCategory: "Platform Diagnostics",
        targetAgent: routing.targetAgent,
        modelTier: routing.modelTier || 'flash_lite',
        priority: routing.priority || 'HIGH',
        status: "IN_PROGRESS",
        timestamp: new Date().toISOString(),
        contextParameters: routing.contextParameters || { origin: item.origin, deckId: item.deckId }
      };

      // In-memory & localStorage
      this.dispatchedTasks = this.dispatchedTasks.filter(t => t.diagId !== diagId);
      this.dispatchedTasks.unshift(payload);
      try {
        localStorage.setItem('c2-actions', JSON.stringify(this.dispatchedTasks));
      } catch (e) {}

      // POST to server (writes markdown task file into /tasks/active/ in project folder)
      this.postToAntigravityServer('/api/tasks', payload);

      try {
        if (this.broadcastChannel) {
          this.broadcastChannel.postMessage({ type: 'TASK_DISPATCHED', payload });
        }
      } catch (e) {}

      sfx.playWarp();

      // Show completion state on card before disappearing
      if (buttonEl) {
        buttonEl.classList.remove('loading');
        buttonEl.classList.add('dispatched');
        buttonEl.innerHTML = `✓ Dispatched!`;
      }

      if (pillContainer) {
        pillContainer.innerHTML = `<div class="diag-status-pill pill-dispatched">✓ Task #${taskId} Created in /tasks/active/</div>`;
      }

      this.showToast(
        'ANTIGRAVITY TASK DISPATCHED',
        `Task #${taskId} created in project /tasks/ folder ➔ Subagent: ${routing.targetAgent}.`,
        '⚡',
        'success'
      );

      this.logC2Action(`[ANTIGRAVITY MIGRATION] Task #${taskId} [${item.title}] ➔ ${routing.targetAgent}: ACTIVE IN PROJECT`);

      // 3. Smoothly animate out and disappear from executive summary
      setTimeout(() => {
        if (cardEl) {
          cardEl.classList.add('card-disappearing');
          setTimeout(() => {
            cardEl.remove();
            this.handledItems.add(diagId);
            try {
              localStorage.setItem('hub_handled_diagnostics', JSON.stringify([...this.handledItems]));
            } catch (e) {}
            this.updateCounters();

            const c = document.getElementById('diagnostics-cards-container');
            if (c && c.querySelectorAll('.stream-card').length === 0) {
              this.render();
            }
          }, 550);
        }
      }, 700);

    }, 450);
  }

  pushToBacklog(diagId, buttonEl, cardEl) {
    if (buttonEl && buttonEl.classList.contains('loading')) return;

    const item = this.diagnostics.find(d => d.id === diagId);
    if (!item) return;

    sfx.playClick();

    if (cardEl) {
      cardEl.querySelectorAll('.btn-diag-action').forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
      });
    }

    if (buttonEl) {
      buttonEl.classList.add('loading');
      buttonEl.innerHTML = `<span class="spinner-tactical"></span> Pushing to Backlog...`;
    }

    const pillContainer = cardEl ? cardEl.querySelector('.card-pills-row') : null;
    if (pillContainer) {
      pillContainer.innerHTML = `<div class="diag-status-pill pill-inprogress">📋 IN PROGRESS // Archiving to System Backlog...</div>`;
    }

    setTimeout(() => {
      const backlogItem = {
        id: diagId,
        title: item.title,
        simpleDescription: item.description,
        category: item.category,
        origin: item.origin,
        deckId: item.deckId,
        timestamp: new Date().toISOString(),
        status: "LOGGED_IN_BACKLOG"
      };

      this.backlogItems = this.backlogItems.filter(b => b.id !== diagId);
      this.backlogItems.unshift(backlogItem);
      try {
        localStorage.setItem('hub_platform_backlog_items', JSON.stringify(this.backlogItems));
      } catch (e) {}

      // POST to server (appends to /tasks/backlog/BACKLOG.md in project folder)
      this.postToAntigravityServer('/api/backlog', backlogItem);

      sfx.playSuccess();

      if (buttonEl) {
        buttonEl.classList.remove('loading');
        buttonEl.classList.add('in-backlog');
        buttonEl.innerHTML = `✓ Saved to Backlog!`;
      }

      if (pillContainer) {
        pillContainer.innerHTML = `<div class="diag-status-pill pill-backlog">✓ Saved to /tasks/backlog/BACKLOG.md</div>`;
      }

      this.showToast(
        'BACKLOG PERSISTED',
        `Logged #${diagId.toUpperCase()} [${item.title}] into project folder /tasks/backlog/.`,
        '📋',
        'info'
      );

      this.logC2Action(`[BACKLOG-SYNC] Logged #${diagId.toUpperCase()} [${item.title}] ➔ /tasks/backlog/`);

      setTimeout(() => {
        if (cardEl) {
          cardEl.classList.add('card-disappearing');
          setTimeout(() => {
            cardEl.remove();
            this.handledItems.add(diagId);
            try {
              localStorage.setItem('hub_handled_diagnostics', JSON.stringify([...this.handledItems]));
            } catch (e) {}
            this.updateCounters();

            const c = document.getElementById('diagnostics-cards-container');
            if (c && c.querySelectorAll('.stream-card').length === 0) {
              this.render();
            }
          }, 550);
        }
      }, 700);

    }, 380);
  }

  denyDiagnostic(diagId, buttonEl, cardEl) {
    if (buttonEl && buttonEl.classList.contains('denying')) return;

    const item = this.diagnostics.find(d => d.id === diagId);
    if (!item) return;

    sfx.playClick();

    if (cardEl) {
      cardEl.querySelectorAll('.btn-diag-action').forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
      });
    }

    if (buttonEl) {
      buttonEl.classList.add('denying');
      buttonEl.innerHTML = `<span class="spinner-tactical"></span> Denying...`;
    }

    const pillContainer = cardEl ? cardEl.querySelector('.card-pills-row') : null;
    if (pillContainer) {
      pillContainer.innerHTML = `<div class="diag-status-pill" style="background:rgba(239,68,68,0.18);border:1px solid rgba(239,68,68,0.45);color:#fca5a5;">✕ REMOVED // Item Denied</div>`;
    }

    setTimeout(() => {
      // POST to server (appends to /tasks/dismissed/DISMISSED.md in project folder)
      this.postToAntigravityServer('/api/diagnostics/deny', { id: diagId, title: item.title });

      this.showToast(
        'RECOMMENDATION DENIED',
        `"${item.title}" dismissed and removed from recommendations.`,
        '✕',
        'info'
      );

      this.logC2Action(`[ITEM DENIED] Dismissed #${diagId.toUpperCase()} [${item.title}]`);

      setTimeout(() => {
        if (cardEl) {
          cardEl.classList.add('card-denied-disappearing');
          setTimeout(() => {
            cardEl.remove();
            this.deniedItems.add(diagId);
            try {
              localStorage.setItem('hub_denied_diagnostics', JSON.stringify([...this.deniedItems]));
            } catch (e) {}
            this.updateCounters();

            const c = document.getElementById('diagnostics-cards-container');
            if (c && c.querySelectorAll('.stream-card').length === 0) {
              this.render();
            }
          }, 450);
        }
      }, 400);

    }, 280);
  }

  initC2ActionDock() {
    let dock = document.getElementById('c2-action-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'c2-action-dock';
      dock.className = 'c2-action-log-dock';
      dock.innerHTML = `
        <span class="c2-badge">C2 DISPATCH</span>
        <span class="c2-log-msg" id="c2-log-msg">[IDLE] Telemetry & C2 Dispatch Pipeline Standing By...</span>
      `;
      document.body.appendChild(dock);
    }
  }

  logC2Action(message) {
    this.initC2ActionDock();
    const msgEl = document.getElementById('c2-log-msg');
    if (msgEl) {
      msgEl.textContent = message;
      msgEl.title = message;
      const dock = document.getElementById('c2-action-dock');
      if (dock) {
        dock.style.borderColor = '#00f0ff';
        dock.style.boxShadow = '0 8px 35px rgba(0, 240, 255, 0.45)';
        setTimeout(() => {
          dock.style.borderColor = '';
          dock.style.boxShadow = '';
        }, 2500);
      }
    }
  }

  refreshFeeds() {
    if (this.dashboardMgr) {
      this.dashboardMgr.checkAllTelemetry();
      this.dashboardMgr.syncUnifiedAlerts();
    }
    this.render();
    this.showToast('EXECUTIVE FEEDS SYNCED', 'Real-time state and child node telemetry re-hydrated.', '🔄', 'info');
  }

  showToast(title, message, icon = '⚡', type = 'info') {
    let toastContainer = document.getElementById('hub-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'hub-toast-container';
      toastContainer.className = 'hub-toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `hub-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}
