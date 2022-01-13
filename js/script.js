window.addEventListener('DOMContentLoaded', () => {
  const widthScreen = window.innerWidth

  // Scroll for IOS
  window.__forceSmoothScrollPolyfill__ = true;

  // Burger-menu
  const btnMenu = document.querySelector('.header-burger');
  const menu = document.querySelector('.header-bottom');
  const btnClose = document.querySelector('.btn-close');

  btnMenu.addEventListener('click', () => {
    menu.classList.add('menu-is-active')
    bodyScrollLock.disableBodyScroll(menu)
  })
  btnClose.addEventListener('click', () => {
    menu.classList.remove('menu-is-active')
    bodyScrollLock.enableBodyScroll(menu)
  })

  // Menu-link
  const links = document.querySelectorAll('.nav-link')
  links.forEach((link) => {
    link.addEventListener('click', () =>{
      bodyScrollLock.enableBodyScroll(menu);
      menu.classList.remove('menu-is-active');
    })
  })

  // Interior-swiper
  new Swiper('.interior-swiper', {
    direction: 'horizontal',
    loop: false,

    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        grid: {
          rows: 1
        },
      },

      768: {
        spaceBetween: 30,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        grid: {
          rows: 1
        },
      },
      1024: {
        spaceBetween: 25,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        grid: {
          rows: 1
        },
      }
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Menu
  const btnMenuAll = document.querySelectorAll('.menu-btn');
  const menuSwiperAll = document.querySelectorAll('.menu-swiper');
  const btnControlMenuAll = document.querySelectorAll('.menu-swiper-btn');

  btnMenuAll.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const path = e.currentTarget.dataset.path;
      menuSwiperAll.forEach((menuSwiper) => {
        menuSwiper.classList.remove('menu-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('menu-active')

      btnMenuAll.forEach((item) => {
        item.classList.remove('btn-active')
      })
      btn.classList.add('btn-active')
    });
  })

  if (widthScreen <= 730) {

    btnMenuAll.forEach((btn) => {
      btn.addEventListener('click', () => {
        btnControlMenuAll.forEach((item) => {
          item.classList.remove('menu-swiper-btn__active')
          if (item.closest('.menu-swiper').classList.contains('menu-active')) {
            item.classList.add('menu-swiper-btn__active')
          }
        })
      })
    })

    btnControlMenuAll.forEach((item) => {
      if (item.closest('.menu-swiper').classList.contains('menu-active')) {
        item.classList.add('menu-swiper-btn__active')
      }
    })

    new Swiper('.menu-swiper', {
      direction: 'horizontal',
      loop: false,

      breakpoints: {
        320: {
          spaceBetween: 10,
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          grid: {
            rows: 1
          },
        }
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  /* News-Swiper */
  new Swiper('.news-swiper', {
    direction: 'horizontal',
    loop: false,

    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        grid: {
          rows: 1
        },
      },

      768: {
        spaceBetween: 30,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        loopedSlides: 1,
        grid: {
          rows: 1
        },
      }
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /* Yandex-map */
  function init() {
    let center = [56.836106, 60.614587];
    let myMap = new ymaps.Map("map", {
      center: [56.836106, 60.614587],
      zoom: 17,
      controls: ['smallMapDefaultSet']
    });
    let placeMarkCustom = new ymaps.Placemark(center, {
      balloonContent: 'Екатеринбург, ул. Малышева 51,\n' +
        'БЦ Высоцкий, 50 этаж'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../image/1200/icon-map.svg',
      iconImageSize: [60, 60],
      iconImageOffset: [-30, -50]
    });
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.controls.remove('typeSelector');
    myMap.geoObjects.add(placeMarkCustom);
  }


  let flag = 0;
  let coordinate = document.documentElement.scrollTop;
  console.log('coord', coordinate)



  if (widthScreen >= 1920) {
    if (coordinate >= 3000) {
      ymaps.ready(init)
      flag = 1;
    }
  }
  if (widthScreen <= 1024 && widthScreen >= 769) {
    if (coordinate >= 2600) {
      ymaps.ready(init)
      flag = 1;
    }
  }

  if (widthScreen <= 768 && widthScreen >= 376) {
    if (coordinate >= 2700) {
      ymaps.ready(init)
      flag = 1;
    }
  }

  if (widthScreen <= 375) {
    if (coordinate >= 3200) {
      ymaps.ready(init)
      flag = 1;
    }
  }



  window.addEventListener('scroll', () => {
    let mapOffset = document.querySelector('#map').offsetTop;
    let scrollY = window.scrollY;
    if ((scrollY >= mapOffset - 1500) && (flag === 0)) {
      ymaps.ready(init)
      flag = 1;
    }
  });

})
