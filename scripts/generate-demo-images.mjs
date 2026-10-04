import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

function ensure(file) {
  mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
}

function star(cx, cy, r, fill) {
  const points = [];
  for (let i = 0; i < 8; i += 1) {
    const radius = i % 2 === 0 ? r : r * 0.42;
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    points.push(`${(cx + Math.cos(angle) * radius).toFixed(1)},${(cy + Math.sin(angle) * radius).toFixed(1)}`);
  }
  return `<polygon points="${points.join(" ")}" fill="${fill}"/>`;
}

function motif(kind, ink, accent) {
  switch (kind) {
    case "water":
      return `
        <ellipse cx="600" cy="520" rx="250" ry="70" fill="${accent}" opacity="0.18"/>
        <path d="M390 500 Q450 470 510 500 T630 500 T750 500 T810 500" fill="none" stroke="${ink}" stroke-width="3"/>
        <path d="M410 530 Q470 500 530 530 T650 530 T770 530" fill="none" stroke="${accent}" stroke-width="2"/>
        ${star(600, 360, 28, accent)}
      `;
    case "plate":
      return `
        <ellipse cx="600" cy="530" rx="150" ry="28" fill="${ink}" opacity="0.08"/>
        <circle cx="600" cy="470" r="78" fill="none" stroke="${ink}" stroke-width="3"/>
        <circle cx="600" cy="470" r="48" fill="none" stroke="${accent}" stroke-width="2"/>
        ${star(600, 470, 16, accent)}
      `;
    case "leaf":
      return `
        <path d="M600 560 C520 480 500 360 600 300 C700 360 680 480 600 560 Z" fill="${ink}" opacity="0.08" stroke="${ink}" stroke-width="2"/>
        <path d="M600 540 V330" stroke="${accent}" stroke-width="2"/>
        ${star(600, 300, 18, accent)}
      `;
    case "cup":
      return `
        <path d="M500 430 h160 v70 a80 80 0 0 1 -160 0 z" fill="#F7F3EB" stroke="${ink}" stroke-width="3"/>
        <path d="M660 460 h30 a40 40 0 0 1 0 50 h-30" fill="none" stroke="${ink}" stroke-width="3"/>
        <path d="M540 410 q60 -30 120 0" fill="none" stroke="${accent}" stroke-width="2"/>
      `;
    case "waves":
      return `
        <path d="M430 470 Q490 430 550 470 T670 470 T790 470" fill="none" stroke="${ink}" stroke-width="3"/>
        <path d="M450 510 Q510 470 570 510 T690 510 T790 510" fill="none" stroke="${accent}" stroke-width="3"/>
        <path d="M470 550 Q530 510 590 550 T710 550" fill="none" stroke="${ink}" stroke-width="2"/>
      `;
    case "lotus":
      return `
        <ellipse cx="600" cy="500" rx="36" ry="70" fill="none" stroke="${ink}" stroke-width="2"/>
        <ellipse cx="600" cy="500" rx="36" ry="70" transform="rotate(60 600 500)" fill="none" stroke="${accent}" stroke-width="2"/>
        <ellipse cx="600" cy="500" rx="36" ry="70" transform="rotate(120 600 500)" fill="none" stroke="${ink}" stroke-width="2"/>
        <circle cx="600" cy="500" r="10" fill="${accent}"/>
      `;
    case "bell":
      return `
        <path d="M600 390 v-24" stroke="${ink}" stroke-width="3"/>
        <path d="M520 520 q80 -150 160 0 v30 H520 z" fill="#F7F3EB" stroke="${ink}" stroke-width="3"/>
        <path d="M500 550 h200" stroke="${accent}" stroke-width="3"/>
        <circle cx="600" cy="575" r="10" fill="${accent}"/>
      `;
    case "road":
      return `
        <path d="M470 580 C530 470 560 430 600 360 C640 430 670 470 730 580" fill="none" stroke="${ink}" stroke-width="3"/>
        <circle cx="600" cy="470" r="34" fill="none" stroke="${accent}" stroke-width="3"/>
        <path d="M600 448 v44 M578 470 h44" stroke="${accent}" stroke-width="2"/>
      `;
    case "wifi":
      return `
        <path d="M470 470 a150 150 0 0 1 260 0" fill="none" stroke="${ink}" stroke-width="3"/>
        <path d="M510 510 a100 100 0 0 1 180 0" fill="none" stroke="${accent}" stroke-width="3"/>
        <path d="M550 548 a50 50 0 0 1 100 0" fill="none" stroke="${ink}" stroke-width="3"/>
        <circle cx="600" cy="590" r="8" fill="${accent}"/>
      `;
    case "mark":
      return `
        <rect x="545" y="430" width="110" height="110" fill="none" stroke="${ink}" stroke-width="3"/>
        <text x="600" y="505" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="${accent}">P</text>
      `;
    default:
      return star(600, 430, 34, accent);
  }
}

function scene({ w, h, bg, ink, accent, wash, kind, label }) {
  const arch = motif(kind, ink, accent);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <g opacity="0.28" stroke="${accent}" fill="none" stroke-width="1">
    ${Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => {
        const x = 70 + col * (w / 10);
        const y = 60 + row * (h / 9);
        return `<path d="M${x} ${y + 10} l8 -10 l8 10 l-8 10 z"/>`;
      }).join(""),
    ).join("")}
  </g>
  <rect x="48" y="40" width="${w - 96}" height="${h - 80}" fill="none" stroke="${ink}" stroke-width="2"/>
  <rect x="64" y="56" width="${w - 128}" height="${h - 112}" fill="none" stroke="${accent}" stroke-width="1"/>
  <rect x="64" y="${Math.round(h * 0.72)}" width="${w - 128}" height="${Math.round(h * 0.18)}" fill="${wash}"/>
  <path d="M${w * 0.28} ${h * 0.74} V${h * 0.46} C${w * 0.28} ${h * 0.24} ${w * 0.72} ${h * 0.24} ${w * 0.72} ${h * 0.46} V${h * 0.74}" fill="${bg}" stroke="${ink}" stroke-width="3"/>
  <path d="M${w * 0.35} ${h * 0.74} V${h * 0.48} C${w * 0.35} ${h * 0.32} ${w * 0.65} ${h * 0.32} ${w * 0.65} ${h * 0.48} V${h * 0.74}" fill="${ink}" opacity="0.06" stroke="${accent}" stroke-width="1.5"/>
  <g transform="translate(${(w / 2 - 600).toFixed(1)} ${(h * 0.5 - 480).toFixed(1)})">
    ${arch}
  </g>
  <text x="${w / 2}" y="${h - 58}" text-anchor="middle" font-family="Georgia, 'Palatino Linotype', serif" font-size="22" letter-spacing="4" fill="${ink}">${label}</text>
</svg>`;
}

function logo() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <rect width="160" height="160" rx="4" fill="#14352C"/>
  <path d="M38 118 V74 C38 40 122 40 122 74 V118" fill="none" stroke="#F7F3EB" stroke-width="4"/>
  <path d="M54 118 V78 C54 56 106 56 106 78 V118" fill="none" stroke="#C6A15B" stroke-width="2"/>
  ${star(80, 78, 12, "#C6A15B")}
</svg>`;
}

function favicon() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#14352C"/>
  <path d="M7 25 V15 C7 8 25 8 25 15 V25" fill="none" stroke="#F7F3EB" stroke-width="1.7"/>
  <path d="M16 12 l1.6 3.2 l3.4.2 l-2.6 2.2 l.8 3.4 l-3.2 -1.8 l-3.2 1.8 l.8 -3.4 l-2.6 -2.2 l3.4 -.2 z" fill="#C6A15B"/>
</svg>`;
}

const ink = "#14352C";
const accent = "#8C6A2B";
const jobs = [
  ["hero/hero.svg", scene({ w: 1600, h: 1000, bg: "#E7DCC8", ink, accent, wash: "#7A3E2A22", kind: "arch", label: "VISUEL DE DEMONSTRATION" })],
  ["logo/logo.svg", logo()],
  ["logo/favicon.svg", favicon()],
  ["rooms/standard-1.svg", scene({ w: 1200, h: 900, bg: "#F3EBDD", ink, accent, wash: "#7A3E2A1A", kind: "arch", label: "CHAMBRE STANDARD" })],
  ["rooms/standard-2.svg", scene({ w: 1200, h: 900, bg: "#EFE4D4", ink, accent, wash: "#14352C14", kind: "leaf", label: "CHAMBRE STANDARD" })],
  ["rooms/standard-3.svg", scene({ w: 1200, h: 900, bg: "#F7F1E6", ink, accent, wash: "#8C6A2B22", kind: "plate", label: "CHAMBRE STANDARD" })],
  ["rooms/deluxe-1.svg", scene({ w: 1200, h: 900, bg: "#E6DDD0", ink, accent, wash: "#14352C18", kind: "arch", label: "CHAMBRE DELUXE" })],
  ["rooms/deluxe-2.svg", scene({ w: 1200, h: 900, bg: "#E9E2D4", ink, accent, wash: "#7A3E2A1F", kind: "lotus", label: "CHAMBRE DELUXE" })],
  ["rooms/deluxe-3.svg", scene({ w: 1200, h: 900, bg: "#F4EBDD", ink, accent, wash: "#8C6A2B1F", kind: "leaf", label: "CHAMBRE DELUXE" })],
  ["rooms/suite-1.svg", scene({ w: 1200, h: 900, bg: "#E8DFD0", ink, accent, wash: "#14352C1A", kind: "arch", label: "SUITE" })],
  ["rooms/suite-2.svg", scene({ w: 1200, h: 900, bg: "#F1E6D6", ink, accent, wash: "#7A3E2A1A", kind: "plate", label: "SUITE" })],
  ["rooms/suite-3.svg", scene({ w: 1200, h: 900, bg: "#E7E0D4", ink, accent, wash: "#8C6A2B24", kind: "lotus", label: "SUITE" })],
  ["rooms/familiale-1.svg", scene({ w: 1200, h: 900, bg: "#F6EEE2", ink, accent, wash: "#7A3E2A1C", kind: "arch", label: "SUITE FAMILIALE" })],
  ["rooms/familiale-2.svg", scene({ w: 1200, h: 900, bg: "#EFE6D8", ink, accent, wash: "#14352C14", kind: "leaf", label: "SUITE FAMILIALE" })],
  ["rooms/familiale-3.svg", scene({ w: 1200, h: 900, bg: "#F3E7D8", ink, accent, wash: "#8C6A2B1E", kind: "cup", label: "SUITE FAMILIALE" })],
  ["services/petit-dejeuner.svg", scene({ w: 1000, h: 700, bg: "#F6EFE3", ink, accent, wash: "#7A3E2A16", kind: "cup", label: "PETIT-DEJEUNER" })],
  ["services/wifi.svg", scene({ w: 1000, h: 700, bg: "#EFE6D8", ink, accent, wash: "#14352C12", kind: "wifi", label: "WI-FI" })],
  ["services/piscine.svg", scene({ w: 1000, h: 700, bg: "#E4E7E2", ink: "#1A3E4C", accent: "#2E6B78", wash: "#2E6B7818", kind: "water", label: "PISCINE" })],
  ["services/spa.svg", scene({ w: 1000, h: 700, bg: "#F3E9E4", ink: "#5C4654", accent: "#8C6A2B", wash: "#5C465414", kind: "lotus", label: "SPA" })],
  ["services/restaurant.svg", scene({ w: 1000, h: 700, bg: "#F3E6D8", ink, accent, wash: "#7A3E2A18", kind: "plate", label: "RESTAURANT" })],
  ["services/parking.svg", scene({ w: 1000, h: 700, bg: "#E8E4DC", ink, accent, wash: "#14352C14", kind: "mark", label: "PARKING" })],
  ["services/reception.svg", scene({ w: 1000, h: 700, bg: "#F4EBDD", ink, accent, wash: "#8C6A2B18", kind: "bell", label: "RECEPTION" })],
  ["services/navette.svg", scene({ w: 1000, h: 700, bg: "#E9E3D8", ink, accent, wash: "#14352C16", kind: "road", label: "NAVETTE" })],
  ["services/room-service.svg", scene({ w: 1000, h: 700, bg: "#F7F0E4", ink, accent, wash: "#7A3E2A14", kind: "plate", label: "ROOM SERVICE" })],
  ["gallery/exterieur-1.svg", scene({ w: 1200, h: 900, bg: "#E7EFE8", ink, accent, wash: "#14352C16", kind: "arch", label: "EXTERIEUR" })],
  ["gallery/exterieur-2.svg", scene({ w: 1200, h: 900, bg: "#EFE6D4", ink, accent, wash: "#7A3E2A16", kind: "leaf", label: "EXTERIEUR" })],
  ["gallery/piscine-1.svg", scene({ w: 1200, h: 900, bg: "#E3EEEA", ink: "#1A3E4C", accent: "#2E6B78", wash: "#2E6B781C", kind: "water", label: "PISCINE" })],
  ["gallery/piscine-2.svg", scene({ w: 1200, h: 900, bg: "#E7F0EC", ink: "#1A3E4C", accent: "#8C6A2B", wash: "#1A3E4C14", kind: "waves", label: "PISCINE" })],
  ["gallery/restaurant-1.svg", scene({ w: 1200, h: 900, bg: "#F4E5D4", ink, accent, wash: "#7A3E2A1A", kind: "plate", label: "RESTAURANT" })],
  ["gallery/restaurant-2.svg", scene({ w: 1200, h: 900, bg: "#F1E2D2", ink, accent, wash: "#14352C12", kind: "cup", label: "RESTAURANT" })],
  ["gallery/spa-1.svg", scene({ w: 1200, h: 900, bg: "#F4EAE6", ink: "#5C4654", accent: "#8C6A2B", wash: "#5C465416", kind: "lotus", label: "SPA" })],
  ["gallery/spa-2.svg", scene({ w: 1200, h: 900, bg: "#F7EFEA", ink: "#5C4654", accent: "#7A3E2A", wash: "#8C6A2B18", kind: "leaf", label: "SPA" })],
  ["gallery/communs-1.svg", scene({ w: 1200, h: 900, bg: "#F3EBDD", ink, accent, wash: "#14352C14", kind: "arch", label: "ESPACES COMMUNS" })],
  ["gallery/communs-2.svg", scene({ w: 1200, h: 900, bg: "#EFE4D6", ink, accent, wash: "#7A3E2A14", kind: "bell", label: "ESPACES COMMUNS" })],
];

for (const [file, contents] of jobs) {
  const target = path.join(root, file);
  ensure(file);
  writeFileSync(target, contents, "utf8");
}

console.log(`Generated ${jobs.length} demonstration images.`);
