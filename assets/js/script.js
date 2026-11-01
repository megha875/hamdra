  window.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('sliderBox');
    const container = document.getElementById('sliderContainer');
    const dotsWrapper = document.getElementById('dotsWrapper');
    const previousButton = document.getElementById('ourSliderPrev');
    const nextButton = document.getElementById('ourSliderNext');

    let currentIndex = 0;
    const totalDots = 4; // Fixed 4 dots
    let autoplayTimer = null;

    function initSlider() {
      dotsWrapper.innerHTML = '';

      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === currentIndex) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoplay();
        });
        dotsWrapper.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      const maxScroll = container.scrollWidth - box.clientWidth;
      const step = maxScroll / (totalDots - 1);
      const moveX = currentIndex * step;

      container.style.transform = `translateX(-${moveX}px)`;

      const dots = dotsWrapper.querySelectorAll('.slider-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex++;
      if (currentIndex >= totalDots) {
        currentIndex = 0;
      }
      goToSlide(currentIndex);
    }

    function previousSlide() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalDots - 1;
      }
      goToSlide(currentIndex);
    }

    function startAutoplay() {
      if (autoplayTimer) {
        return;
      }
      autoplayTimer = setInterval(nextSlide, 2500);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (previousButton && nextButton) {
      previousButton.addEventListener('click', () => {
        previousSlide();
        resetAutoplay();
      });

      nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    box.addEventListener('mouseenter', stopAutoplay);
    box.addEventListener('mouseleave', startAutoplay);

    initSlider();
    startAutoplay();
  });




//   


(function () {
  // Kin sections ko slider banana hai (class names aapke HTML se)
  var SECTIONS = ['.sellers', '.combo', '.roof', '.beaverage', '.spices', '.powdered', '.whole'];
  var MIN_SLIDES = 8;   // loop ke liye kam se kam itne cards chahiye (4 cards ho to copy ban jati hai)
 
  var rows = [];
  document.querySelectorAll(SECTIONS.map(function (s) { return s + ' .row.g-3'; }).join(',')).forEach(function (row) {
    if (rows.indexOf(row) === -1) rows.push(row);   // nested hone par dobara na ho
  });
 
  rows.forEach(function (row, i) {
    if (row.dataset.sliderDone) return;
    row.dataset.sliderDone = '1';
 
    // 1) Bootstrap row/col ko Swiper structure mein badlo
    var cols = Array.prototype.slice.call(row.children);
    cols.forEach(function (col) {
      col.className = 'swiper-slide';
    });
 
    // 2) Cards kam hon to copy bana lo, taaki loop smooth chale
    var originals = cols.slice();
    var total = originals.length;   // dots ki ginti = asli cards
    var k = 0;
    while (row.children.length < MIN_SLIDES && originals.length) {
      row.appendChild(originals[k % originals.length].cloneNode(true));
      k++;
    }
 
    row.className = 'swiper-wrapper';
 
    var wrap = document.createElement('div');
    wrap.className = 'swiper auto-swiper';
    row.parentNode.insertBefore(wrap, row);
    wrap.appendChild(row);

    var previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'auto-slider-btn auto-slider-prev';
    previousButton.setAttribute('aria-label', 'Previous products');
    previousButton.innerHTML = '<i class="bi bi-chevron-left"></i>';

    var nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'auto-slider-btn auto-slider-next';
    nextButton.setAttribute('aria-label', 'Next products');
    nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>';

    wrap.appendChild(previousButton);
    wrap.appendChild(nextButton);

    // 3) Swiper start
    var swiper = new Swiper(wrap, {
      loop: true,
      slidesPerView: 2,             // mobile
      spaceBetween: 16,
      speed: 700,
      autoplay: window.matchMedia('(min-width: 992px)').matches ? {
        delay: 3000 + (i % 3) * 400, // har section thoda alag time par chale
        disableOnInteraction: false,
        pauseOnMouseEnter: true      // mouse upar ho to ruk jaye
      } : false,
      navigation: {
        prevEl: previousButton,
        nextEl: nextButton
      },
      breakpoints: {
        576: { slidesPerView: 2 },   // tablet (col-sm-6 jaisa)
        768: { slidesPerView: 4 }    // desktop (col-md-3 jaisa)
      }
    });
 
    // 4) Neeche red dots
    var dotsBox = document.createElement('div');
    dotsBox.className = 'auto-dots';
    var dots = [];
    for (var d = 0; d < total; d++) {
      (function (n) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'auto-dot';
        b.setAttribute('aria-label', 'Slide ' + (n + 1));
        b.addEventListener('click', function () { swiper.slideToLoop(n); });
        dotsBox.appendChild(b);
        dots.push(b);
      })(d);
    }
    wrap.parentNode.insertBefore(dotsBox, wrap.nextSibling);
 
    function updateDots() {
      var active = swiper.realIndex % total;
      dots.forEach(function (b, n) { b.classList.toggle('active', n === active); });
    }
    swiper.on('slideChange', updateDots);
    updateDots();
  });
})();



// 
  // Selected Location Update Script
    const saveLocationButton = document.getElementById('saveLocationBtn');
    if (saveLocationButton) {
      saveLocationButton.addEventListener('click', function() {
      const city = document.getElementById('citySelect').value;
      const pincode = document.getElementById('pincodeInput').value;
      const displaySpan = document.getElementById('selected-city-text');

      if (pincode.trim() !== "") {
        displaySpan.innerHTML = pincode + ' <i class="fa-solid fa-chevron-down ms-1" style="font-size: 9px;"></i>';
      } else if (city && city !== "Choose City...") {
        displaySpan.innerHTML = city + ' <i class="fa-solid fa-chevron-down ms-1" style="font-size: 9px;"></i>';
      }

      // Close modal
      const modalElement = document.getElementById('locationModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      });
    }

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wishlist-icon').forEach((wishlist) => {
      const link = document.createElement('a');
      link.href = '#wishlist';
      link.className = wishlist.className;
      link.setAttribute('aria-label', 'Open wishlist');
      link.innerHTML = wishlist.innerHTML;
      wishlist.replaceWith(link);
    });

    document.querySelectorAll('button').forEach((button) => {
      if (button.textContent.trim().replace(/\s+/g, ' ') === 'View All >' ||
          button.textContent.trim().replace(/\s+/g, ' ') === 'View All') {
        const link = document.createElement('a');
        link.href = '#all-products';
        link.className = button.className;
        link.style.cssText = button.getAttribute('style') || '';
        link.innerHTML = button.innerHTML;
        button.replaceWith(link);
      }
    });

    const slider = document.getElementById('productSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slider && prevBtn && nextBtn) {
        // Calculate scroll amount dynamically based on card width
        const getScrollAmount = () => {
            const card = slider.querySelector('.product-card-item');
            if (card) {
                return card.offsetWidth + 15; // Width + gap
            }
            return 300;
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
});



//    Card 

    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.getElementById('bestSellersSlider');
        const prevBtn = document.getElementById('bestSellersPrev');
        const nextBtn = document.getElementById('bestSellersNext');
        const dots = document.querySelectorAll('.slider-dot');

        if (slider) {
            const getScrollAmount = () => {
                const card = slider.querySelector('.product-card-item');
                return card ? card.offsetWidth + 10 : 200;
            };

            if (prevBtn && nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                });
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
                });
            }

            let currentDotIndex = 0;
            const totalDots = dots.length;
            let autoSlideInterval = null;

            const scrollToDotIndex = (index) => {
                currentDotIndex = index;
                let scrollDistance;
                if (index === totalDots - 1) {
                    scrollDistance = slider.scrollWidth - slider.clientWidth;
                } else {
                    scrollDistance = getScrollAmount() * index * 1;
                }
                slider.scrollTo({ left: scrollDistance, behavior: 'smooth' });
                updateDotsActiveState(index);
            };

            const updateDotsActiveState = (activeIndex) => {
                dots.forEach((dot, idx) => {
                    if (idx === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };

            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    scrollToDotIndex(idx);
                    resetAutoSlide();
                });
            });

            const startAutoSlide = () => {
                if (window.innerWidth >= 992 && !autoSlideInterval) {
                    autoSlideInterval = setInterval(() => {
                        currentDotIndex = (currentDotIndex + 1) % totalDots;
                        scrollToDotIndex(currentDotIndex);
                    }, 2000);
                }
            };

            const resetAutoSlide = () => {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
                startAutoSlide();
            };

            startAutoSlide();

            slider.parentElement.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 992) {
                    clearInterval(autoSlideInterval);
                    autoSlideInterval = null;
                }
            });

            slider.parentElement.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 992) {
                    startAutoSlide();
                }
            });
        }
    });





    
    // Mobile Drawer Elements
    const openBtn = document.getElementById('openMobileMenuBtn');
    const closeBtn = document.getElementById('closeMobileMenuBtn');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');

    function openMenu() {
      drawer.classList.add('active');
      overlay.classList.add('active');
    }

    function closeMenu() {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    }

    if(openBtn) openBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(overlay) overlay.addEventListener('click', closeMenu);

    // Desktop Dropdown Elements
    const desktopCatBtn = document.getElementById('desktopCatBtn');
    const desktopCatDropdown = document.getElementById('desktopCatDropdown');
    const desktopAccountBtn = document.getElementById('desktopAccountBtn');
    const desktopAccountDropdown = document.getElementById('desktopAccountDropdown');
    const desktopPinBtn = document.getElementById('desktopPinBtn');
    const desktopPinDropdown = document.getElementById('desktopPinDropdown');

    // Toggle Desktop Categories
    if (desktopCatBtn && desktopCatDropdown && desktopAccountDropdown && desktopPinDropdown) {
      desktopCatBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      desktopCatDropdown.classList.toggle('show');
      desktopAccountDropdown.classList.remove('show');
      desktopPinDropdown.classList.remove('show');
      });
    }

    // Toggle Desktop Account
    if (desktopAccountBtn && desktopAccountDropdown && desktopCatDropdown && desktopPinDropdown) {
      desktopAccountBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      desktopAccountDropdown.classList.toggle('show');
      desktopCatDropdown.classList.remove('show');
      desktopPinDropdown.classList.remove('show');
      });
    }

    // Toggle Desktop Pincode
    if (desktopPinBtn && desktopPinDropdown && desktopCatDropdown && desktopAccountDropdown) {
      desktopPinBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      desktopPinDropdown.classList.toggle('show');
      desktopCatDropdown.classList.remove('show');
      desktopAccountDropdown.classList.remove('show');
      });
    }

    // Prevent closing when clicking inside Pincode Dropdown Form
    if (desktopPinDropdown) {
      desktopPinDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    if (desktopAccountDropdown) {
      desktopAccountDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // Close all desktop dropdowns on click outside
    window.addEventListener('click', function() {
      if (desktopCatDropdown) desktopCatDropdown.classList.remove('show');
      if (desktopAccountDropdown) desktopAccountDropdown.classList.remove('show');
      if (desktopPinDropdown) desktopPinDropdown.classList.remove('show');
    });

    // Mobile Accordion Submenus
    const mobileCatToggle = document.getElementById('mobileCatToggle');
    const mobileCatSubmenu = document.getElementById('mobileCatSubmenu');
    const mobileCatChevron = document.getElementById('mobileCatChevron');

    mobileCatToggle.addEventListener('click', function() {
      mobileCatSubmenu.classList.toggle('show');
      mobileCatChevron.classList.toggle('fa-chevron-up');
      mobileCatChevron.classList.toggle('fa-chevron-down');
    });

    const mobileAccountToggle = document.getElementById('mobileAccountToggle');
    const mobileAccountSubmenu = document.getElementById('mobileAccountSubmenu');
    const mobileAccountChevron = document.getElementById('mobileAccountChevron');

    mobileAccountToggle.addEventListener('click', function() {
      mobileAccountSubmenu.classList.toggle('show');
      mobileAccountChevron.classList.toggle('fa-chevron-up');
      mobileAccountChevron.classList.toggle('fa-chevron-down');
    });

    const mobilePinToggle = document.getElementById('mobilePinToggle');
    const mobilePinSubmenu = document.getElementById('mobilePinSubmenu');
    const mobilePinChevron = document.getElementById('mobilePinChevron');
    const mobilePinHeaderBtn = document.getElementById('mobilePinHeaderBtn');

    if(mobilePinToggle) {
      mobilePinToggle.addEventListener('click', function() {
        mobilePinSubmenu.classList.toggle('show');
        mobilePinChevron.classList.toggle('fa-chevron-up');
        mobilePinChevron.classList.toggle('fa-chevron-down');
      });
    }

    if(mobilePinHeaderBtn) {
      mobilePinHeaderBtn.addEventListener('click', function() {
        openMenu();
        mobilePinSubmenu.classList.add('show');
      });
    }
    // our product
     document.addEventListener("DOMContentLoaded", function () {
      const dots = document.querySelectorAll("#customDots .custom-dot");

      var swiper = new Swiper(".productRangeSwiper", {
        slidesPerView: 2,
        spaceBetween: 16,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 1800,
          disableOnInteraction: false,
        },
        breakpoints: {
          576: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 18 },
          992: { slidesPerView: 6, spaceBetween: 18 }
        },
        on: {
          slideChange: function () {
            // Calculate active index inside 0 to 4 range so red dot never disappears
            let activeIndex = this.realIndex % 5;
            dots.forEach((dot, idx) => {
              if (idx === activeIndex) {
                dot.classList.add("active");
              } else {
                dot.classList.remove("active");
              }
            });
          }
        }
      });

      // Click event for dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
          swiper.slideToLoop(index);
        });
      });
    });


    // Keep only the first product slider section.
    const sellerSections = document.querySelectorAll('.best-sellers-section');
    sellerSections.forEach(function(section, index) {
      if (index > 0) section.remove();
    });

    const sellerSection = document.querySelector('.best-sellers-section');

    if (sellerSection) {
      new Swiper(sellerSection.querySelector('.best-sellers-swiper'), {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: sellerSection.querySelector('.custom-pagination-bottom'),
          clickable: true,
        },
        navigation: {
          nextEl: sellerSection.querySelector('.swiper-button-next'),
          prevEl: sellerSection.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          }
        }
      });
    }

    document.querySelectorAll('.best-sellers-section .wishlist-btn').forEach(function(button) {
      button.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-solid');
      });
    });
  