// Подключение функционала "Чертоги Фрилансера"
import { isMobile, bodyLockToggle, removeClasses, _slideToggle, _slideUp } from "./functions.js";
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

  if (targetElement.closest('.menu-var1__item>a')) {
    e.preventDefault();
    const parent = targetElement.closest('.menu-var1__item');

    if (window.innerWidth > 767.98) {
      removeClasses(document.querySelectorAll('.menu-var1__item._active'), "_active");
      parent.classList.add('_active');
    } else {
      parent.classList.toggle('_active');
      const parentBody = parent.querySelector('.menu-var1__body');
      _slideToggle(parentBody);
    }
  }

  if (targetElement.closest('.menu__back') && window.innerWidth < 767.98) {
    targetElement.closest('.menu__item').classList.remove('_active');
  }

  if (targetElement.closest('.menu__arrow_main') && window.innerWidth < 767.98) {
    targetElement.closest('.menu__item').classList.add('_active');
  }
  if (targetElement.closest('.menu__arrow_sub') && window.innerWidth < 767.98) {
    const parent = targetElement.closest('.menu__subitem_has-children');
    parent.classList.toggle('_active');
    const sublist = parent.querySelector('.menu__sublist');
    _slideToggle(sublist);

  }
})

const menuSublist = document.querySelectorAll('.menu__subitem_has-children .menu__sublist');
if (menuSublist.length > 0 && window.innerWidth < 767.98) {
  menuSublist.forEach(sublist => {
    _slideUp(sublist);
  });
}
const headerCatalogMenu = document.querySelector('.menu-var1__items');
if (headerCatalogMenu) {
  const elements = Array.from(headerCatalogMenu.children);

  elements.forEach(element => {
    const elementBody = element.querySelector('.menu-var1__body');

    if (window.innerWidth < 767.98) {
      element.classList.remove('_active');
      _slideUp(elementBody);
    }
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