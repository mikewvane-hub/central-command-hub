/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Voice Interactive Neural Assistant Engine
 * Full bidirectional voice commands using Web Speech API (Recognition + Synthesis)
 */

import { sfx } from './sound-effects.js';

export class VoiceCommandEngine {
  constructor(handlers) {
    this.handlers = handlers || {}; // { onSelectDeck, onSetDeviceMode, onToggleFullscreen, onGetStatusReport }
    this.recognition = null;
    this.isListening = false;
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.autoRestart = false;

    this.pillEl = document.getElementById('voice-hud-pill');
    this.hologramEl = document.getElementById('voice-hologram-hud');
    this.transcriptEl = document.getElementById('voice-transcript-output');
    this.voiceLabelEl = document.getElementById('voice-label');

    this.initSpeechSynthesis();
    this.initSpeechRecognition();
  }

  initSpeechSynthesis() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth.getVoices();
      // Try to select a sleek sci-fi / modern English voice
      this.selectedVoice = this.voices.find(v => 
        v.name.includes('Google US English') ||
        v.name.includes('Natural') ||
        v.name.includes('Samantha') ||
        v.name.includes('Zira') ||
        v.lang.startsWith('en')
      ) || this.voices[0];
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not natively supported in this browser environment.');
      if (this.voiceLabelEl) {
        this.voiceLabelEl.textContent = 'VOICE: SIMULATOR';
      }
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      sfx.playVoiceChime();
      this.updateListeningUI(true);
      this.showHologramHUD('LISTENING FOR COMMAND...', 'Speak: "Open Executive Dashboard"...');
    };

    this.recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const activeText = final || interim;
      if (this.transcriptEl) {
        this.transcriptEl.textContent = `"${activeText}"`;
      }

      if (final) {
        this.processCommand(final.trim());
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition status:', event.error);
      this.updateListeningUI(false);
      this.hideHologramHUD(1800);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.updateListeningUI(false);
      if (this.autoRestart) {
        setTimeout(() => this.startListening(), 400);
      } else {
        this.hideHologramHUD(2200);
      }
    };
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    sfx.init();
    if (!this.recognition) {
      this.promptManualCommand();
      return;
    }

    try {
      this.recognition.start();
    } catch (e) {
      // If already started
      this.recognition.stop();
      setTimeout(() => {
        try { this.recognition.start(); } catch (err) {}
      }, 200);
    }
  }

  stopListening() {
    this.autoRestart = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.updateListeningUI(false);
  }

  updateListeningUI(active) {
    if (!this.pillEl) return;
    if (active) {
      this.pillEl.classList.add('listening');
      if (this.voiceLabelEl) this.voiceLabelEl.textContent = 'LISTENING...';
    } else {
      this.pillEl.classList.remove('listening');
      if (this.voiceLabelEl) this.voiceLabelEl.textContent = 'VOICE: READY';
    }
  }

  showHologramHUD(title, message) {
    if (!this.hologramEl) return;
    const titleEl = document.getElementById('voice-hologram-title');
    if (titleEl) titleEl.textContent = title;
    if (this.transcriptEl) this.transcriptEl.textContent = message;
    this.hologramEl.classList.add('active');
  }

  hideHologramHUD(delayMs = 0) {
    if (!this.hologramEl) return;
    setTimeout(() => {
      if (!this.isListening) {
        this.hologramEl.classList.remove('active');
      }
    }, delayMs);
  }

  speak(text, onComplete) {
    if (!this.synth) return;
    this.synth.cancel(); // cancel any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.08;
    utterance.pitch = 0.95;

    if (this.pillEl) this.pillEl.classList.add('speaking');
    this.showHologramHUD('TACTICAL VOICE SYNTHESIS', text);

    utterance.onend = () => {
      if (this.pillEl) this.pillEl.classList.remove('speaking');
      this.hideHologramHUD(1500);
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      if (this.pillEl) this.pillEl.classList.remove('speaking');
      this.hideHologramHUD(1000);
    };

    this.synth.speak(utterance);
  }

  processCommand(rawText) {
    const text = rawText.toLowerCase().trim();
    console.log(`[Voice Command Recognized]: "${text}"`);
    sfx.playSuccess();

    // 1. Executive Dashboard Command
    if (
      text.includes('executive') ||
      text.includes('daily brief') ||
      text.includes('chief of staff') ||
      text.includes('briefing')
    ) {
      this.speak("Accessing Chief of Staff Executive Briefing.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('executive');
      }
      return;
    }

    // 2. Rental Operations & JBLM Acquisition Terminal Command
    if (
      text.includes('rental') ||
      text.includes('jblm') ||
      text.includes('acquisition') ||
      text.includes('antigravity') ||
      text.includes('house hunting') ||
      text.includes('engine')
    ) {
      this.speak("Opening Antigravity Dual-Engine Rental and Acquisition Terminal.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('rental');
      }
      return;
    }

    // 3. Financial Wealth Command Center Command
    if (
      text.includes('financial') ||
      text.includes('wealth') ||
      text.includes('console') ||
      text.includes('money') ||
      text.includes('portfolio') ||
      text.includes('budget')
    ) {
      this.speak("Opening Financial Command Center and Wealth Console.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('financial');
      }
      return;
    }

    // 4. Rainier Basecamp // Overland & Trip Planner Command
    if (
      text.includes('trip') ||
      text.includes('planner') ||
      text.includes('rainier') ||
      text.includes('basecamp') ||
      text.includes('overland') ||
      text.includes('expedition') ||
      text.includes('camping')
    ) {
      this.speak("Opening Rainier Basecamp Family Overland and Trip Planner.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('trip');
      }
      return;
    }

    // 5. Mackie's Daily Board Command
    if (
      text.includes('mackie') ||
      text.includes('mom board') ||
      text.includes('meal planner') ||
      text.includes('grocery') ||
      text.includes('calendar') ||
      text.includes('family calendar') ||
      text.includes('schedule')
    ) {
      this.speak("Opening Mackie's Daily Board, Meal Planner and Grocery List.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('mackie');
      }
      return;
    }

    // 4. Return to Atomic Orbital Core
    if (
      text.includes('core') ||
      text.includes('atomic') ||
      text.includes('orbit') ||
      text.includes('hub') ||
      text.includes('home') ||
      text.includes('return')
    ) {
      this.speak("Returning to Atomic Command Core.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('core');
      }
      return;
    }

    // 5. System Status / Telemetry
    if (
      text.includes('status') ||
      text.includes('telemetry') ||
      text.includes('diagnostics') ||
      text.includes('health') ||
      text.includes('system')
    ) {
      this.speak("Opening Quantum Telemetry Matrix. All orbital systems online.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('telemetry');
      }
      return;
    }

    // 6. Device Aspect Ratio Presets
    if (text.includes('fold') || text.includes('z fold') || text.includes('tablet')) {
      this.speak("Optimizing display layout for Galaxy Z Fold 8 inner screen.");
      if (this.handlers.onSetDeviceMode) {
        this.handlers.onSetDeviceMode('zfold');
      }
      return;
    }

    if (text.includes('laptop') || text.includes('desktop') || text.includes('wide')) {
      this.speak("Switching to Laptop Widescreen display ratio.");
      if (this.handlers.onSetDeviceMode) {
        this.handlers.onSetDeviceMode('laptop');
      }
      return;
    }

    if (text.includes('auto') || text.includes('responsive')) {
      this.speak("Display ratio set to auto-detect.");
      if (this.handlers.onSetDeviceMode) {
        this.handlers.onSetDeviceMode('auto');
      }
      return;
    }

    // 7. Fullscreen Toggle
    if (text.includes('full screen') || text.includes('fullscreen')) {
      this.speak("Toggling fullscreen display.");
      if (this.handlers.onToggleFullscreen) {
        this.handlers.onToggleFullscreen();
      }
      return;
    }

    // Unrecognized Command
    this.speak(`Command received: ${rawText}. Please specify Executive, Rental, Financial, or Core view.`);
  }

  // Voice Command Simulator dialog if mic is disabled or unsupported
  promptManualCommand() {
    const command = prompt('Enter Voice Command (e.g. "open executive dashboard", "open rental ops", "open wealth console"):');
    if (command) {
      this.processCommand(command);
    }
  }
}
