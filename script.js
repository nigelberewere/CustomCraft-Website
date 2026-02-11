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
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const service = document.getElementById('service').value;
    const description = document.getElementById('description').value;
    
    // Format WhatsApp message
    const message = `Hello CustomCraft Carpenters!

*New Quote Request*

*Name:* ${name}
*Phone:* ${phone}
*Location:* ${location}
*Service:* ${service}
*Description:* ${description}

I would like to request a free inspection and quote for this project.`;

    // WhatsApp business number
    const whatsappNumber = '263773414278';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
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

// Image Lightbox Modal Functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentImageIndex = 0;
let visibleCards = [];

if (modal && ceilingCards.length > 0) {
  // Open modal when clicking on ceiling cards
  ceilingCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('hidden')) {
        visibleCards = Array.from(ceilingCards).filter(c => !c.classList.contains('hidden'));
        currentImageIndex = visibleCards.findIndex(c => c === card);
        openModal();
      }
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + visibleCards.length) % visibleCards.length;
    updateModalImage();
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % visibleCards.length;
    updateModalImage();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + visibleCards.length) % visibleCards.length;
      updateModalImage();
    }
    if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % visibleCards.length;
      updateModalImage();
    }
  });

  function openModal() {
    modal.classList.add('active');
    updateModalImage();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function updateModalImage() {
    if (visibleCards.length > 0) {
      const imageSrc = visibleCards[currentImageIndex].getAttribute('data-image');
      modalImage.src = imageSrc;
      
      // Update button states
      prevBtn.disabled = visibleCards.length === 1;
      nextBtn.disabled = visibleCards.length === 1;
    }
  }
}

