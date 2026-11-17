// Toàn bộ tương tác chung của site. Chạy lại sau mỗi lần chuyển trang (View Transitions).
import { langs, locales, switchLangPath, type Lang } from '../i18n';

const currentLang = () => (document.documentElement.lang === 'en' ? 'en' : 'vi') as Lang;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Header: đổi nền khi cuộn + thanh tiến độ ---------- */
let scrollBound = false;
function initScroll() {
  const onScroll = () => {
    const header = document.querySelector<HTMLElement>('[data-header]');
    const bar = document.querySelector<HTMLElement>('[data-progress]');
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 12);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar?.style.setProperty('--p', String(max > 0 ? y / max : 0));
  };
  onScroll();
  if (scrollBound) return;
  scrollBound = true;
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Đánh dấu menu đang active (header được giữ nguyên giữa các trang) ---------- */
function syncNav() {
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((a) => {
    const href = a.getAttribute('href') || '/';
    const active = href === '/' || href === '/en' ? path === href : path.startsWith(href);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

/* ---------- Nút chọn ngôn ngữ: trỏ tới đúng trang hiện tại ở ngôn ngữ kia ---------- */
function syncLangLinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
    const l = a.dataset.langLink as Lang;
    if (langs.includes(l)) a.href = switchLangPath(location.pathname, l) + location.hash;
  });
}

/* ---------- Menu di động ---------- */
// Header được giữ nguyên giữa các trang cùng ngôn ngữ, nhưng đổi ngôn ngữ sẽ tạo header mới
function setMenu(open: boolean) {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!btn || !menu) return;
  btn.setAttribute('aria-expanded', String(open));
  header?.classList.toggle('menu-open', open);
  document.documentElement.classList.toggle('menu-locked', open);
  if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('is-open')); }
  else { menu.classList.remove('is-open'); menu.hidden = true; }
}
let menuDocBound = false;
function initMenu() {
  if (!menuDocBound) {
    menuDocBound = true;
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('astro:after-swap', () => setMenu(false));
  }
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!btn || !menu || btn.dataset.bound) return;
  btn.dataset.bound = '1';
  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
}

/* ---------- Xuất hiện khi cuộn tới ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (reduceMotion() || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}

/* ---------- Đếm số ---------- */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    if (reduceMotion()) { el.textContent = target.toLocaleString(locales[currentLang()]); return; }
    const dur = 1600; const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(target * eased).toLocaleString(locales[currentLang()]);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (reduceMotion()) return; // giữ nguyên số đã render sẵn
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { run(en.target as HTMLElement); io.unobserve(en.target); } });
  }, { threshold: 0.6 });
  els.forEach((el) => { el.textContent = '0'; io.observe(el); });
}

/* ---------- Nút lên đầu trang ---------- */
function initToTop() {
  document.querySelectorAll<HTMLButtonElement>('[data-to-top]').forEach((b) => {
    b.onclick = () => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
  });
}

/* ---------- Tab dịch vụ ---------- */
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panels = [...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    const select = (i: number, focus = false) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      root.style.setProperty('--active', String(i));
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
  });
}

/* ---------- Lọc dự án ---------- */
function initFilter() {
  document.querySelectorAll<HTMLElement>('[data-filter]').forEach((root) => {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-filter-btn]');
    const items = root.querySelectorAll<HTMLElement>('[data-cat]');
    const count = root.querySelector<HTMLElement>('[data-filter-count]');
    buttons.forEach((b) => b.addEventListener('click', () => {
      const cat = b.dataset.filterBtn!;
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      let n = 0;
      items.forEach((it) => {
        const show = cat === 'all' || it.dataset.cat === cat;
        if (show) n++;
        it.classList.toggle('is-hidden', !show);
        if (show) { it.classList.remove('pop'); void it.offsetWidth; it.classList.add('pop'); }
      });
      if (count) count.textContent = `${n} ${count.dataset.unit || ''}`.trim();
    }));
  });
}

/* ---------- Slider cảm nhận khách hàng ---------- */
function initSlider() {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-track]');
    const slides = root.querySelectorAll<HTMLElement>('[data-slide]');
    const dots = root.querySelectorAll<HTMLButtonElement>('[data-dot]');
    if (!track || !slides.length) return;
    let i = 0; let timer: number | undefined;
    const go = (n: number) => {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(${-i * 100}%)`;
      slides.forEach((s, j) => s.setAttribute('aria-hidden', String(j !== i)));
      dots.forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
    };
    const auto = () => { clearInterval(timer); if (!reduceMotion()) timer = window.setInterval(() => go(i + 1), 6500); };
    root.querySelector('[data-prev]')?.addEventListener('click', () => { go(i - 1); auto(); });
    root.querySelector('[data-next]')?.addEventListener('click', () => { go(i + 1); auto(); });
    dots.forEach((d, j) => d.addEventListener('click', () => { go(j); auto(); }));
    // Vuốt trên điện thoại
    let x0: number | null = null;
    track.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    window.addEventListener('pointerup', (e) => {
      if (x0 === null) return; const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { go(dx < 0 ? i + 1 : i - 1); auto(); }
    });
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', auto);
    go(0); auto();
    document.addEventListener('astro:before-swap', () => clearInterval(timer), { once: true });
  });
}

/* ---------- Hero: bản đồ đồng mức chuyển động theo chuột ---------- */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add('is-ready'));
  if (reduceMotion() || window.matchMedia('(pointer: coarse)').matches) return;
  const layers = hero.querySelectorAll<HTMLElement>('[data-depth]');
  let raf = 0;
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => layers.forEach((l) => {
      const d = Number(l.dataset.depth);
      l.style.transform = `translate3d(${mx * d}px, ${my * d}px, 0)`;
    }));
  });
  hero.addEventListener('pointerleave', () => layers.forEach((l) => (l.style.transform = '')));
}

/* ---------- Form liên hệ (Web3Forms – không cần backend) ---------- */
function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-contact]').forEach((form) => {
    if (form.dataset.bound) return; form.dataset.bound = '1';
    const status = form.querySelector<HTMLElement>('[data-status]');
    const msg = form.dataset;
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) {
        status!.dataset.state = 'error';
        status!.textContent = msg.msgInvalid || '';
        form.querySelector<HTMLElement>(':invalid')?.focus();
        return;
      }
      btn!.disabled = true; btn!.dataset.loading = '1';
      status!.dataset.state = ''; status!.textContent = msg.msgSending || '';
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        form.reset(); form.classList.remove('was-validated');
        status!.dataset.state = 'success';
        status!.textContent = msg.msgSuccess || '';
      } catch {
        status!.dataset.state = 'error';
        status!.textContent = msg.msgError || '';
      } finally { btn!.disabled = false; delete btn!.dataset.loading; }
    });
  });
}

document.addEventListener('astro:page-load', () => {
  initMenu();
  syncNav();
  syncLangLinks();
  initScroll();
  initReveal();
  initCounters();
  initToTop();
  initTabs();
  initFilter();
  initSlider();
  initHero();
  initForms();
});
