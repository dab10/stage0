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


function changeClassActive (event) {
  if(event.target.classList.contains('button-portfolio-black')) {
    const portfolioBtnsWithActive = document.querySelectorAll('.button-portfolio-black')
    portfolioBtnsWithActive.forEach((el) => el.classList.remove('active'));
    event.target.classList.add('active');
  }
}
portfolioBtns.addEventListener('click', changeClassActive)

// EXPORT translate.js

import i18Obj from './translate.js';

// TRANSLATE EN/RU

const langRu = document.querySelector('.switch-ru')
const langEn = document.querySelector('.switch-eng')

function getTranslate(lang) {
  const words =  document.querySelectorAll('[data-i18]');
  words.forEach((el) => {
    if (el.placeholder === true) {
      el.placeholder = i18Obj[lang][el.dataset.i18];
    } else {
      el.textContent = i18Obj[lang][el.dataset.i18];
    }
  });
}

langRu.addEventListener('click', () => {getTranslate('ru')})
langEn.addEventListener('click', () => {getTranslate('en')})


const langBtns = document.querySelector('.en-ru')

function changeLangClassActive (event) {
  if(event.target.classList.contains('switch-ru') || event.target.classList.contains('switch-eng')) {
    const langRuBtnsWithActive = document.querySelector('.switch-ru')
    langRuBtnsWithActive.classList.remove('active-lang')
    const langEnBtnsWithActive = document.querySelector('.switch-eng')
    langEnBtnsWithActive.classList.remove('active-lang')
    event.target.classList.add('active-lang');
  }
}

langBtns.addEventListener('click', changeLangClassActive)

// CHANGE THEME

const arrClass = [
  '.container-skills-portfolio-video-price',
  '.container-skills-section-title-textTitle', 
  '.wrapper-skills',
  '.container-skills-section-items-header',
  '.container-skills-section-items-text',
  '.container-portfolio-section-title-textTitle',
  '.wrapper-portfolio-left',
  '.wrapper-portfolio-right',
  '.button-portfolio-black',
  '.button-portfolio-black:hover',
  '.button-portfolio-black.active',
  '.container-video-section-title-textTitle',
  '.wrapper-video-left',
  '.wrapper-video-right-right',
  '.wrapper-video-right',
  '.container-price-section-title-textTitle',
  '.wrapper-price',
  '.container-price-section-items-header',
  '.container-price-section-items-text',
  '.nav',
  '.nav-link',
  
]




function changeColours (arr) {
const colors = document.querySelectorAll(arr)
colors.forEach((el) => el.classList.add('light-theme'));
}


changeColours(arrClass)




// .container-skills-section-title-textTitle.light-theme {
//   color: #000000;
// }

// .container-skills-portfolio-video-price.light-theme {
//   background-color: #ffffff;
// }