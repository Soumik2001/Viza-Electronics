# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/


// Fullscreen functionality
let isFullscreen = false;
let isVideoPaused = true;
let controlsTimeout;

// Function to hide controls after 1800ms if video is playing
const hideControls = () => {
  if (isFullscreen && !isVideoPaused) {
    controls.classList.add("hide-controls"); // Add class to hide controls
  }
};

// Function to show controls and reset hide timeout
const showControls = () => {
  clearTimeout(controlsTimeout);
  controls.classList.remove("hide-controls"); // Remove class to show controls

  // Start the timeout to hide controls after 1800ms only if the video is playing
  if (isFullscreen && !isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800);
  }
};

// Handle play and pause events to toggle video state and controls visibility
const handlePlayPause = (state) => {
  isVideoPaused = state === "pause";
  showControls(); // Ensure controls are visible when video is paused or playing
};

// Show controls when mouse enters the container or controls
container.addEventListener("mousemove", showControls);

controls.addEventListener("mouseenter", () => {
  clearTimeout(controlsTimeout); // Clear timeout when mouse enters
  showControls(); // Keep controls visible
});

// Restart the hide timeout when mouse leaves container or controls
controls.addEventListener("mouseleave", () => {
  if (isFullscreen && !isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800); // Hide after 1800ms if video is playing
  }
});

container.addEventListener("mouseleave", () => {
  if (isFullscreen && !isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800); // Hide after 1800ms if video is playing
  }
});

// Video play/pause events to control the visibility of controls
youtubeContainer.addEventListener("play", () => handlePlayPause("play"));
youtubeContainer.addEventListener("pause", () => handlePlayPause("pause"));

// Manage fullscreen state and control styles
document.addEventListener("fullscreenchange", () => {
  isFullscreen = !!document.fullscreenElement;
  if (!isFullscreen) {
    controls.classList.remove("hide-controls"); // Ensure controls are visible when exiting fullscreen
    clearTimeout(controlsTimeout); // Stop the hide timeout
  }
});

// Initial timeout to hide controls in fullscreen mode
if (isFullscreen && !isVideoPaused) {
  controlsTimeout = setTimeout(hideControls, 1800);
}
