import "./style.css";
import Lenis from "lenis";
import { gsap } from "gsap";
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
gsap.registerPlugin();

// Initialize header
const app = document.querySelector("#navbar");
app.innerHTML = `
    <header id="header"></header>


`;

initializeHeader();

// Hero section text reveal animations
function animateHeroText() {
  const heroTitle = document.querySelector("h1");
  const heroDescription = document.querySelector("section p");
  const heroButton = document.querySelector(
    "a[href='#machines'].inline-flex.items-center.gap-3"
  );

  if (!heroTitle || !heroDescription) return;

  // Split text into words and wrap each word in a span
  function splitTextIntoWords(element) {
    // Get all child nodes including text nodes and HTML elements
    const nodes = Array.from(element.childNodes);
    const processedNodes = nodes.map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const words = text.split(/(\s+)/);
        return words
          .map((word) => {
            if (word.trim() === "") return word; // Preserve whitespace
            return `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`;
          })
          .join("");
      } else {
        // Preserve HTML elements like <br>
        return node.outerHTML;
      }
    });
    element.innerHTML = processedNodes.join("");
    return element.querySelectorAll("span span");
  }

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
    // Hover animation - scale up slightly
    heroButton.addEventListener("mouseenter", () => {
      gsap.to(heroButton, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    heroButton.addEventListener("mouseleave", () => {
      gsap.to(heroButton, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    // Click animation - scale down then back up
    heroButton.addEventListener("mousedown", () => {
      gsap.to(heroButton, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });
    });

    heroButton.addEventListener("mouseup", () => {
      gsap.to(heroButton, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });

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

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateHeroText);
} else {
  animateHeroText();
}

// Export lenis instance for use in other modules if needed
window.lenis = lenis;
