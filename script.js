/* Interactive behaviour for the Valentine page */

document.addEventListener('DOMContentLoaded', () => {
  const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');
  const result = document.getElementById('result');
  const buttonsContainer = document.getElementById('buttons');
  const container = document.getElementById('container');

  function moveNoButton() {
    // Compute available space within the container
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - noButton.offsetWidth;
    const maxY = containerRect.height - noButton.offsetHeight;
    // Generate random position within boundaries
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    // Update button position
    noButton.style.left = `${randX}px`;
    noButton.style.top = `${randY}px`;
  }

  // When hovering or attempting to click the 'No' button, move it
  noButton.addEventListener('mouseover', moveNoButton);
  noButton.addEventListener('click', moveNoButton);

  // When 'Yes' button is clicked, show the result section
  yesButton.addEventListener('click', () => {
    buttonsContainer.style.display = 'none';
    result.classList.remove('hidden');
  });
});