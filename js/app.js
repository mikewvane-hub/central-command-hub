/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Main Application Orchestrator
 */

import { sfx } from './sound-effects.js';
import { AtomicCoreVisualizer } from './atomic-core.js';
import { DashboardManager } from './dashboard-manager.js';
import { VoiceCommandEngine } from './voice-command.js';
import { DeviceOptimizer } from './device-optimizer.js';
import { renderQRCode } from './qr-generator.js';

class CentralCommandHubApp {
  constructor() {
    this.visualizer = null;
    this.dashboardMgr = null;
    this.voiceEngine = null;
    this.deviceOptimizer = null;

    document.addEventListener('DOMContentLoaded', () => this.boot());
  }

  boot() {
    console.log(`🌌 [Central Command Hub] Initializing Atomic Quantum Architecture...`);

    // 1. Initialize Dashboard Manager
    this.dashboardMgr = new DashboardManager((deckId) => {
      // When deck changes, update visualizer or UI
      if (deckId === 'core' && this.visualizer) {
        this.visualizer.onResize();
      }
    });

    // 2. Initialize 3D Atomic Core Visualizer
    this.visualizer = new AtomicCoreVisualizer('atomic-canvas-container', (selectedDeckId) => {
      this.dashboardMgr.switchDeck(selectedDeckId);
    });

    // 3. Initialize Adaptive Device Optimizer (Z Fold 8 vs Laptop)
    this.deviceOptimizer = new DeviceOptimizer((mode) => {
      if (this.visualizer) {
        setTimeout(() => this.visualizer.onResize(), 100);
      }
    });

    // 4. Initialize Voice Interactive Neural Assistant
    this.voiceEngine = new VoiceCommandEngine({
      onSelectDeck: (deckId) => this.dashboardMgr.switchDeck(deckId),
      onSetDeviceMode: (mode) => this.deviceOptimizer.setMode(mode),
      onToggleFullscreen: () => this.deviceOptimizer.toggleFullscreen(),
      onGetStatusReport: () => this.generateStatusReport()
    });

    // 5. Wire Header and Floating Action Controls
    this.setupUIControls();

    // 6. Setup Global Keyboard Shortcuts
    this.setupKeyboardShortcuts();

    // 7. Render QR Code for Galaxy Z Fold 8 instant scanning
    this.setupShareAndQR();

    // 8. Start Clock
    this.startSystemClock();
  }

  setupUIControls() {
    // Voice HUD Pill Click -> toggle listening
    const voicePill = document.getElementById('voice-hud-pill');
    if (voicePill) {
      voicePill.addEventListener('click', () => {
        this.voiceEngine.toggleListening();
      });
    }

    // Sound FX Mute Toggle
    const muteBtn = document.getElementById('btn-toggle-sound');
    if (muteBtn) {
      this.updateMuteIcon(muteBtn, sfx.isMuted());
      muteBtn.addEventListener('click', () => {
        const isMuted = sfx.toggleMute();
        this.updateMuteIcon(muteBtn, isMuted);
      });
    }

    // Fullscreen Toggle
    const fullscreenBtn = document.getElementById('btn-toggle-fullscreen');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        sfx.playClick();
        this.deviceOptimizer.toggleFullscreen();
      });
    }

    // Settings Modal Toggle
    const settingsBtn = document.getElementById('btn-open-settings');
    const settingsModal = document.getElementById('modal-hub-settings');
    const closeSettingsBtn = document.getElementById('btn-close-settings');

    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener('click', () => {
        sfx.playClick();
        this.loadSettingsForm();
        settingsModal.classList.add('open');
      });
    }

    if (closeSettingsBtn && settingsModal) {
      closeSettingsBtn.addEventListener('click', () => {
        sfx.playClick();
        settingsModal.classList.remove('open');
      });
    }

    // Settings Form Save
    const saveSettingsBtn = document.getElementById('btn-save-settings');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => {
        this.saveSettingsForm();
        if (settingsModal) settingsModal.classList.remove('open');
      });
    }

    // Brand click returns to Core
    const brand = document.querySelector('.brand-group');
    if (brand) {
      brand.addEventListener('click', () => {
        sfx.playClick();
        this.dashboardMgr.switchDeck('core');
      });
    }
  }

  updateMuteIcon(btn, isMuted) {
    btn.innerHTML = isMuted 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    btn.title = isMuted ? 'SFX Muted (Click to Unmute)' : 'SFX Active (Click to Mute)';
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case ' ': // Space: toggle voice
          e.preventDefault();
          this.voiceEngine.toggleListening();
          break;
        case 'Escape':
        case '0':
          this.dashboardMgr.switchDeck('core');
          break;
        case '1':
          this.dashboardMgr.switchDeck('executive');
          break;
        case '2':
          this.dashboardMgr.switchDeck('rental');
          break;
        case '3':
          this.dashboardMgr.switchDeck('financial');
          break;
        case '4':
          this.dashboardMgr.switchDeck('trip');
          break;
        case '5':
          this.dashboardMgr.switchDeck('mackie');
          break;
        case '6':
          this.dashboardMgr.switchDeck('bns3');
          break;
        case '7':
          this.dashboardMgr.switchDeck('telemetry');
          break;
        case 'f':
        case 'F':
          this.deviceOptimizer.toggleFullscreen();
          break;
        case 'm':
        case 'M':
          const muteBtn = document.getElementById('btn-toggle-sound');
          const isMuted = sfx.toggleMute();
          if (muteBtn) this.updateMuteIcon(muteBtn, isMuted);
          break;
      }
    });
  }

  setupShareAndQR() {
    const currentUrl = window.location.href;
    const shareUrlInput = document.getElementById('share-hub-url');
    if (shareUrlInput) {
      shareUrlInput.value = currentUrl;
    }

    renderQRCode('qr-code-canvas', currentUrl);

    const copyBtn = document.getElementById('btn-copy-share-url');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentUrl).then(() => {
          sfx.playSuccess();
          copyBtn.textContent = 'COPIED!';
          setTimeout(() => { copyBtn.textContent = 'COPY URL'; }, 2000);
        });
      });
    }
  }

  loadSettingsForm() {
    const inputExec = document.getElementById('setting-url-executive');
    const inputRent = document.getElementById('setting-url-rental');
    const inputFin = document.getElementById('setting-url-financial');
    const inputTrip = document.getElementById('setting-url-trip');
    const inputMackie = document.getElementById('setting-url-mackie');
    const inputBns3 = document.getElementById('setting-url-bns3');

    if (inputExec) inputExec.value = this.dashboardMgr.urls.executive;
    if (inputRent) inputRent.value = this.dashboardMgr.urls.rental;
    if (inputFin) inputFin.value = this.dashboardMgr.urls.financial;
    if (inputTrip) inputTrip.value = this.dashboardMgr.urls.trip;
    if (inputMackie) inputMackie.value = this.dashboardMgr.urls.mackie;
    if (inputBns3) inputBns3.value = this.dashboardMgr.urls.bns3;
  }

  saveSettingsForm() {
    const inputExec = document.getElementById('setting-url-executive');
    const inputRent = document.getElementById('setting-url-rental');
    const inputFin = document.getElementById('setting-url-financial');
    const inputTrip = document.getElementById('setting-url-trip');
    const inputMackie = document.getElementById('setting-url-mackie');
    const inputBns3 = document.getElementById('setting-url-bns3');

    if (inputExec) this.dashboardMgr.saveCustomUrl('executive', inputExec.value.trim());
    if (inputRent) this.dashboardMgr.saveCustomUrl('rental', inputRent.value.trim());
    if (inputFin) this.dashboardMgr.saveCustomUrl('financial', inputFin.value.trim());
    if (inputTrip) this.dashboardMgr.saveCustomUrl('trip', inputTrip.value.trim());
    if (inputMackie) this.dashboardMgr.saveCustomUrl('mackie', inputMackie.value.trim());
    if (inputBns3) this.dashboardMgr.saveCustomUrl('bns3', inputBns3.value.trim());

    sfx.playSuccess();
    this.voiceEngine.speak("System configuration updated.");
  }

  startSystemClock() {
    const clockEl = document.getElementById('system-clock-display');
    const update = () => {
      if (!clockEl) return;
      const now = new Date();
      const utc = now.toUTCString().split(' ')[4];
      const local = now.toLocaleTimeString('en-US', { hour12: false });
      clockEl.textContent = `${local} LOCAL // ${utc} UTC`;
    };
    update();
    setInterval(update, 1000);
  }

  generateStatusReport() {
    const execStatus = this.dashboardMgr.statusMap.executive || 'ONLINE';
    const rentStatus = this.dashboardMgr.statusMap.rental || 'ONLINE';
    const finStatus = this.dashboardMgr.statusMap.financial || 'ONLINE';
    const tripStatus = this.dashboardMgr.statusMap.trip || 'ONLINE';
    const mackieStatus = this.dashboardMgr.statusMap.mackie || 'ONLINE';
    const bns3Status = this.dashboardMgr.statusMap.bns3 || 'ONLINE';

    this.voiceEngine.speak(
      `Central Command Hub operational status: Executive Briefing is ${execStatus}. Rental Operations is ${rentStatus}. Wealth console is ${finStatus}. Rainier Basecamp is ${tripStatus}. Mackie's Daily Board is ${mackieStatus}. 110th Chemical Battalion S3 is ${bns3Status}. Display ratio calibrated.`
    );
  }
}

// Boot Central Command Hub
new CentralCommandHubApp();
