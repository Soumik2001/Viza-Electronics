# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

<div class="play-pause-overlay">
  <button class="play-pause-btn" aria-label="Play">
    <span class="icon"><img src="images/play.png" alt="Play Icon"></span>
  </button>
  <button class="pause-icon" aria-label="Pause">
    <img src="images/pause.png" alt="Pause Icon" />
  </button>
</div>


const playButton = document.querySelector(".play-pause-btn");
const pauseIcon = document.querySelector(".pause-icon");
const overlay = document.querySelector(".play-pause-overlay");

playButton.addEventListener("click", () => {
  playButton.style.display = "none"; // Hide the play button
  pauseIcon.style.display = "flex"; // Show the pause icon

  // Delay for 5ms before switching back to the play button
  setTimeout(() => {
    pauseIcon.style.display = "none"; // Hide the pause icon
    playButton.style.display = "flex"; // Show the play button
  }, 5);
});

pauseIcon.addEventListener("click", () => {
  pauseIcon.style.display = "none"; // Hide the pause icon
  playButton.style.display = "flex"; // Show the play button
});
