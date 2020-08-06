// TOGGLE HELP MODAL
const helpToggle = document.querySelector('.help-toggle');
const helpModal = document.querySelector('.help');
const arrowBack = document.querySelector('.arrow-back');

helpToggle.addEventListener('click', (event) => {
  // adjusts toggle character based on active status
  const toggleCharacter = helpModal.classList.contains('active') ? '?' : 'x';
  helpToggle.innerHTML = toggleCharacter;

  helpModal.classList.toggle('active');
});
