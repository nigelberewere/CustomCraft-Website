const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

const yearSpan = document.querySelector('[data-year]');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const quoteForm = document.querySelector('#quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! A CustomCraft specialist will call you shortly to schedule your free inspection.');
    quoteForm.reset();
  });
}

// Ceiling Gallery Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const ceilingCards = document.querySelectorAll('.ceiling-card');

if (filterBtns.length > 0 && ceilingCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter cards
      ceilingCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
              card.style.animation = 'fadeIn 0.5s ease';
            }, 10);
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

