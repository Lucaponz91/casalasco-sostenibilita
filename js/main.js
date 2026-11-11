const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const navLinks = document.querySelectorAll(".primary-nav a");

// Applica lo stile "compatto" all'header quando la pagina viene scorsa oltre 30px.
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Apre/chiude il menu mobile e aggiorna gli attributi di accessibilità.
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Apri il menu" : "Chiudi il menu");
  nav.classList.toggle("is-open", !isOpen);
});

// Chiude il menu mobile quando si clicca su un link di navigazione.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Apri il menu");
  });
});

// Reveal delicato degli elementi durante lo scorrimento.
const revealTargets = document.querySelectorAll(
  ".section-heading, .stat-card, .chain-card, .environment-card, .innovation-list article, .people-copy, .report-copy"
);
revealTargets.forEach((element) => element.classList.add("reveal"));

// Se supportato, mostra ogni elemento quando entra nel viewport (una sola volta);
// altrimenti rende subito visibili tutti gli elementi.
if ("IntersectionObserver" in window) {
  console.log("IntersectionObserver is supported");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
