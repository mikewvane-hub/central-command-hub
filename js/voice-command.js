/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Voice Interactive Neural Assistant Engine
 * Full bidirectional voice commands using Web Speech API (Recognition + Synthesis)
 * Supports Wake Words ("Antigravity", "Computer", "Hub") & Direct Vocal Commands
 * Continuous Always-Listening Auto-Reconnect & Mobile/Z Fold 8 mic permission handling
 */

import { sfx } from './sound-effects.js';

export class VoiceCommandEngine {
  constructor(handlers) {
    this.handlers = handlers || {}; // { onSelectDeck, onSetDeviceMode, onToggleFullscreen, onGetStatusReport }
    this.recognition = null;
    this.isListeningModeActive = false; // User-toggled desired state (Always-On)
    this.isSpeaking = false;            // Prevent synthesis echo loop
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.restartTimeout = null;

    this.pillEl = document.getElementById('voice-hud-pill');
    this.hologramEl = document.getElementById('voice-hologram-hud');
    this.transcriptEl = document.getElementById('voice-transcript-output');
    this.voiceLabelEl = document.getElementById('voice-label');

    this.initSpeechSynthesis();
    this.initSpeechRecognition();
    this.updateListeningUI(false);
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
        v.name.includes('David') ||
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
    this.recognition.continuous = true; // Stay listening continuously
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.updateListeningUI(true);
      sfx.playVoiceChime();
      this.showHologramHUD('MIC ACTIVE • ALWAYS LISTENING', 'Speak command or say "Antigravity, open Executive"...');
    };

    this.recognition.onresult = (event) => {
      // Don't process input if the assistant itself is currently speaking
      if (this.isSpeaking) return;

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
      if (this.transcriptEl && activeText) {
        this.transcriptEl.textContent = `"${activeText}"`;
        if (this.hologramEl) this.hologramEl.classList.add('active');
      }

      if (final) {
        this.processCommand(final.trim());
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('[Voice Recognition Error]:', event.error);

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.isListeningModeActive = false;
        this.updateListeningUI(false, 'MIC BLOCKED (ALLOW IN URL BAR)');
        this.showHologramHUD('MICROPHONE ACCESS BLOCKED', 'Click the lock/settings icon in your browser address bar and set Microphone to "Allow".');
        return;
      }

      if (event.error === 'no-speech') {
        // Normal silence timeout in continuous mode; do not shut off
        return;
      }

      if (event.error === 'network') {
        this.showHologramHUD('NETWORK SPEECH ERROR', 'Ensure your device has an active internet connection.');
      }
    };

    this.recognition.onend = () => {
      // If user still wants continuous voice mode active, automatically re-engage
      if (this.isListeningModeActive) {
        clearTimeout(this.restartTimeout);
        this.restartTimeout = setTimeout(() => {
          if (this.isListeningModeActive && !this.isSpeaking) {
            this.safeStart();
          }
        }, 300);
      } else {
        this.updateListeningUI(false);
        this.hideHologramHUD(1500);
      }
    };
  }

  async toggleListening() {
    sfx.init();
    if (this.isListeningModeActive) {
      this.stopListening();
    } else {
      await this.startListening();
    }
  }

  async startListening() {
    if (!this.recognition) {
      this.promptManualCommand();
      return;
    }

    this.isListeningModeActive = true;
    this.updateListeningUI(false, 'CONNECTING MIC...');

    // Proactively request browser microphone permission to trigger the native popup if needed
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Release temporary probe track
      }
    } catch (err) {
      console.warn('[Microphone Permission Error]:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.isListeningModeActive = false;
        this.updateListeningUI(false, 'MIC BLOCKED (ALLOW IN URL BAR)');
        this.showHologramHUD('MICROPHONE PERMISSION BLOCKED', 'Click the lock or camera/mic icon in your address bar and change Microphone to "Allow".');
        return;
      }
    }

    this.safeStart();
  }

  safeStart() {
    if (!this.recognition) return;
    try {
      this.recognition.start();
    } catch (err) {
      // If already started or transitioning, restart cleanly
      try { this.recognition.stop(); } catch (e) {}
      setTimeout(() => {
        if (this.isListeningModeActive) {
          try { this.recognition.start(); } catch (e) {}
        }
      }, 250);
    }
  }

  stopListening() {
    this.isListeningModeActive = false;
    clearTimeout(this.restartTimeout);
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.updateListeningUI(false);
    this.showHologramHUD('VOICE ENGINE STANDBY', 'Mic muted. Tap Voice Pill or press SPACE to reactivate.');
    this.hideHologramHUD(2000);
  }

  updateListeningUI(active, customText = null) {
    if (!this.pillEl) return;

    if (active) {
      this.pillEl.classList.add('listening');
      this.pillEl.setAttribute('title', 'Voice Active (Listening). Tap to mute mic.');
      if (this.voiceLabelEl) {
        this.voiceLabelEl.textContent = customText || '● LISTENING (SPEAK)';
      }
    } else {
      this.pillEl.classList.remove('listening');
      this.pillEl.setAttribute('title', 'Voice Standby. Tap or press SPACE to activate voice control.');
      if (this.voiceLabelEl) {
        this.voiceLabelEl.textContent = customText || '🎙️ TAP TO ACTIVATE';
      }
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
      if (!this.isSpeaking && (!this.isListeningModeActive || !this.transcriptEl.textContent.includes('Speaking'))) {
        this.hologramEl.classList.remove('active');
      }
    }, delayMs);
  }

  speak(text, onComplete) {
    if (!this.synth) return;

    this.isSpeaking = true;
    this.synth.cancel(); // Cancel any pending synthesis

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.05;
    utterance.pitch = 0.98;

    if (this.pillEl) this.pillEl.classList.add('speaking');
    this.showHologramHUD('TACTICAL VOICE SYNTHESIS', text);

    const finishSpeech = () => {
      if (this.pillEl) this.pillEl.classList.remove('speaking');
      setTimeout(() => {
        this.isSpeaking = false;
        // If always-listening is active, ensure recognition continues listening
        if (this.isListeningModeActive) {
          this.updateListeningUI(true);
          this.showHologramHUD('MIC ACTIVE • ALWAYS LISTENING', 'Listening for your next command...');
        } else {
          this.hideHologramHUD(1200);
        }
      }, 400);

      if (onComplete) onComplete();
    };

    utterance.onend = finishSpeech;
    utterance.onerror = finishSpeech;

    this.synth.speak(utterance);
  }

  processCommand(rawText) {
    const originalText = rawText.trim();
    let text = originalText.toLowerCase();
    console.log(`[Voice Command Recognized]: "${originalText}"`);
    sfx.playSuccess();

    // 1. Strip optional Wake Words ("Antigravity", "Computer", "Hub", "Central Command", "Jarvis")
    const wakeWordRegex = /^(hey\s+|ok\s+|okay\s+)?(antigravity|computer|hub|central\s+command|jarvis)[,\s:]*/i;
    const hasWakeWord = wakeWordRegex.test(text);
    text = text.replace(wakeWordRegex, '').trim();

    // 2. Strip common conversational prefixes ("can you", "please", "could you", "open my", "show me my")
    text = text.replace(/^(can\s+you\s+|could\s+you\s+|please\s+|open\s+my\s+|show\s+me\s+my\s+|show\s+my\s+|open\s+the\s+|show\s+the\s+)/i, '').trim();

    // If the user ONLY said the wake word ("Antigravity" or "Computer")
    if (hasWakeWord && (text === '' || text === 'hello' || text === 'hi' || text === 'are you there')) {
      this.speak("Antigravity online. Commander, what dashboard shall I open?");
      return;
    }

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
      text.includes('sierra pines') ||
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
      text.includes('budget') ||
      text.includes('finance')
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
      text.includes('meals') ||
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

    // 6. 110th Chemical Battalion S3 Readiness & METL Matrix
    if (
      text.includes('s3') ||
      text.includes('battalion') ||
      text.includes('110th') ||
      text.includes('iron dragon') ||
      text.includes('readiness') ||
      text.includes('metl') ||
      text.includes('train pro') ||
      text.includes('training') ||
      text.includes('synergy')
    ) {
      this.speak("Opening 110th Chemical Battalion S3 Readiness and METL Proficiency Matrix.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('bns3');
      }
      return;
    }

    // 7. Return to Atomic Orbital Core
    if (
      text.includes('core') ||
      text.includes('atomic') ||
      text.includes('orbit') ||
      text.includes('hub') ||
      text.includes('home') ||
      text.includes('return') ||
      text.includes('back') ||
      text.includes('main menu')
    ) {
      this.speak("Returning to Atomic Command Core.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('core');
      }
      return;
    }

    // 8. System Status / Telemetry
    if (
      text.includes('status') ||
      text.includes('telemetry') ||
      text.includes('diagnostics') ||
      text.includes('health') ||
      text.includes('system') ||
      text.includes('report')
    ) {
      this.speak("Opening Quantum Telemetry Matrix. All orbital systems online.");
      if (this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck('telemetry');
      }
      return;
    }

    // 9. Device Aspect Ratio Presets
    if (text.includes('fold') || text.includes('z fold') || text.includes('tablet') || text.includes('inner screen')) {
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

    // 10. Fullscreen Toggle
    if (text.includes('full screen') || text.includes('fullscreen')) {
      this.speak("Toggling fullscreen display.");
      if (this.handlers.onToggleFullscreen) {
        this.handlers.onToggleFullscreen();
      }
      return;
    }

    // 11. Help / What can I say
    if (text.includes('help') || text.includes('command') || text.includes('what can i say')) {
      this.speak("You can say: Open Executive, Open Rental Ops, Open Wealth Console, Open Rainier Basecamp, Open Mackie's Board, or Open S3 Readiness.");
      return;
    }

    // Unrecognized Command
    this.speak(`Command received: "${originalText}". Please say Executive, Rental, Wealth, Basecamp, Mackie, or S3 Readiness.`);
  }

  // Voice Command Simulator dialog if mic is disabled or unsupported
  promptManualCommand() {
    const command = prompt('Enter Voice Command (e.g. "open executive dashboard", "open rental ops", "open wealth console"):');
    if (command) {
      this.processCommand(command);
    }
  }
}
