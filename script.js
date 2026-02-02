/* Interactive behaviour for the Valentine page */

document.addEventListener('DOMContentLoaded', () => {
  const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');
  const result = document.getElementById('result');
  const noResult = document.getElementById('noResult');
  const resultMessage = document.getElementById('resultMessage');
      const buttonsContainer = document.getElementById('buttons');
      const container = document.getElementById('container');
      // Paragraph element inside the noResult container for dynamic messages
      const noMessage = document.getElementById('noMessage');

  /**
   * Move the "No" button to a random position inside the container.
   */
  function moveNoButton() {
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - noButton.offsetWidth;
    const maxY = containerRect.height - noButton.offsetHeight;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    noButton.style.left = `${randX}px`;
    noButton.style.top = `${randY}px`;
  }

  /**
   * Create a floating heart element at a random horizontal position.
   */
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    // Random horizontal position across the viewport
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = '-20px';
    document.body.appendChild(heart);
    // Remove the heart after the animation ends (4s defined in CSS)
    setTimeout(() => heart.remove(), 4000);
  }

  let heartInterval;

  /**
   * Start floating hearts for a short duration.
   */
  function startHearts() {
    // Clear any existing interval to avoid stacking
    if (heartInterval) {
      clearInterval(heartInterval);
    }
    // Generate a new heart every 200ms
    heartInterval = setInterval(createHeart, 200);
    // Stop generating hearts after 10 seconds
    setTimeout(() => {
      clearInterval(heartInterval);
    }, 10000);
  }

  /**
   * Handle a successful Yes click: hide buttons, show result, fire confetti and hearts.
   */
  function handleYesClick() {
    // Hide the button container
    buttonsContainer.style.display = 'none';
    // Hide any previous noResult message
    noResult.classList.add('hidden');
    // Show result area
    result.classList.remove('hidden');
    // Personalise the message; referencing Orente as fiancée
    resultMessage.textContent = 'You made the right choice 🌚 – love you, fiancée!';
    // Trigger confetti using the canvas-confetti library if available
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Fire a smaller second burst shortly after for effect
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.4 } }), 500);
    }
    // Start hearts animation
    startHearts();
  }

  /**
   * Handle a rare scenario where the No button is clicked successfully.
   * Displays a playful message and keeps the Yes button visible.
   */
  function handleNoClick(event) {
    // Prevent the default move behaviour triggered on click
    event.stopPropagation();
    // Show the playful message when the No button is actually clicked.
    // We keep the No button visible so the joke persists.
    noMessage.textContent = 'As how nau?';
    noResult.classList.remove('hidden');
    // You may still click the yes button
  }

  // Counter to track how many times the user has hovered over the "No" button.
  // After five hover attempts, we'll reveal the playful message instead of just moving it.
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
    // On the fifth hover attempt, display the first playful message
    if (noHoverCount === 5) {
      noMessage.textContent = 'As how nau?';
      noResult.classList.remove('hidden');
    } else if (noHoverCount === 10) {
      // On the tenth hover, update to a more pleading message with italic text
      noMessage.innerHTML = "Oya don't be angry, my baby. Will you please <em>be my valentine?</em>";
      noResult.classList.remove('hidden');
    }
    // Always move the button away to dodge the cursor
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
    // Always move the button on mousedown to dodge the click
    moveNoButton();
  }

  // Move the No button on mouseover and track attempts
  noButton.addEventListener('mouseover', handleNoHover);
  // Also move on click attempt (before actual click handler) to make it elusive
  // We don't increment the hover count here.
  noButton.addEventListener('mousedown', handleNoMouseDown);
  // If the user somehow manages to click, show the "As how nau?" message
  noButton.addEventListener('click', handleNoClick);

  // On clicking Yes, run the celebration
  yesButton.addEventListener('click', handleYesClick);
});