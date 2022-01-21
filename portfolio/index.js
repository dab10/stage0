console.log('Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22');


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
