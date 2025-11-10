import { gsap } from "gsap";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Products & Solutions", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

export function initializeHeader() {
  const headerContainer = document.querySelector("#header");
  headerContainer.innerHTML = createHeaderHTML();
  setupMenuToggle();
}

function createHeaderHTML() {
  return `
    <!-- Header -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-primary/50 backdrop-blur-md border-b border-white/10">
      <div class="py-4 flex items-center justify-between max-w-[1270px] mx-auto px-4">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-2 group">
          <img 
            src="/src/assets/icons/logo.png" 
            alt="DartAgro" 
            class="w-5 h-5"
          />
          <span class=" text-white whitespace-nowrap">
            DartAgro System
          </span>
        </a>

        <!-- Menu Toggle Button -->
        <button 
          id="menuToggle" 
          class="relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1 bg-none border-none cursor-pointer p-0"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <span class="hamburger-line w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"></span>
          <span class="hamburger-line w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"></span>
          <span class="hamburger-line w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <nav 
      id="mobileMenu" 
      class="fixed inset-0 z-40 bg-primary/50 backdrop-blur-md pointer-events-none opacity-0 transition-opacity duration-300"
    >
      <div class="h-full pt-40 px-6 sm:px-8 lg:px-12 flex flex-col items-end justify-start">
        <ul class="space-y-8 text-right">
          ${menuItems
            .map(
              (item, index) => `
            <li class="menu-item opacity-0 translate-y-4" style="transition-delay: ${index * 50}ms">
              <a 
                href="${item.href}" 
                class="text-3xl sm:text-4xl lg:text-5xl font-light text-white hover:text-accent transition-colors duration-300"
              >
                ${item.label}
              </a>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    </nav>

    <!-- Spacer for fixed header -->
  `;
}

function setupMenuToggle() {
  const menuToggle = document.querySelector("#menuToggle");
  const mobileMenu = document.querySelector("#mobileMenu");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");
  const menuItems = document.querySelectorAll(".menu-item");
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

