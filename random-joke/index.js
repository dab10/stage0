// GET DATA (QUOTE, AUTHOR)

const url = "https://type.fit/api/quotes";

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}
getData();

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

// GET IMAGE

const urlImage =
  "https://api.unsplash.com/photos/random?query=philosophy&orientation=landscape&client_id=YuvgmQ1FcPl6zm_qLEwC4yuzrijLZs3U4DfVSaPTsQQ";

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

const quoteBtn = document.querySelector(".main-container-button");

quoteBtn.addEventListener("click", getData);
quoteBtn.addEventListener("click", getImage);

//

async function getQuotes() {
  const quotes = "quotes.json";
  const res = await fetch(quotes);
  const data = await res.json();
  showData(data);
}
getQuotes();
