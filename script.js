// Elements a animer a l'apparition
const revealTargets = document.querySelectorAll(
  ".section, .hero-card, .hero-content, .card, .timeline-item, .contact-card, .highlight, .hero-portrait, .badge, .pricing-note"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

// Observer pour declencher les animations au scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((el) => observer.observe(el));

// Stagger = delais progressifs pour un effet fluide
const staggerGroups = [
  ".hero-metrics .metric",
  ".grid-3 .card",
  ".grid-2 .card",
  ".timeline-item",
  ".highlight",
  ".trust-badges .badge",
  ".contact-actions .btn",
  ".contact-links .link-pill",
];

staggerGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add("stagger");
    el.style.setProperty("--delay", `${index * 90}ms`);
  });
});

// Gestion du switch FR / EN
const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    document.body.setAttribute("data-lang", lang);
    langButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
  });
});

// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");
    mobileNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    });
  });
}

// Parallax leger pour donner de la profondeur
const parallaxItems = [
  { el: document.querySelector(".orb-1"), speed: 0.12 },
  { el: document.querySelector(".orb-2"), speed: 0.08 },
  { el: document.querySelector(".hero-portrait"), speed: 0.05 },
];

let ticking = false;

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const offset = window.scrollY || 0;
      parallaxItems.forEach(({ el, speed }) => {
        if (!el) return;
        el.style.transform = `translateY(${offset * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener("scroll", onScroll, { passive: true });
