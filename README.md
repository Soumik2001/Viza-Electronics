# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/


playPauseOverlay.classList.add("thumbnail-background").style.cssText = " 
position: absolute;
  top: 0px;
  left: 0;
transform:translate(-0%,-0%);
  width: 292px;
  height: 164.25px;
display:flex;
  align-items: center;
  justify-content: center;
border-radius:0%;";




let mouseTimeout;
let overlayVisible = false;

// Show overlay on mouse movement
const showOverlay = (e) => {
  e.stopPropagation();

  if (overlayVisible) return;

  if (player.getPlayerState() === YT.PlayerState.PAUSED) {
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    playPauseOverlay.style.cursor = "auto";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;

    // Hide overlay after timeout if video is playing
    clearTimeout(mouseTimeout);
  } else if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.style.cursor = "all-scroll";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;
    clearTimeout(mouseTimeout);

    mouseTimeout = setTimeout(() => {
      // Only hide overlay if the mouse leaves the container (not the overlay)
      playPauseOverlay.style.cursor = "none";
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
    }, 1800);
  }
};

// Prevent overlay from disappearing when the mouse enters the overlay itself
playPauseOverlay.addEventListener("mouseover", (e) => {
  e.stopPropagation();
  clearTimeout(mouseTimeout);
  playPauseOverlay.classList.add("show");
  overlayVisible = true;
  playPauseOverlay.style.cursor = player.getPlayerState() === YT.PlayerState.PLAYING ? "all-scroll" : "auto";
});

// Event listeners
youtubeContainer.addEventListener("mousemove", showOverlay);
playPauseOverlay.addEventListener("mouseleave", () => {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    mouseTimeout = setTimeout(() => {
      playPauseOverlay.style.cursor = "none";
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
    }, 1800);
  }
});
