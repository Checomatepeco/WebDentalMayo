import './style.css'

// Styles are now fully handled in style.css to avoid conflicts
// JS is reserved for interactivity only

// Simple Carousel Logic
const initCarousel = () => {
  const images = document.querySelectorAll('.carousel-img');
  if (images.length === 0) return;

  let currentIndex = 0;

  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 4000); // Change every 4 seconds
};

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
});


// Mobile Menu Interaction
document.querySelector('.mobile-toggle').addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.padding = '1rem';
  }
});

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

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
  el.style.opacity = 0; // Hide initially
  el.style.transform = 'translateY(20px)'; // Prepare for animation
  // Reuse the keyframe animation but we need to ensure opacity handling matches
  // Actually, let's just use the class that has the animation
  observer.observe(el);
});

