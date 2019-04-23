window.addEventListener('scroll', function() {
  handleImagePreLoad();
});

handleImagePreLoad();

function handleImagePreLoad() {
  var imageCard = document.querySelectorAll('.card-image-preload');
  if(imageCard.length > 0) {
    imageCard.forEach(function (el) {
      if(globalFunction.isInViewport(el)) {
        if(!el.hasAttribute('style')) {
          var image = new Image();
          var srcImg = el.getAttribute('data-background-image');
          
          image.setAttribute('src', srcImg);
          image.onload = function () {
            el.style.backgroundImage = 'url('+srcImg+')';
            
            setTimeout(function() {
              el.classList.add('is-image-invew');
              el.closest('.card-image').querySelector('.preloadSpin').classList.add('is-hidden');
            }), 1500;
          };
        }
      }
    });
  }
}