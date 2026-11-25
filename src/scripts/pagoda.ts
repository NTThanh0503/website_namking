// =============================================================
//  NỀN CÔNG NGHỆ SỐ CHO PHẦN ĐẦU TRANG
//  1) initPagoda: mô hình Chùa Một Cột 3D dạng khung dây, xoay chậm,
//     có tia quét "số hóa", lưới sàn số, gợn nước, hạt dữ liệu bay lên.
//  2) initNetwork: mạng điểm dữ liệu trôi nhẹ cho phần đầu các trang con.
//  Vẽ bằng Canvas 2D thuần (không cần thư viện 3D), tự dừng khi khuất màn hình.
// =============================================================

type V3 = [number, number, number];
type Seg = { a: V3; b: V3; w: number; my: number }; // w: độ đậm gốc, my: độ cao giữa đoạn

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Dựng hình Chùa Một Cột (đơn vị tùy ý, trục y hướng lên) ---------- */
function buildPagoda(): Seg[] {
  const segs: Seg[] = [];
  const line = (a: V3, b: V3, w = 1) => segs.push({ a, b, w, my: (a[1] + b[1]) / 2 });
  const poly = (pts: V3[], closed = true, w = 1) => {
    for (let i = 0; i < pts.length - (closed ? 0 : 1); i++) line(pts[i], pts[(i + 1) % pts.length], w);
  };
  const ring = (y: number, r: number, n: number, w = 1) =>
    poly(Array.from({ length: n }, (_, i) => [Math.cos((i / n) * Math.PI * 2) * r, y, Math.sin((i / n) * Math.PI * 2) * r] as V3), true, w);
  const square = (y: number, h: number, w = 1) => poly([[-h, y, -h], [h, y, -h], [h, y, h], [-h, y, h]], true, w);
  const bez = (p0: V3, p1: V3, p2: V3, n = 10): V3[] =>
    Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n, u = 1 - t;
      return [0, 1, 2].map((k) => u * u * p0[k] + 2 * u * t * p1[k] + t * t * p2[k]) as V3;
    });
  const curve = (p0: V3, p1: V3, p2: V3, n = 10, w = 1) => poly(bez(p0, p1, p2, n), false, w);
  const lerp = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

  // Hồ sen vuông có bờ gạch
  const P = 7.2;
  square(0, P, 0.55);
  square(0.42, P, 0.55);
  square(0.42, P - 0.35, 0.4);
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) line([sx * P, 0, sz * P], [sx * P, 0.42, sz * P], 0.55);
  // Lá sen trên mặt nước
  for (const [x, z, r] of [[-4.6, 3.2, 0.7], [4.1, 4.4, 0.55], [-3.6, -4.5, 0.6], [5.0, -2.8, 0.5], [2.4, 5.6, 0.42], [-5.6, -1.2, 0.45]]) {
    poly(Array.from({ length: 10 }, (_, i) => [x + Math.cos((i / 10) * Math.PI * 1.85) * r, 0.04, z + Math.sin((i / 10) * Math.PI * 1.85) * r] as V3), false, 0.45);
  }

  // Cột đá
  const R = 0.48, TOP = 3.25;
  ring(0.05, R + 0.22, 20, 0.8);
  ring(0.32, R + 0.1, 20, 0.6);
  ring(TOP, R, 20, 0.9);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    line([Math.cos(a) * R, 0.32, Math.sin(a) * R], [Math.cos(a) * R, TOP, Math.sin(a) * R], i % 2 ? 0.45 : 0.85);
  }

  // Đài sen: các thanh chống cong tỏa ra đỡ sàn chùa
  const F = 1.9, FY = 3.72;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 4;
    const corner = i % 2 === 0;
    const end: V3 = corner ? [Math.sign(Math.cos(a)) * F, FY, Math.sign(Math.sin(a)) * F] : [Math.round(Math.cos(a)) * F, FY, Math.round(Math.sin(a)) * F];
    const start: V3 = [Math.cos(a) * R, 2.55, Math.sin(a) * R];
    curve(start, [Math.cos(a) * 1.35, 2.75, Math.sin(a) * 1.35], end, 8, 0.9);
  }
  ring(3.05, 1.05, 16, 0.55);

  // Sàn chùa và lan can
  square(FY, F, 1);
  square(FY + 0.22, F, 1);
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) line([sx * F, FY, sz * F], [sx * F, FY + 0.22, sz * F], 1);
  const RAIL = FY + 0.62;
  square(RAIL, F - 0.08, 0.7);
  for (let k = -3; k <= 3; k++) {
    const v = (k / 3) * (F - 0.08);
    for (const [x, z] of [[v, F - 0.08], [v, -(F - 0.08)], [F - 0.08, v], [-(F - 0.08), v]]) line([x, FY + 0.22, z], [x, RAIL, z], 0.45);
  }

  // Thân chùa: cột gỗ, xà ngang
  const W = 1.38, WB = FY + 0.22, WT = 5.15;
  for (const k of [-1, -1 / 3, 1 / 3, 1]) {
    const v = k * W;
    for (const [x, z] of [[v, W], [v, -W], [W, v], [-W, v]]) line([x, WB, z], [x, WT, z], Math.abs(k) === 1 ? 1 : 0.6);
  }
  square(WT, W, 0.9);
  square(4.85, W, 0.55);
  square(4.32, W, 0.35);

  // Mái cong bốn góc vểnh
  const EY = 5.42, EH = 2.82, C = 2.95, CY = 6.05, RY = 7.3, RX = 0.95;
  const corners: V3[] = [[C, CY, C], [C, CY, -C], [-C, CY, -C], [-C, CY, C]];
  const mids: V3[] = [[EH, EY, 0], [0, EY, -EH], [-EH, EY, 0], [0, EY, EH]];
  // Mép mái (võng ở giữa)
  const eaves: V3[][] = [];
  for (let i = 0; i < 4; i++) {
    const a = corners[(i + 3) % 4], b = corners[i];
    const mid = mids[(i + 3) % 4];
    // Điểm điều khiển sao cho đường cong đi qua giữa cạnh mái (võng xuống, hơi lõm vào)
    const ctrl: V3 = [mid[0] * 2 - (a[0] + b[0]) / 2, mid[1] * 2 - (a[1] + b[1]) / 2, mid[2] * 2 - (a[2] + b[2]) / 2];
    const pts = bez(a, ctrl, b, 14);
    eaves.push(pts);
    poly(pts, false, 1);
  }
  // Bờ nóc và bờ dải (đường hông mái cong lõm)
  const ridgeA: V3 = [RX, RY, 0], ridgeB: V3 = [-RX, RY, 0];
  line(ridgeA, ridgeB, 1);
  for (const c of corners) {
    const end = c[0] > 0 ? ridgeA : ridgeB;
    const m = lerp(c, end, 0.5);
    curve(c, [m[0], m[1] - 0.38, m[2]], end, 12, 1);
  }
  // Rui mái trên từng mặt + một đường viền ngói song song mép mái
  const topOf = (e: V3): V3 => (Math.abs(e[2]) > Math.abs(e[0]) ? [(e[0] / C) * RX, RY, 0] : e[0] > 0 ? ridgeA : ridgeB);
  eaves.forEach((pts) => {
    poly(pts.map((e) => lerp(e, topOf(e), 0.14)), false, 0.5);
    for (let k = 2; k < pts.length - 1; k += 2) {
      const e = pts[k];
      const t = k / (pts.length - 1);
      // Mặt trước/sau hội tụ về bờ nóc, mặt bên hội tụ về đầu bờ nóc
      const top = topOf(e);
      const mid = lerp(e, top, 0.5);
      curve(e, [mid[0], mid[1] - 0.3, mid[2]], top, 6, 0.32 + 0.2 * Math.sin(t * Math.PI));
    }
  });
  // Đầu đao vểnh ở bốn góc
  for (const c of corners) curve(c, [c[0] * 1.05, c[1] + 0.05, c[2] * 1.05], [c[0] * 1.1, c[1] + 0.42, c[2] * 1.1], 5, 0.9);
  // Rồng chầu hai đầu bờ nóc và hạt châu ở giữa
  curve(ridgeA, [RX + 0.4, RY + 0.05, 0], [RX + 0.45, RY + 0.5, 0], 6, 0.9);
  curve(ridgeB, [-RX - 0.4, RY + 0.05, 0], [-RX - 0.45, RY + 0.5, 0], 6, 0.9);
  line([0, RY, 0], [0, RY + 0.34, 0], 0.8);
  ring(RY + 0.42, 0.09, 8, 0.8);

  // Cầu thang từ bờ hồ lên chùa
  const s0: V3 = [0, 0.42, P - 0.35], s1: V3 = [0, FY + 0.22, F];
  for (const sx of [-0.5, 0.5]) {
    line([sx, s0[1], s0[2]], [sx, s1[1], s1[2]], 0.75);
    line([sx, s0[1] + 0.45, s0[2]], [sx, s1[1] + 0.45, s1[2]], 0.5);
  }
  for (let k = 1; k < 16; k++) {
    const p = lerp(s0, s1, k / 16);
    line([-0.5, p[1], p[2]], [0.5, p[1], p[2]], 0.4);
  }
  return segs;
}

/* ---------- Chùa Một Cột xoay trong không gian số ---------- */
export function initPagoda(): (() => void) | void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas[data-pagoda]');
  if (!canvas || canvas.dataset.bound) return;
  canvas.dataset.bound = '1';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const host = canvas.parentElement as HTMLElement;
  const anchor = host.querySelector<HTMLElement>('[data-pagoda-anchor]');
  const segs = buildPagoda();
  const still = reduceMotion();
  const small = window.matchMedia('(max-width: 640px)').matches;

  // Đoạn chịu lực để "gói dữ liệu" chạy dọc theo
  const paths = segs.filter((s) => s.w >= 0.8);
  const packets = Array.from({ length: small ? 8 : 16 }, () => ({ s: paths[(Math.random() * paths.length) | 0], p: Math.random(), v: 0.5 + Math.random() * 0.7 }));
  const motes = Array.from({ length: small ? 40 : 80 }, () => ({ x: (Math.random() - 0.5) * 18, y: Math.random() * 10, z: (Math.random() - 0.5) * 18, v: 0.25 + Math.random() * 0.6 }));

  let w = 0, h = 0, dpr = 1, cx = 0, cy = 0, scale = 1;
  const resize = () => {
    const r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    if (anchor && anchor.offsetWidth) {
      const a = anchor.getBoundingClientRect();
      cx = a.left - r.left + a.width / 2;
      cy = a.top - r.top + a.height / 2;
      scale = Math.min(a.width, a.height) / 10.5;
    } else {
      cx = w * 0.5; cy = h * 0.55; scale = Math.min(w, h) / 11;
    }
    if (still) draw(9);
  };

  let yawOff = 0, pitchOff = 0, tYaw = 0, tPitch = 0;
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    tYaw = ((e.clientX - r.left) / r.width - 0.5) * 0.7;
    tPitch = ((e.clientY - r.top) / r.height - 0.5) * 0.18;
  };
  const onLeave = () => { tYaw = 0; tPitch = 0; };
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);

  const D = 26; // khoảng cách camera
  let cosY = 1, sinY = 0, cosP = 1, sinP = 0;
  const YC = 3.7; // tâm theo chiều cao
  const proj = (x: number, y: number, z: number, out: number[]) => {
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    const y0 = y - YC;
    const y1 = y0 * cosP - z1 * sinP;
    const z2 = y0 * sinP + z1 * cosP;
    const k = (D / (D + z2)) * scale;
    out[0] = cx + x1 * k; out[1] = cy - y1 * k; out[2] = z2;
  };

  const BUCKETS = 10;
  const pa = [0, 0, 0], pb = [0, 0, 0];

  function draw(t: number) {
    const yaw = t * 0.16 + yawOff - 0.6;
    const pitch = 0.24 + pitchOff;
    cosY = Math.cos(yaw); sinY = Math.sin(yaw); cosP = Math.cos(pitch); sinP = Math.sin(pitch);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, w, h);
    ctx!.globalCompositeOperation = 'lighter';
    ctx!.lineCap = 'round';

    const fade = Math.min(1, t / 1.4);
    const reveal = still ? 99 : (t / 3.2) * 8.8 - 0.5; // lần quét đầu: dựng hình từ dưới lên
    const scanY = reveal < 8.3 ? reveal : (((t - 3.2) * 0.2) % 1.5) * 8.2 - 0.6;

    // Lưới sàn số
    const G = 15, step = 1.5;
    ctx!.lineWidth = 1;
    for (let i = -G; i <= G + 0.01; i += step) {
      for (const [ax, az, bx, bz] of [[i, -G, i, G], [-G, i, G, i]]) {
        proj(ax, 0, az, pa); proj(bx, 0, bz, pb);
        const edge = 1 - Math.abs(i) / G;
        ctx!.strokeStyle = `rgba(244, 194, 188, ${(0.11 * edge * fade).toFixed(3)})`;
        ctx!.beginPath(); ctx!.moveTo(pa[0], pa[1]); ctx!.lineTo(pb[0], pb[1]); ctx!.stroke();
      }
    }

    // Gợn nước lan ra từ chân cột
    if (!still) {
      for (let k = 0; k < 4; k++) {
        const r = ((t * 0.9 + k * 1.6) % 6.4) + 0.8;
        const a = 0.22 * (1 - r / 7.2) * fade;
        ctx!.strokeStyle = `rgba(244, 194, 188, ${a.toFixed(3)})`;
        ctx!.beginPath();
        for (let j = 0; j <= 40; j++) {
          const th = (j / 40) * Math.PI * 2;
          proj(Math.cos(th) * r, 0.02, Math.sin(th) * r, pa);
          j ? ctx!.lineTo(pa[0], pa[1]) : ctx!.moveTo(pa[0], pa[1]);
        }
        ctx!.stroke();
      }
    }

    // Khung chùa: gom theo độ sáng để vẽ ít lần
    const glow: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
    const core: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
    for (const s of segs) {
      if (s.my > reveal + 0.15) continue;
      proj(s.a[0], s.a[1], s.a[2], pa); proj(s.b[0], s.b[1], s.b[2], pb);
      const depth = 1 - Math.min(1, Math.max(0, ((pa[2] + pb[2]) / 2 + 8) / 16)); // gần sáng hơn
      const dy = s.my - scanY;
      const scan = Math.exp(-(dy * dy) / 0.12);
      const v = Math.min(1, (0.32 + 0.5 * depth) * s.w + scan * 0.9);
      const b = Math.min(BUCKETS - 1, (v * BUCKETS) | 0);
      glow[b].moveTo(pa[0], pa[1]); glow[b].lineTo(pb[0], pb[1]);
      core[b].moveTo(pa[0], pa[1]); core[b].lineTo(pb[0], pb[1]);
    }
    for (let b = 0; b < BUCKETS; b++) {
      const v = (b + 0.5) / BUCKETS;
      ctx!.lineWidth = 3.2;
      ctx!.strokeStyle = `rgba(232, 120, 120, ${(0.09 * v * fade).toFixed(3)})`;
      ctx!.stroke(glow[b]);
      ctx!.lineWidth = 1;
      const hot = Math.max(0, v - 0.75) * 4; // đoạn đang bị quét chuyển sang trắng
      ctx!.strokeStyle = `rgba(${Math.round(244 + 11 * hot)}, ${Math.round(212 + 43 * hot)}, ${Math.round(206 + 49 * hot)}, ${(0.85 * v * fade).toFixed(3)})`;
      ctx!.stroke(core[b]);
    }

    // Mặt phẳng tia quét
    if (scanY > 0 && scanY < 8) {
      const half = scanY < 3.3 ? 2.2 : scanY < 5.3 ? 2.6 : 3.3;
      ctx!.strokeStyle = `rgba(255, 236, 232, ${(0.32 * fade).toFixed(3)})`;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      const sq: [number, number][] = [[-half, -half], [half, -half], [half, half], [-half, half], [-half, -half]];
      sq.forEach(([x, z], j) => { proj(x, scanY, z, pa); j ? ctx!.lineTo(pa[0], pa[1]) : ctx!.moveTo(pa[0], pa[1]); });
      ctx!.stroke();
    }

    // Gói dữ liệu chạy dọc khung
    if (!still && reveal > 7) {
      for (const k of packets) {
        k.p += k.v * 0.016;
        if (k.p > 1) { k.p = 0; k.s = paths[(Math.random() * paths.length) | 0]; }
        const s = k.s;
        proj(s.a[0] + (s.b[0] - s.a[0]) * k.p, s.a[1] + (s.b[1] - s.a[1]) * k.p, s.a[2] + (s.b[2] - s.a[2]) * k.p, pa);
        const g = ctx!.createRadialGradient(pa[0], pa[1], 0, pa[0], pa[1], 7);
        g.addColorStop(0, 'rgba(255, 245, 242, .95)'); g.addColorStop(1, 'rgba(244, 150, 150, 0)');
        ctx!.fillStyle = g;
        ctx!.fillRect(pa[0] - 7, pa[1] - 7, 14, 14);
      }
    }

    // Hạt dữ liệu bay lên
    for (const m of motes) {
      if (!still) { m.y += m.v * 0.016; if (m.y > 10) { m.y = 0; m.x = (Math.random() - 0.5) * 18; m.z = (Math.random() - 0.5) * 18; } }
      proj(m.x, m.y, m.z, pa);
      const life = Math.sin((m.y / 10) * Math.PI);
      ctx!.fillStyle = `rgba(255, 228, 222, ${(0.55 * life * fade).toFixed(3)})`;
      ctx!.fillRect(pa[0], pa[1], 1.6, 1.6);
    }
    ctx!.globalCompositeOperation = 'source-over';
  }

  let raf = 0, running = false, visible = true, last = 0, elapsed = 0;
  const loop = (now: number) => {
    if (!running) return;
    const dt = Math.min(0.25, (now - last) / 1000 || 0);
    last = now; elapsed += dt;
    yawOff += (tYaw - yawOff) * 0.04;
    pitchOff += (tPitch - pitchOff) * 0.04;
    draw(elapsed);
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (still || running || !visible || document.hidden) return;
    running = true; last = performance.now(); raf = requestAnimationFrame(loop);
  };
  const pause = () => { running = false; cancelAnimationFrame(raf); };

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : pause(); });
  io.observe(host);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);
  resize();
  play();
  // Chỉ khi chạy dev: cho phép vẽ một khung hình tại thời điểm t để kiểm tra (canvas.__draw(12))
  if (import.meta.env.DEV) (canvas as HTMLCanvasElement & { __draw?: (t: number) => void }).__draw = (t: number) => { pause(); draw(t); };

  return () => {
    pause(); ro.disconnect(); io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
  };
}

/* ---------- Mạng điểm dữ liệu cho phần đầu trang con ---------- */
export function initNetwork(): (() => void) | void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas[data-network]');
  if (!canvas || canvas.dataset.bound) return;
  canvas.dataset.bound = '1';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const host = canvas.parentElement as HTMLElement;
  const still = reduceMotion();
  let w = 0, h = 0, dpr = 1;
  type N = { x: number; y: number; vx: number; vy: number };
  let nodes: N[] = [];
  const resize = () => {
    const r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    const n = Math.round(Math.min(70, (w * h) / 11000));
    nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12 }));
    draw(0);
  };
  const LINK = 130;
  function draw(dt: number) {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    ctx!.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      // Chỉ vẽ ở nửa phải để không làm rối chữ tiêu đề
      const a = nodes[i];
      const side = Math.min(1, Math.max(0, (a.x / w - 0.3) / 0.4));
      if (side <= 0) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx!.strokeStyle = `rgba(104, 10, 18, ${(0.16 * (1 - d / LINK) * side).toFixed(3)})`;
          ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
        }
      }
      ctx!.fillStyle = `rgba(104, 10, 18, ${(0.35 * side).toFixed(3)})`;
      ctx!.beginPath(); ctx!.arc(a.x, a.y, 1.8, 0, Math.PI * 2); ctx!.fill();
    }
  }
  let raf = 0, running = false, last = 0, visible = true;
  const loop = (now: number) => {
    if (!running) return;
    draw(Math.min(0.05, (now - last) / 1000)); last = now;
    raf = requestAnimationFrame(loop);
  };
  const play = () => { if (still || running || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); };
  const pause = () => { running = false; cancelAnimationFrame(raf); };
  const ro = new ResizeObserver(resize); ro.observe(host);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : pause(); }); io.observe(host);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);
  resize(); play();
  return () => { pause(); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
}
