/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Sentinel Autonomous Maintenance & Telemetry Subagent (Sentinel-Daemon)
 * Continuous autonomous health sweeps, tunnel/endpoint verification, headless DOM audits,
 * self-healing remediation, and high-priority ticket nomination.
 */

import { telemetryBus, FLEET_PROJECTS, DECK_TO_PROJECT_MAP } from './telemetry-bus.js';

export class SentinelMaintenanceEngine {
  constructor(options = {}) {
    this.bus = options.bus || telemetryBus;
    this.dashboardMgr = options.dashboardMgr || null;
    this.visualizer = options.visualizer || null;
    this.sidebarMgr = options.sidebarMgr || null;

    // Sweep Interval (default 15 minutes = 900,000ms; configurable between 15-60 min or fast mode in tests)
    this.sweepIntervalMs = options.sweepIntervalMs || (15 * 60 * 1000);
    this.timerId = null;
    this.isRunning = false;
    this.isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    this.auditLogStorageKey = 'sentinel_audit_log';
    this.auditHistory = [];
    this.lastSweepTimestamp = 0;
    this.remediationsCount = 0;

    this.loadAuditHistory();
  }

  loadAuditHistory() {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(this.auditLogStorageKey);
      if (raw) {
        this.auditHistory = JSON.parse(raw);
        if (!Array.isArray(this.auditHistory)) this.auditHistory = [];
      }
    } catch (e) {
      this.auditHistory = [];
    }
  }

  saveAuditHistory() {
    if (!this.isBrowser) return;
    try {
      // Keep recent 60 audit records to avoid unbounded growth
      if (this.auditHistory.length > 60) {
        this.auditHistory = this.auditHistory.slice(-60);
      }
      localStorage.setItem(this.auditLogStorageKey, JSON.stringify(this.auditHistory));
    } catch (e) {}
  }

  logAudit(action, details = {}, level = 'INFO') {
    const record = {
      id: `sentinel-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: Date.now(),
      action,
      level, // 'INFO' | 'REMEDIATED' | 'NOMINATED' | 'ERROR'
      details
    };

    this.auditHistory.unshift(record);
    if (this.auditHistory.length > 60) this.auditHistory.pop();
    this.saveAuditHistory();

    if (level === 'REMEDIATED') {
      this.remediationsCount++;
    }

    // Sync to server backend audit log if possible
    if (this.isBrowser && typeof fetch === 'function') {
      try {
        fetch('/api/sentinel/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        }).catch(() => {});
      } catch (e) {}
    }

    this.bus.publish('SENTINEL_LOG', record);
    return record;
  }

  /**
   * Start scheduled periodic background health sweeps
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log(`🛡️ [Sentinel-Daemon] Initialized. Autonomous sweeps scheduled every ${Math.round(this.sweepIntervalMs / 60000)} min.`);

    // Run immediate sweep upon initialization
    this.runSweep().catch((err) => {
      console.warn('[Sentinel-Daemon] Initial sweep warning:', err);
    });

    this.timerId = setInterval(() => {
      this.runSweep().catch((err) => {
        console.warn('[Sentinel-Daemon] Periodic sweep warning:', err);
      });
    }, this.sweepIntervalMs);
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    console.log('🛡️ [Sentinel-Daemon] Stopped background monitoring.');
  }

  /**
   * Full autonomous maintenance & telemetry sweep
   */
  async runSweep() {
    const sweepId = `sweep-${Date.now()}`;
    const startTime = Date.now();
    this.lastSweepTimestamp = startTime;

    this.logAudit('SWEEP_STARTED', { sweepId }, 'INFO');

    // 1. Audit and verify satellite endpoints & tunnels
    const endpointResults = await this.auditEndpoints();

    // 2. Headless DOM and Link Surface audit
    const domResults = this.auditDomSurface();

    // 3. Self-healing & Auto-remediation passes
    const remediationResults = this.performSelfHealing(domResults, endpointResults);

    // 4. Critical flaw nomination
    const nominationResults = this.nominateCriticalFlaws(endpointResults, domResults);

    const sweepDuration = Date.now() - startTime;
    const summary = {
      sweepId,
      timestamp: startTime,
      durationMs: sweepDuration,
      endpointResults,
      domResults,
      remediationResults,
      nominationResults,
      aggregateMetrics: this.bus.getAggregateMetrics()
    };

    this.logAudit('SWEEP_COMPLETED', {
      durationMs: sweepDuration,
      healthyCount: summary.aggregateMetrics.healthyCount,
      degradedCount: summary.aggregateMetrics.degradedCount,
      downCount: summary.aggregateMetrics.downCount,
      remediationsApplied: remediationResults.applied.length
    }, remediationResults.applied.length > 0 ? 'REMEDIATED' : 'INFO');

    this.bus.publish('SWEEP_COMPLETED', summary);
    return summary;
  }

  /**
   * Subsystem 1: Tunnel & Endpoint Verification
   */
  async auditEndpoints() {
    const results = {};

    for (const [projectId, projectMeta] of Object.entries(FLEET_PROJECTS)) {
      const probeStart = Date.now();
      let status = 'HEALTHY';
      let latencyMs = 0;
      let tunnelActive = true;
      const activeIssues = [];

      try {
        const targetUrl = (this.dashboardMgr && this.dashboardMgr.urls?.[projectMeta.deckId]) || projectMeta.url;

        // Perform probe check
        const probeResult = await this.pingTargetUrl(targetUrl);
        latencyMs = Date.now() - probeStart;

        if (!probeResult.ok) {
          if (probeResult.timedOut || latencyMs > 3500) {
            status = 'DEGRADED';
            activeIssues.push({
              code: 'ENDPOINT_LATENCY_HIGH',
              description: `High latency (${latencyMs}ms) detected on ${projectMeta.name}`
            });
          } else {
            status = 'DOWN';
            tunnelActive = false;
            activeIssues.push({
              code: 'ENDPOINT_UNREACHABLE',
              description: `Endpoint ${targetUrl} returned HTTP status ${probeResult.status || 'UNREACHABLE'}`
            });
          }
        }
      } catch (err) {
        status = 'DOWN';
        tunnelActive = false;
        activeIssues.push({
          code: 'CONNECTION_REFUSED',
          description: `Failed to connect to ${projectMeta.name}: ${err.message}`
        });
      }

      const report = this.bus.emitHealth(projectId, {
        status,
        endpoints: {
          port: projectMeta.defaultPort,
          tunnelActive,
          latencyMs,
          url: projectMeta.url
        },
        activeIssues
      });

      results[projectId] = report;
    }

    return results;
  }

  async pingTargetUrl(url) {
    if (!this.isBrowser || typeof fetch !== 'function') {
      return { ok: true, status: 200, timedOut: false };
    }

    // Relative local paths are always inherently online
    if (url.startsWith('./') || url.startsWith('/dashboards')) {
      return { ok: true, status: 200, timedOut: false };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const resp = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);
      return { ok: true, status: resp.status || 200, timedOut: false };
    } catch (err) {
      const isTimeout = err.name === 'AbortError';
      return { ok: false, status: isTimeout ? 408 : 503, timedOut: isTimeout };
    }
  }

  /**
   * Subsystem 2: UI & Link Surface Audit (Headless DOM Scanner)
   */
  auditDomSurface() {
    const report = {
      brokenSelectors: [],
      unresponsiveHandlers: [],
      stalePulseElements: 0,
      danglingHrefs: [],
      totalScanned: 0
    };

    if (!this.isBrowser) {
      return report;
    }

    // 1. Audit Navigation Tabs & Target Decks
    const navTabs = document.querySelectorAll('.nav-tab-btn[data-deck]');
    navTabs.forEach((tab) => {
      report.totalScanned++;
      const deckId = tab.getAttribute('data-deck');
      if (deckId && deckId !== 'core' && deckId !== 'telemetry') {
        const deckEl = document.getElementById(`deck-${deckId}`);
        if (!deckEl) {
          report.brokenSelectors.push(`Missing deck view: #deck-${deckId}`);
        }
      }
    });

    // 2. Audit Orbiting 3D Nodes
    const orbitNodes = document.querySelectorAll('.orbiting-dashboard-circle[data-deck]');
    orbitNodes.forEach((node) => {
      report.totalScanned++;
      const deckId = node.getAttribute('data-deck');
      if (!deckId) {
        report.brokenSelectors.push('Orbit node missing data-deck attribute');
      }
      // Check for lingering / stuck hover pulse classes
      if (node.classList.contains('sidebar-hover-pulse')) {
        report.stalePulseElements++;
      }
    });

    // 3. Audit Action Buttons & Modals
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach((btn) => {
      report.totalScanned++;
      const action = btn.getAttribute('data-action');
      if (!action) {
        report.unresponsiveHandlers.push('Button missing data-action specifier');
      }
    });

    // 4. Audit Links
    const anchors = document.querySelectorAll('a[href="#"]');
    anchors.forEach((a) => {
      report.totalScanned++;
      if (!a.getAttribute('onclick') && !a.getAttribute('role')) {
        report.danglingHrefs.push(a.textContent?.trim() || 'Empty anchor');
      }
    });

    return report;
  }

  /**
   * Subsystem 3: Self-Healing & Auto-Remediation
   */
  performSelfHealing(domResults, endpointResults) {
    const applied = [];

    // Remediation A: Clear stale CSS pulse/hover states if detected
    if (domResults.stalePulseElements > 0 && this.visualizer) {
      if (typeof this.visualizer.clearAllPulseSpheres === 'function') {
        this.visualizer.clearAllPulseSpheres();
        applied.push({
          type: 'RESET_STALE_PULSE',
          details: `Cleared ${domResults.stalePulseElements} lingering hover pulse states on 3D orbits.`
        });
        this.logAudit('AUTO_REPAIR_PULSE', { count: domResults.stalePulseElements }, 'REMEDIATED');
      }
    }

    // Remediation B: Stale LocalStorage Cache Keys & Session Pruning
    if (this.isBrowser) {
      try {
        const pendingSync = localStorage.getItem('hub_pending_antigravity_sync');
        if (pendingSync) {
          const parsed = JSON.parse(pendingSync);
          if (Array.isArray(parsed) && parsed.length > 50) {
            localStorage.setItem('hub_pending_antigravity_sync', JSON.stringify(parsed.slice(-20)));
            applied.push({
              type: 'PRUNE_PENDING_TASKS',
              details: 'Pruned stale offline task queue to 20 items.'
            });
            this.logAudit('PRUNE_STORAGE', { prunedCount: parsed.length - 20 }, 'REMEDIATED');
          }
        }
      } catch (e) {}
    }

    // Remediation C: Auto-remedy tunnel drop by issuing reconnect telemetry ping
    if (endpointResults) {
      Object.entries(endpointResults).forEach(([projectId, report]) => {
        if (report.status === 'DOWN') {
          // Attempt automatic reconnect trigger
          if (this.dashboardMgr && typeof this.dashboardMgr.checkAllTelemetry === 'function') {
            this.dashboardMgr.checkAllTelemetry();
            applied.push({
              type: 'RECONNECT_PROBE',
              details: `Issued immediate reconnect telemetry ping for ${FLEET_PROJECTS[projectId]?.name || projectId}.`
            });
            this.logAudit('RECONNECT_PROBE', { projectId }, 'REMEDIATED');
          }
        }
      });
    }

    return { applied };
  }

  /**
   * Subsystem 4: Issue Nomination & High-Priority Alerts
   */
  nominateCriticalFlaws(endpointResults, domResults) {
    const nominated = [];

    // If any satellite module has been verified DOWN or DEGRADED, nominate a maintenance ticket
    if (endpointResults) {
      Object.entries(endpointResults).forEach(([projectId, report]) => {
        if (report.status === 'DOWN') {
          const projectMeta = FLEET_PROJECTS[projectId];
          const ticket = {
            code: `SENTINEL_DOWN_${projectId.toUpperCase().replace(/-/g, '_')}`,
            severity: 'CRITICAL',
            title: `Sentinel Alert: ${projectMeta.name} Satellite Offline`,
            message: `Automated health audit detected ${projectMeta.name} is unreachable. Proposed fix: Verify local port :${projectMeta.defaultPort} or reload daemon.`,
            statute: 'Sentinel Watchdog Subsystem',
            deckId: projectMeta.deckId,
            fixProposal: `Execute: npm run dev --prefix ../${projectId} or check tunnel routes.`
          };

          nominated.push(ticket);

          // Nominate into DashboardManager's Central Alert Center
          if (this.dashboardMgr && typeof this.dashboardMgr.setAlert === 'function') {
            this.dashboardMgr.setAlert(projectMeta.deckId, 1, 'critical', ticket.title, [ticket]);
          }

          this.logAudit('NOMINATE_TICKET', ticket, 'NOMINATED');
          this.bus.publish('ALERT_NOMINATED', ticket);
        }
      });
    }

    // Nominate critical DOM flaws if broken selectors exceed threshold
    if (domResults && domResults.brokenSelectors.length > 0) {
      const ticket = {
        code: 'SENTINEL_DOM_INTEGRITY_BREACH',
        severity: 'WARNING',
        title: `DOM Surface Alert: ${domResults.brokenSelectors.length} Broken Selectors Detected`,
        message: `Headless audit discovered missing DOM views: ${domResults.brokenSelectors.join(', ')}.`,
        statute: 'Sentinel UI Integrity Guardian',
        deckId: 'core',
        fixProposal: 'Inspect index.html template and restore missing deck view wrappers.'
      };

      nominated.push(ticket);
      if (this.dashboardMgr && typeof this.dashboardMgr.setAlert === 'function') {
        this.dashboardMgr.setAlert('core', 1, 'warning', ticket.title, [ticket]);
      }
      this.logAudit('NOMINATE_TICKET', ticket, 'NOMINATED');
    }

    return nominated;
  }

  getAuditHistory() {
    return [...this.auditHistory];
  }

  clearAuditHistory() {
    this.auditHistory = [];
    if (this.isBrowser) {
      try {
        localStorage.removeItem(this.auditLogStorageKey);
      } catch (e) {}
    }
    return true;
  }

  /**
   * Generates a self-contained Markdown Audit Dossier for pasting into ChatGPT / Claude
   */
  generateAuditDossier() {
    const timestamp = new Date().toISOString();
    const metrics = this.bus.getAggregateMetrics();
    const fleetHealth = this.bus.getFleetHealth();

    let md = `# 🛡️ ANTIGRAVITY CENTRAL COMMAND HUB // SENTINEL AUDIT DOSSIER\n`;
    md += `> **Audit Generated At:** \`${timestamp}\`  \n`;
    md += `> **Auditing Subagent:** \`Sentinel-Daemon\` (Autonomous Watchdog)  \n`;
    md += `> **Overall Fleet Health Score:** \`${metrics.fleetHealthScore}%\` (${metrics.healthyCount} Healthy, ${metrics.degradedCount} Degraded, ${metrics.downCount} Down)  \n`;
    md += `> **Auto-Remediations Applied:** \`${this.remediationsCount}\`  \n`;
    md += `> **Target AI Reviewers:** Claude 3.7 / Claude 3.5 Sonnet / ChatGPT 4o  \n\n`;

    md += `---\n\n`;
    md += `## 🎯 PROMPT & INSTRUCTIONS FOR EXTERNAL AI REVIEWER (CLAUDE / CHATGPT)\n\n`;
    md += `You are an expert Systems Architect, Security Auditor, and Principal Full-Stack Engineer. Review this audit dossier for the **Antigravity Central Command Hub** multi-project fleet. Scrub and scrutinize the architecture, configurations, and state below to verify that there are no hidden flaws, vulnerabilities, or regressions:\n\n`;
    md += `1. **Endpoint & Tunnel Resilience:** Verify that the 6 fleet projects have well-defined, non-conflicting port routes and graceful offline fallback mechanisms.\n`;
    md += `2. **DOM & Self-Healing Integrity:** Validate that the autonomous watchdog mechanisms properly handle 3D orbit freezing, orphaned CSS pulse classes, and dangling listeners without main-thread locks.\n`;
    md += `3. **Memory & Cache Safety:** Verify that telemetry queues, localStorage keys, and log files are strictly bounded with zero memory leak or disk exhaustion risks.\n`;
    md += `4. **CORS & Iframe Isolation:** Confirm that header configurations allow secure responsive framing while preventing cross-origin clickjacking.\n`;
    md += `5. **Operational Truth & Cadence Integrity:** Confirm that active alerts and executive cadence data contain no hallucinated dates, ungrounded deadlines, or orphan entities.\n\n`;
    md += `Provide an assessment summarizing:\n`;
    md += `- **Verdict:** (APPROVED / ACTION_REQUIRED)\n`;
    md += `- **Strengths & Best Practices Observed**\n`;
    md += `- **Identified Anomalies or Potential Edge Cases**\n`;
    md += `- **Recommended Hardening Proposals**\n\n`;

    md += `---\n\n`;
    md += `## 🛰️ SATELLITE FLEET STATUS GRID\n\n`;
    md += `| Subsystem ID | Project Name | Status | Port | Latency | DOM Integrity |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    Object.entries(FLEET_PROJECTS).forEach(([id, meta]) => {
      const h = fleetHealth[id] || { status: 'HEALTHY', endpoints: {}, domIntegrity: {} };
      const lat = h.endpoints?.latencyMs ? `${h.endpoints.latencyMs}ms` : 'Local/Cloud';
      const dom = (h.domIntegrity?.brokenSelectors?.length || 0) === 0 ? '✓ Nominal' : '⚠️ Flagged';
      md += `| \`${id}\` | **${meta.name}** | \`${h.status}\` | \`:${h.endpoints?.port || meta.defaultPort}\` | ${lat} | ${dom} |\n`;
    });
    md += `\n`;

    md += `---\n\n`;
    md += `## 📜 RECENT AUTO-REMEDIATION LEDGER & AUDIT TRAIL\n\n`;
    if (this.auditHistory.length === 0) {
      md += `*No recent remediation events logged. All systems operating nominal.*\n\n`;
    } else {
      md += `| Timestamp | Action | Level | Details |\n`;
      md += `| :--- | :--- | :--- | :--- |\n`;
      this.auditHistory.slice(0, 15).forEach(item => {
        const timeStr = new Date(item.timestamp).toISOString();
        const detailStr = item.details?.resultMessage || item.details?.reason || item.details?.details || JSON.stringify(item.details || {});
        md += `| \`${timeStr}\` | \`${item.action}\` | \`${item.level}\` | ${detailStr} |\n`;
      });
      md += `\n`;
    }

    md += `---\n`;
    md += `*End of Sentinel Audit Dossier. Ready for Claude / ChatGPT inspection.*  \n`;

    return md;
  }
}

export const sentinelEngine = new SentinelMaintenanceEngine();
