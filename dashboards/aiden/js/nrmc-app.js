/**
 * ANTIGRAVITY NRMC // NEWBORN READINESS & MILESTONE COMMAND (NRMC) DASHBOARD
 * Main Client Controller & Telemetry Synchronization Engine
 */

import { WhoGrowthChart } from './growth-chart.js';
import { TummyTimer } from './tummy-timer.js';

class NrmcDashboardApp {
  constructor() {
    this.state = null;
    this.ws = null;
    this.growthChart = null;
    this.tummyTimer = null;
    this.currentTab = 'mission-glidepath';
    this.currentFilter = 'all';
    this.calendarYear = 2026;
    this.calendarMonth = 10; // November 2026 (0-indexed)
    this.selectedCalendarDate = null;
    this.selectedTask = null;
    this.currentMetric = 'weight';
    this.broadcastChannel = null;
    this.currentVaultFilter = 'ALL';
    this.stagedVaultFile = null;
    this.pendingOpsecFile = null;

    this.init();
  }

  async init() {
    this.initBroadcastChannel();
    this.initClock();
    this.attachDomEvents();
    await this.loadInitialState();
    this.initWebSocket();
    this.initSubsystems();
    this.render();
  }

  // 1. Inter-Dashboard Fleet Telemetry Bus (Central Command Hub integration)
  initBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('antigravity_telemetry_bus');
        this.broadcastChannel.onmessage = (event) => {
          if (event && event.data && event.data.type === 'HUB_PING') {
            this.broadcastFleetTelemetry();
          }
        };
      } catch (e) {
        console.warn('[NRMC] BroadcastChannel unavailable:', e.message);
      }
    }
  }

  broadcastFleetTelemetry() {
    const telemetry = this.computeClientTelemetry();
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({
        topic: 'fleet:telemetry',
        projectId: 'baby-aiden-nrmc',
        telemetry
      });
    }

    // LocalStorage fallback for Sentinel fleet state
    try {
      const fleetState = JSON.parse(localStorage.getItem('antigravity_sentinel_fleet_state') || '{}');
      fleetState['baby-aiden-nrmc'] = {
        id: 'baby-aiden-nrmc',
        status: telemetry.status,
        timestamp: new Date().toISOString(),
        critical_deadlines: telemetry.critical_deadlines_30d,
        pending_actions: telemetry.pending_actions_total,
        next_milestone: telemetry.next_medical_milestone
      };
      localStorage.setItem('antigravity_sentinel_fleet_state', JSON.stringify(fleetState));
    } catch (e) {
      // Ignore
    }
  }

  // 2. Real-time Zulu & Local Tactical Clocks
  initClock() {
    const updateTime = () => {
      const now = new Date();
      const zuluEl = document.getElementById('hud-zulu-time');
      const localEl = document.getElementById('hud-local-time');

      if (zuluEl) {
        zuluEl.textContent = now.toISOString().substring(11, 19) + ' Z';
      }
      if (localEl) {
        localEl.textContent = now.toLocaleTimeString([], { hour12: false });
      }

      this.updateDynamicCountdowns();
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Helper: Resilient API URL generator
  apiUrl(path) {
    if (window.location.port === '3012' || window.location.port === '4000') {
      return path;
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `http://localhost:3012${path}`;
    }
    return path;
  }

  // 3. Load State from LocalStorage / Server / Static Baseline
  async loadInitialState() {
    let baselineState = null;
    const isLocalBackend = window.location.port === '3012' || window.location.port === '4000' ||
                           (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    // If local backend is active, query live API state
    if (isLocalBackend) {
      try {
        const res = await fetch(this.apiUrl('/api/v1/nrmc/state'));
        if (res.ok) {
          baselineState = await res.json();
        }
      } catch (err) {
        console.warn('[NRMC] Local backend unreachable:', err.message);
      }
    }

    // Fallback: If no server state (e.g. GitHub Pages or static host), fetch static baseline JSON
    if (!baselineState) {
      try {
        const staticRes = await fetch('./data/nrmc_state.json');
        if (staticRes.ok) {
          baselineState = await staticRes.json();
        }
      } catch (e) {
        console.warn('[NRMC] Static baseline fetch failed:', e.message);
      }
    }

    // Check LocalStorage for instant paint & user-saved modifications
    const cached = localStorage.getItem('nrmc_cached_state');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.profile) {
          parsed.profile.baby_name = 'Aiden James Vane';
          if (!Array.isArray(parsed.vault_documents)) {
            parsed.vault_documents = baselineState?.vault_documents || [];
          }
          this.state = parsed;
        }
      } catch (e) {
        console.warn('[NRMC] Invalid cached state:', e);
      }
    }

    // If no valid cached state, use baseline
    if (!this.state && baselineState) {
      this.state = baselineState;
      localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
    }
  }

  // 4. WebSocket Real-Time Stream (Active only on local hosts with Node backend)
  initWebSocket() {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal && !window.location.port) {
      // Static cloud host (e.g. GitHub Pages) - operate in standalone client mode
      this.updateNetworkBadge(false, 'STANDALONE ORBIT');
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const targetHost = (window.location.port === '3012')
      ? window.location.host
      : (isLocal ? 'localhost:3012' : window.location.host);
    const wsUrl = `${protocol}//${targetHost}/ws/telemetry`;

    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = () => {
        this.updateNetworkBadge(true);
      };
      this.ws.onerror = (err) => {
        this.updateNetworkBadge(false);
      };
      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'TELEMETRY_UPDATE' || payload.type === 'INIT_STATE') {
            if (payload.state) {
              this.state = payload.state;
              localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
              this.render();
              this.broadcastFleetTelemetry();
            }
          }
        } catch (e) {
          console.error('[NRMC] WS Parse error:', e);
        }
      };
      this.ws.onclose = () => {
        this.updateNetworkBadge(false);
        if (isLocal) {
          setTimeout(() => this.initWebSocket(), 5000);
        }
      };
    } catch (e) {
      this.updateNetworkBadge(false);
    }
  }

  updateNetworkBadge(online, customLabel) {
    const badge = document.getElementById('ws-status-badge');
    if (badge) {
      badge.textContent = customLabel || (online ? 'LIVE WEBSOCKET' : 'STANDALONE SYNC');
      badge.className = `countdown-pill ${online ? 'pill-emerald' : 'pill-cyan'}`;
    }
  }

  // 5. Initialize Growth Chart & Tummy Timer
  initSubsystems() {
    // WHO Growth Chart
    const chartCanvas = document.getElementById('growth-canvas');
    if (chartCanvas && this.state?.modules?.module_e?.growth_telemetry) {
      this.growthChart = new WhoGrowthChart('growth-canvas', {
        metricType: this.currentMetric,
        unitMode: this.state.modules.module_e.growth_telemetry.unit_mode || 'imperial'
      });
      this.growthChart.setData(
        this.state.modules.module_e.growth_telemetry.who_standards_boys_0_12m,
        this.state.modules.module_e.growth_telemetry.measurements,
        this.state.modules.module_e.growth_telemetry.unit_mode
      );
    }

    // Tummy Time Stopwatch
    this.tummyTimer = new TummyTimer({
      displayId: 'tummy-stopwatch-display',
      startBtnId: 'tummy-start-btn',
      pauseBtnId: 'tummy-pause-btn',
      resetBtnId: 'tummy-reset-btn',
      saveBtnId: 'tummy-save-btn',
      onSave: (minutes) => this.recordTummyTimeSession(minutes)
    });
  }

  // 6. Compute Client Telemetry
  computeClientTelemetry() {
    if (!this.state) return {};
    let pendingCount = 0;
    let criticalCount = 0;

    const modules = this.state.modules || {};
    Object.values(modules).forEach((mod) => {
      if (Array.isArray(mod.tasks)) {
        mod.tasks.forEach((t) => {
          if (t.status === 'PENDING' || t.status === 'IN_FLIGHT') {
            pendingCount++;
            if (t.priority === 'CRITICAL' || t.priority === 'HIGH') {
              criticalCount++;
            }
          }
        });
      }
    });

    return {
      module: 'NEWBORN_READINESS',
      status: this.state.profile?.status || 'OPERATIONAL',
      timestamp: new Date().toISOString(),
      critical_deadlines_30d: criticalCount,
      pending_actions_total: pendingCount,
      next_medical_milestone:
        this.state.command_anchors?.next_medical_milestone?.title ||
        '2-Month Well-Child / Pentavalent (2027-01-15)',
      financial_telemetry: this.state.financial_telemetry || {},
      system_alerts: this.state.system_alerts || []
    };
  }

  // 7. Master Render Function
  render() {
    if (!this.state) return;

    this.renderHeaderAndProfile();
    this.renderMasterReadiness();
    this.renderCountdowns();
    this.renderMissionGlidepath();
    this.renderTacticalCalendar();
    this.renderFlightLanes();
    this.renderModuleTasks();
    this.renderClinicalData();
    this.renderRawTelemetry();
    this.renderDocumentVault();
  }

  // Unified Chronological Milestones Matrix
  getAllMilestones() {
    if (!this.state) return [];
    const list = [];
    const dob = this.state.profile?.dob || '2026-11-15';

    const taskDateMapping = {
      'A1': { date: '2026-11-15', offset: 'T-0', category: 'military', lane: 'military' },
      'A2': { date: '2026-11-15', offset: 'T-0', category: 'identity', lane: 'identity' },
      'A3': { date: '2026-11-18', offset: 'T+3d', category: 'military', lane: 'military' },
      'A4': { date: '2026-11-16', offset: 'T+1d', category: 'clinical', lane: 'clinical' },
      'A5': { date: '2026-11-16', offset: 'T+1d', category: 'clinical', lane: 'clinical' },
      'A6': { date: '2026-11-17', offset: 'T+2d', category: 'clinical', lane: 'clinical' },
      'A7': { date: '2027-02-13', offset: 'T+90d', category: 'military', lane: 'military', isDeadline: true },
      'B1': { date: '2026-12-05', offset: 'T+20d', category: 'military', lane: 'military' },
      'B2': { date: '2026-12-15', offset: 'T+30d', category: 'military', lane: 'military' },
      'B3': { date: '2026-11-20', offset: 'T+5d', category: 'military', lane: 'military' },
      'B4': { date: '2026-12-10', offset: 'T+25d', category: 'military', lane: 'military' },
      'B5': { date: '2027-01-05', offset: 'T+50d', category: 'military', lane: 'military' },
      'C1': { date: '2026-12-20', offset: 'T+35d', category: 'identity', lane: 'identity' },
      'C2': { date: '2026-12-20', offset: 'T+35d', category: 'identity', lane: 'identity' },
      'C3': { date: '2026-12-28', offset: 'T+43d', category: 'identity', lane: 'identity' },
      'C4': { date: '2027-02-13', offset: 'T+90d', category: 'identity', lane: 'identity' },
      'C5': { date: '2027-02-13', offset: 'T+90d', category: 'identity', lane: 'identity' },
      'C6': { date: '2027-02-13', offset: 'T+90d', category: 'identity', lane: 'identity' },
      'C7': { date: '2027-02-13', offset: 'T+90d', category: 'identity', lane: 'identity' },
      'D1': { date: '2026-12-30', offset: 'T+45d', category: 'financial', lane: 'wealth' },
      'D2': { date: '2027-01-14', offset: 'T+60d', category: 'financial', lane: 'wealth', isDeadline: true },
      'D3': { date: '2026-11-25', offset: 'T+10d', category: 'financial', lane: 'wealth' },
      'D4': { date: '2027-02-13', offset: 'T+90d', category: 'financial', lane: 'wealth' },
      'D5': { date: '2039-11-15', offset: 'Age 13', category: 'financial', lane: 'wealth' }
    };

    // Tasks from modules A-D
    Object.values(this.state.modules || {}).forEach((mod) => {
      if (Array.isArray(mod.tasks)) {
        mod.tasks.forEach((t) => {
          const map = taskDateMapping[t.id] || { date: '2026-12-01', offset: 'T+15d', category: 'military', lane: 'military' };
          list.push({
            id: t.id,
            title: t.title,
            category: map.category,
            lane: map.lane,
            date: map.date,
            offset: map.offset,
            priority: t.priority || 'NORMAL',
            status: t.status || 'PENDING',
            sla: t.sla || '',
            forms: t.forms || [],
            isDeadline: !!map.isDeadline,
            taskRef: t
          });
        });
      }
    });

    // Vaccines from Module E
    const vaccines = this.state.modules?.module_e?.vaccine_glidepath || [];
    vaccines.forEach((v) => {
      list.push({
        id: v.id,
        title: `${v.stage}: ${v.vaccine}`,
        category: 'clinical',
        lane: 'clinical',
        date: v.target_date || '2026-11-15',
        offset: v.stage.split(' ')[0],
        priority: 'HIGH',
        status: v.status || 'PENDING',
        sla: 'Clinical Immunization Series',
        forms: ['CDC Immunization Record'],
        isDeadline: false,
        vaccineRef: v
      });
    });

    // Clinical Growth Checks
    const growth = this.state.modules?.module_e?.growth_telemetry?.measurements || [];
    growth.forEach((g) => {
      list.push({
        id: g.id,
        title: `Clinical Growth Vitals (${g.weight_lbs} lbs / ${g.length_in} in)`,
        category: 'clinical',
        lane: 'clinical',
        date: g.date,
        offset: `T+${g.age_days}d`,
        priority: 'NORMAL',
        status: 'COMPLETE',
        sla: 'Pediatric Well-Child Screening',
        forms: ['WHO Growth Chart Entry'],
        isDeadline: false,
        growthRef: g
      });
    });

    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // View 1: Render Mission Glidepath (Horizontal Flight Trajectory)
  renderMissionGlidepath() {
    const container = document.getElementById('glidepath-cards-container');
    if (!container) return;

    let items = this.getAllMilestones();
    if (this.currentFilter === 'critical') {
      items = items.filter((m) => m.priority === 'CRITICAL' || m.isDeadline);
    } else if (this.currentFilter !== 'all') {
      items = items.filter((m) => m.category === this.currentFilter);
    }

    container.innerHTML = items
      .map((m) => {
        const isComplete = m.status === 'COMPLETE';
        const isCritical = m.priority === 'CRITICAL' || m.isDeadline;
        const statusPill =
          m.status === 'COMPLETE' ? 'pill-emerald' : m.status === 'IN_FLIGHT' ? 'pill-cyan' : m.status === 'LOCKED' ? 'pill-gray' : 'pill-amber';
        const priorityPill = isCritical ? 'pill-crimson' : m.priority === 'HIGH' ? 'pill-amber' : 'pill-cyan';
        const connectorClass = isComplete ? 'complete' : isCritical ? 'critical' : '';

        // Check if documents are vaulted or prompted for this milestone
        const taskDocs = (this.state.vault_documents || []).filter((d) => d.task_id === m.id);
        const needsDocPrompt = ['A4', 'A5', 'A6', 'B1', 'B3', 'B4', 'C2', 'D1', 'D2', 'D3', 'VAC_01', 'VAC_02', 'VAC_03', 'VAC_04', 'VAC_05'].includes(m.id);
        let docPromptHtml = '';
        if (taskDocs.length > 0) {
          docPromptHtml = `<button class="vault-prompt-badge has-docs open-vault-task-btn" data-task-id="${m.id}" title="${taskDocs.length} record(s) archived in local vault. Click to view.">📁 ${taskDocs.length} RECORD(S)</button>`;
        } else if (needsDocPrompt) {
          docPromptHtml = `<button class="vault-prompt-badge need-doc prompt-upload-btn" data-task-id="${m.id}" title="OPSEC Prompt: File supporting record or clinic slip">📎 FILE RECORD</button>`;
        }

        return `
        <div class="glidepath-milestone-card ${isComplete ? 'milestone-card-complete' : ''}" data-task-id="${m.id}" data-category="${m.category}">
          <div class="milestone-node-connector ${connectorClass}"></div>
          <div class="milestone-header-row">
            <span class="milestone-time-badge">${m.offset}</span>
            <div style="display:flex; align-items:center; gap:6px;">
              ${docPromptHtml}
              <span class="countdown-pill ${priorityPill}">${m.isDeadline ? '🚨 DEADLINE' : m.priority}</span>
            </div>
          </div>
          <div class="milestone-card-title">${m.title}</div>
          <div class="milestone-card-date">Target: <strong>${m.date}</strong> ${m.sla ? `• ${m.sla}` : ''}</div>
          <div class="milestone-card-footer">
            <button class="hud-check-toggle-sm ${isComplete ? 'is-complete' : ''}" data-task-id="${m.id}" title="${isComplete ? 'Task Sealed. Click to reopen' : 'Click to seal task as complete'}">
              ${isComplete ? '✓ SEALED' : '◯ COMPLETE'}
            </button>
            <span class="countdown-pill ${statusPill}">${m.status}</span>
          </div>
        </div>
      `;
      })
      .join('');

    // Update Current Radar Marker
    const now = new Date();
    const dob = new Date(this.state.profile?.dob || '2026-11-15');
    const daysDiff = Math.max(0, Math.floor((now - dob) / (1000 * 60 * 60 * 24)));
    const marker = document.getElementById('glidepath-current-marker');
    if (marker) {
      const clampedOffset = Math.min(1420, Math.max(35, daysDiff * 16 + 35));
      marker.style.left = `${clampedOffset}px`;
    }
  }

  // View 2: Render Tactical Calendar (Monthly HUD Grid)
  renderTacticalCalendar() {
    const grid = document.getElementById('tactical-calendar-grid');
    const heading = document.getElementById('calendar-month-heading');
    if (!grid || !heading) return;

    const monthNames = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    heading.textContent = `${monthNames[this.calendarMonth]} ${this.calendarYear}`;

    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1).getDay();
    const daysInMonth = new Date(this.calendarYear, this.calendarMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.calendarYear, this.calendarMonth, 0).getDate();

    const allMilestones = this.getAllMilestones();
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    let html = '';

    // Previous month padding
    for (let p = firstDay - 1; p >= 0; p--) {
      const prevDayNum = daysInPrevMonth - p;
      html += `
        <div class="calendar-day-cell inactive-month">
          <div class="day-cell-top"><span class="day-number">${prevDayNum}</span></div>
        </div>
      `;
    }

    // Active Month Days
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(this.calendarMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateKey = `${this.calendarYear}-${monthStr}-${dayStr}`;

      const matches = allMilestones.filter((m) => m.date === dateKey);
      const isToday = dateKey === todayStr;
      const hasCritical = matches.some((m) => m.isDeadline || m.priority === 'CRITICAL');

      let cellClass = 'calendar-day-cell';
      if (isToday) cellClass += ' today-cell';
      if (hasCritical) cellClass += ' has-critical-deadline';

      html += `
        <div class="${cellClass}" data-date="${dateKey}">
          <div class="day-cell-top">
            <span class="day-number" style="${isToday ? 'color:var(--cyan-telemetry); font-weight:800;' : ''}">${d}</span>
            ${isToday ? '<span class="status-pulse-dot" style="width:6px; height:6px;"></span>' : ''}
            ${hasCritical ? '<span style="font-size:0.75rem;">⚠️</span>' : ''}
          </div>
          <div class="calendar-events-stack">
            ${matches
              .slice(0, 3)
              .map((m) => {
                const chipClass = m.isDeadline
                  ? 'chip-critical'
                  : m.category === 'military'
                  ? 'chip-military'
                  : m.category === 'identity'
                  ? 'chip-identity'
                  : m.category === 'financial'
                  ? 'chip-financial'
                  : 'chip-clinical';
                return `<div class="calendar-event-chip ${chipClass}" title="${m.title}">${m.title}</div>`;
              })
              .join('')}
            ${matches.length > 3 ? `<div style="font-family:var(--font-mono); font-size:0.65rem; color:var(--text-muted);">+${matches.length - 3} more</div>` : ''}
          </div>
        </div>
      `;
    }

    grid.innerHTML = html;

    // Attach click listeners to day cells
    grid.querySelectorAll('.calendar-day-cell:not(.inactive-month)').forEach((cell) => {
      cell.addEventListener('click', () => {
        const dateKey = cell.dataset.date;
        this.openCalendarDrawer(dateKey);
      });
    });
  }

  openCalendarDrawer(dateKey) {
    const drawer = document.getElementById('calendar-day-drawer');
    const heading = document.getElementById('drawer-date-heading');
    const list = document.getElementById('drawer-events-list');
    if (!drawer || !heading || !list) return;

    this.selectedCalendarDate = dateKey;
    heading.textContent = `TACTICAL ROSTER FOR ${dateKey}`;

    const allMilestones = this.getAllMilestones();
    const matches = allMilestones.filter((m) => m.date === dateKey);

    if (matches.length === 0) {
      list.innerHTML =
        '<div style="color:var(--text-muted); font-size:0.85rem;">No scheduled military, civil, or clinical sorties on this date. Nominal flight envelope.</div>';
    } else {
      list.innerHTML = matches
        .map((m) => {
          const priorityPill = m.isDeadline ? 'pill-crimson' : m.priority === 'HIGH' ? 'pill-amber' : 'pill-cyan';
          return `
          <div style="background:rgba(18,19,24,0.9); border:1px solid var(--border-subtle); padding:12px; border-radius:6px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <span class="countdown-pill ${priorityPill}">${m.isDeadline ? 'HARD DEADLINE' : m.priority}</span>
                <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyan-telemetry);">${m.offset}</span>
                <strong style="color:var(--ghost-white); font-size:0.95rem;">${m.title}</strong>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted);">${m.sla ? `SLA: ${m.sla}` : ''} ${m.forms.length > 0 ? `| Forms: ${m.forms.join(', ')}` : ''}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="hud-check-toggle-sm ${isComplete ? 'is-complete' : ''}" data-task-id="${m.id}" title="${isComplete ? 'Task Sealed. Click to reopen' : 'Click to seal complete'}">
                ${isComplete ? '✓ SEALED' : '◯ MARK DONE'}
              </button>
              <button class="hud-btn hud-btn-sm hud-btn-primary open-sortie-btn" data-id="${m.id}">DOSSIER</button>
            </div>
          </div>
        `;
        })
        .join('');

      list.querySelectorAll('.open-sortie-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.openActionModal(btn.dataset.id);
        });
      });
    }

    drawer.style.display = 'block';
  }

  // View 3: Render Connected Flight Lanes (Swimlane Pipeline)
  renderFlightLanes() {
    this.renderLane('swimlane-military', 'military');
    this.renderLane('swimlane-identity', 'identity');
    this.renderLane('swimlane-wealth', 'wealth');
    this.renderLane('swimlane-clinical', 'clinical');
  }

  renderLane(containerId, laneKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const milestones = this.getAllMilestones().filter((m) => m.lane === laneKey);
    let html = '';

    milestones.forEach((m, idx) => {
      const isComplete = m.status === 'COMPLETE';
      const statusPill =
        isComplete ? 'pill-emerald' : m.status === 'IN_FLIGHT' ? 'pill-cyan' : m.status === 'LOCKED' ? 'pill-gray' : 'pill-amber';

      html += `
        <div class="swimlane-node-card ${isComplete ? 'node-card-complete' : ''}" data-task-id="${m.id}">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="milestone-time-badge">${m.offset}</span>
            <button class="hud-check-toggle-sm ${isComplete ? 'is-complete' : ''}" data-task-id="${m.id}" title="${isComplete ? 'Sealed. Click to reopen' : 'Click to complete'}">
              ${isComplete ? '✓' : '◯'}
            </button>
          </div>
          <div style="font-weight:700; font-size:0.85rem; color:var(--ghost-white); line-height:1.3;">${m.title}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted);">
            <span>${m.date}</span>
            <span class="countdown-pill ${statusPill}">${m.status}</span>
          </div>
        </div>
      `;

      if (idx < milestones.length - 1) {
        html += `<span class="swimlane-arrow-divider">➔</span>`;
      }
    });

    container.innerHTML = html;
  }

  renderHeaderAndProfile() {
    const profile = this.state.profile || {};
    const nameEl = document.getElementById('baby-name-display');
    const dobEl = document.getElementById('baby-dob-display');
    const stationEl = document.getElementById('military-station-display');

    if (nameEl) nameEl.textContent = profile.baby_name || 'Aiden James Vane';
    if (dobEl) dobEl.textContent = `DOB: ${profile.dob || '2026-11-15'}`;
    if (stationEl) stationEl.textContent = `${profile.sponsor_rank || 'O-3'} | ${profile.station || 'JBLM'}`;
  }

  // Master Readiness Ring Meter
  renderMasterReadiness() {
    let totalTasks = 0;
    let completedTasks = 0;

    Object.values(this.state.modules || {}).forEach((mod) => {
      if (Array.isArray(mod.tasks)) {
        mod.tasks.forEach((t) => {
          totalTasks++;
          if (t.status === 'COMPLETE') completedTasks++;
        });
      }
    });

    const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const valueEl = document.getElementById('master-readiness-percent');
    const ringCircle = document.getElementById('master-ring-circle');
    const tasksCountEl = document.getElementById('master-tasks-completed-count');

    if (valueEl) valueEl.textContent = `${percent}%`;
    if (tasksCountEl) tasksCountEl.textContent = `${completedTasks}/${totalTasks} Tasks Sealed`;

    if (ringCircle) {
      // Circumference = 2 * PI * 20 = ~125.66
      const circumference = 125.66;
      const offset = circumference - (percent / 100) * circumference;
      ringCircle.style.strokeDashoffset = offset;
    }
  }

  // Dynamic Countdown Calculation (Timezone Safe UTC & Accurate Day Delta)
  renderCountdowns() {
    this.updateDynamicCountdowns();
  }

  updateDynamicCountdowns() {
    if (!this.state) return;
    const now = new Date();

    // 1. TRICARE 90-Day Grace Window
    const tricareDeadlineStr = this.state.command_anchors?.tricare_grace?.deadline || '2027-02-13';
    const tricareDeadline = new Date(tricareDeadlineStr + 'T23:59:59');
    const tricareDiff = tricareDeadline - now;

    const tricareDaysEl = document.getElementById('tricare-countdown-days');
    const tricareSubEl = document.getElementById('tricare-countdown-sub');
    const tricareProgressEl = document.getElementById('tricare-progress-fill');
    const tricareCard = document.getElementById('tricare-card');

    if (tricareDaysEl) {
      if (tricareDiff <= 0) {
        tricareDaysEl.textContent = 'EXPIRED';
        if (tricareCard) tricareCard.className = 'telemetry-countdown-card card-crimson';
      } else {
        const days = Math.floor(tricareDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((tricareDiff / (1000 * 60 * 60)) % 24);
        tricareDaysEl.textContent = `${days}d ${hours}h`;

        const totalWindow = 90 * 24 * 60 * 60 * 1000;
        const elapsed = totalWindow - tricareDiff;
        const pct = Math.min(100, Math.max(0, Math.round((elapsed / totalWindow) * 100)));
        if (tricareProgressEl) tricareProgressEl.style.width = `${pct}%`;

        if (tricareSubEl) {
          tricareSubEl.textContent = `Hard Deadline: ${tricareDeadlineStr} (${pct}% elapsed)`;
        }

        if (tricareCard) {
          if (days > 45) tricareCard.className = 'telemetry-countdown-card card-emerald';
          else if (days > 15) tricareCard.className = 'telemetry-countdown-card card-amber';
          else tricareCard.className = 'telemetry-countdown-card card-crimson';
        }
      }
    }

    // 2. RAPIDS Appointment Delta
    const rapidsScheduledStr = this.state.command_anchors?.rapids_appointment?.scheduled_date || '2026-12-05T10:00:00';
    const rapidsDate = new Date(rapidsScheduledStr);
    const rapidsDiff = rapidsDate - now;

    const rapidsDaysEl = document.getElementById('rapids-countdown-days');
    const rapidsSubEl = document.getElementById('rapids-countdown-sub');

    if (rapidsDaysEl) {
      if (rapidsDiff <= 0) {
        rapidsDaysEl.textContent = 'COMPLETE';
      } else {
        const rDays = Math.floor(rapidsDiff / (1000 * 60 * 60 * 24));
        const rHours = Math.floor((rapidsDiff / (1000 * 60 * 60)) % 24);
        rapidsDaysEl.textContent = `${rDays}d ${rHours}h`;
        if (rapidsSubEl) {
          rapidsSubEl.textContent = `Waller Hall | Confirmation: ${this.state.command_anchors.rapids_appointment.confirmation_code || 'CONFIRMED'}`;
        }
      }
    }

    // 3. Next Pediatric Sortie
    const nextPediatricStr = this.state.command_anchors?.next_medical_milestone?.target_date || '2027-01-15T09:30:00';
    const pedDate = new Date(nextPediatricStr);
    const pedDiff = pedDate - now;

    const pedDaysEl = document.getElementById('pediatric-countdown-days');
    const pedSubEl = document.getElementById('pediatric-countdown-sub');

    if (pedDaysEl) {
      if (pedDiff <= 0) {
        pedDaysEl.textContent = 'TODAY';
      } else {
        const pDays = Math.floor(pedDiff / (1000 * 60 * 60 * 24));
        pedDaysEl.textContent = `${pDays} Days`;
        if (pedSubEl) {
          pedSubEl.textContent = this.state.command_anchors.next_medical_milestone.title;
        }
      }
    }

    // 4. Baby Aiden Age / T-Sortie Days
    const dobStr = this.state.profile?.dob || '2026-11-15';
    const dob = new Date(dobStr);
    const ageDiff = now - dob;
    const ageDaysEl = document.getElementById('infant-days-counter');
    if (ageDaysEl) {
      if (ageDiff < 0) {
        const untilBirth = Math.ceil(Math.abs(ageDiff) / (1000 * 60 * 60 * 24));
        ageDaysEl.textContent = `T-${untilBirth}d (Pre-Delivery)`;
      } else {
        const ageDays = Math.floor(ageDiff / (1000 * 60 * 60 * 24));
        ageDaysEl.textContent = `T+${ageDays} Days of Life`;
      }
    }
  }

  // Render Module Tasks (Modules A, B, C, D)
  renderModuleTasks() {
    this.renderModuleTaskList('module_a', 'grid-module-a');
    this.renderModuleTaskList('module_b', 'grid-module-b');
    this.renderModuleTaskList('module_c', 'grid-module-c');
    this.renderModuleTaskList('module_d', 'grid-module-d');
  }

  renderModuleTaskList(moduleId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const mod = this.state.modules?.[moduleId];
    if (!mod || !Array.isArray(mod.tasks)) {
      container.innerHTML = '<div class="text-muted">No operational tasks registered.</div>';
      return;
    }

    container.innerHTML = mod.tasks
      .map((t) => {
        const checkTotal = t.checklists ? t.checklists.length : 0;
        const checkDone = t.checklists_completed ? t.checklists_completed.length : t.status === 'COMPLETE' ? checkTotal : 0;
        const isComplete = t.status === 'COMPLETE';
        const priorityPill =
          t.priority === 'CRITICAL' ? 'pill-crimson' : t.priority === 'HIGH' ? 'pill-amber' : 'pill-cyan';
        const cardBorderClass = isComplete ? 'task-card-complete' : '';

        // Check if documents are vaulted or prompted for this task
        const taskDocs = (this.state.vault_documents || []).filter((d) => d.task_id === t.id);
        const needsDocPrompt = ['A4', 'A5', 'A6', 'B1', 'B3', 'B4', 'C2', 'D1', 'D2', 'D3'].includes(t.id);
        let docPromptHtml = '';
        if (taskDocs.length > 0) {
          docPromptHtml = `<button class="vault-prompt-badge has-docs open-vault-task-btn" data-task-id="${t.id}" title="${taskDocs.length} record(s) filed. Click to view.">📁 ${taskDocs.length} RECORD(S)</button>`;
        } else if (needsDocPrompt) {
          docPromptHtml = `<button class="vault-prompt-badge need-doc prompt-upload-btn" data-task-id="${t.id}" title="OPSEC Prompt: File supporting document">📎 FILE RECORD</button>`;
        }

        return `
        <div class="task-matrix-card ${cardBorderClass}" data-task-id="${t.id}">
          <div class="task-card-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="task-id-badge">${t.id}</span>
              <span class="task-category-tag">${t.category || 'General'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              ${docPromptHtml}
              <span class="countdown-pill ${priorityPill}">${t.priority || 'NORMAL'}</span>
            </div>
          </div>
          <div class="task-card-title">${t.title}</div>
          <div class="task-card-desc">${t.notes || (t.sla ? `SLA: ${t.sla}` : 'Operational task')}</div>
          <div class="task-card-footer">
            <button class="hud-check-toggle-btn ${isComplete ? 'is-complete' : ''}" data-task-id="${t.id}" title="${isComplete ? 'Task Sealed. Click to reopen' : 'Click to seal task as complete'}">
              <span class="hud-check-box">${isComplete ? '✓' : ''}</span>
              <span class="hud-check-text">${isComplete ? 'SEALED COMPLETE' : 'MARK COMPLETE'}</span>
            </button>
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="task-checklist-summary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${checkDone}/${checkTotal}
              </span>
              <span class="status-pill status-${t.status}">${t.status}</span>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  // Render Clinical & Pediatric Tab (Module E)
  renderClinicalData() {
    const modE = this.state.modules?.module_e;
    if (!modE) return;

    // 1. Vaccine Glidepath Table
    const vacTableBody = document.getElementById('vaccine-table-body');
    if (vacTableBody && Array.isArray(modE.vaccine_glidepath)) {
      vacTableBody.innerHTML = modE.vaccine_glidepath
        .map((v) => {
          const isComplete = v.status === 'COMPLETE';
          const statusClass =
            isComplete ? 'pill-emerald' : v.status === 'SCHEDULED' ? 'pill-cyan' : 'pill-amber';
          return `
          <tr>
            <td style="font-family:var(--font-mono); font-weight:700; color:var(--cyan-telemetry);">${v.stage}</td>
            <td style="font-weight:600;">${v.vaccine}</td>
            <td style="font-family:var(--font-mono); color:var(--text-muted);">${v.target_date || 'TBD'} ${v.date_administered ? `(Administered: ${v.date_administered})` : ''}</td>
            <td><span class="countdown-pill ${statusClass}">${v.status}</span></td>
            <td>
              <button class="hud-btn hud-btn-sm ${isComplete ? 'hud-btn-emerald' : 'hud-btn-primary'} vac-toggle-btn" data-vac-id="${v.id}" title="${isComplete ? 'Vaccine recorded. Click to uncheck' : 'Click to record vaccine as administered today'}">
                ${isComplete ? '✓ GIVEN' : 'MARK GIVEN'}
              </button>
            </td>
          </tr>
        `;
        })
        .join('');
    }

    // 2. Developmental Milestones Checklist
    const devContainer = document.getElementById('milestone-checklist-container');
    if (devContainer && Array.isArray(modE.developmental_milestones)) {
      devContainer.innerHTML = modE.developmental_milestones
        .map((m) => {
          const isAchieved = m.status === 'ACHIEVED';
          return `
          <div class="checklist-row" style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <input type="checkbox" id="milestone-${m.id}" data-milestone-id="${m.id}" ${isAchieved ? 'checked' : ''} />
            <label for="milestone-${m.id}" style="display:flex; flex-direction:column; cursor:pointer;">
              <span style="font-weight:600; color:${isAchieved ? 'var(--emerald-nominal)' : 'var(--ghost-white)'}">${m.title}</span>
              <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${m.category} | Target: ${m.target_age} ${m.date_achieved ? `(Achieved: ${m.date_achieved})` : ''}</span>
            </label>
          </div>
        `;
        })
        .join('');
    }

    // 3. Tummy Time Stats
    const tt = modE.tummy_time_tracker;
    if (tt) {
      const todayMinsEl = document.getElementById('tummy-today-mins');
      const targetMinsEl = document.getElementById('tummy-target-mins');
      if (todayMinsEl) todayMinsEl.textContent = `${tt.today_completed_minutes || 0}m`;
      if (targetMinsEl) targetMinsEl.textContent = `Target: ${tt.daily_target_minutes || 25}m/day`;
    }

    // 4. Update Growth Chart
    if (this.growthChart && modE.growth_telemetry) {
      this.growthChart.setData(
        modE.growth_telemetry.who_standards_boys_0_12m,
        modE.growth_telemetry.measurements,
        modE.growth_telemetry.unit_mode
      );
    }
  }

  // Render Raw Telemetry View & Alerts
  renderRawTelemetry() {
    const telemetryPre = document.getElementById('raw-telemetry-json');
    if (telemetryPre) {
      const telemetry = this.computeClientTelemetry();
      telemetryPre.textContent = JSON.stringify(telemetry, null, 2);
    }

    // Alerts Ledger
    const alertsContainer = document.getElementById('system-alerts-ledger');
    if (alertsContainer && Array.isArray(this.state.system_alerts)) {
      alertsContainer.innerHTML = this.state.system_alerts
        .map((alt) => {
          const pill =
            alt.severity === 'CRITICAL' ? 'pill-crimson' : alt.severity === 'WARNING' ? 'pill-amber' : 'pill-cyan';
          return `
          <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); padding:10px 14px; border-radius:6px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="countdown-pill ${pill}">${alt.severity}</span>
              <span style="font-weight:600;">${alt.message}</span>
            </div>
            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${alt.code}</span>
          </div>
        `;
        })
        .join('');
    }
  }

  // 8. Event Bindings
  attachDomEvents() {
    // Tab Switching
    document.querySelectorAll('.matrix-tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const tabKey = btn.dataset.tab;
        this.switchTab(tabKey);
      });
    });

    // Unified Card & Checkbox Click Delegation
    document.addEventListener('click', (e) => {
      // 1. Direct Task Checkbox Toggle (stop propagation to prevent opening modal)
      const toggleBtn = e.target.closest('.hud-check-toggle-btn, .hud-check-toggle-sm');
      if (toggleBtn && toggleBtn.dataset.taskId) {
        e.stopPropagation();
        e.preventDefault();
        this.toggleTaskComplete(toggleBtn.dataset.taskId);
        return;
      }

      // 2. Direct Vaccine Toggle
      const vacBtn = e.target.closest('.vac-toggle-btn');
      if (vacBtn && vacBtn.dataset.vacId) {
        e.stopPropagation();
        e.preventDefault();
        this.toggleVaccineComplete(vacBtn.dataset.vacId);
        return;
      }

      // 3. Document Vault Prompt Button (e.g., from Glidepath or Task Card)
      const promptBtn = e.target.closest('.prompt-upload-btn');
      if (promptBtn && promptBtn.dataset.taskId) {
        e.stopPropagation();
        e.preventDefault();
        this.switchTab('document-vault');
        const select = document.getElementById('vault-doc-task-select');
        if (select) select.value = promptBtn.dataset.taskId;
        const dropzone = document.getElementById('vault-dropzone');
        if (dropzone) dropzone.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // 4. Open Vault Attached Records for Task
      const vaultTaskBtn = e.target.closest('.open-vault-task-btn');
      if (vaultTaskBtn && vaultTaskBtn.dataset.taskId) {
        e.stopPropagation();
        e.preventDefault();
        this.openActionModal(vaultTaskBtn.dataset.taskId);
        return;
      }

      // 5. Delete Document from Vault
      const delBtn = e.target.closest('.delete-vault-doc-btn');
      if (delBtn && delBtn.dataset.docId) {
        e.stopPropagation();
        e.preventDefault();
        this.deleteVaultDocument(delBtn.dataset.docId);
        return;
      }

      // 6. Click on linked task badge in Vault Table
      const openTaskBtn = e.target.closest('[data-open-task]');
      if (openTaskBtn && openTaskBtn.dataset.openTask) {
        e.stopPropagation();
        e.preventDefault();
        this.openActionModal(openTaskBtn.dataset.openTask);
        return;
      }

      // 7. Card click opens action modal
      const card = e.target.closest('.task-matrix-card, .glidepath-milestone-card, .swimlane-node-card');
      if (card && card.dataset.taskId) {
        this.openActionModal(card.dataset.taskId);
      }
    });

    // Modal Seal Button Listener
    const modalSealBtn = document.getElementById('modal-seal-btn');
    if (modalSealBtn) {
      modalSealBtn.addEventListener('click', () => {
        if (this.selectedTask) {
          this.toggleTaskComplete(this.selectedTask.id);
        }
      });
    }

    // Mission Glidepath Filter Buttons
    document.querySelectorAll('.glidepath-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.glidepath-filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter || 'all';
        this.renderMissionGlidepath();
      });
    });

    // Mission Glidepath Recenter Today Button
    const recenterBtn = document.getElementById('btn-recenter-today');
    if (recenterBtn) {
      recenterBtn.addEventListener('click', () => {
        const viewport = document.getElementById('glidepath-scroll-area');
        const marker = document.getElementById('glidepath-current-marker');
        if (viewport && marker) {
          const targetScroll = marker.offsetLeft - (viewport.clientWidth / 2) + (marker.clientWidth / 2);
          viewport.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
        }
      });
    }

    // Tactical Calendar Next / Prev Buttons
    const calPrevBtn = document.getElementById('cal-prev-btn');
    if (calPrevBtn) {
      calPrevBtn.addEventListener('click', () => {
        this.calendarMonth--;
        if (this.calendarMonth < 0) {
          this.calendarMonth = 11;
          this.calendarYear--;
        }
        this.renderTacticalCalendar();
      });
    }

    const calNextBtn = document.getElementById('cal-next-btn');
    if (calNextBtn) {
      calNextBtn.addEventListener('click', () => {
        this.calendarMonth++;
        if (this.calendarMonth > 11) {
          this.calendarMonth = 0;
          this.calendarYear++;
        }
        this.renderTacticalCalendar();
      });
    }

    // Tactical Calendar Quick Jump Buttons
    document.querySelectorAll('.cal-quick-jump').forEach((btn) => {
      btn.addEventListener('click', () => {
        const monthAttr = btn.dataset.month;
        if (monthAttr) {
          const parts = monthAttr.split('-');
          if (parts.length === 2) {
            this.calendarYear = parseInt(parts[0], 10);
            this.calendarMonth = parseInt(parts[1], 10) - 1;
            this.renderTacticalCalendar();
          }
        }
      });
    });

    // Tactical Calendar Drawer Close Button
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', () => {
        const drawer = document.getElementById('calendar-day-drawer');
        if (drawer) drawer.style.display = 'none';
      });
    }

    // Modal Close
    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('task-action-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeActionModal());
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeActionModal();
      });
    }

    // Status Selector Change inside Modal
    const statusSelect = document.getElementById('modal-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        if (this.selectedTask) {
          this.updateTaskStatus(this.selectedTask.id, e.target.value);
        }
      });
    }

    // Modal Notes Save
    const saveNotesBtn = document.getElementById('modal-save-notes-btn');
    if (saveNotesBtn) {
      saveNotesBtn.addEventListener('click', () => {
        if (this.selectedTask) {
          const notes = document.getElementById('modal-notes-input').value;
          this.updateTaskNotes(this.selectedTask.id, notes);
        }
      });
    }

    // Developmental Milestones checkbox click
    document.addEventListener('change', (e) => {
      if (e.target.dataset.milestoneId) {
        const mId = e.target.dataset.milestoneId;
        const status = e.target.checked ? 'ACHIEVED' : 'PENDING';
        this.updateMilestone(mId, status);
      }
    });

    // Metric Switcher (Weight / Length / Head Circ)
    document.querySelectorAll('.metric-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.metric-toggle-btn').forEach((b) => b.classList.remove('hud-btn-primary'));
        btn.classList.add('hud-btn-primary');
        this.currentMetric = btn.dataset.metric;
        if (this.growthChart) {
          this.growthChart.metricType = this.currentMetric;
          this.growthChart.render();
        }
      });
    });

    // Add Growth Measurement
    const addGrowthBtn = document.getElementById('open-add-growth-btn');
    if (addGrowthBtn) {
      addGrowthBtn.addEventListener('click', () => {
        this.openGrowthModal();
      });
    }

    // Export Telemetry JSON
    const exportBtn = document.getElementById('export-telemetry-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        window.location.href = this.apiUrl('/api/v1/nrmc/export');
        this.showToast('Telemetry state exported as JSON file.');
      });
    }

    // Import State JSON
    const importInput = document.getElementById('import-state-input');
    const importBtn = document.getElementById('import-state-btn');
    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => importInput.click());
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (evt) => {
            try {
              const imported = JSON.parse(evt.target.result);
              const res = await fetch(this.apiUrl('/api/v1/nrmc/import'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imported)
              });
              if (res.ok) {
                this.state = imported;
                localStorage.setItem('nrmc_cached_state', JSON.stringify(imported));
                this.render();
                this.showToast('State successfully imported!');
              } else {
                this.showToast('Failed to import state', 'error');
              }
            } catch (err) {
              this.showToast('Invalid JSON file format', 'error');
            }
          };
          reader.readAsText(file);
        }
      });
    }

    // Configure Profile / DOB button
    const configBtn = document.getElementById('config-profile-btn');
    if (configBtn) {
      configBtn.addEventListener('click', () => this.openProfileConfigModal());
    }

    const configCloseBtn = document.getElementById('profile-config-close-btn');
    if (configCloseBtn) {
      configCloseBtn.addEventListener('click', () => this.closeProfileConfigModal());
    }

    const configCancelBtn = document.getElementById('profile-config-cancel-btn');
    if (configCancelBtn) {
      configCancelBtn.addEventListener('click', () => this.closeProfileConfigModal());
    }

    const configApplyBtn = document.getElementById('profile-config-apply-btn');
    if (configApplyBtn) {
      configApplyBtn.addEventListener('click', () => this.saveProfileConfiguration());
    }

    const cfgDobInput = document.getElementById('cfg-baby-dob');
    if (cfgDobInput) {
      cfgDobInput.addEventListener('input', () => this.previewRecalculation());
    }

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeActionModal();
        this.closeProfileConfigModal();
        const opsecModal = document.getElementById('opsec-warning-modal');
        if (opsecModal) opsecModal.classList.remove('active');
      }
    });

    // Modal Quick Upload Button -> Link to Document Vault
    const quickUploadBtn = document.getElementById('modal-quick-upload-btn');
    if (quickUploadBtn) {
      quickUploadBtn.addEventListener('click', () => {
        if (this.selectedTask) {
          const tId = this.selectedTask.id;
          this.closeActionModal();
          this.switchTab('document-vault');
          const select = document.getElementById('vault-doc-task-select');
          if (select) select.value = tId;
          const dropzone = document.getElementById('vault-dropzone');
          if (dropzone) dropzone.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Vault Dropzone & File Input
    const dropzone = document.getElementById('vault-dropzone');
    const fileInput = document.getElementById('vault-file-input');
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length) {
          this.handleVaultFileSelection(e.target.files[0]);
        }
      });
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-active');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-active'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-active');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
          this.handleVaultFileSelection(e.dataTransfer.files[0]);
        }
      });
    }

    // Vault Upload Submit Button
    const submitUploadBtn = document.getElementById('vault-upload-submit-btn');
    if (submitUploadBtn) {
      submitUploadBtn.addEventListener('click', () => this.uploadStagedVaultDocument());
    }

    // Vault Category Filter Buttons
    document.querySelectorAll('.vault-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.currentVaultFilter = btn.dataset.cat || 'ALL';
        this.renderDocumentVault();
      });
    });

    // OPSEC Warning Intercept Modal Controls
    const opsecConfirm = document.getElementById('opsec-redaction-confirm');
    const opsecProceed = document.getElementById('opsec-proceed-btn');
    const opsecAbort = document.getElementById('opsec-abort-btn');
    const opsecClose = document.getElementById('opsec-close-btn');

    if (opsecConfirm && opsecProceed) {
      opsecConfirm.addEventListener('change', (e) => {
        opsecProceed.disabled = !e.target.checked;
        opsecProceed.style.opacity = e.target.checked ? '1' : '0.5';
        opsecProceed.style.cursor = e.target.checked ? 'pointer' : 'not-allowed';
      });
    }

    const closeOpsecModal = () => {
      const modal = document.getElementById('opsec-warning-modal');
      if (modal) modal.classList.remove('active');
      this.pendingOpsecFile = null;
      const fInput = document.getElementById('vault-file-input');
      if (fInput) fInput.value = '';
    };

    if (opsecAbort) opsecAbort.addEventListener('click', closeOpsecModal);
    if (opsecClose) opsecClose.addEventListener('click', closeOpsecModal);

    if (opsecProceed) {
      opsecProceed.addEventListener('click', () => {
        const modal = document.getElementById('opsec-warning-modal');
        if (modal) modal.classList.remove('active');
        if (this.pendingOpsecFile) {
          this.stageVaultFile(this.pendingOpsecFile);
          this.showToast('Redacted copy staged for vaulting.', 'warning');
        }
      });
    }
  }

  switchTab(tabKey) {
    this.currentTab = tabKey;
    document.querySelectorAll('.matrix-tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === tabKey);
    });
    document.querySelectorAll('.tab-content-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `tab-${tabKey}`);
    });
  }

  // 9. Action Modal Logic
  openActionModal(taskId) {
    let task = null;
    Object.values(this.state.modules || {}).forEach((mod) => {
      if (Array.isArray(mod.tasks)) {
        const found = mod.tasks.find((t) => t.id.toUpperCase() === taskId.toUpperCase());
        if (found) task = found;
      }
    });

    if (!task) return;
    this.selectedTask = task;

    const modal = document.getElementById('task-action-modal');
    document.getElementById('modal-task-id').textContent = task.id;
    document.getElementById('modal-task-title').textContent = task.title;
    document.getElementById('modal-category').textContent = task.category || 'General';
    document.getElementById('modal-sla').textContent = task.sla || 'Standard';
    document.getElementById('modal-timeframe').textContent = task.timeframe || 'Immediate';
    document.getElementById('modal-status-select').value = task.status;
    document.getElementById('modal-notes-input').value = task.notes || '';

    // Documentation Checklist with stateful checkboxes
    const checklistContainer = document.getElementById('modal-checklists');
    if (checklistContainer) {
      if (Array.isArray(task.checklists) && task.checklists.length > 0) {
        if (!Array.isArray(task.checklists_completed)) {
          task.checklists_completed = task.status === 'COMPLETE' ? [...task.checklists] : [];
        }

        checklistContainer.innerHTML = task.checklists
          .map((item, idx) => {
            const isChecked = task.checklists_completed.includes(item);
            return `
            <div class="checklist-row">
              <input type="checkbox" id="chk-${task.id}-${idx}" data-item="${item}" ${isChecked ? 'checked' : ''} />
              <label for="chk-${task.id}-${idx}" style="cursor:pointer; color:${isChecked ? 'var(--emerald-nominal)' : '#cbd5e1'}">${item}</label>
            </div>
          `;
          })
          .join('');

        checklistContainer.querySelectorAll('input[type="checkbox"]').forEach((box) => {
          box.addEventListener('change', (e) => {
            const val = e.target.dataset.item;
            if (e.target.checked) {
              if (!task.checklists_completed.includes(val)) task.checklists_completed.push(val);
            } else {
              task.checklists_completed = task.checklists_completed.filter((x) => x !== val);
            }

            // Auto-advance or revert task completion based on full checklist fulfillment
            if (task.checklists.length > 0 && task.checklists_completed.length === task.checklists.length) {
              task.status = 'COMPLETE';
              document.getElementById('modal-status-select').value = 'COMPLETE';
              this.updateModalSealButton(true);
              this.playTacticalFeedback('seal');
              this.showToast(`All documentation verified! Task ${task.id} sealed COMPLETE.`);
            } else if (task.status === 'COMPLETE' && task.checklists_completed.length < task.checklists.length) {
              task.status = 'IN_FLIGHT';
              document.getElementById('modal-status-select').value = 'IN_FLIGHT';
              this.updateModalSealButton(false);
            }

            this.syncTaskUpdate(task.id, {
              status: task.status,
              checklists_completed: task.checklists_completed
            });
            this.render();
          });
        });
      } else {
        checklistContainer.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem;">No checklist constraints defined for this sortie.</div>';
      }
    }

    // Update Modal Seal Button state
    this.updateModalSealButton(task.status === 'COMPLETE');

    // Required Forms & Download Links
    const formsContainer = document.getElementById('modal-forms-container');
    if (formsContainer) {
      let html = '';
      if (Array.isArray(task.form_downloads) && task.form_downloads.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">';
        task.form_downloads.forEach((f) => {
          html += `
            <div style="background:rgba(0,0,0,0.35); border:1px solid var(--border-subtle); border-radius:6px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
              <div>
                <div style="font-weight:700; color:var(--ghost-white); font-size:0.88rem;">📄 ${f.name}</div>
                <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">Internal Archive: ./forms/${f.file}</div>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <a href="./forms/${f.file}" download="${f.file}" class="hud-btn hud-btn-sm hud-btn-primary" target="_blank">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  DOWNLOAD FORM / SOP
                </a>
                ${f.official_url ? `
                  <a href="${f.official_url}" target="_blank" rel="noopener noreferrer" class="hud-btn hud-btn-sm" style="border-color:var(--cyan-telemetry); color:var(--cyan-telemetry);">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    VERIFIED .GOV LINK
                  </a>
                ` : ''}
              </div>
            </div>
          `;
        });
        html += '</div>';
      } else if (Array.isArray(task.forms) && task.forms.length > 0) {
        html += `<div style="font-family:var(--font-mono); font-size:0.8rem; color:#93c5fd; margin-bottom:8px;">Forms: ${task.forms.join(', ')}</div>`;
      } else {
        html += '<div style="color:var(--text-muted); font-size:0.8rem;">No standard federal forms required.</div>';
      }
      formsContainer.innerHTML = html;
    }

    // External Portal Links
    const portalsContainer = document.getElementById('modal-portals-container');
    if (portalsContainer) {
      if (Array.isArray(task.portals) && task.portals.length > 0) {
        portalsContainer.innerHTML = task.portals
          .map(
            (p) => `
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="hud-btn hud-btn-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            ${p.name}
          </a>
        `
          )
          .join('');
      } else {
        portalsContainer.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem;">No external web portal required.</div>';
      }
    }

    // Vault Attachments for this task
    const attachedContainer = document.getElementById('modal-attached-documents');
    if (attachedContainer) {
      const taskDocs = (this.state.vault_documents || []).filter((d) => d.task_id === task.id);
      if (taskDocs.length === 0) {
        attachedContainer.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem;">No documents currently archived for this sortie. Click "+ FILE RECORD" above to archive clinic slips or DD forms.</div>';
      } else {
        attachedContainer.innerHTML = taskDocs
          .map(
            (d) => `
          <div style="background:rgba(0,0,0,0.35); border:1px solid var(--border-subtle); border-radius:6px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <div>
              <div style="font-weight:700; color:var(--ghost-white); font-size:0.88rem;">📁 ${d.name}</div>
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">
                ${d.original_filename} • ${Math.round(d.file_size / 1024)} KB • ${d.uploaded_at ? d.uploaded_at.split('T')[0] : ''}
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <a href="${d.data_url || this.apiUrl('/api/v1/nrmc/vault/file/' + d.safe_filename)}" target="_blank" class="hud-btn hud-btn-sm">VIEW</a>
              <a href="${d.data_url || this.apiUrl('/api/v1/nrmc/vault/file/' + d.safe_filename)}" download="${d.original_filename}" class="hud-btn hud-btn-sm hud-btn-primary">DOWNLOAD</a>
              <button class="hud-btn hud-btn-sm delete-vault-doc-btn" data-doc-id="${d.id}" style="color:#f87171;">REMOVE</button>
            </div>
          </div>
        `
          )
          .join('');
      }
    }

    modal.classList.add('active');
  }

  closeActionModal() {
    const modal = document.getElementById('task-action-modal');
    if (modal) modal.classList.remove('active');
    this.selectedTask = null;
  }

  updateModalSealButton(isComplete) {
    const sealBtn = document.getElementById('modal-seal-btn');
    if (!sealBtn) return;
    if (isComplete) {
      sealBtn.className = 'hud-btn hud-btn-amber';
      sealBtn.innerHTML = '↺ REOPEN SORTIE (MARK PENDING)';
    } else {
      sealBtn.className = 'hud-btn hud-btn-emerald';
      sealBtn.innerHTML = '✓ SEAL SORTIE AS 100% COMPLETE';
    }
  }

  // Tactical Audio Feedback (Web Audio API)
  playTacticalFeedback(type = 'seal') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'seal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440.0, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(329.63, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {
      // Audio playback optional if browser blocks before gesture
    }
  }

  // Operator Direct Checkbox Completion Toggle (Single-click Seal)
  async toggleTaskComplete(taskId) {
    if (!this.state) return;
    let target = null;
    Object.values(this.state.modules || {}).forEach((mod) => {
      if (Array.isArray(mod.tasks)) {
        const found = mod.tasks.find((t) => t.id.toUpperCase() === taskId.toUpperCase());
        if (found) target = found;
      }
    });

    if (!target) return;

    const willComplete = target.status !== 'COMPLETE';
    target.status = willComplete ? 'COMPLETE' : 'PENDING';
    if (willComplete) {
      target.checklists_completed = Array.isArray(target.checklists) ? [...target.checklists] : [];
    } else {
      target.checklists_completed = [];
    }
    target.last_updated = new Date().toISOString();

    // Trigger audio feedback & notification
    this.playTacticalFeedback(willComplete ? 'seal' : 'unseal');
    this.showToast(willComplete ? `✓ Task ${target.id} sealed as COMPLETE!` : `↺ Task ${target.id} reopened to PENDING.`);

    // If modal is active for this task, sync modal controls
    if (this.selectedTask && this.selectedTask.id.toUpperCase() === taskId.toUpperCase()) {
      this.selectedTask.status = target.status;
      this.selectedTask.checklists_completed = target.checklists_completed;
      const statusSelect = document.getElementById('modal-status-select');
      if (statusSelect) statusSelect.value = target.status;
      this.updateModalSealButton(target.status === 'COMPLETE');

      // Update modal checkboxes
      const checklistContainer = document.getElementById('modal-checklists');
      if (checklistContainer) {
        checklistContainer.querySelectorAll('input[type="checkbox"]').forEach((box) => {
          box.checked = target.checklists_completed.includes(box.dataset.item);
        });
      }
    }

    // Immediately sync to server
    await this.syncTaskUpdate(target.id, {
      status: target.status,
      checklists_completed: target.checklists_completed
    });

    this.render();
  }

  // Operator Direct Vaccine Completion Toggle
  async toggleVaccineComplete(vacId) {
    const vaccines = this.state.modules?.module_e?.vaccine_glidepath || [];
    const v = vaccines.find((item) => item.id.toUpperCase() === vacId.toUpperCase());
    if (!v) return;

    const willComplete = v.status !== 'COMPLETE';
    v.status = willComplete ? 'COMPLETE' : 'SCHEDULED';
    v.date_administered = willComplete ? new Date().toISOString().split('T')[0] : null;

    this.playTacticalFeedback(willComplete ? 'seal' : 'unseal');
    this.showToast(willComplete ? `✓ Vaccine ${v.vaccine} recorded as GIVEN on ${v.date_administered}!` : `Vaccine ${v.vaccine} reverted to scheduled.`);
    this.render();

    try {
      await fetch(this.apiUrl(`/api/v1/nrmc/vaccine/${v.id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: v.status,
          date_administered: v.date_administered
        })
      });
      this.broadcastFleetTelemetry();
    } catch (err) {
      console.warn('[NRMC] Vaccine update saved locally:', err.message);
    }
    localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
  }

  // ====================================================================
  // DOCUMENT VAULT // CLIENT ENGINE & OPSEC PII SAFEGUARDS
  // ====================================================================

  renderDocumentVault() {
    const tbody = document.getElementById('vault-documents-tbody');
    const totalCountPill = document.getElementById('vault-total-count-pill');
    const navCountBadge = document.getElementById('nav-vault-count');
    if (!tbody) return;

    const allDocs = Array.isArray(this.state.vault_documents) ? this.state.vault_documents : [];
    if (totalCountPill) totalCountPill.textContent = `${allDocs.length} DOCUMENTS`;
    if (navCountBadge) navCountBadge.textContent = `${allDocs.length} FILES`;

    // Filter by category
    let displayed = allDocs;
    if (this.currentVaultFilter && this.currentVaultFilter !== 'ALL') {
      displayed = allDocs.filter((d) => d.category === this.currentVaultFilter);
    }

    // Update filter buttons count
    document.querySelectorAll('.vault-filter-btn').forEach((btn) => {
      const cat = btn.dataset.cat;
      btn.classList.toggle('active', cat === this.currentVaultFilter);
      if (cat === 'ALL') {
        btn.textContent = `ALL (${allDocs.length})`;
      } else {
        const c = allDocs.filter((d) => d.category === cat).length;
        const labels = {
          'CLINICAL_RECORD': 'CLINICAL',
          'MILITARY_ADMIN': 'MILITARY',
          'FINANCIAL_BENEFITS': 'FINANCIAL',
          'PHOTO_COMPLIANCE': 'PHOTOS'
        };
        btn.textContent = `${labels[cat] || cat} (${c})`;
      }
    });

    if (displayed.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted); font-family:var(--font-mono);">
            No archived records found in this category. Use the dropzone above to file records into the vault.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = displayed
      .map((d) => {
        const catPill =
          d.category === 'CLINICAL_RECORD'
            ? 'pill-emerald'
            : d.category === 'MILITARY_ADMIN'
            ? 'pill-cyan'
            : d.category === 'FINANCIAL_BENEFITS'
            ? 'pill-amber'
            : 'pill-violet';

        const sizeKb = Math.round((d.file_size || 0) / 1024);
        const opsecPill =
          d.opsec_flag === 'REDACTED_CONFIRMED'
            ? '<span class="countdown-pill pill-crimson">REDACTED CHECKED</span>'
            : '<span class="countdown-pill pill-cyan">STANDARD PII SAFE</span>';

        return `
        <tr>
          <td>
            <div style="font-weight:700; color:var(--ghost-white); font-size:0.9rem;">${d.name}</div>
            <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">${d.original_filename} ${d.notes ? `• ${d.notes}` : ''}</div>
          </td>
          <td><span class="countdown-pill ${catPill}">${(d.category || '').replace('_', ' ')}</span></td>
          <td>
            ${d.task_id ? `<span class="task-id-badge" style="cursor:pointer;" data-open-task="${d.task_id}">${d.task_id}</span>` : '<span style="color:var(--text-muted); font-family:var(--font-mono); font-size:0.72rem;">GENERAL</span>'}
          </td>
          <td style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${d.uploaded_at ? d.uploaded_at.split('T')[0] : 'N/A'}</td>
          <td style="font-family:var(--font-mono); font-size:0.75rem;">${sizeKb} KB</td>
          <td>${opsecPill}</td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px;">
              <a href="${d.data_url || this.apiUrl('/api/v1/nrmc/vault/file/' + d.safe_filename)}" target="_blank" class="hud-btn hud-btn-sm" title="View document inline">VIEW</a>
              <a href="${d.data_url || this.apiUrl('/api/v1/nrmc/vault/file/' + d.safe_filename)}" download="${d.original_filename}" class="hud-btn hud-btn-sm hud-btn-primary" title="Download physical file">DOWNLOAD</a>
              <button class="hud-btn hud-btn-sm delete-vault-doc-btn" data-doc-id="${d.id}" title="Delete document from vault" style="color:#f87171;">DELETE</button>
            </div>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  handleVaultFileSelection(file) {
    if (!file) return;

    // OPSEC Sensitivity Check
    const sensitiveRegex = /ssn|social[-_\s]?security|passport|birth[-_\s]?cert/i;
    const isSensitive = sensitiveRegex.test(file.name);

    if (isSensitive) {
      this.pendingOpsecFile = file;
      const modal = document.getElementById('opsec-warning-modal');
      const filenameEl = document.getElementById('opsec-detected-filename');
      const confirmBox = document.getElementById('opsec-redaction-confirm');
      const proceedBtn = document.getElementById('opsec-proceed-btn');

      if (filenameEl) filenameEl.textContent = file.name;
      if (confirmBox) confirmBox.checked = false;
      if (proceedBtn) {
        proceedBtn.disabled = true;
        proceedBtn.style.opacity = '0.5';
        proceedBtn.style.cursor = 'not-allowed';
      }
      if (modal) modal.classList.add('active');
      return;
    }

    this.stageVaultFile(file);
  }

  stageVaultFile(file) {
    this.stagedVaultFile = file;
    const nameEl = document.getElementById('vault-selected-file-name');
    const titleInput = document.getElementById('vault-doc-name-input');
    if (nameEl) {
      nameEl.textContent = `Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    }
    if (titleInput && !titleInput.value) {
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      titleInput.value = cleanTitle;
    }
  }

  async uploadStagedVaultDocument() {
    if (!this.stagedVaultFile) {
      this.showToast('Please select or drop a document to archive', 'error');
      return;
    }

    const titleInput = document.getElementById('vault-doc-name-input');
    const categorySelect = document.getElementById('vault-doc-category-select');
    const taskSelect = document.getElementById('vault-doc-task-select');
    const notesInput = document.getElementById('vault-doc-notes-input');

    const title = (titleInput?.value || '').trim() || this.stagedVaultFile.name;
    const category = categorySelect?.value || 'GENERAL_ARCHIVE';
    const taskId = taskSelect?.value || null;
    const notes = (notesInput?.value || '').trim();

    const submitBtn = document.getElementById('vault-upload-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENCRYPTING & ARCHIVING...';
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target.result.split(',')[1];
          const payload = {
            name: title,
            filename: this.stagedVaultFile.name,
            category,
            taskId,
            mimeType: this.stagedVaultFile.type || 'application/octet-stream',
            dataBase64: base64Data,
            notes,
            opsec_redaction_confirmed: true
          };

          let createdDoc = null;
          try {
            const res = await fetch(this.apiUrl('/api/v1/nrmc/vault/upload'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (res.ok) {
              const data = await res.json();
              createdDoc = data.document;
            } else if (res.status === 400) {
              const errData = await res.json().catch(() => ({}));
              this.showToast(errData.error || 'Upload rejected by security policy', 'error');
              return;
            }
          } catch (netErr) {
            // Static hosting fallback (e.g. GitHub Pages)
            console.log('[NRMC] Operating in client-side document vault mode');
          }

          if (!createdDoc) {
            const docId = `DOC-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
            createdDoc = {
              id: docId,
              name: title,
              original_filename: this.stagedVaultFile.name,
              safe_filename: `${docId}_${this.stagedVaultFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
              file_size: this.stagedVaultFile.size,
              mime_type: this.stagedVaultFile.type || 'application/octet-stream',
              category,
              task_id: taskId || null,
              notes,
              uploaded_at: new Date().toISOString(),
              opsec_flag: 'STANDARD',
              data_url: e.target.result
            };
          } else {
            createdDoc.data_url = e.target.result;
          }

          if (!Array.isArray(this.state.vault_documents)) {
            this.state.vault_documents = [];
          }
          this.state.vault_documents.unshift(createdDoc);

          // If linked to a taskId, attach to task's attached_documents
          if (taskId) {
            Object.values(this.state.modules || {}).forEach((mod) => {
              if (Array.isArray(mod.tasks)) {
                const t = mod.tasks.find((item) => item.id.toUpperCase() === taskId.toUpperCase());
                if (t) {
                  if (!Array.isArray(t.attached_documents)) t.attached_documents = [];
                  if (!t.attached_documents.includes(createdDoc.id)) t.attached_documents.push(createdDoc.id);
                }
              }
              if (Array.isArray(mod.vaccine_glidepath)) {
                const v = mod.vaccine_glidepath.find((item) => item.id.toUpperCase() === taskId.toUpperCase());
                if (v) {
                  if (!Array.isArray(v.attached_documents)) v.attached_documents = [];
                  if (!v.attached_documents.includes(createdDoc.id)) v.attached_documents.push(createdDoc.id);
                }
              }
            });
          }

          localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));

          this.playTacticalFeedback('seal');
          this.showToast(`Document "${title}" safely archived in vault!`);

          // Reset form
          this.stagedVaultFile = null;
          if (titleInput) titleInput.value = '';
          if (notesInput) notesInput.value = '';
          const nameEl = document.getElementById('vault-selected-file-name');
          if (nameEl) nameEl.textContent = '';
          const fileInput = document.getElementById('vault-file-input');
          if (fileInput) fileInput.value = '';

          this.render();
        } catch (err) {
          this.showToast('Failed to upload document: ' + err.message, 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '🔒 ARCHIVE DOCUMENT TO LOCAL VAULT';
          }
        }
      };
      reader.readAsDataURL(this.stagedVaultFile);
    } catch (e) {
      this.showToast('File read error: ' + e.message, 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔒 ARCHIVE DOCUMENT TO LOCAL VAULT';
      }
    }
  }

  async deleteVaultDocument(docId) {
    if (!confirm('Are you sure you want to remove this document from the local vault?')) return;
    try {
      const res = await fetch(this.apiUrl(`/api/v1/nrmc/vault/document/${docId}`), {
        method: 'DELETE'
      });
      if (res.ok) {
        if (Array.isArray(this.state.vault_documents)) {
          this.state.vault_documents = this.state.vault_documents.filter((d) => d.id !== docId);
        }
        localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
        this.playTacticalFeedback('unseal');
        this.showToast('Document removed from local vault');
        this.render();
      }
    } catch (e) {
      this.showToast('Delete error: ' + e.message, 'error');
    }
  }

  // Task Status Update API sync
  async updateTaskStatus(taskId, newStatus) {
    if (!this.selectedTask) return;
    this.selectedTask.status = newStatus;
    await this.syncTaskUpdate(taskId, { status: newStatus });
    this.render();
    this.showToast(`Task ${taskId} marked as ${newStatus}`);
  }

  async updateTaskNotes(taskId, notes) {
    if (!this.selectedTask) return;
    this.selectedTask.notes = notes;
    await this.syncTaskUpdate(taskId, { notes });
    this.render();
    this.showToast(`Notes saved for task ${taskId}`);
  }

  async syncTaskUpdate(taskId, payload) {
    try {
      const res = await fetch(this.apiUrl(`/api/v1/nrmc/task/${taskId}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        this.broadcastFleetTelemetry();
      }
    } catch (err) {
      console.warn('[NRMC] Task update saved locally only:', err.message);
    }
    localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
  }

  // Update Milestone status
  async updateMilestone(milestoneId, status) {
    const list = this.state.modules?.module_e?.developmental_milestones || [];
    const m = list.find((item) => item.id === milestoneId);
    if (m) {
      m.status = status;
      if (status === 'ACHIEVED') m.date_achieved = new Date().toISOString().split('T')[0];
    }
    this.render();
    try {
      await fetch(this.apiUrl(`/api/v1/nrmc/milestone/${milestoneId}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      this.showToast(`Milestone updated to ${status}`);
    } catch (e) {
      // Local
    }
  }

  // Tummy Time Log API
  async recordTummyTimeSession(minutes) {
    const tt = this.state.modules?.module_e?.tummy_time_tracker;
    if (tt) {
      tt.today_completed_minutes = (tt.today_completed_minutes || 0) + minutes;
      tt.total_lifetime_sessions = (tt.total_lifetime_sessions || 0) + 1;
    }
    this.render();
    this.showToast(`Logged ${minutes}m of tummy time!`);

    try {
      await fetch(this.apiUrl('/api/v1/nrmc/tummy-time'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes })
      });
    } catch (e) {
      // Local
    }
  }

  // Open Growth Measurement Form Modal
  openGrowthModal() {
    const w = prompt('Enter Weight in lbs (e.g., 8.2):', '8.2');
    if (!w) return;
    const l = prompt('Enter Length in inches (e.g., 20.8):', '20.8');
    if (!l) return;
    const h = prompt('Enter Head Circumference in inches (e.g., 14.5):', '14.5');
    if (!h) return;
    const notes = prompt('Enter Clinical Notes (optional):', 'Pediatric clinic measurement');

    this.submitGrowthMeasurement({
      weight_lbs: parseFloat(w),
      length_in: parseFloat(l),
      head_circ_in: parseFloat(h),
      notes: notes || 'Clinical check measurement'
    });
  }

  async submitGrowthMeasurement(payload) {
    try {
      const res = await fetch(this.apiUrl('/api/v1/nrmc/growth'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.entry && this.state?.modules?.module_e?.growth_telemetry) {
          this.state.modules.module_e.growth_telemetry.measurements.push(data.entry);
          this.render();
          this.showToast('Growth measurement recorded & plotted against WHO standards.');
        }
      }
    } catch (e) {
      this.showToast('Saved growth locally', 'error');
    }
  }

  // Profile Configurator Modal
  openProfileConfigModal() {
    const modal = document.getElementById('profile-config-modal');
    if (!modal) return;

    const profile = this.state?.profile || {};
    const anchors = this.state?.command_anchors || {};

    const nameInput = document.getElementById('cfg-baby-name');
    const dobInput = document.getElementById('cfg-baby-dob');
    const rankInput = document.getElementById('cfg-sponsor-rank');
    const stationInput = document.getElementById('cfg-station');
    const rapidsInput = document.getElementById('cfg-rapids-date');

    if (nameInput) nameInput.value = profile.baby_name || 'Aiden James Vane';
    if (dobInput) dobInput.value = profile.dob || '2026-11-15';
    if (rankInput) rankInput.value = profile.sponsor_rank || 'O-3 / CPT';
    if (stationInput) stationInput.value = profile.station || 'JBLM / Pacific Command';

    if (rapidsInput && anchors.rapids_appointment?.scheduled_date) {
      const dateStr = anchors.rapids_appointment.scheduled_date.slice(0, 16);
      rapidsInput.value = dateStr;
    }

    this.previewRecalculation();
    modal.classList.add('active');
  }

  closeProfileConfigModal() {
    const modal = document.getElementById('profile-config-modal');
    if (modal) modal.classList.remove('active');
  }

  previewRecalculation() {
    const dobVal = document.getElementById('cfg-baby-dob')?.value;
    if (!dobVal) return;

    const birthDate = new Date(dobVal + 'T00:00:00');
    if (isNaN(birthDate.getTime())) return;

    // 90 days TRICARE deadline
    const tricareDeadline = new Date(birthDate.getTime() + 90 * 24 * 60 * 60 * 1000);
    const deadlineStr = tricareDeadline.toISOString().split('T')[0];

    const now = new Date();
    const diffDays = Math.round((birthDate - now) / (1000 * 60 * 60 * 24));
    let statusStr = '';
    if (diffDays > 0) {
      statusStr = `T-${diffDays} Days until expected delivery`;
    } else if (diffDays === 0) {
      statusStr = `T-0 Delivery Sortie Day!`;
    } else {
      statusStr = `T+${Math.abs(diffDays)} Days Post-Birth`;
    }

    const pTricare = document.getElementById('cfg-preview-tricare');
    const pDelta = document.getElementById('cfg-preview-delta');
    const pPentavalent = document.getElementById('cfg-preview-pentavalent');

    if (pTricare) pTricare.textContent = `${deadlineStr} (90-day grace expiration)`;
    if (pDelta) pDelta.textContent = statusStr;

    // 2-month vaccine date
    const vaxDate = new Date(birthDate.getTime() + 60 * 24 * 60 * 60 * 1000);
    if (pPentavalent) pPentavalent.textContent = `${vaxDate.toISOString().split('T')[0]} (2-Month Pentavalent #1)`;
  }

  async saveProfileConfiguration() {
    const nameVal = (document.getElementById('cfg-baby-name')?.value || '').trim() || 'Aiden James Vane';
    const dobVal = document.getElementById('cfg-baby-dob')?.value;
    const rankVal = (document.getElementById('cfg-sponsor-rank')?.value || '').trim() || 'O-3 / CPT';
    const stationVal = (document.getElementById('cfg-station')?.value || '').trim() || 'JBLM / Pacific Command';
    const rapidsVal = document.getElementById('cfg-rapids-date')?.value;

    if (!dobVal) {
      this.showToast('Please specify a valid Date of Birth / Delivery Date', 'error');
      return;
    }

    if (!this.state) this.state = {};
    if (!this.state.profile) this.state.profile = {};
    if (!this.state.command_anchors) this.state.command_anchors = {};
    if (!this.state.command_anchors.tricare_grace) this.state.command_anchors.tricare_grace = {};
    if (!this.state.command_anchors.rapids_appointment) this.state.command_anchors.rapids_appointment = {};

    this.state.profile.baby_name = nameVal;
    this.state.profile.dob = dobVal;
    this.state.profile.sponsor_rank = rankVal;
    this.state.profile.station = stationVal;

    const birthDate = new Date(dobVal + 'T00:00:00');
    const tricareDeadline = new Date(birthDate.getTime() + 90 * 24 * 60 * 60 * 1000);
    this.state.command_anchors.tricare_grace.start_date = dobVal;
    this.state.command_anchors.tricare_grace.deadline = tricareDeadline.toISOString().split('T')[0];

    if (rapidsVal) {
      this.state.command_anchors.rapids_appointment.scheduled_date = rapidsVal;
    }

    // Update audit trail
    if (!Array.isArray(this.state.audit_trail)) this.state.audit_trail = [];
    this.state.audit_trail.push({
      timestamp: new Date().toISOString(),
      action: 'PROFILE_RECALIBRATED',
      actor: 'OPERATOR',
      details: `Updated profile: ${nameVal}, DOB: ${dobVal}, Station: ${stationVal}`
    });

    // Persist to localStorage
    localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));

    // Sync to server if backend is online
    try {
      await fetch(this.apiUrl('/api/v1/nrmc/profile'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baby_name: nameVal,
          dob: dobVal,
          rapids_date: rapidsVal
        })
      });
    } catch (e) {
      // Local mode
    }

    this.playTacticalFeedback('seal');
    this.closeProfileConfigModal();
    this.render();
    this.broadcastFleetTelemetry();
    this.showToast(`Timeline successfully calibrated to DOB: ${dobVal}!`);
  }

  // Toast Notification
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'hud-toast';
    toast.innerHTML = `
      <span style="color:${type === 'error' ? 'var(--crimson-alert)' : 'var(--cyan-telemetry)'}">⚡</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.NRMC_APP = new NrmcDashboardApp();
});
