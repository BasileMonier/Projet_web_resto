/* =================================================
   main.js – Commun à toutes les pages
   Gère : scroll navbar, menu burger, carousel (index)
   ================================================= */

// ---- Scroll navbar : ajout classe .scrolled ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Burger menu ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobileMenu.classList.toggle('visible', open);
  });
  // Fermer au clic sur un lien
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('visible');
    });
  });
}