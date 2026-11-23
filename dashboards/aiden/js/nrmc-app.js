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

    // 1. Instant paint from cached state so UI is interactive immediately
    const cached = localStorage.getItem('nrmc_cached_state');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.profile) {
          this.state = parsed;
          this.initSubsystems();
          this.render();
        }
      } catch (e) {}
    }

    // 2. Fetch live or baseline state with tight timeout and re-render
    await this.loadInitialState();
    this.initSubsystems();
    this.render();
    this.initWebSocket();

    // 3. Start background sync queue flush for offline / sleeping Render server resilience
    this.flushPendingSyncQueue();
    setInterval(() => this.flushPendingSyncQueue(), 12000);
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
    return `https://daily-executive-dashboard.onrender.com${path}`;
  }

  // 3. Load State from LocalStorage / Server / Static Baseline
  async loadInitialState() {
    let baselineState = null;

    // 1. Query live API state from local backend or cloud backend (Daily Dashboard on Render)
    try {
      const res = await fetch(this.apiUrl('/api/v1/nrmc/state'), {
        signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
      });
      if (res.ok) {
        baselineState = await res.json();
      }
    } catch (err) {
      console.warn('[NRMC] API backend unreachable:', err.message);
    }

    // Fallback: If no server state, fetch static baseline JSON
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
          if (!baselineState) {
            this.state = parsed;
          } else {
            // Intelligent two-way merge: Preserve ALL completed tasks, vaccines, milestones, and vault docs!
            const merged = { ...baselineState, profile: { ...baselineState.profile, ...(parsed.profile || {}) } };
            // Merge modules and tasks
            const pMods = parsed.modules || {};
            const bMods = merged.modules || {};
            for (const [modKey, bMod] of Object.entries(bMods)) {
              if (Array.isArray(bMod.tasks) && Array.isArray(pMods[modKey]?.tasks)) {
                for (const pTask of pMods[modKey].tasks) {
                  const bTask = bMod.tasks.find(t => t.id.toUpperCase() === pTask.id.toUpperCase());
                  if (bTask) {
                    if (pTask.status === 'COMPLETE') {
                      bTask.status = 'COMPLETE';
                      bTask.checklists_completed = Array.isArray(pTask.checklists_completed) && pTask.checklists_completed.length > 0
                        ? pTask.checklists_completed
                        : (Array.isArray(bTask.checklists) ? [...bTask.checklists] : []);
                    }
                    if (pTask.notes) bTask.notes = pTask.notes;
                  }
                }
              }
            }
            // Merge vaccine glidepath
            if (Array.isArray(pMods.module_e?.vaccine_glidepath) && Array.isArray(bMods.module_e?.vaccine_glidepath)) {
              for (const pVac of pMods.module_e.vaccine_glidepath) {
                const bVac = bMods.module_e.vaccine_glidepath.find(v => v.id.toUpperCase() === pVac.id.toUpperCase());
                if (bVac && pVac.status === 'COMPLETE') {
                  bVac.status = 'COMPLETE';
                  bVac.date_administered = pVac.date_administered || bVac.date_administered;
                }
              }
            }
            // Merge developmental milestones
            if (Array.isArray(pMods.module_e?.developmental_milestones) && Array.isArray(bMods.module_e?.developmental_milestones)) {
              for (const pMil of pMods.module_e.developmental_milestones) {
                const bMil = bMods.module_e.developmental_milestones.find(m => m.id === pMil.id);
                if (bMil && pMil.status === 'ACHIEVED') {
                  bMil.status = 'ACHIEVED';
                  bMil.date_achieved = pMil.date_achieved || bMil.date_achieved;
                }
              }
            }
            // Preserve vault documents
            if (Array.isArray(parsed.vault_documents) && parsed.vault_documents.length > 0) {
              const vaultMap = new Map();
              (baselineState.vault_documents || []).forEach(d => vaultMap.set(d.id, d));
              parsed.vault_documents.forEach(d => vaultMap.set(d.id, d));
              merged.vault_documents = Array.from(vaultMap.values());
            }
            this.state = merged;
          }
          localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
        }
      } catch (e) {
        console.warn('[NRMC] Invalid cached state merge:', e);
      }
    }

    // If no valid cached state, use baseline
    if (!this.state && baselineState) {
      this.state = baselineState;
      localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
    }

    // Guarantee Zero-Hallucination & Permanent Checkoff Persistence:
    // Reapply explicitly completed task IDs from the local completed index
    try {
      const explicitCompletedIds = JSON.parse(localStorage.getItem('nrmc_completed_task_ids') || '[]');
      if (Array.isArray(explicitCompletedIds) && explicitCompletedIds.length > 0 && this.state) {
        const idSet = new Set(explicitCompletedIds.map(x => String(x).toUpperCase()));
        Object.values(this.state.modules || {}).forEach(mod => {
          if (Array.isArray(mod.tasks)) {
            mod.tasks.forEach(t => {
              if (idSet.has(t.id.toUpperCase())) {
                t.status = 'COMPLETE';
                if (!Array.isArray(t.checklists_completed) || t.checklists_completed.length === 0) {
                  t.checklists_completed = Array.isArray(t.checklists) ? [...t.checklists] : [];
                }
              }
            });
          }
          if (Array.isArray(mod.vaccine_glidepath)) {
            mod.vaccine_glidepath.forEach(v => {
              if (idSet.has(v.id.toUpperCase())) {
                v.status = 'COMPLETE';
              }
            });
          }
        });
        localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn('[NRMC] Failed to rehydrate completed tasks index:', e);
    }
  }

  // 4. WebSocket Real-Time Stream (Active only when dedicated NRMC backend :3012 is available)
  async initWebSocket() {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal && !window.location.port) {
      // Static cloud host (e.g. GitHub Pages) - operate in standalone client mode
      this.updateNetworkBadge(false, 'STANDALONE ORBIT');
      return;
    }

    // When embedded inside Central Command Hub (:4000), probe Hub's health proxy first
    // so we don't trigger repeated failed WebSocket connections when :3012 isn't running.
    if (window.location.port !== '3012') {
      try {
        const res = await fetch(this.apiUrl('/api/v1/nrmc/health'), { signal: AbortSignal.timeout(1500) });
        if (!res.ok) {
          this.updateNetworkBadge(false, 'STANDALONE SYNC');
          return;
        }
        const info = await res.json().catch(() => ({}));
        if (!info.wsAvailable) {
          this.updateNetworkBadge(false, 'HUB PROXY SYNC');
          return;
        }
      } catch (e) {
        this.updateNetworkBadge(false, 'STANDALONE SYNC');
        return;
      }
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
      this.ws.onerror = () => {
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
        if (isLocal && window.location.port === '3012') {
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
        'FBCH Peds Follow-Up: Dr. Saro Verghese (2026-11-20 07:50 EST)',
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

  // Unified Chronological Milestones Matrix (Dynamically calibrated to Aiden's DOB)
  getAllMilestones() {
    if (!this.state) return [];
    const list = [];
    const dob = this.state.profile?.dob || '2026-11-06';
    const rapidsAppt = this.state.command_anchors?.rapids_appointment?.scheduled_date;
    const rapidsDateOnly = rapidsAppt ? rapidsAppt.slice(0, 10) : this.addDays(dob, 32);

    // Specification mapping: relative day offsets from Aiden's actual DOB
    const taskSpecs = {
      'A1': { days: 0, offset: 'T-0 (ATAMMC)', category: 'military', lane: 'military', isHospitalAuto: true },
      'A2': { days: 31, offset: 'T+31d..56d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'A3': { days: 6, offset: 'T+6d (Thu Nov 12)', category: 'military', lane: 'military', isHospitalAuto: false },
      'A4': { days: 6, offset: 'T+6d (72h Labs)', category: 'clinical', lane: 'clinical', isHospitalAuto: false },
      'A5': { days: 4, offset: 'T+4d (Nov 10)', category: 'clinical', lane: 'clinical', isHospitalAuto: false },
      'A6': { days: 4, offset: 'T+4d & T+14d', category: 'clinical', lane: 'clinical', isHospitalAuto: false },
      'A7': { days: 90, offset: 'T+90d Cutoff', category: 'military', lane: 'military', isDeadline: true, isHospitalAuto: false },
      'B1': { customDate: rapidsDateOnly, days: 32, offset: rapidsAppt ? 'RAPIDS BOOKED' : 'T+32d (Post-SSN)', category: 'military', lane: 'military', isHospitalAuto: false },
      'B2': { days: 35, offset: 'T+35d', category: 'military', lane: 'military', isHospitalAuto: false },
      'B3': { days: 36, offset: 'T+36d', category: 'military', lane: 'military', isHospitalAuto: true },
      'B4': { days: 40, offset: 'T+40d', category: 'military', lane: 'military', isHospitalAuto: false },
      'B5': { days: 50, offset: 'T+50d', category: 'military', lane: 'military', isHospitalAuto: false },
      'C1': { days: 42, offset: 'T+42d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'C2': { days: 38, offset: 'T+38d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'C3': { days: 42, offset: 'T+42d (If Needed)', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'C4': { days: 65, offset: 'T+65d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'C5': { days: 65, offset: 'T+65d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'C6': { days: 65, offset: 'T+65d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'C7': { days: 65, offset: 'T+65d', category: 'identity', lane: 'identity', isHospitalAuto: false },
      'D1': { days: 45, offset: 'T+45d (Post-SSN)', category: 'financial', lane: 'wealth', isHospitalAuto: false },
      'D4': { days: 60, offset: 'T+60d', category: 'financial', lane: 'wealth', isHospitalAuto: false },
      'D5': { years: 13, offset: 'Age 13', category: 'financial', lane: 'wealth', isHospitalAuto: false },
      'D6': { days: 45, offset: 'T+45d ($1k Seed)', category: 'financial', lane: 'wealth', isHospitalAuto: false }
    };

    // Tasks from modules A-D
    Object.values(this.state.modules || {}).forEach((mod) => {
      if (Array.isArray(mod.tasks)) {
        mod.tasks.forEach((t) => {
          const spec = taskSpecs[t.id] || { days: 15, offset: 'T+15d', category: 'military', lane: 'military', isHospitalAuto: false };
          let calDate = '';
          if (spec.customDate) {
            calDate = spec.customDate;
          } else if (spec.years) {
            calDate = this.addYears(dob, spec.years);
          } else {
            calDate = this.addDays(dob, spec.days !== undefined ? spec.days : 0);
          }

          list.push({
            id: t.id,
            title: t.title,
            category: spec.category,
            lane: spec.lane,
            date: calDate,
            dateFormatted: this.formatDateDisplay(calDate),
            offset: spec.offset,
            priority: t.priority || 'NORMAL',
            status: t.status || 'PENDING',
            sla: t.sla || '',
            forms: t.forms || [],
            isDeadline: !!spec.isDeadline,
            isHospitalAuto: !!spec.isHospitalAuto,
            taskRef: t
          });
        });
      }
    });

    // Vaccines from Module E (dynamically tied to DOB)
    const vaccineSpecs = {
      'VAC_01': { days: 0, offset: 'T-0 (Declined at Birth)', isHospitalAuto: false },
      'VAC_02': { days: 30, offset: 'T+30d (1M)', isHospitalAuto: false },
      'VAC_03': { days: 60, offset: 'T+60d (2M)', isHospitalAuto: false },
      'VAC_04': { days: 120, offset: 'T+120d (4M)', isHospitalAuto: false },
      'VAC_05': { days: 180, offset: 'T+180d (6M)', isHospitalAuto: false }
    };

    const vaccines = this.state.modules?.module_e?.vaccine_glidepath || [];
    vaccines.forEach((v) => {
      const vSpec = vaccineSpecs[v.id] || { days: 0, offset: v.stage.split(' ')[0], isHospitalAuto: false };
      const vDate = this.addDays(dob, vSpec.days);
      list.push({
        id: v.id,
        title: `${v.stage}: ${v.vaccine}`,
        category: 'clinical',
        lane: 'clinical',
        date: vDate,
        dateFormatted: this.formatDateDisplay(vDate),
        offset: vSpec.offset,
        priority: 'HIGH',
        status: v.status || 'PENDING',
        sla: 'Clinical Immunization Series',
        forms: ['CDC Immunization Record'],
        isDeadline: false,
        isHospitalAuto: !!vSpec.isHospitalAuto,
        vaccineRef: v
      });
    });

    // NOTE: Synthetic growth vitals purged per directive. Actual clinical growth checks
    // are tracked in Module E Pediatric Growth Telemetry & WHO curves without polluting sorties.

    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Date calculation helpers without timezone shift
  addDays(dateStr, days) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10) + days);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  addYears(dateStr, years) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0], 10) + years, parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  formatDateDisplay(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIdx = parseInt(parts[1], 10) - 1;
    return `${months[monthIdx]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
  }

  // View 1: Render Mission Glidepath (Horizontal Flight Trajectory)
  renderMissionGlidepath() {
    const container = document.getElementById('glidepath-cards-container');
    if (!container) return;

    let items = this.getAllMilestones();
    if (this.currentFilter === 'critical') {
      items = items.filter((m) => m.priority === 'CRITICAL' || m.isDeadline);
    } else if (this.currentFilter === 'parent-action') {
      items = items.filter((m) => !m.isHospitalAuto);
    } else if (this.currentFilter === 'hospital-auto') {
      items = items.filter((m) => m.isHospitalAuto);
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
        const needsDocPrompt = ['A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'C2', 'D1', 'D6', 'VAC_01', 'VAC_02', 'VAC_03', 'VAC_04', 'VAC_05'].includes(m.id);
        let docPromptHtml = '';
        if (taskDocs.length > 0) {
          docPromptHtml = `<button class="vault-prompt-badge has-docs open-vault-task-btn" data-task-id="${m.id}" title="${taskDocs.length} record(s) archived in local vault. Click to view.">📁 ${taskDocs.length} RECORD(S)</button>`;
        } else if (needsDocPrompt) {
          docPromptHtml = `<button class="vault-prompt-badge need-doc prompt-upload-btn" data-task-id="${m.id}" title="OPSEC Prompt: File supporting record or clinic slip">📎 FILE RECORD</button>`;
        }

        const autoBadge = m.isHospitalAuto
          ? `<span class="pill-hospital-auto" title="Executed automatically by hospital clinical staff">🏥 HOSPITAL PROTOCOL</span>`
          : `<span class="pill-parent-action" title="Requires direct parent action and intervention">⚡ DIRECT PARENT ACTION</span>`;

        return `
        <div class="glidepath-milestone-card ${isComplete ? 'milestone-card-complete' : ''} ${m.isHospitalAuto ? 'card-hospital-auto' : 'card-parent-action'}" data-task-id="${m.id}" data-category="${m.category}" title="${isComplete ? `${m.id}: ${m.title} (Sealed. Hover to inspect or click to reopen)` : ''}">
          <div class="milestone-node-connector ${connectorClass}"></div>
          
          <!-- Minimized Left-Stub View (Shown when complete) -->
          <div class="milestone-stub-view">
            <span class="stub-time-badge">${m.offset.split(' ')[0]}</span>
            <div class="stub-check-circle">✓</div>
            <span class="stub-task-id">${m.id}</span>
            <div class="stub-vertical-title" title="${m.title}">${m.title}</div>
            <span class="stub-sealed-tag">SEALED</span>
          </div>

          <!-- Normal Expanded Card Content (Shown for pending, or on hover for complete) -->
          <div class="milestone-full-view">
            <div class="milestone-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="milestone-time-badge">${m.offset}</span>
                ${isComplete ? '<span style="font-family:var(--font-mono); font-size:0.68rem; color:#10b981; font-weight:700; letter-spacing:0.04em;">✓ SEALED</span>' : ''}
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                ${docPromptHtml}
                <span class="countdown-pill ${priorityPill}">${m.isDeadline ? '🚨 DEADLINE' : m.priority}</span>
              </div>
            </div>
            <div style="margin-bottom:6px;">
              ${autoBadge}
            </div>
            <div class="milestone-card-title">${m.title}</div>
            <div class="milestone-card-date">Target: <strong>${m.dateFormatted || m.date}</strong> (${m.offset}) ${m.sla ? `• ${m.sla}` : ''}</div>
            <div class="milestone-card-footer">
              <button class="hud-check-toggle-sm ${isComplete ? 'is-complete' : ''}" data-task-id="${m.id}" title="${isComplete ? 'Task Sealed. Click to reopen' : 'Click to seal task as complete'}">
                ${isComplete ? '✓ SEALED' : '◯ COMPLETE'}
              </button>
              <span class="countdown-pill ${statusPill}">${m.status}</span>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    // Update Current Radar Marker & Continuously Auto-focus Uncompleted Sorties
    const marker = document.getElementById('glidepath-current-marker');
    const firstPending = container.querySelector('.glidepath-milestone-card:not(.milestone-card-complete)');
    if (marker) {
      if (firstPending) {
        marker.style.left = `${firstPending.offsetLeft}px`;
      } else {
        marker.style.left = `40px`;
      }
      const beacon = marker.querySelector('.runway-current-beacon');
      if (beacon) {
        beacon.innerHTML = `<span class="status-pulse-dot" style="width:6px; height:6px;"></span> ACTIVE SORTIE FRONTIER`;
      }
    }

    // Auto-scroll runway so uncompleted tasks start immediately in view without right-scrolling!
    requestAnimationFrame(() => {
      const scrollArea = document.getElementById('glidepath-scroll-area');
      if (firstPending && scrollArea) {
        const targetScroll = Math.max(0, firstPending.offsetLeft - 30);
        scrollArea.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    });
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
          const isComplete = m.status === 'COMPLETE';
          const priorityPill = m.isDeadline ? 'pill-crimson' : m.priority === 'HIGH' ? 'pill-amber' : 'pill-cyan';
          const autoBadge = m.isHospitalAuto
            ? `<span class="pill-hospital-auto" style="font-size:0.6rem;">🏥 HOSPITAL PROTOCOL</span>`
            : `<span class="pill-parent-action" style="font-size:0.6rem;">⚡ DIRECT PARENT ACTION</span>`;
          return `
          <div style="background:rgba(18,19,24,0.9); border:1px solid var(--border-subtle); padding:12px; border-radius:6px; margin-bottom:8px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
                <span class="countdown-pill ${priorityPill}">${m.isDeadline ? 'HARD DEADLINE' : m.priority}</span>
                ${autoBadge}
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

  // Aiden's Military Rank Progression Engine (PVT -> SFC -> 2LT Direct Commission at Age 18)
  computeAidenRank(dobStr) {
    if (!dobStr) dobStr = '2026-11-06';
    const dob = new Date(dobStr + 'T00:00:00');
    const now = new Date();

    const diffMs = now - dob;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const ageMonths = diffMs / (1000 * 60 * 60 * 24 * 30.4375);
    const ageYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

    if (diffDays < 0) {
      return {
        code: 'PVT (CADET)',
        grade: 'E-1 PENDING',
        title: 'Private Candidate',
        desc: 'Awaiting birth deployment. Sworn in as PVT (E-1) at birth.',
        badgeClass: 'pill-cyan',
        insignia: '🔰',
        nextRank: 'PVT (E-1) at Birth',
        isCommissioned: false
      };
    }

    if (ageYears >= 18) {
      return {
        code: '2LT',
        grade: 'O-1',
        title: 'Second Lieutenant (Direct Commission)',
        desc: 'Age 18 reached. Direct Commission executed.',
        badgeClass: 'pill-emerald',
        insignia: '🎖️',
        nextRank: '1LT / O-2 via Promotion Board',
        isCommissioned: true
      };
    } else if (ageYears >= 13) {
      const daysUntil18 = Math.max(0, Math.ceil((new Date(dob.getFullYear() + 18, dob.getMonth(), dob.getDate()) - now) / (1000 * 60 * 60 * 24)));
      return {
        code: 'SFC',
        grade: 'E-7',
        title: 'Sergeant First Class',
        desc: 'Platoon Sergeant tier. Direct Commission to 2LT at Age 18.',
        badgeClass: 'pill-emerald',
        insignia: '⭐⭐⭐',
        nextRank: `2LT (O-1 Direct Commission) in ${daysUntil18}d (Age 18)`,
        isCommissioned: false
      };
    } else if (ageYears >= 8) {
      return {
        code: 'SSG',
        grade: 'E-6',
        title: 'Staff Sergeant',
        desc: 'Squad Leader tier. Advanced childhood milestone mastery.',
        badgeClass: 'pill-emerald',
        insignia: '⭐⭐',
        nextRank: 'SFC (E-7) at Age 13',
        isCommissioned: false
      };
    } else if (ageYears >= 4) {
      return {
        code: 'SGT',
        grade: 'E-5',
        title: 'Sergeant',
        desc: 'NCO Core. Independent motor, speech, and tactical agility.',
        badgeClass: 'pill-emerald',
        insignia: '⭐',
        nextRank: 'SSG (E-6) at Age 8',
        isCommissioned: false
      };
    } else if (ageYears >= 2) {
      return {
        code: 'SPC',
        grade: 'E-4',
        title: 'Specialist',
        desc: 'Specialist tier. Locomotion & communication operational readiness.',
        badgeClass: 'pill-cyan',
        insignia: '🦅',
        nextRank: 'SGT (E-5) at Age 4',
        isCommissioned: false
      };
    } else if (ageYears >= 1) {
      return {
        code: 'PFC',
        grade: 'E-3',
        title: 'Private First Class',
        desc: 'PFC tier. 1-Year pediatric and physical glidepath mastered.',
        badgeClass: 'pill-cyan',
        insignia: '∧‿',
        nextRank: 'SPC (E-4) at Age 2',
        isCommissioned: false
      };
    } else if (ageMonths >= 6) {
      return {
        code: 'PV2',
        grade: 'E-2',
        title: 'Private E-2',
        desc: 'First promotion. 6-Month pentavalent schedule completed.',
        badgeClass: 'pill-cyan',
        insignia: '∧',
        nextRank: 'PFC (E-3) at 12 Months',
        isCommissioned: false
      };
    } else {
      // 0 to 6 months
      const monthsLeft = Math.max(1, Math.round(6 - ageMonths));
      return {
        code: 'PVT',
        grade: 'E-1',
        title: 'Private',
        desc: 'Active Newborn Sortie. First echelon recruit.',
        badgeClass: 'pill-cyan',
        insignia: '🎖️',
        nextRank: `PV2 (E-2) at 6 Months (~${monthsLeft} mo)`,
        isCommissioned: false
      };
    }
  }

  renderHeaderAndProfile() {
    const profile = this.state.profile || {};
    const nameEl = document.getElementById('baby-name-display');
    const dobEl = document.getElementById('baby-dob-display');
    const rankEl = document.getElementById('military-station-display');
    const promoEl = document.getElementById('rank-next-promo-display');
    const hubLink = document.getElementById('central-hub-link');

    if (hubLink && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      hubLink.href = 'http://localhost:4000/';
    }

    if (nameEl) nameEl.textContent = profile.baby_name || 'Aiden James Vane';
    if (dobEl) dobEl.textContent = `DOB: ${profile.dob || '2026-11-06'}${profile.time_of_birth ? ' @ ' + profile.time_of_birth : ''}`;

    const rankInfo = this.computeAidenRank(profile.dob);
    if (rankEl) {
      rankEl.textContent = `RANK: ${rankInfo.code} (${rankInfo.grade})`;
      rankEl.className = `countdown-pill ${rankInfo.badgeClass}`;
      rankEl.title = `${rankInfo.title}: ${rankInfo.desc}`;
    }
    if (promoEl) {
      promoEl.textContent = `NEXT: ${rankInfo.nextRank}`;
    }
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

  // Helper: Check if task or vaccine is sealed/completed
  isTaskComplete(taskId) {
    if (!this.state || !taskId) return false;
    const tid = taskId.toUpperCase();
    for (const mod of Object.values(this.state.modules || {})) {
      if (Array.isArray(mod.tasks)) {
        const found = mod.tasks.find(t => t.id && t.id.toUpperCase() === tid);
        if (found) return found.status === 'COMPLETE';
      }
      if (Array.isArray(mod.vaccine_glidepath)) {
        const found = mod.vaccine_glidepath.find(v => v.id && v.id.toUpperCase() === tid);
        if (found) return found.status === 'COMPLETE';
      }
    }
    return false;
  }

  // Dynamic Countdown Calculation (Timezone Safe UTC & Accurate Day Delta)
  renderCountdowns() {
    this.updateDynamicCountdowns();
  }

  updateDynamicCountdowns() {
    if (!this.state) return;
    const now = new Date();

    // 1. TRICARE 90-Day Grace Window (Auto-remove when TRICARE Prime complete)
    const isTricareComplete =
      this.state.financial_telemetry?.tricare_status === 'PRIME_ACTIVE' ||
      this.state.financial_telemetry?.tricare_status === 'ENROLLED' ||
      this.isTaskComplete('A7') ||
      this.isTaskComplete('B2');

    const tricareCard = document.getElementById('tricare-card');
    if (tricareCard) {
      if (isTricareComplete) {
        tricareCard.style.display = 'none';
      } else {
        tricareCard.style.display = 'flex';
        const tricareDeadlineStr = this.state.command_anchors?.tricare_grace?.deadline || '2027-02-04';
        const tricareDeadline = new Date(tricareDeadlineStr + 'T23:59:59');
        const tricareDiff = tricareDeadline - now;
        const tricareDaysEl = document.getElementById('tricare-countdown-days');
        const tricareSubEl = document.getElementById('tricare-countdown-sub');
        const tricareProgressEl = document.getElementById('tricare-progress-fill');

        if (tricareDaysEl) {
          if (tricareDiff <= 0) {
            tricareDaysEl.textContent = 'EXPIRED';
            tricareCard.className = 'telemetry-countdown-card card-crimson';
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

            if (days > 45) tricareCard.className = 'telemetry-countdown-card card-emerald';
            else if (days > 15) tricareCard.className = 'telemetry-countdown-card card-amber';
            else tricareCard.className = 'telemetry-countdown-card card-crimson';
          }
        }
      }
    }

    // 2. RAPIDS Appointment Delta (Auto-remove when DEERS enrolled)
    const isDeersComplete =
      this.state.financial_telemetry?.deers_enrolled === true ||
      this.state.command_anchors?.rapids_appointment?.status === 'COMPLETED' ||
      this.isTaskComplete('B1');

    const rapidsCard = document.getElementById('rapids-card');
    if (rapidsCard) {
      if (isDeersComplete) {
        rapidsCard.style.display = 'none';
      } else {
        rapidsCard.style.display = 'flex';
        const rapidsScheduledStr = this.state.command_anchors?.rapids_appointment?.scheduled_date;
        const rapidsDaysEl = document.getElementById('rapids-countdown-days');
        const rapidsSubEl = document.getElementById('rapids-countdown-sub');

        if (rapidsDaysEl) {
          if (!rapidsScheduledStr) {
            rapidsDaysEl.textContent = 'NEEDS BOOKING';
            if (rapidsSubEl) {
              rapidsSubEl.textContent = 'Req: Certified Birth Cert + SSN | Fort Belvoir / NCR DEERS';
            }
          } else {
            const rapidsDate = new Date(rapidsScheduledStr);
            const rapidsDiff = rapidsDate - now;
            if (rapidsDiff <= 0) {
              rapidsDaysEl.textContent = 'PAST / VERIFY';
            } else {
              const rDays = Math.floor(rapidsDiff / (1000 * 60 * 60 * 24));
              const rHours = Math.floor((rapidsDiff / (1000 * 60 * 60)) % 24);
              rapidsDaysEl.textContent = `${rDays}d ${rHours}h`;
              if (rapidsSubEl) {
                rapidsSubEl.textContent = `${this.state.command_anchors.rapids_appointment.location || 'NCR DEERS'} | ${this.state.command_anchors.rapids_appointment.confirmation_code || 'BOOKED'}`;
              }
            }
          }
        }
      }
    }

    // 4. Next Pediatric Sortie
    const nextPediatricStr = this.state.command_anchors?.next_medical_milestone?.target_date || '2027-01-05T08:30:00';
    const pedDate = new Date(nextPediatricStr);
    const pedDiff = pedDate - now;

    const pedDaysEl = document.getElementById('pediatric-countdown-days');
    const pedSubEl = document.getElementById('pediatric-countdown-sub');
    const pedProgressEl = document.getElementById('pediatric-progress-fill');

    if (pedDaysEl) {
      if (pedDiff <= 0) {
        pedDaysEl.textContent = 'TODAY';
        if (pedProgressEl) pedProgressEl.style.width = '100%';
      } else {
        const pDays = Math.ceil(pedDiff / (1000 * 60 * 60 * 24));
        pedDaysEl.textContent = `${pDays} Days`;
        const totalInterval = 46 * 24 * 60 * 60 * 1000;
        const elapsed = totalInterval - pedDiff;
        const pct = Math.min(100, Math.max(5, Math.round((elapsed / totalInterval) * 100)));
        if (pedProgressEl) pedProgressEl.style.width = `${pct}%`;
      }
      if (pedSubEl) {
        pedSubEl.textContent = this.state.command_anchors?.next_medical_milestone?.title || '2-Month Well-Child / Pentavalent #1';
      }
    }

    // 5. Baby Aiden Age / T-Sortie Days
    const dobStr = this.state.profile?.dob || '2026-11-06';
    const dob = new Date(dobStr + 'T12:38:00');
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
    this.renderCustodialPortfolio();
  }

  // Render Custodial Brokerage Performance & 25-Year Wealth Telemetry
  renderCustodialPortfolio() {
    const container = document.getElementById('custodial-portfolio-section');
    if (!container) return;

    const portfolio = this.state.custodial_portfolio;
    if (!portfolio) {
      container.innerHTML = '';
      return;
    }

    const totalVal = portfolio.total_market_value || 10000;
    const cashVal = portfolio.cash_balance !== undefined ? portfolio.cash_balance : totalVal;
    const investedVal = portfolio.invested_balance || 0;
    const costBasis = portfolio.cost_basis || totalVal;
    const gainDollars = portfolio.unrealized_gain_dollars || 0;
    const gainPct = portfolio.unrealized_gain_percent || 0;
    const dayChange = portfolio.day_change_dollars !== undefined ? portfolio.day_change_dollars : totalVal;

    if (!this.selectedCompoundingScenario) {
      this.selectedCompoundingScenario = 'moderate';
    }

    const scenarioData = {
      conservative: {
        label: 'Conservative (6% CAGR)',
        rate: 0.06,
        age5: { lump: 13382, dca100: 20188, dca250: 30398 },
        age16: { lump: 25404, dca100: 57929, dca250: 106718 },
        age18: { lump: 28543, dca100: 69199, dca250: 130182 },
        age21: { lump: 33996, dca100: 89088, dca250: 171725 },
        age25: { lump: 42919, dca100: 112118, dca250: 215917, dca500: 388915 }
      },
      moderate: {
        label: 'Moderate Growth (8% CAGR)',
        rate: 0.08,
        age5: { lump: 14693, dca100: 22091, dca250: 33189 },
        age16: { lump: 34259, dca100: 70812, dca250: 125640 },
        age18: { lump: 39960, dca100: 87422, dca250: 158615 },
        age21: { lump: 50338, dca100: 116339, dca250: 215340 },
        age25: { lump: 68485, dca100: 164198, dca250: 307767, dca500: 547050 }
      },
      sp500: {
        label: 'S&P 500 Historical (10% CAGR)',
        rate: 0.10,
        age5: { lump: 16105, dca100: 24159, dca250: 36240 },
        age16: { lump: 45950, dca100: 86831, dca250: 148153 },
        age18: { lump: 55599, dca100: 110991, dca250: 194079 },
        age21: { lump: 74002, dca100: 157297, dca250: 282240 },
        age25: { lump: 108347, dca100: 240975, dca250: 439916, dca500: 771486 }
      }
    };

    const currentScenario = scenarioData[this.selectedCompoundingScenario] || scenarioData.moderate;

    const positionsRows = (portfolio.positions || []).map(p => {
      const pVal = p.market_value || 0;
      const pCost = p.cost_basis || pVal;
      const pDay = p.day_change_dollars || 0;
      const pGain = p.gain_loss_dollars || 0;
      const pAlloc = totalVal > 0 ? ((pVal / totalVal) * 100).toFixed(1) : '100.0';

      return `
        <tr>
          <td><strong style="color:var(--emerald-nominal); font-family:var(--font-mono);">${p.symbol}</strong></td>
          <td>${p.description}</td>
          <td><span class="countdown-pill pill-cyan" style="font-size:0.68rem; padding:2px 6px;">${p.asset_type || 'Cash/MM'}</span></td>
          <td style="font-family:var(--font-mono);">${p.quantity ? p.quantity.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : '--'}</td>
          <td style="font-family:var(--font-mono);">${p.price ? '$' + p.price.toFixed(2) : '--'}</td>
          <td style="font-family:var(--font-mono); font-weight:700; color:#34d399;">$${pVal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
          <td style="font-family:var(--font-mono);">$${pCost.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
          <td style="font-family:var(--font-mono); color:${pDay >= 0 ? '#34d399' : '#f87171'};">${pDay >= 0 ? '+' : ''}$${pDay.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
          <td style="font-family:var(--font-mono); color:${pGain >= 0 ? '#34d399' : '#f87171'};">${pGain >= 0 ? '+' : ''}$${pGain.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-family:var(--font-mono); font-size:0.72rem; color:#34d399;">${pAlloc}%</span>
              <div style="flex:1; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden; min-width:40px;">
                <div style="width:${pAlloc}%; height:100%; background:#34d399;"></div>
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="hud-panel" style="border: 1px solid rgba(52, 211, 153, 0.4); background: rgba(6, 18, 14, 0.9); box-shadow: 0 0 30px rgba(16, 185, 129, 0.12); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <!-- Banner -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px; border-bottom:1px solid rgba(52,211,153,0.25); padding-bottom:14px;">
          <div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:1.4rem;">📈</span>
              <h3 style="margin:0; font-family:var(--font-tech); font-size:1.15rem; color:var(--ghost-white); letter-spacing:0.05em; text-transform:uppercase;">
                FIDELITY CUSTODIAL BROKERAGE // WEALTH TELEMETRY &amp; ASSET INTELLIGENCE
              </h3>
              <span class="countdown-pill pill-emerald">ACTIVE · FUNDED</span>
            </div>
            <div style="font-family:var(--font-mono); font-size:0.78rem; color:var(--text-muted); margin-top:4px;">
              Beneficiary: <strong style="color:var(--ghost-white);">Aiden James Vane</strong> (DOB 2026-11-06) • Custodian: <strong style="color:var(--ghost-white);">Michael Walter Vane</strong> • Acct: <strong style="color:var(--emerald-nominal);">${portfolio.account_number || '...646'}</strong>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="countdown-pill pill-cyan" title="Governed by Washington State UTMA RCW 11.114">🏛️ WASHINGTON UTMA</span>
            <span class="countdown-pill pill-amber" title="Custodianship terminates on 25th birthday: Nov 6, 2051">🎯 AGE 25 TRANSFER (2051)</span>
            <button type="button" id="custodial-refresh-btn" class="hud-btn hud-btn-primary" style="padding:4px 10px; font-size:0.75rem; display:flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              REFRESH CSV
            </button>
            <input type="file" id="custodial-file-picker" accept=".csv" style="display:none;" />
          </div>
        </div>

        <!-- 4 Key Metrics -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:14px; margin-bottom:20px;">
          <div style="background:rgba(0,0,0,0.45); border:1px solid rgba(52,211,153,0.3); padding:12px 14px; border-radius:6px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">TOTAL PORTFOLIO VALUE</div>
            <div style="font-family:var(--font-mono); font-size:1.75rem; font-weight:800; color:#34d399; margin-top:2px;">$${totalVal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">As of ${new Date(portfolio.as_of || '2026-11-23').toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}</div>
          </div>
          <div style="background:rgba(0,0,0,0.45); border:1px solid rgba(0,229,255,0.3); padding:12px 14px; border-radius:6px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">LIQUID CASH / SPAXX</div>
            <div style="font-family:var(--font-mono); font-size:1.75rem; font-weight:800; color:var(--cyan-telemetry); margin-top:2px;">$${cashVal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            <div style="font-size:0.72rem; color:#67e8f9; margin-top:2px;">100.0% Allocation (Ready to Deploy)</div>
          </div>
          <div style="background:rgba(0,0,0,0.45); border:1px solid rgba(251,191,36,0.3); padding:12px 14px; border-radius:6px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">INITIAL SEED / BASIS</div>
            <div style="font-family:var(--font-mono); font-size:1.75rem; font-weight:800; color:var(--ghost-white); margin-top:2px;">$${costBasis.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Funded Day 17 of Life</div>
          </div>
          <div style="background:rgba(0,0,0,0.45); border:1px solid rgba(168,85,247,0.3); padding:12px 14px; border-radius:6px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted); text-transform:uppercase;">COMPOUNDING RUNWAY</div>
            <div style="font-family:var(--font-mono); font-size:1.75rem; font-weight:800; color:#c084fc; margin-top:2px;">24.9 Years</div>
            <div style="font-size:0.72rem; color:#d8b4fe; margin-top:2px;">To Age 25 Transfer (Nov 6, 2051)</div>
          </div>
        </div>

        <!-- Holdings Table -->
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-family:var(--font-mono); font-size:0.78rem; font-weight:700; color:var(--cyan-telemetry); letter-spacing:0.05em; text-transform:uppercase;">
              CURRENT HOLDINGS &amp; ASSET POSITIONS (FROM STATEMENT)
            </span>
            <a href="/forms/custodial_brokerage_positions_20261123.csv" download class="hud-link" style="font-family:var(--font-mono); font-size:0.72rem; display:flex; align-items:center; gap:4px;">
              📥 Download Statement (.csv)
            </a>
          </div>
          <div class="tactical-table-wrapper" style="overflow-x:auto;">
            <table class="tactical-table" style="width:100%; font-size:0.8rem;">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Description</th>
                  <th>Asset Type</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Market Value</th>
                  <th>Cost Basis</th>
                  <th>Day Change</th>
                  <th>Gain / Loss</th>
                  <th>Allocation</th>
                </tr>
              </thead>
              <tbody>
                ${positionsRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Strategic Deployment Directive -->
        <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(0,229,255,0.25); border-radius:6px; padding:14px; margin-bottom:20px; display:flex; gap:14px; align-items:flex-start;">
          <div style="font-size:1.5rem;">💡</div>
          <div style="flex:1;">
            <div style="font-family:var(--font-tech); font-size:0.85rem; font-weight:700; color:var(--cyan-telemetry); text-transform:uppercase; margin-bottom:4px;">
              TACTICAL WEALTH DIRECTIVE: 25-YEAR COMPOUNDING DEPLOYMENT
            </div>
            <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.45;">
              Account is currently <strong>100% liquid cash ($10,000.00)</strong> in the core Money Market position. With a 25-year investment runway to Aiden's age of majority transfer on <strong>November 6, 2051</strong>, deploying this capital into broad-market index ETFs (such as <strong>VTI</strong> or <strong>VOO</strong>) with automatic dividend reinvestment (DRIP) maximizes total return and historical compounding.
            </div>
          </div>
        </div>

        <!-- 25-Year Projections -->
        <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(52,211,153,0.25); border-radius:6px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
            <div>
              <div style="font-family:var(--font-tech); font-size:0.95rem; font-weight:700; color:var(--ghost-white); text-transform:uppercase;">
                25-YEAR WEALTH COMPOUNDING PROJECTION (TO AGE 25 · NOV 6, 2051)
              </div>
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); margin-top:2px;">
                Initial Seed: $10,000.00 • Compounded Annually to Washington UTMA Maturity
              </div>
            </div>
            <div class="compounding-scenario-toggles" style="display:flex; gap:6px;">
              <button type="button" class="scenario-btn ${this.selectedCompoundingScenario === 'moderate' ? 'active' : ''}" data-scenario="moderate" style="padding:4px 8px; font-family:var(--font-mono); font-size:0.72rem; background:${this.selectedCompoundingScenario === 'moderate' ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${this.selectedCompoundingScenario === 'moderate' ? '#34d399' : 'var(--border-subtle)'}; color:${this.selectedCompoundingScenario === 'moderate' ? '#34d399' : 'var(--text-muted)'}; border-radius:4px; cursor:pointer;">
                Moderate (8% CAGR)
              </button>
              <button type="button" class="scenario-btn ${this.selectedCompoundingScenario === 'sp500' ? 'active' : ''}" data-scenario="sp500" style="padding:4px 8px; font-family:var(--font-mono); font-size:0.72rem; background:${this.selectedCompoundingScenario === 'sp500' ? 'rgba(0,229,255,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${this.selectedCompoundingScenario === 'sp500' ? 'var(--cyan-telemetry)' : 'var(--border-subtle)'}; color:${this.selectedCompoundingScenario === 'sp500' ? 'var(--cyan-telemetry)' : 'var(--text-muted)'}; border-radius:4px; cursor:pointer;">
                S&P 500 Historical (10% CAGR)
              </button>
              <button type="button" class="scenario-btn ${this.selectedCompoundingScenario === 'conservative' ? 'active' : ''}" data-scenario="conservative" style="padding:4px 8px; font-family:var(--font-mono); font-size:0.72rem; background:${this.selectedCompoundingScenario === 'conservative' ? 'rgba(251,191,36,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${this.selectedCompoundingScenario === 'conservative' ? 'var(--amber-warning)' : 'var(--border-subtle)'}; color:${this.selectedCompoundingScenario === 'conservative' ? 'var(--amber-warning)' : 'var(--text-muted)'}; border-radius:4px; cursor:pointer;">
                Conservative (6% CAGR)
              </button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--border-subtle); padding:10px 12px; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">AGE 5 (2031)</span>
                <span class="countdown-pill pill-cyan" style="font-size:0.6rem; padding:1px 5px;">KINDERGARTEN</span>
              </div>
              <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:700; color:var(--ghost-white); margin-top:4px;">
                $${currentScenario.age5.lump.toLocaleString()}
              </div>
              <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">
                w/ $100/mo: <strong style="color:#67e8f9;">$${currentScenario.age5.dca100.toLocaleString()}</strong>
              </div>
            </div>

            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--border-subtle); padding:10px 12px; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">AGE 16 (2042)</span>
                <span class="countdown-pill pill-cyan" style="font-size:0.6rem; padding:1px 5px;">HIGH SCHOOL</span>
              </div>
              <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:700; color:var(--ghost-white); margin-top:4px;">
                $${currentScenario.age16.lump.toLocaleString()}
              </div>
              <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">
                w/ $100/mo: <strong style="color:#67e8f9;">$${currentScenario.age16.dca100.toLocaleString()}</strong>
              </div>
            </div>

            <div style="background:rgba(0,0,0,0.5); border:1px solid var(--border-subtle); padding:10px 12px; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">AGE 18 (2044)</span>
                <span class="countdown-pill pill-amber" style="font-size:0.6rem; padding:1px 5px;">ADULT / COLLEGE</span>
              </div>
              <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:700; color:var(--ghost-white); margin-top:4px;">
                $${currentScenario.age18.lump.toLocaleString()}
              </div>
              <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">
                w/ $100/mo: <strong style="color:#67e8f9;">$${currentScenario.age18.dca100.toLocaleString()}</strong>
              </div>
            </div>

            <div style="background:rgba(6,78,59,0.3); border:1px solid #10b981; padding:10px 12px; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:var(--font-mono); font-size:0.68rem; color:#a7f3d0; text-transform:uppercase; font-weight:700;">AGE 25 (NOV 6, 2051)</span>
                <span class="countdown-pill pill-emerald" style="font-size:0.6rem; padding:1px 5px;">FULL TRANSFER</span>
              </div>
              <div style="font-family:var(--font-mono); font-size:1.4rem; font-weight:800; color:#34d399; margin-top:4px;">
                $${currentScenario.age25.lump.toLocaleString()}
              </div>
              <div style="font-size:0.72rem; color:#a7f3d0; margin-top:2px;">
                w/ $100/mo: <strong>$${currentScenario.age25.dca100.toLocaleString()}</strong><br/>
                w/ $250/mo: <strong>$${currentScenario.age25.dca250.toLocaleString()}</strong><br/>
                w/ $500/mo: <strong>$${currentScenario.age25.dca500.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook up refresh button and scenario toggles
    const refreshBtn = container.querySelector('#custodial-refresh-btn');
    const filePicker = container.querySelector('#custodial-file-picker');
    if (refreshBtn && filePicker) {
      refreshBtn.onclick = () => filePicker.click();
      filePicker.onchange = (e) => this.handleCustodialCsvUpload(e);
    }

    container.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.onclick = () => {
        this.selectedCompoundingScenario = btn.dataset.scenario;
        this.renderCustodialPortfolio();
      };
    });
  }

  async handleCustodialCsvUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvText = event.target.result;
        const res = await fetch('/api/v1/nrmc/custodial/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            csvText,
            filename: file.name,
            notes: `Uploaded via NRMC dashboard on ${new Date().toLocaleString()}`
          })
        });
        const result = await res.json();
        if (result.success) {
          this.state.custodial_portfolio = result.portfolio;
          this.render();
        } else {
          alert('Failed to upload positions: ' + (result.error || 'Unknown error'));
        }
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('[NRMC] Failed to handle custodial CSV upload:', err);
      alert('Error reading CSV file: ' + err.message);
    }
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
        const needsDocPrompt = ['A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'C2', 'D1', 'D6'].includes(t.id);
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
              ${isComplete ? '<span style="font-family:var(--font-mono); font-size:0.68rem; color:#10b981; font-weight:700; letter-spacing:0.04em;">✓ SEALED</span>' : ''}
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

          const badgeClass =
            v.mandate_color === 'emerald'
              ? 'vax-badge-mandate'
              : v.mandate_color === 'cyan'
              ? 'vax-badge-split'
              : 'vax-badge-elective';

          const componentsList = Array.isArray(v.components) ? v.components : [];

          const chipsHtml = componentsList
            .map((comp) => {
              const chipClass = comp.isMandatory
                ? 'vax-chip-mandate'
                : comp.tier === 'RECOMMENDED_STANDARD'
                ? 'vax-chip-standard'
                : 'vax-chip-elective';
              const icon = comp.isMandatory ? '🛡️' : comp.tier === 'RECOMMENDED_STANDARD' ? '⭐' : '📋';
              return `<span class="vax-chip ${chipClass}" title="${comp.disease} (${comp.route || 'IM'})">${icon} ${comp.name}</span>`;
            })
            .join('');

          const seasonalHtml = v.seasonal_prophylaxis
            ? `<span class="vax-chip vax-chip-elective" title="${v.seasonal_prophylaxis.note}">📋 ${v.seasonal_prophylaxis.name}</span>`
            : '';

          const drawerRowsHtml = componentsList
            .map(
              (comp) => `
            <tr>
              <td style="font-family:var(--font-mono); font-weight:700; color:var(--cyan-telemetry);">${comp.name}</td>
              <td style="color:#cbd5e1;">${comp.disease}</td>
              <td>
                <span class="vax-chip ${comp.isMandatory ? 'vax-chip-mandate' : comp.tier === 'RECOMMENDED_STANDARD' ? 'vax-chip-standard' : 'vax-chip-elective'}">
                  ${comp.isMandatory ? '🛡️ Mandatory' : comp.tier === 'RECOMMENDED_STANDARD' ? '⭐ AAP Standard' : '📋 Parent Elective'}
                </span>
              </td>
              <td style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted);">${comp.route || 'IM Injection'}</td>
              <td>
                ${comp.vis_url ? `<a href="${comp.vis_url}" target="_blank" rel="noopener noreferrer" class="vax-vis-link">CDC VIS ↗</a>` : '—'}
              </td>
            </tr>
          `
            )
            .join('');

          const seasonalBoxHtml = v.seasonal_prophylaxis
            ? `
            <div style="margin-top:10px; padding:8px 10px; background:rgba(245, 158, 11, 0.08); border-left:3px solid var(--amber-warning); border-radius:4px; font-size:0.75rem;">
              <div style="font-weight:700; color:var(--amber-warning);">${v.seasonal_prophylaxis.badge}: ${v.seasonal_prophylaxis.name}</div>
              <div style="color:#cbd5e1; margin-top:3px;">${v.seasonal_prophylaxis.note}</div>
              ${v.seasonal_prophylaxis.vis_url ? `<div style="margin-top:4px;"><a href="${v.seasonal_prophylaxis.vis_url}" target="_blank" rel="noopener noreferrer" class="vax-vis-link">CDC RSV VIS Statement ↗</a></div>` : ''}
            </div>
          `
            : '';

          return `
          <tr>
            <td style="vertical-align:top;">
              <div style="font-family:var(--font-mono); font-weight:800; color:var(--cyan-telemetry); font-size:0.85rem;">${v.stage}</div>
              <div style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); margin-top:2px;">Sortie ID: ${v.id}</div>
              ${v.is_hospital_auto ? `<span class="countdown-pill pill-cyan" style="font-size:0.6rem; margin-top:4px; display:inline-block;">HOSPITAL AUTO-ADMIN</span>` : ''}
            </td>
            <td style="vertical-align:top;">
              <div style="font-weight:700; font-size:0.88rem; color:var(--ghost-white); line-height:1.3;">${v.vaccine}</div>
              <div class="vax-chips-container">
                ${chipsHtml}
                ${seasonalHtml}
              </div>
              <button class="vax-drawer-toggle-btn" data-drawer-id="drawer-${v.id}">
                <span>🔍 ANTIGEN BREAKDOWN &amp; VIS</span>
              </button>
              
              <div id="drawer-${v.id}" class="vax-components-drawer">
                <table class="vax-component-table">
                  <thead>
                    <tr>
                      <th>Antigen</th>
                      <th>Protects Against</th>
                      <th>Regulatory Status</th>
                      <th>Route</th>
                      <th>Official CDC VIS</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${drawerRowsHtml}
                  </tbody>
                </table>
                ${seasonalBoxHtml}
              </div>
            </td>
            <td style="vertical-align:top;">
              <div class="vax-mandate-badge ${badgeClass}">
                ${v.mandate_badge || 'CLINICAL SPEC'}
              </div>
              <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-muted); margin-top:4px; line-height:1.3;">
                ${v.mandate_label || ''}
              </div>
            </td>
            <td style="vertical-align:top; font-family:var(--font-mono); font-size:0.78rem;">
              <div style="color:var(--cyan-telemetry); font-weight:700;">${v.target_date || 'TBD'}</div>
              ${v.date_administered ? `<div style="color:var(--emerald-nominal); font-size:0.7rem; margin-top:3px;">Administered: ${v.date_administered}</div>` : ''}
              <div style="color:var(--text-muted); font-size:0.7rem; margin-top:2px;">${v.clinic || 'FBCH Pediatrics'}</div>
            </td>
            <td style="vertical-align:top;">
              <span class="countdown-pill ${statusClass}">${v.status}</span>
            </td>
            <td style="vertical-align:top; white-space:nowrap;">
              <div style="display:flex; flex-direction:column; gap:6px;">
                <button class="hud-btn hud-btn-sm ${isComplete ? 'hud-btn-emerald' : 'hud-btn-primary'} vac-toggle-btn" data-vac-id="${v.id}" title="${isComplete ? 'Vaccine recorded. Click to uncheck' : 'Click to record vaccine as administered today'}">
                  ${isComplete ? '✓ GIVEN' : 'MARK GIVEN'}
                </button>
                <button class="hud-btn hud-btn-sm vax-dossier-btn" data-vac-id="${v.id}" style="font-size:0.65rem;" title="View clinical dossier and CDC forms">
                  SORTIE DOSSIER
                </button>
              </div>
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
      if (targetMinsEl) targetMinsEl.textContent = `Target: ${tt.daily_target_minutes || 10}m/day`;
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
    // Tab Switching + ArrowLeft/ArrowRight/Home/End keyboard fallback when native focusgroup is absent
    const navBar = document.querySelector('.matrix-nav-bar');
    const tabButtons = Array.from(document.querySelectorAll('.matrix-tab-btn'));
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tabKey = btn.dataset.tab;
        this.switchTab(tabKey);
      });
    });

    if (navBar && tabButtons.length > 0) {
      navBar.addEventListener('keydown', (e) => {
        if (Object.hasOwn(HTMLElement.prototype, 'focusGroup')) return;
        const currentIdx = tabButtons.indexOf(document.activeElement);
        if (currentIdx === -1) return;

        let nextIdx = currentIdx;
        if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % tabButtons.length;
        else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + tabButtons.length) % tabButtons.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = tabButtons.length - 1;
        else return;

        e.preventDefault();
        const nextBtn = tabButtons[nextIdx];
        nextBtn.focus();
        if (nextBtn.dataset.tab) {
          this.switchTab(nextBtn.dataset.tab);
        }
      });
    }

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

      // 7. Vaccine Drawer Breakdown Toggle
      const drawerBtn = e.target.closest('.vax-drawer-toggle-btn');
      if (drawerBtn && drawerBtn.dataset.drawerId) {
        e.stopPropagation();
        e.preventDefault();
        const drawer = document.getElementById(drawerBtn.dataset.drawerId);
        if (drawer) {
          drawer.classList.toggle('open');
          const isOpen = drawer.classList.contains('open');
          const span = drawerBtn.querySelector('span');
          if (span) span.textContent = isOpen ? '▲ COLLAPSE BREAKDOWN' : '🔍 ANTIGEN BREAKDOWN & VIS';
        }
        return;
      }

      // 8. Vaccine Dossier Modal
      const dossierBtn = e.target.closest('.vax-dossier-btn');
      if (dossierBtn && dossierBtn.dataset.vacId) {
        e.stopPropagation();
        e.preventDefault();
        this.openActionModal(dossierBtn.dataset.vacId);
        return;
      }

      // 9. Card click opens action modal
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

    // Export Telemetry JSON (local Blob download so static/Hub mode works cleanly without full-page navigation)
    const exportBtn = document.getElementById('export-telemetry-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        try {
          const blob = new Blob([JSON.stringify(this.state || {}, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `nrmc_state_export_${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          this.showToast('Telemetry state exported as JSON file.');
        } catch (err) {
          this.showToast('Failed to export JSON: ' + err.message, 'error');
        }
      });
    }

    // Light-dismiss fallback for browsers without native <dialog closedby="any">
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const isOutsideDialog = (e, dialog) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
        let pressedOutside = false;
        dialog.addEventListener('pointerdown', (e) => {
          pressedOutside = isOutsideDialog(e, dialog);
        });
        dialog.addEventListener('pointerup', (e) => {
          if (pressedOutside && isOutsideDialog(e, dialog)) dialog.close();
        });
      }
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
            let imported = null;
            try {
              imported = JSON.parse(evt.target.result);
            } catch (err) {
              this.showToast('Invalid JSON file format', 'error');
              return;
            }
            try {
              await fetch(this.apiUrl('/api/v1/nrmc/import'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imported)
              });
            } catch (netErr) {
              // Static / offline host imports cleanly into localStorage cache
            }
            this.state = imported;
            localStorage.setItem('nrmc_cached_state', JSON.stringify(imported));
            this.render();
            this.showToast('State successfully imported!');
            importInput.value = '';
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
    const cfgDobTextInput = document.getElementById('cfg-baby-dob-text');
    if (cfgDobInput) {
      cfgDobInput.addEventListener('input', () => {
        if (cfgDobTextInput) cfgDobTextInput.value = cfgDobInput.value;
        this.previewRecalculation();
      });
      cfgDobInput.addEventListener('change', () => {
        if (cfgDobTextInput) cfgDobTextInput.value = cfgDobInput.value;
        this.previewRecalculation();
      });
    }

    if (cfgDobTextInput) {
      cfgDobTextInput.addEventListener('input', () => {
        const val = cfgDobTextInput.value.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
          if (cfgDobInput) cfgDobInput.value = val;
          this.previewRecalculation();
        }
      });
    }

    const pickDobBtn = document.getElementById('btn-pick-dob');
    if (pickDobBtn && cfgDobInput) {
      pickDobBtn.addEventListener('click', () => {
        if (typeof cfgDobInput.showPicker === 'function') {
          cfgDobInput.showPicker();
        } else {
          cfgDobInput.focus();
        }
      });
    }

    document.querySelectorAll('.btn-quick-dob').forEach((btn) => {
      btn.addEventListener('click', () => {
        let val = btn.dataset.val;
        if (val === 'today') {
          const now = new Date();
          const y = now.getFullYear();
          const m = String(now.getMonth() + 1).padStart(2, '0');
          const d = String(now.getDate()).padStart(2, '0');
          val = `${y}-${m}-${d}`;
        }
        if (cfgDobInput) cfgDobInput.value = val;
        if (cfgDobTextInput) cfgDobTextInput.value = val;
        this.previewRecalculation();
      });
    });

    const cfgRapidsInput = document.getElementById('cfg-rapids-date');
    const pickRapidsBtn = document.getElementById('btn-pick-rapids');
    if (pickRapidsBtn && cfgRapidsInput) {
      pickRapidsBtn.addEventListener('click', () => {
        if (typeof cfgRapidsInput.showPicker === 'function') {
          cfgRapidsInput.showPicker();
        } else {
          cfgRapidsInput.focus();
        }
      });
    }

    const clearRapidsBtn = document.getElementById('btn-clear-rapids');
    if (clearRapidsBtn && cfgRapidsInput) {
      clearRapidsBtn.addEventListener('click', () => {
        cfgRapidsInput.value = '';
      });
    }

    document.querySelectorAll('.btn-quick-rapids').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (cfgRapidsInput) cfgRapidsInput.value = btn.dataset.val;
      });
    });

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
      const isSelected = b.dataset.tab === tabKey;
      b.classList.toggle('active', isSelected);
      b.setAttribute('aria-selected', String(isSelected));
      b.toggleAttribute('focusgroupstart', isSelected);
      if (isSelected) {
        b.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' });
      }
    });
    document.querySelectorAll('.tab-content-panel').forEach((panel) => {
      const isMatch = panel.id === `tab-${tabKey}`;
      panel.classList.toggle('active', isMatch);
      panel.hidden = !isMatch;
      if (isMatch) {
        panel.tabIndex = 0;
      } else {
        panel.removeAttribute('tabindex');
      }
    });

    if (tabKey === 'clinical-pediatric' && this.growthChart) {
      requestAnimationFrame(() => {
        this.growthChart.setupCanvasDPI();
        this.growthChart.render();
      });
    }
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

    // Check vaccine glidepath if not a standard modular task
    if (!task && this.state.modules?.module_e?.vaccine_glidepath) {
      const vac = this.state.modules.module_e.vaccine_glidepath.find(v => v.id.toUpperCase() === taskId.toUpperCase());
      if (vac) {
        task = {
          id: vac.id,
          title: `${vac.stage} — ${vac.vaccine}`,
          category: `Pediatric Immunization (${vac.mandate_badge || 'CDC ACIP'})`,
          priority: vac.mandate_tier === 'MANDATORY' ? 'CRITICAL' : 'HIGH',
          status: vac.status,
          timeframe: vac.target_date || 'TBD',
          sla: vac.mandate_label || 'CDC ACIP Recommended Timing',
          notes: vac.description || '',
          checklists: vac.components ? vac.components.map(c => `${c.name}: ${c.disease} [${c.tier === 'MANDATORY' ? '🛡️ MANDATORY' : c.tier === 'RECOMMENDED_STANDARD' ? '⭐ RECOMMENDED STANDARD' : '📋 ELECTIVE'}] (${c.route || 'IM'})`) : [],
          checklists_completed: vac.status === 'COMPLETE' ? (vac.components ? vac.components.map(c => `${c.name}: ${c.disease} [${c.tier === 'MANDATORY' ? '🛡️ MANDATORY' : c.tier === 'RECOMMENDED_STANDARD' ? '⭐ RECOMMENDED STANDARD' : '📋 ELECTIVE'}] (${c.route || 'IM'})`) : []) : [],
          portals: [
            { name: "CDC ACIP Child Immunization Schedule", url: "https://www.cdc.gov/vaccines/imz-schedules/child-easyread.html" },
            { name: "DC Health Immunization Requirements", url: "https://dchealth.dc.gov/immunization" },
            { name: "Virginia VDH Childcare & School Requirements", url: "https://www.vdh.virginia.gov/immunization/requirements/" },
            { name: "DoD Instruction 6060.02 (Child Development Programs)", url: "https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/606002p.pdf" }
          ],
          form_downloads: vac.components ? vac.components.filter(c => c.vis_url).map(c => ({
            name: `${c.name} Official CDC Vaccine Information Statement (VIS)`,
            file: "vaccine_records.txt",
            official_url: c.vis_url
          })) : [],
          is_vaccine: true,
          vaccine_data: vac
        };
      }
    }

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

    // Mission Intelligence & Strategic Briefing Dossier
    const intelContainer = document.getElementById('modal-mission-intel');
    const intelContent = document.getElementById('modal-intel-content');
    if (intelContainer && intelContent) {
      if (task.mission_intel) {
        const mi = task.mission_intel;
        let stepsHtml = '';
        if (Array.isArray(mi.execution_steps) && mi.execution_steps.length > 0) {
          stepsHtml = `
            <div class="intel-block">
              <div class="intel-label">⚡ STEP-BY-STEP EXECUTION PLAYBOOK:</div>
              <div class="intel-text" style="font-family:var(--font-mono); font-size:0.78rem; background:rgba(0,0,0,0.3); padding:8px 10px; border-radius:4px; border:1px solid rgba(255,255,255,0.06);">
                ${mi.execution_steps.map((s) => `<div style="margin-bottom:5px; line-height:1.4;">${s}</div>`).join('')}
              </div>
            </div>
          `;
        }
        intelContent.innerHTML = `
          <div class="intel-block">
            <div class="intel-label">💡 WHAT IS THIS?</div>
            <div class="intel-text">${mi.what_is_it}</div>
          </div>
          <div class="intel-block">
            <div class="intel-label">🎯 WHY YOU NEED TO DO IT (BENEFIT &amp; VALUE):</div>
            <div class="intel-text">${mi.why_you_need_it}</div>
          </div>
          <div class="intel-block">
            <div class="intel-label">⏱️ CRITICAL DEADLINE &amp; CONSEQUENCE:</div>
            <div class="intel-text" style="color:#f87171; font-weight:700;">${mi.deadline_urgency}</div>
          </div>
          ${mi.qualifying_expenses ? `
          <div class="intel-block">
            <div class="intel-label">📋 QUALIFYING EXPENSES / COVERAGE:</div>
            <div class="intel-text">${mi.qualifying_expenses}</div>
          </div>` : ''}
          ${stepsHtml}
        `;
        intelContainer.style.display = 'block';
      } else {
        intelContent.innerHTML = `
          <div class="intel-block">
            <div class="intel-label">💡 SORTIE OPERATIONAL OBJECTIVE:</div>
            <div class="intel-text">${task.notes || 'Standard operational newborn readiness milestone.'}</div>
          </div>
          <div class="intel-block">
            <div class="intel-label">🎯 TARGET TIMEFRAME &amp; SLA:</div>
            <div class="intel-text">Target: <strong>${task.timeframe || 'Immediate'}</strong> • SLA: <strong>${task.sla || 'Standard Protocol'}</strong></div>
          </div>
        `;
        intelContainer.style.display = 'block';
      }
    }

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

    if (!target) {
      if (this.state.modules?.module_e?.vaccine_glidepath) {
        const vac = this.state.modules.module_e.vaccine_glidepath.find(v => v.id.toUpperCase() === taskId.toUpperCase());
        if (vac) {
          await this.toggleVaccineComplete(vac.id);
          if (this.selectedTask && this.selectedTask.id.toUpperCase() === taskId.toUpperCase()) {
            this.selectedTask.status = vac.status;
            this.updateModalSealButton(vac.status === 'COMPLETE');
            const statusSelect = document.getElementById('modal-status-select');
            if (statusSelect) statusSelect.value = vac.status;
          }
          return;
        }
      }
      return;
    }

    const willComplete = target.status !== 'COMPLETE';
    target.status = willComplete ? 'COMPLETE' : 'PENDING';
    if (willComplete) {
      target.checklists_completed = Array.isArray(target.checklists) ? [...target.checklists] : [];
    } else {
      target.checklists_completed = [];
    }
    target.last_updated = new Date().toISOString();

    // Persist to immutable completed task IDs index
    try {
      const storedIds = new Set(JSON.parse(localStorage.getItem('nrmc_completed_task_ids') || '[]'));
      if (willComplete) {
        storedIds.add(target.id.toUpperCase());
      } else {
        storedIds.delete(target.id.toUpperCase());
      }
      localStorage.setItem('nrmc_completed_task_ids', JSON.stringify(Array.from(storedIds)));
    } catch (e) {}

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

    // Persist to immutable completed task IDs index
    try {
      const storedIds = new Set(JSON.parse(localStorage.getItem('nrmc_completed_task_ids') || '[]'));
      if (willComplete) {
        storedIds.add(v.id.toUpperCase());
      } else {
        storedIds.delete(v.id.toUpperCase());
      }
      localStorage.setItem('nrmc_completed_task_ids', JSON.stringify(Array.from(storedIds)));
    } catch (e) {}

    this.playTacticalFeedback(willComplete ? 'seal' : 'unseal');
    this.showToast(willComplete ? `✓ Vaccine ${v.vaccine} recorded as GIVEN on ${v.date_administered}!` : `Vaccine ${v.vaccine} reverted to scheduled.`);
    this.render();

    try {
      const res = await fetch(this.apiUrl(`/api/v1/nrmc/vaccine/${v.id}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: v.status,
          date_administered: v.date_administered
        }),
        signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined
      });
      if (res.ok) {
        this.broadcastFleetTelemetry();
      } else {
        this.enqueuePendingSync({
          type: 'vaccine',
          id: v.id,
          payload: { status: v.status, date_administered: v.date_administered },
          timestamp: Date.now()
        });
      }
    } catch (err) {
      console.warn('[NRMC] Vaccine update queued for background retry:', err.message);
      this.enqueuePendingSync({
        type: 'vaccine',
        id: v.id,
        payload: { status: v.status, date_administered: v.date_administered },
        timestamp: Date.now()
      });
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
    const dialog = document.getElementById('dialog-confirm-delete-doc');
    const descEl = document.getElementById('delete-doc-dialog-desc');
    const docEntry = Array.isArray(this.state?.vault_documents)
      ? this.state.vault_documents.find((d) => d.id === docId)
      : null;

    if (!dialog || typeof dialog.showModal !== 'function') return;

    if (descEl) {
      descEl.textContent = docEntry?.name
        ? `Are you sure you want to remove "${docEntry.name}" from the local vault?`
        : 'Are you sure you want to remove this document from the local vault?';
    }

    dialog.returnValue = '';
    dialog.addEventListener(
      'close',
      async () => {
        const choice = dialog.returnValue;
        dialog.returnValue = '';
        if (choice !== 'delete') return;

        try {
          const res = await fetch(this.apiUrl(`/api/v1/nrmc/vault/document/${encodeURIComponent(docId)}`), {
            method: 'DELETE'
          });
          if (!res.ok && res.status !== 404) {
            throw new Error(`HTTP ${res.status}`);
          }
        } catch (e) {
          // Local / static hosting fallback continues to remove cached vault entry
        }

        if (Array.isArray(this.state.vault_documents)) {
          this.state.vault_documents = this.state.vault_documents.filter((d) => d.id !== docId);
        }
        Object.values(this.state.modules || {}).forEach((mod) => {
          if (Array.isArray(mod.tasks)) {
            mod.tasks.forEach((t) => {
              if (Array.isArray(t.attached_documents)) {
                t.attached_documents = t.attached_documents.filter((id) => id !== docId);
              }
            });
          }
          if (Array.isArray(mod.vaccine_glidepath)) {
            mod.vaccine_glidepath.forEach((v) => {
              if (Array.isArray(v.attached_documents)) {
                v.attached_documents = v.attached_documents.filter((id) => id !== docId);
              }
            });
          }
        });
        localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
        this.playTacticalFeedback('unseal');
        this.showToast('Document removed from local vault');
        this.render();
        if (this.selectedTask) {
          this.openActionModal(this.selectedTask.id);
        }
      },
      { once: true }
    );

    dialog.showModal();
  }

  // Task Status Update API sync
  async updateTaskStatus(taskId, newStatus) {
    if (!this.selectedTask) return;
    this.selectedTask.status = newStatus;
    if (this.selectedTask.is_vaccine) {
      const vac = this.state.modules?.module_e?.vaccine_glidepath?.find(v => v.id.toUpperCase() === taskId.toUpperCase());
      if (vac) {
        vac.status = newStatus;
        vac.date_administered = newStatus === 'COMPLETE' ? new Date().toISOString().split('T')[0] : null;
        try {
          await fetch(this.apiUrl(`/api/v1/nrmc/vaccine/${vac.id}`), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: vac.status,
              date_administered: vac.date_administered,
              administered_date: vac.date_administered
            })
          });
          this.broadcastFleetTelemetry();
        } catch (e) {}
        localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
      }
    } else {
      await this.syncTaskUpdate(taskId, { status: newStatus });
    }
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
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined
      });
      if (res.ok) {
        this.broadcastFleetTelemetry();
        localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
        return;
      } else {
        this.enqueuePendingSync({
          type: 'task',
          id: taskId,
          payload,
          timestamp: Date.now()
        });
      }
    } catch (err) {
      console.warn('[NRMC] Task update queued for background retry:', err.message);
      this.enqueuePendingSync({
        type: 'task',
        id: taskId,
        payload,
        timestamp: Date.now()
      });
    }
    localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
  }

  enqueuePendingSync(item) {
    try {
      const queue = JSON.parse(localStorage.getItem('nrmc_pending_sync_queue') || '[]');
      const filtered = queue.filter(q => !(q.type === item.type && q.id.toUpperCase() === item.id.toUpperCase()));
      filtered.push(item);
      localStorage.setItem('nrmc_pending_sync_queue', JSON.stringify(filtered));
    } catch (e) {}
  }

  async flushPendingSyncQueue() {
    try {
      const queue = JSON.parse(localStorage.getItem('nrmc_pending_sync_queue') || '[]');
      if (!Array.isArray(queue) || queue.length === 0) return;

      const remaining = [];
      for (const item of queue) {
        try {
          const url = item.type === 'vaccine'
            ? this.apiUrl(`/api/v1/nrmc/vaccine/${item.id}`)
            : this.apiUrl(`/api/v1/nrmc/task/${item.id}`);
          const method = item.type === 'vaccine' ? 'POST' : 'PATCH';
          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.payload),
            signal: AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined
          });
          if (!res.ok) remaining.push(item);
        } catch (e) {
          remaining.push(item);
        }
      }
      localStorage.setItem('nrmc_pending_sync_queue', JSON.stringify(remaining));
      if (remaining.length < queue.length) {
        console.log(`[NRMC Sync] Flushed ${queue.length - remaining.length} queued action(s) to server.`);
        this.broadcastFleetTelemetry();
      }
    } catch (e) {}
  }

  // Update Milestone status
  async updateMilestone(milestoneId, status) {
    const list = this.state.modules?.module_e?.developmental_milestones || [];
    const m = list.find((item) => item.id === milestoneId);
    if (m) {
      m.status = status;
      if (status === 'ACHIEVED') m.date_achieved = new Date().toISOString().split('T')[0];
    }
    localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
    this.render();
    this.showToast(`Milestone updated to ${status}`);
    try {
      await fetch(this.apiUrl(`/api/v1/nrmc/milestone/${milestoneId}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      // Local cache already persisted
    }
  }

  // Tummy Time Log API
  async recordTummyTimeSession(minutes) {
    const tt = this.state.modules?.module_e?.tummy_time_tracker;
    if (tt) {
      tt.today_completed_minutes = (tt.today_completed_minutes || 0) + minutes;
      tt.total_lifetime_sessions = (tt.total_lifetime_sessions || 0) + 1;
      if (!Array.isArray(tt.history)) tt.history = [];
      tt.history.unshift({
        date: new Date().toISOString().split('T')[0],
        minutes,
        notes: 'Tummy time session completed.'
      });
    }
    localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
    this.render();
    this.showToast(`Logged ${minutes}m of tummy time!`);

    try {
      await fetch(this.apiUrl('/api/v1/nrmc/tummy-time'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes })
      });
    } catch (e) {
      // Local cache already persisted
    }
  }

  // Open Growth Measurement Native Modal Dialog
  openGrowthModal() {
    const dialog = document.getElementById('dialog-log-growth');
    const weightInput = document.getElementById('growth-weight-input');
    const lengthInput = document.getElementById('growth-length-input');
    const headInput = document.getElementById('growth-head-input');
    const notesInput = document.getElementById('growth-notes-input');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const existing = this.state?.modules?.module_e?.growth_telemetry?.measurements || [];
    const latest = existing.length > 0 ? existing[existing.length - 1] : null;
    if (weightInput) weightInput.value = latest?.weight_lbs != null ? String(latest.weight_lbs) : '8.2';
    if (lengthInput) lengthInput.value = latest?.length_in != null ? String(latest.length_in) : '20.8';
    if (headInput) headInput.value = latest?.head_circ_in != null ? String(latest.head_circ_in) : '14.5';
    if (notesInput) notesInput.value = 'Pediatric clinic measurement';

    dialog.returnValue = '';
    dialog.addEventListener(
      'close',
      () => {
        const choice = dialog.returnValue;
        dialog.returnValue = '';
        if (choice !== 'save') return;

        const wRaw = weightInput?.value?.trim() || '';
        const lRaw = lengthInput?.value?.trim() || '';
        const hRaw = headInput?.value?.trim() || '';
        const notesRaw = notesInput?.value?.trim() || '';

        const weight_lbs = parseFloat(wRaw);
        if (Number.isNaN(weight_lbs) || weight_lbs <= 0) {
          this.showToast('Please provide a valid weight in lbs.', 'error');
          return;
        }
        const parsedLen = lRaw ? parseFloat(lRaw) : null;
        const parsedHead = hRaw ? parseFloat(hRaw) : null;

        this.submitGrowthMeasurement({
          weight_lbs,
          length_in: parsedLen !== null && !Number.isNaN(parsedLen) ? parsedLen : null,
          head_circ_in: parsedHead !== null && !Number.isNaN(parsedHead) ? parsedHead : null,
          notes: notesRaw || 'Clinical check measurement'
        });
      },
      { once: true }
    );

    dialog.showModal();
  }

  buildLocalGrowthEntry(payload) {
    const dob = new Date((this.state?.profile?.dob || '2026-11-06') + 'T00:00:00');
    const recordDate = new Date();
    const diffTime = Math.max(0, recordDate - dob);
    const age_days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const age_months = +(age_days / 30.4375).toFixed(2);
    const wLbs = payload.weight_lbs ?? null;
    const lIn = payload.length_in ?? null;
    const hIn = payload.head_circ_in ?? null;

    return {
      id: `GROWTH_${Date.now()}`,
      date: recordDate.toISOString().split('T')[0],
      age_days,
      age_months,
      weight_lbs: wLbs,
      length_in: lIn,
      head_circ_in: hIn,
      weight_percentile: wLbs !== null ? Math.min(99, Math.max(1, Math.round(50 + (wLbs - (7.3 + age_months * 1.5)) * 12))) : null,
      length_percentile: lIn !== null ? Math.min(99, Math.max(1, Math.round(50 + (lIn - (19.7 + age_months * 1.0)) * 14))) : null,
      head_percentile: hIn !== null ? Math.min(99, Math.max(1, Math.round(50 + (hIn - (13.6 + age_months * 0.5)) * 15))) : null,
      notes: payload.notes || 'Clinical measurement recorded.'
    };
  }

  async submitGrowthMeasurement(payload) {
    let entry = null;
    try {
      const res = await fetch(this.apiUrl('/api/v1/nrmc/growth'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.entry) {
          entry = data.entry;
        }
      }
    } catch (e) {
      // Static / offline mode falls back to local WHO entry creation
    }

    if (!entry) {
      entry = this.buildLocalGrowthEntry(payload);
    }

    if (this.state?.modules?.module_e) {
      if (!this.state.modules.module_e.growth_telemetry) {
        this.state.modules.module_e.growth_telemetry = { measurements: [] };
      }
      if (!Array.isArray(this.state.modules.module_e.growth_telemetry.measurements)) {
        this.state.modules.module_e.growth_telemetry.measurements = [];
      }
      this.state.modules.module_e.growth_telemetry.measurements.push(entry);
      localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
      this.render();
      this.showToast('Growth measurement recorded & plotted against WHO standards.');
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
    const dobTextInput = document.getElementById('cfg-baby-dob-text');
    const rapidsInput = document.getElementById('cfg-rapids-date');

    const currentDob = profile.dob || '2026-11-06';
    if (nameInput) nameInput.value = profile.baby_name || 'Aiden James Vane';
    if (dobInput) dobInput.value = currentDob;
    if (dobTextInput) dobTextInput.value = currentDob;

    if (rapidsInput) {
      if (anchors.rapids_appointment?.scheduled_date) {
        rapidsInput.value = anchors.rapids_appointment.scheduled_date.slice(0, 16);
      } else {
        rapidsInput.value = '';
      }
    }

    this.previewRecalculation();
    modal.classList.add('active');
  }

  closeProfileConfigModal() {
    const modal = document.getElementById('profile-config-modal');
    if (modal) modal.classList.remove('active');
  }

  previewRecalculation() {
    const dobInput = document.getElementById('cfg-baby-dob');
    const dobTextInput = document.getElementById('cfg-baby-dob-text');
    const dobVal = (dobInput?.value || dobTextInput?.value || '').trim();
    if (!dobVal || !/^\d{4}-\d{2}-\d{2}$/.test(dobVal)) return;

    // 90 days TRICARE deadline
    const deadlineStr = this.addDays(dobVal, 90);

    const now = new Date();
    const birthDate = new Date(dobVal + 'T00:00:00');
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
    const vaxDate = this.addDays(dobVal, 60);
    if (pPentavalent) pPentavalent.textContent = `${vaxDate} (2-Month Pentavalent #1)`;

    // Live Rank Calculation
    const rankInfo = this.computeAidenRank(dobVal);
    const rankBadge = document.getElementById('cfg-rank-badge');
    const rankSummary = document.getElementById('cfg-rank-summary');

    if (rankBadge) {
      rankBadge.textContent = `${rankInfo.code} (${rankInfo.grade})`;
      rankBadge.className = `countdown-pill ${rankInfo.badgeClass}`;
    }
    if (rankSummary) {
      rankSummary.textContent = `${rankInfo.title}: ${rankInfo.desc} Next progression milestone: ${rankInfo.nextRank}.`;
    }
  }

  async saveProfileConfiguration() {
    const nameVal = (document.getElementById('cfg-baby-name')?.value || '').trim() || 'Aiden James Vane';
    const dobInput = document.getElementById('cfg-baby-dob');
    const dobTextInput = document.getElementById('cfg-baby-dob-text');
    let dobVal = (dobTextInput?.value || dobInput?.value || '').trim();
    const rapidsVal = document.getElementById('cfg-rapids-date')?.value || '';

    if (!dobVal || !/^\d{4}-\d{2}-\d{2}$/.test(dobVal)) {
      this.showToast('Please specify a valid Date of Birth (YYYY-MM-DD)', 'error');
      return;
    }

    if (!this.state) this.state = {};
    if (!this.state.profile) this.state.profile = {};
    if (!this.state.command_anchors) this.state.command_anchors = {};
    if (!this.state.command_anchors.tricare_grace) this.state.command_anchors.tricare_grace = {};
    if (!this.state.command_anchors.rapids_appointment) this.state.command_anchors.rapids_appointment = {};

    const rankInfo = this.computeAidenRank(dobVal);
    this.state.profile.baby_name = nameVal;
    this.state.profile.dob = dobVal;
    this.state.profile.rank = rankInfo.code;
    this.state.profile.pay_grade = rankInfo.grade;
    delete this.state.profile.station;
    delete this.state.profile.sponsor_rank;

    const tricareDeadline = this.addDays(dobVal, 90);
    this.state.command_anchors.tricare_grace.start_date = dobVal;
    this.state.command_anchors.tricare_grace.deadline = tricareDeadline;

    if (rapidsVal) {
      this.state.command_anchors.rapids_appointment.scheduled_date = rapidsVal;
    } else {
      this.state.command_anchors.rapids_appointment.scheduled_date = null;
    }

    // Update Next Medical Milestone target date (2 Months)
    if (this.state.command_anchors.next_medical_milestone) {
      const vax2m = this.addDays(dobVal, 60);
      this.state.command_anchors.next_medical_milestone.target_date = `${vax2m}T09:30:00`;
      this.state.command_anchors.next_medical_milestone.title = `2-Month Well-Child / Pentavalent (${vax2m})`;
    }

    // Update vaccine target dates in module E
    if (this.state.modules?.module_e?.vaccine_glidepath) {
      const vDays = { 'VAC_01': 0, 'VAC_02': 30, 'VAC_03': 60, 'VAC_04': 120, 'VAC_05': 180 };
      this.state.modules.module_e.vaccine_glidepath.forEach((v) => {
        if (vDays[v.id] !== undefined) {
          v.target_date = this.addDays(dobVal, vDays[v.id]);
        }
      });
    }

    // Update audit trail
    if (!Array.isArray(this.state.audit_trail)) this.state.audit_trail = [];
    this.state.audit_trail.push({
      timestamp: new Date().toISOString(),
      action: 'PROFILE_RECALIBRATED',
      actor: 'OPERATOR',
      details: `Recalibrated profile: ${nameVal}, DOB: ${dobVal}, Rank: ${rankInfo.code} (${rankInfo.grade})`
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
    this.showToast(`Timeline calibrated to DOB: ${dobVal} | Rank: ${rankInfo.code} (${rankInfo.grade})!`);
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
