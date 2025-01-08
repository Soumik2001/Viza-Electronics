# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

const container = document.querySelector(".container"),
  videoTimeline = container.querySelector(".video-timeline"),
  progressBar = container.querySelector(".progress-bar"),
  currentVidTime = container.querySelector(".current-time"),
  videoDuration = container.querySelector(".video-duration"),
  playPauseOverlay = container.querySelector(".play-pause-overlay"),
  playPauseBtn = container.querySelector(".play-pause"),
  toggleButton = container.querySelector(".toggle-button"), // Controls Play/Pause
  fullscreenBtn = container.querySelector(".fullscreen-icon1"), // Main fullscreen button
  fullscreenOverlayBtn = container.querySelector(".play-pause-overlay .fullscreen"),
  playPauseIcon = playPauseOverlay.querySelector(".play-pause-icon"),
  videoBtn = document.getElementById("videoButton"),
  volumeBars = container.querySelectorAll(".vol"),
controls = container.querySelector(".controls");

let player;


(function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '164.25',
    width: '292',
    "videoId": 'LXb3EKWsInQ', 
      playerVars: {
'autoplay': 1,
 'controls': 0, 
       'modestbranding': 1,
'autohide':1,
      'rel': 0,
      'fs': 0,
      'showinfo': 1,
      'disablekb': 1,
       
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}









function onPlayerReady(event) {

}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
toggleButton.src = "images/pausebutton.png";
    toggleButton.setAttribute("mode", "play");
playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.remove("show"); // Hide overlay when video plays
    overlayVisible = false;
  }else {

toggleButton.src = "images/playbutton.png";
    toggleButton.setAttribute("mode", "pause");
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; // Show play icon
    playPauseOverlay.classList.add("show"); 
    overlayVisible = true; 
}
}


playPauseBtn.addEventListener('click',togglePlayPause);

// Toggle Play/Pause functionality


function togglePlayPause() {
  const playerState = player.getPlayerState();
  if (playerState === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    toggleButton.src = "images/playbutton.png";
    toggleButton.setAttribute("mode", "pause");
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; // Show play icon
    playPauseOverlay.classList.add("show"); 
    overlayVisible = true; 
  } else {
    player.playVideo();
    toggleButton.src = "images/pausebutton.png";
    toggleButton.setAttribute("mode", "play");
playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.remove("show"); // Hide overlay when video plays
    overlayVisible = false;
  }
}





// Update the progress bar and display current time
function updateProgressBar() {
  if (player && player.getCurrentTime && player.getDuration) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    progressBar.style.width = ${(currentTime / duration) * 100}%;
    currentVidTime.textContent = formatTime(currentTime);
    videoDuration.textContent = formatTime(duration); // Show video duration
  }
}

// Format time in MM:SS

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return 0${mins}:${secs < 10 ? "0" : ""}${secs};
}



// Event listener for play/pause button
playPauseBtn.addEventListener('click', togglePlayPause);

// Periodically update progress bar while video is playing
setInterval(updateProgressBar, 500); // Update every 500ms for smooth progress bar update

// Handle clicking on the video timeline to seek to that point
videoTimeline.addEventListener("click", (e) => {
  const timelineWidth = videoTimeline.clientWidth;
  const offsetX = e.offsetX;
  player.seekTo((offsetX / timelineWidth) * player.getDuration());
});

// Draggable progress bar logic
const draggableProgressBar = (e) => {
  const timelineWidth = videoTimeline.clientWidth;
  const offsetX = Math.min(Math.max(e.offsetX, 0), timelineWidth); // Prevent going beyond the timeline
  progressBar.style.width = ${offsetX}px; // Update the width of progress bar as per mouse position
  player.seekTo((offsetX / timelineWidth) * player.getDuration());
  currentVidTime.textContent = formatTime(player.getCurrentTime()); // Update current time display
};

let isDragging = false;

// Enable dragging of the progress bar
videoTimeline.addEventListener("mousedown", () => {
  isDragging = true;
  // Add 'mousemove' listener to update the progress bar while dragging
  videoTimeline.addEventListener('mousemove', draggableProgressBar);
});

// Disable dragging once mouse is released
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    // Remove the 'mousemove' event listener after dragging ends
    videoTimeline.removeEventListener('mousemove', draggableProgressBar);
  }
});

// Show/hide overlay based on video play/pause state
let mouseTimeout;
let overlayVisible = false;

// Function to toggle play/pause
const togglePlayPauseOverlay = () => {
  const playerState = player.getPlayerState();
  if (playerState === YT.PlayerState.PLAYING) {
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.remove("show");
    overlayVisible = false;
  } else if (playerState === YT.PlayerState.PAUSED)  {
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;
  }
};

// Function to show the overlay with the correct icon

const showOverlay = () => {
  if (player.getPlayerState() === YT.PlayerState.PAUSED) {
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;
    clearTimeout(mouseTimeout);
  } else{
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.add("show");
    overlayVisible = false;

    // Hide the overlay after 1.8 seconds (when playing)
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
    }, 1800);
  }
};

// Event listener for mouse move to show overlay while video is paused or playing

playPauseOverlay.addEventListener("mousemove", () => {
  if (overlayVisible) return; 
  showOverlay();
});

// Event listener for the play/pause button
toggleButton.addEventListener('click', togglePlayPauseOverlay);






playPauseIcon.addEventListener("click", togglePlayPause);













// Fullscreen functionality for both overlay and main fullscreen button
const toggleFullscreen = () => {
  if (player && player.getIframe()) {
    const iframe = player.getIframe();
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome and Safari
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
      iframe.msRequestFullscreen();
    }
  }
};

// Event listener for fullscreen button inside the overlay
fullscreenOverlayBtn.addEventListener('click', toggleFullscreen);

// Event listener for main fullscreen button
fullscreenBtn.addEventListener('click', toggleFullscreen);





// Stop video functionality

const stopVideo = ()=>{

player.stopVideo();
toggleButton.src = "images/playbutton.png";
toggleButton.setAttribute("mode","pause");
playPauseOverlay.classList.add("show");
  playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; 
};


const stopButton = document.querySelector('.stop');

if(stopButton){
stopButton.addEventListener('click', stopVideo);
}
