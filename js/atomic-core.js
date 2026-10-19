/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * 3D Quantum Atomic Visualizer Engine
 * Interactive Three.js Bohr-Quantum Orbital Core with raycasting and
 * 3D-projected floating circular dashboard pods that display the actual dashboards in orbit!
 */

import { sfx } from './sound-effects.js';

const SPHERE_VISUAL_SVGS = {
  executive: `
    <div class="circle-graphic-container circle-graphic-executive">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-exec" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.55"/>
            <stop offset="65%" stop-color="#082f49" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-exec)"/>
        <!-- Radar Grid & Orbits -->
        <circle cx="74" cy="72" r="50" fill="none" stroke="#00f0ff" stroke-width="0.75" stroke-dasharray="3,3" opacity="0.45"/>
        <circle cx="74" cy="72" r="35" fill="none" stroke="#00f0ff" stroke-width="0.5" opacity="0.35"/>
        <line x1="74" y1="22" x2="74" y2="122" stroke="#00f0ff" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.4"/>
        <line x1="24" y1="72" x2="124" y2="72" stroke="#00f0ff" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.4"/>
        <ellipse cx="74" cy="72" rx="44" ry="17" fill="none" stroke="#38bdf8" stroke-width="0.85" opacity="0.6" transform="rotate(-15 74 72)"/>
        <ellipse cx="74" cy="72" rx="17" ry="44" fill="none" stroke="#38bdf8" stroke-width="0.85" opacity="0.6" transform="rotate(-15 74 72)"/>
        <!-- Executive Commander Star -->
        <g filter="url(#glow-cyan)" transform="translate(74,72)">
          <polygon points="0,-22 6.5,-7 22,-7 10,5 14.5,21 0,11 -14.5,21 -10,5 -22,-7 -6.5,-7" fill="#00f0ff" opacity="0.95"/>
          <polygon points="0,-15 4.5,-4.5 15,-4.5 6.5,4.5 10,15 0,7.5 -10,15 -6.5,4.5 -15,-4.5 -4.5,-4.5" fill="#ffffff" opacity="0.95"/>
          <circle cx="0" cy="0" r="4.5" fill="#020617"/>
        </g>
      </svg>
    </div>
  `,
  rental: `
    <div class="circle-graphic-container circle-graphic-rental">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-rent" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0369a1" stop-opacity="0.55"/>
            <stop offset="65%" stop-color="#082f49" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-sky" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-rent)"/>
        <!-- Blueprint Grid -->
        <line x1="24" y1="46" x2="124" y2="46" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.35"/>
        <line x1="24" y1="72" x2="124" y2="72" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.35"/>
        <line x1="24" y1="98" x2="124" y2="98" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.35"/>
        <line x1="48" y1="24" x2="48" y2="120" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.35"/>
        <line x1="74" y1="24" x2="74" y2="120" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.35"/>
        <line x1="100" y1="24" x2="100" y2="120" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,3" opacity="0.35"/>
        <!-- Architectural Residence Facade -->
        <g filter="url(#glow-sky)" transform="translate(74,72)">
          <polygon points="0,-26 30,-5 30,20 -30,20 -30,-5" fill="rgba(14, 165, 233, 0.28)" stroke="#38bdf8" stroke-width="2"/>
          <polyline points="-22,-5 0,-22 22,-5" fill="none" stroke="#7dd3fc" stroke-width="2.2"/>
          <rect x="-22" y="-1" width="12" height="11" rx="1.5" fill="#38bdf8" opacity="0.9"/>
          <rect x="10" y="-1" width="12" height="11" rx="1.5" fill="#38bdf8" opacity="0.9"/>
          <path d="M-6,20 L-6,8 Q-6,4 0,4 Q6,4 6,8 L6,20 Z" fill="#0284c7"/>
          <circle cx="0" cy="11" r="1.8" fill="#e0f2fe"/>
        </g>
      </svg>
    </div>
  `,
  financial: `
    <div class="circle-graphic-container circle-graphic-financial">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-fin" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#581c87" stop-opacity="0.55"/>
            <stop offset="65%" stop-color="#2e1065" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-fin)"/>
        <!-- Candlestick chart columns -->
        <g opacity="0.55" stroke="#c084fc">
          <line x1="34" y1="52" x2="34" y2="90" stroke-width="0.8"/>
          <rect x="31" y="58" width="6" height="22" rx="1" fill="#8b5cf6"/>
          <line x1="49" y1="46" x2="49" y2="86" stroke-width="0.8"/>
          <rect x="46" y="50" width="6" height="24" rx="1" fill="#10b981"/>
          <line x1="64" y1="38" x2="64" y2="80" stroke-width="0.8"/>
          <rect x="61" y="42" width="6" height="26" rx="1" fill="#8b5cf6"/>
          <line x1="79" y1="32" x2="79" y2="76" stroke-width="0.8"/>
          <rect x="76" y="36" width="6" height="30" rx="1" fill="#10b981"/>
          <line x1="94" y1="26" x2="94" y2="72" stroke-width="0.8"/>
          <rect x="91" y="28" width="6" height="32" rx="1" fill="#10b981"/>
          <line x1="109" y1="20" x2="109" y2="66" stroke-width="0.8"/>
          <rect x="106" y="22" width="6" height="32" rx="1" fill="#c084fc"/>
        </g>
        <path d="M24,92 Q48,86 68,66 T110,34 T126,18" fill="none" stroke="#10b981" stroke-width="2.6" filter="url(#glow-purple)"/>
        <g filter="url(#glow-purple)" transform="translate(74,70)">
          <polygon points="0,-18 18,0 0,18 -18,0" fill="rgba(139, 92, 246, 0.5)" stroke="#c084fc" stroke-width="2.2"/>
          <text x="0" y="6" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800">$</text>
        </g>
      </svg>
    </div>
  `,
  trip: `
    <div class="circle-graphic-container circle-graphic-trip">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-trip" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#065f46" stop-opacity="0.55"/>
            <stop offset="65%" stop-color="#064e3b" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-trip)"/>
        <ellipse cx="74" cy="72" rx="55" ry="45" fill="none" stroke="#059669" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4"/>
        <ellipse cx="74" cy="72" rx="40" ry="32" fill="none" stroke="#059669" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>
        <!-- Mount Rainier Silhouette -->
        <g filter="url(#glow-emerald)" transform="translate(74,72)">
          <polygon points="0,-30 38,20 -38,20" fill="rgba(16, 185, 129, 0.28)" stroke="#10b981" stroke-width="2.2"/>
          <polygon points="0,-30 15,-11 7.5,-9 0,-16 -7.5,-9 -15,-11" fill="#ecfdf5" opacity="0.95"/>
          <polyline points="0,-16 5.5,6 10,20" stroke="#34d399" stroke-width="1.4" fill="none"/>
          <polyline points="-5.5,-11 -10,4 -20,20" stroke="#34d399" stroke-width="1.4" fill="none"/>
          <polygon points="-28,20 -23,9 -18,20" fill="#047857"/>
          <polygon points="-18,20 -14,11 -10,20" fill="#059669"/>
          <polygon points="14,20 18,11 22,20" fill="#059669"/>
          <polygon points="20,20 24,9 28,20" fill="#047857"/>
        </g>
        <circle cx="74" cy="40" r="3.2" fill="#6ee7b7" filter="url(#glow-emerald)"/>
      </svg>
    </div>
  `,
  mackie: `
    <div class="circle-graphic-container circle-graphic-mackie">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-mackie" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#9f1239" stop-opacity="0.55"/>
            <stop offset="65%" stop-color="#881337" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-mackie)"/>
        <circle cx="74" cy="72" r="50" fill="none" stroke="#fb7185" stroke-width="0.6" stroke-dasharray="3,3" opacity="0.45"/>
        <g filter="url(#glow-rose)" transform="translate(74,72)">
          <rect x="-28" y="-22" width="56" height="40" rx="5" fill="rgba(244, 63, 94, 0.28)" stroke="#f43f5e" stroke-width="2"/>
          <rect x="-28" y="-22" width="56" height="11" rx="4" fill="#be123c"/>
          <rect x="-18" y="-26" width="3.5" height="7" rx="1.5" fill="#fecdd3"/>
          <rect x="0" y="-26" width="3.5" height="7" rx="1.5" fill="#fecdd3"/>
          <rect x="18" y="-26" width="3.5" height="7" rx="1.5" fill="#fecdd3"/>
          <path d="M0,8 C-6,2 -12,-2 -12,-8 C-12,-12 -7,-15 -1,-15 C2,-15 5,-13 6,-10 C7,-13 10,-15 13,-15 C19,-15 24,-12 24,-8 C24,-2 18,2 12,8 L6,14 Z" transform="scale(0.65) translate(-6,-2)" fill="#f43f5e" opacity="0.95"/>
          <path d="M-14,5 L-10,9 L-3,1" stroke="#34d399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M8,5 L12,9 L19,1" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </g>
      </svg>
    </div>
  `,
  garage: `
    <div class="circle-graphic-container circle-graphic-garage">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-garage" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#b45309" stop-opacity="0.6"/>
            <stop offset="65%" stop-color="#78350f" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-copper" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-garage)"/>
        <!-- Off-Road Gear & Wheel Orbits -->
        <circle cx="74" cy="72" r="50" fill="none" stroke="#f59e0b" stroke-width="0.75" stroke-dasharray="3,3" opacity="0.45"/>
        <circle cx="74" cy="72" r="34" fill="none" stroke="#d97706" stroke-width="0.5" opacity="0.4"/>
        <line x1="74" y1="22" x2="74" y2="122" stroke="#f59e0b" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.35"/>
        <line x1="24" y1="72" x2="124" y2="72" stroke="#f59e0b" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.35"/>
        <!-- Rugged Tire Tread Lug Elements -->
        <g stroke="#f59e0b" stroke-width="2.5" opacity="0.5" stroke-linecap="round">
          <line x1="74" y1="20" x2="74" y2="28" />
          <line x1="74" y1="116" x2="74" y2="124" />
          <line x1="22" y1="72" x2="30" y2="72" />
          <line x1="118" y1="72" x2="126" y2="72" />
          <line x1="37" y1="35" x2="43" y2="41" />
          <line x1="105" y1="103" x2="111" y2="109" />
          <line x1="37" y1="109" x2="43" y2="103" />
          <line x1="105" y1="41" x2="111" y2="35" />
        </g>
        <!-- Titanium/Copper Rim & Wrench Icon -->
        <g filter="url(#glow-copper)" transform="translate(74,72)">
          <circle cx="0" cy="0" r="22" fill="rgba(245, 158, 11, 0.18)" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#d97706" stroke-width="1.5"/>
          <!-- Crossed wrenches / piston -->
          <path d="M-9,-9 L9,9 M-9,9 L9,-9" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="5" fill="#f59e0b"/>
          <circle cx="0" cy="0" r="2" fill="#030712"/>
        </g>
      </svg>
    </div>
  `
};

export class AtomicCoreVisualizer {
  constructor(canvasContainerId, onNodeSelect) {
    this.container = document.getElementById(canvasContainerId);
    this.onNodeSelect = onNodeSelect;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.nucleusGroup = null;
    this.orbitalGroup = null;
    this.electrons = [];
    this.particles = null;
    this.animationFrameId = null;
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.targetRotation = { x: 0.22, y: 0.32 };
    this.currentRotation = { x: 0.22, y: 0.32 };
    this.raycaster = null;
    this.hoveredDeck = null;
    this.activeDeckId = 'core';
    this.sidebarWidth = typeof window !== 'undefined' && window.innerWidth >= 1400 ? 380 : 0;
    this.currentViewOffsetX = this.sidebarWidth > 0 ? (this.sidebarWidth / 2) : 0;
    this.targetViewOffsetX = this.currentViewOffsetX;

    const resolveCloudUrl = (key, defaultRelPath) => {
      try {
        const val = localStorage.getItem(key);
        if (key === 'hub_url_garage') {
          if (val && (val.includes(':3009') || val.includes('localhost'))) {
            return val;
          }
          return 'http://localhost:3009/';
        }
        if (
          !val ||
          val.includes('127.0.0.1') ||
          val.includes('localhost') ||
          val === 'about:blank' ||
          val === ''
        ) {
          return defaultRelPath;
        }
        return val;
      } catch (e) {
        return defaultRelPath;
      }
    };

    this.dashboards = [
      {
        id: 'executive',
        name: 'EXECUTIVE BRIEFING',
        shortTitle: 'EXECUTIVE',
        orbitTag: 'ORBIT 01',
        code: 'DAILY BRIEF',
        orbitRadius: 5.2,
        horizontalStretch: 1.48,
        speed: 0.28,
        angle: 0.2,
        inclination: { x: 0.32, y: 0.35, z: 0.15 },
        color: 0x00f0ff,
        glowHex: '#00f0ff',
        url: localStorage.getItem('hub_url_executive') || 'https://daily-executive-dashboard.onrender.com/',
        icon: '🎖️'
      },
      {
        id: 'rental',
        name: 'ANTIGRAVITY RENTAL // JBLM',
        shortTitle: 'RENTAL OPS',
        orbitTag: 'ORBIT 02',
        code: 'WA RENTAL',
        orbitRadius: 6.6,
        horizontalStretch: 1.54,
        speed: 0.23,
        angle: 2.1,
        inclination: { x: -0.30, y: 0.70, z: -0.26 },
        color: 0x38bdf8,
        glowHex: '#38bdf8',
        url: resolveCloudUrl('hub_url_rental', './dashboards/rental/index.html'),
        icon: '🏡'
      },
      {
        id: 'financial',
        name: 'FINANCIAL WEALTH CONSOLE',
        shortTitle: 'WEALTH CONSOLE',
        orbitTag: 'ORBIT 03',
        code: 'WEALTH 24/7',
        orbitRadius: 8.0,
        horizontalStretch: 1.58,
        speed: 0.19,
        angle: 4.4,
        inclination: { x: 0.28, y: -0.60, z: 0.38 },
        color: 0x8b5cf6,
        glowHex: '#8b5cf6',
        url: resolveCloudUrl('hub_url_financial', './dashboards/financial/index.html'),
        icon: '📈'
      },
      {
        id: 'trip',
        name: 'RAINIER BASECAMP',
        shortTitle: 'BASECAMP',
        orbitTag: 'ORBIT 04',
        code: 'OVERLAND',
        orbitRadius: 9.4,
        horizontalStretch: 1.62,
        speed: 0.15,
        angle: 3.2,
        inclination: { x: -0.26, y: -0.36, z: 0.34 },
        color: 0x10b981,
        glowHex: '#10b981',
        url: localStorage.getItem('hub_url_trip') || 'https://daily-executive-dashboard.onrender.com/trip-planner/',
        icon: '🏕️'
      },
      {
        id: 'mackie',
        name: "MACKIE'S DAILY BOARD",
        shortTitle: "MACKIE'S BOARD",
        orbitTag: 'ORBIT 05',
        code: 'CALENDAR & MEALS',
        orbitRadius: 10.8,
        horizontalStretch: 1.66,
        speed: 0.12,
        angle: 1.4,
        inclination: { x: 0.30, y: -0.26, z: -0.32 },
        color: 0xf43f5e,
        glowHex: '#f43f5e',
        url: localStorage.getItem('hub_url_mackie') || 'https://daily-executive-dashboard.onrender.com/mackie/',
        icon: '🗓️'
      },
      {
        id: 'garage',
        name: 'GARAGE & FLEET ASSET COMMAND',
        shortTitle: 'GARAGE & FLEET',
        orbitTag: 'BAY 01-02',
        code: 'POWERTRAIN & TELEMETRY',
        orbitRadius: 12.2,
        horizontalStretch: 1.70,
        speed: 0.10,
        angle: 5.6,
        inclination: { x: -0.34, y: 0.42, z: -0.18 },
        color: 0xf59e0b,
        glowHex: '#f59e0b',
        url: resolveCloudUrl('hub_url_garage', 'http://localhost:3009/'),
        icon: '🛻'
      }
    ];

    this.init();
  }

  init() {
    if (!window.THREE) {
      console.warn('Three.js loading, waiting for library injection...');
      setTimeout(() => this.init(), 100);
      return;
    }

    if (!this.container) {
      this.container = document.getElementById('atomic-canvas-container');
    }
    if (!this.container) return;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 70);

    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.024);

    // 2. Camera Setup (Optimized for both Desktop 16:9 and Z Fold 8 ~1:1 inner screen)
    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.adjustCameraForAspect(aspect);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2.5, 35);
    this.scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 1.8, 35);
    purpleLight.position.set(0, 4, 2);
    this.scene.add(purpleLight);

    // 5. Build Atomic Nucleus
    this.buildNucleus();

    // 6. Build Orbitals and Dashboard Electrons
    this.buildOrbitals();

    // 7. Background Quantum Dust Particles
    this.buildCosmicDust();

    // 8. Build 3D-Tracked Floating Circular Dashboard Pods
    this.buildFloatingDashboardCircles();

    // 9. Event Listeners
    this.setupInteractions();

    // 10. Start Animation Loop
    this.animate();
  }

  adjustCameraForAspect(aspect) {
    if (aspect < 1.1) {
      // Square or tall aspect ratio (Z Fold 8 Inner unfolded or mobile) - Zoom out to fit all orbits
      this.camera.position.set(0, 0.8, 44.0);
    } else {
      // Laptop widescreen - Wider horizontal view taking up the horizontal room on screen
      this.camera.position.set(0, 0.4, 27.5);
    }
    this.camera.lookAt(0, 0, 0);
    this.applyViewOffset(true);
  }

  buildNucleus() {
    this.nucleusGroup = new THREE.Group();

    // Nucleus Core Cluster
    const nucleonGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const violetMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const nucleonPositions = [
      [0, 0, 0], [0.35, 0.25, 0], [-0.3, 0.3, 0.2],
      [0.2, -0.35, 0.2], [-0.3, -0.2, -0.25],
      [0.1, 0.1, -0.4], [-0.2, 0.3, -0.3], [0.35, -0.1, -0.2]
    ];

    nucleonPositions.forEach((pos, idx) => {
      const mat = idx % 3 === 0 ? cyanMat : idx % 3 === 1 ? violetMat : whiteMat;
      const nucleon = new THREE.Mesh(nucleonGeo, mat);
      nucleon.position.set(pos[0], pos[1], pos[2]);
      this.nucleusGroup.add(nucleon);
    });

    // Plasma Halo Core Glow (Inner Shell)
    const haloGeo = new THREE.SphereGeometry(1.25, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.22,
      wireframe: true
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    this.nucleusGroup.add(haloMesh);

    // Energy Shield Pulsing Shell (Outer)
    const outerHaloGeo = new THREE.IcosahedronGeometry(1.7, 2);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.14,
      wireframe: true
    });
    this.outerNucleusMesh = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    this.nucleusGroup.add(this.outerNucleusMesh);

    this.scene.add(this.nucleusGroup);
  }

  buildNodeGeometry(deckId) {
    let geo;
    if (deckId === 'garage') {
      // 🛻 3D Open-Ended Wrench
      const shape = new THREE.Shape();
      const hw = 0.09, l = 0.48;
      shape.moveTo(-hw, -l);
      shape.lineTo(hw, -l);
      shape.lineTo(hw, 0.16);
      shape.lineTo(0.30, 0.20);
      shape.lineTo(0.32, 0.42);
      shape.lineTo(0.12, 0.54);
      shape.lineTo(0.10, 0.34);
      shape.lineTo(-0.10, 0.34);
      shape.lineTo(-0.12, 0.54);
      shape.lineTo(-0.32, 0.42);
      shape.lineTo(-0.30, 0.20);
      shape.lineTo(-hw, 0.16);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02
      });
      geo.center();
      geo.scale(1.15, 1.15, 1.15);
    } else if (deckId === 'rental') {
      // 🏡 3D Architectural House with Gabled Roof
      const shape = new THREE.Shape();
      shape.moveTo(-0.36, -0.30);
      shape.lineTo(0.36, -0.30);
      shape.lineTo(0.36, 0.12);
      shape.lineTo(0, 0.46); // Gabled roof peak
      shape.lineTo(-0.36, 0.12);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.40,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.025,
        bevelThickness: 0.025
      });
      geo.center();
    } else if (deckId === 'trip') {
      // 🏕️ 3D Mount Rainier Mountain Peak
      const shape = new THREE.Shape();
      shape.moveTo(-0.50, -0.32);
      shape.lineTo(-0.20, 0.10);
      shape.lineTo(0, 0.50); // Summit
      shape.lineTo(0.22, 0.08);
      shape.lineTo(0.50, -0.32);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.30,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03
      });
      geo.center();
    } else if (deckId === 'financial') {
      // 📈 3D Faceted Wealth Gem / Diamond
      geo = new THREE.OctahedronGeometry(0.44, 0);
      geo.scale(1, 1.3, 1);
    } else if (deckId === 'executive') {
      // 🎖️ 3D Commander 5-Point Star
      const shape = new THREE.Shape();
      const points = 5;
      const outerR = 0.46;
      const innerR = 0.20;
      for (let i = 0; i < points * 2; i++) {
        const r = (i % 2 === 0) ? outerR : innerR;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.14,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02
      });
      geo.center();
    } else if (deckId === 'mackie') {
      // 🗓️ 3D Daily Board / Calendar Tablet
      const shape = new THREE.Shape();
      const w = 0.36, h = 0.42, r = 0.05;
      shape.moveTo(-w + r, -h);
      shape.lineTo(w - r, -h);
      shape.quadraticCurveTo(w, -h, w, -h + r);
      shape.lineTo(w, h - r);
      shape.quadraticCurveTo(w, h, w - r, h);
      shape.lineTo(-w + r, h);
      shape.quadraticCurveTo(-w, h, -w, h - r);
      shape.lineTo(-w, -h + r);
      shape.quadraticCurveTo(-w, -h, -w + r, -h);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02
      });
      geo.center();
    } else {
      geo = new THREE.SphereGeometry(0.36, 24, 24);
    }
    return geo;
  }

  buildOrbitals() {
    this.orbitalGroup = new THREE.Group();
    this.electrons = [];

    this.dashboards.forEach((dash) => {
      // 1. Orbital Ring Track (Smooth Ellipse / Ring stretched horizontally)
      const ringGeo = new THREE.RingGeometry(dash.orbitRadius - 0.025, dash.orbitRadius + 0.025, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dash.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.32
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      const stretchX = dash.horizontalStretch || 1.4;
      ring.scale.set(stretchX, 1.0, 1.0);

      // Container for tilting the orbit
      const orbitTiltGroup = new THREE.Group();
      orbitTiltGroup.rotation.x = dash.inclination.x;
      orbitTiltGroup.rotation.y = dash.inclination.y;
      orbitTiltGroup.rotation.z = dash.inclination.z;
      orbitTiltGroup.add(ring);

      // 2. Custom 3D Node Mesh representing each domain:
      // Garage: Wrench | Rental: House | Basecamp: Mountain | Wealth: Diamond | Exec: Star | Mackie: Calendar
      const nodeGeo = this.buildNodeGeometry(dash.id);
      const electronMat = new THREE.MeshStandardMaterial({
        color: dash.color,
        emissive: dash.color,
        emissiveIntensity: 0.95,
        roughness: 0.18,
        metalness: 0.85
      });
      const electron = new THREE.Mesh(nodeGeo, electronMat);
      electron.userData = { dashboard: dash };

      // Outer glow halo matching the node shape
      const glowGeo = nodeGeo.clone();
      glowGeo.scale(1.22, 1.22, 1.22);
      const electronGlowMat = new THREE.MeshBasicMaterial({
        color: dash.color,
        transparent: true,
        opacity: 0.35,
        wireframe: true
      });
      const electronGlow = new THREE.Mesh(glowGeo, electronGlowMat);
      electron.add(electronGlow);

      orbitTiltGroup.add(electron);
      this.orbitalGroup.add(orbitTiltGroup);

      this.electrons.push({
        mesh: electron,
        glowMesh: electronGlow,
        tiltGroup: orbitTiltGroup,
        ringMesh: ring,
        dash,
        currentAngle: dash.angle
      });
    });

    this.scene.add(this.orbitalGroup);
  }

  buildCosmicDust() {
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 32;
      positions[i + 1] = (Math.random() - 0.5) * 32;
      positions[i + 2] = (Math.random() - 0.5) * 32;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.45
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  buildFloatingDashboardCircles() {
    const overlay = document.getElementById('orbiting-nodes-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';

    this.electrons.forEach((el, idx) => {
      const dash = el.dash;
      const circleEl = document.createElement('div');
      circleEl.className = 'orbiting-dashboard-circle';
      circleEl.dataset.deck = dash.id;
      circleEl.style.setProperty('--orbit-color', dash.glowHex);

      const visualSVG = SPHERE_VISUAL_SVGS[dash.id] || `
        <div class="circle-fallback-view">
          <div class="circle-fallback-icon">${dash.icon}</div>
          <div class="circle-fallback-code">${dash.code}</div>
        </div>
      `;

      circleEl.innerHTML = `
        <div class="circle-halo-ring"></div>
        <div class="circle-inner-portal">
          <div class="circle-orbit-index">${dash.orbitTag}</div>
          <div class="circle-preview-viewport">
            ${visualSVG}
            <div class="circle-touch-shield"></div>
          </div>
          <div class="circle-hud-badge">
            <span class="status-beacon"></span>
            <span class="circle-title-text">${dash.shortTitle}</span>
          </div>
        </div>
      `;

      // Defensively purge any legacy or injected alert pills across all spheres
      const obsoletePills = circleEl.querySelectorAll('.circle-alert-pill, [class*="alert-pill"], [class*="circle-alert"], .circle-alert-badge');
      obsoletePills.forEach(p => p.remove());

      circleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        sfx.playWarp();
        if (this.onNodeSelect) {
          this.onNodeSelect(dash.id);
        }
      });

      circleEl.addEventListener('mouseenter', () => {
        sfx.playHover();
        this.hoveredDeck = dash.id;
      });

      circleEl.addEventListener('mouseleave', () => {
        if (this.hoveredDeck === dash.id) {
          this.hoveredDeck = null;
        }
      });

      circleEl.addEventListener('touchstart', () => {
        this.hoveredDeck = dash.id;
      }, { passive: true });

      circleEl.addEventListener('touchend', () => {
        setTimeout(() => {
          if (this.hoveredDeck === dash.id) {
            this.hoveredDeck = null;
          }
        }, 1200);
      }, { passive: true });

      overlay.appendChild(circleEl);
      el.domElement = circleEl;
    });
  }

  setDeckAlert(deckId, alertInfo) {
    const el = this.electrons.find(e => e.dash.id === deckId);
    if (!el) return;

    const count = (alertInfo && typeof alertInfo.count === 'number') ? alertInfo.count : 0;
    const severity = (alertInfo && alertInfo.severity) ? alertInfo.severity : 'warning';
    const title = (alertInfo && alertInfo.title) ? alertInfo.title : '';
    const acknowledged = !!(alertInfo && alertInfo.acknowledged);

    el.hasAlert = count > 0 && !acknowledged;
    el.alertCount = acknowledged ? 0 : count;
    el.alertSeverity = severity;

    if (!el.hasAlert && el.glowMesh) {
      el.glowMesh.scale.set(1.0, 1.0, 1.0);
      if (el.glowMesh.material) {
        el.glowMesh.material.opacity = 0.5;
      }
    }

    if (el.domElement) {
      // Defensively purge any existing or cached pills/badges from the orbital circle
      const obsoletePills = el.domElement.querySelectorAll('.circle-alert-pill, [class*="alert-pill"], [class*="circle-alert"]');
      obsoletePills.forEach(p => p.remove());

      if (count > 0 && !acknowledged) {
        el.domElement.classList.add('has-alert');
        el.domElement.classList.remove('alert-severity-critical', 'alert-severity-warning', 'alert-severity-info');
        el.domElement.classList.add(`alert-severity-${severity}`);
      } else {
        el.domElement.classList.remove('has-alert', 'alert-severity-critical', 'alert-severity-warning', 'alert-severity-info');
      }
    }
  }

  setupInteractions() {
    const dom = this.renderer.domElement;

    // Mouse / Touch Drag to Rotate Orbitals in 3D
    const onStart = (clientX, clientY) => {
      this.isDragging = true;
      this.prevMousePos = { x: clientX, y: clientY };
    };

    const onMove = (clientX, clientY) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (this.isDragging) {
        const deltaX = clientX - this.prevMousePos.x;
        const deltaY = clientY - this.prevMousePos.y;
        this.targetRotation.y += deltaX * 0.005;
        this.targetRotation.x += deltaY * 0.005;
        this.prevMousePos = { x: clientX, y: clientY };
      }
    };

    const onEnd = () => {
      this.isDragging = false;
    };

    dom.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    // Touch Support: Single finger rotate, two fingers pinch-to-zoom
    let initialPinchDist = 0;
    let initialZoomZ = 0;

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.hypot(dx, dy);
        initialZoomZ = this.camera.position.z;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2 && initialPinchDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        const factor = initialPinchDist / Math.max(10, currentDist);
        this.camera.position.z = Math.max(18.0, Math.min(55.0, initialZoomZ * factor));
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        initialPinchDist = 0;
      }
      if (e.touches.length === 0) {
        onEnd();
      }
    }, { passive: true });

    // Smooth Mouse Wheel Zoom (User can zoom out/in anytime)
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomStep = e.deltaY * 0.015;
      const currentZ = this.camera.position.z;
      this.camera.position.z = Math.max(18.0, Math.min(55.0, currentZ + zoomStep));
    }, { passive: false });

    // Click on 3D Electron Meshes
    dom.addEventListener('click', (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.electrons.map(el => el.mesh);
      const intersects = this.raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        let hitMesh = intersects[0].object;
        while (hitMesh.parent && !hitMesh.userData.dashboard) {
          hitMesh = hitMesh.parent;
        }

        if (hitMesh.userData && hitMesh.userData.dashboard) {
          sfx.playWarp();
          if (this.onNodeSelect) {
            this.onNodeSelect(hitMesh.userData.dashboard.id);
          }
        }
      }
    });

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 70);
    const aspect = width / height;

    const isDesktop = (window.innerWidth >= 1400);
    this.targetViewOffsetX = isDesktop && this.sidebarWidth > 0 ? (this.sidebarWidth / 2) : 0;
    this.currentViewOffsetX = this.targetViewOffsetX;

    this.camera.aspect = aspect;
    this.adjustCameraForAspect(aspect);
    this.applyViewOffset(true);

    this.renderer.setSize(width, height);
  }

  setSidebarWidth(width, immediate = false) {
    this.sidebarWidth = width;
    const isDesktop = (window.innerWidth >= 1400);
    // On desktop widescreen, offset by width / 2 to center the 3D atomic nucleus at ~40.1% screen width
    this.targetViewOffsetX = isDesktop && width > 0 ? (width / 2) : 0;
    if (immediate) {
      this.currentViewOffsetX = this.targetViewOffsetX;
      this.applyViewOffset(true);
    }
  }

  applyViewOffset(force = false) {
    if (!this.camera || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 70);

    if (Math.abs(this.currentViewOffsetX) < 0.5) {
      this.camera.clearViewOffset();
    } else {
      this.camera.setViewOffset(width, height, this.currentViewOffsetX, 0, width, height);
    }
    this.camera.updateProjectionMatrix();
  }

  pulseSphere(deckId) {
    this.hoveredDeck = deckId;
    const el = this.electrons.find(e => e.dash.id === deckId);
    if (el) {
      if (el.ringMesh && el.ringMesh.material) {
        el.ringMesh.material.opacity = 0.95;
        el.ringMesh.material.color.setHex(0xffffff);
      }
      if (el.glowMesh && el.glowMesh.material) {
        el.glowMesh.material.opacity = 0.85;
      }
      if (el.domElement) {
        el.domElement.classList.add('sidebar-hover-pulse');
      }
    }
  }

  clearPulseSphere(deckId) {
    if (this.hoveredDeck === deckId) {
      this.hoveredDeck = null;
    }
    const el = this.electrons.find(e => e.dash.id === deckId);
    if (el) {
      if (el.ringMesh && el.ringMesh.material) {
        const isFocus = (this.activeDeckId === 'core' || el.dash.id === this.activeDeckId);
        el.ringMesh.material.opacity = isFocus ? 0.35 : 0.15;
        el.ringMesh.material.color.setHex(el.dash.color);
      }
      if (el.glowMesh && el.glowMesh.material) {
        el.glowMesh.material.opacity = 0.45;
      }
      if (el.domElement) {
        el.domElement.classList.remove('sidebar-hover-pulse');
      }
    }
  }

  setFocusDeck(deckId) {
    this.activeDeckId = deckId;
    this.electrons.forEach(el => {
      if (el.ringMesh) {
        if (deckId === 'core' || el.dash.id === deckId) {
          el.ringMesh.material.opacity = el.dash.id === deckId ? 0.8 : 0.32;
        } else {
          el.ringMesh.material.opacity = 0.15;
        }
      }
      if (el.domElement) {
        if (deckId === 'core') {
          el.domElement.classList.remove('dimmed', 'focused');
        } else if (el.dash.id === deckId) {
          el.domElement.classList.add('focused');
          el.domElement.classList.remove('dimmed');
        } else {
          el.domElement.classList.add('dimmed');
          el.domElement.classList.remove('focused');
        }
      }
    });
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Smooth view offset interpolation for sidebar transitions
    if (Math.abs(this.targetViewOffsetX - this.currentViewOffsetX) > 0.15) {
      this.currentViewOffsetX += (this.targetViewOffsetX - this.currentViewOffsetX) * 0.12;
      this.applyViewOffset();
    }

    // Constant slow elegant rotation of the atomic structure itself when user is not dragging
    if (!this.isDragging) {
      this.targetRotation.y += 0.0024;
      this.targetRotation.x = 0.22 + Math.sin(time * 0.35) * 0.04;
    }

    // Smooth drag / rotation interpolation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    if (this.orbitalGroup) {
      this.orbitalGroup.rotation.x = this.currentRotation.x;
      this.orbitalGroup.rotation.y = this.currentRotation.y;
    }

    // Spin Nucleus
    if (this.nucleusGroup) {
      this.nucleusGroup.rotation.y += 0.015;
      this.nucleusGroup.rotation.z += 0.008;
    }

    if (this.outerNucleusMesh) {
      this.outerNucleusMesh.rotation.y -= 0.02;
      const pulse = 1 + Math.sin(time * 3) * 0.08;
      this.outerNucleusMesh.scale.set(pulse, pulse, pulse);
    }

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 70);
    const worldVec = new THREE.Vector3();

    // Update Electron Positions along their Orbits & Project 3D circles to screen
    this.electrons.forEach((el) => {
      const dash = el.dash;
      const isHovered = (this.hoveredDeck === dash.id);
      const speedMultiplier = isHovered ? 0.0 : 1.0;
      el.currentAngle += 0.016 * dash.speed * speedMultiplier;
      
      const stretchX = dash.horizontalStretch || 1.4;
      const x = Math.cos(el.currentAngle) * (dash.orbitRadius * stretchX);
      const z = Math.sin(el.currentAngle) * dash.orbitRadius;
      el.mesh.position.set(x, 0, z);

      // Spin the custom 3D domain shape (wrench, house, mountain, gem, star, calendar)
      el.mesh.rotation.y += 0.02;
      el.mesh.rotation.x += 0.01;
      el.mesh.rotation.z += 0.012;

      // Spin the glow
      el.glowMesh.rotation.y += 0.04;
      el.glowMesh.rotation.x += 0.02;

      // Subtle 3D pulsating quantum glow if sphere has active alerts/notifications
      if (el.hasAlert && el.glowMesh) {
        if (el.glowMesh.material) {
          el.glowMesh.material.opacity = 0.45 + Math.sin(time * 2.6) * 0.22;
        }
      }

      // Project 3D coordinates to 2D screen coordinates
      if (el.domElement) {
        el.mesh.getWorldPosition(worldVec);
        worldVec.project(this.camera);

        const screenX = (worldVec.x * 0.5 + 0.5) * width;
        const screenY = (-(worldVec.y * 0.5) + 0.5) * height;

        // If in front of camera
        if (worldVec.z < 1.0 && screenX >= -80 && screenX <= width + 80 && screenY >= -80 && screenY <= height + 80) {
          el.domElement.style.display = 'flex';
          // Keep ALL 6 spheres at the exact same uniform scale!
          const isHovered = (this.hoveredDeck === dash.id);
          const uniformScale = isHovered ? 1.08 : 1.0;
          const depthOpacity = isHovered ? 1.0 : Math.max(0.68, Math.min(1.0, 1.02 - (worldVec.z * 0.22)));
          const zIndex = isHovered ? 200 : Math.round((1.0 - worldVec.z) * 100);

          el.domElement.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${uniformScale})`;
          el.domElement.style.opacity = depthOpacity;
          el.domElement.style.zIndex = zIndex;
        } else {
          el.domElement.style.display = 'none';
        }
      }
    });

    // Check raycast hover
    if (this.raycaster && this.mouse && this.camera) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const meshes = this.electrons.map(el => el.mesh);
      const intersects = this.raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    }

    // Render Scene
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
