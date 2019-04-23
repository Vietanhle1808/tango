handleValidationFormContact();
handleValidationFormOrder();
handleValidationProductInfo();

function handleValidationFormContact() {
    var formContact = document.querySelectorAll('form[name="contactForm"]');
    if (formContact.length > 0) {
        formContact.forEach(function (elFormContact) {
            var failMsgBox = elFormContact.closest('.form-box').querySelector('.fail-message-box');
            if (globalFunction.domExists(failMsgBox)) {
                failMsgBox.style.display = "none";
            }
        });
        var fieldName = document.querySelector('#field-form-name');
        var fieldEmail = document.querySelector('#field-form-email');
        var fieldInterest = document.querySelector('#field-form-interest');
        var fieldAddress = document.querySelector('#field-form-address');
        var fieldCity = document.querySelector('#field-form-city');
        var fieldState = document.querySelector('#field-form-state');
        var fieldZipcode = document.querySelector('#field-form-zipcode');
        var fieldCountry = document.querySelector('#field-form-country');
        var fieldMessage = document.querySelector('#field-form-message');
        var fieldSubscribe = document.querySelector('#agree-checkbox');
        var fieldDomain = document.querySelector('#domain');
        var fieldApiUrl = document.querySelector('#apiUrl');

        var validator = new FormValidator('contactForm', [{
            name: 'field-form-name',
            rules: 'required'
        }, {
            name: 'field-form-email',
            rules: 'required|valid_email'
        }], function (errors, evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                event.returnValue = false;
            }

            //get data from field
            var fieldNameValue = fieldName.value;
            var fieldEmailValue = fieldEmail.value;
            var fieldInterestValue = fieldInterest.options[fieldInterest.selectedIndex].value;
            var fieldAddressValue = fieldAddress.value;
            var fieldCityValue = fieldCity.value;
            var fieldStateValue = fieldState.value;
            var fieldZipcodeValue = fieldZipcode.value;
            var fieldCountryValue = fieldCountry.options[fieldCountry.selectedIndex].value;
            var fieldMessageValue = fieldMessage.value;
            var fieldSubscribeValue = fieldSubscribe.checked;
            var fieldDomainValue = fieldDomain.value;
            var apiUrl = fieldApiUrl.value;

            var formBox = validator.form.closest('.form-box');

            var errorMsgRow = document.querySelectorAll('.error-message-row');
            if (errorMsgRow.length > 0) {
                errorMsgRow.forEach(function (elMsgRow) {
                    elMsgRow.classList.remove('is-visible');
                });
            }

            formContact.forEach(function (elForm) {
                elForm.querySelectorAll('.form-group input').forEach(function (elInput) {
                    elInput.classList.remove('is-error');
                });
            });

            if (errors.length > 0) {
                // Show the errors
                errors.forEach(function (elError) {
                    globalFunction.showErrorForm(elError, formBox);
                });

            } else {
                var btnSubmit = this.form.querySelector('button[type="submit"]');
                var successMsgBox = this.form.closest('.form-box').querySelector('.success-message-box');
                var successMsgBoxContent = this.form.closest('.form-box').querySelector('.success-message-box-content');
                var errorMsgBox = this.form.closest('.form-box').querySelector('.error-message-box');
                var loadingBox = this.form.closest('.form-box').querySelector('.loading-box');
                var formWrapper = this.form.closest('.form-wrapper');

                var sectionIntroHeader = document.querySelector('.introduce-header');
                var sectionIntroBody = document.querySelector('.introduce-body');

                errorMsgBox.classList.remove('is-visible');
                btnSubmit.closest('.form-footer').classList.add('is-loading');
                loadingBox.classList.add('is-visible');

                var heightMsgSuccessContent = successMsgBoxContent.getBoundingClientRect().height;

                globalFunction.postAjaxJson(apiUrl, {
                    Domain: fieldDomainValue,
                    CustomerName: fieldNameValue,
                    Email: fieldEmailValue,
                    TypeOfCustomer: fieldInterestValue,
                    Address: fieldAddressValue,
                    City: fieldCityValue,
                    State: fieldStateValue,
                    ZipCode: fieldZipcodeValue,
                    Country: fieldCountryValue,
                    Message: fieldMessageValue,
                    Subscription: fieldSubscribeValue
                }, function (data) {
                    var rawdata = JSON.parse(data);
                    var response = JSON.parse(rawdata.d);
                    loadingBox.classList.remove('is-visible');
                    if (response.success != undefined && response.success === true) {
                        btnSubmit.closest('.form-footer').classList.remove('is-loading');
                        formBox.querySelector('.error-500').style.display = "none";
                        formBox.querySelector('.fail-message-box').style.display = "none";
                        formWrapper.classList.add('email-sent-success');
                        successMsgBox.classList.add('is-visible');
                        formWrapper.style.maxHeight = heightMsgSuccessContent + 'px';

                        if (globalFunction.domExists(sectionIntroHeader)) {
                            if (!sectionIntroHeader.classList.contains('is-inview')) {
                                sectionIntroHeader.classList.add('is-inview');
                            }
                        }

                        if (globalFunction.domExists(sectionIntroBody)) {
                            if (!sectionIntroBody.classList.contains('is-inview')) {
                                sectionIntroBody.classList.add('is-inview');
                            }
                        }
                        //reset form field
                        fieldName.value = '';
                        fieldEmail.value = '';
                        fieldInterest.value = '';
                        fieldAddress.value = '';
                        fieldCity.value = '';
                        fieldState.value = '';
                        fieldZipcode.value = '';
                        fieldCountry.value = '';
                        fieldMessage.value = '';
                        fieldSubscribe.checked = false;
                    } else {
                        formBox.querySelector('.error-500').style.display = "block";
                        formBox.querySelector('.fail-message-box').style.display = "block";
                        btnSubmit.closest('.form-footer').classList.remove('is-loading');
                    }
                });

                // globalFunction.postAjax('https://hooks.zapier.com/hooks/catch/3413284/avr4wy/', {
                //     name: fieldNameValue,
                //     email: fieldEmailValue,
                //     interest: fieldInterestValue,
                //     address: fieldAddressValue,
                //     city: fieldCityValue,
                //     state: fieldStateValue,
                //     zipcode: fieldZipcodeValue,
                //     country: fieldCountryValue,
                //     message: fieldMessageValue,
                //     subscribe: fieldSubscribeValue
                // }, function (data) {
                //     var dataResponse = JSON.parse(data);
                //     //if (dataResponse.status === 'success') {
                //     //  btnSubmit.closest('.form-footer').classList.remove('is-loading');
                //     //  formWrapper.classList.add('email-sent-success');
                //     //  successMsgBox.classList.add('is-visible');
                //     //  formWrapper.style.maxHeight = heightMsgSuccessContent + 'px';

                //     //  if (globalFunction.domExists(sectionIntroHeader)) {
                //     //    if (!sectionIntroHeader.classList.contains('is-inview')) {
                //     //      sectionIntroHeader.classList.add('is-inview');
                //     //    }
                //     //  }

                //     //  if (globalFunction.domExists(sectionIntroBody)) {
                //     //    if (!sectionIntroBody.classList.contains('is-inview')) {
                //     //      sectionIntroBody.classList.add('is-inview');
                //     //    }
                //     //  }

                //     //  //reset form field
                //     //  fieldName.value        = '';
                //     //  fieldEmail.value       = '';
                //     //  fieldInterest.value    = '';
                //     //  fieldAddress.value     = '';
                //     //  fieldCity.value        = '';
                //     //  fieldState.value       = '';
                //     //  fieldZipcode.value     = '';
                //     //  fieldCountry.value     = '';
                //     //  fieldMessage.value     = '';
                //     //  fieldSubscribe.checked = false;

                //     //  loadingBox.classList.remove('is-visible');
                //     //}
                // });
            }
        });
    }
}

function handleValidationFormOrder() {
    var formOrder = document.querySelector('form[name="orderForm"]');

    if (globalFunction.domExists(formOrder)) {
        var fieldName = document.querySelector('#field-form-name');
        var fieldEmail = document.querySelector('#field-form-email');
        var fieldCompany = document.querySelector('#field-form-company');
        var fieldFormAddress = document.querySelector('#field-form-address');
        var fieldFormCity = document.querySelector('#field-form-city');
        var fieldDistrict = document.querySelector('#field-form-district');
        var fieldZipcode = document.querySelector('#field-form-zipcode');
        var fieldPhone = document.querySelector('#field-form-phone');
        var fieldApiUrl = document.querySelector('#apiUrl');
        var validator = new FormValidator('orderForm', [{
            name: 'field-form-name',
            rules: 'required'
        }, {
            name: 'field-form-email',
            rules: 'required|valid_email'
        }, {
            name: 'field-form-phone',
            rules: 'required'
        }], function (errors, evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                event.returnValue = false;
            }

            var currentForm = this.form;
            var errorMsgBox = currentForm.closest('.form-box').querySelector('.error-message-box');
            var successMsgBox = currentForm.closest('.form-box').querySelector('.success-message-box');
            var btnSubmit = currentForm.closest('.form-box').querySelector('button[type="submit"]');
            var loadingBox = currentForm.closest('.form-box').querySelector('.loading-box');
            var dataRidirect = currentForm.getAttribute('data-redirect');

            var userBillingInfo = [];
            var objTempUserInfo = {};

            //get data from field
            var fieldNameValue = fieldName.value;
            var fieldEmailValue = fieldEmail.value;
            var fieldCompanyValue = fieldCompany.value;
            var fieldFormAddressValue = fieldFormAddress.value;
            var fieldFormCityValue = fieldFormCity.value;
            var fieldDistrictValue = fieldDistrict.value;
            var fieldZipcodeValue = fieldZipcode.value;
            var fieldPhoneValue = fieldPhone.value;
            var apiUrl = fieldApiUrl.value;

            //data url paypal
            // var urlPaypal = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&return=http://us.vicostone.com&business=tungda-facilitator@smartosc.com';

            errorMsgBox.classList.remove('is-visible');
            errorMsgBox.querySelectorAll('.error-message-row').forEach(function (elMsg) {
                elMsg.classList.remove('is-visible');
            });
            
            var allInput = currentForm.querySelectorAll('input');
            allInput.forEach(function (input) {
                input.classList.remove('is-error');
            });


            if (errors.length > 0) {
                // show errors
                errorMsgBox.classList.add('is-visible');
                errors.forEach(function (elError) {
                    var rowMsgError = elError.element.dataset.msgError;
                    errorMsgBox.querySelectorAll('.error-message-row').forEach(function (elMsg) {
                        elMsg.classList.forEach(function (className) {
                            if (className === rowMsgError) {
                                elMsg.classList.add('is-visible');
                            }
                        });
                    });

                    elError.element.classList.add('is-error');
                });
            } else {
                objTempUserInfo.name = fieldNameValue;
                objTempUserInfo.email = fieldEmailValue;
                objTempUserInfo.company = fieldCompanyValue;
                objTempUserInfo.address = fieldFormAddressValue;
                objTempUserInfo.city = fieldFormCityValue;
                objTempUserInfo.district = fieldDistrictValue;
                objTempUserInfo.zipcode = fieldZipcodeValue;
                objTempUserInfo.phoneNumber = fieldPhoneValue;
                userBillingInfo.push(objTempUserInfo);

                btnSubmit.closest('.form-footer').classList.add('is-loading');
                loadingBox.classList.add('is-visible');
                var listProductID = [];
                var allProducts = [];
                var tpmStrOrder = '';

                if (globalFunction.checkLocalStorageItemExisted('VScartProducts')) {
                    allProducts = localStorage.getItem('VScartProducts');
                    if (allProducts.length > 0) {
                        allProducts = JSON.parse(allProducts);
                        // console.log(allProducts);
                        for (var i = 0; i < allProducts.length; i++) {
                            listProductID.push(allProducts[i].productId);

                            var paramOrderURL = '';
                            paramOrderURL = '&item_name_' + (i + 1) + '=' + allProducts[i].productName + '&amount_' + (i + 1) + '=1&quantity_' + (i + 1) + '=1';
                            tpmStrOrder += paramOrderURL;
                        }
                    }
                }
                // console.log(tpmStrOrder);

                globalFunction.postAjaxJson(apiUrl, {
                    FullName: fieldNameValue,
                    Email: fieldEmailValue,
                    CompanyName: fieldCompanyValue,
                    Address: fieldFormAddressValue,
                    City: fieldFormCityValue,
                    State: fieldDistrictValue,
                    ZipCode: fieldZipcodeValue,
                    Phone: fieldPhoneValue,
                    Products: JSON.stringify(listProductID)
                }, function (data) {
                    var rawdata = JSON.parse(data);
                    var response = JSON.parse(rawdata.d);
                    // console.log(rawdata);
                    // console.log(response);
                    if (response.success != undefined && response.success === true) {
                        urlPaypal += '?orderid=' + response.id + tpmStrOrder;

                        if (globalFunction.checkLocalStorageItemExisted('VSuserBillingInfo')) {
                            localStorage.removeItem('VSuserBillingInfo');
                            localStorage.setItem('VSuserBillingInfo', JSON.stringify(userBillingInfo));
                        } else {
                            localStorage.setItem('VSuserBillingInfo', JSON.stringify(userBillingInfo));
                        }

                        localStorage.removeItem('VScartProducts');

                        btnSubmit.closest('.form-footer').classList.remove('is-loading');
                        // successMsgBox.classList.add('is-visible');
                        loadingBox.classList.remove('is-visible');

                        window.location.replace(urlPaypal);
                        // window.location.replace(dataRidirect);
                    }
                });

                globalFunction.postAjax('https://hooks.zapier.com/hooks/catch/3413284/wyx7eh/', {
                    name: fieldNameValue,
                    email: fieldEmailValue,
                    company: fieldCompanyValue,
                    address: fieldFormAddressValue,
                    city: fieldFormCityValue,
                    district: fieldDistrictValue,
                    zipcode: fieldZipcodeValue,
                    phoneNumber: fieldPhoneValue,
                    products: JSON.stringify(listProductID)
                }, function (data) {
                    var dataResponse = JSON.parse(data);
                    if (dataResponse.status === 'success') {
                        //if (globalFunction.checkLocalStorageItemExisted('VSuserBillingInfo')) {
                        //    localStorage.removeItem('VSuserBillingInfo');
                        //    localStorage.setItem('VSuserBillingInfo', JSON.stringify(userBillingInfo));
                        //} else {
                        //    localStorage.setItem('VSuserBillingInfo', JSON.stringify(userBillingInfo));
                        //}

                        //localStorage.removeItem('VScartProducts');

                        //btnSubmit.closest('.form-footer').classList.remove('is-loading');
                        //successMsgBox.classList.add('is-visible');
                        //loadingBox.classList.remove('is-visible');

                        //window.location.replace(dataRidirect);
                    }
                });
            }
        });
    }
}

function handleValidationProductInfo() {
    var formProductInfo = document.querySelector('form[name="infoProductForm"]');

    if (globalFunction.domExists(formProductInfo)) {
        var validator = new FormValidator('infoProductForm', [{
            name: 'infoProduct-field-form-name',
            rules: 'required'
        }, {
            name: 'infoProduct-field-form-email',
            rules: 'required|valid_email'
        }], function (errors, evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                event.returnValue = false;
            }

            var formBox = validator.form.closest('.form-box');
            globalFunction.clearStateFormField(formBox);

            if (errors.length > 0) {
                // Show the errors
                errors.forEach(function (elError) {
                    globalFunction.showErrorForm(elError, formBox);
                });

            } else {
                var fieldDomainValue = formProductInfo.querySelector('#domain-sent-to-me').value;
                var fieldProductValue = formProductInfo.querySelector('#product').value;
                var fieldNameValue = formBox.querySelector('#infoProduct-field-form-name').value;
                var fieldEmailValue = formBox.querySelector('#infoProduct-field-form-email').value;

                var apiURL = formBox.querySelector('form').getAttribute('apiURL');
                var loadingBox = formBox.querySelector('.loading-box');

                var modalContent = formBox.closest('.modal-content');
                var modalContentHeaderText = modalContent.querySelector('.msg-heading-info');
                var modalMsgEmailSent = modalContent.querySelector('.msg-email-sent-info');
                var failMsgBox = formBox.querySelector('.fail-message-box');

                loadingBox.classList.add('is-visible');

                // get img product
                var imageProductBox = document.querySelector('.img-send-email');
                var imgBase64 = '';
                if (globalFunction.domExists(imageProductBox)) {
                    imgProduct = imageProductBox.getAttribute('data-img-send-email');
                    handleApiCallProductInfo(fieldDomainValue, fieldProductValue, fieldNameValue, fieldEmailValue, imgProduct);
                } else {
                    handleApiCallProductInfo(fieldDomainValue, fieldProductValue, fieldNameValue, fieldEmailValue, '');
                }

                function handleApiCallProductInfo(domainValue, productValue, nameValue, emailValue, imgValue) {
                    globalFunction.postAjaxJson(apiURL, {
                        Domain: domainValue,
                        Product: productValue,
                        Name: nameValue,
                        Email: emailValue,
                        Image: imgValue
                    }, function (data) {
                        var rawdata = JSON.parse(data);
                        var response = JSON.parse(rawdata.d);
                        // console.log(rawdata);
                        // console.log(response);
                        if (response.success !== undefined && response.success === true) {
                            // api call successful
                            modalContentHeaderText.classList.add('is-off');
                            modalMsgEmailSent.classList.remove('is-off');
                            loadingBox.classList.remove('is-visible');
                            failMsgBox.style.display = 'none';

                            globalFunction.showSuccessFormField(formBox);
                        } else {
                            failMsgBox.style.display = 'block';
                            loadingBox.classList.remove('is-visible');
                        }
                    });
                }
            }
        });
    }
}