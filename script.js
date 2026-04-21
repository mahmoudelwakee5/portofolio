// Premium WordPress Developer Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');

      // Toggle hamburger animation
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinks.classList.contains('mobile-open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Smooth Scrolling for Navigation Links
  const navLinksAll = document.querySelectorAll('a[href^="#"]');
  navLinksAll.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Keep content sections visible at all times.
  // The previous reveal-on-scroll system applied a hidden class without
  // ever promoting sections to a visible state, which caused the page
  // content to disappear after load.
  const contentSections = document.querySelectorAll('.section');
  contentSections.forEach(section => {
    section.classList.remove('reveal', 'is-visible');
  });

  // Hero Section Animations - Use CSS animations for better performance
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions');
  heroElements.forEach((element, index) => {
    // Use CSS animations instead of inline opacity manipulation
    element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
  });

  // Floating Elements Animation
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });

  // Background Shapes Animation
  const bgShapes = document.querySelectorAll('.bg-shape');
  bgShapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 1}s`;
  });

  // Skills Tags Hover Effect
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Project Cards Hover Effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const project = formData.get('project');
      const message = formData.get('message').trim();

      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Create email content
      const subject = encodeURIComponent(`Portfolio Inquiry: ${project}`);
      const body = encodeURIComponent(
        `Hello Mahmoud,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Project Type: ${project}\n\n` +
        `Message:\n${message}\n\n` +
        `Best regards,\n${name}`
      );

      // Open email client
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = 'Opening Email Client...';
      submitButton.disabled = true;

      window.location.href = `mailto:elwakeelmahmoud06@gmail.com?subject=${subject}&body=${body}`;

      // Reset button after delay
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }

  // Navbar Background Change on Scroll - Optimized
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  let ticking = false;

  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Console log for development
  console.log('🚀 Premium WordPress Developer Portfolio Loaded Successfully!');
  console.log('📧 Contact: elwakeelmahmoud06@gmail.com');
  console.log('🌐 Live Projects: 5+ completed successfully');
});
