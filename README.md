# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/


const stopVideo = () => {
  player.stopVideo(); // Stop the video
  toggleButton.src = "images/playbutton.png"; // Update play/pause button to play
  toggleButton.setAttribute("mode", "pause");
  playPauseOverlay.classList.add("show");
  playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; // Show play icon
  
  // Reset progress bar to the start
  progressBar.style.width = "0%";
  
  // Reset current time display
  currentVidTime.textContent = formatTime(0); // Set time to 0:00
  
  // Update video duration display if needed
  videoDuration.textContent = formatTime(player.getDuration());
};

const stopButton = document.querySelector('.stop');

if (stopButton) {
  stopButton.addEventListener('click', stopVideo);
}


let isDragging = false;
let wasPlaying = false; // To track whether the video was playing before dragging started

// Format time in MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `0${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

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
  progressBar.style.width = `${(offsetX / timelineWidth) * 100}%`; // Update the width of progress bar as a percentage
  player.seekTo((offsetX / timelineWidth) * player.getDuration());
  currentVidTime.textContent = formatTime(player.getCurrentTime()); // Update current time display
};

// Enable dragging of the progress bar
videoTimeline.addEventListener("mousedown", () => {
  isDragging = true;
  wasPlaying = player.getPlayerState() === 1; // Check if the video is playing (1 is the playing state for YouTube API)
  player.pauseVideo(); // Pause video while dragging
  videoTimeline.addEventListener("mousemove", draggableProgressBar);
});

// Disable dragging once the mouse is released
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    videoTimeline.removeEventListener("mousemove", draggableProgressBar);
    if (wasPlaying) {
      player.playVideo(); // Resume playback if the video was playing before dragging
    }
  }
});


// Initialize YouTube player
let player;
const volumeBars = document.querySelectorAll('.volume-bar'); // Assuming volume bars are elements you have
const mainVideo = document.getElementById('player'); // Assuming your YouTube player has the id 'player'

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  // Set the volume to the saved level on player load
  const savedVolumeLevel = localStorage.getItem('savedVolumeLevel');
  if (savedVolumeLevel !== null) {
    const savedLevel = parseInt(savedVolumeLevel, 10);
    player.setVolume(savedLevel); // Set the volume using YouTube API
    updateVolumeBars(savedLevel);
  } else {
    const defaultLevel = Math.floor(volumeBars.length / 2); // Default to 50% volume
    updateVolumeBars(defaultLevel);
    player.setVolume(defaultLevel); // Set the volume using YouTube API
  }
}

// Function to smoothly update the volume
const updateVolume = (level) => {
  const targetVolume = level * 10; // YouTube volume range is 0 to 100
  const currentVolume = player.getVolume();

  if (currentVolume === targetVolume) return;

  let startTime = null;
  const duration = 500; // Duration for smooth transition

  // Smoothly transition volume
  const volumeTransition = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      const newVolume = currentVolume + (targetVolume - currentVolume) * progress;
      player.setVolume(newVolume);
      requestAnimationFrame(volumeTransition);
    } else {
      player.setVolume(targetVolume);
    }
  };

  requestAnimationFrame(volumeTransition);

  // Update the visual representation of the volume bars
  updateVolumeBars(level);

  // Save the volume in localStorage
  localStorage.setItem('savedVolumeLevel', level);
};

// Update volume bars based on the level
const updateVolumeBars = (level) => {
  volumeBars.forEach((bar, index) => {
    bar.style.backgroundColor = index < level ? '#21303c' : '#fff'; // Active vs inactive bar colors
  });
};

// Event listener on volume bars
volumeBars.forEach((bar, index) => {
  bar.addEventListener('click', () => {
    const volumeLevel = index + 1; // Update volume based on clicked bar (1-indexed)
    updateVolume(volumeLevel);
  });
});




