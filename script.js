document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  const footerYear = document.getElementById("footerYear");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (footerYear) {
    footerYear.textContent = `${new Date().getFullYear()} Mahmoud Anwar Elwakeel. All rights reserved.`;
  }

  const closeMobileMenu = () => {
    if (!navToggle || !mobileMenu) {
      return;
    }

    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1120) {
        closeMobileMenu();
      }
    });
  }

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#" || !href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const headerOffset = header ? header.offsetHeight + 12 : 0;
      const targetTop = href === "#top"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });

      closeMobileMenu();
    });
  });

  const updateHeaderState = () => {
    if (!header) {
      return;
    }

    header.classList.toggle("scrolled", window.scrollY > 18);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const project = String(formData.get("project") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const submitButton = contactForm.querySelector('button[type="submit"]');

      formStatus.classList.remove("is-error", "is-success");

      if (!name || !email || !project || !message) {
        formStatus.textContent = "Please complete every field so I can understand your project clearly.";
        formStatus.classList.add("is-error");
        return;
      }

      if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.classList.add("is-error");
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry: ${project}`);
      const body = encodeURIComponent(
        `Hello Mahmoud,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Project Type: ${project}\n\n` +
        `Project Details:\n${message}\n\n` +
        `Best regards,\n${name}`
      );

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true;
        submitButton.textContent = "Opening Email Client...";
      }

      formStatus.textContent = "Your email client is opening with the project details prepared.";
      formStatus.classList.add("is-success");

      window.location.href = `mailto:elwakeelmahmoud06@gmail.com?subject=${subject}&body=${body}`;

      window.setTimeout(() => {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Project Inquiry";
        }
      }, 1800);
    });
  }
});
