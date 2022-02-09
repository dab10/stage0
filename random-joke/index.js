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

// SELF CHECK

console.log(`
(Sic!) Получение цитаты специально ограничено один раз в две секунды, т.к. сайт unsplash.com (избражение) позволяет делать не более 50 запросов в час.
После исчерпания лимита запросов будет отображаться логотип курса.
`)
console.log(`
1. Вёрстка +10
  - на странице есть цитата и кнопка для смены цитаты +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке страницы приложения отображается рандомная цитата +10
3. При перезагрузке страницы цитата обновляется (заменяется на другую) +10
4. Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
5. Смена цитаты сопровождается любым другим эффектом, например, изменяется изображение или меняется фоновый цвет страницы, или проигрывается звук и т.д * +10
6. Можно выбрать один из двух языков отображения цитат: en/ru или en/be ** +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`)