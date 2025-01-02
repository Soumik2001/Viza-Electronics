# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

const toggleFullscreen = () => {
  const isFullscreen = document.fullscreenElement;

  if (!isFullscreen) {
    // Enter fullscreen
    container.requestFullscreen().then(() => {
      mainVideo.style.cssText = "width: 100vw; height: calc(100vh - 60px);";
      playPauseOverlay.style.cssText = "width: 100vw; height: 93vh;";
      controls.style.cssText = "width: 100vw; height: 39px; bottom: 0;";
      videoSection.style.top = "22px";
      fullScreenIcon.classList.replace("fa-expand", "fa-compress");
      fullScreenIcon.title = "Exit full screen (f)";
    }).catch(console.error);
  } else {
    // Exit fullscreen
    document.exitFullscreen().then(() => {
      mainVideo.style.cssText = "width: 100%; height: 100%;";
      playPauseOverlay.style.cssText = "width: 100%; height: 164.25px; top: 13px;";
      controls.style.cssText = "width: 100%; height: 39px; bottom: 13px;";
      videoSection.style.top = "13px";
      fullScreenIcon.classList.replace("fa-compress", "fa-expand");
      fullScreenIcon.title = "Full screen (f)";
    }).catch(console.error);
  }
};

// Event listeners
fullscreenBtn.addEventListener("click", toggleFullscreen);
fullscreenOverlayBtn.addEventListener("click", toggleFullscreen);
fullscreenOverlayBtn.addEventListener("click", togglePlayPause);

document.addEventListener("keydown", (e) => {
  if (["f", "F", "Escape"].includes(e.key)) toggleFullscreen();
});

mainVideo.addEventListener("dblclick", toggleFullscreen);
