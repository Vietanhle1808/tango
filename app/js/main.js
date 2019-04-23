// trigger document ready
handleIEBrowser();
handleInview();

window.addEventListener('scroll', function() {
  handleInview();
});

if (document.readyState === 'interactive') {
  detectVideoBannerOnload();
}

// trigger window onload
window.onload = function () {
  detectLoadpage();
  detectTypeSectionMediaItem();
  focusFormSearch();
  handleAccordFAQ();
  triggerButton();
  scrollDirection();
  dropdownGlobal();
  flipShowroom();
  handleShowMoreItemMainNav();
  handleHoverNavShowMore();
  addClassToImageDetectDarkLight();
  handleFooterFixed();
  toggleDialogSurface();
  handleFilterBoxHeader();
  handleFilterQuartzItem();
  toggleWhereToBuy();
  detectHashTagURLFilter();
  handleLoadMoreGlobalDisributors();
  toggleMenuMobile();
  toggleSubmenuMobile();
  hideMenuMobileOnDesktop();
  sliderProduct();
  checkHeightGallerySlider();
  handleThankYouPageData();
  handleZoomImageProduct();
  toggleModalGlobal();
  handleReadmoreText();
  handleDeviderSpacing();
  checkUIPopupOrderSample();
};

// trigger window resize
var timeout;

// Listen for resize events
window.addEventListener('resize', function (event) {

  // If timer is null, reset it to 66ms and run your functions.
  // Otherwise, wait until timer is cleared
  if (!timeout) {
    timeout = setTimeout(function () {
      // Reset timeout
      timeout = null;

      // fire event
      handleFooterFixed();
      hideMenuMobileOnDesktop();
      checkUIPopupOrderSample();

    }, 66);
  }
}, false);


//================================================================================

function slideDown(element, duration, finalheight, callback) {
  var s = element.style;
  s.height = '0px';

  var y = 0;
  var framerate = 10;
  var one_second = 1000;
  var interval = one_second * duration / framerate;
  var totalframes = one_second * duration / interval;
  var heightincrement = finalheight / totalframes;
  var tween = function () {
    y += heightincrement;
    s.height = y + 'px';
    if (y < finalheight) {
      setTimeout(tween, interval);
    }
  }
  tween();
}

function detectLoadpage() {
  document.body.classList.add('is-loaded');
}

function handleInview() {
  var heroBanner = document.querySelector('.hero-banner');

  var arrElements = [{
      element: '.section-perfection'
    },
    {
      element: '.section-collection-gray'
    },
    {
      element: '.section-collection-images-dark'
    },
    {
      element: '.section-collection-white'
    },
    {
      element: '.section-room'
    },
    {
      element: '.introduce-header'
    },
    {
      element: '.introduce-body'
    },
    {
      element: '.section-showroom'
    },
    {
      element: '.section-jombotron-header'
    },
    {
      element: '.section-jombotron-content'
    },
    {
      element: '.section-disproportionate-item'
    },
    {
      element: '.section-kitchen'
    },
    {
      element: '.title-section'
    },
    {
      element: '.section-media-content'
    },
    {
      element: '.section-form-search'
    },
    {
      element: '.section-products'
    },
    {
      element: '.title-section-display'
    },
    {
      element: '.section-discover'
    },
    {
      element: '.section-gallery-body'
    },
    {
      element: '.section-caring'
    },
    {
      element: '.section-result'
    },
    {
      element: '.section-search'
    },
    {
      element: '.section-contact'
    },
    {
      element: '.section-location'
    },
    {
      element: '.section-media'
    },
    {
      element: '.section-gallery-row'
    },
    {
      element: '.section-questions-body'
    },
    {
      element: '.section-toggle-faq'
    },
    {
      element: '.general-support'
    },
    {
      element: '.section-media-top'
    },
    {
      element: '.section-gallery-header'
    },
    {
      element: '.section-media-introduce'
    },
    {
      element: '.section-menu-accross'
    },
    {
      element: '.section-view-surface'
    },
    {
      element: '.section-distinct'
    },
    {
      element: '.section-media-footer'
    },
    {
      element: '.section-link-group'
    },
    {
      element: '.section-news'
    },
    {
      element: '.section-content-header'
    },
    {
      element: '.section-devider'
    },
    {
      element: '.section-map'
    },
    {
      element: '.filter-category-data'
    },
    {
      element: '.section-order'
    }
  ];

  for (var i = 0; i < arrElements.length; i++) {
    if (document.querySelectorAll(arrElements[i].element).length > 0) {
      // inView(arrElements[i].element)
      //   .on('enter', section => {
      //     section.classList.add('is-inview');
      //   });
      selectorEl = document.querySelectorAll(arrElements[i].element);
      if(selectorEl.length > 0) {
        selectorEl.forEach(function(elInview) {
          if(globalFunction.isInViewport(elInview)) {
            elInview.classList.add('is-inview');
          }
        });
      }
    }
  }

  if (globalFunction.domExists(heroBanner)) {
    heroBanner.classList.add('is-inview');
  }
}

function flipShowroom() {
  var flip = document.querySelectorAll('.flip');

  flip.forEach(function (el, index) {
    var flipCTA = el.querySelector('.flip-front .button');

    // Flip card when click button
    flipCTA.addEventListener('click', function (e) {
      e.preventDefault();
      el.classList.add('active');
    });

    // Flip card to front
    el.addEventListener('mouseleave', function (e) {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      }
    });
  });
}

function focusFormSearch() {
  var formSearch = document.querySelectorAll('.form-search');
  if(formSearch.length > 0) {
    formSearch.forEach(function (el) {
      var inputSearch = el.querySelector('.form-control-search');
      var form = el.closest('.form-search');
      inputSearch.onfocus = function (e) {
        form.classList.add('active');
      }
      inputSearch.onblur = function (e) {
        form.classList.remove('active');
      }
    });
  }
}

function scrollDirection() {
  var textBox = document.querySelector('.banner-text-box-wrapper');
  var bannerTextBox = document.querySelector('.banner-text-box');
  var lastScrollTop = 0;
  var documentHeight = document.documentElement.scrollHeight;
  var st = window.pageYOffset || document.documentElement.scrollTop;
  var heightTextBox = 0;

  //init position banner text box
  function handlePositionBannerTextBox() {
    if (globalFunction.domExists(bannerTextBox)) {
      heightTextBox = textBox.getBoundingClientRect().height;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var topPosition = (st / windowHeight * 0.75) * heightTextBox;
      bannerTextBox.style.transform = 'translateY(' + topPosition + '%)';
      bannerTextBox.style.webkitTransform = 'translateY(' + topPosition + '%)';
      bannerTextBox.style.msTransform = 'translateY(' + topPosition + '%)';
    }
  }

  handlePositionBannerTextBox();

  window.addEventListener('scroll', function () {
    st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      document.body.classList.remove('scroll-up');
      document.body.classList.add('scroll-down');
    } else {
      // upscroll code
      document.body.classList.remove('scroll-down');
      document.body.classList.add('scroll-up');
    }
    lastScrollTop = st;

    handleStickyMenu(st);

    if (globalFunction.domExists(textBox)) {
      heightTextBox = textBox.getBoundingClientRect().height;
      var calc = 1 - st / (heightTextBox * 1.2);
      textBox.style.opacity = calc;

      handlePositionBannerTextBox();
    }
  }, false);
}

function handleStickyMenu(scrollTop) {
  var header = document.querySelector('header');
  var headerBox = document.querySelector('.header-box');

  if (globalFunction.domExists(headerBox)) {
    var heightHeader = headerBox.getBoundingClientRect().height;

    if (scrollTop > heightHeader) {
      header.classList.add('is-sticky');
    }

    if (scrollTop < (heightHeader + 30)) {
      header.classList.remove('is-sticky');
    }
  }
}

function handleShowMoreItemMainNav() {
  var itemShowMore = document.querySelectorAll('.item-show-more');
  var closeShowMore = document.querySelectorAll('.show-more-nav-box-close');

  if (itemShowMore.length > 0) {
    itemShowMore.forEach(function (el, index) {
      for (var i = 0; i < el.children.length; i++) {
        if (el.children[i].className === 'link-main-nav') {
          el.children[i].addEventListener('click', function () {
            el.classList.add('is-active');

            // handle height show more nav box
            for (var j = 0; j < el.children.length; j++) {
              if (el.children[j].className === 'show-more-nav-box') {
                var hNavBox = el.children[j].querySelector('.show-more-nav-box-container').getBoundingClientRect().height;
                el.children[j].style.height = hNavBox + 'px';
              }
            }

          });
        }
      }
    });

    closeShowMore.forEach(function (el, index) {
      el.addEventListener('click', function () {
        itemShowMore.forEach(function (elShowmore, indexShowmore) {
          elShowmore.classList.remove('is-active');
        });
      });
    });
  }
}

function handleHoverNavShowMore() {
  var navMoreItem = document.querySelectorAll('.show-more-single-item');

  if (navMoreItem.length > 0) {
    navMoreItem.forEach(function (el, index) {
      el.onmouseenter = function (event) {
        // add/remove class active
        var sibEl = event.target.parentElement.children;
        for (var i = 0; i < sibEl.length; i++) {
          sibEl[i].classList.remove('is-active');
        }
        event.target.classList.add('is-active');

        // show/hide content match parent
        var attDataParent = event.target.getAttribute('data-nav-parent-id');
        var navContent = document.querySelectorAll('.show-more-nav-content');
        navContent.forEach(function (el, index) {
          el.classList.remove('is-active');
          if (el.getAttribute('data-nav-child-id') === attDataParent) {
            el.classList.add('is-active')
          }
        });

        // handle height show more nav box
        var hBoxNav = el.closest('.show-more-nav-box').querySelector('.show-more-nav-box-container').getBoundingClientRect().height;
        el.closest('.show-more-nav-box').style.height = hBoxNav + 'px';
        // console.log(hBoxNav);
      }
    });
  }
}

function handleAccordFAQ() {
  var btnAccord = document.querySelectorAll('.toggle-faq-btn');
  var initHeight = 0;
  // console.log(document.getElementsByClassName('toggle-faq-details'));

  if (btnAccord.length > 0) {
    btnAccord.forEach(function (el, index) {
      el.addEventListener('click', function () {
        var _this = this;

        _this.classList.toggle('is-active');
      });
    });
  }
}

function triggerButton() {
  var buttons = document.querySelectorAll('.button');
  if (buttons.length > 0) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var like = this.querySelector('.like label');
        if (globalFunction.domExists(like)) {
          like.click();
        }
      });
    }
  }
}

function sliderProduct() {
  var sliders = document.querySelectorAll('.slider-product');
  if (sliders.length > 0) {
    var slider = tns({
      container: '.slider-product',
      items: 1,
      speed: 500,
      loop: false,
      mode: 'gallery',
      slideBy: 'page',
      autoplay: true,
      lazyload: true,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      navContainer: false,
      nav: false,
      arrowKeys: false,
      controls: false,
      autoplayButtonOutput: false,
      onInit: function () {
        // var observer = lozad('.slider-item .card-image .card-image-display', {
        //   threshold: 0.1,
        //   load: function(el) {
        //     var image = el.getAttribute('data-url');
        //     el.setAttribute('style', 'background-image: url(' + image + '); animation-name: fadeIn;');
        //     var preload = el.parentElement.querySelector('.preloadSpin');
        //     preload.classList.add('removing');
        //     preload.remove();
        //   }
        // });
        // observer.observe();
      }
    });
  }
}

function dropdownGlobal() {
  var dropdowns = document.querySelectorAll('.dropdown');
  if (dropdowns.length > 0) {
    dropdowns.forEach(function (elDropdown) {
      elDropdown.addEventListener('click', function (e) {
        var _this = this;
        var dropdownMenu = _this.querySelector('.dropdown-menu');
        if(globalFunction.domExists(dropdownMenu)) {
          var siblingEle = globalFunction.getSiblings(_this);

          siblingEle.forEach(function (elSibl) {
            elSibl.classList.remove('show');
          });
          _this.classList.toggle('show');
        }
      });
    });
  }
}

function preloadImage() {
  var cardImage = document.querySelectorAll('.card-image');
  if (cardImage.length > 0) {
    for (var i = 0; i < cardImage.length; i++) {
      var spin =
        '<div class="sk-three-bounce preloadSpin">' +
        '<div class="sk-child sk-bounce1"></div>' +
        '<div class="sk-child sk-bounce2"></div>' +
        '<div class="sk-child sk-bounce3"></div>' +
        '</div>';
      var parser = new DOMParser;
      var doc = parser.parseFromString(spin, 'text/xml');
      var image = cardImage[i];
      image.append(doc.firstElementChild);
    }
  }
}

function removePreloadImage() {
  var observer = lozad('.card-image-display', {
    threshold: 0.1,
    load: function (el) {
      var image = el.getAttribute('data-url');
      el.setAttribute('style', 'background-image: url(' + image + '); animation-name: fadeIn;');
      // var preload = el.parentElement.querySelector('.preloadSpin');
      // preload.classList.add('removing');
      // preload.remove();
    }
  });
  observer.observe();
}

function detectDarkLightImg(imageSrc, callback) {
  var fuzzy = 0.1;
  var img = document.createElement("img");
  img.src = imageSrc;
  img.style.display = "none";
  document.body.appendChild(img);

  img.onload = function () {
    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var r, g, b, max_rgb;
    var light = 0,
      dark = 0;

    for (var x = 0, len = data.length; x < len; x += 4) {
      r = data[x];
      g = data[x + 1];
      b = data[x + 2];

      max_rgb = Math.max(Math.max(r, g), b);
      if (max_rgb < 128) {
        dark++;
      } else {
        light++;
      }
    }

    var dl_diff = ((light - dark) / (this.width * this.height));
    if (dl_diff + fuzzy < 0) {
      callback(true); /* Dark. */
    } else {
      callback(false); /* Not dark. */
    }
  }
}

function addClassToImageDetectDarkLight() {
  var card2Product = document.querySelectorAll('.card2-product .card2-product-front .card-image-display');

  if (card2Product.length > 0) {
    card2Product.forEach(function (el, index) {
      detectDarkLightImg(el.style.backgroundImage.slice(4, -1).replace(/"/g, ""), function (dark) {
        if (dark) {
          el.closest('.card2-product').classList.add('background--dark');
        } else {
          el.closest('.card2-product').classList.add('background--light');
        }
      });
    });
  }
}

function detectVideoBannerOnload() {
  var videoItem = document.querySelector('.video-content');
  if (globalFunction.domExists(videoItem)) {
    videoItem.onloadeddata = function () {
      document.querySelector('.hero-banner').classList.add('video-loaded');
    }
  }
}

function handleFooterFixed() {
  var footerBox = document.querySelector('footer');

  if (globalFunction.domExists(footerBox)) {
    if (globalFunction.domExists(footerBox.querySelector('.footer-wrapper'))) {
      if (window.innerWidth > 767) {
        var hFooter = footerBox.querySelector('.footer-wrapper').getBoundingClientRect().height;
        footerBox.style.paddingBottom = hFooter + 'px';
      } else {
        footerBox.removeAttribute('style');
      }
    }
  }
}

function toggleDialogSurface() {
  var surfaceImage = document.querySelector('.section-view-surface .card-image .card-image-display');
  if (globalFunction.domExists(surfaceImage)) {
    var dialog = surfaceImage.parentElement.nextSibling.nextSibling;

    if (globalFunction.domExists(dialog)) {
      var buttonClose = dialog.querySelector('.button-close');
      buttonClose.addEventListener('click', function (e) {
        e.preventDefault;
        dialog.classList.toggle('show');
      });
    }

    surfaceImage.addEventListener('click', function () {
      dialog.classList.toggle('show');
    });
  }
}

function handleLoadMoreGlobalDisributors() {
  var sectionGbDistribute = document.querySelectorAll('.section-global-distributors');

  if (sectionGbDistribute.length > 0) {
    for (var i = 0; i < sectionGbDistribute.length; i++) {
      sectionGbDistribute[i].querySelector('.show-more-globalDistribute').addEventListener('click', function (e) {
        var totalDistribute = this.closest('.section-global-distributors').querySelectorAll('.global-distributors-item').length;
        var amountCurrentVisible = this.closest('.section-global-distributors').querySelectorAll('.item-visible').length;
        var amountMore = amountCurrentVisible + 3;

        if (parseInt(amountMore) >= parseInt(totalDistribute)) {
          amountMore = totalDistribute;

          this.closest('.section-global-distributors').querySelector('.section-location-footer').classList.add('is-hidden');
        }

        for (var j = 0; j < amountMore; j++) {
          this.closest('.section-global-distributors').querySelectorAll('.global-distributors-item')[j].classList.add('item-visible');
        }
      });
    }
  }
}

function handleFilterBoxHeader() {
  var itemFilterHeading = document.querySelectorAll('.list-sub-nav-lv3-category-item');
  var categoryContain = document.querySelectorAll('.filter-category-contain');

  if (itemFilterHeading.length > 0 && categoryContain.length > 0) {
    itemFilterHeading.forEach(function (elHeading) {
      elHeading.addEventListener('click', function (event) {
        toggleClassBtnCatItem(this);

        var currentId = this.getAttribute('data-filter-quart-heading');

        if(currentId === 'all') {
          categoryContain.forEach(function (elCat) {
            elCat.classList.remove('is-active');
          });

          clearFilterProduct();
        } else {
          categoryContain.forEach(function (elCat) {
            elCat.classList.remove('is-active');
            if (elCat.dataset.filterQuartContain === currentId) {
              elCat.classList.add('is-active');
            }
          });

          // handle filter product by href
          var currentHref = this.querySelector('.link-main-nav-lv3').getAttribute('href');
          var filterHrefData = currentHref.replace('#', '');
          if (filterHrefData === 'newdesign' || filterHrefData === 'bestsell') {
            doFilterProduct(filterHrefData);
          }
        }
      });
    });
  }

  function toggleClassBtnCatItem(itemFilter) {
    itemFilter.closest('.list-sub-nav-lv3-category').querySelectorAll('.list-sub-nav-lv3-category-item').forEach(function (itemCat, indexCat) {
      itemCat.classList.remove('active');
    });
    itemFilter.classList.add('active');
  }
}

function handleFilterQuartzItem() {
  var itemCategory = document.querySelectorAll('.category-data-item');

  if (itemCategory.length > 0) {
    itemCategory.forEach(function (elCat) {
      elCat.addEventListener('click', function () {
        var dataFilterCat = this.getAttribute('data-filter');

        doFilterProduct(dataFilterCat);

      });
    });
  }
}

function doFilterProduct(dataFilter) {
  var itemProduct = document.querySelectorAll('.section-products-item');
  itemProduct.forEach(function (elProductItem) {
    elProductItem.classList.remove('item-visible');
    if (elProductItem.dataset.color.includes(dataFilter) || elProductItem.dataset.sfType.includes(dataFilter) || elProductItem.dataset.design.includes(dataFilter) || elProductItem.dataset.bestsell.includes(dataFilter)) {
      elProductItem.classList.add('item-visible');
    }
  });

  handleQuantityProductFilter()
}

function clearFilterProduct() {
  var sectionPrdBody = document.querySelectorAll('.section-products-body');
  if(sectionPrdBody.length > 0) {
    sectionPrdBody.forEach(function (elPrdBody) {
      var productItem = elPrdBody.getElementsByClassName('section-products-item');
      var itemLength = productItem.length;
      var tempLength = 0;

      if(itemLength > 3) {
        tempLength = 3;
      } else {
        tempLength = itemLength;
      }

      // async function handleItemsDisplay() {
      //   for(var j = 0; j < itemLength; j++) {
      //     productItem[j].classList.remove('item-visible');
      //     console.log(1);
      //   }
      // }

      // handleItemsDisplay().then(function () {
      //   for(var i = 0; i < tempLength; i++){
      //     productItem[i].classList.add('item-visible');
      //     console.log(2);
      //   }
      // });

      function hideItems() {
        for(var j = 0; j < itemLength; j++) {
          productItem[j].classList.remove('item-visible');
          console.log(1);
        }
      }
      function showItems() {
        for(var i = 0; i < tempLength; i++){
          productItem[i].classList.add('item-visible');
          console.log(2);
        }
      }

      new Promise(function(fullfill, reject) {
        fullfill(hideItems());
      }).then(showItems());

      // for(var j = 0; j < itemLength; j++) {
      //   productItem[j].classList.remove('item-visible');
      //   console.log(1);
      // }
      // for(var i = 0; i < tempLength; i++){
      //   productItem[i].classList.add('item-visible');
      //   console.log(2);
      // }

      //change text results
      var sectionParent = elPrdBody.closest('.section-products');
      sectionParent.querySelector('span.item-show').innerHTML = tempLength;
      sectionParent.querySelector('span.item-total').innerHTML = itemLength;

    });
  }
}

function handleQuantityProductFilter() {
  var constItemShow = 3;
  var itemShow = 0;
  var totalItem = 0;
  productBox = document.querySelectorAll('.section-products-body');

  if (productBox.length > 0) {
    productBox.forEach(function (elProductBox, indexProductBox) {
      var productItemVisible = elProductBox.querySelectorAll('.section-products-item.item-visible');

      // show text count item product
      totalItem = productItemVisible.length;
      if (parseInt(totalItem) > parseInt(constItemShow)) {
        itemShow = constItemShow;
        elProductBox.closest('.section-products').querySelector('.section-products-footer').classList.remove('is-hidden');

        for (var i = 0; i < productItemVisible.length; i++) {
          if (i > 2) {
            productItemVisible[i].classList.remove('item-visible');
          }
        }
      } else {
        itemShow = totalItem;
        elProductBox.closest('.section-products').querySelector('.section-products-footer').classList.add('is-hidden');
      }
      elProductBox.closest('.section-products').querySelector('.item-show').innerHTML = itemShow;
      elProductBox.closest('.section-products').querySelector('.item-total').innerHTML = totalItem;
    });
  }
}

function detectHashTagURLFilter() {
  var linkNav = document.querySelectorAll('.link-main-nav-lv3');
  var catContain = document.querySelectorAll('.filter-category-contain');

  if (linkNav.length > 0) {
    var linkURL = window.location.href;
    var arrHashTag = [{
        'hashName': '#newdesign'
      },
      {
        'hashName': '#bestsell'
      },
      {
        'hashName': '#color'
      },
      {
        'hashName': '#sfType'
      },
    ];
    var dataQuartzHeading;

    for (var i = 0; i < arrHashTag.length; i++) {
      if (linkURL.indexOf(arrHashTag[i].hashName) > -1) {
        var currentHash = arrHashTag[i].hashName;

        linkNav.forEach(function (elLink) {
          elLink.closest('.list-sub-nav-lv3-category-item').classList.remove('active');
          if (elLink.getAttribute('href') === currentHash) {
            elLink.closest('.list-sub-nav-lv3-category-item').classList.add('active');
            dataQuartzHeading = elLink.closest('.list-sub-nav-lv3-category-item').getAttribute('data-filter-quart-heading');

            catContain.forEach(function (elCat) {
              if (elCat.getAttribute('data-filter-quart-contain') === dataQuartzHeading) {
                elCat.classList.add('is-active');
              }
            });
          }
        });

        // handle filter product by href
        var filterHrefData = currentHash.replace('#', '');
        if (filterHrefData === 'newdesign' || filterHrefData === 'bestsell') {
          doFilterProduct(filterHrefData);
        }

      }
    }
  }

}

function checkHeightGallerySlider() {
  // var slider = document.querySelector('.section-gallery .slider');
  // if (globalFunction.domExists(slider)) {
  //   var sectionItem = slider.closest('.section-gallery-item');
  //   var height = sectionItem.outerHeight;
  //   console.log(height);
  // }
}

function toggleWhereToBuy() {
  var buttonToggle = document.querySelectorAll('.toggle-element');
  var elTarget = document.querySelectorAll('.element-target-toggle');


  // Get element toggle height and disable this
  if (elTarget.length > 0) {
    for (var i = 0; i < elTarget.length; i++) {
      var el = elTarget[i];
      var height = el.clientHeight;
      el.setAttribute('style', 'max-height: 0;');
      el.setAttribute('data-height', height);
    }
  }

  // Set event click
  if (buttonToggle.length > 0) {
    for (var i = 0; i < buttonToggle.length; i++) {
      var button = buttonToggle[i];

      button.addEventListener('click', function (e) {
        // Just hide all element-target-toggle in page
        var allDropdowns = e.target.closest('.section-menu-accross').querySelectorAll('.dropdown');
        var dropdown = e.target.closest('.dropdown-button');

        for (var j = 0; j < allDropdowns.length; j++) {
          var _dropdownButton = allDropdowns[j].querySelector('.dropdown-button');

          if (_dropdownButton !== dropdown) {
            _dropdownButton.classList.remove('show');
          }
        }

        dropdown.classList.toggle('show');
        toggleClick(e, this);
      }, false);
    }
  }


  function toggleClick(e, button) {
    e.preventDefault();

    var target = button.getAttribute('data-target');
    var targetSection = document.querySelector(target);
    var height = targetSection.getAttribute('data-height');

    targetSection.classList.toggle('show');

    for (var i = 0; i < elTarget.length; i++) {
      var el = elTarget[i];
      if (el !== targetSection) {
        if (el.classList.contains('show')) {
          el.classList.remove('show');
          el.setAttribute('style', 'max-height: 0;');
        }
      }
    }

    if (targetSection.classList.contains('show')) {
      targetSection.setAttribute('style', 'max-height: ' + height + 'px;');
    } else {
      targetSection.setAttribute('style', 'max-height: 0;');
    }
  }
}

function toggleMenuMobile() {
  var buttons = document.querySelectorAll('.main-nav-mobile-button');
  var buttonClose = document.querySelectorAll('.main-nav-mobile-menu .button-nav-close');

  if (buttons.length > 0) {
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.addEventListener('click', function () {
        document.body.classList.add('disable-scroll');
        document.querySelector('.main-nav-mobile-background').classList.add('show');
        setTimeout(function () {
          document.querySelector('.main-nav-mobile-menu').classList.add('show');
        }, 100);
      }, false);
    }
  }

  if (buttonClose.length > 0) {
    for (var i = 0; i < buttonClose.length; i++) {
      buttonClose[i].addEventListener('click', function () {
        document.querySelector('.main-nav-mobile-menu').classList.remove('show');
        setTimeout(function () {
          document.querySelector('.main-nav-mobile-background').classList.remove('show');
          document.body.classList.remove('disable-scroll');
        }, 200);
      }, false);
    }
  }
}

function hideMenuMobileOnDesktop() {
  var menuMobile = document.querySelector('.main-nav-mobile-menu');
  var menuMobileBg = document.querySelector('.main-nav-mobile-background');

  if (globalFunction.domExists(menuMobile)) {
    if (window.innerWidth > 992) {
      menuMobile.classList.remove('show');
      menuMobileBg.classList.remove('show');
      document.body.classList.remove('disable-scroll');
    }
  }
}

function toggleSubmenuMobile() {
  var btnToggle = document.querySelectorAll('.btn-toggle-sub-content');

  if (btnToggle.length > 0) {
    btnToggle.forEach(function (elButton) {
      elButton.addEventListener('click', function () {
        var _this = this;

        var boxWrapper = _this.closest('.accordion-vertical-item').querySelector('.accordion-vertical-list-child-wrapper');
        var boxContent = _this.closest('.accordion-vertical-item').querySelector('.accordion-vertical-list-child');

        if (_this.classList.contains('is-active')) {
          _this.classList.remove('is-active');

          boxWrapper.style.height = '0px';
        } else {
          _this.classList.add('is-active');

          var hContent = boxContent.getBoundingClientRect().height;
          boxWrapper.style.height = hContent + 'px';
        }

      });
    });
  }
}

function handleThankYouPageData() {
  var userBillInfo = document.querySelector('.section-user-billing-info');

  if (globalFunction.domExists(userBillInfo)) {
    if (globalFunction.checkLocalStorageItemExisted('VSuserBillingInfo')) {
      var info = localStorage.getItem('VSuserBillingInfo');
      info = JSON.parse(info);

      var email = document.querySelectorAll('.user-billing-email');
      email.forEach(function (el) {
        el.innerHTML = info[0].email;
      });

      var name = document.querySelectorAll('.user-billing-name');
      name.forEach(function (el) {
        el.innerHTML = info[0].name;
      });

      var address = document.querySelectorAll('.user-billing-address');
      address.forEach(function (el) {
        el.innerHTML = info[0].address;
      });

      var city = document.querySelectorAll('.user-billing-city');
      city.forEach(function (el) {
        el.innerHTML = info[0].city;
      });

      var zipcode = document.querySelectorAll('.user-billing-zipcode');
      zipcode.forEach(function (el) {
        el.innerHTML = info[0].zipcode;
      });

      var phone = document.querySelectorAll('.user-billing-phone');
      phone.forEach(function (el) {
        el.innerHTML = info[0].phoneNumber;
      });
    }
  }
}

function zoom(e) {
  var zoomer = e.currentTarget;

  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
  x = offsetX / zoomer.offsetWidth * 100
  y = offsetY / zoomer.offsetHeight * 100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

function handleZoomImageProduct(params) {
  var btnZoom = document.querySelectorAll('.btn-zoom-product');
  if(btnZoom.length) {
    btnZoom.forEach(function(elBtn) {
      elBtn.addEventListener('click', function() {
        var _this = this;
        var eleZoomTrigger = this.closest('.section-view-surface-content').querySelector('.trigger-zoom-element .card-image-display');

        if(_this.classList.contains('is-active')) {
          _this.classList.remove('is-active');
          eleZoomTrigger.classList.remove('is-zooming');

          eleZoomTrigger.onmousemove = function() {
            return false;
          };
        } else {
          _this.classList.add('is-active');

          eleZoomTrigger.classList.add('is-zooming');
          eleZoomTrigger.onmousemove = function() {
            zoom(event);
          };
        }
      });
    });
  }
}

function toggleModalGlobal() {
  var btnShow = document.querySelectorAll('.btn-show-modal');
  if (btnShow.length > 0) {
    for (var i = 0; i < btnShow.length; i++) {
      btnShow[i].addEventListener('click', function(e) {
        e.preventDefault();

        var _this = this;
        var target = _this.getAttribute('data-target');
        var targetDom = document.querySelector(target);

        if (targetDom) {
          targetDom.classList.toggle('show');
          if(targetDom.classList.contains('section-login')) {
            document.querySelector('body').classList.add('disable-scroll');
          }
        }

        // if(target === '#send-to-me') {
        //   var sendToMeBox = document.querySelector('#send-to-me');

        //   if(globalFunction.domExists(sendToMeBox)) {
        //     sendToMeBox.querySelector('.form-wrapper');
        //   }
        // }
      }, false);
    }
  }

  var modal = document.querySelectorAll('.modal');
  if (modal.length > 0) {
    for (var i = 0; i < modal.length; i++) {
      var btnClose = modal[i].querySelectorAll('.button-close');

      if (btnClose.length > 0) {
        for (var j = 0; j < btnClose.length; j++) {
          btnClose[j].addEventListener('click', function(e) {
            var _modal = e.target.closest('.modal');
            _modal.classList.toggle('show');
            document.querySelector('body').classList.remove('disable-scroll');
          }, false);
        }
      }
    }
  }
}

function detectTypeSectionMediaItem() {
  var sectionMediaItem = document.querySelectorAll('.section-media-item');
  if(sectionMediaItem.length > 0) {
    sectionMediaItem.forEach(function (elMedia) {
      var footerItem = elMedia.querySelector('.card2-footer');
      var introduceBox = elMedia.querySelector('.card2-introduce');
      if(!globalFunction.domExists(footerItem) && globalFunction.domExists(introduceBox)) {
        introduceBox.classList.add('no-footer');
      }
    });
  }
}

function handleIEBrowser() {
  function customizeIE(isOpera, isFirefox, isSafari, isIE, isEdge, isChrome, isBlink) {
    if(isIE) {
      document.body.classList.add('ie-browser');
    }
  }
  globalFunction.detectBrowser(customizeIE);
}

function handleReadmoreText() {
  var readMoreBox = document.querySelectorAll('.read-more-box');
  if(readMoreBox.length > 0) {
    readMoreBox.forEach(function (elReadMore) {
      var readMoreContent = elReadMore.querySelector('.read-more-content')
      var maxLength = readMoreContent.getAttribute('data-max-text');
      var str = readMoreContent.textContent;

      if(str.trim().length > maxLength) {
        var newStr = str.substring(0, maxLength);
        var dot = document.createElement('span');
        dot.classList.add('dot-span');
        dot.textContent = '...';
        var fullText = document.createElement('span');
        fullText.classList.add('full-text');
        fullText.classList.add('is-off');
        fullText.textContent = str;

        readMoreContent.textContent = '';
        readMoreContent.textContent = newStr;
        readMoreContent.appendChild(dot);
        readMoreContent.appendChild(fullText);

        elReadMore.querySelector('.read-more-link').classList.remove('is-off');
      }
    });

    var readMoreLink = document.querySelectorAll('.read-more-link');
    if(readMoreLink.length > 0) {
      readMoreLink.forEach(function (link) {
        link.addEventListener('click', function (event) {
          var _this = this;
          var tmpFullText = _this.closest('.read-more-box').querySelector('.full-text').textContent;

          _this.classList.add('is-off');
          _this.closest('.read-more-box').querySelector('.dot-span').classList.add('is-off');
          _this.closest('.read-more-box').querySelector('.read-more-content').textContent = '';
          _this.closest('.read-more-box').querySelector('.read-more-content').textContent = tmpFullText;
        });
      });
    }
  }
}

function handleDeviderSpacing() {
  var sectionContentHeader = document.querySelector('.section-content-header');
  var sectionMedia = document.querySelector('.section-media');
  var sectionDevider = document.querySelector('.section-devider');

  if(globalFunction.domExists(sectionContentHeader) && globalFunction.domExists(sectionMedia) && globalFunction.domExists(sectionDevider)) {
    if(sectionDevider.classList.contains('no-spacing-top')) {
      sectionDevider.classList.remove('no-spacing-top');
    }
  }
}

function checkUIPopupOrderSample() {
  var shoppingCart = document.querySelector('.shopping-cart');

  if(globalFunction.domExists(shoppingCart)) {
    var windowHeight = window.innerHeight;
    if(windowHeight < 480) {
      shoppingCart.classList.add('small-size');
    } else {
      shoppingCart.classList.remove('small-size');
    }
  }
}
