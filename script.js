const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".trainer__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".blog__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

// Scroll Reveal Animation with Slower Timing
const scrollReveal = () => {
  const elements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a small delay based on element's position
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  elements.forEach((element, index) => {
    // Add staggered delay to elements
    element.dataset.delay = index * 200;
    observer.observe(element);
  });
};

// Smooth Scroll with Slower Timing
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          duration: 2000 // Slower scroll duration
        });
      }
    });
  });
};

// Navbar Animation with Slower Timing
const navbarAnimation = () => {
  const nav = document.querySelector('nav');
  let lastScroll = 0;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }

    scrollTimeout = setTimeout(() => {
      if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
      }
      lastScroll = currentScroll;
    }, 150); // Add delay to make the transition smoother
  });
};

// Counter Animation with Slower Timing
const animateCounter = () => {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 3000; // 3 seconds for slower counting
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Start counter animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
};

// Initialize all animations with a slight delay
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    scrollReveal();
    smoothScroll();
    navbarAnimation();
    animateCounter();
  }, 500); // Initial delay before starting animations
});

// Add scroll-reveal class to elements with staggered delays
document.querySelectorAll('.section__container, .about__card, .session__card, .trainer__card, .membership__card, .blog__card').forEach((element, index) => {
  element.classList.add('scroll-reveal');
  element.dataset.delay = index * 200; // Staggered delay for each element
});