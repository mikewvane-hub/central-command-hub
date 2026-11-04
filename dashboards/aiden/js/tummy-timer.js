/**
 * ANTIGRAVITY NRMC // TUMMY TIME INTERACTIVE STOPWATCH & TELEMETRY ENGINE
 */

export class TummyTimer {
  constructor(options = {}) {
    this.displayEl = document.getElementById(options.displayId || 'tummy-stopwatch-display');
    this.startBtn = document.getElementById(options.startBtnId || 'tummy-start-btn');
    this.pauseBtn = document.getElementById(options.pauseBtnId || 'tummy-pause-btn');
    this.resetBtn = document.getElementById(options.resetBtnId || 'tummy-reset-btn');
    this.saveBtn = document.getElementById(options.saveBtnId || 'tummy-save-btn');
    this.onSave = options.onSave || null;

    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isRunning = false;

    this.initAudio();
    this.attachEvents();
  }

  initAudio() {
    this.audioCtx = null;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      // Audio optional
    }
  }

  playTone(freq = 880, duration = 0.15, type = 'sine') {
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore
    }
  }

  attachEvents() {
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.start());
    }
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => this.pause());
    }
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.reset());
    }
    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', () => this.saveSession());
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.playTone(660, 0.1);
    this.updateControls();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.updateDisplay();
    }, 1000);
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.playTone(440, 0.1);
    this.updateControls();
  }

  reset() {
    this.pause();
    this.elapsedSeconds = 0;
    this.updateDisplay();
  }

  saveSession() {
    const minutes = Math.max(1, Math.round(this.elapsedSeconds / 60));
    this.playTone(880, 0.25, 'triangle');
    if (typeof this.onSave === 'function') {
      this.onSave(minutes, this.elapsedSeconds);
    }
    this.reset();
  }

  updateDisplay() {
    if (!this.displayEl) return;
    const mins = Math.floor(this.elapsedSeconds / 60);
    const secs = this.elapsedSeconds % 60;
    const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    this.displayEl.textContent = str;
  }

  updateControls() {
    if (this.startBtn) {
      this.startBtn.style.display = this.isRunning ? 'none' : 'inline-flex';
    }
    if (this.pauseBtn) {
      this.pauseBtn.style.display = this.isRunning ? 'inline-flex' : 'none';
    }
  }
}
