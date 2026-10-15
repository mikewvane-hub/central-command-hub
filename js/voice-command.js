/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * Voice Interactive Neural Assistant Engine
 * Full bidirectional voice commands using Web Speech API (Recognition + Synthesis)
 * Supports Wake Words ("Antigravity", "Computer", "Hub") & Direct Vocal Commands
 * Continuous Always-Listening Auto-Reconnect & Mobile/Z Fold 8 mic permission handling
 */

import { sfx } from './sound-effects.js';

export function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

export function normalizePhonetic(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/['’]s\b/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(the|a|an|my|our|open|show|go\s+to|switch\s+to|display|take\s+me\s+to)\b/g, ' ')
    .replace(/ies\b/g, 'y')
    .replace(/\bmc/g, 'mak')
    .replace(/ck|ch(?=[aeiou])/g, 'k')
    .replace(/ph/g, 'f')
    .replace(/ee|ea|ey|ie|y\b/g, 'i')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')
    .replace(/qu/g, 'kw')
    .replace(/x/g, 'ks')
    .replace(/([a-z])\1+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function maxAllowedDistance(len) {
  if (len <= 3) return 0;
  if (len <= 5) return 1;
  return 2;
}

export const VOICE_TARGETS = {
  mackie: {
    category: 'deck',
    target: 'mackie',
    speech: "Opening Mackie's Daily Board, Meal Planner and Grocery List.",
    keywords: [
      'mackie', 'mackey', 'macky', 'maki', 'makie', 'maggie', 'mickey', 'micki', 'micky', 'maxie',
      'mckee', 'mckie', 'mackay', 'makey', 'makee', 'maggy',
      'mom board', 'moms board', 'meal planner', 'meal plan', 'meal', 'meals',
      'dinner', 'lunch', 'grocery', 'groceries', 'calendar', 'calender', 'schedule', 'family calendar'
    ],
    phonetic: ['maki', 'magi', 'miki', 'makk', 'kalendar', 'grosri', 'milplan', 'mom bord']
  },
  executive: {
    category: 'deck',
    target: 'executive',
    speech: "Accessing Chief of Staff Executive Briefing.",
    keywords: [
      'executive', 'exec', 'exective', 'exacutive', 'excecutif', 'excecutive',
      'daily brief', 'daily briefing', 'briefing', 'chief of staff', 'cos', 'war room'
    ],
    phonetic: ['eksekutiv', 'eksek', 'brifing', 'chif of staf', 'war rum']
  },
  rental: {
    category: 'deck',
    target: 'rental',
    speech: "Opening Antigravity Dual-Engine Rental and Acquisition Terminal.",
    keywords: [
      'rental', 'rentals', 'reantal', 'jblm', 'jb lm', 'jay bee el em', 'joint base',
      'lewis mcchord', 'acquisition', 'antigravity rental', 'house hunting', 'sierra pines',
      'property', 'landlord', 'tenant', 'tenants', 'terminal'
    ],
    phonetic: ['rental', 'jblm', 'akwisishon', 'siera pins', 'properti', 'tenant']
  },
  financial: {
    category: 'deck',
    target: 'financial',
    speech: "Opening Financial Command Center and Wealth Console.",
    keywords: [
      'financial', 'finances', 'finance', 'financials', 'wealth', 'welth', 'console',
      'money', 'budget', 'portfolio', 'investments', 'rebalance', 'bank', 'net worth'
    ],
    phonetic: ['finanshal', 'welth', 'konsol', 'moni', 'bujet', 'portfolio']
  },
  trip: {
    category: 'deck',
    target: 'trip',
    speech: "Opening Rainier Basecamp Family Overland and Trip Planner.",
    keywords: [
      'trip', 'trips', 'trip planner', 'planner', 'planning', 'rainier', 'ranier', 'raynier',
      'mount rainier', 'basecamp', 'base camp', 'overland', 'overlanding', 'expedition',
      'camping', 'camper', 'hike', 'hiking'
    ],
    phonetic: ['ranir', 'baskamp', 'oferland', 'trip', 'planer', 'kamping']
  },
  bns3: {
    category: 'deck',
    target: 'bns3',
    speech: "Opening 110th Chemical Battalion S3 Readiness and METL Proficiency Matrix.",
    keywords: [
      's3', 's-3', 's 3', 's three', 'battalion', 'batallion', '110th', '110', 'one ten',
      'one tenth', 'iron dragon', 'iron dragons', 'readiness', 'metl', 'train pro',
      'train-pro', 'cbrn', 'chemical', 'synergy'
    ],
    phonetic: ['estri', 'bataliun', 'wanten', 'irondragon', 'redines', 'trenpro', 'sinergi']
  },
  core: {
    category: 'deck',
    target: 'core',
    speech: "Returning to Atomic Command Core.",
    keywords: [
      'core', 'atomic', 'orbit', 'orbitals', 'home', 'main menu', 'return',
      'back to orbit', 'center', 'atomic core', 'reset view'
    ],
    phonetic: ['kor', 'atomik', 'orbit', 'hom', 'riturn']
  },
  telemetry: {
    category: 'deck',
    target: 'telemetry',
    speech: "Opening Quantum Telemetry Matrix. All orbital systems online.",
    keywords: [
      'telemetry', 'telemetri', 'quantum telemetry', 'diagnostics', 'health',
      'system status', 'status report', 'all systems', 'orbit health'
    ],
    phonetic: ['telemetri', 'diagnostiks', 'kwantum', 'helth']
  },
  device_zfold: {
    category: 'device',
    target: 'zfold',
    speech: "Optimizing display layout for Galaxy Z Fold 8 inner screen.",
    keywords: ['z fold', 'zfold', 'fold 8', 'galaxy fold', 'inner screen', 'tablet mode', 'fold'],
    phonetic: ['zfold', 'fold', 'iner skrin']
  },
  device_laptop: {
    category: 'device',
    target: 'laptop',
    speech: "Switching to Laptop Widescreen display ratio.",
    keywords: ['laptop', 'desktop', 'widescreen', 'wide screen', 'monitor mode', 'wide'],
    phonetic: ['laptop', 'desktop', 'waidskrin']
  },
  device_auto: {
    category: 'device',
    target: 'auto',
    speech: "Display ratio set to auto-detect.",
    keywords: ['auto detect', 'auto mode', 'responsive mode', 'reset aspect', 'auto', 'responsive'],
    phonetic: ['oto', 'responsiv']
  },
  fullscreen: {
    category: 'action',
    target: 'fullscreen',
    speech: "Toggling fullscreen display.",
    keywords: ['full screen', 'fullscreen', 'maximize', 'toggle fullscreen'],
    phonetic: ['fulskrin', 'maksimais']
  },
  alerts: {
    category: 'alerts',
    target: 'alerts',
    speech: "Opening Tactical Alert and Action Registry. 18 active items across dashboards.",
    keywords: ['alerts', 'alert', 'notifications', 'show alerts', 'open alerts', 'what are the alerts', 'action items', 'compliance alerts', 'warnings'],
    phonetic: ['alerts', 'notifikashons', 'akshon items', 'warning']
  },
  help: {
    category: 'help',
    target: 'help',
    speech: "You can say: Open Executive, Open Rental Ops, Open Wealth Console, Open Rainier Basecamp, Open Mackie's Board, or Open S3 Readiness.",
    keywords: ['help', 'what can i say', 'voice commands', 'show commands', 'list commands'],
    phonetic: ['help', 'komands']
  }
};

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

  classifyCommand(transcript) {
    if (!transcript || typeof transcript !== 'string') return null;

    let text = transcript.toLowerCase().trim();
    // 1. Strip optional Wake Words ("Antigravity", "Computer", "Hub", "Central Command")
    const wakeWordRegex = /^(hey\s+|ok\s+|okay\s+)?(antigravity|computer|hub|central\s+command)[,\s:]*/i;
    const hasWakeWord = wakeWordRegex.test(text);
    const strippedText = text.replace(wakeWordRegex, '').trim();

    // If user ONLY said wake word
    if (hasWakeWord && (strippedText === '' || strippedText === 'hello' || strippedText === 'hi' || strippedText === 'are you there')) {
      return {
        category: 'wake',
        target: 'wake',
        speech: "Antigravity online. Ready for command."
      };
    }

    const queryText = strippedText || text;

    // Phase 1: Direct Substring / Keyword Match
    for (const [key, cmd] of Object.entries(VOICE_TARGETS)) {
      for (const kw of cmd.keywords) {
        if (queryText.includes(kw)) {
          return cmd;
        }
      }
    }

    // Phase 2: Phonetic Substring Match
    const norm = normalizePhonetic(queryText);
    for (const [key, cmd] of Object.entries(VOICE_TARGETS)) {
      for (const pt of cmd.phonetic) {
        if (norm.includes(pt)) {
          return cmd;
        }
      }
    }

    // Phase 3: Length-sensitive fuzzy word-by-word match
    const words = queryText.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 3);
    for (const word of words) {
      const stem = word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word;
      for (const [key, cmd] of Object.entries(VOICE_TARGETS)) {
        for (const kw of cmd.keywords) {
          if (kw.includes(' ')) continue;
          const maxDist = maxAllowedDistance(Math.min(stem.length, kw.length));
          if (Math.abs(stem.length - kw.length) <= maxDist && levenshteinDistance(stem, kw) <= maxDist) {
            return cmd;
          }
        }
        const normWord = normalizePhonetic(word);
        for (const pt of cmd.phonetic) {
          if (pt.includes(' ')) continue;
          const maxDist = maxAllowedDistance(Math.min(normWord.length, pt.length));
          if (Math.abs(normWord.length - pt.length) <= maxDist && levenshteinDistance(normWord, pt) <= maxDist) {
            return cmd;
          }
        }
      }
    }

    return null;
  }

  processCommand(rawText) {
    const originalText = rawText.trim();
    console.log(`[Voice Command Recognized]: "${originalText}"`);
    sfx.playSuccess();

    const cmd = this.classifyCommand(originalText);

    if (cmd) {
      this.speak(cmd.speech);

      if (cmd.category === 'deck' && this.handlers.onSelectDeck) {
        this.handlers.onSelectDeck(cmd.target);
      } else if (cmd.category === 'device' && this.handlers.onSetDeviceMode) {
        this.handlers.onSetDeviceMode(cmd.target);
      } else if (cmd.category === 'action' && cmd.target === 'fullscreen' && this.handlers.onToggleFullscreen) {
        this.handlers.onToggleFullscreen();
      } else if (cmd.category === 'alerts') {
        window.dispatchEvent(new CustomEvent('OPEN_HUB_ALERTS', { detail: { deckId: 'all' } }));
      }
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
