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