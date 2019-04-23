toggleArticleLogin();
handleFormSignIn();
handleFormRegister();
handleFormForgotPassword();
handleUserLogout();

function toggleArticleLogin() {
  var btnToggleArticle = document.querySelectorAll('.toggle-article');

  if (btnToggleArticle.length > 0) {
    for (var i = 0; i < btnToggleArticle.length; i++) {
      btnToggleArticle[i].addEventListener('click', function(e) {
        var _button = e.target;
        e.preventDefault();

        var targetShow = document.querySelector(_button.getAttribute('data-target-show'));
        var targetHide = document.querySelector(_button.getAttribute('data-target-hide'));

        if (targetShow && targetHide) {
          targetHide.classList.remove('is-visible');

          setTimeout(function() {
            targetShow.classList.add('is-visible');
          }, 300);
        } else if (targetShow && targetHide == null) {
          var articleShowing = _button.closest('.section-login').querySelector('article.is-visible');
          if (articleShowing) {
            articleShowing.classList.remove('is-visible');

            setTimeout(function() {
              targetShow.classList.add('is-visible');
            }, 300);
          }
        }
      }, false);
    }
  }
}

function handleFormSignIn() {
  var formSignIn = document.querySelector('form[name="signinForm"]');
  
  if (globalFunction.domExists(formSignIn)) {
    formSignIn.closest('.form-box').querySelector('.fail-message-box').style.display = "none";

    var fieldSignInEmail = document.querySelector('#signin-field-form-email');
    var fieldSignInPassword = document.querySelector('#signin-field-form-password');
    var fieldApiUrlSignIn = document.querySelector('#apiUrlSignIn');

    var validatorSignIn = new FormValidator('signinForm', [{
      name: 'signin-field-form-password',
      rules: 'required'
    }, {
      name: 'signin-field-form-email',
      rules: 'required|valid_email'
    }], function (errors, evt) {
      if (evt && evt.preventDefault) {
        evt.preventDefault();
      } else if (event) {
        event.returnValue = false;
      }
      
      var formBox = validatorSignIn.form.closest('.form-box');
      var dataRidirect = validatorSignIn.form.getAttribute('data-redirect');
      var valueSignInEmail = fieldSignInEmail.value;
      var valueSignInPassword = fieldSignInPassword.value;

      globalFunction.clearStateFormField(formBox);

      if (errors.length > 0) {
        // Show the errors
        errors.forEach(function (elError) {
          globalFunction.showErrorForm(elError, formBox);
        });

      } else {
        // form fields valid
        globalFunction.showLoadingFormField(formBox);

        globalFunction.postAjaxJson(fieldApiUrlSignIn.value, {
          // params body
            UserName: valueSignInEmail,
            Password: valueSignInPassword
        }, function (data) {
            var response = JSON.parse(data);
            formBox.querySelector('.loading-box').classList.remove('is-visible');
            if (response.Status == 200) {
                globalFunction.setCookie("UserName", response.Result.UserName, 7);
                globalFunction.setCookie("TypeOfCustomer", response.Result.TypeOfCustomer, 7);
                globalFunction.setCookie("AuthenticatedAccessToken", response.Result.AuthenticatedAccessToken, 7);
                window.location.replace(dataRidirect);
            } else {
                if (response.Status == 400) {
                    formBox.querySelector('.error-400').style.display = "";
                    formBox.querySelector('.error-500').style.display = "none";
                    formBox.querySelector('.fail-message-box').style.display = "block";
                } else {
                    formBox.querySelector('.error-400').style.display = "none";
                    formBox.querySelector('.error-500').style.display = "";
                    formBox.querySelector('.fail-message-box').style.display = "block";
                }                
            }          
        });
      }
    });
  }
}

function handleFormRegister() {
  var formRegister = document.querySelector('form[name="registerForm"]');
  
  if (globalFunction.domExists(formRegister)) {
    formRegister.closest('.form-box').querySelector('.fail-message-box').style.display = "";

    var validator = new FormValidator('registerForm', [{
      name: 'register-field-form-name',
      rules: 'required'
    }, {
      name: 'register-field-form-password',
      rules: 'required'
    }, {
      name: 'register-field-form-email',
      rules: 'required|valid_email'
    }], function (errors, evt) {
      if (evt && evt.preventDefault) {
        evt.preventDefault();
      } else if (event) {
        event.returnValue = false;
      }
      
      var formBox = validator.form.closest('.form-box');
      // var dataRidirect = validator.form.getAttribute('data-redirect');

      globalFunction.clearStateFormField(formBox);

      if (errors.length > 0) {
        // Show the errors
        errors.forEach(function (elError) {
          globalFunction.showErrorForm(elError, formBox);
        });

      } else {
        // form fields valid
        document.querySelector('article.article-register').classList.remove('is-visible');
        setTimeout(function() {
          document.querySelector('article.article-register-continue').classList.add('is-visible');
        }, 300);
      }
    });
  }

  // handle click to btn go to account after register finish
  var btnGoToAccount = document.querySelector('.button-go-to-account');
  if(globalFunction.domExists(btnGoToAccount)) {
    var fieldApiUrlRegister = document.querySelector('#apiUrlRegister');
    var fieldRegisEmail     = document.querySelector('#register-field-form-email');
    var fieldRegisName      = document.querySelector('#register-field-form-name');
    var fieldRegisPassword  = document.querySelector('#register-field-form-password');
    var fieldRegisPhone     = document.querySelector('#register-continue-field-form-phone');
    var fieldRegisRole      = document.querySelector('#register-continue-field-form-role');
    var fieldRegisCompany   = document.querySelector('#register-continue-field-form-company');

    btnGoToAccount.addEventListener('click', function(event) {
      event.preventDefault();
      var _this              = this;
      
      var formBox            = _this.closest('.form-box');
      var dataRidirect       = _this.closest('form[name="register-continueForm"]').getAttribute('data-redirect');
      var valueRegisEmail    = fieldRegisEmail.value;
      var valueRegisName     = fieldRegisName.value;
      var valueRegisPassword = fieldRegisPassword.value;
      var valueRegisPhone    = fieldRegisPhone.value;
      var valueRegisRole     = fieldRegisRole.options[fieldRegisRole.selectedIndex].value;
      var valueRegisCompany  = fieldRegisCompany.value;

      globalFunction.showLoadingFormField(formBox);

      globalFunction.postAjax(fieldApiUrlRegister.value, {
        // params body
          FirstName: valueRegisName,
          Email: valueRegisEmail,
          Password: valueRegisPassword,
          Phone: valueRegisPhone,
          TypeOfCustomer: valueRegisRole,
          CompanyName: valueRegisCompany
      }, function (data) {
          var response = JSON.parse(data);
          formBox.querySelector('.loading-box').classList.remove('is-visible');
          if (response.Status == 200) {
              globalFunction.setCookie("UserName", response.Result.UserName, 7);
              globalFunction.setCookie("TypeOfCustomer", response.Result.TypeOfCustomer, 7);
              globalFunction.setCookie("AuthenticatedAccessToken", response.Result.AuthenticatedAccessToken, 7);
              window.location.replace(dataRidirect);
          } else {
              if (response.Status == 400) {
                  formBox.querySelector('.error-400').style.display = "";
                  formBox.querySelector('.error-500').style.display = "none";
                  formBox.querySelector('.fail-message-box').style.display = "block";
              } else {
                  formBox.querySelector('.error-400').style.display = "none";
                  formBox.querySelector('.error-500').style.display = "";
                  formBox.querySelector('.fail-message-box').style.display = "block";
              }     
          }           
      });
    });
  }
}

function handleFormForgotPassword() {
  var formForgotPassword = document.querySelector('form[name="password-reminderForm"]');
  
  if (globalFunction.domExists(formForgotPassword)) {
    formForgotPassword.closest('.form-box').querySelector('.fail-message-box').style.display = "";

    var fieldForgotPassword = document.querySelector('#password-reminder-field-form-email');
    var fieldApiUrlForgotPassword = document.querySelector('#apiUrlForgotPassword');

    var validatorSignIn = new FormValidator('password-reminderForm', [{
      name: 'password-reminder-field-form-email',
      rules: 'required|valid_email'
    }], function (errors, evt) {
      if (evt && evt.preventDefault) {
        evt.preventDefault();
      } else if (event) {
        event.returnValue = false;
      }
      
      var formBox = validatorSignIn.form.closest('.form-box');
      var dataRidirect = validatorSignIn.form.getAttribute('data-redirect');
      var valueForgotPassword = fieldForgotPassword.value;

      globalFunction.clearStateFormField(formBox);

      if (errors.length > 0) {
        // Show the errors
        errors.forEach(function (elError) {
          globalFunction.showErrorForm(elError, formBox);
        });

      } else {
        // form fields valid
        globalFunction.showLoadingFormField(formBox);

        globalFunction.postAjax(fieldApiUrlForgotPassword.value, {
          // params body
            UserName: valueForgotPassword
        }, function (data) {
            var response = JSON.parse(data);
            formBox.querySelector('.loading-box').classList.remove('is-visible');
            formBox.querySelector('.success-message-sent').style.display = "";
            if (response.Status == 200) {
                formBox.querySelector('.success-message-sent').style.display = "block";
            } else {
                if (response.Status == 400) {
                    formBox.querySelector('.error-400').style.display = "";
                    formBox.querySelector('.error-500').style.display = "none";
                    formBox.querySelector('.error-402').style.display = "none";
                    formBox.querySelector('.fail-message-box').style.display = "block";
                } else if (response.Status == 402) {
                    formBox.querySelector('.error-400').style.display = "none";
                    formBox.querySelector('.error-500').style.display = "none";
                    formBox.querySelector('.error-402').style.display = "";
                    formBox.querySelector('.fail-message-box').style.display = "block";
                } else {
                    formBox.querySelector('.error-400').style.display = "none";
                    formBox.querySelector('.error-500').style.display = "";
                    formBox.querySelector('.error-402').style.display = "none";
                    formBox.querySelector('.fail-message-box').style.display = "block";
                }
            }       
        });
      }
    });
  }
}

function handleUserLogout() {
  var btnLogout = document.querySelectorAll('.btn-user-logout');

  if(btnLogout.length > 0) {
    btnLogout.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();

        var _this = this;
        var dataRedirect = _this.getAttribute('data-redirect');
        var apiLogout = _this.getAttribute('data-api-logout');
        globalFunction.setCookie("UserName", "", 0);
        globalFunction.setCookie("TypeOfCustomer", "", 0);
        globalFunction.setCookie("AuthenticatedAccessToken", "", 0);
        window.location.replace(dataRedirect);
      });
    });
  }
}