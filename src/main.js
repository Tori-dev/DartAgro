import "./style.css";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initializeHeader } from "./components/header.js";

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
  // This can be used for scroll-based animations
});

// Animation frame loop for Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize header
const app = document.querySelector("#navbar");
app.innerHTML = `
    <header id="header"></header>


`;

initializeHeader();

function splitTextIntoWords(element) {
  if (!element) return [];
  if (element.dataset.splitWords === "true") {
    return element.querySelectorAll("[data-word]");
  }
  // Get all child nodes including text nodes and HTML elements
  const nodes = Array.from(element.childNodes);
  const processedNodes = nodes.map((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const words = text.split(/(\s+)/);
      return words
        .map((word) => {
          if (word.trim() === "") return word; // Preserve whitespace
          return `<span class="inline-block overflow-hidden"><span class="inline-block" data-word>${word}</span></span>`;
        })
        .join("");
    } else {
      // Preserve HTML elements like <br>
      return node.outerHTML;
    }
  });
  element.innerHTML = processedNodes.join("");
  element.dataset.splitWords = "true";
  return element.querySelectorAll("[data-word]");
}

function bindButtonInteractions(button) {
  if (!button || button.dataset.buttonInteractionBound === "true") return;
  button.dataset.buttonInteractionBound = "true";

  // Hover animation - scale up slightly
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  // Click animation - scale down then back up
  button.addEventListener("mousedown", () => {
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseup", () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  });
}

function setupAnimatedButtons() {
  const buttons = document.querySelectorAll("[data-animated-button]");
  buttons.forEach((button) => bindButtonInteractions(button));
}

// Hero section text reveal animations
function animateHeroText() {
  const heroTitle = document.querySelector("h1");
  const heroDescription = document.querySelector("section p");
  const heroButton = document.querySelector("[data-animated-button='hero']");

  if (!heroTitle || !heroDescription) return;

  // Split text into words and wrap each word in a span

  // Animate title
  const titleWords = splitTextIntoWords(heroTitle);
  gsap.fromTo(
    titleWords,
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.3,
    }
  );

  // Animate description
  const descWords = splitTextIntoWords(heroDescription);
  gsap.fromTo(
    descWords,
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.8,
    }
  );

  // Button animations (Framer Motion style)
  if (heroButton) {
    bindButtonInteractions(heroButton);

    // Initial button animation
    gsap.fromTo(
      heroButton,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      }
    );
  }

  // Animate the arrow icon button
  const arrowButton = document.querySelector(
    "a[href='#machines'].inline-flex.items-center.group"
  );
  if (arrowButton) {
    gsap.fromTo(
      arrowButton,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 1.4,
      }
    );

    // Hover animation for arrow button
    arrowButton.addEventListener("mouseenter", () => {
      gsap.to(arrowButton.querySelector("span"), {
        scale: 1.1,
        rotation: 5,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    arrowButton.addEventListener("mouseleave", () => {
      gsap.to(arrowButton.querySelector("span"), {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  }
}

function formatStatValue(value, format) {
  const rounded = Math.round(value);
  if (format === "abbreviate") {
    if (rounded >= 1_000_000_000) {
      return `${(rounded / 1_000_000_000).toFixed(
        rounded % 1_000_000_000 === 0 ? 0 : 1
      )}B`;
    }
    if (rounded >= 1_000_000) {
      return `${(rounded / 1_000_000).toFixed(
        rounded % 1_000_000 === 0 ? 0 : 1
      )}M`;
    }
    if (rounded >= 1_000) {
      return `${(rounded / 1_000).toFixed(rounded % 1_000 === 0 ? 0 : 1)}k`;
    }
  }
  return rounded.toLocaleString();
}

function animateAboutSection() {
  const aboutSection = document.querySelector("#about-overview");
  if (!aboutSection) return;

  const badge = aboutSection.querySelector("[data-about-badge]");
  const heading = aboutSection.querySelector("[data-about-heading]");
  const paragraph = aboutSection.querySelector("[data-about-paragraph]");
  const button = aboutSection.querySelector("[data-animated-button='story']");

  const headingWords = splitTextIntoWords(heading);
  const paragraphWords = splitTextIntoWords(paragraph);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 70%",
      once: true,
    },
  });

  if (badge) {
    tl.from(badge, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  if (headingWords.length) {
    tl.from(
      headingWords,
      {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
      },
      badge ? "-0.1" : 0
    );
  }

  if (paragraphWords.length) {
    tl.from(
      paragraphWords,
      {
        y: "120%",
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }

  if (button) {
    bindButtonInteractions(button);
  }
}

function animatePrecisionShowcase() {
  const section = document.querySelector("[data-precision-section]");
  if (!section) return;

  const badge = section.querySelector("[data-precision-badge]");
  const images = section.querySelectorAll("[data-precision-image]");
  const heading = section.querySelector("[data-precision-heading]");
  const paragraph = section.querySelector("[data-precision-paragraph]");
  const button = section.querySelector("[data-animated-button='precision-range']");

  const headingWords = splitTextIntoWords(heading);
  const paragraphWords = splitTextIntoWords(paragraph);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      once: true,
    },
  });

  if (badge) {
    tl.from(badge, {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  if (images.length) {
    tl.from(
      images,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      badge ? "-=0.2" : 0
    );
  }

  if (headingWords.length) {
    tl.from(
      headingWords,
      {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
      },
      "-=0.3"
    );
  }

  if (paragraphWords.length) {
    tl.from(
      paragraphWords,
      {
        y: "110%",
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.out",
      },
      "-=0.25"
    );
  }

  if (button) {
    bindButtonInteractions(button);
    tl.from(
      button,
      {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false,
      },
      "-=0.2"
    );
  }
}

function animateStatsSection() {
  const cards = document.querySelectorAll("#impact-stats .stats-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    const numberEl = card.querySelector(".stat-number");
    const labelEl = card.querySelector(".stat-label");
    if (!numberEl || !labelEl) return;

    const target = Number(numberEl.dataset.target || 0);
    const suffix = numberEl.dataset.suffix || "";
    const format = numberEl.dataset.format || "default";
    const counter = { progress: 0 };

    numberEl.textContent = `0${suffix}`;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      })
      .from(card, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(
        numberEl,
        {
          yPercent: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        labelEl,
        {
          yPercent: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<0.05"
      )
      .to(
        counter,
        {
          progress: 1,
          duration: 1.6,
          ease: "power1.out",
          onUpdate: () => {
            const currentValue = target * counter.progress;
            numberEl.textContent = `${formatStatValue(
              currentValue,
              format
            )}${suffix}`;
          },
          onComplete: () => {
            numberEl.textContent = `${formatStatValue(
              target,
              format
            )}${suffix}`;
          },
        },
        "<"
      );
  });
}

function initPageAnimations() {
  animateHeroText();
  animateStatsSection();
  animateAboutSection();
  animatePrecisionShowcase();
  setupAnimatedButtons();
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPageAnimations);
} else {
  initPageAnimations();
}

// Export lenis instance for use in other modules if needed
window.lenis = lenis;
