// Подключение функционала "Чертоги Фрилансера"
import { isMobile, bodyLockToggle, bodyLock, bodyUnlock, removeClasses, _slideToggle, _slideUp, _slideDown } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  // Показываем большое выпадающее меню
  if (targetElement.closest('.menu__button')) {
    targetElement.closest('.menu__item').classList.toggle('_active');
  }

  if (targetElement.closest('.search__btn')) {
    e.preventDefault();
    targetElement.closest('.header__search').classList.toggle('_active');
    bodyLock();
  }
  if (document.querySelector('.header__search').classList.contains('_active') && !targetElement.closest('.header__search')) {
    document.querySelector('.header__search').classList.remove('_active');
    bodyUnlock();
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

  if (targetElement.closest('.menu-var__item>a')) {
    e.preventDefault();
    const parent = targetElement.closest('.menu-var__item');

    if (window.innerWidth > 767.98) {
      removeClasses(document.querySelectorAll('.menu-var__item._active'), "_active");
      parent.classList.add('_active');
    } else {


      if (!parent.classList.contains('_active')) {
        const items = document.querySelectorAll('.menu-var__item');
        if (items.length > 0) {
          items.forEach(element => {
            if (element.classList.contains('_active')) {
              element.classList.remove('_active');
              const elementBody = element.querySelector('.menu-var__body');
              _slideUp(elementBody);
            }
          });
        }

        parent.classList.add('_active');
        const parentBody = parent.querySelector('.menu-var__body');
        _slideDown(parentBody);
      }
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

const menuButton = document.querySelector('.menu-var');
if (menuButton && window.innerWidth >= 768 && !isMobile.any()) {
  menuButton.addEventListener('mouseenter', function (e) {
    menuButton.classList.add('_active');
  })
  menuButton.addEventListener('mouseleave', function (e) {
    menuButton.classList.remove('_active');
  })
}

const menuSublist = document.querySelectorAll('.menu__subitem_has-children .menu__sublist');
if (menuSublist.length > 0 && window.innerWidth < 767.98) {
  menuSublist.forEach(sublist => {
    _slideUp(sublist);
  });
}
const headerCatalogMenu = document.querySelector('.menu-var__items');
if (headerCatalogMenu) {
  const elements = Array.from(headerCatalogMenu.children);

  elements.forEach(element => {
    const elementBody = element.querySelector('.menu-var__body');

    if (window.innerWidth < 767.98) {
      element.classList.remove('_active');
      _slideUp(elementBody);
    }
  });
}

// Добавляем тень для шапки
const headerBottom = document.querySelector('.header-bottom');
if (window.innerWidth >= 768 && headerBottom) {
  window.addEventListener('scroll', function () {
    if (window.scrollY == headerBottom.offsetTop) {
      headerBottom.classList.add('header_sticky');
    } else {
      headerBottom.classList.remove('header_sticky');
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

// Анимация появления контента при наведении на .events-card
function updateEvents(cards) {
  let cardLockStatus = true;
  cards.forEach(element => {
    var hide = element.querySelector('.events-card__hide');
    _slideUp(hide);

    element.addEventListener('mouseenter', function () {
      _slideDown(hide);
    })
    element.addEventListener('mouseleave', function () {
      _slideUp(hide);
    })
  });
}

// Фильтрация
const filters = document.querySelectorAll('.level-filter__input');
const items = document.querySelectorAll('.program-item');

if (filters.length > 0) {
  filters.forEach(element => {
    element.addEventListener('change', function () {
      const parent = element.closest('.level-filter');
      let parentCategory = parent.dataset.category;

      if (parentCategory) {
        items.forEach(item => {
          let itemDataValue = item.dataset.category;

          if (itemDataValue === parentCategory) {
            item.style.display = "grid"
          } else {
            item.style.display = "none"
          }
        });
      } else {
        items.forEach(item => {
          item.style.display = "grid"
        })
      }
    })
  });
}

// Показываем кнопку вверх
const above = document.querySelector('.above');
if (above) {
  let scrollDirection = 0;
  window.addEventListener('scroll', function (e) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 1000 && scrollTop < scrollDirection) {
      above.classList.add('_show');
    } else {
      above.classList.remove('_show');
    }

    scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// content-button
function distanceContentButton(button) {
  var distanceContentButton = button.getBoundingClientRect().top + button.offsetHeight;
  document.body.style.setProperty('--distance-content-button', distanceContentButton + 'px');
}

// раскрывающийся список в сайдбаре на контентных страницах
const hasChildren = document.querySelectorAll('.has-children');
if (hasChildren.length > 0) {
  hasChildren.forEach(element => {
    const elementLink = element.querySelector('a');
    const elementList = element.querySelector('ul');

    elementLink.addEventListener('click', function(e) {
      e.preventDefault();
      element.classList.toggle('_active');
      _slideToggle(elementList);
    })
  });
}


window.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    updateDistanceСatalogToTop();

    const contentButton = document.querySelector('.content-button');
    if (window.innerWidth <= 574.98 && contentButton) {
      distanceContentButton(contentButton);
    }

    const eventsCards = document.querySelectorAll('.events-card');
    if (eventsCards.length > 0 && !isMobile.any()) {
      updateEvents(eventsCards);
    }
  }, 500);
});
window.addEventListener('scroll', function () {
  updateDistanceСatalogToTop();

  const contentButton = document.querySelector('.content-button');
  if (window.innerWidth <= 574.98 && contentButton) {
    distanceContentButton(contentButton);
  }
});

let currentWidth = window.innerWidth;
window.addEventListener('resize', function () {
  if ((currentWidth < 992 && window.innerWidth >= 992) || (currentWidth >= 992 && window.innerWidth < 992) ||
    (currentWidth < 768 && window.innerWidth >= 768) || (currentWidth >= 768 && window.innerWidth < 768)) {
    location.reload();
  }
});