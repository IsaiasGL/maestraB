
    document.addEventListener('DOMContentLoaded', function() {
      const navLinks = document.querySelectorAll('nav a');
      const sections = document.querySelectorAll('section');

      function updateActiveNavLink() {
        let currentActiveSection = 'inicio';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 80;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentActiveSection = section.id;
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === currentActiveSection) {
            link.classList.add('active');
          }
        });
      }

      navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            history.pushState(null, null, targetId);
          }
        });
      });

      window.addEventListener('scroll', updateActiveNavLink);

      window.addEventListener('load', () => {
        if (window.location.hash) {
          const targetElement = document.querySelector(window.location.hash);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
            updateActiveNavLink();
          }
        } else {
          updateActiveNavLink();
        }
      });
      window.addEventListener('hashchange', updateActiveNavLink);
    });
