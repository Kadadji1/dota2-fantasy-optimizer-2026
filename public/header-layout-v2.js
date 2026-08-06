(() => {
  function setupNavigation() {
    const path = window.location.pathname;
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    // Main page: move the three product tabs into the black header and
    // move the calculator section links into a separate secondary row.
    if (path === '/' || path === '') {
      const primaryTabs = document.querySelector('.homepage-tabs');
      const primaryWrap = document.querySelector('.homepage-tabs-wrap');
      const sectionNav = topbar.querySelector('.anchor-nav');
      const language = topbar.querySelector('.language-switch');

      if (primaryTabs) {
        primaryTabs.classList.add('primary-page-tabs');
        if (language) topbar.insertBefore(primaryTabs, language);
        else topbar.appendChild(primaryTabs);
      }

      if (sectionNav) {
        const secondary = document.createElement('div');
        secondary.className = 'section-nav-wrap';
        sectionNav.classList.add('section-nav');
        secondary.appendChild(sectionNav);
        topbar.insertAdjacentElement('afterend', secondary);
      }

      primaryWrap?.remove();
    }

    // Predictions page: keep the three product tabs in the black header,
    // then add page-specific navigation below it.
    if (path.startsWith('/predictions')) {
      const tabs = topbar.querySelector('.page-tabs');
      tabs?.classList.add('primary-page-tabs');

      const sections = document.querySelectorAll('.predictions-page .section');
      if (sections[0]) sections[0].id = 'bracket';
      if (sections[1]) sections[1].id = 'team-odds';
      const methodology = document.querySelector('.prediction-methodology');
      if (methodology) methodology.id = 'methodology';

      const secondary = document.createElement('div');
      secondary.className = 'section-nav-wrap';
      secondary.innerHTML = `
        <nav class="section-nav" aria-label="Predictions navigation">
          <a href="#bracket">Bracket</a>
          <a href="#team-odds">Team odds</a>
          <a href="#methodology">Methodology</a>
        </nav>`;
      topbar.insertAdjacentElement('afterend', secondary);
    }

    // Point every Guide tab to the standalone guide page.
    document.querySelectorAll('a[href="/#rules"], a[href="#rules"]').forEach((link) => {
      if (link.closest('.page-tabs') || link.closest('.primary-page-tabs')) {
        link.setAttribute('href', '/guide');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavigation);
  } else {
    setupNavigation();
  }
})();
