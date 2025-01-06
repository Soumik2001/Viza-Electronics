const container = document.querySelector(".container"),
  mainVideo = container.querySelector("video"),
  videoTimeline = container.querySelector(".video-timeline"),
  progressBar = container.querySelector(".progress-bar"),
  currentVidTime = container.querySelector(".current-time"),
  videoDuration = container.querySelector(".video-duration"),
  playPauseBtn = container.querySelector(".play-pause"), // Overlay Play/Pause
  speedBtn = container.querySelector(".playback-speed span"),
  toggleButton = container.querySelector(".toggle-button"), // Controls Play/Pause
  volumeBars = container.querySelectorAll(".vol"), // Volume controls
  playPauseOverlay = container.querySelector(".play-pause-overlay"),
  fullscreenBtn = container.querySelector(".fullscreen"), // Main fullscreen button
  fullscreenOverlayBtn = container.querySelector(".play-pause-overlay .fullscreen"),
  controls = container.querySelector(".controls"),
  videoSection = container.querySelector(".videoSection"),
  fullScreenIcon = document.querySelector(".fullscreen-icon1"),
fullScreenIcon2 = document.querySelector(".fullscreen-icon2");
const playPauseIcon = playPauseOverlay.querySelector(".play-pause-icon");
const videoBtn = document.getElementById("videoButton");
const progressArea = document.querySelector(".progress-area");
const options2 = document.querySelector(".options2");

// Format time as MM:SS 
const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutes}:${seconds}`;
};


const handleMetadataLoaded = () => {
  if (!isNaN(mainVideo.duration)) {
    videoDuration.textContent = formatTime(mainVideo.duration);
  } else {
    videoDuration.textContent = "00:00"; 
  }
};


if (mainVideo.readyState >= 1) {
  handleMetadataLoaded(); 
} else {
  mainVideo.addEventListener("loadedmetadata", handleMetadataLoaded);
}


mainVideo.addEventListener('timeupdate', () => {
  const percent = (mainVideo.currentTime / mainVideo.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentVidTime.textContent = formatTime(mainVideo.currentTime);
});


videoTimeline.addEventListener("click", (e) => {
  const timelineWidth = videoTimeline.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

// Draggable progress bar logic


const draggableProgressBar = (e) => {
  const timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  currentVidTime.textContent = formatTime(mainVideo.currentTime);
};

let isDragging = false;
videoTimeline.addEventListener("mousedown", () => {
  isDragging = true;
  videoTimeline.addEventListener('mousemove', draggableProgressBar);
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    videoTimeline.removeEventListener('mousemove', draggableProgressBar);
  }
});



// Play- pause button start here

let mouseTimeout;
let overlayVisible = false;


mainVideo.pause();
toggleButton.src = "images/playbutton.png"; 
toggleButton.setAttribute("mode", "pause");

// Function to toggle play/pause
const togglePlayPause = () => {
  const mode = toggleButton.getAttribute("mode");

  if (mode === "pause") {
    mainVideo.play();
    toggleButton.src = "images/pausebutton.png";
    toggleButton.setAttribute("mode", "play");
playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.remove("show"); // Hide overlay when video plays
    overlayVisible = false; // Reset overlay visibility when the video plays
  } else {
    mainVideo.pause();
    toggleButton.src = "images/playbutton.png";
    toggleButton.setAttribute("mode", "pause");
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; // Show play icon
    playPauseOverlay.classList.add("show"); 
    overlayVisible = true; 
  }
};
// Function to show the overlay with the correct icon
const showOverlay = () => {
  if (mainVideo.paused) {

    playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;
    mainVideo.style.cursor = "auto";
    clearTimeout(mouseTimeout);
  } else {
    // Show the pause icon when the video is playing
    playPauseOverlay.querySelector(".play-pause-icon").src = "images/pause.png";
    playPauseOverlay.classList.add("show");
    overlayVisible = true;

    // Hide the overlay after 1.8 seconds (when playing)
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      playPauseOverlay.classList.remove("show");
      overlayVisible = false;
      mainVideo.style.cursor = "none";
    }, 1800);
  }
};






mainVideo.addEventListener("mousemove", showOverlay);
mainVideo.addEventListener("touchmove",  showOverlay);



// Pause the video and update icons when clicking the play-pause overlay button
playPauseOverlay.addEventListener("click", (event) => {
  const isPauseButton = event.target.closest(".play-pause-toggle");

  if (isPauseButton) {
    togglePlayPause();
  }
});

// Pause the video and update icons when clicking the play-pause icon inside overlay

playPauseIcon.addEventListener("click", togglePlayPause);
playPauseIcon.addEventListener("mouseover", showOverlay);
playPauseIcon.addEventListener("mousemove", showOverlay);
// Toggle play/pause on video click


mainVideo.addEventListener("click", togglePlayPause);

// When end video


mainVideo.addEventListener("ended", () => {
  toggleButton.src = "images/playbutton.png"; // Play button will show at the end of the video
  toggleButton.setAttribute("mode", "pause"); 
  playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; 
  playPauseOverlay.classList.add("pause", "show"); 
  overlayVisible = true;
});









playPauseBtn.addEventListener('click', togglePlayPause);


mainVideo.addEventListener('play',()=>{

playPauseOverlay.classList.remove("pause");
playPauseOverlay.classList.remove("show");

});

mainVideo.addEventListener('pause',()=>{

playPauseOverlay.classList.add("pause");
playPauseOverlay.classList.add("show");

});


document.addEventListener("keydown",(e)=>{
if(e.keyCode === 32){
e.preventDefault();
togglePlayPause();
}

});


// Stop video functionality

const stopVideo = ()=>{
mainVideo.pause();
toggleButton.src = "images/playbutton.png";
mainVideo.currentTime = 0;
toggleButton.setAttribute("mode","pause");
playPauseOverlay.classList.add("show");
  playPauseOverlay.querySelector(".play-pause-icon").src = "images/play.png"; 
};


const stopButton = document.querySelector('.stop');

if(stopButton){
stopButton.addEventListener('click', stopVideo);
}



// Function to smoothly update the video volume


const updateVolume = (level) => {
  const targetVolume = level / volumeBars.length;
  const currentVolume = mainVideo.volume;

  if (currentVolume === targetVolume) return;

  let startTime = null;
  const duration = 500;

  // Smoothly transition volume
  const volumeTransition = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      mainVideo.volume = currentVolume + (targetVolume - currentVolume) * progress;
      requestAnimationFrame(volumeTransition);
    } else {
      mainVideo.volume = targetVolume;
    }
  };

  requestAnimationFrame(volumeTransition);

  // Update the visual representation of the volume bars
  volumeBars.forEach((bar, index) => {
    bar.style.backgroundColor = index < level ? '#21303c' : '#fff';
  });

  // Save the volume in localStorage

  localStorage.setItem('savedVolumeLevel', level);
};

// Event listener on volume bars

volumeBars.forEach((bar, index) => {
  bar.addEventListener('click', () => {
    updateVolume(index + 1); // Update volume based on clicked bar
  });
});



const savedVolumeLevel = localStorage.getItem('savedVolumeLevel');
if (savedVolumeLevel !== null) {
  const savedLevel = parseInt(savedVolumeLevel, 10);
  mainVideo.volume = savedLevel / volumeBars.length; // Set video volume
  volumeBars.forEach((bar, index) => {
    bar.style.backgroundColor = index < savedLevel ? '#21303c' : '#fff'; 
  });
} else {
  const defaultLevel = Math.floor(volumeBars.length / 2);
  updateVolume(defaultLevel); 
}




// Play/Pause Overlay
playPauseOverlay.classList.add("show");
playPauseOverlay.addEventListener('click', togglePlayPause);

let controlsTimeout;
let isFullscreen = false;  // Track fullscreen state
let isVideoPaused = true;  // Track the video play/pause state

// Function to hide controls
const hideControls = () => {
  if (isFullscreen && !isVideoPaused) {
    controls.classList.add("hide-controls");  // Add class to hide controls 
  }
};

// Function to show controls
const showControls = () => {
  clearTimeout(controlsTimeout);  // Clear any existing timeout
  controls.classList.remove("hide-controls");  // Remove class to show controls


  if (!isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800);
  }
};

// Toggle Fullscreen functionality

const toggleFullscreen = () => {
  isFullscreen = !isFullscreen;  // Toggle fullscreen state

  if (isFullscreen) {
    // Enter fullscreen
    container.requestFullscreen().then(() => {
      applyFullscreenStyles();
    }).catch(console.error);
  } else {
    // Exit fullscreen
    document.exitFullscreen().then(() => {
      resetStyles();
    }).catch(console.error);
  }
};

// Apply styles for fullscreen mode
const applyFullscreenStyles = () => {
  mainVideo.style.cssText = "width: 100vw; height: calc(100vh - 60px);";  // Adjust video size
  playPauseOverlay.style.cssText = "width: 100vw; height: calc(100vh - 51px);";
  controls.style.cssText = "width: 100vw; height: 39px; bottom: 0; justify-content: space-between;";
  videoSection.style.top = "22px";
 
progressArea.style.cssText = "width: 550px; ";
options2.style.cssText = "width: 550px;";


  fullScreenIcon.classList.replace("fa-expand", "fa-compress");
  fullScreenIcon2.classList.replace("fa-expand", "fa-compress");
  fullScreenIcon.title = "Exit full screen (f)";
  fullScreenIcon2.title = "Exit full screen (f)";

  showControls();  // Ensure controls are visible when fullscreen
  if (!isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800);  // Hide controls after 1800ms in fullscreen
  }
};

// Reset styles after exiting fullscreen
const resetStyles = () => {
  mainVideo.style.cssText = "width: 100%; height: 100%;";  // Reset video size
  playPauseOverlay.style.cssText = "width: 100%; height: 164.25px; top: 13px;";
  controls.style.cssText = "width: 100%; height: 39px; bottom: 13px;";
  videoSection.style.top = "13px";
 progressArea.style.width = "59px"; 
options2.style.width="62px";
  fullScreenIcon.classList.replace("fa-compress", "fa-expand");
  fullScreenIcon2.classList.replace("fa-compress", "fa-expand");
  fullScreenIcon.title = "Full screen (f)";
  fullScreenIcon2.title = "Full screen (f)";
  showControls();  // Show controls when exiting fullscreen
videoBtn.focus();
};

// Prevent play/pause when clicking fullscreen buttons
fullscreenBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Stop event propagation to prevent triggering play/pause
  toggleFullscreen();
});

fullscreenOverlayBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Stop event propagation to prevent triggering play/pause
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
    isFullscreen = false;  // Reset fullscreen state
    resetStyles();
  }
});

// Double-click to toggle fullscreen
mainVideo.addEventListener("dblclick", toggleFullscreen);

// Show controls when the user interacts with the video container
container.addEventListener("mousemove", showControls);

// Prevent controls from hiding when cursor is over the controls
controls.addEventListener("mouseenter", () => {
  clearTimeout(controlsTimeout);  // Stop the hide timeout when mouse enters the controls
  showControls();  // Ensure controls are visible
});

controls.addEventListener("mouseleave", () => {
  // Restart the hide timeout only if fullscreen and video is playing
  if (isFullscreen && !isVideoPaused) {
    controlsTimeout = setTimeout(hideControls, 1800);  
  }
});

// Video play/pause events to control the visibility of controls
mainVideo.addEventListener("play", () => {
  isVideoPaused = false;  // Video is playing
  showControls();  // Ensure controls are visible when the video is playing
});

mainVideo.addEventListener("pause", () => {
  isVideoPaused = true;  // Video is paused
  showControls();  // Keep controls visible when the video is paused
});

// Initial timeout to hide controls in fullscreen
controlsTimeout = setTimeout(hideControls, 1800);








