// Project data
const projects = [
  {
    title: "Proposed Lanai - Lincoln Heights",
    caption: "An intimate and breezy gathering space designed for rest and slow moments.",
    description: "An intimate and breezy gathering space designed for rest and slow moments. This proposed lanai blends natural textures, warm lighting, and lush greenery to create a seamless indoor-outdoor experience. With a modern tropical palette and wood-accented ceiling, it invites calm conversation, shaded lounging, and quiet reflection—an elegant escape tucked into the heart of Lincoln Heights.",
    images: [
      "https://images.unsplash.com/photo-1633109667660-26327f6d1733?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1687763076556-86a76c94f06c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1633109633238-e982d5b61f9f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1633109870201-318921e3f992?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    title: "Bedroom Redesign - Client-Initiated Transformation",
    caption: "Reimagines a compact bedroom into a cozy, efficient, and personalized living space.",
    description: "This project reimagines a compact bedroom into a cozy, efficient, and personalized living space—rooted in the owner's vision for comfort and clarity.\nBuilt-in cabinetry, layered lighting, and custom wall paneling add texture and warmth, while the tailored layout maximizes space without compromising style. A dedicated workspace, thoughtful shelving, and a calming palette of greys, wood, and white tones bring balance to rest and productivity",
    images: [
      "https://source.unsplash.com/400x300/?office,design,1",
      "https://source.unsplash.com/400x300/?office,design,2",
      "https://source.unsplash.com/400x300/?office,design,3",
      "https://source.unsplash.com/400x300/?office,design,4"
    ]
  },
  {
    title: "Proposed Auditorium of National University-Manila, Nazareth Building",
    caption: "An academic space that merges functionality with bold architectural expression.",
    description: "This project envisions a modern auditorium designed for National University’s Nazareth Building—an academic space that merges functionality with bold architectural expression. Developed as part of our Building Utilities 3 course, the proposal explores integrated systems in lighting, acoustics, and ventilation to support a high-performance environment for lectures, seminars, and cultural events.\nThe design features tiered seating, a warm wood-clad stage, and geometric wall treatments that reflect the university’s identity. A combination of deep blue accents, ambient lighting, and accessible circulation pathways creates an inviting yet professional atmosphere—purpose-built for student engagement, academic presentation, and institutional gatherings.",
    images: [
      "https://source.unsplash.com/400x300/?modern,house,1",
      "https://source.unsplash.com/400x300/?modern,house,2",
      "https://source.unsplash.com/400x300/?modern,house,3",
      "https://source.unsplash.com/400x300/?modern,house,4"
    ]
  }
];

// Render project cards
const container = document.getElementById('projectsContainer');
projects.forEach((project) => {
  const card = document.createElement('div');
  card.className = "project-card bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer";
  card.setAttribute('data-title', project.title);
  card.setAttribute('data-description', project.description);
  card.setAttribute('data-images', project.images.join(';'));

  card.innerHTML = `
    <img src="${project.images[0]}" alt="${project.title}" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h4 class="text-xl font-semibold mb-2">${project.title}</h4>
      <p class="text-gray-600 text-sm">${project.caption}</p>
    </div>
  `;

  container.appendChild(card);
});

// Modal logic
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalImages = document.getElementById('modalImages');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('closeModal');

function showModal(card) {
  modalTitle.textContent = card.getAttribute('data-title');
  modalDescription.textContent = card.getAttribute('data-description');

  // Assign carousel images
  const images = card.getAttribute('data-images').split(';');
  setModalImages(images);

  document.body.classList.add('modal-open');
  modal.classList.remove('modal-hidden');
  modal.classList.add('modal-visible');
}

function hideModal() {
  document.body.classList.remove('modal-open');
  modal.classList.remove('modal-visible');
  modal.classList.add('modal-hidden');
}

function attachModalListeners() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => showModal(card));
  });
}

attachModalListeners();
closeModal.addEventListener('click', hideModal);
window.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });


// Carousel logic
let currentIndex = 0;

function setModalImages(images) {
  modalImages.innerHTML = '';
  modalImages.innerHTML = images.map(img => `<div class='min-w-full'><img src="${img}" class="w-full h-full object-cover"></div>`).join('');
  currentIndex = 0;
  updateCarousel();
}

function updateCarousel() {
  modalImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById('nextSlide').addEventListener('click', () => {
  const totalSlides = modalImages.children.length;
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  const totalSlides = modalImages.children.length;
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});
