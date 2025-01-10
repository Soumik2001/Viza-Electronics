# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/



let mouseTimeout;
let overlayVisible = false;

// Force Repaint Helper
const forceRepaint = (element) => {
  element.style.display = "none";
  element.offsetHeight; // Trigger reflow
  element.style.display = "";
};

// Show overlay on mouse movement
const showOverlay = (e) => {
  e.stopPropagation();

  // Prevent overlay from re-triggering if already visible
  if (overlayVisible) return;

  if (player.getPlayerState() === YT.PlayerState.PAUSED) {
    clearTimeout(mouseTimeout);
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    forceRepaint(playPauseOverlay); // Force repaint
    playPauseOverlay.style.cursor = "default";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;
  } else if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    clearTimeout(mouseTimeout);
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    forceRepaint(playPauseOverlay); // Force repaint
    playPauseOverlay.style.cursor = "default";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;

    // Hide overlay and cursor after timeout
    mouseTimeout = setTimeout(() => {
      playPauseOverlay.style.cursor = "none";
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
    }, 1800);
  }
};

// Prevent overlay disappearance on `mousemove` inside the overlay
playPauseOverlay.addEventListener("mousemove", (e) => {
  e.stopPropagation(); // Stop event from bubbling
  clearTimeout(mouseTimeout); // Reset timeout
  playPauseOverlay.classList.add("show"); // Keep overlay visible
  forceRepaint(playPauseOverlay); // Ensure consistent rendering
  playPauseOverlay.style.cursor = "default";
  overlayVisible = true;
});

// Handle overlay disappearance on `mouseleave`
playPauseOverlay.addEventListener("mouseleave", () => {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    mouseTimeout = setTimeout(() => {
      forceRepaint(playPauseOverlay); // Ensure consistent rendering
      playPauseOverlay.style.cursor = "none"; // Hide the cursor
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
    }, 1800);
  }
});

// Attach `mousemove` listener on the container
youtubeContainer.addEventListener("mousemove", showOverlay);
