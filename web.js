document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (navList.classList.contains('open')) {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // IntersectionObserver to highlight active nav link
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }, { threshold: [0.5, 0.65] });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // Newsletter submit behavior
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value.trim();
      if (!email) return alert('Please enter your email.');
      alert('Thank you! We will contact you soon — ' + email);
      newsletterForm.reset();
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const dd = document.querySelector('.dropdown');
    if (!dd) return;
    if (!e.target.closest('.dropdown-item')) {
      dd.style.display = 'none';
    }
  });

  // Enhanced image fallback handler
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (!img.src.includes('fallback')) {
        console.warn(`Image failed to load: ${img.src}`);
        img.src = img.getAttribute('onerror').match(/'([^']+)'/)[1];
        img.alt = 'Image not available';
      }
    });
  });
});