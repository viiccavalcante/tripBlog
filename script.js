// ============================================
// FULLSCREEN NAVIGATION TOGGLE
// ============================================

(function () {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const fullscreenNav = document.querySelector(".fullscreen-nav");

  if (!navToggle || !fullscreenNav) {
    return;
  }

  /**
   * Toggles the fullscreen navigation menu
   * Updates ARIA attributes for accessibility
   */
  function toggleNavigation() {
    const isOpen = fullscreenNav.classList.contains("is-open");
    const newState = !isOpen;

    fullscreenNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", newState.toString());

    // Prevent body scroll when nav is open
    if (newState) {
      document.body.style.overflow = "hidden";
      trapFocus();
    } else {
      document.body.style.overflow = "";
      removeFocusTrap();
    }
  }

  /**
   * Manages focus within the navigation menu
   * Ensures keyboard users stay within the menu when open
   */
  let currentTabHandler = null;

  function trapFocus() {
    const focusableElements = fullscreenNav.querySelectorAll(
      "a[href], button:not([disabled])"
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when nav opens
    firstElement.focus();

    // Remove previous handler if it exists
    if (currentTabHandler) {
      fullscreenNav.removeEventListener("keydown", currentTabHandler);
    }

    currentTabHandler = function handleTabKey(e) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    fullscreenNav.addEventListener("keydown", currentTabHandler);
  }

  /**
   * Removes focus trap when navigation closes
   */
  function removeFocusTrap() {
    if (currentTabHandler) {
      fullscreenNav.removeEventListener("keydown", currentTabHandler);
      currentTabHandler = null;
    }
  }

  /**
   * Closes navigation on Escape key press
   */
  function handleEscapeKey(event) {
    if (event.key === "Escape" && fullscreenNav.classList.contains("is-open")) {
      toggleNavigation();
      navToggle.focus();
    }
  }

  // Event Listeners
  navToggle.addEventListener("click", toggleNavigation);
  document.addEventListener("keydown", handleEscapeKey);
})();

// ============================================
// HEADER SCROLL EFFECT
// ============================================

(function () {
  "use strict";

  const header = document.querySelector(".site-header");

  if (!header) return;

  let lastScrollY = window.scrollY;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  }

  // Use requestAnimationFrame for smooth performance
  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateHeader();
        ticking = false;
      });

      ticking = true;
    }
  });

  // Initial check
  updateHeader();
})();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

(function () {
  "use strict";

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip empty hash or just "#"
      if (!href || href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Close fullscreen nav if open (trigger the toggle to ensure cleanup)
        const fullscreenNav = document.querySelector(".fullscreen-nav");
        const navToggle = document.querySelector(".nav-toggle");
        if (
          fullscreenNav &&
          fullscreenNav.classList.contains("is-open") &&
          navToggle
        ) {
          navToggle.click();
        }

        // Small delay to allow nav closing animation
        setTimeout(() => {
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update focus for accessibility
          target.focus({ preventScroll: true });
        }, 300);
      }
    });
  });
})();

// ============================================
// PARALLAX EFFECT FOR HERO IMAGE
// ============================================

(function () {
  "use strict";

  const heroImage = document.querySelector(".hero-image");

  if (!heroImage) return;

  function updateParallax() {
    const scrollY = window.scrollY;
    const parallaxSpeed = 0.5;

    heroImage.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
  }

  // Use requestAnimationFrame for smooth performance
  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateParallax();
        ticking = false;
      });

      ticking = true;
    }
  });
})();

// ============================================
// INTERSECTION OBSERVER FOR VISUAL CARDS
// ============================================

(function () {
  "use strict";

  const visualCards = document.querySelectorAll(".visual-card");

  if (!visualCards.length) return;

  // Add initial invisible state
  visualCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  visualCards.forEach((card) => observer.observe(card));
})();

// ============================================
// ACCESSIBILITY: Skip to main content
// ============================================

(function () {
  "use strict";

  // Add skip link dynamically
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-accent);
        color: var(--color-bg-primary);
        padding: 8px 16px;
        text-decoration: none;
        z-index: 1000;
        transition: top var(--transition-fast);
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "0";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add ID to main if not present
  const main = document.querySelector("main");
  if (main && !main.id) {
    main.id = "main";
  }
})();

// ============================================
// IMAGE PRELOADER (for better performance)
// ============================================

(function () {
  "use strict";

  // This is a placeholder for when you add actual images
  // You can preload critical images here for better performance
})();

// ============================================
// COUNTDOWN
// ============================================

(function () {
  const countdownDate = new Date("2025-10-29T00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// ============================================
// CHANGE IMG SIZES ACCORDING TO SCREEN
// ============================================
(function () {
  "use strict";

  function updateImages() {
    const isMobile = window.innerWidth < 768;
    const folder = isMobile ? "mobile" : "desktop";

    const pathParts = window.location.pathname.split("/");
    const basePath = "/" + pathParts[1];

    document.querySelectorAll("[data-img]").forEach((el) => {
      const imgName = el.dataset.img;
      el.style.backgroundImage = `url('${basePath}/assets/${folder}/${imgName}')`;
    });
  }

  updateImages();

  window.addEventListener("resize", updateImages);
})();
