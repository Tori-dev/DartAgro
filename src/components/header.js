import { gsap } from "gsap";
import logoUrl from "../assets/icons/logo.png";

export function initializeHeader() {
  applyLogoAsset();
  setupMenuToggle();
}

function applyLogoAsset() {
  const logoImage = document.querySelector("[data-header-logo]");
  if (!logoImage) {
    return;
  }
  logoImage.src = logoUrl;
}

function setupMenuToggle() {
  const menuToggle = document.querySelector("#menuToggle");
  const mobileMenu = document.querySelector("#mobileMenu");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");
  const menuItems = document.querySelectorAll(".menu-item");
  if (
    !menuToggle ||
    !mobileMenu ||
    !hamburgerLines.length ||
    !menuItems.length
  ) {
    return;
  }
  let isMenuOpen = false;

  menuToggle.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.setAttribute("aria-expanded", isMenuOpen);

    if (isMenuOpen) {
      openMenu(mobileMenu, hamburgerLines, menuItems);
    } else {
      closeMenu(mobileMenu, hamburgerLines, menuItems);
    }
  });

  // Close menu when clicking on a menu item
  menuItems.forEach((item) => {
    item.querySelector("a").addEventListener("click", () => {
      isMenuOpen = false;
      menuToggle.setAttribute("aria-expanded", false);
      closeMenu(mobileMenu, hamburgerLines, menuItems);
    });
  });
}

function openMenu(mobileMenu, hamburgerLines, menuItems) {
  // Show menu overlay
  mobileMenu.classList.remove("pointer-events-none");
  gsap.to(mobileMenu, { opacity: 1, duration: 0.3 });

  // Animate hamburger to X
  gsap.to(hamburgerLines[0], {
    rotate: 45,
    y: 8,
    duration: 0.3,
  });
  gsap.to(hamburgerLines[1], {
    opacity: 0,
    duration: 0.3,
  });
  gsap.to(hamburgerLines[2], {
    rotate: -45,
    y: -8,
    duration: 0.3,
  });

  // Animate menu items
  gsap.to(menuItems, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.05,
  });
}

function closeMenu(mobileMenu, hamburgerLines, menuItems) {
  // Hide menu overlay
  gsap.to(mobileMenu, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      mobileMenu.classList.add("pointer-events-none");
    },
  });

  // Reset hamburger
  gsap.to(hamburgerLines[0], {
    rotate: 0,
    y: 0,
    duration: 0.3,
  });
  gsap.to(hamburgerLines[1], {
    opacity: 1,
    duration: 0.3,
  });
  gsap.to(hamburgerLines[2], {
    rotate: 0,
    y: 0,
    duration: 0.3,
  });

  // Reset menu items
  gsap.to(menuItems, {
    opacity: 0,
    y: 16,
    duration: 0.2,
  });
}

