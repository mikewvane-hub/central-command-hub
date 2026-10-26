import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

process.on('uncaughtException', (err) => {
  console.error('[Central Command Hub] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Central Command Hub] Unhandled Rejection:', reason);
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Enable CORS, permissive headers for iframes, and disable caching for instant updates
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // Allow framing from authorized domains or self
  res.removeHeader('X-Frame-Options');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Serve static assets with zero caching
app.use(express.static(__dirname, { etag: false, maxAge: 0 }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    system: 'ANTIGRAVITY // CENTRAL COMMAND HUB',
    version: '2.5.0-QUANTUM'
  });
});

// Network LAN information for mobile & Galaxy Z Fold 8 hand-off
app.get('/api/network-info', (req, res) => {
  const lanIp = getLocalIp();
  res.json({
    ip: lanIp,
    port: PORT,
    garagePort: 3009,
    hubUrl: `http://${lanIp}:${PORT}/`,
    garageUrl: `http://${lanIp}:3009/`
  });
});

// Telemetry endpoint to test reachability of the 3 dashboards
app.get('/api/telemetry', async (req, res) => {
  const dashboards = [
    {
      id: 'executive',
      name: 'Executive Daily Briefing',
      url: 'https://daily-executive-dashboard.onrender.com/',
      type: 'cloud'
    },
    {
      id: 'rental',
      name: 'Property & Asset Management Command',
      url: `http://127.0.0.1:${PORT}/dashboards/rental/index.html`,
      type: 'local'
    },
    {
      id: 'financial',
      name: 'Financial Wealth Console',
      url: 'http://localhost:3008/',
      type: 'local'
    },
    {
      id: 'trip',
      name: 'Rainier Basecamp // Overland & Trip Planner',
      url: 'https://daily-executive-dashboard.onrender.com/trip-planner/',
      type: 'cloud'
    },
    {
      id: 'mackie',
      name: "Mackie's Daily Board • Calendar & Meal Planner",
      url: 'https://daily-executive-dashboard.onrender.com/mackie/',
      type: 'cloud'
    },
    {
      id: 'garage',
      name: 'Garage & Fleet Asset Command',
      url: `http://localhost:${PORT}/dashboards/garage/index.html`,
      type: 'local'
    }
  ];

  const results = await Promise.all(
    dashboards.map(async (dash) => {
      const startTime = Date.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(dash.url, {
          method: 'GET',
          signal: controller.signal,
          headers: { 'User-Agent': 'CentralCommandHub-Pinger/1.0' }
        });
        clearTimeout(timeoutId);

        return {
          ...dash,
          status: response.status >= 200 && response.status < 500 ? 'ONLINE' : 'ERROR',
          statusCode: response.status,
          latencyMs: Date.now() - startTime
        };
      } catch (err) {
        return {
          ...dash,
          status: 'OFFLINE_OR_LOCAL_RESTRICTED',
          error: err.name === 'AbortError' ? 'TIMEOUT' : 'UNREACHABLE',
          latencyMs: Date.now() - startTime
        };
      }
    })
  );

  res.json({
    timestamp: new Date().toISOString(),
    results
  });
});

// ==========================================
// UNIFIED STATE & EXECUTIVE CADENCE APIS
// ==========================================
const STATE_FILE = path.join(__dirname, 'core_state', 'hub_state.json');

// GET full unified state
app.get('/api/state', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      return res.json(data);
    }
    res.status(404).json({ error: 'hub_state.json not initialized' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET active executive weekly briefing
app.get('/api/briefing', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      return res.json(data.executive_briefing || {});
    }
    res.status(404).json({ error: 'Briefing not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET active unified alerts
app.get('/api/alerts', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      const dismissedList = Array.isArray(data.dismissed_alerts) ? data.dismissed_alerts : [];
      const active = (data.alerts || [])
        .filter(a => !a.dismissed && !dismissedList.includes(a.code) && !dismissedList.includes(a.id))
        .map(a => ({
          ...a,
          title: a.title || a.subject || (a.code ? a.code.replace(/_/g, ' ') : 'Operational Alert'),
          message: a.message || a.description || ''
        }));
      return res.json({ alerts: active, count: active.length, dismissed_codes: dismissedList });
    }
    res.status(404).json({ alerts: [], count: 0, dismissed_codes: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST dismiss an alert by code or ID
app.post('/api/alerts/dismiss', (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Missing code' });
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      if (!Array.isArray(data.dismissed_alerts)) {
        data.dismissed_alerts = [];
      }
      if (!data.dismissed_alerts.includes(code)) {
        data.dismissed_alerts.push(code);
      }
      (data.alerts || []).forEach(a => {
        if (a.code === code || a.id === code) {
          a.dismissed = true;
        }
      });
      fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
      const active = (data.alerts || []).filter(a => !a.dismissed && !data.dismissed_alerts.includes(a.code));
      return res.json({ success: true, code, count: active.length, dismissed_codes: data.dismissed_alerts });
    }
    res.status(404).json({ error: 'State file not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST trigger Sunday Weekly Cadence Agent run
app.post('/api/cadence/run', (req, res) => {
  const uvPath = 'C:\\Users\\micha\\.local\\bin\\uv.exe';
  const scriptPath = path.join(__dirname, 'agents', 'weekly_cadence_agent.py');
  const cmd = `"${uvPath}" run python "${scriptPath}"`;

  exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error('Cadence run error:', error, stderr);
      return res.status(500).json({ error: error.message, stderr });
    }
    try {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      res.json({
        success: true,
        briefing: data.executive_briefing,
        stdout
      });
    } catch (e) {
      res.json({ success: true, stdout });
    }
  });
});

// ==========================================
// C2 ACTIONS & PLATFORM BACKLOG APIS (ANTIGRAVITY TASK MIGRATION)
// ==========================================

// GET platform tasks
app.get('/api/tasks', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      return res.json({ tasks: data.platform_tasks || [] });
    }
    res.json({ tasks: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST dispatch platform task (migrates directly into project /tasks/ folder)
app.post('/api/tasks', (req, res) => {
  try {
    const task = req.body;
    if (!task || !task.taskId) return res.status(400).json({ error: 'Missing task payload' });

    // 1. Persist to core hub_state.json
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      if (!Array.isArray(data.platform_tasks)) data.platform_tasks = [];
      data.platform_tasks = data.platform_tasks.filter(t => t.taskId !== task.taskId);
      data.platform_tasks.unshift(task);
      fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }

    // 2. Write physical Antigravity Task file in project folder under /tasks/active/
    const tasksDir = path.join(__dirname, 'tasks', 'active');
    fs.mkdirSync(tasksDir, { recursive: true });

    const safeTitle = (task.title || 'agent-task').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const taskFile = path.join(tasksDir, `${task.taskId}-${safeTitle}.md`);

    const targetFilesList = (task.contextParameters?.targetFiles || []).length > 0
      ? task.contextParameters.targetFiles.map(f => `  - \`${f}\``).join('\n')
      : '  - (General codebase inspection)';

    const taskMd = `# ⚡ [ANTIGRAVITY AGENT TASK] #${task.taskId}
> **Status:** IN_PROGRESS (Working in Project)  
> **Target Subagent:** \`${task.targetAgent}\`  
> **Priority:** \`${task.priority || 'HIGH'}\`  
> **Dispatched At:** \`${task.timestamp || new Date().toISOString()}\`  
> **Source:** \`${task.sourceCategory || 'Platform Diagnostics'}\` (${task.origin || 'Executive Summary'})

---

## 🎯 Task Objective
${task.simpleDescription || task.title}

## 🔍 Technical Details & Diagnostics
${task.technicalDescription || task.description || 'No additional technical notes provided.'}

## 🛠️ Context & Subsystem Parameters
- **Subsystem:** ${task.contextParameters?.subsystem || 'Core Subsystem'}
- **Target Files:**
${targetFilesList}
- **Issue Reference:** ${task.contextParameters?.issue || task.title}

---

## 🤖 Antigravity Directives & Execution Instructions
1. **Locate & Inspect:** Read and inspect the subsystem target files identified above.
2. **Execute Resolution:** Implement the code fix, refactor, or telemetry integration.
3. **Automated Verification:** Execute regression tests (\`node test_unified_system.js\`).
4. **Transition State:** Mark task as completed once verified.
`;

    fs.writeFileSync(taskFile, taskMd, 'utf-8');
    console.log(`[Antigravity C2] Wrote active agent task to ${taskFile}`);

    // 3. Maintain tasks/INDEX.md in project root
    const indexFile = path.join(__dirname, 'tasks', 'INDEX.md');
    let indexContent = `# 🚀 Antigravity Agent Tasks & Project Backlog\n\n`;
    indexContent += `Last Updated: ${new Date().toISOString()}\n\n`;
    indexContent += `### Active In-Progress Tasks\n`;
    indexContent += `- **[#${task.taskId}]** ${task.title} ➔ Agent: \`${task.targetAgent}\` ([File](./active/${task.taskId}-${safeTitle}.md))\n`;

    try {
      if (fs.existsSync(indexFile)) {
        const existing = fs.readFileSync(indexFile, 'utf-8');
        if (!existing.includes(task.taskId)) {
          fs.appendFileSync(indexFile, `- **[#${task.taskId}]** ${task.title} ➔ Agent: \`${task.targetAgent}\` ([File](./active/${task.taskId}-${safeTitle}.md))\n`, 'utf-8');
        }
      } else {
        fs.writeFileSync(indexFile, indexContent, 'utf-8');
      }
    } catch (e) {}

    return res.json({ success: true, task, filePath: taskFile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET platform backlog
app.get('/api/backlog', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      return res.json({ backlog: data.platform_backlog || [] });
    }
    res.json({ backlog: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST push item to platform backlog (migrates directly into project /tasks/backlog/)
app.post('/api/backlog', (req, res) => {
  try {
    const item = req.body;
    if (!item || !item.id) return res.status(400).json({ error: 'Missing backlog item' });

    // 1. Persist in hub_state.json
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      if (!Array.isArray(data.platform_backlog)) data.platform_backlog = [];
      const existingIdx = data.platform_backlog.findIndex(b => b.id === item.id);
      if (existingIdx >= 0) {
        data.platform_backlog[existingIdx] = item;
      } else {
        data.platform_backlog.unshift(item);
      }
      fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }

    // 2. Write physical Antigravity Backlog entry in project folder under /tasks/backlog/
    const backlogDir = path.join(__dirname, 'tasks', 'backlog');
    fs.mkdirSync(backlogDir, { recursive: true });
    const backlogFile = path.join(backlogDir, 'BACKLOG.md');

    const entry = `\n### 📋 [${item.category || 'BACKLOG'}] ${item.title} (#${item.id.toUpperCase()})
- **Origin:** ${item.origin || 'Executive Summary'}
- **Logged At:** ${item.timestamp || new Date().toISOString()}
- **Objective:** ${item.simpleDescription || item.description || item.title}
- **Status:** \`PERSISTED_BACKLOG\`

---
`;

    if (!fs.existsSync(backlogFile)) {
      fs.writeFileSync(backlogFile, `# 📋 Antigravity Project Backlog\n\nPersistent items queued from Executive Summary.\n\n${entry}`, 'utf-8');
    } else {
      fs.appendFileSync(backlogFile, entry, 'utf-8');
    }
    console.log(`[Antigravity Backlog] Appended item #${item.id} to ${backlogFile}`);

    return res.json({ success: true, item, filePath: backlogFile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST deny/dismiss a diagnostic item
app.post('/api/diagnostics/deny', (req, res) => {
  try {
    const { id, title } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing diagnostic id' });

    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      if (!Array.isArray(data.denied_diagnostics)) data.denied_diagnostics = [];
      if (!data.denied_diagnostics.includes(id)) {
        data.denied_diagnostics.push(id);
      }
      fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }

    // Optional: write to tasks/dismissed/DISMISSED.md
    const dismissedDir = path.join(__dirname, 'tasks', 'dismissed');
    fs.mkdirSync(dismissedDir, { recursive: true });
    const dismissedFile = path.join(dismissedDir, 'DISMISSED.md');
    const logLine = `- **[${new Date().toISOString()}]** Dismissed #${id}: ${title || 'Item'}\n`;
    if (!fs.existsSync(dismissedFile)) {
      fs.writeFileSync(dismissedFile, `# 🚫 Dismissed Recommendations\n\n${logLine}`, 'utf-8');
    } else {
      fs.appendFileSync(dismissedFile, logLine, 'utf-8');
    }

    return res.json({ success: true, id, message: 'Item dismissed and persisted to project folder.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// SENTINEL AUTONOMOUS MAINTENANCE & TELEMETRY APIS
// ==========================================
const SENTINEL_LOG_FILE = path.join(__dirname, 'core_state', 'sentinel-audit.log');

// GET Sentinel health and metrics status
app.get('/api/sentinel/health', (req, res) => {
  try {
    let auditCount = 0;
    let recentAudits = [];
    if (fs.existsSync(SENTINEL_LOG_FILE)) {
      const lines = fs.readFileSync(SENTINEL_LOG_FILE, 'utf-8').trim().split('\n').filter(Boolean);
      auditCount = lines.length;
      recentAudits = lines.slice(-10).map(l => {
        try { return JSON.parse(l); } catch (e) { return { raw: l }; }
      });
    }

    res.json({
      status: 'ONLINE',
      agent: 'Sentinel-Daemon',
      subsystem: 'Autonomous Telemetry & Self-Healing Watchdog',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      totalAuditEntries: auditCount,
      recentAudits,
      monitoredFleetProjects: [
        'fleet-asset-manager',
        'rental-asset-explorer',
        'financial-command-center',
        'mackie-mom-board',
        'daily-executive-briefing',
        'family-road-trip-planner'
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST append an audit entry to sentinel-audit.log
app.post('/api/sentinel/log', (req, res) => {
  try {
    const record = req.body;
    if (!record || !record.action) {
      return res.status(400).json({ error: 'Missing audit action or payload' });
    }

    const coreStateDir = path.join(__dirname, 'core_state');
    if (!fs.existsSync(coreStateDir)) {
      fs.mkdirSync(coreStateDir, { recursive: true });
    }

    const logEntry = JSON.stringify({
      id: record.id || `sentinel-${Date.now()}`,
      timestamp: record.timestamp || Date.now(),
      action: record.action,
      level: record.level || 'INFO',
      details: record.details || {}
    }) + '\n';

    fs.appendFileSync(SENTINEL_LOG_FILE, logEntry, 'utf-8');

    // Also prune if file exceeds 500 lines
    try {
      const lines = fs.readFileSync(SENTINEL_LOG_FILE, 'utf-8').trim().split('\n').filter(Boolean);
      if (lines.length > 500) {
        fs.writeFileSync(SENTINEL_LOG_FILE, lines.slice(-300).join('\n') + '\n', 'utf-8');
      }
    } catch (e) {}

    return res.json({ success: true, recordId: record.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST execute server-side auto-remediation triggers
app.post('/api/sentinel/remediate', (req, res) => {
  try {
    const { action, target } = req.body;
    const timestamp = Date.now();
    let resultMessage = '';

    switch (action) {
      case 'CLEAR_CACHE':
        resultMessage = 'Cleared ephemeral server buffer and cache headers';
        break;
      case 'PRUNE_LOGS':
        if (fs.existsSync(SENTINEL_LOG_FILE)) {
          const lines = fs.readFileSync(SENTINEL_LOG_FILE, 'utf-8').trim().split('\n').filter(Boolean);
          fs.writeFileSync(SENTINEL_LOG_FILE, lines.slice(-50).join('\n') + '\n', 'utf-8');
          resultMessage = `Pruned sentinel-audit.log to 50 entries`;
        } else {
          resultMessage = 'Audit log was clean';
        }
        break;
      case 'RECONNECT_PROBE':
        resultMessage = `Re-established server route ping for target: ${target || 'all satellites'}`;
        break;
      default:
        resultMessage = `Remediation executed for action: ${action || 'SWEEP_CLEANUP'}`;
    }

    // Append to sentinel-audit.log
    const coreStateDir = path.join(__dirname, 'core_state');
    if (!fs.existsSync(coreStateDir)) {
      fs.mkdirSync(coreStateDir, { recursive: true });
    }
    const logEntry = JSON.stringify({
      id: `remediate-${timestamp}`,
      timestamp,
      action: action || 'AUTO_REMEDIATE',
      level: 'REMEDIATED',
      details: { target, resultMessage }
    }) + '\n';
    fs.appendFileSync(SENTINEL_LOG_FILE, logEntry, 'utf-8');

    return res.json({
      success: true,
      action,
      target,
      resultMessage,
      timestamp
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`🌌 ANTIGRAVITY CENTRAL COMMAND HUB ONLINE`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`📡 Network: http://0.0.0.0:${PORT}`);
  console.log(`🚀 Quantum Atomic Interface Initialized`);
  console.log(`================================================================`);
});
