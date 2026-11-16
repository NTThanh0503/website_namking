// Sinh các đường đồng mức (giống ruộng bậc thang / bản đồ địa hình)
// dùng làm hình minh họa SVG – không cần ảnh, nhẹ và sắc nét mọi kích thước.

function rand(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function contourPaths(opts: {
  width: number;
  height: number;
  lines: number;
  seed?: number;
  amplitude?: number;
}) {
  const { width, height, lines, seed = 7, amplitude = 26 } = opts;
  const r = rand(seed);
  const waves = Array.from({ length: 3 }, () => ({
    f: 0.004 + r() * 0.01,
    p: r() * Math.PI * 2,
    a: 0.4 + r() * 0.6,
  }));
  const gap = height / (lines + 1);
  const paths: string[] = [];
  for (let i = 0; i < lines; i++) {
    const base = gap * (i + 1);
    const drift = i * 0.35;
    let d = '';
    for (let x = -20; x <= width + 20; x += 12) {
      let y = base;
      for (const w of waves) y += Math.sin(x * w.f + w.p + drift) * amplitude * w.a;
      y += Math.sin((x + i * 40) * 0.02) * 3;
      d += `${x === -20 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    paths.push(d.trim());
  }
  return paths;
}
