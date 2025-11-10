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

// Export lenis instance for use in other modules if needed
window.lenis = lenis;
