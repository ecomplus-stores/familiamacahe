// Add your custom JavaScript for storefront pages here.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[aside-toggle]');
  if (btn) {
    const asideClass = btn.getAttribute('aside-toggle');
    const aside = document.querySelector(`.${asideClass}`);
    if (aside) {
      aside.classList.toggle('visible');
    }
  }
});