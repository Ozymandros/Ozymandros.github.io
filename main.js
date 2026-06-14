/* ── Theme ────────────────────────────────────────────────── */
(function () {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  const KEY  = 'theme';

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
  }

  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (btn) {
    btn.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }
})();

/* ── i18n ─────────────────────────────────────────────────── */
(function () {
  const LANG_KEY = 'lang';
  const SUPPORTED = ['en', 'es', 'ca'];
  const select = document.getElementById('lang-select');

  function resolveLang(lang) {
    return SUPPORTED.includes(lang) ? lang : 'en';
  }

  function applyLanguage(lang) {
    const resolved = resolveLang(lang);
    const dict = TRANSLATIONS[resolved] || TRANSLATIONS.en;
    const root = document.documentElement;

    root.lang = resolved;
    localStorage.setItem(LANG_KEY, resolved);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    if (dict['meta.title']) document.title = dict['meta.title'];

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict['meta.description']) metaDesc.content = dict['meta.description'];

    if (select) select.value = resolved;
  }

  const saved = localStorage.getItem(LANG_KEY);
  const browserLang = (navigator.language || 'en').slice(0, 2);
  const initial = saved || (SUPPORTED.includes(browserLang) ? browserLang : 'en');
  applyLanguage(initial);

  if (select) {
    select.addEventListener('change', () => applyLanguage(select.value));
  }
})();

/* ── Scroll reveal ────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
