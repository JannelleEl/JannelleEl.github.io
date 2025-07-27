
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


// Modal Carousel logic
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
