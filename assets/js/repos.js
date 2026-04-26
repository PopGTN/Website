(() => {
  const GH_USER = 'PopGTN';
  const BB_USER = 'joshuamckenna';

  const ROTATIONS = [-1.4, 0.7, -0.5, 1.1, -0.9, 0.4, -1.2, 0.8, -0.3, 1.3, -0.6, 0.5];
  const OFFSETS = [-6, 8, -2, 10, -8, 4, -5, 7, -3, 9, -7, 5];

  let allRepos       = [];
  let activeSource   = 'all';
  let activeSort     = 'updated';
  let activeSortDir  = 'desc';
  let activeLanguages = new Set();
  let searchQuery    = '';
  let currentPage    = 1;
  let perPage        = 12;
  let repoListBound  = false;

  function githubRepoUrl(repoName) {
    return repoName.toLowerCase() === GH_USER.toLowerCase()
      ? `https://github.com/${GH_USER}`
      : `https://github.com/${GH_USER}/${repoName}`;
  }

  // ── Normalise both APIs into the same shape ──────────────────
  function fromGitHub(r) {
    return {
      name:        r.name,
      description: r.description || '',
      url:         githubRepoUrl(r.name),
      source:      'github',
      createdAt:   new Date(r.created_at),
      updatedAt:   new Date(r.updated_at),
      language:    r.language || null,
    };
  }

  function fromBitbucket(r) {
    return {
      name:        r.name,
      description: r.description || '',
      url:         r.links.html.href,
      source:      'bitbucket',
      createdAt:   new Date(r.created_on),
      updatedAt:   new Date(r.updated_on),
      language:    r.language || null,
    };
  }

  // ── Cache helpers (sessionStorage, 5-min TTL) ────────────────
  const CACHE_KEY = 'repos_v1';
  const CACHE_TTL = 5 * 60 * 1000;

  function readCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(CACHE_KEY); return null; }
      // Restore Date objects (JSON.parse gives strings)
      return data.map(r => ({ ...r, createdAt: new Date(r.createdAt), updatedAt: new Date(r.updatedAt) }));
    } catch { return null; }
  }

  function writeCache(data) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
  }

  // ── Fetch ─────────────────────────────────────────────────────

  const cached = readCache();
  if (cached) {
    allRepos = cached;
    buildLanguageFilters();
    render();
  } else {
    const ghFetch = fetch(
      `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`
    ).then(r => r.json()).then(data => Array.isArray(data) ? data.map(fromGitHub) : []).catch(() => []);

    const bbFetch = fetch(
      `https://api.bitbucket.org/2.0/repositories/${BB_USER}?pagelen=100&sort=-updated_on`
    ).then(r => r.json()).then(data => (data.values || []).map(fromBitbucket)).catch(() => []);

    // Show GitHub results immediately, then merge Bitbucket when it arrives
    ghFetch.then(gh => {
      allRepos = gh;
      buildLanguageFilters();
      render();
    });

    Promise.all([ghFetch, bbFetch]).then(([gh, bb]) => {
      allRepos = [...gh, ...bb];
      writeCache(allRepos);
      buildLanguageFilters();
      render();
    });
  }

  // ── Language filter chips (multi-select) ─────────────────────
  function reposForLanguageOptions() {
    let repos = activeSource === 'all'
      ? allRepos
      : allRepos.filter(r => r.source === activeSource);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      repos = repos.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }

    return repos;
  }

  function buildLanguageFilters() {
    const langs = [...new Set(reposForLanguageOptions().map(r => r.language).filter(Boolean))].sort();
    const langSet = new Set(langs);
    const container = document.getElementById('language-filters');

    activeLanguages.forEach(lang => {
      if (!langSet.has(lang)) activeLanguages.delete(lang);
    });

    container.innerHTML = '';
    langs.forEach(lang => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-secondary btn-sm theme-filter-btn';
      btn.dataset.lang = lang;
      btn.textContent = lang;
      if (activeLanguages.has(lang)) btn.classList.add('is-active');
      container.appendChild(btn);
    });
  }

  function updateLanguageFilterVisibility() {
    const group = document.getElementById('language-filter-group');
    if (!group) return;

    const shouldHide = activeSource === 'bitbucket';
    group.style.display = shouldHide ? 'none' : '';

    if (shouldHide && activeLanguages.size > 0) {
      activeLanguages.clear();
      renderActiveFilters();
    }
  }

  document.getElementById('language-filters').addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (activeLanguages.has(lang)) {
      activeLanguages.delete(lang);
      btn.classList.remove('is-active');
    } else {
      activeLanguages.add(lang);
      btn.classList.add('is-active');
    }
    currentPage = 1;
    renderActiveFilters();
    render();
  });

  // ── Active filter pills ───────────────────────────────────────
  function renderActiveFilters() {
    const bar = document.getElementById('active-filters');
    bar.innerHTML = '';

    const pills = [];
    if (activeSource !== 'all') pills.push({ label: `source: ${activeSource}`, clear: clearSource });
    activeLanguages.forEach(lang => pills.push({ label: lang, clear: () => clearLanguage(lang) }));
    if (searchQuery) pills.push({ label: `"${searchQuery}"`, clear: clearSearch });

    if (pills.length === 0) return;

    pills.forEach(({ label, clear }) => {
      const pill = document.createElement('span');
      pill.className = 'sk-active-pill';
      pill.innerHTML = `${label}<span class="sk-pill-x">×</span>`;
      pill.querySelector('.sk-pill-x').addEventListener('click', () => { clear(); renderActiveFilters(); render(); });
      bar.appendChild(pill);
    });

    const clearAll = document.createElement('button');
    clearAll.className = 'btn btn-outline-secondary btn-sm theme-filter-btn';
    clearAll.style.cssText = 'font-size:.85rem;padding:2px 10px;';
    clearAll.textContent = 'clear all ×';
    clearAll.addEventListener('click', () => { clearAllFilters(); renderActiveFilters(); render(); });
    bar.appendChild(clearAll);
  }

  function clearSource() {
    activeSource = 'all';
    currentPage = 1;
    document.querySelectorAll('#source-filters [data-source]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.source === 'all');
    });
    updateLanguageFilterVisibility();
  }

  function clearLanguage(lang) {
    activeLanguages.delete(lang);
    currentPage = 1;
    const btn = document.querySelector(`#language-filters [data-lang="${lang}"]`);
    if (btn) btn.classList.remove('is-active');
  }

  function clearSearch() {
    searchQuery = '';
    currentPage = 1;
    document.getElementById('repo-search').value = '';
  }

  function clearAllFilters() {
    clearSource();
    activeLanguages.clear();
    document.querySelectorAll('#language-filters [data-lang]').forEach(b => b.classList.remove('is-active'));
    clearSearch();
  }

  // ── Sort + filter ─────────────────────────────────────────────
  function filtered() {
    let repos = activeSource === 'all'
      ? allRepos
      : allRepos.filter(r => r.source === activeSource);

    if (activeLanguages.size > 0) {
      repos = repos.filter(r => activeLanguages.has(r.language));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      repos = repos.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }

    repos = [...repos];
    const d = activeSortDir === 'desc' ? 1 : -1;
    if (activeSort === 'updated') repos.sort((a, b) => d * (b.updatedAt - a.updatedAt));
    if (activeSort === 'created') repos.sort((a, b) => d * (b.createdAt - a.createdAt));
    if (activeSort === 'name')    repos.sort((a, b) => d * a.name.localeCompare(b.name));

    return repos;
  }

  // ── Card renderers ────────────────────────────────────────────
  function sketchCard(repo, i) {
    const rot      = ROTATIONS[i % ROTATIONS.length];
    const lift     = OFFSETS[i % OFFSETS.length];
    const isGH     = repo.source === 'github';
    const colorCls = isGH ? 'sk-postit-yellow' : 'sk-postit-blue';
    const stripCls = isGH ? '' : 'sk-postit-strip-blue';
    const src      = isGH ? '📌 GitHub' : '🪣 Bitbucket';
    const date     = repo.updatedAt.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
    const rmUrl    = `/projects/readme/?repo=${encodeURIComponent(repo.name)}&source=${repo.source}`;
    const lang     = repo.language ? `<span class="sk-repo-lang">${repo.language}</span>` : '';
    const desc     = repo.description || '<span style="opacity:.45">No description</span>';
    return `
      <div class="sk-postit sk-repo-note theme-click-card ${colorCls}"
           data-readme-url="${rmUrl}" tabindex="0" role="link"
           aria-label="Open README for ${repo.name}"
           style="transform:translateY(${lift}px) rotate(${rot}deg);min-height:210px;">
        <div class="sk-postit-strip ${stripCls}"></div>
        <div class="sk-postit-body sk-repo-body">
          <div class="sk-repo-meta">
            <span class="sk-repo-src">${src}</span>
            ${lang}
          </div>
          <div class="sk-postit-heading sk-repo-title">${repo.name}</div>
          <div class="sk-postit-item sk-repo-desc">${desc}</div>
          <div class="sk-repo-footer">
            <span class="sk-repo-date">↻ ${date}</span>
            <a href="${repo.url}" target="_blank" rel="noopener"
               class="sk-btn"
               style="font-size:.95rem !important;padding:5px 14px !important;">View ↗</a>
          </div>
        </div>
      </div>`;
  }

  function bootstrapCard(repo) {
    const src   = repo.source === 'github' ? 'GitHub' : 'Bitbucket';
    const date  = repo.updatedAt.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
    const rmUrl = `/projects/readme/?repo=${encodeURIComponent(repo.name)}&source=${repo.source}`;
    const lang  = repo.language ? `<span class="badge bg-secondary ms-1">${repo.language}</span>` : '';
    const desc  = repo.description || '<span class="text-muted fst-italic">No description</span>';
    return `
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <small class="text-muted">${src}</small>${lang}
          </div>
          <h5 class="card-title" style="overflow-wrap:break-word;word-break:break-word;">${repo.name}</h5>
          <p class="card-text flex-grow-1 theme-repo-description">${desc}</p>
          <div class="mt-auto pt-2">
            <small class="text-muted d-block mb-2">↻ ${date}</small>
            <div class="d-flex gap-2 flex-wrap">
              <a href="${repo.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">View ↗</a>
              <a href="${rmUrl}" class="btn btn-outline-secondary btn-sm">Read README</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  // ── Render ────────────────────────────────────────────────────
  function bindRepoListInteractions() {
    if (repoListBound) return;
    repoListBound = true;

    const list = document.getElementById('repos-list');
    if (!list) return;

    list.addEventListener('click', e => {
      const action = e.target.closest('a, button, input, select, textarea');
      if (action) return;

      const card = e.target.closest('.theme-click-card[data-readme-url]');
      if (!card) return;

      window.location.href = card.dataset.readmeUrl;
    });

    list.addEventListener('keydown', e => {
      const card = e.target.closest('.theme-click-card[data-readme-url]');
      if (!card) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = card.dataset.readmeUrl;
      }
    });
  }

  function render() {
    const list  = document.getElementById('repos-list');
    const pager = document.getElementById('repos-pager');
    const all   = filtered();
    const total = all.length;

    const totalPages = perPage === 0 ? 1 : Math.ceil(total / perPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    const repos = perPage === 0 ? all : all.slice((currentPage - 1) * perPage, currentPage * perPage);

    list.innerHTML = '';

    if (repos.length === 0) {
      list.innerHTML = '<div class="col"><p class="repos-msg">No repositories found.</p></div>';
      pager.innerHTML = '';
      return;
    }

    if (perPage === 0 || totalPages <= 1) {
      pager.innerHTML = `<span class="theme-meta-text">${total} repos</span>`;
    } else {
      pager.innerHTML = `
        <button class="btn btn-outline-secondary btn-sm theme-filter-btn" id="pg-prev" ${currentPage === 1 ? 'disabled' : ''}>← prev</button>
        <span class="theme-meta-text theme-pager-count">${currentPage} / ${totalPages} &nbsp;(${total} repos)</span>
        <button class="btn btn-outline-secondary btn-sm theme-filter-btn" id="pg-next" ${currentPage === totalPages ? 'disabled' : ''}>next →</button>`;
      document.getElementById('pg-prev').addEventListener('click', () => { currentPage--; render(); });
      document.getElementById('pg-next').addEventListener('click', () => { currentPage++; render(); });
    }

    const theme = document.documentElement.getAttribute('data-site-theme') || 'default';
    repos.forEach((repo, i) => {
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = theme === 'sketch' ? sketchCard(repo, i) : bootstrapCard(repo);
      list.appendChild(col);
    });
  }

  bindRepoListInteractions();

  // ── Source filter ─────────────────────────────────────────────
  document.getElementById('source-filters').addEventListener('click', e => {
    const btn = e.target.closest('[data-source]');
    if (!btn) return;
    activeSource = btn.dataset.source;
    currentPage = 1;
    document.querySelectorAll('#source-filters [data-source]').forEach(b => {
      b.classList.toggle('is-active', b === btn);
    });
    buildLanguageFilters();
    updateLanguageFilterVisibility();
    renderActiveFilters();
    render();
  });

  // ── Sort filter ───────────────────────────────────────────────
  function updateSortMenu() {
    const trigger = document.getElementById('sort-menu-button');
    const activeItem = document.querySelector(`#sort-filters .dropdown-item[data-sort="${activeSort}"][data-dir="${activeSortDir}"]`);

    document.querySelectorAll('#sort-filters .dropdown-item[data-sort]').forEach(item => {
      const isActive = item.dataset.sort === activeSort && item.dataset.dir === activeSortDir;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    if (trigger && activeItem) {
      trigger.textContent = `Sort: ${activeItem.textContent}`;
    }
  }

  document.getElementById('sort-filters').addEventListener('click', e => {
    const btn = e.target.closest('.dropdown-item[data-sort]');
    if (!btn) return;
    activeSort = btn.dataset.sort;
    activeSortDir = btn.dataset.dir;
    currentPage = 1;
    updateSortMenu();
    render();
  });

  // ── Search ────────────────────────────────────────────────────
  let searchTimer;
  document.getElementById('repo-search').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = e.target.value.trim();
      currentPage = 1;
      buildLanguageFilters();
      renderActiveFilters();
      render();
    }, 200);
  });

  // ── Per-page ──────────────────────────────────────────────────
  function updatePerPageMenu() {
    const trigger = document.getElementById('per-page-button');
    const activeItem = document.querySelector(`#per-page-menu .dropdown-item[data-per-page="${perPage}"]`);

    document.querySelectorAll('#per-page-menu .dropdown-item[data-per-page]').forEach(item => {
      const isActive = parseInt(item.dataset.perPage, 10) === perPage;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    if (trigger && activeItem) {
      trigger.textContent = activeItem.textContent;
    }
  }

  document.getElementById('per-page-menu').addEventListener('click', e => {
    const btn = e.target.closest('.dropdown-item[data-per-page]');
    if (!btn) return;
    perPage = parseInt(btn.dataset.perPage, 10);
    currentPage = 1;
    updatePerPageMenu();
    render();
  });

  updateSortMenu();
  updatePerPageMenu();
  updateLanguageFilterVisibility();
})();
