console.log('1. Вёрстка валидная (10/10)\n  * для проверки валидности вёрстки используйте сервис https://validator.w3.org/\n  * валидной вёрстке соответствует надпись "Document checking completed. No errors or warnings to show." В таком случае баллы за пункт требований выставляем полностью.\n  * если есть предупреждения - warnings, но нет ошибок - errors, выставляем половину баллов за пункт требований');
console.log('2. Вёрстка семантическая (20/20)\n   В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):');
console.log('   * <header>, <main>, <footer> (2/2)\n   * шесть элементов <section> (по количеству секций) (2/2)\n   * только один заголовок <h1> (2/2)\n   * пять заголовков <h2> (количество секций минус одна, у которой заголовок <h1>) (2/2)');
console.log('   * один элемент <nav> (панель навигации) (2/2)\n   * два списка ul > li > a (панель навигации, ссылки на соцсети) (2/2)\n   * десять кнопок <button> (2/2)');
console.log('   * два инпута: <input type="email"> и <input type="tel"> (2/2)\n   * один элемент <textarea> (2/2)\n   * три атрибута placeholder (2/2)');
console.log('3. Вёрстка соответствует макету (48)\n   * блок <header> (6/6)\n   * секция hero (6/6)\n   * секция skills (6/6)\n   * секция portfolio (6/6)\n   * секция video (6/6)\n   * секция price (6/6)\n   * секция contacts (6/6)\n   * блок <footer> (6/6)');
console.log('4. Требования к css (12/12)\n   * для построения сетки используются флексы или гриды (2/2)\n   * при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону (2/2)');
console.log('   * фоновый цвет тянется на всю ширину страницы (2/2)\n   * иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления (2/2)');
console.log('   * изображения добавлены в формате .jpg (2/2)\n   * есть favicon (2/2)\n5. Интерактивность, реализуемая через css (20/20)\n   * плавная прокрутка по якорям (5/5)');
console.log('   * ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ (5/5)');
console.log('   * интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5');
console.log('   * обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы (5/5)');

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
