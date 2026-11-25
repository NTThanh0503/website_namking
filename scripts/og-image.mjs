// Tạo ảnh chia sẻ mạng xã hội public/og-image.png (1200 x 630) theo bộ nhận diện NAM KINH GROUP.
// Chạy: node scripts/og-image.mjs
import sharp from 'sharp';

const NK_VIEWBOX = '373 405 1176 941';
const NK_PATH =
  'M373 405H865L867 523C945 526 995 470 1013 405H1532C1500 620 1400 760 1284 851C1420 940 1549 1110 1549 1346H1086L948 1222V1346H373Z' +
  'M510 533H764L831 635C890 568 950 537 1027 537C1140 537 1225 615 1231 727V1215H948V800C948 745 905 709 850 709C800 709 780 725 750 757L660 851H775V1215H510Z';

const W = 1200, H = 630;
const cx = 905, cy = 300; // tâm vòng quỹ đạo
const font = "'Segoe UI', 'Be Vietnam Pro', Arial, sans-serif";

const dots = [];
for (let x = 14; x < W; x += 28) for (let y = 14; y < H; y += 28) dots.push(`<circle cx="${x}" cy="${y}" r="1.2"/>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#680a12"/><stop offset="1" stop-color="#4a070d"/>
    </linearGradient>
    <radialGradient id="glow" cx="${cx}" cy="${cy - 40}" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#b8434d" stop-opacity=".55"/><stop offset="1" stop-color="#b8434d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="core" cx="${cx}" cy="${cy}" r="150" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f4c2bc" stop-opacity=".55"/><stop offset=".45" stop-color="#b8434d" stop-opacity=".35"/><stop offset="1" stop-color="#b8434d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="${cx}" cy="${cy}" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="dotmask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
    <radialGradient id="vig" cx="600" cy="315" r="760" gradientUnits="userSpaceOnUse">
      <stop offset=".55" stop-color="#1e0306" stop-opacity="0"/><stop offset="1" stop-color="#1e0306" stop-opacity=".55"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g fill="#ffffff" fill-opacity=".1" mask="url(#dotmask)">${dots.join('')}</g>

  <!-- Vòng quỹ đạo + biểu tượng nk ở giữa -->
  <g fill="none">
    <circle cx="${cx}" cy="${cy}" r="250" stroke="#f0ece9" stroke-opacity=".16"/>
    <circle cx="${cx}" cy="${cy}" r="190" stroke="#f0ece9" stroke-opacity=".24" stroke-dasharray="2 6"/>
    <circle cx="${cx}" cy="${cy}" r="130" stroke="#f4c2bc" stroke-opacity=".4" stroke-dasharray="40 14"/>
  </g>
  <circle cx="${cx}" cy="${cy}" r="150" fill="url(#core)"/>
  <circle cx="${cx}" cy="${cy}" r="78" fill="#4a070d" fill-opacity=".6" stroke="#f4c2bc" stroke-opacity=".6"/>
  <svg x="${cx - 46}" y="${cy - 37}" width="92" height="74" viewBox="${NK_VIEWBOX}"><path d="${NK_PATH}" fill="#f6f1ee" fill-rule="evenodd"/></svg>
  <circle cx="${cx}" cy="${cy - 190}" r="5" fill="#f4c2bc"/>
  <circle cx="${cx + 130}" cy="${cy}" r="4" fill="#f0ece9"/>
  ${[[cx - 190, cy - 130], [cx + 170, cy + 120], [cx - 120, cy + 190]].map(([x, y]) => `
  <circle cx="${x}" cy="${y}" r="20" fill="#4a070d" stroke="#f4c2bc" stroke-opacity=".75"/>
  <circle cx="${x}" cy="${y}" r="6" fill="#f6f1ee"/>`).join('')}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>

  <!-- Logo -->
  <svg x="72" y="72" width="70" height="56" viewBox="${NK_VIEWBOX}"><path d="${NK_PATH}" fill="#f0ece9" fill-rule="evenodd"/></svg>
  <text x="160" y="113" font-family="${font}" font-size="30" font-weight="900" fill="#f0ece9" letter-spacing=".5">NAM KINH GROUP</text>

  <!-- Khẩu hiệu -->
  <g font-family="${font}" font-weight="700" font-size="64" letter-spacing="-1">
    <text x="72" y="262" fill="#f6f1ee">Số hóa điểm đến.</text>
    <text x="72" y="342" fill="#f4c2bc">Lấp đầy phòng nghỉ.</text>
    <text x="72" y="422" fill="#f0ece9" fill-opacity=".72">Dẫn lối hành trình.</text>
  </g>
  <text x="72" y="494" font-family="${font}" font-size="24" fill="#f0ece9" fill-opacity=".78">Chuyển đổi số · Lưu trú · Du lịch</text>
  <rect x="72" y="532" width="250" height="4" rx="2" fill="#f4c2bc"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-image.png');
console.log('Đã tạo public/og-image.png');
