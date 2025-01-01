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
playPauseOverlay = container.querySelector(".play-pause-overlay");





// Format time as MM:SS 

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutes}:${seconds}`;
};


mainVideo.addEventListener("loadedmetadata", () => {
  videoDuration.textContent = formatTime(mainVideo.duration);
});

mainVideo.addEventListener('timeupdate',()=>{
const percent = (mainVideo.currentTime / mainVideo.duration) *100;
progressBar.style.width = `${percent}%`;
currentVidTime.textContent = formatTime(mainVideo.currentTime);
});

videoTimeline.addEventListener("click", (e) => {
  const timelineWidth = videoTimeline.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});


const draggableProgressBar = (e)=>{
const timelineWidth = videoTimeline.clientWidth;
progressBar.style.width = `${e.offsetX}px`;
mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
currentVidTime.textContent = formatTime(mainVideo.currentTime);
}


let isDragging = false;
videoTimeline.addEventListener("mousedown", ()=>{

isDragging = true;
videoTimeline.addEventListener('mousemove', draggableProgressBar);

});


document.addEventListener('mouseup',()=>{
if(isDragging){
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


const updateVolume = (level)=>{
volumeBars.forEach((bar,index)=>{
bar.style.backgroundColor = index< level ? '#21303c' : '#fff';
});
mainVideo.volume = level / volumeBars.length;
};

volumeBars.forEach((bar,index)=>{
bar.addEventListener('click',()=>{
updateVolume(index+1);
});
});

updateVolume(Math.floor(volumeBars.length/2));

playPauseOverlay.classList.add("show");
playPauseOverlay.addEventListener('click', togglePlayPause);
