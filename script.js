const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".main-menu");
const closeButton = document.querySelector(".menu-close");
const menuLinks = document.querySelectorAll(".main-menu a");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const scrollTopButton = document.querySelector(".scroll-top");
const compactNavigation = window.matchMedia("(max-width: 900px)");

const revealTargets = document.querySelectorAll(
  [
    ".hero-content > .eyebrow",
    ".hero-greeting",
    ".hero h1",
    ".hero .intro",
    ".hero .actions",
    ".hero-art",
    ".about-section .section-heading",
    ".about-copy > p",
    ".values-list",
    ".section-intro",
    ".project-card",
    ".skills-intro",
    ".skill-row",
    ".contact-copy > *",
    ".contact-form",
  ].join(", "),
);

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    revealTargets.forEach((target) => {
      target.classList.add("reveal");
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}

function setMenu(open) {
  const isOpen = compactNavigation.matches && open;
  menu.classList.toggle("open", isOpen);
  menu.setAttribute("aria-hidden", String(compactNavigation.matches && !isOpen));
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );

  if (isOpen) {
    menuLinks[0].focus();
  } else if (menu.contains(document.activeElement)) {
    menuButton.focus();
  }
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
closeButton.addEventListener("click", () => setMenu(false));
menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
compactNavigation.addEventListener("change", () => setMenu(false));
window.addEventListener(
  "resize",
  () => {
    if (compactNavigation.matches) {
      if (menuButton.getAttribute("aria-expanded") !== "true") {
        menu.setAttribute("aria-hidden", "true");
      }
    } else {
      setMenu(false);
    }
  },
  { passive: true },
);
setMenu(false);

document.addEventListener("click", (event) => {
  if (
    compactNavigation.matches &&
    menuButton.getAttribute("aria-expanded") === "true" &&
    !menu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

function updateScrollTopButton() {
  scrollTopButton.classList.toggle("is-visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateScrollTopButton, { passive: true });
updateScrollTopButton();

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = `Portfolio inquiry from ${formData.get("name")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    String(formData.get("message")),
  ].join("\n");
  const mailto = `mailto:ayia2a7med@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formStatus.textContent =
    "Opening your email app with your message. If it doesn’t open, email ayia2a7med@gmail.com.";
  window.location.href = mailto;
  contactForm.reset();
});
