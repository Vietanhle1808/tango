// trigger document ready
handleIEBrowser();
dropdownGlobal();

window.addEventListener('scroll', function() {
});

// trigger window onload
window.onload = function () {
  detectLoadpage();
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

    }, 66);
  }
}, false);


//================================================================================
function detectLoadpage() {
  document.body.classList.add('is-loaded');
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

function handleIEBrowser() {
  function customizeIE(isOpera, isFirefox, isSafari, isIE, isEdge, isChrome, isBlink) {
    if(isIE) {
      document.body.classList.add('ie-browser');
    }
  }
  globalFunction.detectBrowser(customizeIE);
}

