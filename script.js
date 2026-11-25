(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  const mobileQuery = window.matchMedia('(max-width: 700px)');
  mobileQuery.addEventListener('change', () => setMenu(false));

  const cards = [...document.querySelectorAll('.project-card')];
  const createProjectImage = (image, loading = 'lazy') => {
    const element = document.createElement('img');
    element.src = image.src;
    element.alt = image.alt;
    element.width = image.width;
    element.height = image.height;
    element.loading = loading;
    element.decoding = 'async';
    return element;
  };
  // An image record also enables screenshots for future project-photo uploads.
  cards.forEach((card) => {
    const project = window.portfolioProjects?.[card.querySelector('.project-open').dataset.project];
    if (!project?.image) return;
    const artwork = card.querySelector('.project-art');
    artwork.className = 'project-art project-screenshot';
    const chrome = document.createElement('div');
    chrome.className = 'screenshot-chrome';
    const dots = document.createElement('span');
    dots.className = 'window-dots';
    dots.setAttribute('aria-hidden', 'true');
    for (let index = 0; index < 3; index += 1) dots.append(document.createElement('i'));
    const label = document.createElement('span');
    label.textContent = project.name;
    chrome.append(dots, label);
    const image = createProjectImage(project.image);
    image.className = 'project-screen-image';
    artwork.replaceChildren(chrome, image);
  });
  const filters = [...document.querySelectorAll('.filter')];
  const filterStatus = document.querySelector('#filter-status');
  const searchInput = document.querySelector('#project-search');
  const clearSearch = document.querySelector('#clear-project-search');
  const emptyProjects = document.querySelector('#project-empty');
  const resultsSummary = document.querySelector('#project-results');
  const showMore = document.querySelector('#show-more-projects');
  const pageSize = 6;
  let activeCategory = 'all';
  let visibleLimit = pageSize;
  const projectCount = document.querySelector('.filter[data-filter="all"] span');
  if (projectCount) projectCount.textContent = cards.length;
  const normalizeSearch = (value) => value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  const searchableCards = cards.map((card) => {
    const project = window.portfolioProjects?.[card.querySelector('.project-open').dataset.project];
    const text = [card.textContent, project?.name, project?.title, project?.summary, project?.organization, project?.role, project?.domain, ...(project?.technologies || []), ...(project?.contributions || [])].join(' ');
    return { card, text: normalizeSearch(text) };
  });

  const renderProjects = (announce = true) => {
    const query = normalizeSearch(searchInput.value);
    const terms = query ? query.split(' ') : [];
    const matching = searchableCards.filter(({ card, text }) =>
      (activeCategory === 'all' || card.dataset.category === activeCategory) && terms.every((term) => text.includes(term))
    ).map(({ card }) => card);
    const visible = new Set(matching.slice(0, visibleLimit));
    cards.forEach((card) => { card.hidden = !visible.has(card); });
    const shown = visible.size;
    const remaining = matching.length - shown;
    clearSearch.hidden = !searchInput.value;
    emptyProjects.hidden = matching.length !== 0;
    showMore.hidden = remaining === 0;
    showMore.innerHTML = `Show ${Math.min(pageSize, remaining)} more projects <span aria-hidden="true">+</span>`;
    resultsSummary.textContent = matching.length === 0 ? 'No matching projects' : `Showing ${shown} of ${matching.length} ${matching.length === 1 ? 'project' : 'projects'}`;
    if (announce) filterStatus.textContent = `${resultsSummary.textContent}${query ? ` for “${searchInput.value.trim()}”` : ''}.`;
    return matching;
  };
  const selectCategory = (category) => {
    activeCategory = category;
    visibleLimit = pageSize;
    filters.forEach((filter) => {
      const active = filter.dataset.filter === category;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    renderProjects();
  };
  filters.forEach((button) => button.addEventListener('click', () => selectCategory(button.dataset.filter)));
  searchInput.addEventListener('input', () => {
    visibleLimit = pageSize;
    renderProjects();
  });
  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    visibleLimit = pageSize;
    renderProjects();
    searchInput.focus();
  });
  document.querySelector('.catalog-reset').addEventListener('click', () => {
    searchInput.value = '';
    selectCategory('all');
    searchInput.focus();
  });
  showMore.addEventListener('click', () => {
    const previousLimit = visibleLimit;
    visibleLimit += pageSize;
    const matching = renderProjects();
    if (showMore.hidden) matching[previousLimit]?.querySelector('.project-open').focus({ preventScroll: true });
  });
  document.querySelector('.project-discovery').hidden = false;
  document.querySelector('.catalog-footer').hidden = false;
  renderProjects(false);

  // Details are useful independent of the animated section reveals.
  document.querySelectorAll('.toolkit-item, .training-details').forEach((details) => details.addEventListener('toggle', () => {
    details.querySelector('.details-plus').textContent = details.open ? '−' : '+';
  }));
  document.querySelectorAll('details[open] .details-plus').forEach((symbol) => { symbol.textContent = '−'; });

  const dialog = document.querySelector('#project-dialog');
  const dialogContent = document.querySelector('#dialog-content');
  let lastProjectButton = null;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

  document.querySelectorAll('.project-open').forEach((button) => button.addEventListener('click', () => {
    const project = window.portfolioProjects?.[button.dataset.project];
    if (!project) return;
    lastProjectButton = button;
    if (project.image) {
      const figure = document.createElement('figure');
      figure.className = 'dialog-project-image';
      const toolbar = document.createElement('div');
      toolbar.className = 'dialog-image-toolbar';
      const label = document.createElement('span');
      label.textContent = 'PROJECT SCREENSHOT';
      const fullSizeLink = document.createElement('a');
      fullSizeLink.href = project.image.src;
      fullSizeLink.target = '_blank';
      fullSizeLink.rel = 'noopener noreferrer';
      fullSizeLink.textContent = 'View full-size image';
      fullSizeLink.setAttribute('aria-label', `View full-size ${project.name} screenshot`);
      toolbar.append(label, fullSizeLink);
      const caption = document.createElement('figcaption');
      caption.textContent = project.image.caption;
      figure.append(toolbar, createProjectImage(project.image, 'eager'), caption);
      dialogContent.replaceChildren(figure);
    } else {
      const illustration = button.closest('.project-card').querySelector('.project-art').cloneNode(true);
      illustration.setAttribute('aria-hidden', 'true');
      const artContainer = document.createElement('div');
      artContainer.className = 'dialog-art';
      artContainer.append(illustration);
      dialogContent.replaceChildren(artContainer);
    }
    const body = document.createElement('div');
    body.className = 'dialog-body';
    body.innerHTML = `
      <p class="dialog-eyebrow">${escapeHTML(project.eyebrow)}</p>
      <h2 id="dialog-title">${escapeHTML(project.title)}</h2>
      <p class="dialog-lead">${escapeHTML(project.summary)}</p>
      <dl class="dialog-meta"><div><dt>ORGANIZATION</dt><dd>${escapeHTML(project.organization)}</dd></div><div><dt>MY CONTRIBUTION</dt><dd>${escapeHTML(project.role)}</dd></div></dl>
      <h3>${escapeHTML(project.contributionHeading || 'What I contributed')}</h3>
      <ul>${project.contributions.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
      <h3>Technology &amp; approach</h3>
      <div class="tags">${project.technologies.map((technology) => `<span>${escapeHTML(technology)}</span>`).join('')}</div>
      <div class="dialog-footer"><p>${escapeHTML(project.domain)}</p><a class="text-link" href="mailto:ranahamid007@gmail.com?subject=${encodeURIComponent(`Let's talk about ${project.name}`)}">Discuss this work <span aria-hidden="true">+</span></a></div>`;
    dialogContent.append(body);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    lastProjectButton?.focus({ preventScroll: true });
  });

  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('#copy-status');
  let copyTimer;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('ranahamid007@gmail.com');
      copyStatus.textContent = 'Email address copied to clipboard.';
      copyButton.setAttribute('aria-label', 'Email address copied');
      copyButton.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg><span>Copied</span>';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyButton.setAttribute('aria-label', 'Copy email address');
        copyButton.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg><span>Copy email</span>';
        copyStatus.textContent = '';
      }, 3000);
    } catch {
      copyStatus.textContent = 'Could not copy automatically. Select the email address to copy it.';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('.contact-email'));
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });

  document.querySelector('#year').textContent = new Date().getFullYear();

  // Content stays visible without JavaScript or when reduced motion is enabled.
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll('a').forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.about-main, .about-facts, .section-heading, .expertise-card, .timeline-item, .recognition-grid, .problem-solving').forEach((element) => {
        element.classList.add('reveal-ready');
        revealObserver.observe(element);
      });
    }
  }
})();
