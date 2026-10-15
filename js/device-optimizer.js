/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Adaptive Hardware & Viewport Optimizer
 * Special handling for Samsung Galaxy Z Fold 8 inner screen (~1:1 / 4:3.5) and Laptop screens.
 */

export class DeviceOptimizer {
  constructor(onModeChangeCallback) {
    this.onModeChangeCallback = onModeChangeCallback;
    this.currentMode = localStorage.getItem('hub_device_preset') || 'auto';
    this.init();
  }

  init() {
    this.setupDeviceButtons();
    this.detectAndApplyLayout();

    window.addEventListener('resize', () => {
      if (this.currentMode === 'auto') {
        this.detectAndApplyLayout();
      }
    });

    // Foldable hinge & dual-screen API support if present
    if ('windowSegments' in window) {
      window.addEventListener('change', () => this.detectAndApplyLayout());
    }
  }

  setupDeviceButtons() {
    const buttons = document.querySelectorAll('.device-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.deviceMode;
        if (mode) {
          this.setMode(mode);
        }
      });
    });

    this.updateButtonUI();
  }

  setMode(mode) {
    this.currentMode = mode;
    localStorage.setItem('hub_device_preset', mode);
    this.updateButtonUI();
    this.applyMode(mode);
  }

  updateButtonUI() {
    document.querySelectorAll('.device-btn').forEach(btn => {
      if (btn.dataset.deviceMode === this.currentMode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  detectAndApplyLayout() {
    if (this.currentMode !== 'auto') {
      this.applyMode(this.currentMode);
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    console.log(`[Viewport Diagnostics] Width: ${width}px | Height: ${height}px | Aspect: ${aspect.toFixed(2)}`);

    // Galaxy Z Fold 8 Inner Screen Detection:
    // Fold inner screens unfolded typically have an aspect ratio close to 1:1 or 4:3.4 (aspect ~ 0.85 to 1.35)
    // and width is substantial (> 600px).
    const root = document.getElementById('command-hub-root');
    const isFoldableInner = (aspect >= 0.78 && aspect <= 1.38 && width >= 580);

    if (isFoldableInner) {
      this.applyFoldableLayout(root, true);
    } else {
      this.applyFoldableLayout(root, false);
    }

    // Update Telemetry display
    const aspectEl = document.getElementById('telemetry-aspect-ratio');
    if (aspectEl) {
      aspectEl.textContent = `${width}x${height} (${aspect.toFixed(2)}:1) ${isFoldableInner ? '[Z FOLD 8 INNER]' : '[WIDESCREEN]'}`;
    }
  }

  applyMode(mode) {
    const root = document.getElementById('command-hub-root');
    if (!root) return;

    if (mode === 'zfold') {
      this.applyFoldableLayout(root, true);
    } else if (mode === 'laptop') {
      this.applyFoldableLayout(root, false);
    } else if (mode === 'auto') {
      this.detectAndApplyLayout();
    }

    if (this.onModeChangeCallback) {
      this.onModeChangeCallback(mode);
    }
  }

  applyFoldableLayout(root, isFoldable) {
    if (isFoldable) {
      root.classList.add('mode-zfold-inner');
      root.classList.remove('mode-laptop-wide');
    } else {
      root.classList.remove('mode-zfold-inner');
      root.classList.add('mode-laptop-wide');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
