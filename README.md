# Viza-Electronics

Live: https://soumik2001.github.io/Viza-Electronics/

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

  // Save the updated volume in localStorage
  localStorage.setItem('savedVolumeLevel', level);
};

// Event listener for clicking on volume bars
volumeBars.forEach((bar, index) => {
  bar.addEventListener('click', () => {
    updateVolume(index + 1); // Update volume based on clicked bar
  });
});

// Retrieve saved volume level from localStorage or set default
const savedVolumeLevel = localStorage.getItem('savedVolumeLevel');
if (savedVolumeLevel !== null) {
  updateVolume(parseInt(savedVolumeLevel, 10));
} else {
  const defaultLevel = Math.floor(volumeBars.length / 2);
  updateVolume(defaultLevel);
  localStorage.setItem('savedVolumeLevel', defaultLevel); // Ensure it's saved
}
