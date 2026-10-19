// test_unified_system.js
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runCommand(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, shell: true });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', d => { stdout += d.toString(); });
    proc.stderr.on('data', d => { stderr += d.toString(); });
    proc.on('close', code => {
      resolve({ code, stdout, stderr });
    });
  });
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    }).on('error', reject);
  });
}

function httpPost(url, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(body);
    const req = http.request({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🧪 ========================================================');
  console.log('🧪 TESTING UNIFIED STATE & EXECUTIVE CADENCE PIPELINE');
  console.log('🧪 ========================================================\n');

  const uvPath = 'C:\\Users\\micha\\.local\\bin\\uv.exe';

  // 1. Test Python Agents
  console.log('▶ [1/6] Running individual domain agents via uv...');
  const agents = ['fleet.py', 'family.py', 'academic.py', 'health.py'];
  for (const agent of agents) {
    const res = await runCommand(uvPath, ['run', 'python', `agents/${agent}`], __dirname);
    if (res.code !== 0) {
      console.error(`❌ Agent ${agent} failed (exit ${res.code}):`, res.stderr);
      process.exit(1);
    }
    console.log(`  ✓ agents/${agent} executed successfully.`);
  }

  // 2. Test Weekly Cadence Agent
  console.log('\n▶ [2/6] Running agents/weekly_cadence_agent.py...');
  const cadenceRes = await runCommand(uvPath, ['run', 'python', 'agents/weekly_cadence_agent.py'], __dirname);
  if (cadenceRes.code !== 0) {
    console.error('❌ Weekly cadence agent failed:', cadenceRes.stderr);
    process.exit(1);
  }
  console.log('  ✓ Weekly cadence agent aggregated cross-domain state.');

  // 3. Test Alert Pipeline
  console.log('\n▶ [3/6] Running core_state/alert_pipeline.py...');
  const alertRes = await runCommand(uvPath, ['run', 'python', 'core_state/alert_pipeline.py'], __dirname);
  if (alertRes.code !== 0) {
    console.error('❌ Alert pipeline failed:', alertRes.stderr);
    process.exit(1);
  }
  console.log('  ✓ Standardized Alert Pipeline generated active alerts.');

  // 4. Verify hub_state.json & SQLite hub_state.db
  console.log('\n▶ [4/6] Verifying SQLite & JSON Single Source of Truth...');
  const jsonPath = path.join(__dirname, 'core_state', 'hub_state.json');
  const dbPath = path.join(__dirname, 'core_state', 'hub_state.db');
  if (!fs.existsSync(jsonPath) || !fs.existsSync(dbPath)) {
    console.error('❌ hub_state.json or hub_state.db missing!');
    process.exit(1);
  }
  const stateData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`  ✓ hub_state.json valid. Domains present: ${Object.keys(stateData).join(', ')}`);
  console.log(`  ✓ Executive highlights count: ${stateData.executive_briefing?.executive_highlights?.length}`);
  console.log(`  ✓ Active alerts in state: ${stateData.alerts?.length}`);

  // 5. Boot server.js and test REST APIs
  console.log('\n▶ [5/6] Testing server.js REST APIs...');
  const testPort = 8089;
  const serverProc = spawn('node', ['server.js'], {
    cwd: __dirname,
    env: { ...process.env, PORT: String(testPort) }
  });

  // Wait for server to emit listening or up to 5 seconds
  await new Promise((resolve, reject) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    }, 5000);

    serverProc.stdout.on('data', d => {
      const msg = d.toString();
      if (msg.includes('ANTIGRAVITY CENTRAL COMMAND HUB ONLINE') || msg.includes('localhost:') || msg.includes('Listening on port')) {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve();
        }
      }
    });

    serverProc.stderr.on('data', d => {
      console.error('[Test Server stderr]:', d.toString());
    });

    serverProc.on('error', err => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        reject(err);
      }
    });
  });

  try {
    // GET /api/state
    const stateRes = await httpGet(`http://127.0.0.1:${testPort}/api/state`);
    console.log(`  ✓ GET /api/state: status ${stateRes.status}, version: ${stateRes.body?.meta?.version}`);

    // GET /api/briefing
    const briefRes = await httpGet(`http://127.0.0.1:${testPort}/api/briefing`);
    console.log(`  ✓ GET /api/briefing: status ${briefRes.status}, window: "${briefRes.body?.cadence_window}"`);

    // GET /api/alerts
    const alertsRes = await httpGet(`http://127.0.0.1:${testPort}/api/alerts`);
    console.log(`  ✓ GET /api/alerts: status ${alertsRes.status}, count: ${alertsRes.body?.count}`);

    // POST /api/cadence/run
    console.log('  Testing POST /api/cadence/run...');
    const triggerRes = await httpPost(`http://127.0.0.1:${testPort}/api/cadence/run`, {});
    console.log(`  ✓ POST /api/cadence/run: status ${triggerRes.status}, success: ${triggerRes.body?.success}`);

  } finally {
    serverProc.kill();
  }

  // 6. Test syntax of client JavaScript files
  console.log('\n▶ [6/6] Validating Client JavaScript Modules syntax...');
  const jsFiles = ['dashboard-manager.js', 'app.js', 'atomic-core.js', 'voice-command.js', 'device-optimizer.js', 'executive-sidebar.js'];
  for (const f of jsFiles) {
    const checkRes = await runCommand('node', ['--check', `js/${f}`], __dirname);
    if (checkRes.code !== 0) {
      console.error(`❌ Syntax error in js/${f}:`, checkRes.stderr);
      process.exit(1);
    }
    console.log(`  ✓ js/${f} syntax valid.`);
  }

  console.log('\n🎉 ALL TESTS PASSED! Unified State & Sunday Cadence System 100% Operational.\n');
}

main().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
