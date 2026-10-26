/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Telemetry Bus & Inter-Agent Communication Broker
 * Provides a lightweight, bi-directional message broker via BroadcastChannel API
 * with localStorage fallback and WebSocket/HTTP bridge for fleet-wide telemetry.
 */

export const FLEET_PROJECTS = {
  'fleet-asset-manager': {
    id: 'fleet-asset-manager',
    deckId: 'garage',
    name: 'Garage & Fleet Asset Command',
    category: 'Vehicle Telemetry & Powertrain',
    type: 'local',
    defaultPort: 3009,
    url: './dashboards/garage/index.html?v=40.0',
    devUrl: 'http://localhost:3009/'
  },
  'rental-asset-explorer': {
    id: 'rental-asset-explorer',
    deckId: 'rental',
    name: 'Washington Real Estate & Rental Ops',
    category: 'Property Management & Acquisition',
    type: 'local',
    defaultPort: 4000,
    url: './dashboards/rental/index.html',
    devUrl: 'http://localhost:5173/'
  },
  'financial-command-center': {
    id: 'financial-command-center',
    deckId: 'financial',
    name: 'Financial Wealth Console',
    category: 'Wealth & Asset Allocation',
    type: 'local',
    defaultPort: 3008,
    url: './dashboards/financial/index.html',
    devUrl: 'http://localhost:3008/'
  },
  'mackie-mom-board': {
    id: 'mackie-mom-board',
    deckId: 'mackie',
    name: "Mackie's Daily Board",
    category: 'Family Routines & Meal Planner',
    type: 'cloud',
    defaultPort: 443,
    url: 'https://daily-executive-dashboard.onrender.com/mackie/'
  },
  'daily-executive-briefing': {
    id: 'daily-executive-briefing',
    deckId: 'executive',
    name: 'Executive Daily Briefing',
    category: 'Chief of Staff Command',
    type: 'cloud',
    defaultPort: 443,
    url: 'https://daily-executive-dashboard.onrender.com/'
  },
  'family-road-trip-planner': {
    id: 'family-road-trip-planner',
    deckId: 'trip',
    name: 'Rainier Basecamp & Road Trip Planner',
    category: 'Overland Expedition Logistics',
    type: 'cloud',
    defaultPort: 443,
    url: 'https://daily-executive-dashboard.onrender.com/trip-planner/'
  }
};

export const DECK_TO_PROJECT_MAP = {
  garage: 'fleet-asset-manager',
  rental: 'rental-asset-explorer',
  financial: 'financial-command-center',
  mackie: 'mackie-mom-board',
  executive: 'daily-executive-briefing',
  trip: 'family-road-trip-planner'
};

export class TelemetryBus {
  constructor(options = {}) {
    this.channelName = options.channelName || 'antigravity_telemetry_bus';
    this.storageKey = 'antigravity_sentinel_fleet_state';
    this.listeners = new Map(); // topic/projectId -> Set of callbacks
    this.fleetState = new Map(); // projectId -> TelemetryEvent
    this.isBrowser = typeof window !== 'undefined';
    this.channel = null;

    this.initTransport();
    this.loadPersistedState();
  }

  initTransport() {
    if (!this.isBrowser) return;

    // 1. Primary: BroadcastChannel API
    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => {
          if (event && event.data) {
            this.handleIncomingMessage(event.data, false);
          }
        };
      } catch (err) {
        console.warn('[TelemetryBus] BroadcastChannel error, falling back to storage:', err);
      }
    }

    // 2. Secondary: localStorage storage event fallback for cross-window sync
    window.addEventListener('storage', (event) => {
      if (event.key === this.storageKey && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (parsed && typeof parsed === 'object') {
            Object.entries(parsed).forEach(([pId, eventData]) => {
              this.fleetState.set(pId, eventData);
              this.notifySubscribers(pId, eventData);
              this.notifySubscribers('*', eventData);
            });
          }
        } catch (e) {}
      }
    });
  }

  loadPersistedState() {
    if (!this.isBrowser) {
      // In Node.js environment, seed default nominal state for all 6 projects
      Object.keys(FLEET_PROJECTS).forEach((pId) => {
        this.fleetState.set(pId, this.createInitialProjectRecord(pId));
      });
      return;
    }

    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.entries(parsed).forEach(([pId, data]) => {
          this.fleetState.set(pId, data);
        });
      }
    } catch (e) {}

    // Ensure all 6 fleet projects exist in registry
    Object.keys(FLEET_PROJECTS).forEach((pId) => {
      if (!this.fleetState.has(pId)) {
        this.fleetState.set(pId, this.createInitialProjectRecord(pId));
      }
    });
  }

  createInitialProjectRecord(projectId) {
    const pMeta = FLEET_PROJECTS[projectId] || { defaultPort: 4000 };
    return {
      projectId,
      timestamp: Date.now(),
      status: 'HEALTHY',
      endpoints: {
        port: pMeta.defaultPort,
        tunnelActive: true,
        lastHeartbeat: Date.now(),
        latencyMs: 12
      },
      domIntegrity: {
        brokenSelectors: [],
        unresponsiveHandlers: []
      },
      activeIssues: []
    };
  }

  persistState() {
    if (!this.isBrowser) return;
    try {
      const stateObj = {};
      this.fleetState.forEach((val, key) => {
        stateObj[key] = val;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(stateObj));
    } catch (e) {}
  }

  /**
   * Enforces and validates the standardized telemetry JSON schema
   */
  validateSchema(data, options = {}) {
    if (!data || typeof data !== 'object') {
      throw new Error('Telemetry event must be an object');
    }
    if (!data.projectId || typeof data.projectId !== 'string') {
      throw new Error('Telemetry event must include a valid string projectId');
    }

    const validStatuses = ['HEALTHY', 'DEGRADED', 'DOWN'];
    if (options.strict && (!data.status || !validStatuses.includes(data.status))) {
      throw new Error(`Invalid or missing 'status'. Must be one of: ${validStatuses.join(', ')}`);
    }
    const status = validStatuses.includes(data.status) ? data.status : (data.status ? null : 'HEALTHY');
    if (!status && data.status) {
      throw new Error(`Invalid or missing 'status'. Must be one of: ${validStatuses.join(', ')}`);
    }

    return {
      projectId: data.projectId,
      timestamp: typeof data.timestamp === 'number' ? data.timestamp : Date.now(),
      status: status || 'HEALTHY',
      endpoints: {
        port: data.endpoints?.port || FLEET_PROJECTS[data.projectId]?.defaultPort || 4000,
        tunnelActive: typeof data.endpoints?.tunnelActive === 'boolean' ? data.endpoints.tunnelActive : true,
        lastHeartbeat: typeof data.endpoints?.lastHeartbeat === 'number' ? data.endpoints.lastHeartbeat : Date.now(),
        latencyMs: typeof data.endpoints?.latencyMs === 'number' ? data.endpoints.latencyMs : null,
        url: data.endpoints?.url || FLEET_PROJECTS[data.projectId]?.url || ''
      },
      domIntegrity: {
        brokenSelectors: Array.isArray(data.domIntegrity?.brokenSelectors) ? data.domIntegrity.brokenSelectors : [],
        unresponsiveHandlers: Array.isArray(data.domIntegrity?.unresponsiveHandlers) ? data.domIntegrity.unresponsiveHandlers : []
      },
      activeIssues: Array.isArray(data.activeIssues) ? data.activeIssues : []
    };
  }

  validateEventSchema(data, options = { strict: true }) {
    return this.validateSchema(data, options);
  }

  /**
   * Publish a generic telemetry or control event over the broker
   */
  publish(topic, payload = {}) {
    const envelope = {
      topic,
      payload,
      sender: 'CentralCommandHub-Sentinel',
      timestamp: Date.now()
    };

    this.handleIncomingMessage(envelope, true);

    if (this.channel) {
      try {
        this.channel.postMessage(envelope);
      } catch (e) {
        console.warn('[TelemetryBus] Failed to postMessage over channel:', e);
      }
    }

    return envelope;
  }

  /**
   * Report or update health state for an individual satellite project
   */
  emitHealth(projectId, healthUpdate = {}) {
    const existing = this.fleetState.get(projectId) || this.createInitialProjectRecord(projectId);
    
    const merged = {
      ...existing,
      ...healthUpdate,
      projectId,
      timestamp: Date.now(),
      endpoints: {
        ...existing.endpoints,
        ...healthUpdate.endpoints,
        lastHeartbeat: Date.now()
      },
      domIntegrity: {
        ...existing.domIntegrity,
        ...healthUpdate.domIntegrity
      },
      activeIssues: healthUpdate.activeIssues || existing.activeIssues || []
    };

    const validated = this.validateSchema(merged);
    this.fleetState.set(projectId, validated);
    this.persistState();

    this.publish('HEALTH_REPORT', validated);
    this.notifySubscribers(projectId, validated);
    this.notifySubscribers('*', validated);

    return validated;
  }

  handleIncomingMessage(envelope, localOrigin = false) {
    if (!envelope || typeof envelope !== 'object') return;
    const { topic, payload } = envelope;

    if (topic === 'HEALTH_REPORT' && payload?.projectId) {
      try {
        const validated = this.validateSchema(payload);
        this.fleetState.set(validated.projectId, validated);
        this.persistState();
        this.notifySubscribers(validated.projectId, validated);
        this.notifySubscribers('*', validated);
      } catch (err) {
        console.warn('[TelemetryBus] Dropped invalid schema payload:', err.message);
      }
    } else {
      this.notifySubscribers(topic, payload);
      this.notifySubscribers('*', envelope);
    }
  }

  subscribe(topicOrProjectId, callback) {
    if (typeof callback !== 'function') return () => {};

    if (!this.listeners.has(topicOrProjectId)) {
      this.listeners.set(topicOrProjectId, new Set());
    }
    this.listeners.get(topicOrProjectId).add(callback);

    // Return unsubscription function
    return () => {
      const subs = this.listeners.get(topicOrProjectId);
      if (subs) {
        subs.delete(callback);
        if (subs.size === 0) this.listeners.delete(topicOrProjectId);
      }
    };
  }

  notifySubscribers(topic, data) {
    const subs = this.listeners.get(topic);
    if (subs) {
      subs.forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(`[TelemetryBus] Listener error for topic "${topic}":`, e);
        }
      });
    }
  }

  getFleetHealth() {
    const healthMap = {};
    this.fleetState.forEach((val, key) => {
      healthMap[key] = { ...val };
    });
    return healthMap;
  }

  getProjectHealth(projectId) {
    return this.fleetState.get(projectId) || null;
  }

  getAggregateMetrics() {
    let healthyCount = 0;
    let degradedCount = 0;
    let downCount = 0;
    let staleCount = 0;
    let totalIssues = 0;

    const totalProjects = Object.keys(FLEET_PROJECTS).length;
    const now = Date.now();
    const STALE_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes

    Object.keys(FLEET_PROJECTS).forEach((pId) => {
      const report = this.fleetState.get(pId);
      if (!report) {
        downCount++;
        return;
      }

      // Check for stale telemetry (heartbeat older than 30m)
      const isStale = report.timestamp && (now - report.timestamp > STALE_THRESHOLD_MS);
      if (isStale) {
        staleCount++;
        degradedCount++;
      } else if (report.status === 'HEALTHY') {
        healthyCount++;
      } else if (report.status === 'DEGRADED') {
        degradedCount++;
      } else {
        downCount++;
      }

      if (Array.isArray(report.activeIssues)) {
        totalIssues += report.activeIssues.length;
      }
      if (Array.isArray(report.domIntegrity?.brokenSelectors)) {
        totalIssues += report.domIntegrity.brokenSelectors.length;
      }
      if (Array.isArray(report.domIntegrity?.unresponsiveHandlers)) {
        totalIssues += report.domIntegrity.unresponsiveHandlers.length;
      }
    });

    const score = Math.round(((healthyCount * 1.0 + degradedCount * 0.5) / (totalProjects || 1)) * 100);

    return {
      fleetHealthScore: score,
      totalProjects,
      healthyCount,
      degradedCount,
      downCount,
      staleCount,
      totalIssues,
      status: score >= 90 ? 'HEALTHY' : (score >= 60 ? 'DEGRADED' : 'DOWN'),
      calculationFormula: 'Math.round(((healthy * 1.0 + degraded * 0.5) / totalProjects) * 100)',
      timestamp: Date.now()
    };
  }

  broadcastHeartbeat() {
    return this.publish('HEARTBEAT', {
      timestamp: Date.now(),
      metrics: this.getAggregateMetrics()
    });
  }

  destroy() {
    if (this.channel) {
      try {
        this.channel.close();
      } catch (e) {}
      this.channel = null;
    }
    this.listeners.clear();
  }
}

// Default global instance for seamless consumption across Central Hub modules
export const telemetryBus = new TelemetryBus();
