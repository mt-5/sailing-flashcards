// Inline SVG infographics. All hand-drawn — no external assets, no fonts beyond
// what the page already loads. Each diagram is a self-contained <svg> string.

// ---------- 1. Points of sail (sailing clock) ----------
function pointsOfSailSvg() {
  const cx = 300, cy = 320, R = 200;
  // angle: clockwise from north (degrees)
  // tack: "port" -> sail on stbd (+x local). "stbd" -> sail on port (-x local). "luff" -> flapping.
  const stations = [
    { angle: 0,   label: "In irons",      sub: "head to wind",     mode: "luff" },
    { angle: 45,  label: "Close-hauled",  sub: "port tack",        tack: "port", sail: 25 },
    { angle: 90,  label: "Beam reach",    sub: "port tack",        tack: "port", sail: 55 },
    { angle: 135, label: "Broad reach",   sub: "port tack",        tack: "port", sail: 75 },
    { angle: 180, label: "Run",           sub: "downwind",         tack: "port", sail: 90 },
    { angle: 225, label: "Broad reach",   sub: "starboard tack",   tack: "stbd", sail: 75 },
    { angle: 270, label: "Beam reach",    sub: "starboard tack",   tack: "stbd", sail: 55 },
    { angle: 315, label: "Close-hauled",  sub: "starboard tack",   tack: "stbd", sail: 25 },
  ];

  const polar = (deg, r) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  let parts = [];
  parts.push(`<svg viewBox="-60 0 720 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Points of sail diagram">`);

  // wind label + arrows
  parts.push(`<text x="300" y="28" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#0c2438">WIND</text>`);
  for (const dx of [-30, 0, 30]) {
    parts.push(`<line x1="${300+dx}" y1="42" x2="${300+dx}" y2="86" stroke="#0c2438" stroke-width="1.6"/>`);
    parts.push(`<polygon points="${296+dx},80 ${300+dx},90 ${304+dx},80" fill="#0c2438"/>`);
  }

  // outer dashed ring
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${R+22}" fill="none" stroke="#d9cdb6" stroke-dasharray="2 5"/>`);

  // no-go wedge (±45° from N)
  const [tlx, tly] = polar(-45, R+22);
  const [trx, try_] = polar(45, R+22);
  parts.push(`<path d="M ${cx} ${cy} L ${tlx.toFixed(1)} ${tly.toFixed(1)} A ${R+22} ${R+22} 0 0 1 ${trx.toFixed(1)} ${try_.toFixed(1)} Z" fill="#f0e2cd" opacity="0.6"/>`);

  // boats
  for (const s of stations) {
    const [bx, by] = polar(s.angle, R);
    let g = `<g transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${s.angle})">`;
    g += `<ellipse rx="6" ry="14" fill="#fdfaf3" stroke="#0c2438" stroke-width="1.5"/>`;
    g += `<polygon points="0,-14 -3,-9 3,-9" fill="#0c2438"/>`;
    g += `<circle cx="0" cy="-3" r="1.6" fill="#0c2438"/>`;
    if (s.mode === "luff") {
      g += `<path d="M 0 -3 q 3 4 -2 7 t 2 7 q 3 3 -1 5" fill="none" stroke="#c84a1a" stroke-width="2" stroke-linecap="round"/>`;
    } else {
      const a = s.sail * Math.PI / 180;
      const len = 14;
      const dir = s.tack === "port" ? 1 : -1;
      const ex = (dir * Math.sin(a) * len).toFixed(1);
      const ey = (-3 + Math.cos(a) * len).toFixed(1);
      g += `<line x1="0" y1="-3" x2="${ex}" y2="${ey}" stroke="#c84a1a" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    g += `</g>`;
    parts.push(g);

    let lx, ly;
    if (s.angle === 0) {
      // in-irons sits inside the wedge, below the boat
      lx = cx; ly = cy - 175;
    } else {
      [lx, ly] = polar(s.angle, R + 70);
    }
    parts.push(`<text x="${lx.toFixed(0)}" y="${ly.toFixed(0)}" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#0c2438">${s.label}</text>`);
    parts.push(`<text x="${lx.toFixed(0)}" y="${(ly+15).toFixed(0)}" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#4a607a">${s.sub}</text>`);
  }

  // no-go labels
  parts.push(`<text x="${cx}" y="${cy-100}" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#c84a1a">NO-GO ZONE</text>`);
  parts.push(`<text x="${cx}" y="${cy-82}" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#4a607a">~45° each side of wind</text>`);

  parts.push(`</svg>`);
  return parts.join("");
}

// ---------- 2. Parts of a dinghy (side view) ----------
const partsOfDinghySvg = `
<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parts of a dinghy diagram">
  <rect x="0" y="380" width="800" height="140" fill="#eaeef3"/>
  <line x1="0" y1="380" x2="800" y2="380" stroke="#a8b8c8"/>

  <!-- hull -->
  <path d="M 130 320 Q 105 365 200 395 L 540 395 Q 645 360 645 320 L 645 295 L 130 295 Z"
        fill="#fdfaf3" stroke="#0c2438" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="240" y1="295" x2="540" y2="295" stroke="#0c2438" stroke-width="1" stroke-dasharray="3 4" opacity="0.4"/>

  <!-- centreboard -->
  <rect x="350" y="338" width="6" height="100" fill="#0c2438"/>

  <!-- rudder + tiller -->
  <path d="M 130 320 L 110 320 L 110 432 L 128 415 Z" fill="#0c2438"/>
  <line x1="120" y1="320" x2="225" y2="295" stroke="#0c2438" stroke-width="3" stroke-linecap="round"/>
  <line x1="225" y1="295" x2="295" y2="280" stroke="#0c2438" stroke-width="2.5" stroke-linecap="round"/>

  <!-- mast -->
  <line x1="380" y1="295" x2="380" y2="60" stroke="#0c2438" stroke-width="3.5" stroke-linecap="round"/>

  <!-- forestay -->
  <line x1="380" y1="65" x2="640" y2="295" stroke="#0c2438" stroke-width="1.2" stroke-dasharray="4 3"/>

  <!-- shroud (port side, projected) -->
  <line x1="380" y1="65" x2="280" y2="295" stroke="#0c2438" stroke-width="1.2" stroke-dasharray="4 3"/>

  <!-- boom -->
  <line x1="380" y1="305" x2="585" y2="305" stroke="#0c2438" stroke-width="3" stroke-linecap="round"/>

  <!-- mainsail -->
  <path d="M 380 75 L 380 300 L 580 305 Z" fill="#fdfaf3" fill-opacity="0.6" stroke="#0c2438" stroke-width="1.5" stroke-linejoin="round"/>

  <!-- jib -->
  <path d="M 390 88 L 632 290 L 470 280 Z" fill="#fdfaf3" fill-opacity="0.6" stroke="#0c2438" stroke-width="1.5" stroke-linejoin="round"/>

  <!-- LABELS -->
  <g font-family="Inter, sans-serif" font-size="13" fill="#0c2438">
    <text x="276" y="80" text-anchor="end" font-weight="600">Mast</text>
    <line x1="284" y1="76" x2="372" y2="76" stroke="#0c2438"/>

    <text x="455" y="190" text-anchor="middle" font-weight="600">Main sail</text>

    <text x="555" y="245" text-anchor="middle" font-weight="600">Jib</text>

    <text x="500" y="335" text-anchor="middle" font-weight="600">Boom</text>
    <line x1="500" y1="320" x2="500" y2="310" stroke="#0c2438"/>

    <text x="725" y="178" text-anchor="middle" font-size="12" fill="#4a607a">Forestay</text>
    <line x1="700" y1="180" x2="555" y2="220" stroke="#4a607a"/>

    <text x="225" y="200" text-anchor="middle" font-size="12" fill="#4a607a">Shroud</text>
    <line x1="248" y1="206" x2="320" y2="220" stroke="#4a607a"/>

    <text x="380" y="468" text-anchor="middle" font-weight="600">Hull</text>
    <line x1="380" y1="455" x2="380" y2="405" stroke="#0c2438"/>

    <text x="700" y="305" text-anchor="start" font-weight="600">Bow</text>
    <line x1="660" y1="305" x2="690" y2="305" stroke="#0c2438"/>

    <text x="60" y="305" text-anchor="end" font-weight="600">Stern</text>
    <line x1="105" y1="305" x2="65" y2="305" stroke="#0c2438"/>

    <text x="305" y="270" text-anchor="middle" font-size="12">Tiller</text>
    <line x1="305" y1="278" x2="270" y2="289" stroke="#0c2438"/>

    <text x="55" y="426" text-anchor="end" font-weight="600">Rudder</text>
    <line x1="62" y1="422" x2="105" y2="415" stroke="#0c2438"/>

    <text x="430" y="430" text-anchor="start" font-weight="600">Centreboard</text>
    <line x1="425" y1="426" x2="365" y2="410" stroke="#0c2438"/>
  </g>
</svg>`;

// ---------- 3. Sail anatomy ----------
const sailAnatomySvg = `
<svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sail anatomy diagram">
  <!-- mast -->
  <line x1="120" y1="50" x2="120" y2="320" stroke="#0c2438" stroke-width="3.5" stroke-linecap="round"/>
  <!-- boom -->
  <line x1="120" y1="305" x2="385" y2="305" stroke="#0c2438" stroke-width="3.5" stroke-linecap="round"/>

  <!-- sail body -->
  <path d="M 120 60 L 120 300 L 380 305 Z" fill="#fdfaf3" stroke="#0c2438" stroke-width="2" stroke-linejoin="round"/>

  <!-- battens (in pockets, dashed) -->
  <line x1="124" y1="120" x2="345" y2="240" stroke="#a8927a" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="124" y1="195" x2="365" y2="280" stroke="#a8927a" stroke-width="1.5" stroke-dasharray="4 4"/>

  <!-- corner dots -->
  <circle cx="120" cy="60" r="4" fill="#c84a1a"/>
  <circle cx="120" cy="305" r="4" fill="#c84a1a"/>
  <circle cx="380" cy="305" r="4" fill="#c84a1a"/>

  <!-- corner labels -->
  <text x="120" y="38" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#c84a1a">HEAD</text>
  <text x="86" y="312" text-anchor="end" font-family="Inter, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#c84a1a">TACK</text>
  <text x="402" y="312" text-anchor="start" font-family="Inter, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#c84a1a">CLEW</text>

  <!-- edge labels (italic) -->
  <text x="80" y="185" text-anchor="middle" font-family="Fraunces, serif" font-size="16" font-style="italic" fill="#4a607a">luff</text>
  <text x="275" y="172" text-anchor="middle" font-family="Fraunces, serif" font-size="16" font-style="italic" fill="#4a607a">leach</text>
  <text x="250" y="345" text-anchor="middle" font-family="Fraunces, serif" font-size="16" font-style="italic" fill="#4a607a">foot</text>

  <text x="240" y="100" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#a8927a">battens (in pockets)</text>
</svg>`;

// ---------- 4. Right of way: port vs starboard tack ----------
const rightOfWaySvg = `
<svg viewBox="0 0 600 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right of way: port vs starboard tack">
  <!-- wind -->
  <text x="300" y="28" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#0c2438">WIND</text>
  <line x1="270" y1="42" x2="270" y2="82" stroke="#0c2438" stroke-width="1.6"/>
  <polygon points="266,77 270,87 274,77" fill="#0c2438"/>
  <line x1="300" y1="42" x2="300" y2="82" stroke="#0c2438" stroke-width="1.6"/>
  <polygon points="296,77 300,87 304,77" fill="#0c2438"/>
  <line x1="330" y1="42" x2="330" y2="82" stroke="#0c2438" stroke-width="1.6"/>
  <polygon points="326,77 330,87 334,77" fill="#0c2438"/>

  <!-- crossing point -->
  <circle cx="300" cy="220" r="14" fill="none" stroke="#c84a1a" stroke-width="1.4" stroke-dasharray="3 3"/>
  <text x="300" y="252" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#4a607a">crossing point</text>

  <!-- course lines (dashed) -->
  <line x1="160" y1="380" x2="300" y2="220" stroke="#0c2438" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>
  <line x1="440" y1="380" x2="300" y2="220" stroke="#0c2438" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>

  <!-- BOAT A: lower-RIGHT, heading NW (close-hauled stbd tack, sail to port = local -X = LEFT after rotation) -->
  <g transform="translate(440 380) rotate(-45)">
    <ellipse rx="14" ry="34" fill="#fdfaf3" stroke="#0c2438" stroke-width="2"/>
    <polygon points="0,-34 -6,-22 6,-22" fill="#0c2438"/>
    <circle cx="0" cy="-8" r="2.5" fill="#0c2438"/>
    <line x1="0" y1="-8" x2="-10" y2="20" stroke="#c84a1a" stroke-width="3" stroke-linecap="round"/>
  </g>

  <!-- BOAT B: lower-LEFT, heading NE (close-hauled port tack, sail to stbd = local +X = RIGHT after rotation) -->
  <g transform="translate(160 380) rotate(45)">
    <ellipse rx="14" ry="34" fill="#fdfaf3" stroke="#0c2438" stroke-width="2"/>
    <polygon points="0,-34 -6,-22 6,-22" fill="#0c2438"/>
    <circle cx="0" cy="-8" r="2.5" fill="#0c2438"/>
    <line x1="0" y1="-8" x2="10" y2="20" stroke="#c84a1a" stroke-width="3" stroke-linecap="round"/>
  </g>

  <!-- Labels -->
  <g font-family="Inter, sans-serif">
    <rect x="478" y="370" width="108" height="48" rx="6" fill="#e8f3ec" stroke="#2f7d4f" stroke-width="1"/>
    <text x="532" y="389" text-anchor="middle" font-size="12" font-weight="700" fill="#2f7d4f">STARBOARD</text>
    <text x="532" y="404" text-anchor="middle" font-size="11" fill="#2f7d4f">right of way ✓</text>

    <rect x="14" y="370" width="108" height="48" rx="6" fill="#fbe8e0" stroke="#c84a1a" stroke-width="1"/>
    <text x="68" y="389" text-anchor="middle" font-size="12" font-weight="700" fill="#c84a1a">PORT TACK</text>
    <text x="68" y="404" text-anchor="middle" font-size="11" fill="#c84a1a">gives way ✗</text>
  </g>

  <!-- Tip text -->
  <text x="300" y="455" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#4a607a">A boat on starboard tack (boom on the port side) has right of way over a boat on port tack.</text>
</svg>`;

const DIAGRAMS = [
  {
    id: "points-of-sail",
    title: "Points of sail",
    caption: "Where the wind hits the boat — and how the sails sit — at every angle of sailing. The shaded wedge is the no-go zone you can't sail directly into.",
    svg: pointsOfSailSvg(),
  },
  {
    id: "parts-of-dinghy",
    title: "Parts of a dinghy",
    caption: "A typical single-handed dinghy in side view. Bow on the right, stern on the left.",
    svg: partsOfDinghySvg,
  },
  {
    id: "sail-anatomy",
    title: "Anatomy of a sail",
    caption: "Three corners: head (top), tack (front-bottom), clew (back-bottom). Three edges: luff, leach, foot. Battens stiffen the leach.",
    svg: sailAnatomySvg,
  },
  {
    id: "right-of-way",
    title: "Right of way · port vs starboard tack",
    caption: "When two close-hauled boats meet on opposite tacks, the boat on starboard tack holds course and the boat on port tack must keep clear.",
    svg: rightOfWaySvg,
  },
];
