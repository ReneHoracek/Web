document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.hamburger');
  const overlay = document.getElementById('mobileNav');
  if (!burger || !overlay) return;
  const closeBtn = overlay.querySelector('.nav-close');

  const open = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
});
