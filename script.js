document.addEventListener('DOMContentLoaded', () => {
  const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');
  const result = document.getElementById('result');
  const noResult = document.getElementById('noResult');
  const resultMessage = document.getElementById('resultMessage');
  const buttonsContainer = document.getElementById('buttons');
  const container = document.getElementById('container');
  const noMessage = document.getElementById('noMessage');

  function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - noButton.offsetWidth;
    const maxY = containerRect.height - noButton.offsetHeight;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    noButton.style.left = `${randX}px`;
    noButton.style.top = `${randY}px`;
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = '-20px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }

  let heartInterval;

  /**
   * Start floating hearts for a short duration.
   */
  function startHearts() {
    if (heartInterval) {
      clearInterval(heartInterval);
    }
    heartInterval = setInterval(createHeart, 200);
    setTimeout(() => {
      clearInterval(heartInterval);
    }, 10000);
  }

  /**
   * Handle a successful Yes click: hide buttons, show result, fire confetti and hearts.
   */
  function handleYesClick() {
    buttonsContainer.style.display = 'none';
    noResult.classList.add('hidden');
    result.classList.remove('hidden');
    resultMessage.textContent = 'You made the right choice 🌚 – love you, fiancée!';
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.4 } }), 500);
    }
    startHearts();
  }

  /**
   * Handle a rare scenario where the No button is clicked successfully.
   * Displays a playful message and keeps the Yes button visible.
   */
  function handleNoClick(event) {
    event.stopPropagation();
    noMessage.textContent = 'As how nau?';
    noResult.classList.remove('hidden');
  }

  let noHoverCount = 0;

  /**
   * Handler for when the user hovers over the "No" button. Each hover
   * increments a counter. The button dodges until the counter reaches
   * five, at which point we show the "As how nau?" message and hide the
   * button. This makes it virtually impossible to click, but after
   * multiple attempts the surprise message still appears.
   */
  function handleNoHover(event) {
    noHoverCount++;
    if (noHoverCount === 5) {
      noMessage.textContent = 'As how nau?';
      noResult.classList.remove('hidden');
    } else if (noHoverCount === 10) {
      noMessage.innerHTML = "Oya don't be angry, my baby. Will you please <em>be my valentine?</em>";
      noResult.classList.remove('hidden');
    }
    moveNoButton();
  }

  /**
   * Handler for mousedown on the No button. We keep this separate so
   * that any mouse press (even if not hovered) also causes the button
   * to move, but we don't count these toward the hover attempts. This
   * ensures the button feels slippery while still counting only real
   * hover interactions.
   */
  function handleNoMouseDown(event) {
    moveNoButton();
  }

  noButton.addEventListener('mouseover', handleNoHover);
  noButton.addEventListener('mousedown', handleNoMouseDown);
  noButton.addEventListener('click', handleNoClick);
  yesButton.addEventListener('click', handleYesClick);
});
