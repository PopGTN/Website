(() => {
  'use strict';

  const STORAGE_KEY    = 'site-theme';
  const BS_STORAGE_KEY = 'theme';
  const DEFAULT_THEME  = 'default';
  const ATTR    = 'data-site-theme';
  const BS_ATTR = 'data-bs-theme';

  const FORCED_BS_MODE = { terminal: 'dark' };

  const getSaved = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  const save = t => localStorage.setItem(STORAGE_KEY, t);
  const mobilePickerMedia = window.matchMedia('(max-width: 767.98px)');

  const applyBsMode = mode => document.documentElement.setAttribute(BS_ATTR, mode);
  const restoreBsMode = () => {
    const saved = localStorage.getItem(BS_STORAGE_KEY);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyBsMode(saved && saved !== 'auto' ? saved : preferred);
  };

  const apply = theme => {
    if (theme === DEFAULT_THEME) {
      document.documentElement.removeAttribute(ATTR);
      restoreBsMode();
    } else {
      document.documentElement.setAttribute(ATTR, theme);
      if (FORCED_BS_MODE[theme]) applyBsMode(FORCED_BS_MODE[theme]);
      else restoreBsMode();
    }
  };

  const markActive = theme => {
    document.querySelectorAll('[data-site-theme-value]').forEach(el => {
      const isActive = el.dataset.siteThemeValue === theme;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-pressed', String(isActive));
    });
    const label = document.querySelector('#bd-site-theme-text');
    if (label) {
      const map = { default: 'Default', sketch: 'Sketch', terminal: 'Terminal', ide: 'IDE' };
      label.textContent = map[theme] || theme;
    }
  };

  function syncThemePickerPlacement() {
    const picker = document.querySelector('.site-theme-picker');
    const footerSlot = document.getElementById('site-theme-picker-footer-slot');
    if (!picker || !footerSlot) return;

    if (!picker.dataset.desktopParentSelector) {
      picker.dataset.desktopParentSelector = 'body';
    }

    if (mobilePickerMedia.matches) {
      if (picker.parentElement !== footerSlot) footerSlot.appendChild(picker);
    } else if (picker.parentElement !== document.body) {
      document.body.insertBefore(picker, document.body.firstChild);
    }
  }

  /* ── Sketch layout animations ── */
  let sketchAnimated = false;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function pencilHide() {
    const p = document.getElementById('sk-pencil');
    if (p) p.style.opacity = '0';
  }

  // Move pencil to the visual writing point for an element.
  // For nav links this keeps the pencil closer to the text center instead of
  // looking offset to the far top-right corner.
  function pencilMoveTo(el) {
    const pencil = document.getElementById('sk-pencil');
    if (!pencil) return;
    const r = el.getBoundingClientRect();
    const x = r.left + (r.width * 0.78);
    const y = r.top + (r.height * 0.18);
    requestAnimationFrame(() => {
      pencil.style.transform = `translate(${x}px, ${y}px) rotate(35deg)`;
      pencil.style.opacity = '1';
    });
  }

  // Move pencil to an arbitrary x,y viewport coordinate
  function pencilXY(x, y, tilt = 35) {
    const pencil = document.getElementById('sk-pencil');
    if (!pencil) return;
    requestAnimationFrame(() => {
      pencil.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;
      pencil.style.opacity = '1';
    });
  }

  // Write one character with a down-then-up stroke confined to the glyph's
  // own bounding rect — pencil never goes outside the letter's height.
  async function writeChar(container, char, speed = 1) {
    const ch = document.createElement('span');
    ch.textContent = char;
    const dy  = (Math.random() - .5) * 3;
    const rot = (Math.random() - .5) * 2;
    ch.style.cssText = `display:inline-block;transform:translateY(${dy}px) rotate(${rot}deg);opacity:0;`;
    container.appendChild(ch);

    const r   = ch.getBoundingClientRect();
    const mid = r.left + r.width * 0.4;
    const top = r.top - 2;
    const bot = r.top + r.height * 0.75; // stay within the glyph — never below baseline

    if (char === ' ') {
      ch.style.opacity = '1';
      pencilMoveTo(ch);
      await sleep(80 * speed);
      return;
    }

    // 1 — arrive at top of letter
    pencilXY(mid, top, 37);
    await sleep(70 * speed);

    // 2 — stroke down, letter appears
    pencilXY(mid, bot, 30);
    ch.style.opacity = '1';
    await sleep(60 * speed);

    // 3 — lift back up to top
    pencilXY(mid, top, 37);
    await sleep(45 * speed);

    // 4 — hop right to next letter position
    pencilXY(r.right + 2, top, 35);
    await sleep((30 + Math.random() * 20) * speed);
  }

  async function writeTitle() {
    const el = document.getElementById('sk-title');
    if (!el) return;
    const lines = ['Hello,', "I'm Joshua.", 'I build things.'];
    el.innerHTML = '';

    for (let li = 0; li < lines.length; li++) {
      const lineSpan = document.createElement('span');
      lineSpan.style.cssText = 'display:block;position:relative;white-space:nowrap;';
      el.appendChild(lineSpan);

      for (const char of lines[li]) {
        await writeChar(lineSpan, char);
      }
      await sleep(240);
    }

    el.classList.add('sk-title-divider-drawn');
    pencilHide();
  }

  async function writeNavWords() {
    const navLinks = document.querySelectorAll('#sketch-layout .sk-nav-word');
    const totalChars = [...navLinks].reduce((sum, link) => {
      const text = link.dataset.navText || link.getAttribute('href').replace(/\//g, '') || 'Link';
      return sum + text.length;
    }, 0);
    let writtenChars = 0;

    for (const link of navLinks) {
      const text = link.dataset.navText || link.getAttribute('href').replace(/\//g, '') || 'Link';
      link.textContent = '';

      for (const char of text) {
        const progress = totalChars > 0 ? writtenChars / totalChars : 0;
        const speed = progress >= 0.5 ? 0.5 : 1;
        await writeChar(link, char, speed);
        writtenChars++;
      }

      link.classList.add('sk-underlined');
      await sleep(160);
    }

    const note = document.getElementById('sk-nav-note');
    if (note) note.style.opacity = '1';

    pencilHide();
    await sleep(350);
    writeTitle();
  }

  function runSketchAnimations() {
    if (sketchAnimated) return;
    sketchAnimated = true;

    document.querySelectorAll('#sketch-layout .sk-fade').forEach((el, i) => {
      setTimeout(() => el.style.animationPlayState = 'running', i * 110);
    });

    writeNavWords();
  }

  function initSketch() {
    const layout = document.getElementById('sketch-layout');
    if (!layout) return;
    layout.removeAttribute('aria-hidden');
    runSketchAnimations();
  }

  apply(getSaved());

  window.addEventListener('DOMContentLoaded', () => {
    syncThemePickerPlacement();
    markActive(getSaved());

    if (getSaved() === 'sketch') initSketch();

    document.querySelectorAll('[data-site-theme-value]').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.siteThemeValue;
        save(theme);
        apply(theme);
        markActive(theme);
        if (theme === 'sketch') {
          sketchAnimated = false; // allow re-running if switching back
          setTimeout(initSketch, 50);
        }
      });
    });

    if (typeof mobilePickerMedia.addEventListener === 'function') {
      mobilePickerMedia.addEventListener('change', syncThemePickerPlacement);
    } else if (typeof mobilePickerMedia.addListener === 'function') {
      mobilePickerMedia.addListener(syncThemePickerPlacement);
    }
  });
})();
