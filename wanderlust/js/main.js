'use strict';

/* ==========================================================================
   Mobile menu
   ========================================================================== */
function initMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // any link inside the menu navigates, so close it
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !e.target.closest('.navbar')) setOpen(false);
  });

  // leaving the mobile layout with the menu open would leave stale state behind
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => setOpen(false));
}

/* ==========================================================================
   Highlight the nav link of the section in view
   ========================================================================== */
function initActiveLink() {
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => observer.observe(section));
}

initMenu();
initActiveLink();
