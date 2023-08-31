document.addEventListener('DOMContentLoaded', function () {

  //scroll to anchor 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    });
  });

  document.querySelector('.nav-toggle').addEventListener('click', function () {
    document.querySelector('.header').classList.toggle('nav-active');
    document.querySelector('body').classList.toggle('unscroll');
  })

  // Home Popular slider Swiper
  var swiperPopular = Swiper;
  var initSwiperPopular = false;

  swiperMode();

  window.addEventListener('resize', function () {
    swiperMode();
  });

  function swiperMode() {
    let mobile = window.matchMedia('(min-width: 0px) and (max-width: 640px)');
    let desktop = window.matchMedia('(min-width: 641px)');

    // Enable (for mobile)
    if (mobile.matches) {
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
    else if (desktop.matches && initSwiperPopular) {
      swiperPopular.destroy();
      initSwiperPopular = false;
    }
  }

  // Recentrly added companies - slider Swiper
  swiperRecently = new Swiper('.companies-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    autoplay: true,
    delay:  2000,
    breakpoints: {
      768: {
        spaceBetween: 24
      },
    }
  });


  // swiperRecently = new Swiper('.companies-swiper', {
  //   speed: 500,
  //   slidesPerView: 'auto',
  //   spaceBetween: 16,
  //   centeredSlides: false,
  //   loop: true,
  //   loopedSlides: 12,
  //   autoplay: true,
  //   delay: 2000,
  //   breakpoints: {
  //     768: {
  //       spaceBetween: 24
  //     }
  //   }
  // });

  // Browse Guide - scroll shadow on mobile
  if (window.innerWidth < 768 && document.querySelector('.browse .tabs')) {
    document.querySelector('.browse .tabs').addEventListener('scroll', (e) => {
      let tabsW = e.target.parentElement,
      tabs = e.target;

      if (tabs.scrollLeft < 5) {
        tabsW.style.setProperty('--tabs-before', '-1');
        tabsW.style.setProperty('--tabs-before-opacity', '0');
      } else {
        tabsW.style.setProperty('--tabs-before', '1');
        tabsW.style.setProperty('--tabs-before-opacity', '1');
      }
      if (tabs.scrollLeft > tabs.scrollWidth - tabs.offsetWidth - 5) {
        tabsW.style.setProperty('--tabs-after', '-1');
        tabsW.style.setProperty('--tabs-after-opacity', '0');
      } else {
        tabsW.style.setProperty('--tabs-after', '1');
        tabsW.style.setProperty('--tabs-after-opacity', '1');
      }
    })
  }

    // Directory Tabs - scroll shadow on mobile
    if (window.innerWidth < 768 && document.querySelector('.directory-tabs .tabs')) {
      document.querySelector('.directory-tabs .tabs').addEventListener('scroll', (e) => {
        let tabsW = e.target.parentElement,
        tabs = e.target;
  
        if (tabs.scrollLeft < 5) {
          tabsW.style.setProperty('--tabs-before', '-1');
          tabsW.style.setProperty('--tabs-before-opacity', '0');
        } else {
          tabsW.style.setProperty('--tabs-before', '1');
          tabsW.style.setProperty('--tabs-before-opacity', '1');
        }
        if (tabs.scrollLeft > tabs.scrollWidth - tabs.offsetWidth - 5) {
          tabsW.style.setProperty('--tabs-after', '-1');
          tabsW.style.setProperty('--tabs-after-opacity', '0');
        } else {
          tabsW.style.setProperty('--tabs-after', '1');
          tabsW.style.setProperty('--tabs-after-opacity', '1');
        }
      })
    }
  

  // Show Blog Articles on Mobile
  const buttonShowArticles = document.querySelector('.btn-show-articles');
  if (buttonShowArticles) {
    buttonShowArticles.addEventListener('click', () => {
      let items = buttonShowArticles.parentElement.querySelectorAll('.article-item');
      items.forEach(item => {
        if (!item.classList.contains('d-block')) {
          item.classList.add('d-block');
        }
        buttonShowArticles.classList.add('d-none');
      })
    })
  }

  // Share News
  const buttonShare = document.querySelectorAll('.btn-share');

  buttonShare.forEach(item => {
    item.addEventListener('click', () => {
      if ('share' in navigator) {
        navigator.share({
          title: 'Recent Gambling News',
          text: item.dataset.title,
          url: item.dataset.link,
        })
          .then(() => {
            console.log('Callback after sharing');
          })
          .catch(console.error);
      } else {
        let textCopy = `${item.dataset.title} - Recent Gambling News - ${item.dataset.link}`;
        navigator.clipboard
          .writeText(textCopy)
          .then(() => {
            item.classList.add("active");
            setTimeout(function () {
              item.classList.remove("active");
            }, 1500);
          })
          .catch(() => {
          });
      }
    });
  })

  // Copy link
  const buttonCopy = document.querySelectorAll('.btn-copy');

  buttonCopy.forEach(item => {
    item.addEventListener('click', () => {
      let textCopy = `${item.dataset.title} - Recent Gambling News - ${item.dataset.link}`;
      navigator.clipboard
        .writeText(textCopy)
        .then(() => {
          if (item.closest('.share').querySelector('.share-text')) {
            document.querySelector('.share .share-text').textContent = 'Link was copied!';
          } else {
            item.closest('.share').querySelector('.popup').classList.add("active");
            setTimeout(function () {
              item.closest('.share').querySelector('.popup').classList.remove("active");
            }, 1500);
          }
        })
        .catch(() => {
        });
    });
  })

  // Accordion
  if (document.querySelector('.accordion')) {
    // (Optional) Active an item if it has the class "is-active"  
    // document.querySelector('.accordion-content .accordion-item.active');

    document.querySelectorAll('.accordion-content .accordion-item > .accordion-heading').forEach((item) => {
      item.addEventListener('click', function () {
        //event.preventDefault();
        let accordion = item.closest('.accordion');
        let content = item.parentNode.querySelector('.accordion-text');
        // Cancel the siblings
        if (item.parentNode.classList.contains('active')) {
          item.parentNode.classList.remove('active')
          content.style.maxHeight = 0;
        } else {
          if (!accordion.classList.contains('accordion-multiple') && document.querySelector('.accordion-content .accordion-item.active')) {
            document.querySelector('.accordion-content .accordion-item.active .accordion-text').style.maxHeight = 0;
            document.querySelector('.accordion-content .accordion-item.active').classList.remove('active');
          }
          // Toggle the item
          item.parentNode.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    })
  } 

  // Tabs 
  if (document.querySelector('.tabs')) {
    const tabs = document.querySelectorAll('[data-tab-target]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabSiblings = Array.from(tab.parentElement.children).filter(sibling => sibling !== tab && sibling.classList.contains('tab'));
        const target = document.querySelector(tab.dataset.tabTarget);

        const tabContentSiblings = Array.from(target.parentElement.children).filter(sibling => sibling !== target);

        tabContentSiblings.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
     
        tabSiblings.forEach(tab => {
          tab.classList.remove('active')
        })

        tab.classList.add('active')
        target.classList.add('active')

        if (document.querySelector('.directory-content-wrapper.about-content') && tab.dataset.tabTarget == '#about') {
          document.querySelector('.directory-content-wrapper.about-content').classList.remove('d-none')
        } else {
          document.querySelector('.directory-content-wrapper.about-content').classList.add('d-none')
        }
      })
    })

   

  }

  // Directory Search 
  if (document.querySelector('.directory-search')) {
    document.querySelector('.directory-search input').addEventListener('input', (e) => {
      document.querySelector('.directory-search').classList.add('active');
      // Start Search DEMO
      let field = event.target;
      document.querySelector('.directory-search .search-loading').classList.remove('d-none');
      document.querySelector('.directory-search .search-companies').classList.add('d-none');
      document.querySelector('.directory-search .search-not-found').classList.add('d-none');

      if (field.value == 'B') {
        setTimeout(() => {
          document.querySelector('.directory-search .search-not-found').classList.add('d-none');
          document.querySelector('.directory-search .search-loading').classList.add('d-none');
          document.querySelector('.directory-search .search-companies').classList.remove('d-none');
        }, 1000);
      } else {
        setTimeout(() => {
          document.querySelector('.directory-search .search-loading').classList.add('d-none');
          document.querySelector('.directory-search .search-companies').classList.add('d-none');
          document.querySelector('.directory-search .search-not-found').classList.remove('d-none');
        }, 1000);
      }
      // End Search DEMO
    })

    document.body.addEventListener('click', function (e) {
      if (document.querySelector('.directory-search.active')) {
        document.querySelector('.directory-search.active').classList.remove('active');
      }
    }, true);
  }

  // Directory chart 
  Chart.defaults.font.size = 16;
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#19191A';

  const dataChart1 = {
    labels: [
      'Ukraine',
      'Poland',
      'Rest of the world'
    ],
    datasets: [{
      data: [57, 33, 10],
      backgroundColor: [
        '#4278F0',
        '#FFBF1C',
        '#FFE587'
      ],
      borderColor: 'transparent',
      cutout: '62%',
    }],
  };
  const directoryChart1 = new Chart(
    document.getElementById('directory-chart-1'),
    {
      type: 'doughnut',
      data: dataChart1,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            padding: 20,
            title: {
              display: true
            },
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              padding: 16,
              useBorderRadius: true,
              borderRadius: 2
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            titleColor: '#19191A',
            bodyColor: '#19191A',
            padding: 12,
            borderColor: '#E8E8E8',
            borderWidth: 1,
            boxPadding: 8,
          }
        },
      
      },
    }
  );

  const dataChart2 = {
    labels: [
      'CPA',
      'Fixed',
      'Rev.share'
    ],
    datasets: [{
      data: [9, 81, 10],
      backgroundColor: [
        '#4278F0',
        '#FFBF1C',
        '#FFE587'
      ],
      borderColor: 'transparent',
      cutout: '62%',
    }]
  };
  const directoryChart2 = new Chart(
    document.getElementById('directory-chart-2'),
    {
      type: 'doughnut',
      data: dataChart1,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            padding: 20,
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              padding: 16,
              useBorderRadius: true,
              borderRadius: 2
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            titleColor: '#19191A',
            bodyColor: '#19191A',
            padding: 12,
            borderColor: '#E8E8E8',
            borderWidth: 1,
            boxPadding: 8,
          }
        },
      },
    }
  );

});


(function () {
  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    var modalTrigger = document.getElementsByClassName('jsModalTrigger');

    /* Set onclick event handler for all trigger elements */
    for (var i = 0; i < modalTrigger.length; i++) {
      modalTrigger[i].onclick = function () {
        var target = this.getAttribute('href').substr(1);
        var modalWindow = document.getElementById(target);

        modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
        document.querySelector('body').classList.add('unscroll');

        if (modalWindow.classList.contains('search-modal')) {
          setTimeout(() => {
            document.querySelector('.search-modal .search-field').focus();
            // Start Search DEMO
            document.querySelector('.search-field').addEventListener('input', (event) => {
              let field = event.target;
              document.querySelector('.search-loading').classList.remove('d-none');
              document.querySelector('.search-authors').classList.add('d-none');
              document.querySelector('.search-tags').classList.add('d-none');
              document.querySelector('.search-articles').classList.add('d-none');
              document.querySelector('.search-not-found').classList.add('d-none');

              if (field.value == 'D') {
                setTimeout(() => {
                  document.querySelector('.search-not-found').classList.add('d-none');
                  document.querySelector('.search-loading').classList.add('d-none');
                  document.querySelector('.search-authors').classList.remove('d-none');
                  document.querySelector('.search-tags').classList.remove('d-none');
                  document.querySelector('.search-articles').classList.remove('d-none');
                }, 1000);
              } else {
                setTimeout(() => {
                  document.querySelector('.search-loading').classList.add('d-none');
                  document.querySelector('.search-authors').classList.add('d-none');
                  document.querySelector('.search-tags').classList.add('d-none');
                  document.querySelector('.search-articles').classList.add('d-none');
                  document.querySelector('.search-not-found').classList.remove('d-none');
                }, 1000);
              }
            })
            // End Search DEMO
          }, 300);
        }
       
      }
    }
  }

  function closeModal() {
    /* Get close button */
    var closeButton = document.getElementsByClassName('jsModalClose');
    var closeOverlay = document.getElementsByClassName('jsOverlay');

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function () {
        var modalWindow = this.closest('.modal');
        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        document.querySelector('body').classList.remove('unscroll');
      }
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
      closeOverlay[i].onclick = function () {
        var modalWindow = this.parentNode;

        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        document.querySelector('body').classList.remove('unscroll');
      }
    }

  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}());
