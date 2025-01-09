# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

// Handle player state change events
function onPlayerStateChange(event) {
  const playerState = event.data;

  if (playerState === YT.PlayerState.PLAYING) {
    // Video is playing
    updateOverlayState();
  } else if (playerState === YT.PlayerState.PAUSED) {
    // Video is paused
    updateOverlayState();
  } else if (playerState === YT.PlayerState.ENDED) {
    // Video has ended
    setThumbnailBackground(); // Show the thumbnail background
    playPauseOverlay.classList.add("show"); // Show the overlay
    toggleButton.src = "images/playbutton.png"; // Set play button
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    overlayVisible = true;
  }
}

.youtube-container {
  position: relative;
}

.youtube-container.hide-cursor {
  cursor: none; /* This class hides the cursor */
}


let mouseTimeout;

// Function to show overlay and hide cursor
const showOverlayAndHideCursor = () => {
  playPauseOverlay.classList.add("show"); // Show the overlay
  youtubeContainer.classList.add("hide-cursor"); // Add class to hide the cursor

  // Set a timeout to hide overlay and restore cursor
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      playPauseOverlay.classList.remove("show"); // Hide the overlay
      youtubeContainer.classList.remove("hide-cursor"); // Show the cursor
    }
  }, 1800);
};

// Add event listener to handle mouse movement
youtubeContainer.addEventListener("mousemove", () => {
  playPauseOverlay.classList.add("show"); // Show overlay on mouse move
  youtubeContainer.classList.add("hide-cursor"); // Hide the cursor
  clearTimeout(mouseTimeout);

  mouseTimeout = setTimeout(() => {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      playPauseOverlay.classList.remove("show"); // Hide overlay after 1800ms
      youtubeContainer.classList.remove("hide-cursor"); // Restore cursor visibility
    }
  }, 1800);
});

// Ensure the cursor is visible when leaving the container
youtubeContainer.addEventListener("mouseleave", () => {
  playPauseOverlay.classList.remove("show"); // Hide overlay
  youtubeContainer.classList.remove("hide-cursor"); // Show cursor
});

