// Подключение функционала "Чертоги Фрилансера"
import { isMobile, bodyLockToggle, removeClasses, _slideToggle } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  // Показываем большое выпадающее меню
  if (targetElement.closest('.menu__button')) {
    targetElement.closest('.menu__item').classList.toggle('_active');
    bodyLockToggle();
  }

  // Показываем выпадающее меню при клике на стрелку
  if (targetElement.closest('.language__current')) {
    removeClasses(document.querySelectorAll('.language._hover'), "_hover");
    targetElement.closest('.language').classList.add('_hover');
  }
  if (!targetElement.closest('.language') && document.querySelectorAll('.language._hover').length > 0) {
    removeClasses(document.querySelectorAll('.language._hover'), "_hover");
  }

  if (window.innerWidth > 767.98) {
    if (targetElement.closest('.menu__arrow_main')) {
      removeClasses(document.querySelectorAll('.menu__item_has-children._hover'), "_hover");
      targetElement.closest('.menu__item_has-children').classList.add('_hover');
    }
    if (!targetElement.closest('.menu__item_has-children') && document.querySelectorAll('.menu__item_has-children._hover').length > 0) {
      removeClasses(document.querySelectorAll('.menu__item_has-children._hover'), "_hover");
    }
    if (targetElement.closest('.menu__arrow_sub')) {
      removeClasses(document.querySelectorAll('.menu__subitem_has-children._hover'), "_hover");
      targetElement.closest('.menu__subitem_has-children').classList.add('_hover');
    }
    if (!targetElement.closest('.menu__subitem_has-children') && document.querySelectorAll('.menu__subitem_has-children._hover').length > 0) {
      removeClasses(document.querySelectorAll('.menu__subitem_has-children._hover'), "_hover");
    }
  }

  // if (window.innerWidth < 767.98) {
  //   if (targetElement.closest('.menu__arrow_main')) {
  //     const arrowParent = targetElement.closest('.menu__item_has-children');
  //     const list = arrowParent.querySelector('ul');
  //     _slideToggle(list);
  //     arrowParent.classList.toggle('_hover');
  //   }
  // }
})

const headerCatalogMenu = document.querySelector('.menu-var1__items');
if (headerCatalogMenu) {
  const elements = Array.from(headerCatalogMenu.children);

  elements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      element.classList.add('_active');
      elements.filter(item => item !== element).forEach(item => item.classList.remove('_active'));
    });
  });
}

// Определяем расстояние от низа header-bottom до верха экрана при скролле:
function updateDistanceСatalogToTop() {
  var headerBottom = document.querySelector('.header-bottom');
  if (headerBottom) {
    var distanceFromBottomToTop = headerBottom.getBoundingClientRect().top + headerBottom.offsetHeight;
    document.body.style.setProperty('--distance-catalog-to-top', distanceFromBottomToTop + 'px');
  }
}

window.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    updateDistanceСatalogToTop();
  }, 500);
});
window.addEventListener('scroll', function () {
  updateDistanceСatalogToTop();
});