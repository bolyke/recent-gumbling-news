document.addEventListener('DOMContentLoaded', function () {

    //scroll to anchor 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        });
    });

    document.querySelector('.nav-toggle').addEventListener('click', function () {
        document.querySelector('.header').classList.toggle('nav-active');
        document.querySelector('body').classList.toggle('unscroll');
    })

    //header search 
    // document.querySelector('.search-open').addEventListener('click', () => {
    //     document.querySelector('.header-search').classList.add('active');
    // })
    // document.querySelector('.search-close').addEventListener('click', () => {
    //     document.querySelector('.header-search').classList.remove('active');
    // })

    // if (document.querySelector('.search')) {
    //     document.querySelectorAll('.search input').forEach((item) => {
    //         item.addEventListener('input', () => {
    //             item.parentNode.parentNode.querySelector('.search-result').classList.add('active');
    //         })
    //     })

    //     document.body.addEventListener('click', function (e) {
    //         if (document.querySelector('.search-result.active')) {
    //             document.querySelector('.search-result.active').classList.remove('active');
    //         }
    //     }, true);
    // }

    // window.addEventListener('resize', () => {
    //     if (window.innerWidth > 768) {
    //         if (swiperPopular.)
    //         swiperPopular.destroy(true, true);
    //     }
    // })

    // Home Popular slider Swiper
    var swiperPopular = Swiper;
    var initSwiperPopular = false;

    swiperMode();
  
    window.addEventListener('resize', function() {
        swiperMode();
    });
    
    function swiperMode() {
        let mobile = window.matchMedia('(min-width: 0px) and (max-width: 640px)');
        let desktop = window.matchMedia('(min-width: 641px)');

        // Enable (for mobile)
        if(mobile.matches) {
            if (!initSwiperPopular) {
                initSwiperPopular = true;
                swiperPopular = new Swiper('.main-swiper', {
                    speed: 500,
                    slidesPerView: 1.1,
                    spaceBetween: 0,
                    centeredSlides: true,
                    loop: true,
                });
            }
        }
        // Disable (for desktop)
        else if(desktop.matches && initSwiperPopular) {
            swiperPopular.destroy();
            initSwiperPopular = false;
        }
    }

});


(function() {
    /* Opening modal window function */
    function openModal() {
        /* Get trigger element */
        var modalTrigger = document.getElementsByClassName('jsModalTrigger');
  
        /* Set onclick event handler for all trigger elements */
        for(var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function() {
              var target = this.getAttribute('href').substr(1);
              var modalWindow = document.getElementById(target);
  
              modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open'; 
            }
        }   
    }
  
    function closeModal(){
      /* Get close button */
      var closeButton = document.getElementsByClassName('jsModalClose');
      var closeOverlay = document.getElementsByClassName('jsOverlay');
  
      /* Set onclick event handler for close buttons */
        for(var i = 0; i < closeButton.length; i++) {
          closeButton[i].onclick = function() {
            var modalWindow = this.parentNode.parentNode;
  
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        }   
  
      /* Set onclick event handler for modal overlay */
        for(var i = 0; i < closeOverlay.length; i++) {
          closeOverlay[i].onclick = function() {
            var modalWindow = this.parentNode;
  
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        }  
  
    }
  
    /* Handling domready event IE9+ */
    function ready(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }
  
    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
}());
