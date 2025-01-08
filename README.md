# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

let isFullscreen = false; // Track fullscreen state
let isVideoPaused = false; // Track video pause state
let controlsTimeout; // Timeout for hiding controls

// Toggle fullscreen functionality
const toggleFullscreen = () => {
  isFullscreen = !isFullscreen; // Toggle fullscreen state

  if (isFullscreen) {
    // Enter fullscreen
    container.requestFullscreen()
      .then(() => {
        applyFullscreenStyles();
      })
      .catch(console.error);
  } else {
    // Exit fullscreen
    document.exitFullscreen()
      .then(() => {
        resetStyles();
      })
      .catch(console.error);
  }
};

// Apply styles for fullscreen mode
const applyFullscreenStyles = () => {
  mainVideo.style.cssText = "width: 100vw; height: calc(100vh - 60px);"; // Adjust video size
  playPauseOverlay.style.cssText = "width: 100vw; height: calc(100vh - 51px);";
  controls.style.cssText = "width: 100vw; height: 39px; bottom: 0; justify-content: space-between;";
  videoSection.style.top = "22px";
  progressArea.style.cssText = "width: 550px;";
  options2.style.cssText = "width: 550px;";

  fullScreenIcon.classList.replace("fa-expand", "fa-compress");
  fullScreenIcon2.classList.replace("fa-expand", "fa-compress");
  fullScreenIcon.title = "Exit full screen (f)";
  fullScreenIcon2.title = "Exit full screen (f)";

  showControls(); // Ensure controls are visible when entering fullscreen
  if (!isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800); // Hide controls after 1800ms
  }
};

// Reset styles after exiting fullscreen
const resetStyles = () => {
  mainVideo.style.cssText = "width: 100%; height: 100%;"; // Reset video size
  playPauseOverlay.style.cssText = "width: 100%; height: 164.25px; top: 13px;";
  controls.style.cssText = "width: 100%; height: 39px; bottom: 13px;";
  videoSection.style.top = "13px";
  progressArea.style.width = "59px";
  options2.style.width = "62px";

  fullScreenIcon.classList.replace("fa-compress", "fa-expand");
  fullScreenIcon2.classList.replace("fa-compress", "fa-expand");
  fullScreenIcon.title = "Full screen (f)";
  fullScreenIcon2.title = "Full screen (f)";

  showControls(); // Show controls when exiting fullscreen
  videoBtn.focus();
};

// Prevent play/pause when clicking fullscreen buttons
fullscreenBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent triggering play/pause
  toggleFullscreen();
});

fullscreenOverlayBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent triggering play/pause
  toggleFullscreen();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (["f", "F"].includes(e.key)) {
    toggleFullscreen();
  }
});

// Handle fullscreen changes (including Escape key)
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    isFullscreen = false; // Reset fullscreen state
    resetStyles();
  }
});

// Double-click to toggle fullscreen
mainVideo.addEventListener("dblclick", toggleFullscreen);
