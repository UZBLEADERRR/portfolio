/* Uzbleaderrr portfolio — GitHub ma'lumotlari va UI interaksiyalari */
(() => {
  'use strict';

  const GITHUB_USER = 'Uzbleaderrr';
  const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?type=public&sort=updated&per_page=100`;
  const projectGrid = document.querySelector('#projects');

  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  }[char]));

  const languageLabel = (language) => language || 'Code';
  const compactNumber = (number = 0) => new Intl.NumberFormat('uz-UZ', { notation: 'compact', maximumFractionDigits: 1 }).format(number);
  const formatDate = (date) => new Intl.DateTimeFormat('uz-UZ', { month: 'short', year: 'numeric' }).format(new Date(date));

  function projectScore(repo) {
    const daysOld = Math.max(1, (Date.now() - new Date(repo.updated_at).getTime()) / 86400000);
    return (repo.stargazers_count * 7) + (repo.forks_count * 4) + (120 / Math.sqrt(daysOld));
  }

  function cardTemplate(repo, index) {
    const description = repo.description || 'Ushbu loyiha haqida GitHub’da batafsil ma’lumot oling.';
    return `<article class="project-card" style="--card-index:${index}">
      <div>
        <div class="project-card-header">
          <h3>${escapeHTML(repo.name.replaceAll('-', ' '))}</h3>
          <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noreferrer" aria-label="${escapeHTML(repo.name)} GitHub’da ochish">↗</a>
        </div>
        <p class="project-card-desc">${escapeHTML(description)}</p>
      </div>
      <div class="project-card-footer">
        <span class="project-tag"><i class="project-tag-dot"></i>${escapeHTML(languageLabel(repo.language))}</span>
        <span>★ ${compactNumber(repo.stargazers_count)} &nbsp;⑂ ${compactNumber(repo.forks_count)}</span>
      </div>
    </article>`;
  }

  function renderProjects(repositories) {
    const repos = repositories.filter((repo) => !repo.fork && !repo.archived);
    if (!repos.length) {
      projectGrid.innerHTML = '<div class="loading-card">Hozircha public loyiha topilmadi.</div>';
      return;
    }

    const selected = [...repos].sort((a, b) => projectScore(b) - projectScore(a)).slice(0, 6);
    projectGrid.innerHTML = selected.map(cardTemplate).join('');
  }

  async function loadProjects() {
    try {
      const response = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      const repositories = await response.json();
      renderProjects(Array.isArray(repositories) ? repositories : []);
    } catch (error) {
      console.warn('GitHub loyihalarini yuklashda xato:', error);
      projectGrid.innerHTML = `<div class="loading-card">Loyihalarni yuklab bo‘lmadi. <a href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" rel="noreferrer">GitHub’da ko‘rish ↗</a></div>`;
    }
  }

  // Link bosilganda header balandligini hisobga oluvchi yumshoq scroll.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  loadProjects();
})();
