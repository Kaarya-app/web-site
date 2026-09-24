import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/videos');
const TMP_DIR = path.resolve('/tmp/kaarya-video-frames');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

console.log('Generating high-resolution Foundry Industrial SVG scenes...');

// Common SVG styles & tokens
const commonStyles = `
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070c18" />
      <stop offset="50%" stop-color="#0b1326" />
      <stop offset="100%" stop-color="#0f1a34" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <style>
    .font-sans { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace, monospace; }
    .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; font-weight: 700; }
  </style>
`;

// Scene 1: Title & The Indian Manufacturing Reality
const scene1Svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  ${commonStyles}
  <rect width="1920" height="1080" fill="url(#bgGrad)" />
  
  <!-- Subtle Grid lines -->
  <g stroke="#1a2540" stroke-width="1" opacity="0.6">
    <line x1="160" y1="0" x2="160" y2="1080" />
    <line x1="960" y1="0" x2="960" y2="1080" />
    <line x1="1760" y1="0" x2="1760" y2="1080" />
    <line x1="0" y1="120" x2="1920" y2="120" />
    <line x1="0" y1="960" x2="1920" y2="960" />
  </g>

  <!-- Top Status Strip -->
  <rect x="160" y="60" width="1600" height="48" rx="6" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
  <circle cx="195" cy="84" r="6" fill="#22c55e" />
  <text x="215" y="90" fill="#94a3b8" class="font-mono" font-size="16" font-weight="600">🇮🇳 100% MADE IN INDIA • AIR-GAPPED MANUFACTURING OPERATIONS MANAGEMENT • SINGLE BINARY</text>
  <text x="1600" y="90" fill="#38bdf8" class="font-mono" font-size="16" font-weight="700">IATF 16949 &amp; AS9100 READY</text>

  <!-- Hero Content -->
  <g transform="translate(160, 220)">
    <!-- Badge -->
    <rect x="0" y="0" width="110" height="42" rx="6" fill="#2563eb" />
    <text x="55" y="27" text-anchor="middle" fill="#ffffff" class="font-display" font-size="20">कार्य</text>
    <text x="130" y="29" fill="#f8fafc" class="font-display" font-size="36" letter-spacing="2">KAARYA</text>
    <text x="310" y="27" fill="#64748b" class="font-mono" font-size="20">| v1.0 Production Platform</text>

    <!-- Headline -->
    <text x="0" y="115" fill="#f1f5f9" class="font-display" font-size="64" font-weight="800" line-height="1.2">
      OEE, Downtime, Traceability &amp; Shift Dossiers
    </text>
    <text x="0" y="185" fill="#38bdf8" class="font-display" font-size="52" font-weight="700">
      Deployed on Your Factory LAN in 4 Hours.
    </text>

    <!-- Problem / Hook Box -->
    <rect x="0" y="240" width="1020" height="230" rx="12" fill="#131c31" stroke="#2d3d5f" stroke-width="2" />
    <text x="40" y="290" fill="#fbbf24" class="font-mono" font-size="18" font-weight="700">THE INDIAN SHOPFLOOR PROBLEM TODAY:</text>
    <text x="40" y="335" fill="#cbd5e1" class="font-sans" font-size="22" line-height="34">
      • 85% of Indian CNC job shops run on spiral notebooks, whiteboards, and WhatsApp groups.
    </text>
    <text x="40" y="380" fill="#cbd5e1" class="font-sans" font-size="22">
      • Unrecorded micro-stoppages cause silent losses of <tspan fill="#ef4444" font-weight="bold">₹2.4 Lakhs/machine/year</tspan>.
    </text>
    <text x="40" y="425" fill="#cbd5e1" class="font-sans" font-size="22">
      • Foreign MES costs $400/mo, requires internet cables, and lacks Hindi/Marathi operator UI.
    </text>

    <!-- Metrics strip on Right -->
    <g transform="translate(1080, 0)">
      <rect x="0" y="0" width="520" height="470" rx="12" fill="#111827" stroke="#2a3854" stroke-width="2" />
      <rect x="0" y="0" width="520" height="50" rx="12" fill="#1e293b" />
      <circle cx="30" cy="25" r="7" fill="#ef4444" />
      <circle cx="52" cy="25" r="7" fill="#f59e0b" />
      <circle cx="74" cy="25" r="7" fill="#10b981" />
      <text x="100" y="31" fill="#94a3b8" class="font-mono" font-size="16">kaarya-node-01 ~ live telemetry</text>

      <text x="40" y="100" fill="#94a3b8" class="font-mono" font-size="16">$ kaarya status --live</text>
      <text x="40" y="135" fill="#10b981" class="font-mono" font-size="18">[OK] 12 CNC Machines Connected</text>
      <text x="40" y="170" fill="#38bdf8" class="font-mono" font-size="18">[OK] Modbus TCP &amp; OPC UA Active (14ms)</text>
      <text x="40" y="205" fill="#a855f7" class="font-mono" font-size="18">[OK] Embedded SQLite WAL Mode Sync</text>

      <line x1="40" y1="235" x2="480" y2="235" stroke="#334155" stroke-width="1.5" />
      
      <text x="40" y="280" fill="#94a3b8" class="font-mono" font-size="16">SHOPFLOOR OEE ENGINE:</text>
      <text x="40" y="350" fill="#10b981" class="font-mono" font-size="64" font-weight="800">84.6%</text>
      <text x="280" y="315" fill="#e2e8f0" class="font-mono" font-size="18">Availability: <tspan fill="#38bdf8">91.2%</tspan></text>
      <text x="280" y="345" fill="#e2e8f0" class="font-mono" font-size="18">Performance: <tspan fill="#38bdf8">94.0%</tspan></text>
      <text x="280" y="375" fill="#e2e8f0" class="font-mono" font-size="18">Quality Rate: <tspan fill="#10b981">98.8%</tspan></text>

      <rect x="40" y="405" width="440" height="38" rx="6" fill="#047857" opacity="0.2" />
      <text x="60" y="430" fill="#34d399" class="font-mono" font-size="16" font-weight="bold">● ZERO DATA LEAKS — 100% LOCAL FACTORY LAN</text>
    </g>
  </g>

  <!-- Bottom Ticker -->
  <g transform="translate(160, 940)">
    <text x="0" y="30" fill="#64748b" class="font-mono" font-size="18">TRUSTED IN INDUSTRIAL HUBS:</text>
    <text x="320" y="30" fill="#e2e8f0" class="font-mono" font-size="18" font-weight="600">PUNE (BHOSARI/CHAKAN) • BENGALURU (PEENYA) • COIMBATORE • RAJKOT • FARIDABAD</text>
  </g>
</svg>
`;

// Scene 2: Live Andon Board & OEE Cockpit
const scene2Svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  ${commonStyles}
  <rect width="1920" height="1080" fill="url(#bgGrad)" />

  <!-- Header -->
  <g transform="translate(160, 60)">
    <rect x="0" y="0" width="1600" height="70" rx="8" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
    <rect x="25" y="16" width="38" height="38" rx="6" fill="#2563eb" />
    <text x="44" y="42" text-anchor="middle" fill="#fff" class="font-display" font-size="20">01</text>
    <text x="80" y="34" fill="#38bdf8" class="font-mono" font-size="14" font-weight="700">MODULE 01 • PRODUCTION TELEMETRY</text>
    <text x="80" y="54" fill="#f8fafc" class="font-display" font-size="22">Real-Time Shopfloor Andon &amp; Live OEE Engine</text>
    <text x="1280" y="44" fill="#10b981" class="font-mono" font-size="16">● SUB-500ms LATENCY (MODBUS TCP &amp; OPC UA)</text>
  </g>

  <!-- 4 Machine Cockpit Grid -->
  <g transform="translate(160, 160)">
    
    <!-- Machine 1 (CNC-01 Running) -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="780" height="320" rx="10" fill="#121b2f" stroke="#10b981" stroke-width="2" />
      <rect x="0" y="0" width="780" height="48" rx="10" fill="#0f2922" />
      <circle cx="30" cy="24" r="6" fill="#10b981" />
      <text x="48" y="30" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">CNC-01 • HAAS VF-2 (VMC 3-AXIS)</text>
      <rect x="650" y="10" width="105" height="28" rx="4" fill="#10b981" />
      <text x="702" y="29" text-anchor="middle" fill="#022c22" class="font-mono" font-size="14" font-weight="800">RUNNING</text>

      <text x="35" y="90" fill="#94a3b8" class="font-sans" font-size="16">Active Part:</text>
      <text x="140" y="90" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">Flange Collar 42mm (BOM #FL-992)</text>

      <text x="35" y="130" fill="#94a3b8" class="font-sans" font-size="16">Batch Progress:</text>
      <rect x="170" y="115" width="460" height="18" rx="4" fill="#1e293b" />
      <rect x="170" y="115" width="378" height="18" rx="4" fill="#38bdf8" />
      <text x="650" y="130" fill="#f8fafc" class="font-mono" font-size="16">148 / 180 pcs</text>

      <!-- KPI Numbers -->
      <g transform="translate(35, 170)">
        <rect x="0" y="0" width="220" height="110" rx="8" fill="#1a2540" />
        <text x="20" y="35" fill="#94a3b8" class="font-mono" font-size="14">MACHINE OEE</text>
        <text x="20" y="85" fill="#10b981" class="font-mono" font-size="44" font-weight="800">89.2%</text>

        <rect x="245" y="0" width="220" height="110" rx="8" fill="#1a2540" />
        <text x="265" y="35" fill="#94a3b8" class="font-mono" font-size="14">CYCLE TIME</text>
        <text x="265" y="85" fill="#38bdf8" class="font-mono" font-size="44" font-weight="800">42 sec</text>

        <rect x="490" y="0" width="220" height="110" rx="8" fill="#1a2540" />
        <text x="510" y="35" fill="#94a3b8" class="font-mono" font-size="14">SPINDLE LOAD</text>
        <text x="510" y="85" fill="#f59e0b" class="font-mono" font-size="44" font-weight="800">76%</text>
      </g>
    </g>

    <!-- Machine 2 (CNC-02 Running) -->
    <g transform="translate(820, 0)">
      <rect x="0" y="0" width="780" height="320" rx="10" fill="#121b2f" stroke="#10b981" stroke-width="2" />
      <rect x="0" y="0" width="780" height="48" rx="10" fill="#0f2922" />
      <circle cx="30" cy="24" r="6" fill="#10b981" />
      <text x="48" y="30" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">CNC-02 • ACE MICROMATIC LT-20</text>
      <rect x="650" y="10" width="105" height="28" rx="4" fill="#10b981" />
      <text x="702" y="29" text-anchor="middle" fill="#022c22" class="font-mono" font-size="14" font-weight="800">RUNNING</text>

      <text x="35" y="90" fill="#94a3b8" class="font-sans" font-size="16">Active Part:</text>
      <text x="140" y="90" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">Drive Shaft Spline #DS-104</text>

      <text x="35" y="130" fill="#94a3b8" class="font-sans" font-size="16">Batch Progress:</text>
      <rect x="170" y="115" width="460" height="18" rx="4" fill="#1e293b" />
      <rect x="170" y="115" width="386" height="18" rx="4" fill="#38bdf8" />
      <text x="650" y="130" fill="#f8fafc" class="font-mono" font-size="16">92 / 110 pcs</text>

      <!-- KPI Numbers -->
      <g transform="translate(35, 170)">
        <rect x="0" y="0" width="220" height="110" rx="8" fill="#1a2540" />
        <text x="20" y="35" fill="#94a3b8" class="font-mono" font-size="14">MACHINE OEE</text>
        <text x="20" y="85" fill="#10b981" class="font-mono" font-size="44" font-weight="800">84.5%</text>

        <rect x="245" y="0" width="220" height="110" rx="8" fill="#1a2540" />
        <text x="265" y="35" fill="#94a3b8" class="font-mono" font-size="14">CYCLE TIME</text>
        <text x="265" y="85" fill="#38bdf8" class="font-mono" font-size="44" font-weight="800">68 sec</text>

        <rect x="490" y="0" width="220" height="110" rx="8" fill="#1a2540" />
        <text x="510" y="35" fill="#94a3b8" class="font-mono" font-size="14">SPINDLE RPM</text>
        <text x="510" y="85" fill="#38bdf8" class="font-mono" font-size="44" font-weight="800">3200</text>
      </g>
    </g>

    <!-- Machine 3 (CNC-03 Downtime Event) -->
    <g transform="translate(0, 350)">
      <rect x="0" y="0" width="780" height="320" rx="10" fill="#1f1816" stroke="#f59e0b" stroke-width="2" />
      <rect x="0" y="0" width="780" height="48" rx="10" fill="#38210e" />
      <circle cx="30" cy="24" r="6" fill="#f59e0b" />
      <text x="48" y="30" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">CNC-03 • JYOTI VMC-850 (ALARM DETECTED)</text>
      <rect x="630" y="10" width="125" height="28" rx="4" fill="#f59e0b" />
      <text x="692" y="29" text-anchor="middle" fill="#451a03" class="font-mono" font-size="14" font-weight="800">DOWNTIME</text>

      <text x="35" y="90" fill="#fbbf24" class="font-mono" font-size="18" font-weight="700">STOPPED: Tool Insert Wear Detected (14 mins)</text>
      <text x="35" y="125" fill="#cbd5e1" class="font-sans" font-size="16">Operator Rajesh K. notified on shopfloor tablet</text>

      <g transform="translate(35, 170)">
        <rect x="0" y="0" width="340" height="110" rx="8" fill="#2d1f18" stroke="#f59e0b" stroke-width="1" />
        <text x="20" y="35" fill="#fbbf24" class="font-mono" font-size="14">MANDATORY REASON GATE</text>
        <text x="20" y="70" fill="#f8fafc" class="font-sans" font-size="18">Machine cannot resume until operator explains loss code.</text>

        <rect x="370" y="0" width="340" height="110" rx="8" fill="#2d1f18" />
        <text x="390" y="35" fill="#94a3b8" class="font-mono" font-size="14">CURRENT SHIFT OEE</text>
        <text x="390" y="85" fill="#f59e0b" class="font-mono" font-size="44" font-weight="800">68.1%</text>
      </g>
    </g>

    <!-- Machine 4 (CNC-04 Idle) -->
    <g transform="translate(820, 350)">
      <rect x="0" y="0" width="780" height="320" rx="10" fill="#121b2f" stroke="#475569" stroke-width="1.5" />
      <rect x="0" y="0" width="780" height="48" rx="10" fill="#1e293b" />
      <circle cx="30" cy="24" r="6" fill="#94a3b8" />
      <text x="48" y="30" fill="#cbd5e1" class="font-mono" font-size="18" font-weight="700">CNC-04 • BFW AGNI 45 (BAY 2)</text>
      <rect x="660" y="10" width="95" height="28" rx="4" fill="#334155" />
      <text x="707" y="29" text-anchor="middle" fill="#e2e8f0" class="font-mono" font-size="14" font-weight="800">IDLE</text>

      <text x="35" y="90" fill="#94a3b8" class="font-sans" font-size="16">Status: Waiting for Raw Material Batch</text>
      <text x="35" y="125" fill="#cbd5e1" class="font-sans" font-size="16">Previous Job Finished at 11:20 IST • Changeover in Progress</text>

      <g transform="translate(35, 170)">
        <rect x="0" y="0" width="340" height="110" rx="8" fill="#1a2540" />
        <text x="20" y="35" fill="#94a3b8" class="font-mono" font-size="14">UNPLANNED IDLE</text>
        <text x="20" y="85" fill="#f8fafc" class="font-mono" font-size="44" font-weight="800">22 mins</text>

        <rect x="370" y="0" width="340" height="110" rx="8" fill="#1a2540" />
        <text x="390" y="35" fill="#94a3b8" class="font-mono" font-size="14">TARGET OEE</text>
        <text x="390" y="85" fill="#10b981" class="font-mono" font-size="44" font-weight="800">85.0%</text>
      </g>
    </g>

  </g>

  <!-- Bottom Plant Aggregate Summary -->
  <g transform="translate(160, 860)">
    <rect x="0" y="0" width="1600" height="130" rx="8" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
    <text x="40" y="45" fill="#94a3b8" class="font-mono" font-size="16">PLANT-WIDE ROLLUP (12 CNCs):</text>
    
    <text x="40" y="100" fill="#e2e8f0" class="font-mono" font-size="28" font-weight="bold">AVAILABILITY: <tspan fill="#38bdf8">88.0%</tspan></text>
    <text x="440" y="100" fill="#e2e8f0" class="font-mono" font-size="28" font-weight="bold">PERFORMANCE: <tspan fill="#38bdf8">95.0%</tspan></text>
    <text x="840" y="100" fill="#e2e8f0" class="font-mono" font-size="28" font-weight="bold">QUALITY: <tspan fill="#10b981">98.5%</tspan></text>
    <text x="1240" y="100" fill="#e2e8f0" class="font-mono" font-size="32" font-weight="bold">PLANT OEE: <tspan fill="#10b981">82.3%</tspan></text>
  </g>
</svg>
`;

// Scene 3: Vernacular Downtime Reason Gate
const scene3Svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  ${commonStyles}
  <rect width="1920" height="1080" fill="url(#bgGrad)" />

  <!-- Header -->
  <g transform="translate(160, 60)">
    <rect x="0" y="0" width="1600" height="70" rx="8" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
    <rect x="25" y="16" width="38" height="38" rx="6" fill="#f59e0b" />
    <text x="44" y="42" text-anchor="middle" fill="#000" class="font-display" font-size="20">02</text>
    <text x="80" y="34" fill="#fbbf24" class="font-mono" font-size="14" font-weight="700">MODULE 02 • OPERATOR WORKFLOWS</text>
    <text x="80" y="54" fill="#f8fafc" class="font-display" font-size="22">Vernacular Operator Downtime Reasoning with Voice Support</text>
    <text x="1220" y="44" fill="#38bdf8" class="font-mono" font-size="16">HINDI • தமிழ் • తెలుగు • ಕನ್ನಡ • मराठी</text>
  </g>

  <!-- Left: Why it works explanation -->
  <g transform="translate(160, 170)">
    <rect x="0" y="0" width="600" height="820" rx="12" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
    <text x="40" y="50" fill="#38bdf8" class="font-mono" font-size="18" font-weight="700">THE REASON GATE PRINCIPLE</text>
    <text x="40" y="100" fill="#f8fafc" class="font-display" font-size="32">No Blank Downtime.</text>

    <text x="40" y="150" fill="#cbd5e1" class="font-sans" font-size="20" line-height="32">
      Operators hate typing complex English codes with gloved hands.
    </text>
    <text x="40" y="210" fill="#cbd5e1" class="font-sans" font-size="20" line-height="32">
      In Kaarya, when a CNC stops, the tablet forces a 1-tap categorization before cutting can resume.
    </text>

    <rect x="40" y="290" width="520" height="150" rx="8" fill="#1e293b" />
    <text x="65" y="330" fill="#10b981" class="font-mono" font-size="16">✓ 35 PRE-LOADED LOSS REASONS</text>
    <text x="65" y="365" fill="#10b981" class="font-mono" font-size="16">✓ ALIGNED WITH IATF 16949 DEFECT MATRIX</text>
    <text x="65" y="400" fill="#10b981" class="font-mono" font-size="16">✓ VOICE RECORDING FOR QUICK NOTES</text>

    <!-- Pareto Loss Box -->
    <rect x="40" y="470" width="520" height="300" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
    <text x="65" y="510" fill="#fbbf24" class="font-mono" font-size="16" font-weight="700">LIVE DOWNTIME PARETO (TOP LOSSES):</text>
    
    <text x="65" y="555" fill="#f1f5f9" class="font-sans" font-size="16">1. Tool Insert Change: 42 mins (38%)</text>
    <rect x="65" y="565" width="400" height="10" rx="2" fill="#334155" />
    <rect x="65" y="565" width="280" height="10" rx="2" fill="#ef4444" />

    <text x="65" y="615" fill="#f1f5f9" class="font-sans" font-size="16">2. First Piece Quality Inspection: 26 mins (24%)</text>
    <rect x="65" y="625" width="400" height="10" rx="2" fill="#334155" />
    <rect x="65" y="625" width="180" height="10" rx="2" fill="#f59e0b" />

    <text x="65" y="675" fill="#f1f5f9" class="font-sans" font-size="16">3. Coolant Flush / Chip Cleanup: 18 mins (16%)</text>
    <rect x="65" y="685" width="400" height="10" rx="2" fill="#334155" />
    <rect x="65" y="685" width="120" height="10" rx="2" fill="#3b82f6" />
    
    <text x="65" y="735" fill="#10b981" class="font-mono" font-size="14">→ Auto-generated action plan for plant head</text>
  </g>

  <!-- Right: The Operator Tablet Screen (Simulated UI) -->
  <g transform="translate(800, 170)">
    <rect x="0" y="0" width="960" height="820" rx="16" fill="#0f172a" stroke="#3b82f6" stroke-width="3" />
    
    <!-- Tablet Header -->
    <rect x="0" y="0" width="960" height="60" rx="16" fill="#1e293b" />
    <text x="35" y="38" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">OPERATOR TOUCHSCREEN • CNC-03</text>
    <rect x="730" y="12" width="60" height="34" rx="4" fill="#2563eb" />
    <text x="760" y="35" text-anchor="middle" fill="#fff" class="font-mono" font-size="14" font-weight="bold">EN</text>
    <rect x="800" y="12" width="65" height="34" rx="4" fill="#334155" />
    <text x="832" y="35" text-anchor="middle" fill="#94a3b8" class="font-mono" font-size="14">हिन्दी</text>
    <rect x="875" y="12" width="65" height="34" rx="4" fill="#334155" />
    <text x="907" y="35" text-anchor="middle" fill="#94a3b8" class="font-mono" font-size="14">मराठी</text>

    <!-- Alert Banner -->
    <rect x="35" y="90" width="890" height="90" rx="8" fill="#451a03" stroke="#f59e0b" stroke-width="1.5" />
    <circle cx="70" cy="135" r="16" fill="#f59e0b" />
    <text x="70" y="142" text-anchor="middle" fill="#000" class="font-mono" font-size="20" font-weight="bold">!</text>
    <text x="110" y="125" fill="#fef08a" class="font-mono" font-size="20" font-weight="bold">MACHINE STOPPED: CNC-03 (JYOTI VMC)</text>
    <text x="110" y="155" fill="#fde047" class="font-sans" font-size="16">Downtime Duration: 14 mins 22 secs • Select reason code below</text>

    <!-- 6 Reason Buttons -->
    <g transform="translate(35, 210)">
      
      <!-- Selected Reason Button -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="280" height="150" rx="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5" />
        <text x="140" y="55" text-anchor="middle" fill="#93c5fd" class="font-display" font-size="22">Tool Change</text>
        <text x="140" y="90" text-anchor="middle" fill="#ffffff" class="font-display" font-size="26" font-weight="bold">टूल चेंज</text>
        <text x="140" y="125" text-anchor="middle" fill="#60a5fa" class="font-mono" font-size="14">Selected (1 Tap)</text>
      </g>

      <g transform="translate(305, 0)">
        <rect x="0" y="0" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="140" y="55" text-anchor="middle" fill="#e2e8f0" class="font-display" font-size="22">Power Trip</text>
        <text x="140" y="90" text-anchor="middle" fill="#94a3b8" class="font-display" font-size="24">पावर ट्रिप / स्टेबलाइजर</text>
        <text x="140" y="125" text-anchor="middle" fill="#64748b" class="font-mono" font-size="14">Tap to Select</text>
      </g>

      <g transform="translate(610, 0)">
        <rect x="0" y="0" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="140" y="55" text-anchor="middle" fill="#e2e8f0" class="font-display" font-size="22">Inspection</text>
        <text x="140" y="90" text-anchor="middle" fill="#94a3b8" class="font-display" font-size="24">क्वालिटी चेकिंग (CMM)</text>
        <text x="140" y="125" text-anchor="middle" fill="#64748b" class="font-mono" font-size="14">Tap to Select</text>
      </g>

      <g transform="translate(0, 175)">
        <rect x="0" y="0" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="140" y="55" text-anchor="middle" fill="#e2e8f0" class="font-display" font-size="22">No Raw Material</text>
        <text x="140" y="90" text-anchor="middle" fill="#94a3b8" class="font-display" font-size="24">रॉ मटेरियल पेंडिंग</text>
        <text x="140" y="125" text-anchor="middle" fill="#64748b" class="font-mono" font-size="14">Tap to Select</text>
      </g>

      <g transform="translate(305, 175)">
        <rect x="0" y="0" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="140" y="55" text-anchor="middle" fill="#e2e8f0" class="font-display" font-size="22">Coolant / Chips</text>
        <text x="140" y="90" text-anchor="middle" fill="#94a3b8" class="font-display" font-size="24">कूलेंट / चिप सफाई</text>
        <text x="140" y="125" text-anchor="middle" fill="#64748b" class="font-mono" font-size="14">Tap to Select</text>
      </g>

      <g transform="translate(610, 175)">
        <rect x="0" y="0" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="140" y="55" text-anchor="middle" fill="#e2e8f0" class="font-display" font-size="22">Fixture Setup</text>
        <text x="140" y="90" text-anchor="middle" fill="#94a3b8" class="font-display" font-size="24">फिक्सचर अलाइनमेंट</text>
        <text x="140" y="125" text-anchor="middle" fill="#64748b" class="font-mono" font-size="14">Tap to Select</text>
      </g>
    </g>

    <!-- Operator Voice Note Input & Resume -->
    <g transform="translate(35, 570)">
      <rect x="0" y="0" width="890" height="120" rx="8" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
      <circle cx="50" cy="40" r="16" fill="#ef4444" />
      <text x="50" y="47" text-anchor="middle" fill="#fff" class="font-mono" font-size="14">●</text>
      <text x="80" y="45" fill="#f8fafc" class="font-mono" font-size="18" font-weight="700">Voice Note Transcribed:</text>
      <text x="80" y="85" fill="#93c5fd" class="font-sans" font-size="20">"12mm end mill insert chipped on corner radius. Replaced with new Sandvik insert."</text>
    </g>

    <!-- Bottom Action Button -->
    <g transform="translate(35, 715)">
      <rect x="0" y="0" width="890" height="70" rx="8" fill="#10b981" />
      <text x="445" y="44" text-anchor="middle" fill="#022c22" class="font-display" font-size="24" font-weight="bold">
        CONFIRM REASON &amp; RESUME PRODUCTION RUN →
      </text>
    </g>

  </g>
</svg>
`;

// Scene 4: Shift Handover & IATF 16949 Shift Dossiers
const scene4Svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  ${commonStyles}
  <rect width="1920" height="1080" fill="url(#bgGrad)" />

  <!-- Header -->
  <g transform="translate(160, 60)">
    <rect x="0" y="0" width="1600" height="70" rx="8" fill="#131c31" stroke="#25324d" stroke-width="1.5" />
    <rect x="25" y="16" width="38" height="38" rx="6" fill="#10b981" />
    <text x="44" y="42" text-anchor="middle" fill="#000" class="font-display" font-size="20">03</text>
    <text x="80" y="34" fill="#34d399" class="font-mono" font-size="14" font-weight="700">MODULE 03 • DIGITAL GOVERNANCE</text>
    <text x="80" y="54" fill="#f8fafc" class="font-display" font-size="22">Digital Shift Handover &amp; IATF 16949 Shift Dossiers</text>
    <text x="1260" y="44" fill="#38bdf8" class="font-mono" font-size="16">REPLACES WHATSAPP GROUPS &amp; PAPER LOGS</text>
  </g>

  <!-- Left: Shift Handover UI -->
  <g transform="translate(160, 170)">
    <rect x="0" y="0" width="760" height="820" rx="12" fill="#121b2f" stroke="#25324d" stroke-width="2" />
    
    <text x="40" y="50" fill="#38bdf8" class="font-mono" font-size="18" font-weight="700">DIGITAL SHIFT RECONCILIATION</text>
    <text x="40" y="95" fill="#f8fafc" class="font-display" font-size="32">Shift 01 Morning (06:00 - 14:00)</text>

    <!-- Key Metrics 3-box -->
    <g transform="translate(40, 130)">
      <rect x="0" y="0" width="210" height="110" rx="8" fill="#1a2540" />
      <text x="20" y="35" fill="#94a3b8" class="font-mono" font-size="14">PRODUCED</text>
      <text x="20" y="85" fill="#f8fafc" class="font-mono" font-size="44" font-weight="800">482 pcs</text>

      <rect x="235" y="0" width="210" height="110" rx="8" fill="#1a2540" />
      <text x="255" y="35" fill="#94a3b8" class="font-mono" font-size="14">SCRAP / DEFECT</text>
      <text x="255" y="85" fill="#ef4444" class="font-mono" font-size="44" font-weight="800">6 pcs</text>

      <rect x="470" y="0" width="210" height="110" rx="8" fill="#1a2540" />
      <text x="490" y="35" fill="#94a3b8" class="font-mono" font-size="14">SHIFT OEE</text>
      <text x="490" y="85" fill="#10b981" class="font-mono" font-size="44" font-weight="800">86.4%</text>
    </g>

    <!-- Handover Checklist -->
    <g transform="translate(40, 275)">
      <text x="0" y="25" fill="#cbd5e1" class="font-mono" font-size="16" font-weight="700">SUPERVISOR HANDOVER CHECKLIST:</text>

      <rect x="0" y="45" width="680" height="50" rx="6" fill="#1e293b" />
      <text x="20" y="76" fill="#10b981" class="font-mono" font-size="18">✓ Outgoing Shift Inspection Completed &amp; Signed</text>

      <rect x="0" y="110" width="680" height="50" rx="6" fill="#1e293b" />
      <text x="20" y="141" fill="#10b981" class="font-mono" font-size="18">✓ Tool Wear Status: CNC-03 End Mill replaced</text>

      <rect x="0" y="175" width="680" height="50" rx="6" fill="#1e293b" />
      <text x="20" y="206" fill="#10b981" class="font-mono" font-size="18">✓ Next Work Order Queued: WO-9922 (Billet Ready)</text>
    </g>

    <!-- Digital Signature Block -->
    <g transform="translate(40, 550)">
      <rect x="0" y="0" width="680" height="150" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
      <text x="30" y="40" fill="#94a3b8" class="font-mono" font-size="14">VERIFIED SUPERVISOR SIGN-OFF:</text>
      <text x="30" y="75" fill="#f8fafc" class="font-sans" font-size="20" font-weight="700">Vinay Deshmukh (Production Supervisor #104)</text>
      <text x="30" y="105" fill="#64748b" class="font-mono" font-size="14">Timestamp: 2026-09-24 14:02:18 IST • Shift Handover Accepted</text>
      <text x="30" y="130" fill="#38bdf8" class="font-mono" font-size="14">Audit Fingerprint: sha256:4a9c8bf923...f2e0 (WAL local sync)</text>
    </g>

    <g transform="translate(40, 730)">
      <rect x="0" y="0" width="680" height="60" rx="8" fill="#2563eb" />
      <text x="340" y="38" text-anchor="middle" fill="#ffffff" class="font-display" font-size="20">
        AUTO-GENERATE SHIFT DOSSIER PDF ↓
      </text>
    </g>
  </g>

  <!-- Right: Generated Shift Dossier Document Preview -->
  <g transform="translate(960, 170)">
    <rect x="0" y="0" width="800" height="820" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    
    <!-- PDF Document Header -->
    <g transform="translate(50, 40)">
      <rect x="0" y="0" width="50" height="24" rx="4" fill="#000" />
      <text x="25" y="17" text-anchor="middle" fill="#fff" class="font-display" font-size="14">कार्य</text>
      <text x="65" y="18" fill="#0f172a" class="font-display" font-size="22" font-weight="bold">KAARYA MANUFACTURING AUDIT DOSSIER</text>
      <text x="0" y="50" fill="#64748b" class="font-sans" font-size="14">IATF 16949 Section 8.5.1 Shift Production Report • GST Ready</text>
      
      <line x1="0" y1="70" x2="700" y2="70" stroke="#cbd5e1" stroke-width="1.5" />

      <!-- Doc Content -->
      <text x="0" y="110" fill="#0f172a" class="font-mono" font-size="16" font-weight="bold">PLANT: Precision Components Ltd (Bhosari, Pune)</text>
      <text x="0" y="140" fill="#475569" class="font-mono" font-size="14">DATE: 2026-09-24 | SHIFT: Morning Shift 01 | WO: #WO-9921</text>
      <text x="0" y="170" fill="#475569" class="font-mono" font-size="14">PART: Flange Collar 42mm | MATERIAL: EN-8 Steel</text>

      <!-- Table Simulation -->
      <rect x="0" y="200" width="700" height="40" fill="#f1f5f9" />
      <text x="20" y="226" fill="#334155" class="font-mono" font-size="14" font-weight="bold">MACHINE</text>
      <text x="180" y="226" fill="#334155" class="font-mono" font-size="14" font-weight="bold">RUN TIME</text>
      <text x="320" y="226" fill="#334155" class="font-mono" font-size="14" font-weight="bold">DOWNTIME</text>
      <text x="460" y="226" fill="#334155" class="font-mono" font-size="14" font-weight="bold">PARTS</text>
      <text x="600" y="226" fill="#334155" class="font-mono" font-size="14" font-weight="bold">OEE</text>

      <text x="20" y="270" fill="#0f172a" class="font-mono" font-size="14">CNC-01 (VF-2)</text>
      <text x="180" y="270" fill="#0f172a" class="font-mono" font-size="14">7h 12m</text>
      <text x="320" y="270" fill="#0f172a" class="font-mono" font-size="14">48m</text>
      <text x="460" y="270" fill="#0f172a" class="font-mono" font-size="14">148</text>
      <text x="600" y="270" fill="#16a34a" class="font-mono" font-size="14" font-weight="bold">89.2%</text>
      <line x1="0" y1="290" x2="700" y2="290" stroke="#e2e8f0" stroke-width="1" />

      <text x="20" y="325" fill="#0f172a" class="font-mono" font-size="14">CNC-02 (LT-20)</text>
      <text x="180" y="325" fill="#0f172a" class="font-mono" font-size="14">6h 50m</text>
      <text x="320" y="325" fill="#0f172a" class="font-mono" font-size="14">1h 10m</text>
      <text x="460" y="325" fill="#0f172a" class="font-mono" font-size="14">92</text>
      <text x="600" y="325" fill="#16a34a" class="font-mono" font-size="14" font-weight="bold">84.5%</text>
      <line x1="0" y1="345" x2="700" y2="345" stroke="#e2e8f0" stroke-width="1" />

      <text x="20" y="380" fill="#0f172a" class="font-mono" font-size="14">CNC-03 (VMC)</text>
      <text x="180" y="380" fill="#0f172a" class="font-mono" font-size="14">5h 28m</text>
      <text x="320" y="380" fill="#d97706" class="font-mono" font-size="14">2h 32m</text>
      <text x="460" y="380" fill="#0f172a" class="font-mono" font-size="14">64</text>
      <text x="600" y="380" fill="#d97706" class="font-mono" font-size="14" font-weight="bold">68.1%</text>
      <line x1="0" y1="400" x2="700" y2="400" stroke="#e2e8f0" stroke-width="1" />

      <!-- Official Stamp -->
      <g transform="translate(420, 520)">
        <rect x="0" y="0" width="260" height="90" rx="4" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="6,4" />
        <text x="130" y="35" text-anchor="middle" fill="#2563eb" class="font-mono" font-size="16" font-weight="bold">IATF 16949 COMPLIANT</text>
        <text x="130" y="65" text-anchor="middle" fill="#2563eb" class="font-mono" font-size="13">DIGITALLY SIGNED &amp; SEALED</text>
      </g>

      <text x="0" y="660" fill="#64748b" class="font-mono" font-size="12">Generated automatically by Kaarya Industrial Shell • 100% Offline Local Engine</text>
    </g>
  </g>
</svg>
`;

// Scene 5: Tally-Aligned Indian Pricing & 4-Hour Deployment
const scene5Svg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  ${commonStyles}
  <rect width="1920" height="1080" fill="url(#bgGrad)" />

  <g transform="translate(160, 80)">
    <!-- Header -->
    <rect x="0" y="0" width="80" height="32" rx="4" fill="#2563eb" />
    <text x="40" y="22" text-anchor="middle" fill="#ffffff" class="font-display" font-size="16">कार्य</text>
    <text x="95" y="24" fill="#38bdf8" class="font-mono" font-size="16" font-weight="bold">KAARYA COMMERCIALS</text>
    
    <text x="0" y="85" fill="#f8fafc" class="font-display" font-size="52" font-weight="800">
      Transparent Pricing. Engineered for Indian MSMEs.
    </text>
    <text x="0" y="130" fill="#94a3b8" class="font-sans" font-size="22">
      Zero per-seat penalties. Zero cloud lock-in. Aligned with your annual Tally accounting software budget.
    </text>
  </g>

  <!-- 3 Pricing Cards (Model 1) -->
  <g transform="translate(160, 260)">
    
    <!-- Card 1: Core (Free Forever) -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="500" height="580" rx="12" fill="#131c31" stroke="#2a3854" stroke-width="2" />
      <text x="40" y="60" fill="#94a3b8" class="font-display" font-size="28">Core Edition</text>
      <text x="40" y="125" fill="#10b981" class="font-mono" font-size="48" font-weight="800">FREE</text>
      <text x="175" y="120" fill="#64748b" class="font-mono" font-size="18">FOREVER</text>
      <text x="40" y="165" fill="#cbd5e1" class="font-sans" font-size="16">Production-grade evaluation for micro shops.</text>
      
      <line x1="40" y1="195" x2="460" y2="195" stroke="#25324d" stroke-width="1.5" />

      <g transform="translate(40, 230)">
        <text x="0" y="0" fill="#10b981" class="font-mono" font-size="16">✓ Up to 2 Machines Included</text>
        <text x="0" y="40" fill="#10b981" class="font-mono" font-size="16">✓ Real-time OEE Engine (Manual)</text>
        <text x="0" y="80" fill="#10b981" class="font-mono" font-size="16">✓ 35 Vernacular Downtime Codes</text>
        <text x="0" y="120" fill="#10b981" class="font-mono" font-size="16">✓ Digital Shift Handover &amp; CSV</text>
        <text x="0" y="160" fill="#10b981" class="font-mono" font-size="16">✓ 100% Offline Embedded SQLite</text>
      </g>

      <rect x="40" y="490" width="420" height="54" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="250" y="524" text-anchor="middle" fill="#f8fafc" class="font-sans" font-size="18" font-weight="600">Download Free Binary</text>
    </g>

    <!-- Card 2: Pro Starter (Recommended) -->
    <g transform="translate(550, -20)">
      <rect x="0" y="0" width="500" height="620" rx="12" fill="#17233f" stroke="#2563eb" stroke-width="3" />
      <rect x="330" y="-14" width="140" height="28" rx="4" fill="#2563eb" />
      <text x="400" y="6" text-anchor="middle" fill="#ffffff" class="font-mono" font-size="12" font-weight="bold">MOST POPULAR</text>

      <text x="40" y="70" fill="#f8fafc" class="font-display" font-size="32">Pro Starter</text>
      <text x="40" y="135" fill="#38bdf8" class="font-mono" font-size="44" font-weight="800">₹24,990</text>
      <text x="245" y="125" fill="#94a3b8" class="font-mono" font-size="16">/plant/yr</text>
      <text x="40" y="165" fill="#60a5fa" class="font-mono" font-size="16">Just ₹13/machine/day • Matches Tally Gold</text>
      
      <line x1="40" y1="195" x2="460" y2="195" stroke="#2d4375" stroke-width="1.5" />

      <g transform="translate(40, 230)">
        <text x="0" y="0" fill="#10b981" class="font-mono" font-size="16">✓ Up to 5 Machines Included</text>
        <text x="0" y="35" fill="#10b981" class="font-mono" font-size="16">✓ Native Modbus &amp; OPC UA Telemetry</text>
        <text x="0" y="70" fill="#10b981" class="font-mono" font-size="16">✓ Multi-Shift Comparison &amp; OEE Rollup</text>
        <text x="0" y="105" fill="#10b981" class="font-mono" font-size="16">✓ Downtime Pareto &amp; Scrap Pareto</text>
        <text x="0" y="140" fill="#10b981" class="font-mono" font-size="16">✓ Official PDF Shift Dossiers (GST)</text>
        <text x="0" y="175" fill="#10b981" class="font-mono" font-size="16">✓ Multi-Node PostgreSQL LAN Scale</text>
        <text x="0" y="210" fill="#10b981" class="font-mono" font-size="16">✓ WhatsApp &amp; Phone Support (IST)</text>
      </g>

      <rect x="40" y="525" width="420" height="58" rx="8" fill="#2563eb" />
      <text x="250" y="561" text-anchor="middle" fill="#ffffff" class="font-sans" font-size="20" font-weight="bold">Start 14-Day Free Pilot →</text>
    </g>

    <!-- Card 3: Pro Standard & Scale -->
    <g transform="translate(1100, 0)">
      <rect x="0" y="0" width="500" height="580" rx="12" fill="#131c31" stroke="#2a3854" stroke-width="2" />
      <text x="40" y="60" fill="#94a3b8" class="font-display" font-size="28">Pro Standard</text>
      <text x="40" y="125" fill="#f8fafc" class="font-mono" font-size="44" font-weight="800">₹49,990</text>
      <text x="245" y="120" fill="#64748b" class="font-mono" font-size="16">/plant/yr</text>
      <text x="40" y="165" fill="#cbd5e1" class="font-sans" font-size="16">For growing shops with 6–15 CNCs.</text>
      
      <line x1="40" y1="195" x2="460" y2="195" stroke="#25324d" stroke-width="1.5" />

      <g transform="translate(40, 230)">
        <text x="0" y="0" fill="#10b981" class="font-mono" font-size="16">✓ Up to 15 Machines Included</text>
        <text x="0" y="40" fill="#10b981" class="font-mono" font-size="16">✓ High-concurrency Postgres cluster</text>
        <text x="0" y="80" fill="#10b981" class="font-mono" font-size="16">✓ Multi-terminal operator dispatch</text>
        <text x="0" y="120" fill="#10b981" class="font-mono" font-size="16">✓ Scale plan: ₹89,990 (up to 30 CNCs)</text>
        <text x="0" y="160" fill="#10b981" class="font-mono" font-size="16">✓ Capex Perpetual: ₹1.79L + AMC</text>
      </g>

      <rect x="40" y="490" width="420" height="54" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="250" y="524" text-anchor="middle" fill="#f8fafc" class="font-sans" font-size="18" font-weight="600">Inquire for Scale Fleet</text>
    </g>

  </g>

  <!-- Bottom CTA -->
  <g transform="translate(160, 930)">
    <rect x="0" y="0" width="1600" height="80" rx="8" fill="#0f172a" stroke="#2563eb" stroke-width="1.5" />
    <text x="50" y="48" fill="#f8fafc" class="font-display" font-size="24">
      Ready to automate your factory floor in 4 hours?
    </text>
    <text x="950" y="48" fill="#38bdf8" class="font-mono" font-size="20">
      Visit kaayra.interstellarhq.in/demo • contact-us@kaarya.interstellarhq.in
    </text>
  </g>
</svg>
`;

const scenes = [
  { svg: scene1Svg, name: 'scene1.png', duration: 12 },
  { svg: scene2Svg, name: 'scene2.png', duration: 13 },
  { svg: scene3Svg, name: 'scene3.png', duration: 13 },
  { svg: scene4Svg, name: 'scene4.png', duration: 13 },
  { svg: scene5Svg, name: 'scene5.png', duration: 14 },
];

console.log('Rendering scenes to high-resolution 1920x1080 PNG...');

for (const s of scenes) {
  const pngPath = path.join(TMP_DIR, s.name);
  await sharp(Buffer.from(s.svg))
    .png({ quality: 100 })
    .toFile(pngPath);
  console.log(`Rendered: ${s.name}`);
}

// Generate the primary video poster image
const posterPath = path.join(OUT_DIR, 'kaarya-demo-poster.webp');
await sharp(Buffer.from(scene2Svg))
  .webp({ quality: 90 })
  .toFile(posterPath);
console.log(`Generated video poster: ${posterPath}`);

// Also copy poster as PNG fallback
await sharp(Buffer.from(scene2Svg))
  .png({ quality: 90 })
  .toFile(path.join(OUT_DIR, 'kaarya-demo-poster.png'));

console.log('Encoding MP4 product demo video using FFmpeg with Ken Burns motion & transitions...');

const videoOutput = path.join(OUT_DIR, 'kaarya-demo.mp4');

// Build an ffmpeg command that cross-fades the scenes with zoompan and generates an ambient soundscape
// Scene durations: 12s, 13s, 13s, 13s, 14s. Total ~65s.
const p1 = path.join(TMP_DIR, 'scene1.png');
const p2 = path.join(TMP_DIR, 'scene2.png');
const p3 = path.join(TMP_DIR, 'scene3.png');
const p4 = path.join(TMP_DIR, 'scene4.png');
const p5 = path.join(TMP_DIR, 'scene5.png');

const ffmpegCmd = `ffmpeg -y \
  -loop 1 -t 12 -i "${p1}" \
  -loop 1 -t 13 -i "${p2}" \
  -loop 1 -t 13 -i "${p3}" \
  -loop 1 -t 13 -i "${p4}" \
  -loop 1 -t 14 -i "${p5}" \
  -f lavfi -i "aevalsrc=exprs='0.06*sin(2*PI*220*t)*exp(-mod(t,4)/2)+0.03*sin(2*PI*440*t)+0.02*sin(2*PI*330*t)':sample_rate=44100:duration=60" \
  -filter_complex "\
    [0:v]scale=1920:1080,zoompan=z='min(zoom+0.0006,1.06)':d=300:s=1920x1080:fps=25[v0]; \
    [1:v]scale=1920:1080,zoompan=z='min(zoom+0.0006,1.06)':d=325:s=1920x1080:fps=25[v1]; \
    [2:v]scale=1920:1080,zoompan=z='min(zoom+0.0006,1.06)':d=325:s=1920x1080:fps=25[v2]; \
    [3:v]scale=1920:1080,zoompan=z='min(zoom+0.0006,1.06)':d=325:s=1920x1080:fps=25[v3]; \
    [4:v]scale=1920:1080,zoompan=z='min(zoom+0.0006,1.06)':d=350:s=1920x1080:fps=25[v4]; \
    [v0][v1]xfade=transition=fade:duration=1:offset=11[x1]; \
    [x1][v2]xfade=transition=fade:duration=1:offset=23[x2]; \
    [x2][v3]xfade=transition=fade:duration=1:offset=35[x3]; \
    [x3][v4]xfade=transition=fade:duration=1:offset=47[x4]; \
    [x4]format=yuv420p[outv]; \
    [5:a]afade=t=in:ss=0:d=2,afade=t=out:st=58:d=2[outa] \
  " \
  -map "[outv]" -map "[outa]" \
  -c:v libx264 -preset fast -crf 20 -movflags +faststart \
  -c:a aac -b:a 128k -ar 44100 \
  -t 60 "${videoOutput}"`;

console.log('Running FFmpeg rendering pipeline...');
execSync(ffmpegCmd, { stdio: 'inherit' });

console.log(`Video created successfully: ${videoOutput}`);
const stats = fs.statSync(videoOutput);
console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
