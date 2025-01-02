const container=document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline= container.querySelector(".video-timeline"),
progressBar= container.querySelector(".progress-bar"),
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
playPauseBtn = container.querySelector(".play-pause"),
speedBtn= container.querySelector(".playback-speed span"),
toggleButton = container.querySelector(".toggle-button"),
volumeBars = document.querySelectorAll(".vol"),
playPauseOverlay = container.querySelector(".play-pause-overlay"),
fullscreenBtn = container.querySelector(".fullscreen"),
controls = container.querySelector(".controls"),
videoSection = container.querySelector(".videoSection");


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


toggleButton.setAttribute('mode','pause');

const togglePlayPause = ()=>{

const mode = toggleButton.getAttribute('mode');

if(mode=== "pause"){
mainVideo.play();
toggleButton.src = "images/pausebutton.png";
toggleButton.setAttribute("mode","play");
playPauseOverlay.classList.remove('pause');
playPauseOverlay.classList.remove('show');
}else{
mainVideo.pause();
toggleButton.src = "images/playbutton.png";
toggleButton.setAttribute("mode","pause");
playPauseOverlay.classList.remove('pause');
playPauseOverlay.classList.remove('show');
}
};

mainVideo.addEventListener('ended', () => {
  toggleButton.src = "images/playbutton.png"; 
  toggleButton.setAttribute("mode", "pause"); 
  playPauseOverlay.classList.add('pause'); 
  playPauseOverlay.classList.add('show'); 
});



playPauseBtn.addEventListener('click', togglePlayPause);


mainVideo.addEventListener('click', togglePlayPause);

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


const stopVideo = ()=>{
mainVideo.pause();
mainVideo.currentTime = 0;
toggleButton.src = "images/playbutton.png";
toggleButton.setAttribute("mode","pause");
playPauseOverlay.classList.add("pause");
playPauseOverlay.classList.add("show");

};

const stopButton = document.querySelector('.stop');

if(stopButton){
stopButton.addEventListener('click', stopVideo);
}

// Function to update the volume
const updateVolume = (level) => {
  // Update the visual representation of the volume bars
  volumeBars.forEach((bar, index) => {
    bar.style.backgroundColor = index < level ? '#21303c' : '#fff';
  });

  // Set the video volume and save the level in localStorage
  mainVideo.volume = level / volumeBars.length;
  localStorage.setItem('savedVolumeLevel', level); // Save the volume level
};

// Event listener for clicking on volume bars
volumeBars.forEach((bar, index) => {
  bar.addEventListener('click', () => {
    updateVolume(index + 1); // Update volume based on clicked bar
  });
});

// Retrieve saved volume level from localStorage or set default
const savedVolumeLevel = localStorage.getItem('savedVolumeLevel');
if (savedVolumeLevel) {
  updateVolume(parseInt(savedVolumeLevel, 10)); // Set saved volume
} else {
  updateVolume(Math.floor(volumeBars.length / 2)); // Default to mid-level
}

// Play/Pause Overlay
playPauseOverlay.classList.add("show");
playPauseOverlay.addEventListener('click', togglePlayPause);



// Toggle Full screen functionality

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen().then(() => {
      mainVideo.style.width = "100vw";
      mainVideo.style.height = "calc(100vh - 60px)";
      playPauseOverlay.style.width = "100vw";
      playPauseOverlay.style.height = "93vh";
      controls.style.width = "100vw";
controls.style.height = "39px";
controls.style.bottom = "0px";
videoSection.style.top = "22px";
    }).catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen().then(() => {
      mainVideo.style.width = "100%";
      mainVideo.style.height = "100%";
playPauseOverlay.style.width = "100%";
      playPauseOverlay.style.height = "164.25px";
playPauseOverlay.style.top = "13px";
controls.style.width = "100%";
controls.style.height = "39px";
controls.style.bottom = "13px";
videoSection.style.top = "13px";
    });
  }
};

// Add click event listener to the fullscreen button
fullscreenBtn.addEventListener("click", toggleFullscreen);

// Keyboard shortcut for fullscreen (F key)
document.addEventListener("keydown", (e) => {
  if (e.key === "f" || e.key === "F" || e.keyCode=== 27) {    
toggleFullscreen();
  }
});


mainVideo.addEventListener('dblclick', toggleFullscreen);



