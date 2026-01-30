// The Hues Lounge Makeover Studio - JavaScript

// ===================================
// Navigation & Mobile Menu
// ===================================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===================================
// Smooth Scrolling
// ===================================

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
  observer.observe(element);
});

// ===================================
// Portfolio Filter
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filterValue === 'all' || category === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===================================
// Testimonials Slider
// ===================================

const testimonials = [
  {
    text: "The Hues Lounge made my wedding day absolutely perfect! The bridal makeup was flawless and lasted throughout the entire celebration. The team was professional, talented, and made me feel like a princess. Highly recommended!",
    author: "Priya Sharma",
    rating: 5
  },
  {
    text: "I've been a regular client for over a year now. Their hair coloring service is exceptional! The stylists really understand what suits you and the results are always stunning. The ambiance is luxurious and relaxing.",
    author: "Anjali Mehta",
    rating: 5
  },
  {
    text: "Amazing experience! Got my party makeup done here and received so many compliments. The makeup artist was skilled and patient, making sure I was completely satisfied. Will definitely come back!",
    author: "Neha Kapoor",
    rating: 5
  },
  {
    text: "The facial treatment here is absolutely divine! My skin has never looked better. The products they use are premium quality and the staff is knowledgeable and caring. A true luxury experience!",
    author: "Riya Patel",
    rating: 5
  },
  {
    text: "Best nail art in town! The designs are creative and unique. The attention to detail is impressive and the manicure lasts for weeks. The Hues Lounge is my go-to place for all beauty needs!",
    author: "Kavya Reddy",
    rating: 5
  }
];

let currentTestimonial = 0;

const testimonialCard = document.querySelector('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateTestimonial() {
  const testimonial = testimonials[currentTestimonial];
  const stars = '★'.repeat(testimonial.rating);

  testimonialCard.style.opacity = '0';
  testimonialCard.style.transform = 'translateY(20px)';

  setTimeout(() => {
    testimonialCard.innerHTML = `
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">- ${testimonial.author}</p>
            <div class="testimonial-rating">${stars}</div>
        `;

    testimonialCard.style.opacity = '1';
    testimonialCard.style.transform = 'translateY(0)';
  }, 300);
}

prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  updateTestimonial();
});

nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial();
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial();
}, 5000);

// ===================================
// Smooth Transitions for Testimonial Card
// ===================================

testimonialCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// ===================================
// Portfolio Item Transitions
// ===================================

portfolioItems.forEach(item => {
  item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Lazy Loading Images (Optional Enhancement)
// ===================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Console Welcome Message
// ===================================

console.log('%c Welcome to The Hues Lounge Makeover Studio! ',
  'background: linear-gradient(135deg, #D4AF37, #6B4C7C); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Transform your beauty with us! ',
  'color: #D4AF37; font-size: 14px; font-weight: bold;');
