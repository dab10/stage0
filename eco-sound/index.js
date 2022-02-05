// ISPLAY?

let isPlay = false;

// CHANGE IMAGE, SOUND

const changeImageForest = document.querySelector('.container-header')  

function changeImage(event) {
  if(event.target.classList.contains('container-header-item-bird') || event.target.classList.contains('container-header-logo')) {
    const image = document.querySelectorAll('.container-main-image');
    const imageAudioBird = event.target.dataset.bird;
    image.forEach((img) => img.src = `./assets/img/${imageAudioBird}.jpg`);
    const audio = document.querySelector('audio');
    audio.src = `./assets/audio/${imageAudioBird}.mp3`
  }
  isPlay = false;
}

changeImageForest.addEventListener('click', changeImage);
changeImageForest.addEventListener('click', playAudio);

// CHANGE COLOR ELEM

function changeClassActive (event) {
    if(event.target.classList.contains('container-header-item-bird') || event.target.classList.contains('container-header-logo')) {
      const birdActive = document.querySelectorAll('.container-header-item-bird')
      birdActive.forEach((el) => el.classList.remove('active'));
      const birdActiveLogo = document.querySelector('.container-header-logo')
      birdActiveLogo.classList.remove('active');
      event.target.classList.add('active');
    }
  }
  
changeImageForest.addEventListener('click', changeClassActive)

// BUTTON PLAY/PAUSE



const button = document.querySelector('.container-main-play');

function toggleBtn() {
  if (!isPlay) {
    button.classList.add('pause');
  } else {
    button.classList.remove('pause');
  }
}
button.addEventListener('click', toggleBtn);

// PLAY AUDIO

const audio = document.querySelector('audio');
const playBtn = document.querySelector('.container-main-play');

function playAudio() {
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
}

playBtn.addEventListener('click', playAudio);

