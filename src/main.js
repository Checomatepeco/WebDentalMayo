import './style.css'

console.log('Main.js cargado correctamente 🚀');

// Carousel Logic
const initCarousel = () => {
  const images = document.querySelectorAll('.carousel-img');
  if (images.length === 0) return;

  let currentIndex = 0;
  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 4000);
};

// Mobile Menu Logic (Class Toggle)
const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileToggle) {
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.remove('active');
    });
  });
}

// Scroll Reveal Logic
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      entry.target.style.opacity = 1;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section h2, .location-card, .bio-text').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  observer.observe(el);
});

// --- LIGHTBOX ROBUSTO ---
// Definir funciones globalmente para debug si es necesario
window.openDentalLightbox = (src) => {
  console.log('Intentando abrir lightbox con:', src);
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox && lightboxImg) {
    lightbox.style.display = 'flex'; // Forzar display
    // Pequeño timeout para permitir transición de opacidad
    setTimeout(() => {
      lightbox.classList.add('active');
      lightbox.style.opacity = '1';
    }, 10);

    lightboxImg.src = src;
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Elementos del lightbox no encontrados en el DOM');
  }
};

window.closeDentalLightbox = () => {
  console.log('Cerrando lightbox');
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300); // Esperar transición
    document.body.style.overflow = 'auto';
  }
};

// Event Delegation Global para Clics
document.addEventListener('click', (e) => {
  // 1. Detectar clic en imagen zoomable
  if (e.target.matches('.gallery-img, .team-img')) {
    console.log('Clic detectado en imagen:', e.target);
    e.stopPropagation();
    window.openDentalLightbox(e.target.src);
  }

  // 2. Detectar clic en botón cerrar
  if (e.target.matches('.lightbox-close')) {
    console.log('Clic en cerrar');
    window.closeDentalLightbox();
  }

  // 3. Detectar clic en fondo oscuro
  if (e.target.id === 'lightbox') {
    console.log('Clic en fondo');
    window.closeDentalLightbox();
  }
});

// Tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.closeDentalLightbox();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  console.log('DOM Cargado y listo');
});
