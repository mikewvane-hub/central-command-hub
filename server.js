import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Enable CORS, permissive headers for iframes, and disable caching for instant updates
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  // Allow framing from authorized domains or self
  res.removeHeader('X-Frame-Options');
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
      name: 'Antigravity Rental Ops & JBLM Terminal',
      url: 'http://127.0.0.1:8000/',
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
      url: `http://127.0.0.1:${PORT}/dashboards/garage/index.html`,
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
      const active = (data.alerts || []).filter(a => !a.dismissed);
      return res.json({ alerts: active, count: active.length });
    }
    res.status(404).json({ alerts: [], count: 0 });
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
      let dismissed = false;
      (data.alerts || []).forEach(a => {
        if (a.code === code || a.id === code) {
          a.dismissed = true;
          dismissed = true;
        }
      });
      if (dismissed) {
        fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
      }
      return res.json({ success: dismissed });
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`🌌 ANTIGRAVITY CENTRAL COMMAND HUB ONLINE`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`📡 Network: http://0.0.0.0:${PORT}`);
  console.log(`🚀 Quantum Atomic Interface Initialized`);
  console.log(`================================================================`);
});
