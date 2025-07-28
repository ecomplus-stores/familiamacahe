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


document.addEventListener('click', function(e) {
  const scrollBtn = e.target.closest('[data-scroll]');
  if (scrollBtn) {
    e.preventDefault();
    const targetId = scrollBtn.getAttribute('data-scroll');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      // Calcular posição com offset de -30px
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - (window.innerWidth < 990 ? 70 : 30);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      $(`.aside-left, .aside-right`).removeClass('visible');
    } else {
      if (scrollBtn.tagName === 'A' && scrollBtn.href) {
        window.location.href = scrollBtn.href;
      } else {
        scrollBtn.click();
      }
    }
  }
});