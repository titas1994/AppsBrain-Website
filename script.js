(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const year = document.getElementById('year');
  const popup = document.getElementById('leadPopup');
  const closePopup = document.getElementById('closePopup');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  menuToggle?.addEventListener('click', () => navMenu?.classList.toggle('open'));
  navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navMenu.classList.remove('open')));

  if (year) year.textContent = String(new Date().getFullYear());

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  let popupShown = sessionStorage.getItem('leadPopupShown') === '1';
  const showPopup = () => {
    if (!popup || popupShown) return;
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    popupShown = true;
    sessionStorage.setItem('leadPopupShown', '1');
  };

  window.addEventListener('scroll', () => {
    const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    if (progress > 0.45) showPopup();
  }, { passive: true });

  document.addEventListener('mouseout', (event) => {
    if (event.clientY <= 0) showPopup();
  });

  closePopup?.addEventListener('click', () => {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  });

  popup?.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.classList.remove('show');
      popup.setAttribute('aria-hidden', 'true');
    }
  });

  contactForm?.addEventListener('submit', (event) => {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      formStatus.textContent = 'Please fill out all required fields correctly.';
      return;
    }
    formStatus.textContent = 'Submitting your message...';
  });
})();
