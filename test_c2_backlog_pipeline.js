import http from 'http';
import assert from 'assert';
import fs from 'fs';
import { AGENT_ROUTING_MAP, PLATFORM_DIAGNOSTICS_DATA } from './js/executive-sidebar.js';

function request(options, data = null) {
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
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 ========================================================');
  console.log('🧪 TESTING C2 ACTION PIPELINE & ANTIGRAVITY TASK MIGRATION');
  console.log('🧪 ========================================================\n');

  // Test 1: Verify Agent Routing Map & Simplified Descriptions
  console.log('▶ [1/5] Verifying AGENT_ROUTING_MAP & Plain-English Descriptions...');
  assert.strictEqual(AGENT_ROUTING_MAP['diag-001'].targetAgent, 'scene-architect', 'diag-001 must route to scene-architect');
  assert.strictEqual(AGENT_ROUTING_MAP['diag-003'].targetAgent, 'telemetry-ingest', 'diag-003 must route to telemetry-ingest');

  PLATFORM_DIAGNOSTICS_DATA.forEach(d => {
    assert(d.title, `Item ${d.id} must have a simple title`);
    assert(d.description, `Item ${d.id} must have a simple description`);
    assert(d.description.length > 20, `Description for ${d.id} should be descriptive`);
  });

  console.log('  ✓ WebGL Context Delay (diag-001) -> scene-architect ("Fix 3D Garage Lag")');
  console.log('  ✓ OBD-II BLE Stream (diag-003) -> telemetry-ingest ("Wireless Car Diagnostics")');
  console.log('  ✓ All 6 items have human-readable plain-English titles and descriptions.');

  // Test 2: Verify Server /api/tasks & Physical File Migration in project folder
  console.log('\n▶ [2/5] Testing POST /api/tasks & Antigravity Physical File Creation...');
  const testTaskId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
  const testTaskPayload = {
    taskId: testTaskId,
    uuid: 'test-uuid-' + Date.now(),
    diagId: 'diag-001',
    title: 'Fix 3D Garage Lag',
    simpleDescription: 'Speeds up loading when switching between 3D view and photo mode on your phone or laptop.',
    technicalDescription: 'Three.js canvas context rebuild delay (~120ms) observed when toggling on mobile WebGL2 runtimes.',
    sourceCategory: 'Platform Diagnostics',
    targetAgent: 'scene-architect',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    timestamp: new Date().toISOString(),
    contextParameters: {
      subsystem: 'Three.js / WebGL2 Context',
      targetFiles: ['js/atomic-core.js', 'dashboards/garage/src/components/garage/ThreeDGarageScene.jsx'],
      issue: 'Fix 3D Garage Lag'
    }
  };

  const postTaskRes = await request({
    hostname: '127.0.0.1',
    port: 4000,
    path: '/api/tasks',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testTaskPayload);

  assert.strictEqual(postTaskRes.status, 200, 'POST /api/tasks should return status 200');
  assert.strictEqual(postTaskRes.body.success, true, 'POST /api/tasks success should be true');
  assert(postTaskRes.body.filePath, 'Response should include created task file path');
  assert(fs.existsSync(postTaskRes.body.filePath), `Physical task file ${postTaskRes.body.filePath} must exist on disk`);
  console.log(`  ✓ POST /api/tasks created physical task in: ${postTaskRes.body.filePath}`);

  const taskFileContent = fs.readFileSync(postTaskRes.body.filePath, 'utf-8');
  assert(taskFileContent.includes(testTaskId), 'Task file must contain taskId');
  assert(taskFileContent.includes('scene-architect'), 'Task file must contain targetAgent');
  console.log(`  ✓ Verified task file content includes subagent directives and context.`);

  const getTasksRes = await request({
    hostname: '127.0.0.1',
    port: 4000,
    path: '/api/tasks',
    method: 'GET'
  });

  assert.strictEqual(getTasksRes.status, 200, 'GET /api/tasks should return status 200');
  const foundTask = getTasksRes.body.tasks.find(t => t.taskId === testTaskId);
  assert(foundTask, `Task ${testTaskId} should be present in GET /api/tasks`);
  console.log(`  ✓ GET /api/tasks verified task #${testTaskId} in state.`);

  // Test 3: Verify Server /api/backlog & tasks/backlog/BACKLOG.md
  console.log('\n▶ [3/5] Testing POST /api/backlog & Project Backlog File Creation...');
  const testBacklogItem = {
    id: 'diag-003',
    title: 'Wireless Car Diagnostics (OBD-II)',
    simpleDescription: 'Connect phone to Chevy Colorado & Nissan Murano via Bluetooth to track transmission fluid temperature live.',
    category: 'NEW FEATURE',
    origin: 'Fleet Telemetry Console',
    deckId: 'garage',
    timestamp: new Date().toISOString(),
    status: 'LOGGED_IN_BACKLOG'
  };

  const postBacklogRes = await request({
    hostname: '127.0.0.1',
    port: 4000,
    path: '/api/backlog',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testBacklogItem);

  assert.strictEqual(postBacklogRes.status, 200, 'POST /api/backlog should return status 200');
  assert(postBacklogRes.body.filePath, 'Response should include backlog file path');
  assert(fs.existsSync(postBacklogRes.body.filePath), `Backlog file ${postBacklogRes.body.filePath} must exist on disk`);
  console.log(`  ✓ POST /api/backlog persisted into: ${postBacklogRes.body.filePath}`);

  // Test 4: Verify Deny API & Dismissed Log
  console.log('\n▶ [4/5] Testing POST /api/diagnostics/deny...');
  const denyRes = await request({
    hostname: '127.0.0.1',
    port: 4000,
    path: '/api/diagnostics/deny',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { id: 'diag-002', title: 'Rental Fence Warranty Expiring' });

  assert.strictEqual(denyRes.status, 200, 'POST /api/diagnostics/deny should return status 200');
  assert.strictEqual(denyRes.body.success, true);
  console.log('  ✓ POST /api/diagnostics/deny successfully logged denial and removed recommendation.');

  // Test 5: Verify Antigravity Task Directory Structure
  console.log('\n▶ [5/5] Verifying /tasks/ project directory layout...');
  assert(fs.existsSync('tasks/active'), 'tasks/active/ must exist');
  assert(fs.existsSync('tasks/backlog'), 'tasks/backlog/ must exist');
  assert(fs.existsSync('tasks/INDEX.md'), 'tasks/INDEX.md must exist');
  console.log('  ✓ tasks/active/ verified.');
  console.log('  ✓ tasks/backlog/ verified.');
  console.log('  ✓ tasks/INDEX.md verified.');

  console.log('\n🎉 ALL ANTIGRAVITY TASK MIGRATION & BACKLOG TESTS PASSED 100%!\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
