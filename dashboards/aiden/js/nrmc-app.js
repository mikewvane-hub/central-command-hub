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
    this.currentTab = 'admin-military';
    this.selectedTask = null;
    this.currentMetric = 'weight';
    this.broadcastChannel = null;

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

  // 3. Load State from LocalStorage / Server
  async loadInitialState() {
    // Check LocalStorage first for instant paint
    const cached = localStorage.getItem('nrmc_cached_state');
    if (cached) {
      try {
        this.state = JSON.parse(cached);
      } catch (e) {
        console.warn('[NRMC] Invalid cached state');
      }
    }

    // Fetch freshest state from server
    try {
      const res = await fetch('/api/v1/nrmc/state');
      if (res.ok) {
        this.state = await res.json();
        localStorage.setItem('nrmc_cached_state', JSON.stringify(this.state));
      }
    } catch (err) {
      console.warn('[NRMC] Offline or server unreachable, running in local cached mode:', err.message);
    }
  }

  // 4. WebSocket Real-Time Stream
  initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/telemetry`;

    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = () => {
        this.updateNetworkBadge(true);
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
        setTimeout(() => this.initWebSocket(), 5000);
      };
    } catch (e) {
      this.updateNetworkBadge(false);
    }
  }

  updateNetworkBadge(online) {
    const badge = document.getElementById('ws-status-badge');
    if (badge) {
      badge.textContent = online ? 'LIVE WEBSOCKET' : 'STANDALONE SYNC';
      badge.className = `countdown-pill ${online ? 'pill-emerald' : 'pill-amber'}`;
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
    this.renderModuleTasks();
    this.renderClinicalData();
    this.renderRawTelemetry();
  }

  renderHeaderAndProfile() {
    const profile = this.state.profile || {};
    const nameEl = document.getElementById('baby-name-display');
    const dobEl = document.getElementById('baby-dob-display');
    const stationEl = document.getElementById('military-station-display');

    if (nameEl) nameEl.textContent = profile.baby_name || 'Aiden Christopher';
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
        const priorityPill =
          t.priority === 'CRITICAL' ? 'pill-crimson' : t.priority === 'HIGH' ? 'pill-amber' : 'pill-cyan';

        return `
        <div class="task-matrix-card" data-task-id="${t.id}">
          <div class="task-card-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="task-id-badge">${t.id}</span>
              <span class="task-category-tag">${t.category || 'General'}</span>
            </div>
            <span class="countdown-pill ${priorityPill}">${t.priority || 'NORMAL'}</span>
          </div>
          <div class="task-card-title">${t.title}</div>
          <div class="task-card-desc">${t.notes || (t.sla ? `SLA: ${t.sla}` : 'Operational task')}</div>
          <div class="task-card-footer">
            <span class="task-checklist-summary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ${checkDone}/${checkTotal} Checked
            </span>
            <span class="status-pill status-${t.status}">${t.status}</span>
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
          const statusClass =
            v.status === 'COMPLETE' ? 'pill-emerald' : v.status === 'SCHEDULED' ? 'pill-cyan' : 'pill-amber';
          return `
          <tr>
            <td style="font-family:var(--font-mono); font-weight:700; color:var(--cyan-telemetry);">${v.stage}</td>
            <td style="font-weight:600;">${v.vaccine}</td>
            <td style="font-family:var(--font-mono); color:var(--text-muted);">${v.target_date || 'TBD'}</td>
            <td><span class="countdown-pill ${statusClass}">${v.status}</span></td>
            <td>
              <button class="hud-btn hud-btn-sm edit-vaccine-btn" data-vac-id="${v.id}">LOG / EDIT</button>
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

    // Task Card Click (Open Action Modal)
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.task-matrix-card');
      if (card && card.dataset.taskId) {
        this.openActionModal(card.dataset.taskId);
      }
    });

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
        window.location.href = '/api/v1/nrmc/export';
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
              const res = await fetch('/api/v1/nrmc/import', {
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
            this.syncTaskUpdate(task.id, { checklists_completed: task.checklists_completed });
          });
        });
      } else {
        checklistContainer.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem;">No checklist constraints defined for this sortie.</div>';
      }
    }

    // Required Forms & Download Links
    const formsContainer = document.getElementById('modal-forms-container');
    if (formsContainer) {
      let html = '';
      if (Array.isArray(task.form_downloads) && task.form_downloads.length > 0) {
        html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">';
        task.form_downloads.forEach((f) => {
          html += `
            <a href="/forms/${f.file}" download="${f.file}" class="hud-btn hud-btn-sm hud-btn-primary" target="_blank">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              ${f.name}
            </a>
          `;
          if (f.official_url) {
            html += `
              <a href="${f.official_url}" target="_blank" rel="noopener noreferrer" class="hud-btn hud-btn-sm">
                Official .gov Portal
              </a>
            `;
          }
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

    modal.classList.add('active');
  }

  closeActionModal() {
    const modal = document.getElementById('task-action-modal');
    if (modal) modal.classList.remove('active');
    this.selectedTask = null;
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
      const res = await fetch(`/api/v1/nrmc/task/${taskId}`, {
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
      await fetch(`/api/v1/nrmc/milestone/${milestoneId}`, {
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
      await fetch('/api/v1/nrmc/tummy-time', {
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
      const res = await fetch('/api/v1/nrmc/growth', {
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
    const currentDob = this.state.profile?.dob || '2026-11-15';
    const newDob = prompt('Enter Date of Birth / Expected Delivery (YYYY-MM-DD):', currentDob);
    if (!newDob || newDob === currentDob) return;

    this.state.profile.dob = newDob;
    const birthDate = new Date(newDob);
    const deadline = new Date(birthDate.getTime() + 90 * 24 * 60 * 60 * 1000);
    this.state.command_anchors.tricare_grace.start_date = newDob;
    this.state.command_anchors.tricare_grace.deadline = deadline.toISOString().split('T')[0];

    this.render();
    this.showToast(`Timeline calibrated to DOB: ${newDob}`);

    fetch('/api/v1/nrmc/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dob: newDob })
    });
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
