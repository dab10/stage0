// GET DATA (QUOTE, AUTHOR)

//let language = 'en'   // FOR LOCAL STORAGE

const url = "https://type.fit/api/quotes";

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}


async function getQuotes() {
    const quotes = "quotes.json";
    const res = await fetch(quotes);
    const data = await res.json();
    showData(data);
  }


    getData();

    getQuotes();



// SHOW DATA

function showData(data) {
  let i = randomInteger(0, data.length - 1);
  elem1.textContent = data[i].text;
  elem2.textContent = data[i].author;
}

// RANDOM INTEGER

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// GET IMAGE xqNFp0Fu0t4VyJATPOulLMm6mwAXElMsNmBgv71m06c YuvgmQ1FcPl6zm_qLEwC4yuzrijLZs3U4DfVSaPTsQQ

const urlImage =
  "https://api.unsplash.com/photos/random?query=philosophy&;orientation=landscape&;client_id=xqNFp0Fu0t4VyJATPOulLMm6mwAXElMsNmBgv71m06c";

async function getImage() {
  const resImage = await fetch(urlImage);
  const image = await resImage.json();
  showImage(image);
}
getImage();

// SHOW IMAGE

function showImage(image) {
  document.getElementById("randomImage").src = image.urls.regular;
}

// BUTTON FOR CHANGE DATA, IMAGE 

const quoteBtn = document.querySelector('.main-container-button');

function disableNextButton() {
    while (document.getElementById("randomImage").complete === false) {
        quoteBtn.setAttribute('disabled', 'disabled');
    }
}
// function makeMoney()
// {
//     quoteBtn.setAttribute('disabled', 'disabled');
//     setTimeout(
//         function()
//         {
//             quoteBtn.removeAttribute('disabled');
//         }
//         , 500)
    
// }


quoteBtn.addEventListener('click', getData);
quoteBtn.addEventListener('click', getImage);
quoteBtn.addEventListener('click', disableNextButton);

// EXPORT translate.js

import i18Obj from './translate.js';

// TRANSLATE EN/RU

const langRu = document.querySelector('.switch-ru')
const langEn = document.querySelector('.switch-eng')

let language = 'en'   // FOR LOCAL STORAGE

function getTranslate(lang) {
  const words =  document.querySelectorAll('[data-i18]');
  words.forEach((el) => {
    el.textContent = i18Obj[lang][el.dataset.i18];
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

// SAVE IN LOCAL STORAGE

function setLocalStorage() {
    localStorage.setItem('language', language);
  }

  window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    const language = localStorage.getItem('language');
    getTranslate(language);
      if (language === 'ru') {
       const activeLang = document.querySelector('.switch-ru')
       const nonActiveLang = document.querySelector('.switch-eng')
       nonActiveLang.classList.remove('active-lang');
       activeLang.classList.add('active-lang');
     }
  
}

window.addEventListener('load', getLocalStorage)




