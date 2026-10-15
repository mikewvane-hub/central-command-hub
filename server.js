import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS and permissive headers for iframes and cross-device usage
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Allow framing from authorized domains or self
  res.removeHeader('X-Frame-Options');
  next();
});

// Serve static assets
app.use(express.static(__dirname));

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`🌌 ANTIGRAVITY CENTRAL COMMAND HUB ONLINE`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`📡 Network: http://0.0.0.0:${PORT}`);
  console.log(`🚀 Quantum Atomic Interface Initialized`);
  console.log(`================================================================`);
});
