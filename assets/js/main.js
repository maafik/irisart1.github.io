/**
* Template Name: PhotoFolio
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();


 let basePrice = 1999; // Изначальная цена без заднего сиденья
let additionalPrice = 2000; // Цена за заднее сиденье
let totalPrice = basePrice; // Итоговая цена
let selectedItem = {}; // Объект для хранения выбранного товара

// Функция для открытия попапа с товаром
function openOrder(image, title, price) {
  selectedItem = { image, title, price };

  document.getElementById('orderPopup').style.display = 'flex';
  document.getElementById('popupImage').src = image;
  document.getElementById('popupTitle').innerText = title;

  // Устанавливаем начальную цену товара
  totalPrice = price; // Сбрасываем цену товара, передаем новую цену

  // Обновляем цену в попапе
  updatePrice();

  // Обновляем ссылку на WhatsApp с параметрами
  const phoneNumber = '79517623467';  // Номер телефона
  const message = encodeURIComponent(`Хочу заказать ${title} за ${totalPrice} ₽`);
  document.getElementById('whatsappLink').href = `https://wa.me/${phoneNumber}?text=${message}`;

  // Чтобы форма не закрылась, если кликнуть по ней
  document.getElementById('orderPopup').addEventListener('click', closeOrder);
  document.getElementById('orderPopup').addEventListener('click', function (event) {
    if (event.target === document.getElementById('orderPopup')) {
      closeOrder();
    }
  });
}

// Функция для обновления цены при изменении состояния чекбокса
function updatePrice() {
  const rearSeatCheckbox = document.getElementById('backSeatCheckbox');

  // Проверяем, выбран ли чекбокс
  if (rearSeatCheckbox.checked) {
    totalPrice = selectedItem.price + additionalPrice; // Добавляем 2000 ₽ за заднее сиденье
  } else {
    totalPrice = selectedItem.price; // Возвращаем исходную цену
  }

  // Обновляем цену в попапе
  document.getElementById('popupPrice').innerText = `Цена: ${totalPrice} ₽`;

  // Обновляем ссылку на WhatsApp с актуальной ценой
  const message = encodeURIComponent(`Хочу заказать ${selectedItem.title} за ${totalPrice} ₽`);
  document.getElementById('whatsappLink').href = `https://wa.me/79517623467?text=${message}`;
}

// Закрытие попапа
function closeOrder(event) {
  document.getElementById('orderPopup').style.display = 'none';
}


  // Обработчик кнопки "Назад" в браузере
  window.onpopstate = function () {
    closeOrder();
  };

  // Для поддержки кнопки "Назад", добавляем историю в стэк
  function handleHistory() {
    window.history.pushState({}, '');
  }

  // Вызовите эту функцию при открытии попапа
  window.addEventListener('load', handleHistory);

  function toggleItems(type) {
    const frontItems = document.getElementById('frontItems');
    const backItems = document.getElementById('backItems');
    const frontBtn = document.getElementById('frontBtn');
    const backBtn = document.getElementById('backBtn');

    if (type === 'front') {
      frontItems.style.display = 'flex';
      backItems.style.display = 'none';
      frontBtn.classList.add('active');
      backBtn.classList.remove('active');
    } else {
      backItems.style.display = 'flex';
      frontItems.style.display = 'none';
      backBtn.classList.add('active');
      frontBtn.classList.remove('active');
    }
  }
  const reviewsWrapper = document.querySelector('.reviews-wrapper');
let isMouseDown = false;
let startX, scrollLeft;

reviewsWrapper.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  startX = e.pageX - reviewsWrapper.offsetLeft;
  scrollLeft = reviewsWrapper.scrollLeft;
  reviewsWrapper.style.cursor = 'grabbing';
});

reviewsWrapper.addEventListener('mouseleave', () => {
  isMouseDown = false;
  reviewsWrapper.style.cursor = 'grab';
});

reviewsWrapper.addEventListener('mouseup', () => {
  isMouseDown = false;
  reviewsWrapper.style.cursor = 'grab';
});

reviewsWrapper.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  const x = e.pageX - reviewsWrapper.offsetLeft;
  const walk = (x - startX) * 3; // Скорость прокрутки
  reviewsWrapper.scrollLeft = scrollLeft - walk;
});

reviewsWrapper.addEventListener('wheel', (e) => {
  e.preventDefault();
  reviewsWrapper.scrollLeft += e.deltaY; // Прокрутка мышью
});

