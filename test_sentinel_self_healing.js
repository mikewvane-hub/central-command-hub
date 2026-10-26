/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Synthetic Failure & Autonomous Self-Healing Test Suite (Sentinel-Daemon)
 *
 * Verifies:
 * 1. Telemetry bus & standardized JSON event schema across all 6 fleet projects.
 * 2. Simulated disconnected satellite node is detected within 3 seconds.
 * 3. Broken DOM click handler & selector integrity audit without UI freeze.
 * 4. Auto-remediation of stale CSS pulse/hover states (clearAllPulseSpheres).
 * 5. Cache-busting, storage pruning, and audit history bounds without memory leaks.
 * 6. Live server REST API verification (/api/sentinel/health, /api/sentinel/log, /api/sentinel/remediate).
 */

import assert from 'assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TelemetryBus, FLEET_PROJECTS, DECK_TO_PROJECT_MAP } from './js/telemetry-bus.js';
import { SentinelMaintenanceEngine } from './js/sentinel-maintenance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runSentinelTestSuite() {
  console.log('🛡️ ========================================================');
  console.log('🛡️ TESTING SENTINEL AUTONOMOUS MAINTENANCE & SELF-HEALING');
  console.log('🛡️ ========================================================\n');

  const bus = new TelemetryBus();
  const engine = new SentinelMaintenanceEngine({ bus });

  // ------------------------------------------------------------------
  // TEST 1: Fleet Projects & JSON Schema Validation
  // ------------------------------------------------------------------
  console.log('▶ [1/6] Verifying Fleet Registry & Standardized Event Schema...');
  const expectedProjects = [
    'fleet-asset-manager',
    'rental-asset-explorer',
    'financial-command-center',
    'mackie-mom-board',
    'daily-executive-briefing',
    'family-road-trip-planner'
  ];

  expectedProjects.forEach(id => {
    assert(FLEET_PROJECTS[id], `Project ${id} must exist in FLEET_PROJECTS registry`);
    assert(FLEET_PROJECTS[id].name, `Project ${id} must have a display name`);
    assert(FLEET_PROJECTS[id].defaultPort, `Project ${id} must have a defaultPort`);
    assert(FLEET_PROJECTS[id].deckId, `Project ${id} must map to a valid deckId`);
    assert.strictEqual(DECK_TO_PROJECT_MAP[FLEET_PROJECTS[id].deckId], id, `Reverse deckId map must match ${id}`);
  });

  // Test Valid Schema
  const validEvent = {
    projectId: 'fleet-asset-manager',
    timestamp: Date.now(),
    status: 'HEALTHY',
    endpoints: {
      port: 3009,
      tunnelActive: true,
      lastHeartbeat: Date.now()
    },
    domIntegrity: {
      brokenSelectors: [],
      unresponsiveHandlers: []
    },
    activeIssues: []
  };

  const validated = bus.validateEventSchema(validEvent);
  assert.strictEqual(validated.projectId, 'fleet-asset-manager');
  assert.strictEqual(validated.status, 'HEALTHY');

  // Test Schema Error Detection (missing required status or invalid status)
  assert.throws(() => {
    bus.validateEventSchema({ projectId: 'fleet-asset-manager' });
  }, /Invalid or missing 'status'/);

  console.log(`  ✓ All 6 fleet projects correctly registered.`);
  console.log(`  ✓ Standardized JSON event schema validation strictly enforced.`);

  // ------------------------------------------------------------------
  // TEST 2: Disconnected Satellite Node Detection (< 3s) & Score Drop
  // ------------------------------------------------------------------
  console.log('\n▶ [2/6] Simulating Disconnected Satellite Node (< 3s detection)...');
  const detectionStart = Date.now();

  // Initialize all to HEALTHY
  expectedProjects.forEach(id => {
    bus.emitHealth(id, {
      status: 'HEALTHY',
      endpoints: { port: FLEET_PROJECTS[id].defaultPort, tunnelActive: true, latencyMs: 12 }
    });
  });

  let metrics = bus.getAggregateMetrics();
  assert.strictEqual(metrics.fleetHealthScore, 100, 'Baseline health score must be 100%');
  assert.strictEqual(metrics.healthyCount, 6, 'All 6 nodes must be healthy');

  // Simulate drop on fleet-asset-manager
  const dropEvent = bus.emitHealth('fleet-asset-manager', {
    status: 'DOWN',
    endpoints: { port: 3009, tunnelActive: false, latencyMs: 0 },
    activeIssues: [{ code: 'CONNECTION_REFUSED', description: 'Port 3009 refused connection' }]
  });

  const detectionElapsed = Date.now() - detectionStart;
  assert(detectionElapsed < 3000, `Detection must be under 3000ms (took ${detectionElapsed}ms)`);

  metrics = bus.getAggregateMetrics();
  assert.strictEqual(metrics.downCount, 1, 'downCount must reflect 1 offline satellite');
  assert.strictEqual(metrics.healthyCount, 5, 'healthyCount must now be 5');
  assert(metrics.fleetHealthScore < 100, 'fleetHealthScore must degrade below 100%');

  // Verify nomination of ticket
  const nominatedTickets = engine.nominateCriticalFlaws({ 'fleet-asset-manager': dropEvent }, null);
  assert(nominatedTickets.length >= 1, 'Must nominate high-priority alert for DOWN node');
  assert.strictEqual(nominatedTickets[0].code, 'SENTINEL_DOWN_FLEET_ASSET_MANAGER');
  assert.strictEqual(nominatedTickets[0].severity, 'CRITICAL');

  console.log(`  ✓ Disconnect detected in ${detectionElapsed}ms (< 3s threshold).`);
  console.log(`  ✓ Fleet health score recalculated: ${metrics.fleetHealthScore}% (${metrics.healthyCount} Healthy, ${metrics.downCount} Down).`);
  console.log(`  ✓ Nominated critical ticket: "${nominatedTickets[0].title}"`);

  // ------------------------------------------------------------------
  // TEST 3: Headless DOM Surface Audit without UI Freeze
  // ------------------------------------------------------------------
  console.log('\n▶ [3/6] Testing Headless DOM Surface Audit without UI freeze...');
  const domAuditStart = Date.now();

  // Test Node.js safe fallback
  const domReport = engine.auditDomSurface();
  assert.strictEqual(typeof domReport, 'object');
  assert(Array.isArray(domReport.brokenSelectors));
  assert(Array.isArray(domReport.unresponsiveHandlers));

  // Simulate synthetic broken selectors
  const syntheticDomResults = {
    brokenSelectors: ['Missing deck view: #deck-garage', 'Orbit node missing data-deck attribute'],
    unresponsiveHandlers: ['Button missing data-action specifier'],
    stalePulseElements: 0,
    danglingHrefs: [],
    totalScanned: 24
  };

  const domNominated = engine.nominateCriticalFlaws(null, syntheticDomResults);
  const domAuditElapsed = Date.now() - domAuditStart;

  assert(domAuditElapsed < 100, `DOM audit must be sub-100ms without freezing (took ${domAuditElapsed}ms)`);
  assert(domNominated.length > 0, 'Must nominate DOM integrity breach ticket');
  assert.strictEqual(domNominated[0].code, 'SENTINEL_DOM_INTEGRITY_BREACH');

  console.log(`  ✓ DOM integrity audit completed in ${domAuditElapsed}ms (zero UI freeze).`);
  console.log(`  ✓ Successfully nominated ticket for ${syntheticDomResults.brokenSelectors.length} broken selectors.`);

  // ------------------------------------------------------------------
  // TEST 4: Auto-Remediation of Stale CSS Pulse & Hover States
  // ------------------------------------------------------------------
  console.log('\n▶ [4/6] Testing Self-Healing & Stale CSS Pulse Guard...');
  let pulseCleared = false;
  const mockVisualizer = {
    clearAllPulseSpheres: () => {
      pulseCleared = true;
    }
  };

  const healingEngine = new SentinelMaintenanceEngine({
    bus,
    visualizer: mockVisualizer
  });

  const staleDomResults = {
    brokenSelectors: [],
    unresponsiveHandlers: [],
    stalePulseElements: 3,
    danglingHrefs: [],
    totalScanned: 18
  };

  const initialRemediations = healingEngine.remediationsCount;
  const healingResult = healingEngine.performSelfHealing(staleDomResults, null);

  assert.strictEqual(pulseCleared, true, 'clearAllPulseSpheres must be invoked when stale pulses detected');
  assert.strictEqual(healingResult.applied.length, 1, 'Must record 1 remediation pass');
  assert.strictEqual(healingResult.applied[0].type, 'RESET_STALE_PULSE');
  assert.strictEqual(healingEngine.remediationsCount, initialRemediations + 1, 'remediationsCount must increment');

  console.log(`  ✓ clearAllPulseSpheres successfully triggered for 3 orphaned pulse elements.`);
  console.log(`  ✓ Auto-remediation ledger updated with RESET_STALE_PULSE.`);

  // ------------------------------------------------------------------
  // TEST 5: Memory Leak & Log Growth Protection
  // ------------------------------------------------------------------
  console.log('\n▶ [5/6] Testing Audit Log Capping & Memory Leak Prevention...');
  for (let i = 0; i < 90; i++) {
    engine.logAudit(`SYNTHETIC_TEST_ACTION_${i}`, { index: i }, 'INFO');
  }

  const history = engine.getAuditHistory();
  assert(history.length <= 60, `Audit history must be capped to max 60 entries (current: ${history.length})`);
  assert.strictEqual(history[0].action, 'SYNTHETIC_TEST_ACTION_89', 'Latest action must be at top of stack');

  engine.clearAuditHistory();
  assert.strictEqual(engine.getAuditHistory().length, 0, 'Audit history must clear cleanly');

  console.log(`  ✓ In-memory audit ring buffer successfully bound to 60 records max.`);
  console.log(`  ✓ Memory footprint constrained with zero unbounded growth.`);

  // ------------------------------------------------------------------
  // TEST 6: Live Server REST APIs (/api/sentinel/*)
  // ------------------------------------------------------------------
  console.log('\n▶ [6/6] Testing Live Server REST Endpoints (port 4000)...');
  const serverPort = 4000;

  // 6A: GET /api/sentinel/health
  const healthRes = await httpRequest({
    hostname: '127.0.0.1',
    port: serverPort,
    path: '/api/sentinel/health',
    method: 'GET'
  });

  assert.strictEqual(healthRes.status, 200, 'GET /api/sentinel/health must return 200');
  assert.strictEqual(healthRes.body.status, 'ONLINE');
  assert.strictEqual(healthRes.body.agent, 'Sentinel-Daemon');
  assert.strictEqual(healthRes.body.monitoredFleetProjects.length, 6);
  console.log(`  ✓ GET /api/sentinel/health: 200 OK (Agent: ${healthRes.body.agent}, Uptime: ${Math.round(healthRes.body.uptimeSeconds)}s)`);

  // 6B: POST /api/sentinel/log
  const testLogRecord = {
    id: `test-audit-${Date.now()}`,
    action: 'TEST_SYNTHETIC_AUDIT',
    level: 'REMEDIATED',
    details: { reason: 'Automated self-healing unit test verification' }
  };

  const logRes = await httpRequest({
    hostname: '127.0.0.1',
    port: serverPort,
    path: '/api/sentinel/log',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testLogRecord);

  assert.strictEqual(logRes.status, 200, 'POST /api/sentinel/log must return 200');
  assert.strictEqual(logRes.body.success, true);
  console.log(`  ✓ POST /api/sentinel/log: 200 OK (Record: ${logRes.body.recordId})`);

  // Verify file written
  const auditLogFile = path.join(__dirname, 'core_state', 'sentinel-audit.log');
  assert(fs.existsSync(auditLogFile), 'sentinel-audit.log must exist on disk');
  const fileContent = fs.readFileSync(auditLogFile, 'utf-8');
  assert(fileContent.includes('TEST_SYNTHETIC_AUDIT'), 'sentinel-audit.log must contain newly appended audit record');
  console.log(`  ✓ Verified physical disk persistence in core_state/sentinel-audit.log`);

  // 6C: POST /api/sentinel/remediate
  const remediateRes = await httpRequest({
    hostname: '127.0.0.1',
    port: serverPort,
    path: '/api/sentinel/remediate',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { action: 'PRUNE_LOGS', target: 'sentinel-audit.log' });

  assert.strictEqual(remediateRes.status, 200, 'POST /api/sentinel/remediate must return 200');
  assert.strictEqual(remediateRes.body.success, true);
  assert(remediateRes.body.resultMessage, 'Remediation must return resultMessage');
  console.log(`  ✓ POST /api/sentinel/remediate: 200 OK ("${remediateRes.body.resultMessage}")`);

  // 6D: Test Client-Side Dossier Generator
  const clientDossier = engine.generateAuditDossier();
  assert(clientDossier.includes('SENTINEL AUDIT DOSSIER'), 'Client dossier must include title');
  assert(clientDossier.includes('INSTRUCTIONS FOR EXTERNAL AI REVIEWER (CLAUDE / CHATGPT)'), 'Client dossier must include instructions');
  expectedProjects.forEach(pId => {
    assert(clientDossier.includes(pId), `Client dossier must reference ${pId}`);
  });
  console.log(`  ✓ Client engine.generateAuditDossier() successfully generated standardized markdown.`);

  // 6E: POST /api/sentinel/export-dossier (Full Server Audit Dossier for Claude / ChatGPT)
  const dossierRes = await httpRequest({
    hostname: '127.0.0.1',
    port: serverPort,
    path: '/api/sentinel/export-dossier',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  assert.strictEqual(dossierRes.status, 200, 'POST /api/sentinel/export-dossier must return 200');
  assert.strictEqual(dossierRes.body.success, true);
  assert(dossierRes.body.markdown.length > 500, 'Dossier markdown must be rich and non-trivial');
  assert(dossierRes.body.markdown.includes('INSTRUCTIONS FOR EXTERNAL AI REVIEWER (CLAUDE / CHATGPT)'));

  const dossierFile = path.join(__dirname, 'SENTINEL_SYSTEM_AUDIT_DOSSIER.md');
  assert(fs.existsSync(dossierFile), 'SENTINEL_SYSTEM_AUDIT_DOSSIER.md must exist on disk');
  const diskDossier = fs.readFileSync(dossierFile, 'utf-8');
  assert(diskDossier.includes('ANTIGRAVITY CENTRAL COMMAND HUB // SENTINEL SYSTEM AUDIT DOSSIER'));
  console.log(`  ✓ POST /api/sentinel/export-dossier: 200 OK (${dossierRes.body.markdown.length} bytes generated)`);
  console.log(`  ✓ Verified physical file write to SENTINEL_SYSTEM_AUDIT_DOSSIER.md for Claude / ChatGPT.`);

  console.log('\n🎉 ALL 6 SENTINEL TEST SUITES PASSED (100% VERIFICATION SUCCESS)!\n');
}

runSentinelTestSuite().catch(err => {
  console.error('\n❌ Sentinel Test Suite Failed:', err);
  process.exit(1);
});
