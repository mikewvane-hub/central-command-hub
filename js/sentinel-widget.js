/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Sentinel Diagnostic Matrix Widget & HUD Controller
 * Dedicated collapsible diagnostic matrix with real-time radial health beacon,
 * satellite status grid across all 6 projects, and live auto-remediation feed.
 */

import { sfx } from './sound-effects.js';
import { FLEET_PROJECTS } from './telemetry-bus.js';

export class SentinelWidget {
  constructor(options = {}) {
    this.bus = options.bus;
    this.engine = options.engine;
    this.dashboardMgr = options.dashboardMgr || null;
    this.isOpen = false;
    this.isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    if (this.isBrowser) {
      this.init();
    }
  }

  init() {
    this.setupHeaderHudPill();
    this.setupModalListeners();
    this.subscribeToTelemetryEvents();
    this.render();
  }

  setupHeaderHudPill() {
    const headerControls = document.querySelector('.tactical-controls');
    if (!headerControls) return;

    // Check if HUD pill already exists
    let hudBtn = document.getElementById('btn-sentinel-hud');
    if (!hudBtn) {
      hudBtn = document.createElement('button');
      hudBtn.id = 'btn-sentinel-hud';
      hudBtn.className = 'sentinel-hud-pill';
      hudBtn.title = 'Open Sentinel Autonomous Maintenance & Health Matrix';
      hudBtn.setAttribute('aria-haspopup', 'dialog');
      
      // Place right before global alerts pill or first in controls
      const alertsBtn = document.getElementById('btn-global-alerts');
      if (alertsBtn && alertsBtn.parentNode) {
        alertsBtn.parentNode.insertBefore(hudBtn, alertsBtn);
      } else {
        headerControls.prepend(hudBtn);
      }
    }

    hudBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.playClick();
      this.toggleModal();
    });
  }

  setupModalListeners() {
    // 1. Close Button
    const closeBtn = document.getElementById('btn-close-sentinel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        sfx.playClick();
        this.closeModal();
      });
    }

    const dismissFooterBtn = document.getElementById('btn-dismiss-sentinel-modal');
    if (dismissFooterBtn) {
      dismissFooterBtn.addEventListener('click', () => {
        sfx.playClick();
        this.closeModal();
      });
    }

    // 2. Backdrop click
    const modal = document.getElementById('modal-sentinel-matrix');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          sfx.playClick();
          this.closeModal();
        }
      });
    }

    // 3. Sweep trigger button
    const sweepBtn = document.getElementById('btn-sentinel-run-sweep');
    if (sweepBtn) {
      sweepBtn.addEventListener('click', async () => {
        sfx.playWarp();
        sweepBtn.classList.add('loading');
        sweepBtn.textContent = '⏳ RUNNING SWEEP...';
        try {
          if (this.engine) {
            await this.engine.runSweep();
          }
        } finally {
          sweepBtn.classList.remove('loading');
          sweepBtn.textContent = '⚡ RUN SENTINEL SWEEP';
          this.render();
        }
      });
    }

    // 4. Auto-heal button
    const healBtn = document.getElementById('btn-sentinel-auto-heal');
    if (healBtn) {
      healBtn.addEventListener('click', () => {
        sfx.playClick();
        if (this.engine) {
          const domRes = this.engine.auditDomSurface();
          this.engine.performSelfHealing(domRes, null);
          this.render();
        }
      });
    }

    // 4.5. Export Dossier for Claude / ChatGPT
    const dossierBtn = document.getElementById('btn-sentinel-export-dossier');
    if (dossierBtn) {
      dossierBtn.addEventListener('click', async () => {
        sfx.playClick();
        dossierBtn.classList.add('loading');
        dossierBtn.textContent = '⏳ GENERATING DOSSIER...';

        try {
          let markdown = '';
          // 1. Try server endpoint first for full system topology & live alert data
          try {
            const resp = await fetch('/api/sentinel/export-dossier', { method: 'POST' });
            if (resp.ok) {
              const data = await resp.json();
              if (data.markdown) {
                markdown = data.markdown;
              }
            }
          } catch (e) {}

          // 2. Client fallback if server is unreachable
          if (!markdown && this.engine && typeof this.engine.generateAuditDossier === 'function') {
            markdown = this.engine.generateAuditDossier();
          }

          if (markdown) {
            // Copy to clipboard
            let copied = false;
            if (navigator.clipboard && navigator.clipboard.writeText) {
              try {
                await navigator.clipboard.writeText(markdown);
                copied = true;
              } catch (clipErr) {
                console.warn('Clipboard writeText failed, using fallback:', clipErr);
              }
            }

            if (!copied) {
              // Textarea fallback
              const ta = document.createElement('textarea');
              ta.value = markdown;
              ta.style.position = 'fixed';
              ta.style.opacity = '0';
              document.body.appendChild(ta);
              ta.select();
              document.execCommand('copy');
              document.body.removeChild(ta);
              copied = true;
            }

            sfx.playSuccess();
            dossierBtn.textContent = '✓ COPIED TO CLIPBOARD!';
            setTimeout(() => {
              dossierBtn.textContent = '📋 COPY DOSSIER (CHATGPT / CLAUDE)';
            }, 3000);
          } else {
            throw new Error('Dossier generation returned empty content');
          }
        } catch (err) {
          console.error('[SentinelWidget] Dossier export error:', err);
          dossierBtn.textContent = '⚠️ EXPORT FAILED';
          setTimeout(() => {
            dossierBtn.textContent = '📋 COPY DOSSIER (CHATGPT / CLAUDE)';
          }, 2500);
        } finally {
          dossierBtn.classList.remove('loading');
        }
      });
    }

    // 5. ESC Key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeModal();
      }
    });
  }

  subscribeToTelemetryEvents() {
    if (!this.bus) return;

    // Re-render when any project reports health, sweep completes, or log arrives
    this.bus.subscribe('*', () => {
      this.updateHudPill();
      if (this.isOpen) {
        this.render();
      }
    });
  }

  toggleModal() {
    if (this.isOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  openModal() {
    const modal = document.getElementById('modal-sentinel-matrix');
    if (!modal) return;
    this.isOpen = true;
    modal.classList.add('open');
    this.render();
  }

  closeModal() {
    const modal = document.getElementById('modal-sentinel-matrix');
    if (!modal) return;
    this.isOpen = false;
    modal.classList.remove('open');
  }

  render() {
    this.updateHudPill();
    if (!this.isOpen) return;

    this.renderRadialBeacon();
    this.renderNodeStatusGrid();
    this.renderAuditFeed();
  }

  updateHudPill() {
    const hudBtn = document.getElementById('btn-sentinel-hud');
    if (!hudBtn || !this.bus) return;

    const metrics = this.bus.getAggregateMetrics();
    const score = metrics.fleetHealthScore;
    const isNominal = score >= 90;
    const isDegraded = score >= 60 && score < 90;

    const colorClass = isNominal ? 'status-nominal' : (isDegraded ? 'status-degraded' : 'status-down');

    hudBtn.className = `sentinel-hud-pill ${colorClass}`;
    hudBtn.innerHTML = `
      <div class="sentinel-hud-donut">
        <svg width="22" height="22" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3"></circle>
          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-dasharray="${(score / 100) * 88} 88" stroke-dashoffset="0"
                  stroke-linecap="round" transform="rotate(-90 18 18)"></circle>
        </svg>
        <span class="sentinel-mini-beacon"></span>
      </div>
      <div class="sentinel-hud-labels">
        <span class="sentinel-hud-title">SENTINEL</span>
        <span class="sentinel-hud-score">${score}%</span>
      </div>
    `;
  }

  renderRadialBeacon() {
    const container = document.getElementById('sentinel-radial-container');
    if (!container || !this.bus) return;

    const metrics = this.bus.getAggregateMetrics();
    const score = metrics.fleetHealthScore;
    const circumference = 2 * Math.PI * 54; // r=54 -> ~339.29
    const strokeDash = (score / 100) * circumference;

    const strokeColor = score >= 90 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444');
    const statusText = score >= 90 ? 'ALL SYSTEMS NOMINAL' : (score >= 60 ? 'DEGRADED FLEET HEALTH' : 'CRITICAL OUTAGE DETECTED');

    container.innerHTML = `
      <div class="sentinel-radial-wrap">
        <svg class="sentinel-donut-svg" width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"></circle>
          <circle cx="70" cy="70" r="54" fill="none" stroke="${strokeColor}" stroke-width="10"
                  stroke-dasharray="${strokeDash} ${circumference}" stroke-dashoffset="0"
                  stroke-linecap="round" transform="rotate(-90 70 70)"
                  style="transition: stroke-dasharray 0.6s ease, stroke 0.4s ease; filter: drop-shadow(0 0 8px ${strokeColor});"></circle>
        </svg>
        <div class="sentinel-radial-center">
          <span class="radial-score-num">${score}%</span>
          <span class="radial-score-lbl">FLEET HEALTH</span>
        </div>
      </div>
      <div class="sentinel-summary-stats">
        <div class="summary-status-badge" style="color:${strokeColor}; border-color:${strokeColor}44; background:${strokeColor}14;">
          <span class="status-beacon" style="background:${strokeColor};"></span>
          <span>${statusText}</span>
        </div>
        <div class="summary-stat-pills">
          <div class="stat-pill nominal"><span>✓</span> <strong>${metrics.healthyCount}</strong> Healthy</div>
          <div class="stat-pill degraded"><span>⚠️</span> <strong>${metrics.degradedCount}</strong> Degraded</div>
          <div class="stat-pill down"><span>✕</span> <strong>${metrics.downCount}</strong> Down</div>
          <div class="stat-pill total"><span>⚡</span> <strong>${this.engine ? this.engine.remediationsCount : 0}</strong> Auto-Repairs</div>
        </div>
      </div>
    `;
  }

  renderNodeStatusGrid() {
    const grid = document.getElementById('sentinel-node-grid');
    if (!grid || !this.bus) return;

    const fleetHealth = this.bus.getFleetHealth();

    grid.innerHTML = Object.entries(FLEET_PROJECTS).map(([pId, meta]) => {
      const data = fleetHealth[pId] || {
        status: 'HEALTHY',
        endpoints: { latencyMs: 14, port: meta.defaultPort },
        domIntegrity: { brokenSelectors: [] },
        activeIssues: []
      };

      const isHealthy = data.status === 'HEALTHY';
      const isDegraded = data.status === 'DEGRADED';
      const statusClass = isHealthy ? 'node-healthy' : (isDegraded ? 'node-degraded' : 'node-down');
      const badgeText = isHealthy ? 'ONLINE' : (isDegraded ? 'DEGRADED' : 'OFFLINE');
      const latencyStr = data.endpoints?.latencyMs ? `${data.endpoints.latencyMs}ms` : 'Local / Cloud';

      return `
        <div class="sentinel-node-card ${statusClass}" data-project="${pId}">
          <div class="node-card-header">
            <div class="node-title-group">
              <span class="node-deck-tag">${meta.category}</span>
              <strong class="node-project-name">${meta.name}</strong>
            </div>
            <span class="node-status-badge ${statusClass}">
              <span class="status-beacon"></span> ${badgeText}
            </span>
          </div>

          <div class="node-metrics-row">
            <div class="metric-item">
              <span class="metric-label">ROUTE / PORT</span>
              <span class="metric-value">:${data.endpoints?.port || meta.defaultPort}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">LATENCY</span>
              <span class="metric-value">${latencyStr}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">DOM INTEGRITY</span>
              <span class="metric-value">${data.domIntegrity?.brokenSelectors?.length === 0 ? '✓ Nominal' : '⚠️ Flagged'}</span>
            </div>
          </div>

          <div class="node-card-footer">
            <button class="btn-node-inspect" data-deck="${meta.deckId}" title="Launch node in workspace">
              Launch Deck ➔
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Wire Launch buttons
    grid.querySelectorAll('.btn-node-inspect').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const deckId = btn.getAttribute('data-deck');
        if (deckId && this.dashboardMgr) {
          sfx.playWarp();
          this.closeModal();
          this.dashboardMgr.switchDeck(deckId);
        }
      });
    });
  }

  renderAuditFeed() {
    const feed = document.getElementById('sentinel-audit-feed');
    if (!feed || !this.engine) return;

    const history = this.engine.getAuditHistory();

    if (history.length === 0) {
      feed.innerHTML = `
        <div class="audit-empty-feed">
          <span>🛡️</span>
          <p>Sentinel Watchdog active. All subagent systems running nominal with zero pending alerts.</p>
        </div>
      `;
      return;
    }

    feed.innerHTML = history.slice(0, 15).map(item => {
      const timeStr = new Date(item.timestamp).toLocaleTimeString();
      const levelClass = (item.level || 'info').toLowerCase();
      const icon = item.level === 'REMEDIATED' ? '⚡' : (item.level === 'NOMINATED' ? '⚠️' : 'ℹ️');

      const detailsStr = item.details?.details || item.details?.fixProposal || item.action.replace(/_/g, ' ');

      return `
        <div class="audit-feed-item level-${levelClass}">
          <div class="audit-item-meta">
            <span class="audit-time">${timeStr}</span>
            <span class="audit-badge level-${levelClass}">${icon} ${item.level}</span>
          </div>
          <div class="audit-action-title">${item.action.replace(/_/g, ' ')}</div>
          <div class="audit-action-desc">${detailsStr}</div>
        </div>
      `;
    }).join('');
  }
}
