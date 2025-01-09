# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

// Function to toggle the thumbnail background
const setThumbnailBackground = () => {
  playPauseOverlay.classList.add("thumbnail-background");
};

const removeThumbnailBackground = () => {
  playPauseOverlay.classList.remove("thumbnail-background");
};


// Set initial background on page load
document.addEventListener("DOMContentLoaded", function(e){ 
e.preventDefault();
setThumbnailBackground();
});


// Function to update overlay and background based on player state
const updateOverlayState = () => {
  const playerState = player.getPlayerState();

  if (playerState === YT.PlayerState.PLAYING) {
    removeThumbnailBackground();
    playPauseOverlay.classList.remove("show");
    toggleButton.src = "images/pausebutton.png";
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    overlayVisible = false;
  } 
else {
    playPauseOverlay.classList.add("show");
    
    toggleButton.src = "images/playbutton.png";
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    overlayVisible = true;
  }
};

// Stop video functionality

const stopVideo = () => {
  player.stopVideo();
  progressBar.style.width = "0%";
  currentVidTime.textContent = formatTime(0);
  videoDuration.textContent = formatTime(player.getDuration());
  setThumbnailBackground();
  
};

// Toggle play/pause functionality


const togglePlayPause = () => {
  const playerState = player.getPlayerState();

  if (playerState === YT.PlayerState.PLAYING) {
    // Pause video and show overlay
    player.pauseVideo();
    toggleButton.src = "images/playbutton.png";
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    playPauseOverlay.classList.add("show");


    removeThumbnailBackground();
    overlayVisible = true;
  } 

else {
    // Play video and hide overlay
    player.playVideo();
    toggleButton.src = "images/pausebutton.png";
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.remove("show");


    removeThumbnailBackground();
    overlayVisible = false;
  }
};

// Handle player state change events
function onPlayerStateChange(event) {
  updateOverlayState();
}

// Show overlay on mouse movement
const showOverlay = () => {
  if (overlayVisible) return;

  playPauseOverlay.classList.add("show");
  overlayVisible = true;

  // Hide overlay after timeout if video is playing
  clearTimeout(mouseTimeout);
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    mouseTimeout = setTimeout(() => {
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
    }, 2500);
  }
};

// Event listeners
playPauseOverlay.addEventListener("mouseover", showOverlay);
toggleButton.addEventListener("click", togglePlayPause);
playPauseBtn.addEventListener("click", togglePlayPause);

