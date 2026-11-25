// Tạo ẢNH MẪU tạm thời (phong cảnh vẽ bằng máy) cho các ô ảnh của website.
// Chạy: node scripts/placeholder-photos.mjs
// Khi có ảnh thật: chép đè ảnh thật lên đúng tên file trong public/images/... (không cần chạy lại script).
// Script KHÔNG ghi đè file đã có, trừ khi chạy kèm --force.
import { mkdirSync, existsSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200, H = 900;
const force = process.argv.includes('--force');

const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// Đường chân trời gồ ghề (núi, mái nhà, rặng cây)
function ridge(r, base, amp, step, rough) {
  let y = base, pts = [`M0 ${H}`, `L0 ${base}`];
  for (let x = 0; x <= W + step; x += step) {
    y += (r() - 0.5) * rough;
    y = Math.max(base - amp, Math.min(base + amp, y));
    pts.push(`L${x} ${y.toFixed(1)}`);
  }
  return pts.join(' ') + ` L${W} ${H} Z`;
}

const scenes = {
  // Biển / resort lúc hoàng hôn xanh
  sea(r) {
    const hz = 520 + r() * 60, sx = 300 + r() * 600;
    const palms = Array.from({ length: 3 }, (_, i) => {
      const x = i === 0 ? 60 + r() * 120 : W - 80 - r() * 260 * i, h = 330 + r() * 120, lean = (r() - 0.5) * 70;
      const top = `${x + lean} ${hz + 160 - h}`;
      const fronds = Array.from({ length: 7 }, (_, k) => {
        const a = (k / 6) * Math.PI + Math.PI, len = 90 + r() * 50;
        return `<path d="M${top} Q ${x + lean + Math.cos(a) * len * 0.6} ${hz + 140 - h + Math.sin(a) * len * 0.3 - 30} ${x + lean + Math.cos(a) * len} ${hz + 175 - h + Math.abs(Math.sin(a)) * 10 + 40}" stroke="#02040a" stroke-width="10" fill="none" stroke-linecap="round"/>`;
      }).join('');
      return `<path d="M${x} ${H} Q ${x + lean * 0.3} ${hz + 160 - h / 2} ${top}" stroke="#02040a" stroke-width="14" fill="none"/>${fronds}`;
    }).join('');
    const ripples = Array.from({ length: 40 }, () => {
      const y = hz + 8 + r() * (H - hz), w = 30 + r() * 160 * ((y - hz) / (H - hz) + 0.3);
      const x = sx - w / 2 + (r() - 0.5) * 180;
      return `<rect x="${x}" y="${y}" width="${w}" height="${1.5 + r() * 3}" rx="2" fill="#ffd9a6" opacity="${0.15 + r() * 0.4}"/>`;
    }).join('');
    const lights = Array.from({ length: 18 }, () => `<circle cx="${r() * W}" cy="${hz - 4 - r() * 14}" r="${1.5 + r() * 2.5}" fill="#ffcf8a" opacity="${0.5 + r() * 0.5}"/>`).join('');
    return `
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1f5c"/><stop offset=".55" stop-color="#3567b8"/><stop offset=".9" stop-color="#f2a96b"/><stop offset="1" stop-color="#ffcf91"/></linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b5a9e"/><stop offset="1" stop-color="#06122f"/></linearGradient>
      <rect width="${W}" height="${hz}" fill="url(#sky)"/>
      <circle cx="${sx}" cy="${hz - 10}" r="${110 + r() * 40}" fill="#ffd8a0" opacity=".45" filter="url(#soft)"/>
      <circle cx="${sx}" cy="${hz - 6}" r="34" fill="#ffe9c7"/>
      <path d="${ridge(r, hz - 30, 30, 40, 26)}" fill="#14274f" opacity=".85"/>
      ${lights}
      <rect y="${hz}" width="${W}" height="${H - hz}" fill="url(#sea)"/>
      ${ripples}
      <path d="M0 ${H - 90} Q ${W / 2} ${H - 150} ${W} ${H - 70} L${W} ${H} L0 ${H} Z" fill="#050a18"/>
      ${palms}`;
  },
  // Núi nhiều lớp, sương mù (Hà Giang, Đà Lạt)
  mountain(r) {
    const layers = [
      [380, '#5d79b8', 0.9], [470, '#3c5a9a', 1], [560, '#243e78', 1], [650, '#142857', 1], [760, '#07122e', 1],
    ].map(([b, c, o], i) => `<path d="${ridge(r, b + r() * 40, 110 - i * 12, 30 + i * 6, 46 - i * 4)}" fill="${c}" opacity="${o}"/>
      <rect y="${b + 40}" width="${W}" height="70" fill="#c9d8ff" opacity=".12" filter="url(#soft)"/>`).join('');
    const sx = 250 + r() * 700;
    const pines = Array.from({ length: 26 }, () => {
      const x = r() * W, h = 50 + r() * 90, y = H - 40 - r() * 60;
      return `<path d="M${x} ${y - h} L${x - h * 0.28} ${y} L${x + h * 0.28} ${y} Z" fill="#02060f"/>`;
    }).join('');
    const houses = Array.from({ length: 6 }, () => {
      const x = r() * W, y = 640 + r() * 80;
      return `<rect x="${x}" y="${y}" width="9" height="7" fill="#ffc77a" opacity=".85"/>`;
    }).join('');
    return `
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091a4d"/><stop offset=".5" stop-color="#4e74c4"/><stop offset="1" stop-color="#f0b98a"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#sky)"/>
      <circle cx="${sx}" cy="${360 + r() * 60}" r="150" fill="#ffd9a8" opacity=".35" filter="url(#soft)"/>
      <circle cx="${sx}" cy="${380 + r() * 40}" r="30" fill="#fff0d6" opacity=".9"/>
      ${layers}${houses}${pines}`;
  },
  // Phố / thành phố về đêm với ánh đèn ấm (Hội An, Huế, TP.HCM)
  town(r) {
    const hz = 560;
    const bld = [];
    for (let x = -20; x < W; ) {
      const w = 60 + r() * 120, h = 120 + r() * 300, y = hz - h;
      bld.push(`<rect x="${x}" y="${y}" width="${w}" height="${h + 400}" fill="#0a1638"/>`);
      if (r() > 0.45) bld.push(`<path d="M${x - 8} ${y} L${x + w / 2} ${y - 30 - r() * 20} L${x + w + 8} ${y} Z" fill="#0d1c46"/>`);
      for (let wy = y + 18; wy < hz - 10; wy += 26) for (let wx = x + 10; wx < x + w - 14; wx += 22)
        if (r() > 0.55) bld.push(`<rect x="${wx}" y="${wy}" width="10" height="13" fill="#ffc979" opacity="${0.4 + r() * 0.6}"/>`);
      x += w + 4;
    }
    const lanterns = Array.from({ length: 22 }, () => {
      const x = r() * W, y = 470 + r() * 140, c = r() > 0.4 ? '#ff9d4d' : '#ffd27a';
      return `<circle cx="${x}" cy="${y}" r="${16 + r() * 18}" fill="${c}" opacity=".35" filter="url(#soft)"/><ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="${c}"/>`;
    }).join('');
    const refl = Array.from({ length: 50 }, () => `<rect x="${r() * W}" y="${hz + 10 + r() * (H - hz)}" width="${20 + r() * 80}" height="2.5" fill="#ffc979" opacity="${0.12 + r() * 0.35}"/>`).join('');
    return `
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040b26"/><stop offset=".7" stop-color="#1b3f8f"/><stop offset="1" stop-color="#4a6fc0"/></linearGradient>
      <linearGradient id="river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14306e"/><stop offset="1" stop-color="#030816"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#sky)"/>
      ${Array.from({ length: 40 }, () => `<circle cx="${r() * W}" cy="${r() * 260}" r="${0.8 + r() * 1.4}" fill="#dfe8ff" opacity="${0.3 + r() * 0.6}"/>`).join('')}
      ${bld.join('')}
      <rect y="${hz}" width="${W}" height="${H - hz}" fill="url(#river)"/>
      ${refl}${lanterns}`;
  },
};

const jobs = [
  ['du-an/tour-360-pho-co', 'town', 11], ['du-an/resort-bien-phu-quoc', 'sea', 21], ['du-an/mice-ngan-hang', 'sea', 37],
  ['du-an/website-homestay-da-lat', 'mountain', 43], ['du-an/can-ho-dich-vu-q1', 'town', 59], ['du-an/ha-giang-trai-nghiem', 'mountain', 67],
  ['du-an/bao-tang-so', 'town', 83], ['du-an/team-building-cong-nghe', 'sea', 97],
  ['dich-vu/diem-den-so', 'town', 101], ['dich-vu/ket-noi-du-lich', 'sea', 113], ['dich-vu/trai-nghiem-so', 'mountain', 127],
  ['gioi-thieu/cau-chuyen', 'mountain', 139],
];

for (const [name, kind, seed] of jobs) {
  const file = `public/images/${name}.jpg`;
  if (existsSync(file) && !force) { console.log('bỏ qua (đã có):', file); continue; }
  mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter></defs>
    ${scenes[kind](rng(seed))}</svg>`;
  await sharp(Buffer.from(svg)).blur(1.2).jpeg({ quality: 78, mozjpeg: true }).toFile(file);
  console.log('đã tạo:', file);
}
