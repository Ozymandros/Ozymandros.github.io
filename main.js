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
