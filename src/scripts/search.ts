// Tìm kiếm phía trình duyệt: tải /search-index.json một lần rồi lọc ngay khi gõ.
type Entry = { type: string; title: string; text: string; url: string };

let indexPromise: Promise<Record<string, Entry[]>> | null = null;
const loadIndex = () => {
  indexPromise ??= fetch('/search-index.json').then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json();
  });
  indexPromise.catch(() => { indexPromise = null; });
  return indexPromise;
};

/** Bỏ dấu tiếng Việt + chữ thường: "Lưu Trú" → "luu tru" */
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase();

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Tô sáng các từ khớp (so khớp trên bản bỏ dấu, nhưng hiển thị chữ gốc) */
function highlight(text: string, terms: string[]) {
  const folded = fold(text);
  const marks: [number, number][] = [];
  for (const t of terms) {
    let i = folded.indexOf(t);
    while (i !== -1) { marks.push([i, i + t.length]); i = folded.indexOf(t, i + t.length); }
  }
  if (!marks.length) return escapeHtml(text);
  marks.sort((a, b) => a[0] - b[0]);
  let out = ''; let pos = 0;
  for (const [s, e] of marks) {
    if (s < pos) continue;
    out += escapeHtml(text.slice(pos, s)) + '<mark>' + escapeHtml(text.slice(s, e)) + '</mark>';
    pos = e;
  }
  return out + escapeHtml(text.slice(pos));
}

/** Cắt đoạn trích quanh vị trí khớp đầu tiên */
function snippet(text: string, terms: string[], size = 160) {
  const folded = fold(text);
  const hit = Math.min(...terms.map((t) => { const i = folded.indexOf(t); return i === -1 ? Infinity : i; }));
  if (!isFinite(hit) || hit < 60) return text.length > size ? text.slice(0, size).trimEnd() + '…' : text;
  const start = text.lastIndexOf(' ', hit - 40) + 1;
  const part = text.slice(start, start + size);
  return '…' + part.trimEnd() + (start + size < text.length ? '…' : '');
}

function search(entries: Entry[], query: string) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return { terms, hits: [] as Entry[] };
  const scored = entries
    .map((e) => {
      const title = fold(e.title); const body = fold(e.text);
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += title.startsWith(t) ? 12 : 8;
        else if (body.includes(t)) score += 2;
        else return null; // phải khớp mọi từ
      }
      if (title.includes(terms.join(' '))) score += 10;
      return { e, score };
    })
    .filter((x): x is { e: Entry; score: number } => !!x)
    .sort((a, b) => b.score - a.score);
  return { terms, hits: scored.slice(0, 12).map((x) => x.e) };
}

let docBound = false;
export function initSearch() {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-search]');
  if (!docBound) {
    docBound = true;
    // Phím tắt: "/" hoặc Ctrl/⌘ + K
    document.addEventListener('keydown', (e) => {
      const d = document.querySelector<HTMLDialogElement>('dialog[data-search]');
      if (!d || d.open) return;
      const target = e.target as HTMLElement;
      const typing = target.closest('input, textarea, select, [contenteditable]');
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        openSearch();
      }
    });
    document.addEventListener('astro:before-preparation', () => {
      document.querySelector<HTMLDialogElement>('dialog[data-search]')?.close();
    });
  }
  document.querySelectorAll<HTMLButtonElement>('[data-search-open]').forEach((b) => { b.onclick = () => openSearch(); });
  if (!dialog || dialog.dataset.bound) return;
  dialog.dataset.bound = '1';

  const input = dialog.querySelector<HTMLInputElement>('[data-search-input]')!;
  const list = dialog.querySelector<HTMLUListElement>('[data-search-results]')!;
  const status = dialog.querySelector<HTMLElement>('[data-search-status]')!;
  const hints = dialog.querySelector<HTMLElement>('[data-search-hints]')!;
  const lang = dialog.dataset.lang || 'vi';
  const types: Record<string, string> = JSON.parse(dialog.dataset.types || '{}');
  const msg = dialog.dataset;
  let active = -1;

  const setActive = (i: number) => {
    const items = [...list.children] as HTMLElement[];
    if (!items.length) { active = -1; input.removeAttribute('aria-activedescendant'); return; }
    active = (i + items.length) % items.length;
    items.forEach((li, j) => li.setAttribute('aria-selected', String(j === active)));
    input.setAttribute('aria-activedescendant', items[active].id);
    items[active].scrollIntoView({ block: 'nearest' });
  };

  const render = async () => {
    const q = input.value.trim();
    hints.hidden = !!q;
    if (!q) { list.innerHTML = ''; status.textContent = ''; input.setAttribute('aria-expanded', 'false'); active = -1; return; }
    let index: Record<string, Entry[]>;
    try { status.textContent = msg.msgLoading || ''; index = await loadIndex(); }
    catch { status.textContent = msg.msgError || ''; return; }
    if (input.value.trim() !== q) return; // người dùng đã gõ tiếp
    const { terms, hits } = search(index[lang] || [], q);
    list.innerHTML = hits.map((h, i) => `
      <li role="option" id="sr-${i}" aria-selected="false">
        <a href="${escapeHtml(h.url)}">
          <span class="r-type">${escapeHtml(types[h.type] || h.type)}</span>
          <span class="r-title">${highlight(h.title, terms)}</span>
          <span class="r-text">${highlight(snippet(h.text, terms), terms)}</span>
        </a>
      </li>`).join('');
    status.textContent = hits.length ? `${hits.length} ${msg.msgResults}` : `${msg.msgEmpty} “${q}”`;
    input.setAttribute('aria-expanded', String(hits.length > 0));
    setActive(hits.length ? 0 : -1);
  };

  let timer: number | undefined;
  input.addEventListener('input', () => { clearTimeout(timer); timer = window.setTimeout(render, 90); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      list.querySelectorAll('a')[active]?.click();
    }
  });
  hints.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-search-suggest]');
    if (!b) return;
    input.value = b.dataset.searchSuggest || '';
    input.focus();
    render();
  });
  list.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) dialog.close(); });
  dialog.querySelector('[data-search-close]')?.addEventListener('click', () => dialog.close());
  // Bấm ra vùng tối bên ngoài để đóng
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.documentElement.classList.remove('search-open'));
}

export function openSearch() {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-search]');
  if (!dialog || dialog.open) return;
  // Đóng menu di động nếu đang mở
  document.querySelector<HTMLButtonElement>('[data-menu-toggle][aria-expanded="true"]')?.click();
  dialog.showModal();
  document.documentElement.classList.add('search-open');
  const input = dialog.querySelector<HTMLInputElement>('[data-search-input]');
  input?.focus();
  input?.select();
  loadIndex().catch(() => {});
}
