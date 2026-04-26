(() => {
  const overlay = document.getElementById('sk-readme-overlay');
  const drawer  = document.getElementById('sk-readme-drawer');
  const body    = document.getElementById('sk-readme-body');
  const title   = document.getElementById('sk-readme-repo-name');
  const closeBtn = document.getElementById('sk-readme-close');

  function open(repoName) {
    title.textContent = repoName;
    body.innerHTML = '<p class="theme-status-text">Loading README...</p>';
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';

    fetch(`https://api.github.com/repos/PopGTN/${repoName}/contents/README.md`)
      .then(r => {
        if (!r.ok) throw new Error('not found');
        return r.json();
      })
      .then(data => {
        const md = decodeURIComponent(escape(atob(data.content)));
        body.innerHTML = typeof marked !== 'undefined'
          ? marked.parse(md)
          : `<pre class="theme-code-block">${md}</pre>`;
      })
      .catch(() => {
        body.innerHTML = '<p class="theme-status-text">No README found for this repository.</p>';
      });
  }

  function close() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Expose so github.js can call it
  window.skReadmeOpen = open;
})();
