// 30 Suprematist motifs — inspired by Kazimir Malevich
// viewBox 0 0 600 800, preserveAspectRatio="xMidYMid slice"
// Colors via CSS variables so dark/light theme + accent tweaks apply.

const INK = "var(--ink)";
const RED = "var(--accent)";

window.MAGO_MOTIFS = [
  // 01 — Black Square (1915)
  (
    <svg key={1} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="120" y="220" width="360" height="360" fill={INK} />
    </svg>
  ),
  // 02 — Red Square (1915)
  (
    <svg key={2} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="130" y="240" width="340" height="340" fill={RED} transform="rotate(2 300 410)" />
    </svg>
  ),
  // 03 — Black Circle (1915)
  (
    <svg key={3} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <circle cx="300" cy="400" r="180" fill={INK} />
    </svg>
  ),
  // 04 — Black Cross (1915)
  (
    <svg key={4} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="220" y="120" width="160" height="560" fill={INK} />
      <rect x="80" y="320" width="440" height="160" fill={INK} />
    </svg>
  ),
  // 05 — Eight Red Rectangles (1915)
  (
    <svg key={5} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <g transform="rotate(-8 300 400)">
        <rect x="60"  y="160" width="280" height="22" fill={RED} />
        <rect x="60"  y="222" width="420" height="22" fill={RED} />
        <rect x="60"  y="288" width="220" height="22" fill={RED} />
        <rect x="60"  y="350" width="500" height="22" fill={RED} />
        <rect x="60"  y="416" width="320" height="22" fill={RED} />
        <rect x="60"  y="480" width="180" height="22" fill={RED} />
        <rect x="60"  y="544" width="460" height="22" fill={RED} />
        <rect x="60"  y="610" width="240" height="22" fill={RED} />
      </g>
    </svg>
  ),
  // 06 — Painterly Realism (Black square + small red)
  (
    <svg key={6} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="80" y="180" width="340" height="340" fill={INK} />
      <rect x="380" y="540" width="120" height="120" fill={RED} transform="rotate(6 440 600)" />
    </svg>
  ),
  // 07 — Aeroplane Flying (1915) — staggered diagonal thin bars
  (
    <svg key={7} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <g transform="rotate(-22 300 400)">
        <rect x="40"  y="280" width="520" height="28" fill={INK} />
        <rect x="80"  y="340" width="380" height="20" fill={INK} />
        <rect x="120" y="392" width="260" height="16" fill={INK} />
        <rect x="180" y="438" width="160" height="12" fill={RED} />
      </g>
    </svg>
  ),
  // 08 — Suprematist Composition 1916: diagonal bars + small square
  (
    <svg key={8} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="60,180 480,140 500,220 80,260" fill={INK} />
      <rect x="200" y="340" width="200" height="20" fill={INK} transform="rotate(12 300 350)" />
      <rect x="380" y="500" width="80" height="80" fill={RED} />
      <circle cx="160" cy="600" r="14" fill={INK} />
    </svg>
  ),
  // 09 — Supremus No. 50 — red trapezoid + black accents
  (
    <svg key={9} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="80,200 520,160 540,340 100,300" fill={RED} />
      <rect x="120" y="420" width="220" height="14" fill={INK} />
      <rect x="120" y="460" width="380" height="14" fill={INK} />
      <rect x="380" y="540" width="120" height="120" fill={INK} transform="rotate(-6 440 600)" />
    </svg>
  ),
  // 10 — White-on-White (tilted ink quadrilateral)
  (
    <svg key={10} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="160,200 480,260 420,560 100,500" fill={INK} opacity="0.35" />
      <polygon points="220,260 440,320 400,500 180,440" fill={INK} />
    </svg>
  ),
  // 11 — Circle + Square overlap
  (
    <svg key={11} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="120" y="240" width="280" height="280" fill={INK} />
      <circle cx="400" cy="500" r="140" fill={RED} />
    </svg>
  ),
  // 12 — Tilted Black Trapezium (Black Trapezium and Red Square)
  (
    <svg key={12} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="80,260 520,200 460,540 120,460" fill={INK} />
      <rect x="380" y="540" width="100" height="100" fill={RED} transform="rotate(8 430 590)" />
    </svg>
  ),
  // 13 — Multi-shape Suprematist Painting
  (
    <svg key={13} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="80" y="160" width="240" height="240" fill={INK} />
      <rect x="360" y="200" width="160" height="16" fill={RED} transform="rotate(18 440 208)" />
      <rect x="340" y="440" width="180" height="180" fill={INK} transform="rotate(-6 430 530)" />
      <circle cx="160" cy="560" r="42" fill={RED} />
      <rect x="180" y="660" width="220" height="12" fill={INK} />
    </svg>
  ),
  // 14 — Mystic Suprematism: black cross + small red mark
  (
    <svg key={14} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <g transform="rotate(12 300 400)">
        <rect x="260" y="160" width="80" height="480" fill={INK} />
        <rect x="160" y="360" width="280" height="80" fill={INK} />
      </g>
      <rect x="440" y="600" width="50" height="50" fill={RED} />
    </svg>
  ),
  // 15 — Football Player — multiple slanted bars
  (
    <svg key={15} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <g transform="rotate(14 300 400)">
        <rect x="60"  y="200" width="200" height="60" fill={INK} />
        <rect x="280" y="280" width="280" height="44" fill={INK} />
        <rect x="120" y="360" width="360" height="32" fill={RED} />
        <rect x="220" y="440" width="240" height="28" fill={INK} />
        <rect x="80"  y="520" width="180" height="22" fill={INK} />
      </g>
    </svg>
  ),
  // 16 — Tilted square inside larger square
  (
    <svg key={16} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="100" y="220" width="400" height="400" fill={INK} />
      <rect x="220" y="340" width="160" height="160" fill={RED} transform="rotate(28 300 420)" />
    </svg>
  ),
  // 17 — Horizontal stack + red accent bar
  (
    <svg key={17} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="80"  y="200" width="440" height="32" fill={INK} />
      <rect x="80"  y="260" width="340" height="32" fill={INK} />
      <rect x="80"  y="320" width="500" height="32" fill={RED} />
      <rect x="80"  y="380" width="280" height="32" fill={INK} />
      <rect x="80"  y="440" width="380" height="32" fill={INK} />
    </svg>
  ),
  // 18 — Red diagonal across motif
  (
    <svg key={18} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="0,800 600,0 600,140 0,800" fill={RED} opacity="0.92" />
      <rect x="80" y="180" width="140" height="140" fill={INK} />
    </svg>
  ),
  // 19 — Vertical rhythm of thin bars
  (
    <svg key={19} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="100" y="160" width="18" height="480" fill={INK} />
      <rect x="160" y="200" width="18" height="380" fill={INK} />
      <rect x="220" y="160" width="18" height="480" fill={INK} />
      <rect x="280" y="240" width="18" height="280" fill={INK} />
      <rect x="340" y="160" width="18" height="480" fill={INK} />
      <rect x="400" y="200" width="18" height="380" fill={INK} />
      <rect x="460" y="160" width="18" height="480" fill={RED} />
    </svg>
  ),
  // 20 — Two corner-touching squares
  (
    <svg key={20} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="100" y="180" width="280" height="280" fill={INK} />
      <rect x="380" y="460" width="160" height="160" fill={RED} />
    </svg>
  ),
  // 21 — Circle eclipsing horizontal red bar
  (
    <svg key={21} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="40" y="380" width="520" height="60" fill={RED} />
      <circle cx="300" cy="320" r="160" fill={INK} />
    </svg>
  ),
  // 22 — Tilted triangle + thin black line
  (
    <svg key={22} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="120,640 500,520 220,200" fill={INK} />
      <rect x="60" y="700" width="500" height="10" fill={RED} />
    </svg>
  ),
  // 23 — Half-disc + bar
  (
    <svg key={23} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <path d="M 100 460 A 200 200 0 0 1 500 460 Z" fill={INK} />
      <rect x="60" y="520" width="500" height="32" fill={INK} />
      <rect x="240" y="620" width="120" height="40" fill={RED} />
    </svg>
  ),
  // 24 — Cluster of small black squares
  (
    <svg key={24} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="120" y="220" width="80" height="80" fill={INK} />
      <rect x="240" y="260" width="60" height="60" fill={INK} />
      <rect x="340" y="220" width="80" height="80" fill={INK} />
      <rect x="180" y="360" width="60" height="60" fill={INK} />
      <rect x="280" y="400" width="100" height="100" fill={RED} />
      <rect x="420" y="380" width="60" height="60" fill={INK} />
      <rect x="160" y="520" width="80" height="80" fill={INK} />
      <rect x="320" y="560" width="60" height="60" fill={INK} />
    </svg>
  ),
  // 25 — Red ring + black square
  (
    <svg key={25} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <circle cx="300" cy="380" r="180" fill="none" stroke={RED} strokeWidth="36" />
      <rect x="260" y="540" width="160" height="160" fill={INK} />
    </svg>
  ),
  // 26 — Black quadrilateral + 2 red dots
  (
    <svg key={26} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="80,220 520,180 480,560 120,520" fill={INK} />
      <circle cx="160" cy="640" r="28" fill={RED} />
      <circle cx="460" cy="640" r="14" fill={RED} />
    </svg>
  ),
  // 27 — T-shape
  (
    <svg key={27} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="100" y="180" width="400" height="100" fill={INK} />
      <rect x="260" y="280" width="80" height="420" fill={INK} />
      <rect x="120" y="640" width="60" height="60" fill={RED} />
    </svg>
  ),
  // 28 — Tilted red parallelogram + black dot
  (
    <svg key={28} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="80,300 520,200 540,440 100,540" fill={RED} />
      <circle cx="200" cy="640" r="36" fill={INK} />
    </svg>
  ),
  // 29 — Trapezoid balance: black + red
  (
    <svg key={29} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <polygon points="80,200 380,180 320,420 60,380" fill={INK} />
      <polygon points="280,460 540,500 500,680 240,640" fill={RED} />
    </svg>
  ),
  // 30 — Composition with multiple tilted forms
  (
    <svg key={30} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <rect x="100" y="180" width="240" height="40" fill={INK} transform="rotate(-12 220 200)" />
      <rect x="80"  y="280" width="180" height="180" fill={INK} transform="rotate(8 170 370)" />
      <rect x="320" y="200" width="180" height="20" fill={RED} transform="rotate(22 410 210)" />
      <polygon points="320,380 540,420 480,580 280,520" fill={INK} opacity="0.85" />
      <circle cx="160" cy="600" r="36" fill={RED} />
      <rect x="380" y="620" width="120" height="12" fill={INK} />
    </svg>
  ),
];
