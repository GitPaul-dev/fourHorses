window.addEventListener('DOMContentLoaded', () => {
  const marquee = document.getElementById('marquee');
  const body = document.querySelector('.body');
  const sectionHero = document.getElementById('hero');

  // Плавный скрол по якорным ссылкам
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Анимация элемента #knightChess при наведении на '.hero__item a'
  let hoverLink = document.querySelectorAll('.hero__item a');
  hoverLink.forEach(el => {
    el.addEventListener('mouseover', () => {
      document.getElementById('knightChess').style.animation = 'quake 0.5s ease-in-out';
    });
    el.addEventListener('mouseout', () => {
      document.getElementById('knightChess').style.animation = 'unset';
    });
  });

  // Ф-ция начала aнимации только после анимации другого эл-та
  function showAfter(firstEl, secondEl) {
    if (firstEl.classList.contains('scroll-animation')) {
      secondEl.classList.add('scroll-animation');
    } else {
      secondEl.classList.remove('scroll-animation');
    }
  }

  // Анимация при скролле
  function animationScroll() {
    const animated = document.querySelectorAll('.must-animated');
    const pawnChess = document.getElementById('pawnChess');
    const stepsTitle = document.getElementById('stepsTitle');
    const stepsMark = document.getElementById('stepsMark');
    const plainStep = document.getElementById('plainStep');
    const plainImg = document.getElementById('plainImg');

    let helfWindow = (window.innerHeight) + window.scrollY;

    animated.forEach(el => {
      let scrollOffset = el.offsetTop + (el.offsetHeight / 2);
      if (helfWindow >= scrollOffset) {
        el.classList.add('scroll-animation');
      } else {
        el.classList.remove('scroll-animation');
      }
    });

    showAfter(marquee, pawnChess);
    showAfter(stepsTitle, stepsMark);
    showAfter(plainStep, plainImg);
  }
  animationScroll();

  window.addEventListener('scroll', () => {
    animationScroll();
  });

  // Слайдер "Участники турнира"
  const swiper = new Swiper('.slider-1', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',

      formatFractionTotal: function (number) {
        number = document.querySelectorAll('.slider-1-slide').length;
        return number;
      },
    },

    slidesPerView: 1,
    spaceBetween: 10,

    breakpoints: {

      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,

        pagination: {
          formatFractionCurrent: function (number) {
            return number = number * 2;
          },
        }

      },

      1124: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,

        pagination: {
          formatFractionCurrent: function (number) {
            return number = number * 3;
          },
        }
      },
    },

    loop: true,

    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInterection: false
    },

    speed: 800,
  });

  // Слайдер "Этапы преображения Васюков"
  function mobileSlider(deviceWidth, sliderClass, wrapperClass, slideClass, settings) {
    let slider;
    const beforeSlider = document.querySelector(sliderClass);
    const wrapper = document.querySelector(wrapperClass);
    const slides = document.querySelectorAll(slideClass);

    let breakpoint = window.matchMedia(deviceWidth);

    function findSlider() {
      if (breakpoint.matches) {
        beforeSlider.classList.add('swiper');
        wrapper.classList.add('swiper-wrapper');

        slides.forEach(slide => {
          slide.classList.add('swiper-slide');
        });

        slider = new Swiper(sliderClass, settings)
        return slider;
      } else {

        if (slider !== undefined) slider.destroy(true, true);

        beforeSlider.className = sliderClass.slice(1);
        wrapper.className = `${wrapperClass.slice(1)} list-reset`;

        slides.forEach(slide => {
          if (slide.className.includes('steps__card')) {
            slide.className = `${slideClass.slice(1)} steps__card must-animated`
          } else {
            slide.className = slideClass.slice(1);
          }
        });
        return;
      }
    }

    breakpoint.addEventListener('change', findSlider);
    window.addEventListener('resize', findSlider);
    findSlider();
  }

  mobileSlider('(max-width: 991px',
    '.slider',
    '.slider-wrapper',
    '.slide',
    {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },

      slidesPerView: 1,
      spaceBetween: 10,
      speed: 800,

      breakpoints: {
        670: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 20,
        }
      }
    });
});