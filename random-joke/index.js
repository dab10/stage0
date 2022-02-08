// GET IMAGE

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

// BUTTON FOR CHANGE DATA, IMAGE, DELAY BETWEEN REQUESTS

const quoteBtn = document.querySelector(".main-container-button");

function disableButton() {
  let timeLeft = 1;
  quoteBtn.setAttribute("disabled", "disabled");
  document.getElementById("countdown").textContent = "(2)";
  var timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("countdown").textContent = "";
      quoteBtn.removeAttribute("disabled");
    } else {
      document.getElementById("countdown").textContent = `(${timeLeft})`;
    }
    timeLeft -= 1;
  }, 1000);
}

quoteBtn.addEventListener("click", disableButton);
quoteBtn.addEventListener("click", getData);
quoteBtn.addEventListener("click", getImage);

// EXPORT translate.js

import i18Obj from "./translate.js";

// TRANSLATE EN/RU

const langRu = document.querySelector(".switch-ru");
const langEn = document.querySelector(".switch-eng");

let language = "en"; // FOR LOCAL STORAGE

function getTranslate(lang) {
  const words = document.querySelectorAll("[data-i18]");
  words.forEach((el) => {
    el.innerHTML = i18Obj[lang][el.dataset.i18];
  });
  language = lang; // FOR LOCAL STORAGE
  return language; // FOR LOCAL STORAGE
}

langRu.addEventListener("click", () => {
  getTranslate("ru");
});
langEn.addEventListener("click", () => {
  getTranslate("en");
});

const langBtns = document.querySelector(".en-ru");

function changeLangClassActive(event) {
  if (
    event.target.classList.contains("switch-ru") ||
    event.target.classList.contains("switch-eng")
  ) {
    const langRuBtnsWithActive = document.querySelector(".switch-ru");
    langRuBtnsWithActive.classList.remove("active-lang");
    const langEnBtnsWithActive = document.querySelector(".switch-eng");
    langEnBtnsWithActive.classList.remove("active-lang");
    event.target.classList.add("active-lang");
  }
}

langBtns.addEventListener("click", changeLangClassActive);
langBtns.addEventListener("click", getData);
langBtns.addEventListener("click", getImage);

// SAVE IN LOCAL STORAGE

function setLocalStorage() {
  localStorage.setItem("language", language);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  const language = localStorage.getItem("language");
  getTranslate(language);
  if (language === "ru") {
    const activeLang = document.querySelector(".switch-ru");
    const nonActiveLang = document.querySelector(".switch-eng");
    nonActiveLang.classList.remove("active-lang");
    activeLang.classList.add("active-lang");
  }
}

window.addEventListener("load", getLocalStorage);
window.addEventListener("load", getData);

// GET DATA (QUOTE, AUTHOR)

const url = "https://type.fit/api/quotes";

async function getData() {
  if (language === "en") {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
  } else if (language === "ru") {
    const quotes = "quotes.json";
    const res = await fetch(quotes);
    const data = await res.json();

    showData(data);
  }
}

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
