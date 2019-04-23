(function () {
  if (typeof NodeList.prototype.forEach === "function") return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

(function (ElementProto) {
  if (typeof ElementProto.matches !== 'function') {
    ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;
      while (elements[index] && elements[index] !== element) {
        ++index;
      }
      return Boolean(elements[index]);
    };
  }
  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      var element = this;
      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
      }
      return null;
    };
  }
})(window.Element.prototype);

var globalFunction = {
  checkLocalStorageItemExisted: function (name) {
    var localCollection = localStorage.getItem(name);
    localCollection = JSON.parse(localCollection);
    if (!localCollection) {
      return false;
    }

    return localCollection;
  },
  domExists: function (node) {
    return (node === document.body) ? false : document.body.contains(node);
  },
  checkValid: function(value, lengthCheck) {
    lengthCheck = true;

    if (typeof value !== 'undefined' && value !== null) {
      const stringValue = value.toString();
      if (typeof value === 'function' || typeof value === 'object') {
        if (lengthCheck) {
          return !(typeof value.length !== 'undefined' && value.length <= 0)
        }

        return true;
      }

      if (typeof (value) === 'boolean') {
        return value;
      }

      if (/\S/.test(stringValue) && !isNaN(stringValue)) {
        return true;
      }

      if (/\S/.test(stringValue)) {
        return true;
      }
    }

    return false;
  },
  postAjax: function (url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
      function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
      }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState > 3 && xhr.status == 200) {
        success(xhr.responseText);
      }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
  },
  postAjaxJson: function (url, data, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState > 3 && xhr.status == 200) {
        success(xhr.responseText);
      }
    };
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    return xhr;
  },
  getLatitudeLongitude: function (callback, address) {
    // If adress is not supplied, use default value 'Hanoi, USA, Canada'
    // address = address || 'Hanoi, USA, Canada';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({
        'address': address
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          callback(results[0]);
        }
      });
    }
  },
  getCloestLocation: function (callback, location) {
    var distFromCurrent = function (coord) {
      return {
        coord: coord,
        dist: geolib.getDistance(location, coord)
      };
    }

    var closest = allLocations.map(distFromCurrent).sort(function (a, b) {
      return a.dist - b.dist;
    })[0];

    callback(closest);
  },
  isInViewport: function (elements) {
    var scroll = window.scrollY || window.pageYOffset
    var boundsTop = elements.getBoundingClientRect().top + scroll

    var viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
    }

    var bounds = {
      top: boundsTop,
      bottom: boundsTop + elements.clientHeight,
    }

    return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
      (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
  },
  getSiblings: function (elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType !== 1 || sibling === elem) continue;
      siblings.push(sibling);
    }
    return siblings;
  },
  clearStateFormField: function (formBoxParam) {
    var errMsgBox = formBoxParam.querySelector('.error-message-box');
    var errMsgRow = errMsgBox.querySelectorAll('.error-message-row');
    var formGroup = formBoxParam.querySelectorAll('.form-group');

    formGroup.forEach(function (group) {
      group.childNodes.forEach(function (childGroup) {
        if (childGroup.classList) {
          if (childGroup.classList.contains('is-error')) {
            childGroup.classList.remove('is-error');
          }
        }
      });
    });

    errMsgBox.classList.remove('is-visible');
    errMsgRow.forEach(function (row) {
      row.classList.remove('is-visible');
    });
  },
  showSuccessFormField: function (formBoxParam) {
    var formBoxWrapper = formBoxParam.querySelector('.form-wrapper');
    var successBox = formBoxParam.querySelector('.success-message-box');
    var successBoxContent = successBox.querySelector('.success-message-box-content');
    var hSuccessContent = successBoxContent.getBoundingClientRect().height;

    formBoxWrapper.classList.add('email-sent-success');
    successBox.classList.add('is-visible');
    formBoxWrapper.style.maxHeight = hSuccessContent + 'px';
  },
  showErrorForm: function (error, formBoxParent) {
    var rowMsgError = error.element.dataset.msgError;

    error.element.classList.add('is-error');

    var errorMsgBox = formBoxParent.querySelectorAll('.error-message-box');
    if (errorMsgBox.length > 0) {
      errorMsgBox.forEach(function (elMsgBox) {
        elMsgBox.classList.add('is-visible');
      });
    }

    var errorMsgRow = formBoxParent.querySelectorAll('.error-message-row');
    if (errorMsgRow.length > 0) {
      errorMsgRow.forEach(function (elMsgRow) {
        elMsgRow.classList.forEach(function (className) {
          if (className === rowMsgError) {
            elMsgRow.classList.add('is-visible');
          }
        });
      });
    }
  },
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  showLoadingFormField: function (formBoxParam) {
    var loadingBox = formBoxParam.querySelector('.loading-box');
    loadingBox.classList.add('is-visible');
  },
  detectBrowser: function (callback) {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    callback(isOpera, isFirefox, isSafari, isIE, isEdge, isChrome, isBlink);
  },
  convertFileToDataURLviaFileReader: function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
};