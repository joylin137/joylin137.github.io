(() => {
  'use strict';
  const header = document.querySelector('header');
  const firstSection = document.querySelector('main .page-section');
  const menu = document.querySelector('.header-menu');
  const toggles = [...document.querySelectorAll('.header-burger button')];
  let activeToggle;
  const syncHeader = () => {
    if (!header) return;
    const height = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
    document.documentElement.style.setProperty('--header-fixed-top-offset', `${height}px`);
    document.documentElement.style.scrollPaddingTop = `${height}px`;
    if (firstSection) firstSection.style.paddingTop = `${height}px`;
  };
  syncHeader();
  if (header) new ResizeObserver(syncHeader).observe(header);
  document.fonts.ready.then(syncHeader);
  if (menu) {
    menu.id = 'mobile-navigation';
    menu.inert = true;
    menu.setAttribute('aria-hidden', 'true');
  }
  const setMenu = (open, returnFocus = false) => {
    document.body.classList.toggle('static-menu-open', open);
    document.body.classList.toggle('header-menu-open', open);
    if (menu) {
      menu.inert = !open;
      menu.setAttribute('aria-hidden', String(!open));
    }
    toggles.forEach(button => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      button.classList.toggle('burger--active', open);
    });
    if (open) menu?.querySelector('a')?.focus();
    else if (returnFocus) activeToggle?.focus();
  };
  toggles.forEach(button => {
    button.setAttribute('aria-controls', 'mobile-navigation');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    button.addEventListener('click', () => {
      activeToggle = button;
      setMenu(!document.body.classList.contains('static-menu-open'), true);
    });
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('static-menu-open')) return;
    if (event.key === 'Escape') setMenu(false, true);
    if (event.key === 'Tab') {
      const items = [activeToggle, ...menu.querySelectorAll('a[href]')].filter(e => e && e.getClientRects().length);
      const index = items.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault(); items.at(-1)?.focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault(); items[0]?.focus();
      }
    }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
})();
