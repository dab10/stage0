console.log('Смена изображений в секции portfolio +25\nПеревод страницы на два языка +25\nПереключение светлой и тёмной темы +25\nДополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\nДополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5\nИтого: 85');

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

let language = 'en'   // FOR LOCAL STORAGE

function getTranslate(lang) {
  const words =  document.querySelectorAll('[data-i18]');
  words.forEach((el) => {
    if (el.placeholder) {
      el.placeholder = i18Obj[lang][el.dataset.i18];
    } else {
      el.textContent = i18Obj[lang][el.dataset.i18];
    }
  });
  language = lang; // FOR LOCAL STORAGE
  return language; // FOR LOCAL STORAGE
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
  '.switch-sun-moon',
  '.hamburger',
  '.line',
]

const lightBtns = document.querySelector('.switch-sun-moon')

let theme = 'dark' // FOR LOCAL STORAGE

function changeColours (event) {
  if(event.target.classList.contains('switch-sun-moon')) {
    const colors = document.querySelectorAll(arrClass)
    colors.forEach((el) => el.classList.toggle('light-theme'));
  }
  
  if (nav.classList.contains('light-theme')) { // FOR LOCAL STORAGE
    return theme = 'light';                    // FOR LOCAL STORAGE
  } else {                                     // FOR LOCAL STORAGE
    return theme = 'dark';                    // FOR LOCAL STORAGE
  }                                           // FOR LOCAL STORAGE
} 

lightBtns.addEventListener('click', changeColours)

// SAVE IN LOCAL STORAGE

function setLocalStorage() {
  localStorage.setItem('language', language);
  localStorage.setItem('theme', theme);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('language')) {
    const language = localStorage.getItem('language');
    getTranslate(language);
      if (language === 'ru') {
       const activeLang = document.querySelector('.switch-ru')
       const nonActiveLang = document.querySelector('.switch-eng')
       nonActiveLang.classList.remove('active-lang');
       activeLang.classList.add('active-lang');
     }
  }
  if(localStorage.getItem('theme')) {
    const themeLocal = localStorage.getItem('theme');
    const colors = document.querySelectorAll(arrClass)
    if (themeLocal === 'light') {
      colors.forEach((el) => el.classList.add('light-theme'));
    } else {
      colors.forEach((el) => el.classList.remove('light-theme'));
    }
    return theme = themeLocal
  }
}

window.addEventListener('load', getLocalStorage)

