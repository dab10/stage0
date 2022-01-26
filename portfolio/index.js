console.log('Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22');

// MENU 768PX

$(document).ready(function(){
    $(".hamburger").click(function(){
      $(this).toggleClass("is-active");
    });
  });


  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const div = document.querySelector('.grey');
  const navLink = document.querySelector('.nav-list');

function toggleMenu() {
  // hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  div.classList.toggle('overplay');
}
hamburger.addEventListener('click', toggleMenu);

function closeMenu() {
  nav.classList.remove('open');
  div.classList.remove('overplay');
  hamburger.classList.remove('is-active');
}
navLink.addEventListener('click', closeMenu);


// CHANGE IMAGE SEASONS

const portfolioBtns = document.querySelector('.container-portfolio-section-buttons')  

function changeImage(event) {
  if(event.target.classList.contains('button-portfolio-black')) {
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    const seas = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${seas}/${index + 1}.jpg`);
  }
}

portfolioBtns.addEventListener('click', changeImage)

// CASHING IMAGE

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {
  seasons.forEach (function (item, i) {
    const img = new Image();
    img.src = `./assets/img/${item}/${i+1}.jpg`;
  });
  
}
preloadImages();

// CHANGE COLOR BUTTON


const portfolioBtnss = document.querySelectorAll('.button-portfolio-black');


function changeClassActive (event) {
  if(event.target.classList.contains('button-portfolio-black')) {
    
    portfolioBtnss.forEach(() => classList.remove('active')) 
    event.target.classList.add('active');
  }
}
portfolioBtns.addEventListener('click', changeClassActive)

// for(let i = 1; i <= 6; i++) {
//   const img = new Image();
//   img.src = `./assets/img/summer/${i}.jpg`; 
// }
