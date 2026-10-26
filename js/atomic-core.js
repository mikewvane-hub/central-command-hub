/**
 * ANTIGRAVITY CENTRAL COMMAND HUB
 * 3D Quantum Atomic Visualizer Engine
 * Interactive Three.js Bohr-Quantum Orbital Core with raycasting and
 * 3D-projected floating circular dashboard pods that display the actual dashboards in orbit!
 */

import { sfx } from './sound-effects.js';

const SPHERE_VISUAL_SVGS = {
  executive: `
    <div class="circle-graphic-container shape-graphic-container circle-graphic-executive">
      <svg viewBox="0 0 148 148" class="circle-svg-art shape-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-star-point" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stop-color="#e0f2fe"/>
            <stop offset="40%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0369a1"/>
          </radialGradient>
          <filter id="glow-star-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.0" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
          <filter id="glow-star-sharp" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Outer 8-Point Tactical Commander Star (Rotates Clockwise) -->
        <g class="rotating-star-cw" filter="url(#glow-star-cyan)">
          <!-- Star Silhouette: 8 Points with Neon Cyan Stroke & Deep Holographic Core -->
          <polygon points="74,10 89,45 124,24 103,59 138,74 103,89 124,124 89,103 74,138 59,103 24,124 45,89 10,74 45,59 24,24 59,45"
                   fill="rgba(3, 7, 18, 0.90)" stroke="#00f0ff" stroke-width="2.4" stroke-linejoin="round"/>

          <!-- Faceted Shading on Star Points -->
          <polygon points="74,74 74,10 89,45" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 74,10 59,45" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 124,24 103,59" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 124,24 89,45" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 138,74 103,89" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 138,74 103,59" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 124,124 89,103" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 124,124 103,89" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 74,138 59,103" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 74,138 89,103" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 24,124 45,89" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 24,124 59,103" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 10,74 45,59" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 10,74 45,89" fill="rgba(2, 132, 199, 0.22)"/>
          <polygon points="74,74 24,24 59,45" fill="rgba(56, 189, 248, 0.40)"/>
          <polygon points="74,74 24,24 45,59" fill="rgba(2, 132, 199, 0.22)"/>

          <!-- Cardinal Ray Lines -->
          <line x1="74" y1="12" x2="74" y2="136" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="2,3" opacity="0.65"/>
          <line x1="12" y1="74" x2="136" y2="74" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="2,3" opacity="0.65"/>
          <line x1="26" y1="26" x2="122" y2="122" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="2,3" opacity="0.45"/>
          <line x1="26" y1="122" x2="122" y2="26" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="2,3" opacity="0.45"/>

          <!-- Node Orbs on 8 Star Tips -->
          <circle cx="74" cy="10" r="2.8" fill="#e0f2fe"/>
          <circle cx="124" cy="24" r="2.2" fill="#38bdf8"/>
          <circle cx="138" cy="74" r="2.8" fill="#e0f2fe"/>
          <circle cx="124" cy="124" r="2.2" fill="#38bdf8"/>
          <circle cx="74" cy="138" r="2.8" fill="#e0f2fe"/>
          <circle cx="24" cy="124" r="2.2" fill="#38bdf8"/>
          <circle cx="10" cy="74" r="2.8" fill="#e0f2fe"/>
          <circle cx="24" cy="24" r="2.2" fill="#38bdf8"/>
        </g>

        <!-- Inner 8-Point Diamond Star (Counter-Rotating) -->
        <g class="rotating-star-ccw" filter="url(#glow-star-sharp)">
          <polygon points="74,38 84,64 110,74 84,84 74,110 64,84 38,74 64,64"
                   fill="url(#grad-star-point)" stroke="#ffffff" stroke-width="1.8" opacity="0.95"/>
          <polygon points="74,48 80,68 100,74 80,80 74,100 68,80 48,74 68,68"
                   fill="#020617" stroke="#38bdf8" stroke-width="1"/>
        </g>

        <!-- Center Command Core Iris -->
        <circle cx="74" cy="74" r="8.5" fill="#020617" stroke="#00f0ff" stroke-width="2"/>
        <circle cx="74" cy="74" r="4.2" fill="#38bdf8"/>
        <circle cx="74" cy="74" r="1.8" fill="#ffffff"/>
      </svg>
    </div>
  `,
  rental: `
    <div class="circle-graphic-container shape-graphic-container circle-graphic-rental">
      <svg viewBox="0 0 148 148" class="circle-svg-art shape-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-house-facade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0369a1" stop-opacity="0.95"/>
            <stop offset="40%" stop-color="#0284c7" stop-opacity="0.90"/>
            <stop offset="80%" stop-color="#075985" stop-opacity="0.92"/>
            <stop offset="100%" stop-color="#082f49" stop-opacity="0.98"/>
          </linearGradient>
          <filter id="glow-sky-house" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.6" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- House Silhouette: Gabled Peak, Chimney, Overhang Eaves, Walls & Foundation -->
        <g filter="url(#glow-sky-house)">
          <!-- Chimney on Roof -->
          <rect x="96" y="24" width="14" height="26" fill="#082f49" stroke="#38bdf8" stroke-width="1.8"/>
          <rect x="94" y="21" width="18" height="4" rx="1" fill="#38bdf8"/>

          <!-- Main House Polygon (Gabled Roof to Walls) -->
          <polygon points="74,14 134,60 124,60 124,132 24,132 24,60 14,60"
                   fill="url(#grad-house-facade)" stroke="#38bdf8" stroke-width="2.5" stroke-linejoin="round"/>

          <!-- Roof Eaves Trim Fascia Line -->
          <polyline points="14,60 74,14 134,60" fill="none" stroke="#7dd3fc" stroke-width="3" stroke-linecap="round"/>

          <!-- Blueprint Grid Lines across Front Facade -->
          <g stroke="#0284c7" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.45">
            <line x1="24" y1="76" x2="124" y2="76"/>
            <line x1="24" y1="96" x2="124" y2="96"/>
            <line x1="24" y1="116" x2="124" y2="116"/>
            <line x1="48" y1="60" x2="48" y2="132"/>
            <line x1="74" y1="46" x2="74" y2="132"/>
            <line x1="100" y1="60" x2="100" y2="132"/>
          </g>

          <!-- Upper Gabled Attic Window -->
          <polygon points="74,32 86,46 62,46" fill="rgba(56, 189, 248, 0.4)" stroke="#7dd3fc" stroke-width="1.5"/>
          <line x1="74" y1="32" x2="74" y2="46" stroke="#7dd3fc" stroke-width="1"/>

          <!-- Dual 4-Pane Illuminated Windows -->
          <!-- Left Window -->
          <rect x="34" y="74" width="22" height="22" rx="2" fill="rgba(14, 165, 233, 0.25)" stroke="#7dd3fc" stroke-width="1.8"/>
          <line x1="45" y1="74" x2="45" y2="96" stroke="#7dd3fc" stroke-width="1.2"/>
          <line x1="34" y1="85" x2="56" y2="85" stroke="#7dd3fc" stroke-width="1.2"/>
          <!-- Right Window -->
          <rect x="92" y="74" width="22" height="22" rx="2" fill="rgba(14, 165, 233, 0.25)" stroke="#7dd3fc" stroke-width="1.8"/>
          <line x1="103" y1="74" x2="103" y2="96" stroke="#7dd3fc" stroke-width="1.2"/>
          <line x1="92" y1="85" x2="114" y2="85" stroke="#7dd3fc" stroke-width="1.2"/>

          <!-- Center Arched Entry Doorway -->
          <path d="M62,132 L62,98 Q62,90 74,90 Q86,90 86,98 L86,132 Z" fill="#082f49" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="81" cy="112" r="1.8" fill="#fbbf24"/>
          <!-- Welcome Porch Light -->
          <circle cx="74" cy="84" r="2.5" fill="#fef08a" stroke="#fbbf24" stroke-width="1"/>
        </g>

        <!-- Rotating Blueprint Radar Beam Inside House -->
        <g class="rotating-house-radar">
          <line x1="74" y1="76" x2="104" y2="58" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.8"/>
          <circle cx="104" cy="58" r="2" fill="#7dd3fc"/>
        </g>
      </svg>
    </div>
  `,
  financial: `
    <div class="circle-graphic-container shape-graphic-container circle-graphic-financial">
      <svg viewBox="0 0 148 148" class="circle-svg-art shape-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-diamond-table" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0.95"/>
            <stop offset="50%" stop-color="#7c3aed" stop-opacity="0.90"/>
            <stop offset="100%" stop-color="#4c1d95" stop-opacity="0.98"/>
          </linearGradient>
          <linearGradient id="grad-diamond-facet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c084fc" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#2e1065" stop-opacity="0.85"/>
          </linearGradient>
          <filter id="glow-purple-gem" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.8" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Faceted Brilliant Diamond Gem Silhouette -->
        <g filter="url(#glow-purple-gem)">
          <!-- Outer Gem Polygon Silhouette -->
          <polygon points="44,18 104,18 136,56 74,136 12,56"
                   fill="url(#grad-diamond-table)" stroke="#c084fc" stroke-width="2.6" stroke-linejoin="round"/>

          <!-- Crown Facets (Top Section) -->
          <polygon points="44,18 104,18 89,56 59,56" fill="rgba(192, 132, 252, 0.35)" stroke="#e9d5ff" stroke-width="1.4"/>
          <polygon points="44,18 59,56 12,56" fill="rgba(147, 51, 234, 0.45)" stroke="#c084fc" stroke-width="1.4"/>
          <polygon points="104,18 136,56 89,56" fill="rgba(126, 34, 206, 0.55)" stroke="#c084fc" stroke-width="1.4"/>

          <!-- Girdle Separator Line -->
          <line x1="12" y1="56" x2="136" y2="56" stroke="#f3e8ff" stroke-width="2"/>

          <!-- Pavilion Facets (Bottom Inverted Cone to Culet: 74,136) -->
          <polygon points="59,56 89,56 74,136" fill="url(#grad-diamond-facet)" stroke="#c084fc" stroke-width="1.6"/>
          <polygon points="12,56 59,56 74,136" fill="rgba(76, 29, 149, 0.65)" stroke="#a855f7" stroke-width="1.4"/>
          <polygon points="136,56 89,56 74,136" fill="rgba(46, 16, 101, 0.85)" stroke="#a855f7" stroke-width="1.4"/>

          <!-- Luminous Currency Core in Crystal Center -->
          <circle cx="74" cy="74" r="14" fill="#1e1b4b" stroke="#34d399" stroke-width="1.8"/>
          <text x="74" y="80" text-anchor="middle" fill="#34d399" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="900" filter="drop-shadow(0 0 6px #10b981)">$</text>
        </g>

        <!-- Rotating Diamond Sparkle / Refraction Light Rays -->
        <g class="rotating-gem-sparkle" filter="url(#glow-purple-gem)">
          <line x1="74" y1="46" x2="74" y2="102" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
          <line x1="46" y1="74" x2="102" y2="74" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
          <line x1="54" y1="54" x2="94" y2="94" stroke="#c084fc" stroke-width="1.1" stroke-linecap="round"/>
          <line x1="54" y1="94" x2="94" y2="54" stroke="#c084fc" stroke-width="1.1" stroke-linecap="round"/>
          <circle cx="74" cy="74" r="2.5" fill="#ffffff"/>
        </g>
      </svg>
    </div>
  `,
  trip: `
    <div class="circle-graphic-container shape-graphic-container circle-graphic-trip">
      <svg viewBox="0 0 148 148" class="circle-svg-art shape-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-mountain-face" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#047857" stop-opacity="0.95"/>
            <stop offset="35%" stop-color="#065f46" stop-opacity="0.90"/>
            <stop offset="70%" stop-color="#064e3b" stop-opacity="0.92"/>
            <stop offset="100%" stop-color="#022c22" stop-opacity="0.98"/>
          </linearGradient>
          <linearGradient id="grad-snowcap" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="60%" stop-color="#ecfdf5"/>
            <stop offset="100%" stop-color="#a7f3d0"/>
          </linearGradient>
          <filter id="glow-emerald-mountain" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.8" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Mount Rainier Mountain Peak Silhouette -->
        <g filter="url(#glow-emerald-mountain)">
          <!-- Main Rainier Mountain Facet Body -->
          <polygon points="74,18 90,48 104,72 120,96 138,128 10,128 28,96 44,72 58,48"
                   fill="url(#grad-mountain-face)" stroke="#10b981" stroke-width="2.6" stroke-linejoin="round"/>

          <!-- Shaded East Face Crags (Diagonal facet shadow) -->
          <polygon points="74,18 78,54 86,76 80,102 88,128 138,128 120,96 104,72 90,48"
                   fill="rgba(2, 44, 34, 0.55)"/>

          <!-- Central Ridge Spine from Summit to Base -->
          <polyline points="74,18 78,54 86,76 80,102 88,128" fill="none" stroke="#34d399" stroke-width="2.2" stroke-linecap="round"/>

          <!-- Left Shoulder Ridge -->
          <polyline points="58,48 50,74 42,98 34,128" fill="none" stroke="#059669" stroke-width="1.6" stroke-dasharray="3,2"/>

          <!-- Right Shoulder Ridge -->
          <polyline points="90,48 98,74 108,98 116,128" fill="none" stroke="#059669" stroke-width="1.6" stroke-dasharray="3,2"/>

          <!-- Glaciated Snowcap (Mt. Rainier Summit Glacier) -->
          <polygon points="74,18 84,42 78,48 74,44 70,48 64,42" fill="url(#grad-snowcap)" stroke="#ffffff" stroke-width="1.5"/>
          <polygon points="74,18 78,38 74,44 70,38" fill="#ffffff"/>

          <!-- Topographic Elevation Contour Lines -->
          <path d="M36,92 Q74,80 112,92" fill="none" stroke="#34d399" stroke-width="0.8" opacity="0.6"/>
          <path d="M46,74 Q74,64 102,74" fill="none" stroke="#34d399" stroke-width="0.8" opacity="0.6"/>
          <path d="M56,56 Q74,48 92,56" fill="none" stroke="#34d399" stroke-width="0.8" opacity="0.6"/>

          <!-- Evergreen Pines Forest Silhouette along Base -->
          <g fill="#022c22" stroke="#059669" stroke-width="0.6">
            <polygon points="18,128 22,112 26,128"/>
            <polygon points="26,128 31,108 36,128"/>
            <polygon points="36,128 41,114 46,128"/>
            <polygon points="102,128 107,114 112,128"/>
            <polygon points="112,128 117,108 122,128"/>
            <polygon points="122,128 126,112 130,128"/>
          </g>
        </g>

        <!-- Rotating Summit Beacon / Polar Star (Centering at Summit Peak: 74, 18) -->
        <g class="rotating-mountain-beacon" filter="url(#glow-emerald-mountain)">
          <line x1="74" y1="4" x2="74" y2="32" stroke="#6ee7b7" stroke-width="1.5"/>
          <line x1="60" y1="18" x2="88" y2="18" stroke="#6ee7b7" stroke-width="1.5"/>
          <line x1="64" y1="8" x2="84" y2="28" stroke="#34d399" stroke-width="0.8"/>
          <line x1="64" y1="28" x2="84" y2="8" stroke="#34d399" stroke-width="0.8"/>
        </g>
        <circle cx="74" cy="18" r="3.2" fill="#ffffff" stroke="#10b981" stroke-width="1.5"/>
      </svg>
    </div>
  `,
  mackie: `
    <div class="circle-graphic-container shape-graphic-container circle-graphic-mackie">
      <svg viewBox="0 0 148 148" class="circle-svg-art shape-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-shield-face" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#9f1239" stop-opacity="0.95"/>
            <stop offset="40%" stop-color="#881337" stop-opacity="0.92"/>
            <stop offset="80%" stop-color="#4c0519" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0.98"/>
          </linearGradient>
          <filter id="glow-rose-shield" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.6" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Heraldic Tactical Mission Shield Silhouette -->
        <g filter="url(#glow-rose-shield)">
          <!-- Outer Shield Polygon Silhouette -->
          <path d="M30,16 L118,16 L130,28 L130,78 Q130,112 74,136 Q18,112 18,78 L18,28 Z"
                fill="url(#grad-shield-face)" stroke="#f43f5e" stroke-width="2.6" stroke-linejoin="round"/>

          <!-- Inner Inset Bevel Contour -->
          <path d="M34,22 L114,22 L124,32 L124,76 Q124,106 74,128 Q24,106 24,76 L24,32 Z"
                fill="rgba(76, 5, 25, 0.45)" stroke="#fb7185" stroke-width="1.2"/>

          <!-- Top Header Mission Bar with Calendar Rings -->
          <rect x="24" y="22" width="100" height="14" fill="#be123c" stroke="#f43f5e" stroke-width="1"/>
          <rect x="38" y="14" width="4" height="10" rx="2" fill="#fecdd3"/>
          <rect x="72" y="14" width="4" height="10" rx="2" fill="#fecdd3"/>
          <rect x="106" y="14" width="4" height="10" rx="2" fill="#fecdd3"/>

          <!-- Chore & Task Completion Rows -->
          <!-- Row 1 -->
          <rect x="36" y="46" width="12" height="12" rx="2.5" fill="#0f172a" stroke="#34d399" stroke-width="1.5"/>
          <path d="M39,52 L43,56 L52,47" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"/>
          <line x1="56" y1="52" x2="110" y2="52" stroke="#fda4af" stroke-width="2" stroke-linecap="round"/>

          <!-- Row 2 -->
          <rect x="36" y="66" width="12" height="12" rx="2.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <path d="M39,72 L43,76 L52,67" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          <line x1="56" y1="72" x2="98" y2="72" stroke="#fda4af" stroke-width="2" stroke-linecap="round"/>

          <!-- Row 3 -->
          <rect x="36" y="86" width="12" height="12" rx="2.5" fill="#0f172a" stroke="#fbbf24" stroke-width="1.5"/>
          <path d="M39,92 L43,96 L52,87" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
          <line x1="56" y1="92" x2="88" y2="92" stroke="#fda4af" stroke-width="2" stroke-linecap="round"/>

          <!-- Luminous Star / Heart Crest at Bottom Center -->
          <circle cx="74" cy="114" r="8" fill="#be123c" stroke="#fecdd3" stroke-width="1.5"/>
          <polygon points="74,108 76,112 80,113 77,116 78,120 74,118 70,120 71,116 68,113 72,112" fill="#fef08a"/>
        </g>

        <!-- Rotating Tactical Reticle / Star Compass -->
        <g class="rotating-shield-reticle" filter="url(#glow-rose-shield)">
          <circle cx="74" cy="74" r="32" fill="none" stroke="#f43f5e" stroke-width="0.75" stroke-dasharray="3,4" opacity="0.45"/>
          <line x1="74" y1="38" x2="74" y2="44" stroke="#fb7185" stroke-width="1.5"/>
          <line x1="74" y1="104" x2="74" y2="110" stroke="#fb7185" stroke-width="1.5"/>
          <line x1="38" y1="74" x2="44" y2="74" stroke="#fb7185" stroke-width="1.5"/>
          <line x1="104" y1="74" x2="110" y2="74" stroke="#fb7185" stroke-width="1.5"/>
        </g>
      </svg>
    </div>
  `,
  garage: `
    <div class="circle-graphic-container shape-graphic-container circle-graphic-garage">
      <svg viewBox="0 0 148 148" class="circle-svg-art shape-svg-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-tire-rubber" cx="50%" cy="50%" r="50%">
            <stop offset="35%" stop-color="#0f172a"/>
            <stop offset="70%" stop-color="#1e293b"/>
            <stop offset="90%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#020617"/>
          </radialGradient>
          <radialGradient id="grad-rim-metal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
            <stop offset="55%" stop-color="#78350f" stop-opacity="0.80"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
          </radialGradient>
          <filter id="glow-amber-tire" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Rotating Off-Road Tire & Wheel Assembly -->
        <g class="rotating-tire-assembly" filter="url(#glow-amber-tire)">
          <!-- 16 External Mud-Terrain Tread Lugs (Distinct knobby teeth protruding from perimeter) -->
          <g fill="#1e293b" stroke="#f59e0b" stroke-width="1.8">
            <polygon points="69,8 79,8 78,20 70,20"/>
            <polygon points="90,13 99,18 95,28 87,24"/>
            <polygon points="109,24 117,32 110,40 102,33"/>
            <polygon points="123,43 129,52 120,58 115,50"/>
            <polygon points="128,69 128,79 116,78 116,70"/>
            <polygon points="123,96 129,87 115,89 120,81"/>
            <polygon points="109,115 117,107 102,106 110,99"/>
            <polygon points="90,126 99,121 87,115 95,111"/>
            <polygon points="69,129 79,129 78,117 70,117"/>
            <polygon points="49,126 40,121 44,111 52,115"/>
            <polygon points="30,115 22,107 29,99 37,106"/>
            <polygon points="16,96 10,87 21,81 26,89"/>
            <polygon points="11,69 11,79 23,78 23,70"/>
            <polygon points="16,43 10,52 26,50 21,58"/>
            <polygon points="30,24 22,32 37,33 29,40"/>
            <polygon points="49,13 40,18 52,24 44,28"/>
          </g>

          <!-- Main Tire Carcass -->
          <circle cx="74" cy="74" r="56" fill="url(#grad-tire-rubber)" stroke="#f59e0b" stroke-width="2.5"/>
          <circle cx="74" cy="74" r="48" fill="none" stroke="#d97706" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6"/>

          <!-- Beadlock Ring with 12 Hex Bolts -->
          <circle cx="74" cy="74" r="42" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
          <g fill="#fbbf24" stroke="#78350f" stroke-width="0.5">
            <circle cx="74" cy="33" r="2.2"/>
            <circle cx="94" cy="38" r="2.2"/>
            <circle cx="109" cy="53" r="2.2"/>
            <circle cx="115" cy="74" r="2.2"/>
            <circle cx="109" cy="95" r="2.2"/>
            <circle cx="94" cy="110" r="2.2"/>
            <circle cx="74" cy="115" r="2.2"/>
            <circle cx="54" cy="110" r="2.2"/>
            <circle cx="39" cy="95" r="2.2"/>
            <circle cx="33" cy="74" r="2.2"/>
            <circle cx="39" cy="53" r="2.2"/>
            <circle cx="54" cy="38" r="2.2"/>
          </g>

          <!-- Alloy Rim Well -->
          <circle cx="74" cy="74" r="34" fill="url(#grad-rim-metal)" stroke="#fbbf24" stroke-width="1.5"/>

          <!-- Crossed Mechanic Open-Ended Wrenches Across Center Hub -->
          <g stroke="#fbbf24" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
            <!-- Wrench 1 (Top-Left to Bottom-Right) -->
            <line x1="50" y1="50" x2="98" y2="98"/>
            <path d="M44,46 L50,40 L56,46 L52,50 L48,46 Z" fill="#0f172a"/>
            <path d="M92,94 L98,100 L104,94 L100,90 L96,94 Z" fill="#0f172a"/>

            <!-- Wrench 2 (Top-Right to Bottom-Left) -->
            <line x1="98" y1="50" x2="50" y2="98"/>
            <path d="M94,44 L100,50 L94,56 L90,52 L94,48 Z" fill="#0f172a"/>
            <path d="M46,92 L40,98 L46,104 L50,100 L46,96 Z" fill="#0f172a"/>
          </g>

          <!-- Center Hex Axle Hub -->
          <polygon points="74,62 84,68 84,80 74,86 64,80 64,68" fill="#d97706" stroke="#fef3c7" stroke-width="1.8"/>
          <circle cx="74" cy="74" r="4.5" fill="#0f172a" stroke="#fbbf24" stroke-width="1"/>
          <circle cx="74" cy="74" r="2" fill="#ffffff"/>
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
    this.sidebarHoveredDeck = null;
    this.activeDeckId = 'core';
    this.sidebarWidth = typeof window !== 'undefined' && window.innerWidth >= 1400 ? 380 : 0;
    this.currentViewOffsetX = this.sidebarWidth > 0 ? (this.sidebarWidth / 2) : 0;
    this.targetViewOffsetX = this.currentViewOffsetX;

    const resolveCloudUrl = (key, defaultRelPath) => {
      try {
        const val = localStorage.getItem(key);
        if (key === 'hub_url_garage') {
          if (!val || val.includes('localhost') || val.includes('127.0.0.1') || !val.includes('v=40.0')) {
            localStorage.setItem('hub_url_garage', './dashboards/garage/index.html?v=40.0');
            return './dashboards/garage/index.html?v=40.0';
          }
          return val;
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
        speed: 0.35,
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
        speed: 0.30,
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
        speed: 0.25,
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
        speed: 0.20,
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
        speed: 0.16,
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
        speed: 0.13,
        angle: 5.6,
        inclination: { x: -0.34, y: 0.42, z: -0.18 },
        color: 0xf59e0b,
        glowHex: '#f59e0b',
        url: resolveCloudUrl('hub_url_garage', './dashboards/garage/index.html?v=40.0'),
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
      // 🛻 3D Off-Road Tire with Outer Tread Lugs & Beadlock Wheel
      const shape = new THREE.Shape();
      const outerR = 0.54;
      const lugH = 0.10;
      const segments = 16;
      for (let i = 0; i < segments; i++) {
        const a1 = (i / segments) * Math.PI * 2;
        const a2 = ((i + 0.5) / segments) * Math.PI * 2;
        const a3 = ((i + 1.0) / segments) * Math.PI * 2;
        if (i === 0) shape.moveTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
        shape.lineTo(Math.cos(a1) * (outerR + lugH), Math.sin(a1) * (outerR + lugH));
        shape.lineTo(Math.cos(a2) * (outerR + lugH), Math.sin(a2) * (outerR + lugH));
        shape.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
        shape.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
      }
      shape.closePath();
      const hole = new THREE.Path();
      hole.absarc(0, 0, 0.28, 0, Math.PI * 2, true);
      shape.holes.push(hole);
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.24,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.02,
        bevelThickness: 0.02
      });
      geo.center();
    } else if (deckId === 'rental') {
      // 🏡 3D Architectural Gabled House
      const shape = new THREE.Shape();
      shape.moveTo(-0.46, -0.40);
      shape.lineTo(0.46, -0.40);
      shape.lineTo(0.46, 0.14);
      shape.lineTo(0.56, 0.14); // Eave overhang
      shape.lineTo(0, 0.60);     // Gabled peak
      shape.lineTo(-0.56, 0.14); // Eave overhang
      shape.lineTo(-0.46, 0.14);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.42,
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
      shape.moveTo(-0.62, -0.42);
      shape.lineTo(-0.25, 0.12);
      shape.lineTo(0, 0.62); // Summit
      shape.lineTo(0.28, 0.10);
      shape.lineTo(0.62, -0.42);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.34,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03
      });
      geo.center();
    } else if (deckId === 'financial') {
      // 📈 3D Faceted Wealth Gem / Brilliant Diamond
      geo = new THREE.OctahedronGeometry(0.56, 0);
      geo.scale(1.15, 1.45, 1.15);
    } else if (deckId === 'executive') {
      // 🎖️ 3D Tactical 8-Point Commander Star
      const shape = new THREE.Shape();
      const points = 8;
      const outerR = 0.60;
      const innerR = 0.25;
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
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02
      });
      geo.center();
    } else if (deckId === 'mackie') {
      // 🗓️ 3D Tactical Heraldic Shield
      const shape = new THREE.Shape();
      shape.moveTo(-0.44, 0.52);
      shape.lineTo(0.44, 0.52);
      shape.lineTo(0.48, 0.36);
      shape.lineTo(0.48, -0.06);
      shape.quadraticCurveTo(0.48, -0.46, 0, -0.60);
      shape.quadraticCurveTo(-0.48, -0.46, -0.48, -0.06);
      shape.lineTo(-0.48, 0.36);
      shape.closePath();
      geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.20,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.025,
        bevelThickness: 0.025
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

    // Dynamic telemetry & status bar synchronization
    const activeCount = this.dashboards.length;
    const topMetric = document.getElementById('tactical-cores-count');
    if (topMetric) topMetric.textContent = `${activeCount} ACTIVE CORES`;
    const bottomStatus = document.getElementById('orbital-status-pill-text');
    if (bottomStatus) {
      bottomStatus.textContent = `${activeCount} ORBITAL SHAPES ACTIVE • PULSING SHAPES INDICATE ACTIVE ALERTS / NOTIFICATIONS`;
    }
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
      circleEl.className = `orbiting-dashboard-circle shape-node shape-${dash.id}`;
      circleEl.dataset.deck = dash.id;
      circleEl.style.setProperty('--orbit-color', dash.glowHex);

      const visualSVG = SPHERE_VISUAL_SVGS[dash.id] || `
        <div class="circle-fallback-view">
          <div class="circle-fallback-icon">${dash.icon}</div>
          <div class="circle-fallback-code">${dash.code}</div>
        </div>
      `;

      circleEl.innerHTML = `
        <div class="circle-inner-portal shape-inner-portal">
          <div class="circle-orbit-index shape-orbit-index">${dash.orbitTag}</div>
          <div class="circle-preview-viewport shape-preview-viewport">
            ${visualSVG}
          </div>
          <div class="circle-hud-badge shape-hud-badge">
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
    this.sidebarHoveredDeck = null;
        }
      });

      circleEl.addEventListener('touchstart', () => {
        this.hoveredDeck = dash.id;
      }, { passive: true });

      circleEl.addEventListener('touchend', () => {
        setTimeout(() => {
          if (this.hoveredDeck === dash.id) {
            this.hoveredDeck = null;
    this.sidebarHoveredDeck = null;
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
    this.sidebarHoveredDeck = deckId;
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
    if (this.sidebarHoveredDeck === deckId) {
      this.sidebarHoveredDeck = null;
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

  clearAllPulseSpheres() {
    this.sidebarHoveredDeck = null;
    this.electrons.forEach(el => {
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
    });
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
    if (!this.lastTime) this.lastTime = time;
    let delta = time - this.lastTime;
    this.lastTime = time;
    if (delta > 0.1) delta = 0.1;
    if (delta < 0.0005) delta = 0.0005;
    const timeScale = delta * 60.0; // 1.0 baseline at 60 FPS

    // Smooth view offset interpolation for sidebar transitions
    if (Math.abs(this.targetViewOffsetX - this.currentViewOffsetX) > 0.15) {
      this.currentViewOffsetX += (this.targetViewOffsetX - this.currentViewOffsetX) * Math.min(1.0, 0.12 * timeScale);
      this.applyViewOffset();
    }

    // Constant slow elegant rotation of the atomic structure itself when user is not dragging
    if (!this.isDragging) {
      this.targetRotation.y += 0.0024 * timeScale;
      this.targetRotation.x = 0.22 + Math.sin(time * 0.35) * 0.04;
    }

    // Smooth drag / rotation interpolation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * Math.min(1.0, 0.08 * timeScale);
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * Math.min(1.0, 0.08 * timeScale);

    if (this.orbitalGroup) {
      this.orbitalGroup.rotation.x = this.currentRotation.x;
      this.orbitalGroup.rotation.y = this.currentRotation.y;
    }

    // Spin Nucleus
    if (this.nucleusGroup) {
      this.nucleusGroup.rotation.y += 0.015 * timeScale;
      this.nucleusGroup.rotation.z += 0.008 * timeScale;
    }

    if (this.outerNucleusMesh) {
      this.outerNucleusMesh.rotation.y -= 0.02 * timeScale;
      const pulse = 1 + Math.sin(time * 3) * 0.08;
      this.outerNucleusMesh.scale.set(pulse, pulse, pulse);
    }

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight - 70);
    const worldVec = new THREE.Vector3();

    // Update Electron Positions along their Orbits & Project 3D circles to screen
    this.electrons.forEach((el) => {
      const dash = el.dash;
      const isCanvasHovered = (this.hoveredDeck === dash.id);
      const isSidebarHovered = (this.sidebarHoveredDeck === dash.id);
      // Direct mouse hover on canvas gently slows to 0.45x; sidebar hover highlights without freezing the orbit!
      const speedMultiplier = isCanvasHovered ? 0.45 : 1.0;
      el.currentAngle += 0.016 * dash.speed * speedMultiplier * timeScale;
      
      const stretchX = dash.horizontalStretch || 1.4;
      const x = Math.cos(el.currentAngle) * (dash.orbitRadius * stretchX);
      const z = Math.sin(el.currentAngle) * dash.orbitRadius;
      el.mesh.position.set(x, 0, z);

      // Spin the custom 3D domain shape (wrench, house, mountain, gem, star, calendar)
      el.mesh.rotation.y += 0.02 * timeScale;
      el.mesh.rotation.x += 0.01 * timeScale;
      el.mesh.rotation.z += 0.012 * timeScale;

      // Spin the glow
      el.glowMesh.rotation.y += 0.04 * timeScale;
      el.glowMesh.rotation.x += 0.02 * timeScale;

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
          // Keep ALL 6 spheres at uniform scale; slightly expand if hovered
          const isHovered = isCanvasHovered || isSidebarHovered;
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
