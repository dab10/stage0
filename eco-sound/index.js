// CHANGE IMAGE

const changeImageForest = document.querySelector('.container-header')  

function changeImage(event) {
  if(event.target.classList.contains('container-header-item-bird') || event.target.classList.contains('container-header-logo')) {
    const image = document.querySelectorAll('.container-main-image');
    const imageBird = event.target.dataset.bird;
    image.forEach((img) => img.src = `./assets/img/${imageBird}.jpg`);
  }
}

changeImageForest.addEventListener('click', changeImage);