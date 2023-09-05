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

  // Directory Chart
  if (document.querySelector('.directory-chart')) {
    // Chart 1
    let data1 = { "Ukraine": 57, "Poland": 33, "Rest of the world": 10 }
    let color1 = d3.scaleOrdinal()
      .domain(["Ukraine", "Poland", "Rest of the world"])
      .range(["#4278F0", "#FFE587", "#FFBF1C"]);

    buildChart('#directory-chart-1', data1, color1);

    // Chart 2
    let data2 = { "CPA": 9, "Rev.share": 10, "Fixed": 81 }
    let color2 = d3.scaleOrdinal()
      .domain(["CPA", "Rev.share", "Fixed"])
      .range(["#4278F0", "#FFE587", "#FFBF1C"]);

    buildChart('#directory-chart-2', data2, color2);

    function buildChart (elem, data, color) {
      // set the dimensions and margins of the graph
      const width = 330,
        height = 330,
        margin = 30;

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      const radius = Math.min(width, height) / 2 - margin,
        innerRadius = radius * 0.5,
        outerRadius = radius * 0.8,
        labelRadius = (innerRadius * 0.4 + outerRadius * 0.9),
        arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

      // append the svg object to the div called 'directory-chart-0'
      let svg = d3.select(elem)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Compute the position of each group on the pie:
      let pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(d => d[1])
      let data_ready = pie(Object.entries(data))

      // The arc generator
      let arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

      // Another arc that won't be drawn. Just for labels positioning
      let outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[1]))

      // Add the polylines between chart and labels:
      svg
        .selectAll('allLabels')
        .data(data_ready)
        .join('text')
        .text(d => `${d.data[1]}%`)
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
        })

      // Add legend.
      let legendWrap = document.querySelector(`${elem} .chart-legend`);

      data_ready.forEach(item => {
        legendWrap.insertAdjacentHTML('beforeend', `<div><svg width="12" height="12"><rect x="0" y="0" rx="2" width="12" height="12" style="fill: ${color(item.data[1])}"></rect></svg><span>${item.data[0]}</span></div>`)
      });
    }
  }

  // Read more buttons
  // Get the elements
  document.querySelectorAll('.text-read-more').forEach(item => {
    const textParagraph = item.querySelector('p');
    const readMoreButton = item.querySelector('.read-more');
  
    const fullText = textParagraph.textContent;
  
    const maxLength = parseInt(item.dataset.chars) || 130;
    textParagraph.textContent = fullText.slice(0, maxLength) + '...';
  
    function toggleText() {
      if (textParagraph.textContent.length === maxLength + 3) {
        textParagraph.textContent = fullText;
        readMoreButton.textContent = 'read less';
      } else {
        textParagraph.textContent = fullText.slice(0, maxLength) + '...';
        readMoreButton.textContent = 'read more';
      }
    }
  
    readMoreButton.addEventListener('click', toggleText);
  })


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
