const helpToggle = document.querySelector('.help-toggle');
const helpModal = document.querySelector('.help');

helpToggle.addEventListener('click', (event) => {
  const toggleCharacter = helpModal.classList.contains('active') ? '?' : 'x';
  helpToggle.innerHTML = toggleCharacter;
  helpModal.classList.toggle('active');
});
