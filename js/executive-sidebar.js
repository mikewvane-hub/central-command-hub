/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Executive Summary Sidebar Orchestrator
 * Fixed, collapsible right-hand operations HUD providing unified
 * Priority Directives (Life Ops) and Platform Diagnostics & Backlog.
 */

import { sfx } from './sound-effects.js';

export const PLATFORM_DIAGNOSTICS_DATA = [
  {
    id: 'diag-001',
    category: 'RENDER REGRESSION',
    categoryClass: 'cat-regression',
    origin: 'Garage 3D Viewport',
    deckId: 'garage',
    timestamp: '2026-10-19 17:15 UTC',
    title: 'WebGL Context Re-Acquisition Delay',
    description: 'Three.js canvas context rebuild delay (~120ms) observed when toggling between 2D Photo Studio and 3D Interactive Bay on mobile WebGL2 runtimes.',
    status: 'ACTIVE_INVESTIGATION',
    assignedAgent: 'antigravity-webgl-worker'
  },
  {
    id: 'diag-002',
    category: 'FIX REQUIRED',
    categoryClass: 'cat-fix',
    origin: 'Rental Ledger & JBLM Terminal',
    deckId: 'rental',
    timestamp: '2026-10-19 16:40 UTC',
    title: 'Clause Q Workmanship Warranty Expiration',
    description: 'Superior Fence & Rail workmanship warranty reached T-0d expiration. Inspection checklist and gate latch photos pending upload.',
    status: 'ACTION_MANDATORY',
    assignedAgent: 'property-ops-cadence'
  },
  {
    id: 'diag-003',
    category: 'FEATURE REQUEST',
    categoryClass: 'cat-feature',
    origin: 'Fleet Telemetry Console',
    deckId: 'garage',
    timestamp: '2026-10-19 14:22 UTC',
    title: 'OBD-II Bluetooth BLE Stream Integration',
    description: 'Ingest real-time ELM327 BLE telemetry stream for Chevy Colorado ZR2 & Nissan Murano to track transmission fluid thermal decay.',
    status: 'BACKLOG_PRIORITY',
    assignedAgent: 'telematics-bridge-agent'
  },
  {
    id: 'diag-004',
    category: 'FIX REQUIRED',
    categoryClass: 'cat-fix',
    origin: 'Academic Research Pipeline',
    deckId: 'executive',
    timestamp: '2026-10-19 12:05 UTC',
    title: 'arXiv Citation Crawler Throttling',
    description: 'Automated bibtex hydration for Autonomous Multi-Domain Agent Architectures (Draft V2) throttled at 3 req/sec. Exponential backoff required.',
    status: 'IN_QUEUE',
    assignedAgent: 'academic-cadence-agent'
  },
  {
    id: 'diag-005',
    category: 'FEATURE REQUEST',
    categoryClass: 'cat-feature',
    origin: 'Executive Briefing API',
    deckId: 'executive',
    timestamp: '2026-10-18 18:00 UTC',
    title: 'Automated Sunday 18:00 Encrypted Briefing Dispatch',
    description: 'Executive Cadence Agent should generate and dispatch an encrypted markdown & PDF summary to family operations channel at 18:05 EST.',
    status: 'BACKLOG_REVIEW',
    assignedAgent: 'executive-cadence-agent'
  },
  {
    id: 'diag-006',
    category: 'RENDER REGRESSION',
    categoryClass: 'cat-regression',
    origin: 'Galaxy Z Fold 8 Viewport',
    deckId: 'core',
    timestamp: '2026-10-18 09:30 UTC',
    title: 'Dynamic Safe-Area Viewport Transition',
    description: 'Fold/unfold sensor orientation event triggers double reflow on Android Chrome before locking aspect ratio 1.08:1.',
    status: 'TRIAGED',
    assignedAgent: 'device-optimizer'
  }
];

export const AGENT_ROUTING_MAP = {
  'diag-001': {
    targetAgent: 'scene-architect',
    priority: 'HIGH',
    contextParameters: {
      subsystem: 'Three.js / WebGL2 Context',
      targetFiles: ['js/atomic-core.js', 'dashboards/garage/src/components/garage/ThreeDGarageScene.jsx'],
      issue: 'WebGL context reacquisition delay on mobile/desktop mode toggle'
    }
  },
  'diag-003': {
    targetAgent: 'telemetry-ingest',
    priority: 'HIGH',
    contextParameters: {
      subsystem: 'OBD-II / ELM327 BLE Adapter',
      targetFiles: ['src/services/telemetry/obd2TelemetrySchema.js', 'src/services/telemetry/telemetryService.js'],
      issue: 'BLE stream ingestion for GM & Nissan transmission fluid thermal telemetry'
    }
  },
  'diag-002': {
    targetAgent: 'property-ops-cadence',
    priority: 'HIGH',
    contextParameters: {
      subsystem: 'Rental Asset Warranty',
      targetFiles: ['dashboards/rental/index.html'],
      issue: 'Clause Q workmanship warranty expiration checklist & gate latch proof'
    }
  },
  'diag-004': {
    targetAgent: 'academic-cadence-agent',
    priority: 'MEDIUM',
    contextParameters: {
      subsystem: 'arXiv Citation Scraper',
      targetFiles: ['agents/academic.py'],
      issue: 'Bibtex crawler throttling & backoff'
    }
  },
  'diag-005': {
    targetAgent: 'executive-cadence-agent',
    priority: 'MEDIUM',
    contextParameters: {
      subsystem: 'Executive Cadence Engine',
      targetFiles: ['agents/weekly_cadence_agent.py', 'server.js'],
      issue: 'Automated Sunday 18:00 encrypted briefing dispatch'
    }
  },
  'diag-006': {
    targetAgent: 'device-optimizer',
    priority: 'LOW',
    contextParameters: {
      subsystem: 'Galaxy Z Fold 8 Viewport Engine',
      targetFiles: ['js/device-optimizer.js'],
      issue: 'Dynamic safe-area viewport fold/unfold double reflow'
    }
  }
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
    this.resolvedCodes = new Set();
    this.acknowledgedCodes = new Set();

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

    // Initial render
    this.render();
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

    const btnBriefing = document.getElementById('btn-sidebar-open-briefing');
    if (btnBriefing && this.dashboardMgr) {
      btnBriefing.addEventListener('click', () => {
        sfx.playClick();
        this.dashboardMgr.openExecutiveBriefing();
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

    const domainKeys = ['rental', 'garage', 'fleet', 'executive', 'trip', 'mackie', 'financial', 'health', 'academic'];

    domainKeys.forEach(deckId => {
      const group = domainAlerts[deckId];
      if (!group || !Array.isArray(group.items)) return;

      group.items.forEach(item => {
        const code = item.code || `${deckId}_${item.title}`;
        if (this.resolvedCodes.has(code)) return;

        let priorityLevel = 'INFO';
        const sev = (item.severity || 'INFO').toUpperCase();
        if (sev === 'CRITICAL') priorityLevel = 'P0';
        else if (sev === 'WARNING' || sev === 'REQUIRED') priorityLevel = 'P1';

        // Filter out duplicates if garage/fleet share items
        if (directives.some(d => d.code === code)) return;

        directives.push({
          deckId: deckId === 'fleet' ? 'garage' : deckId,
          deckName: group.deckName || deckId.toUpperCase(),
          deckIcon: group.deckIcon || '⚡',
          code: code,
          severity: sev,
          priorityLevel: priorityLevel, // 'P0', 'P1', 'INFO'
          title: item.title,
          message: item.message,
          statute: item.statute || 'Central Hub Telemetry',
          timestamp: '2026-10-19 17:54 UTC',
          acknowledged: this.acknowledgedCodes.has(code)
        });
      });
    });

    // Sort: P0 first, then P1, then INFO
    directives.sort((a, b) => {
      const order = { P0: 0, P1: 1, INFO: 2 };
      return (order[a.priorityLevel] ?? 3) - (order[b.priorityLevel] ?? 3);
    });

    return directives;
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
    const diagCount = this.diagnostics.length;

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
          this.render();
          this.showToast('DIRECTIVES RESTORED', 'All active alerts and life ops items reset to monitoring state.', '🔄', 'info');
        });
      }
      return;
    }

    container.innerHTML = items.map(item => {
      const coreId = `${item.deckName.toUpperCase()}`;
      const badgeClass = item.priorityLevel === 'P0' ? 'badge-p0' : (item.priorityLevel === 'P1' ? 'badge-p1' : 'badge-info');
      const badgeLabel = item.priorityLevel === 'P0' ? 'P0 CRITICAL' : (item.priorityLevel === 'P1' ? 'P1 REQUIRED' : 'INFO');
      const ackClass = item.acknowledged ? 'acknowledged' : '';

      return `
        <div class="stream-card directive-card ${badgeClass} ${ackClass}" 
             data-code="${item.code}" 
             data-deck="${item.deckId}" 
             tabindex="0">
          
          <!-- Card Header HUD Strip -->
          <div class="card-header-strip">
            <div class="card-origin-tag">
              <span class="origin-icon">${item.deckIcon}</span>
              <span class="origin-code">[${item.timestamp.split(' ')[1]} // ${coreId}]</span>
            </div>
            <div class="card-badge ${badgeClass}">${badgeLabel}</div>
          </div>

          <!-- Card Title & Description -->
          <div class="card-title">${item.title}</div>
          <div class="card-message">${item.message}</div>
          
          <div class="card-statute-row">
            <span class="statute-label">REF:</span>
            <span class="statute-val">${item.statute}</span>
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
          this.resolveDirective(code, card);
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
    this.acknowledgedCodes.add(code);
    if (cardElement) {
      cardElement.classList.add('acknowledged');
      const ackBtn = cardElement.querySelector('[data-action="ack"]');
      if (ackBtn) ackBtn.textContent = '✓ ACKED';
    }
    this.showToast('DIRECTIVE ACKNOWLEDGED', `Item ${code.substring(0, 24)}... marked as acknowledged.`, '👁️', 'info');
  }

  resolveDirective(code, cardElement) {
    this.resolvedCodes.add(code);
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
    this.showToast('DIRECTIVE RESOLVED', `Item successfully closed and cleared from active alerts pipeline.`, '✅', 'success');
  }

  openNode(deckId, code) {
    if (this.visualizer && deckId) {
      this.visualizer.pulseSphere(deckId);
    }

    if (this.dashboardMgr) {
      if (deckId === 'health' || deckId === 'academic' || deckId === 'family') {
        this.dashboardMgr.switchDeck('executive');
        setTimeout(() => this.dashboardMgr.openExecutiveBriefing(), 250);
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

    let items = [...this.diagnostics];

    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'P0') items = items.filter(d => d.category === 'FIX REQUIRED');
      else if (this.currentFilter === 'P1') items = items.filter(d => d.category === 'RENDER REGRESSION');
      else if (this.currentFilter === 'INFO') items = items.filter(d => d.category === 'FEATURE REQUEST');
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="sidebar-empty-state">
          <div class="empty-icon">🛠️</div>
          <div class="empty-title">NO DIAGNOSTIC DEFECTS</div>
          <p class="empty-sub">All platform telemetry items and render regressions currently nominal.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => {
      const catClass = item.category === 'FIX REQUIRED' 
        ? 'cat-fix' 
        : (item.category === 'RENDER REGRESSION' ? 'cat-regression' : 'cat-feature');

      const routing = AGENT_ROUTING_MAP[item.id] || {
        targetAgent: item.assignedAgent || 'antigravity-worker',
        priority: 'MEDIUM',
        contextParameters: {}
      };

      const dispatchedTask = this.dispatchedTasks.find(t => t.diagId === item.id);
      const isBacklog = this.backlogItems.some(b => b.id === item.id);

      let dispatchedClass = '';
      let dispatchedDisabled = '';
      let dispatchedText = '⚡ Generate Agent Task';
      if (dispatchedTask) {
        dispatchedClass = 'dispatched';
        dispatchedDisabled = 'disabled';
        dispatchedText = `✓ Dispatched to ${dispatchedTask.targetAgent} (#${dispatchedTask.taskId})`;
      }

      let backlogClass = '';
      let backlogDisabled = '';
      let backlogText = '📋 Push to Backlog';
      if (isBacklog) {
        backlogClass = 'in-backlog';
        backlogDisabled = 'disabled';
        backlogText = '✓ Logged in Backlog';
      }

      let pillsHtml = '';
      if (dispatchedTask) {
        pillsHtml += `<div class="diag-status-pill pill-dispatched">🚀 TASK #${dispatchedTask.taskId} DISPATCHED ➔ ${dispatchedTask.targetAgent.toUpperCase()}</div>`;
      }
      if (isBacklog) {
        pillsHtml += `<div class="diag-status-pill pill-backlog">📋 LOGGED IN BACKLOG</div>`;
      }

      return `
        <div class="stream-card diagnostic-card ${catClass}" 
             data-id="${item.id}" 
             data-deck="${item.deckId}" 
             tabindex="0">
          
          <!-- Category Tag & Origin -->
          <div class="card-header-strip">
            <span class="diag-cat-badge ${catClass}">[${item.category}]</span>
            <span class="diag-origin-tag">${item.origin}</span>
          </div>

          <!-- Description Summary -->
          <div class="card-title">${item.title}</div>
          <div class="card-message">${item.description}</div>

          <!-- Metadata row -->
          <div class="diag-meta-row">
            <span class="diag-meta-time">⏱️ ${item.timestamp}</span>
            <span class="diag-meta-agent">🤖 ${routing.targetAgent || item.assignedAgent}</span>
          </div>

          <!-- Status Pills Row -->
          <div class="card-pills-row">
            ${pillsHtml}
          </div>

          <!-- Quick Actions -->
          <div class="card-action-bar diag-actions">
            <button class="btn-diag-action btn-gen-task ${dispatchedClass}" 
                    data-action="gen-task" 
                    ${dispatchedDisabled} 
                    title="Generate immediate Antigravity agent task">
              ${dispatchedText}
            </button>
            <button class="btn-diag-action btn-push-backlog ${backlogClass}" 
                    data-action="push-backlog" 
                    ${backlogDisabled} 
                    title="Queue into Antigravity backlog state">
              ${backlogText}
            </button>
          </div>

        </div>
      `;
    }).join('');

    this.bindDiagnosticCardEvents(container);
  }

  bindDiagnosticCardEvents(container) {
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

      // Clicking card body navigates to node
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-diag-action')) return;
        sfx.playClick();
        this.openNode(deckId, diagId);
      });
    });
  }

  generateAgentTask(diagId, buttonEl, cardEl) {
    if (buttonEl && (buttonEl.classList.contains('loading') || buttonEl.classList.contains('dispatched'))) {
      return;
    }

    const item = this.diagnostics.find(d => d.id === diagId);
    if (!item) return;

    const routing = AGENT_ROUTING_MAP[diagId] || {
      targetAgent: item.assignedAgent || 'antigravity-worker',
      priority: 'MEDIUM',
      contextParameters: { origin: item.origin, deckId: item.deckId }
    };

    const num = Math.floor(1000 + Math.random() * 9000);
    const taskId = `TK-${num}`;
    const uuid = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    sfx.playClick();

    if (buttonEl) {
      buttonEl.classList.add('loading');
      buttonEl.innerHTML = `<span class="spinner-tactical"></span> Dispatching to ${routing.targetAgent}...`;
      buttonEl.disabled = true;
    }

    setTimeout(() => {
      const payload = {
        taskId: taskId,
        uuid: uuid,
        diagId: diagId,
        title: item.title,
        sourceCategory: "Platform Backlog",
        targetAgent: routing.targetAgent,
        priority: routing.priority,
        status: "QUEUED",
        timestamp: new Date().toISOString(),
        contextParameters: routing.contextParameters || { origin: item.origin, deckId: item.deckId }
      };

      // 1. Update in-memory & persistent localStorage
      this.dispatchedTasks = this.dispatchedTasks.filter(t => t.diagId !== diagId);
      this.dispatchedTasks.unshift(payload);
      try {
        localStorage.setItem('c2-actions', JSON.stringify(this.dispatchedTasks));
      } catch (e) {
        console.warn('[C2 Dispatch] localStorage write error:', e);
      }

      // 2. Server persistence non-blocking
      try {
        fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (e) {}

      // 3. BroadcastChannel sync
      try {
        if (this.broadcastChannel) {
          this.broadcastChannel.postMessage({ type: 'TASK_DISPATCHED', payload });
        }
      } catch (e) {}

      // 4. Audio Feedback
      sfx.playWarp();

      // 5. Update Button State
      if (buttonEl) {
        buttonEl.classList.remove('loading');
        buttonEl.classList.add('dispatched');
        buttonEl.innerHTML = `✓ Dispatched to ${routing.targetAgent} (#${taskId})`;
        buttonEl.disabled = true;
      }

      // 6. Update Card Status Pill
      if (cardEl) {
        let pillContainer = cardEl.querySelector('.card-pills-row');
        if (!pillContainer) {
          pillContainer = document.createElement('div');
          pillContainer.className = 'card-pills-row';
          const metaRow = cardEl.querySelector('.diag-meta-row');
          if (metaRow) {
            metaRow.insertAdjacentElement('afterend', pillContainer);
          } else {
            cardEl.appendChild(pillContainer);
          }
        }
        const existingPill = pillContainer.querySelector('.pill-dispatched');
        if (existingPill) existingPill.remove();

        const pill = document.createElement('div');
        pill.className = 'diag-status-pill pill-dispatched';
        pill.innerHTML = `🚀 TASK #${taskId} DISPATCHED ➔ ${routing.targetAgent.toUpperCase()}`;
        pillContainer.appendChild(pill);
      }

      // 7. HUD Toast Notification
      this.showToast(
        'C2 AGENT TASK DISPATCHED',
        `[C2-ACTION] Dispatched Agent Task #${taskId} [${item.title.substring(0, 24)}...] ➔ ${routing.targetAgent}: READY.`,
        '⚡',
        'success'
      );

      // 8. Runtime Action Log HUD Dock
      this.logC2Action(`[C2-ACTION] Dispatched Agent Task #${taskId} [${item.title}] ➔ ${routing.targetAgent}: READY`);
    }, 220);
  }

  pushToBacklog(diagId, buttonEl, cardEl) {
    if (buttonEl && (buttonEl.classList.contains('loading') || buttonEl.classList.contains('in-backlog'))) {
      return;
    }

    const item = this.diagnostics.find(d => d.id === diagId);
    if (!item) return;

    sfx.playClick();

    if (buttonEl) {
      buttonEl.classList.add('loading');
      buttonEl.innerHTML = `<span class="spinner-tactical"></span> Pushing to Backlog...`;
      buttonEl.disabled = true;
    }

    setTimeout(() => {
      const backlogItem = {
        id: diagId,
        title: item.title,
        category: item.category,
        origin: item.origin,
        deckId: item.deckId,
        timestamp: new Date().toISOString(),
        status: "LOGGED_IN_BACKLOG"
      };

      // 1. Update in-memory & persistent localStorage
      this.backlogItems = this.backlogItems.filter(b => b.id !== diagId);
      this.backlogItems.unshift(backlogItem);
      try {
        localStorage.setItem('hub_platform_backlog_items', JSON.stringify(this.backlogItems));
      } catch (e) {
        console.warn('[Backlog] localStorage write error:', e);
      }

      // 2. Server persistence non-blocking
      try {
        fetch('/api/backlog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backlogItem)
        }).catch(() => {});
      } catch (e) {}

      // 3. Audio Feedback
      sfx.playSuccess();

      // 4. Update Button State
      if (buttonEl) {
        buttonEl.classList.remove('loading');
        buttonEl.classList.add('in-backlog');
        buttonEl.innerHTML = `✓ Logged in Backlog`;
        buttonEl.disabled = true;
      }

      // 5. Update Card Status Pill
      if (cardEl) {
        let pillContainer = cardEl.querySelector('.card-pills-row');
        if (!pillContainer) {
          pillContainer = document.createElement('div');
          pillContainer.className = 'card-pills-row';
          const metaRow = cardEl.querySelector('.diag-meta-row');
          if (metaRow) {
            metaRow.insertAdjacentElement('afterend', pillContainer);
          } else {
            cardEl.appendChild(pillContainer);
          }
        }
        const existingPill = pillContainer.querySelector('.pill-backlog');
        if (existingPill) existingPill.remove();

        const pill = document.createElement('div');
        pill.className = 'diag-status-pill pill-backlog';
        pill.innerHTML = `📋 LOGGED IN BACKLOG`;
        pillContainer.appendChild(pill);
      }

      // 6. HUD Toast Notification
      this.showToast(
        'PERSISTENT BACKLOG LOGGED',
        `[BACKLOG-SYNC] Logged #${diagId.toUpperCase()} [${item.title.substring(0, 24)}...] into persistent system backlog.`,
        '📋',
        'info'
      );

      // 7. Runtime Action Log HUD Dock
      this.logC2Action(`[BACKLOG-SYNC] Logged #${diagId.toUpperCase()} [${item.title}] ➔ System Backlog: PERSISTED`);
    }, 180);
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
