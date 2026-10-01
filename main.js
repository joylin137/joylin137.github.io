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
  const fitImages = [...document.querySelectorAll('.image-component-container-fit')].map(root => {
    const wrapper = root.querySelector('.sqs-image');
    const container = root.querySelector('.fluid-image-container');
    const block = root.closest('.sqs-block');
    if (!wrapper || !container || !block) return null;
    const fit = () => {
      const ratioParts = getComputedStyle(block).getPropertyValue('--image-component-native-aspect-ratio').trim().split('/').map(Number);
      const ratio = ratioParts.length === 2 ? ratioParts[0] / ratioParts[1] : ratioParts[0];
      const { width, height } = wrapper.getBoundingClientRect();
      if (!ratio || !width || !height) return;
      const imageHeight = Math.min(height, width / ratio);
      const imageWidth = Math.min(width, height * ratio);
      container.style.setProperty('--image-component-container-width', `${imageWidth}px`);
      container.style.setProperty('--image-component-container-height', `${imageHeight}px`);
    };
    new ResizeObserver(fit).observe(wrapper);
    fit();
    return fit;
  }).filter(Boolean);
  document.fonts.ready.then(() => fitImages.forEach(fit => fit()));
  const scaledTexts = [...document.querySelectorAll('.sqsrte-scaled-text-container')].map(root => {
    const text = root.querySelector('.sqsrte-scaled-text');
    if (!text) return null;
    const fit = () => {
      const availableWidth = root.getBoundingClientRect().width;
      if (!availableWidth) return;
      text.style.fontSize = '100px';
      const measuredWidth = text.getBoundingClientRect().width;
      if (measuredWidth) text.style.fontSize = `${100 * availableWidth / measuredWidth}px`;
    };
    new ResizeObserver(fit).observe(root);
    fit();
    return fit;
  }).filter(Boolean);
  document.fonts.ready.then(() => scaledTexts.forEach(fit => fit()));
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
