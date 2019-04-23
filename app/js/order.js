handleAddNewOrderSample();
initListOrder();
checkOrderEmpty();

function handleAddNewOrderSample() {
  var orderBtn = document.querySelectorAll('.card2-product-order');
  var orderBtnProductDetails = document.querySelector('.button-single-order-sample');
  var allCartItems = [];
  var totalCartItems = 0;
  var boxNumberOrdered = document.querySelectorAll('.header-number-ordered');
  var boxNumberOrderedMobile = document.querySelectorAll('.list-settings-status-number');

  var shoppingCartBox = document.querySelector('.shopping-cart');
  var closeLightBox = document.querySelectorAll('.close-shopping-cart-overlay');

  var shoppingCartNotice = document.querySelectorAll('.shopping-cart-notice-text');
  var noticeNumberCart = document.querySelectorAll('.notice-text-number-cart');

  function changeCartTextNotify() {
    totalCartItems = allCartItems.length;
    if(boxNumberOrdered.length > 0) {
      boxNumberOrdered.forEach(function(elOrderBox) {
        elOrderBox.innerHTML = totalCartItems;
      });
    }

    if(boxNumberOrderedMobile.length > 0) {
      boxNumberOrderedMobile.forEach(function(elOrderBoxMobile) {
        elOrderBoxMobile.innerHTML = totalCartItems;
      });
    }

    if(noticeNumberCart.length > 0) {
      noticeNumberCart.forEach(function(elNoticeCart) {
        elNoticeCart.innerHTML = totalCartItems;
      });
    }
  }

  function handleShoppingCartNotice(foundVal) {
    if(shoppingCartNotice.length > 0) {
      shoppingCartNotice.forEach(function(elNotice) {
        elNotice.classList.remove('is-visible');
      });

      if(!foundVal) {
        document.querySelector('.notice-text-add-success').classList.add('is-visible');
      } else {
        document.querySelector('.notice-text-add-fail').classList.add('is-visible');
      }
    }
  }

  if(globalFunction.checkLocalStorageItemExisted('VScartProducts')) {
    allCartItems = JSON.parse(localStorage.getItem('VScartProducts'));

    changeCartTextNotify();
  }

  if(orderBtn.length > 0) {
    orderBtn.forEach(function(elBtn, indexBtn) {
      elBtn.addEventListener('click', function(e) {
        objProductInfo = {};
        var productId = this.closest('.card2-product').querySelector('.product-id-data').innerHTML;
        var productName = this.closest('.card2-product').querySelector('.product-name-data').innerHTML;
        var productImage = this.closest('.card2-product').querySelector('.product-image-data').innerHTML;
        var productUrl = this.closest('.card2-product').querySelector('.product-url').innerHTML;
        objProductInfo.productId = productId;
        objProductInfo.productName = productName;
        objProductInfo.productImage = productImage;
        objProductInfo.productUrl = productUrl;
  
        handleDataProductToShoppingCart(objProductInfo);
      });
    });
  }

  if(document.body.contains(orderBtnProductDetails)) {
    orderBtnProductDetails.addEventListener('click', function() {
      objProductInfo = {};
      var productId = this.querySelector('.product-id-data').innerHTML;
      var productName = this.querySelector('.product-name-data').innerHTML;
      var productImage = this.querySelector('.product-image-data').innerHTML;
      var productUrl = this.querySelector('.product-url').innerHTML;
      objProductInfo.productId = productId;
      objProductInfo.productName = productName;
      objProductInfo.productImage = productImage;
      objProductInfo.productUrl = productUrl;

      handleDataProductToShoppingCart(objProductInfo);
    });
  }

  function handleDataProductToShoppingCart(obj) {
    // fill data product to shopping cart
    // console.log('objProductInfo:',obj);
    document.querySelector('.shopping-cart-lightbox-name').innerHTML = obj.productName;
    document.querySelector('.shopping-cart-lightbox-id').innerHTML = obj.productId;
    document.querySelector('.shopping-cart-lightbox-id').innerHTML = obj.productId;
    document.querySelector('.item-number-text').innerHTML = obj.productId;
    document.querySelector('.shopping-cart-lightbox-img').style.backgroundImage = 'url('+obj.productImage+')';

    // check product exit in list or not
    var found = allCartItems.some(function (elCartItems) {
      return elCartItems.productId === obj.productId;
    });
    if (!found) {
      allCartItems.push(obj);

      if(!globalFunction.checkLocalStorageItemExisted('VScartProducts')) {
        localStorage.setItem('VScartProducts', JSON.stringify(allCartItems));

        changeCartTextNotify();
      } else {
        localStorage.removeItem('VScartProducts');
        localStorage.setItem('VScartProducts', JSON.stringify(allCartItems));

        changeCartTextNotify();
      }
    }

    handleShoppingCartNotice(found);

    // handle show hide popup shoping cart
    shoppingCartBox.classList.add('show');
  }

  if(closeLightBox.length > 0) {
    closeLightBox.forEach(function(elClose) {
      elClose.addEventListener('click', function() {
        shoppingCartBox.classList.remove('show');
      });
    });
  }
}

function initListOrder() {
  var orderBody = document.querySelectorAll('.cart-list-order');

  if(globalFunction.checkLocalStorageItemExisted('VScartProducts') && orderBody.length > 0) {
    var allProducts = JSON.parse(localStorage.getItem('VScartProducts'));

    for(var i=0; i < allProducts.length; i++) {
      var productItem = '';
      productItem = '<div class="order-list-item"><article class="card2 card2-product-2 no-footer"><div class="card2-thumb"><a href="' + allProducts[i].productUrl + '" title="' + allProducts[i].productName + '"><div class="card-image"><div class="card-image-display" style="background-image: url(' + allProducts[i].productImage + ');"></div></div></a></div><div class="card2-content"><div class="card2-content-left"><a href="' + allProducts[i].productUrl + '" title="' + allProducts[i].productName + '"><h6 class="card2-product-heading">' + allProducts[i].productName + '</h6></a><p class="card2-product-id">' + allProducts[i].productId + '</p></div><div class="card2-content-right"><p>FREE</p></div></div></article></div>';

      var orderList = document.createElement('div');
      orderList.className = 'order-list';
      orderList.innerHTML = productItem;

      orderBody.forEach(function(elOrderBox, indexOrderBox) {
        elOrderBox.appendChild(orderList);
      });
    }
  }
}

function checkOrderEmpty() {
  var orderBox = document.querySelector('.section-order-right');

  if(globalFunction.domExists(orderBox)) {
    if(!globalFunction.checkLocalStorageItemExisted('VScartProducts')) {
      if(globalFunction.domExists(document.querySelector('.card-order-empty-cart'))) {
        document.querySelector('.card-order-empty-cart').classList.remove('is-off');
      }

      var orderBoxLeft = document.querySelector('.section-order-left');
      if(globalFunction.domExists(orderBoxLeft)) {
        orderBoxLeft.querySelector('.form-footer').classList.add('is-loading');
      }
    }
  }
}