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
  bns3: `
    <div class="circle-graphic-container circle-graphic-bns3">
      <svg viewBox="0 0 148 148" class="circle-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-bns3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#92400e" stop-opacity="0.55"/>
            <stop offset="65%" stop-color="#78350f" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </radialGradient>
          <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx="74" cy="74" r="74" fill="url(#grad-bns3)"/>
        <circle cx="74" cy="72" r="50" fill="none" stroke="#f59e0b" stroke-width="0.75" stroke-dasharray="4,4" opacity="0.45"/>
        <circle cx="74" cy="72" r="35" fill="none" stroke="#d97706" stroke-width="0.5" opacity="0.35"/>
        <line x1="74" y1="20" x2="74" y2="35" stroke="#f59e0b" stroke-width="1.3"/>
        <line x1="74" y1="109" x2="74" y2="124" stroke="#f59e0b" stroke-width="1.3"/>
        <line x1="20" y1="72" x2="35" y2="72" stroke="#f59e0b" stroke-width="1.3"/>
        <line x1="113" y1="72" x2="128" y2="72" stroke="#f59e0b" stroke-width="1.3"/>
        <!-- Golden Iron Dragon Insignia -->
        <g filter="url(#glow-gold)" transform="translate(74,72)">
          <polygon points="0,-26 26,-12 26,12 0,26 -26,12 -26,-12" fill="rgba(245, 158, 11, 0.28)" stroke="#f59e0b" stroke-width="2.2"/>
          <path d="M-16,7 C-16,-3 -12,-14 0,-21 C8,-18 16,-19 19,-14 C21,-10 16,-5 19,0 C20,4 14,14 2,19 C-8,16 -16,12 -16,7 Z" fill="#d97706" stroke="#fbbf24" stroke-width="1.4"/>
          <path d="M-8,-19 L-2,-27 L2,-20 L9,-25 L10,-16" stroke="#fbbf24" stroke-width="1.8" fill="none"/>
          <circle cx="2" cy="-10" r="2.1" fill="#ffffff" filter="url(#glow-gold)"/>
          <circle cx="2" cy="-10" r="1" fill="#ef4444"/>
          <path d="M11,-2 Q21,-4 28,0 Q21,7 11,5 Z" fill="#fb923c" opacity="0.95"/>
          <line x1="-10" y1="2" x2="8" y2="20" stroke="#fbbf24" stroke-width="1.6"/>
          <line x1="8" y1="2" x2="-10" y2="20" stroke="#fbbf24" stroke-width="1.6"/>
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
    this.mouse = null;
    this.hoveredDeck = null;
    this.activeDeckId = 'core';

    const resolveCloudUrl = (key, defaultRelPath) => {
      try {
        const val = localStorage.getItem(key);
        if (!val || val.includes('127.0.0.1') || val.includes('localhost') || val === 'about:blank' || val === '') {
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
        orbitRadius: 4.8,
        speed: 0.16,
        angle: 0.2,
        inclination: { x: 0.7, y: 0.3, z: 0.2 },
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
        orbitRadius: 6.0,
        speed: 0.13,
        angle: 2.1,
        inclination: { x: -0.6, y: 0.8, z: -0.4 },
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
        orbitRadius: 7.2,
        speed: 0.105,
        angle: 4.4,
        inclination: { x: 0.4, y: -0.7, z: 0.9 },
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
        orbitRadius: 8.4,
        speed: 0.08,
        angle: 3.2,
        inclination: { x: -0.5, y: -0.4, z: 0.6 },
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
        orbitRadius: 9.6,
        speed: 0.065,
        angle: 1.4,
        inclination: { x: 0.8, y: -0.3, z: -0.7 },
        color: 0xf43f5e,
        glowHex: '#f43f5e',
        url: localStorage.getItem('hub_url_mackie') || 'https://daily-executive-dashboard.onrender.com/mackie/',
        icon: '🗓️'
      },
      {
        id: 'bns3',
        name: '110TH CM BN S3 SYNERGY',
        shortTitle: '110TH BN S3',
        orbitTag: 'ORBIT 06',
        code: 'TRAIN-PRO S3',
        orbitRadius: 10.8,
        speed: 0.05,
        angle: 5.1,
        inclination: { x: -0.7, y: 0.6, z: 0.4 },
        color: 0xf59e0b,
        glowHex: '#f59e0b',
        url: resolveCloudUrl('hub_url_bns3', './dashboards/bns3/index.html'),
        icon: '🐉'
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
      this.camera.position.set(0, 1.0, 38.0);
    } else {
      // Laptop widescreen - Zoomed out so Red Orbit 05 and Gold Orbit 06 fit comfortably with full screen margin
      this.camera.position.set(0, 0.5, 31.5);
    }
    this.camera.lookAt(0, 0, 0);
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

  buildOrbitals() {
    this.orbitalGroup = new THREE.Group();
    this.electrons = [];

    this.dashboards.forEach((dash) => {
      // 1. Orbital Ring Track (Smooth Ellipse / Ring)
      const ringGeo = new THREE.RingGeometry(dash.orbitRadius - 0.025, dash.orbitRadius + 0.025, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dash.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.32
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;

      // Container for tilting the orbit
      const orbitTiltGroup = new THREE.Group();
      orbitTiltGroup.rotation.x = dash.inclination.x;
      orbitTiltGroup.rotation.y = dash.inclination.y;
      orbitTiltGroup.rotation.z = dash.inclination.z;
      orbitTiltGroup.add(ring);

      // 2. Electron Satellite Node (Docking anchor point in 3D)
      const electronGeo = new THREE.SphereGeometry(0.48, 24, 24);
      const electronMat = new THREE.MeshStandardMaterial({
        color: dash.color,
        emissive: dash.color,
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.85
      });
      const electron = new THREE.Mesh(electronGeo, electronMat);
      electron.userData = { dashboard: dash };

      // Outer glow halo for the electron
      const electronGlowGeo = new THREE.SphereGeometry(0.78, 16, 16);
      const electronGlowMat = new THREE.MeshBasicMaterial({
        color: dash.color,
        transparent: true,
        opacity: 0.38,
        wireframe: true
      });
      const electronGlow = new THREE.Mesh(electronGlowGeo, electronGlowMat);
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

    this.camera.aspect = aspect;
    this.adjustCameraForAspect(aspect);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
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

    // Smooth drag interpolation
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
      
      const x = Math.cos(el.currentAngle) * dash.orbitRadius;
      const z = Math.sin(el.currentAngle) * dash.orbitRadius;
      el.mesh.position.set(x, 0, z);

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
