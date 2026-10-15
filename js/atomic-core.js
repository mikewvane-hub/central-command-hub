/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * 3D Quantum Atomic Visualizer Engine
 * Interactive Three.js Bohr-Quantum Orbital Core with raycasting and
 * 3D-projected floating circular dashboard pods that display the actual dashboards in orbit!
 */

import { sfx } from './sound-effects.js';

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
        orbitRadius: 4.4,
        speed: 0.55,
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
        orbitRadius: 5.8,
        speed: 0.42,
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
        speed: 0.30,
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
        orbitRadius: 8.5,
        speed: 0.22,
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
        orbitRadius: 9.8,
        speed: 0.16,
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
        orbitRadius: 11.2,
        speed: 0.12,
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
      // Square or tall aspect ratio (Z Fold 8 Inner unfolded or mobile)
      this.camera.position.set(0, 3.2, 27.0);
    } else {
      // Laptop widescreen
      this.camera.position.set(0, 2.2, 22.5);
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

    const isHttps = window.location.protocol === 'https:';

    this.electrons.forEach((el, idx) => {
      const dash = el.dash;
      const circleEl = document.createElement('div');
      circleEl.className = 'orbiting-dashboard-circle';
      circleEl.dataset.deck = dash.id;
      circleEl.style.setProperty('--orbit-color', dash.glowHex);

      const isInsecureTarget = isHttps && dash.url.startsWith('http://');

      circleEl.innerHTML = `
        <div class="circle-halo-ring"></div>
        <div class="circle-inner-portal">
          <div class="circle-orbit-index">${dash.orbitTag}</div>
          <div class="circle-preview-viewport">
            ${!isInsecureTarget ? `
              <iframe src="${dash.url}" class="circle-mini-iframe" loading="lazy" tabindex="-1"></iframe>
            ` : `
              <div class="circle-fallback-view">
                <div class="circle-fallback-icon">${dash.icon}</div>
                <div class="circle-fallback-code">${dash.code}</div>
              </div>
            `}
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
        this.hoveredDeck = null;
      });

      overlay.appendChild(circleEl);
      el.domElement = circleEl;
    });
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

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', onEnd);

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
      const speedMultiplier = (this.hoveredDeck === dash.id) ? 0.2 : 1.0;
      el.currentAngle += 0.016 * dash.speed * speedMultiplier;
      
      const x = Math.cos(el.currentAngle) * dash.orbitRadius;
      const z = Math.sin(el.currentAngle) * dash.orbitRadius;
      el.mesh.position.set(x, 0, z);

      // Spin the glow
      el.glowMesh.rotation.y += 0.04;
      el.glowMesh.rotation.x += 0.02;

      // Project 3D coordinates to 2D screen coordinates
      if (el.domElement) {
        el.mesh.getWorldPosition(worldVec);
        worldVec.project(this.camera);

        const screenX = (worldVec.x * 0.5 + 0.5) * width;
        const screenY = (-(worldVec.y * 0.5) + 0.5) * height;

        // If in front of camera
        if (worldVec.z < 1.0 && screenX >= -80 && screenX <= width + 80 && screenY >= -80 && screenY <= height + 80) {
          el.domElement.style.display = 'flex';
          const depthScale = Math.max(0.68, Math.min(1.15, 1.02 - (worldVec.z * 0.4)));
          const depthOpacity = Math.max(0.55, Math.min(1.0, 1.0 - (worldVec.z * 0.3)));
          const zIndex = Math.round((1.0 - worldVec.z) * 100);

          el.domElement.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${depthScale})`;
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
