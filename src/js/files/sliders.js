/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

//Подключаем слайдер Swiper с node_modules
//При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
//Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Grid, Pagination } from 'swiper/modules';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

//Стили Swiper
//Базовые стили
import "../../scss/base/swiper.scss";
//Полный набор стилей с scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
//Полный набор стилей с node_modules
// import 'swiper/css';

//Инициализация слайдеров
function initSliders() {
	//Список слайдеров
	//Проверяем, есть ли слайдер на странице
	const programTemplates = document.querySelectorAll('.program-template');
	if (programTemplates.length > 0) {
		programTemplates.forEach(programTemplate => {
			if (window.innerWidth >= 992) {
				setTimeout(() => {
					let itemMaxHeight = 0;
					const items = programTemplate.querySelectorAll('.program-card');
					if (items.length >= 2) {
						items.forEach(element => {
							itemMaxHeight <= element.offsetHeight ? itemMaxHeight = element.offsetHeight : null;
						});
						programTemplate.querySelector(".program-template__slider").style.height = '500px';
					}
					else if (items.length == 1) {
						programTemplate.querySelector(".program-template__slider").style.height = '240px';
						programTemplate.querySelector(".program-template__slide").classList.add('_full')
					}

				}, 500);
			}


			const slider = programTemplate.querySelector('.program-template__slider');
			const programSlider = new Swiper(slider, {
				modules: [Navigation, Grid, Pagination],
				observer: true,
				observeParents: true,
				slidesPerView: 1.12,
				spaceBetween: 16,
				autoHeight: false,
				speed: 800,

				//touchRatio: 0,
				//simulateTouch: false,
				//loop: true,
				//preloadImages: false,
				//lazy: true,

				/*
				// Эффекты
				effect: 'fade',
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				*/

				// Пагинация
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},


				// Скроллбар
				/*
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				*/

				// Кнопки "влево/вправо"
				navigation: {
					prevEl: programTemplate.querySelector('.swiper__arrow_prev'),
					nextEl: programTemplate.querySelector('.swiper__arrow_next'),
				},

				// Брейкпоинты
				breakpoints: {
					480: {
						slidesPerView: 2,
						spaceBetween: 16,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 20,
						grid: {
							rows: 2,
						},
					},
				},

				on: {

				}
			});
		});
	}

	if (document.querySelector('.program-template__slider')) { //Указываем класс нужного слайдера


	}
}
//Скролл на базе слайдера (по классу swiper scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	//Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});