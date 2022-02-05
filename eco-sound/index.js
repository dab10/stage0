// ISPLAY

let isPlay = false;

// CHANGE IMAGE, SOUND

const changeImageForest = document.querySelector(".container-header");

function changeImage(event) {
  if (
    event.target.classList.contains("container-header-item-bird") ||
    event.target.classList.contains("container-header-logo")
  ) {
    const image = document.querySelectorAll(".container-main-image");
    const imageAudioBird = event.target.dataset.bird;
    image.forEach((img) => (img.src = `./assets/img/${imageAudioBird}.jpg`));
    const audio = document.querySelector("audio");
    audio.src = `./assets/audio/${imageAudioBird}.mp3`;
  }
  isPlay = false;
}

changeImageForest.addEventListener("click", changeImage);
changeImageForest.addEventListener("click", toggleBtn);
changeImageForest.addEventListener("click", playAudio);

// CHANGE COLOR ELEM

function changeClassActive(event) {
  if (
    event.target.classList.contains("container-header-item-bird") ||
    event.target.classList.contains("container-header-logo")
  ) {
    const birdActive = document.querySelectorAll(".container-header-item-bird");
    birdActive.forEach((el) => el.classList.remove("active"));
    const birdActiveLogo = document.querySelector(".container-header-logo");
    birdActiveLogo.classList.remove("active");
    event.target.classList.add("active");
  }
}

changeImageForest.addEventListener("click", changeClassActive);

// BUTTON PLAY/PAUSE

const button = document.querySelector(".container-main-play");

function toggleBtn() {
  if (!isPlay) {
    button.classList.add("pause");
  } else {
    button.classList.remove("pause");
  }
}
button.addEventListener("click", toggleBtn);

// PLAY AUDIO

const audio = document.querySelector("audio");
const playBtn = document.querySelector(".container-main-play");

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

playBtn.addEventListener("click", playAudio);

// VOLUME CHANGE COLOUR

const progress = document.querySelector(".container-main-volume");

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, white 100%)`;
});

// CHANGE VOLUME

const volumeBtn = document.querySelector(".container-main-volume");

function updateVol() {
  var volume = this.value;
  audio.volume = volume / 100;
}

volumeBtn.addEventListener("click", updateVol);

// CONSOLE.LOG

console.log(`
1. Вёрстка +10
  - есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать. Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по интерактивным элементам меняется изображение +10
3. При кликах по интерактивным элементам меняется звук +10
4. Активный в данный момент интерактивный элемент выделяется стилем +10
5. Кнопка Play/Pause +20
  - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука +10
  - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук +10
6. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
Итого 85
`)
