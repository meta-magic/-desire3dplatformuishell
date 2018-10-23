"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var SignupComponent = (function () {
    function SignupComponent(http, signupservice, loaderService, _notificationService, router, document) {
        this.http = http;
        this.signupservice = signupservice;
        this.loaderService = loaderService;
        this._notificationService = _notificationService;
        this.router = router;
        this.document = document;
        this.check = false;
        this.previousButton = true;
        this.nextButton = false;
        this.agree = false;
        this.paymentAgree = false;
        this.codepipeline = true;
        this.isEnterprise = false;
        this.messageArray = [];
        this.isUserValidate = true;
        this.userCreated = false;
        this.isLoading = false;
        this.validationMsgArray = [];
        this.isValidateForm = false;
        this.activeStep = new ActiveSteps();
        this.signupservice.setSteps(this.activeStep);
        this.headerName = 'Developer Info';
        this.nextButtonLabel = 'Next';
        this.nextBtnIcon = 'fa fa-arrow-right';
        this.userSignupModel = new UserSignupModel();
        this.userSignupModel.developerType = '1';
        this.userSignupModel.product = '1';
        this.userSignupModel.genderId = '2';
        this.userSignupModel.licenseType = '1';
        this.userSignupModel.salutationId = '3';
        this.onResize(null);
        this.amexiotechmenus = [
            {
                text: 'Products',
                icon: 'fa fa-snowflake-o fa-fw',
                submenus: [
                    {
                        text: 'Amexio API',
                        link: 'https://amexio.tech/amexio-api'
                    },
                    {
                        text: 'Amexio Canvas',
                        link: 'https://amexio.tech/amexio-canvas'
                    },
                    {
                        text: 'Amexio Colors',
                        link: 'https://amexio.tech/amexio-colors'
                    }
                ]
            },
            {
                text: 'Start Using',
                icon: 'fa fa-television fa-fw',
                submenus: [
                    {
                        text: 'Component Example',
                        link: 'http://amexio.org/demo/se/v4.1/index.html#/home'
                    },
                    {
                        text: 'Pricing',
                        link: 'https://amexio.tech/pricing'
                    },
                    {
                        text: 'Downloads',
                        link: 'https://amexio.tech/download'
                    },
                    {
                        text: 'Subscribe',
                        link: 'https://canvas.amexio.org/signup/'
                    },
                    {
                        text: 'Canvas Login (Beta)',
                        link: 'https://canvas.amexio.org/'
                    },
                    {
                        text: 'License and Other Docs',
                        link: 'https://amexio.tech/license-and-other-docs-1'
                    }
                ]
            },
            {
                text: 'Training',
                icon: 'fa fa-user fa-fw',
                submenus: [
                    {
                        text: 'Amexio Training',
                        link: 'http://metaarivu.com/amexio-training'
                    }
                ]
            },
            {
                text: 'Engage',
                icon: 'fa fa-envelope fa-fw',
                submenus: [
                    {
                        text: 'Events',
                        link: 'https://metamagicglobal.com/events'
                    },
                    {
                        text: 'Forums',
                        link: 'http://forum.metamagicglobal.com/'
                    },
                    {
                        text: 'Blogs',
                        link: 'http://blog.metamagicglobal.com/'
                    },
                    {
                        text: 'Node Package Manager',
                        link: 'https://www.npmjs.com/package/amexio-ng-extensions'
                    },
                    {
                        text: 'GitHub - Source Code',
                        link: 'https://github.com/meta-magic/amexio.github.io'
                    }
                ]
            },
            {
                text: 'About Us',
                icon: 'fa fa-address-book-o fa-fw',
                submenus: [
                    {
                        text: 'Contact',
                        link: 'https://metamagicglobal.com/contact'
                    },
                    {
                        text: 'Company',
                        link: 'http://www.metamagicglobal.com/company'
                    },
                    {
                        text: 'MetaMagic',
                        link: 'https://www.metamagicglobal.com/'
                    }
                ]
            }
        ];
    }
    SignupComponent.prototype.ngOnInit = function () { };
    SignupComponent.prototype.externalLink = function (event) {
        if (event.data.node.link)
            //this.document.location.href=event.data.node.link;
            window.open(event.data.node.link, '_blank');
    };
    SignupComponent.prototype.onHomeClick = function () {
        this.router.navigate(['login']);
    };
    SignupComponent.prototype.onResize = function (event) {
        if (window.innerWidth <= 320) {
            this.height = 250;
        }
        else if (window.innerWidth > 320 && window.innerWidth <= 450) {
            if (window.innerWidth == 412) {
                this.height = 290;
            }
            else {
                this.height = 260;
            }
        }
        else if (window.innerWidth > 450 && window.innerWidth <= 600) {
            this.height = 500;
        }
        else if (window.innerWidth > 600 && window.innerWidth <= 767) {
            this.height = 560;
        }
        else if (window.innerWidth > 767 && window.innerWidth <= 799) {
            this.height = 700;
        }
        else if (window.innerWidth > 799 && window.innerWidth <= 959) {
        }
        else if (window.innerWidth > 959 && window.innerWidth <= 1024) {
            this.height = 980;
        }
        else if (window.innerWidth > 1024 &&
            window.innerWidth <= 1280 &&
            window.innerHeight == 800) {
            this.height = 480;
        }
        else if (window.innerWidth > 1024 &&
            window.innerWidth <= 1280 &&
            window.innerHeight == 950) {
            this.height = 600;
        }
        else if (window.innerWidth > 1280 && window.innerWidth <= 1302) {
            this.height = 350;
        }
    };
    SignupComponent.prototype.onTitleSelect = function (data) {
        if (data && data.salutationId) {
            var t = data.salutationId + "";
            if (t == "2" || t == "1") {
                this.userSignupModel.genderId = "1";
            }
            else {
                this.userSignupModel.genderId = "2";
            }
        }
    };
    // Address Details UI Methods
    SignupComponent.prototype.onCountrySelect = function (data) {
        if (data.countryId) {
            this.getStateData(data.countryId);
        }
    };
    // To Close Window
    SignupComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
    };
    //USED WHEN STATE DROPDOWN CHANGE
    SignupComponent.prototype.onStateSelect = function (data) {
        // if (data.stateId) {
        //   this.getCityData(data.stateId);
        // }
    };
    SignupComponent.prototype.getStateData = function (countryId) {
        var _this = this;
        var stateResponse;
        this.http
            .get('/api/user/insecure/State/findByCountryId?countryId=' + countryId)
            .subscribe(function (response) {
            stateResponse = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.stateData = stateResponse.response;
        });
    };
    SignupComponent.prototype.getCityData = function (stateId) {
        var _this = this;
        var cityResponse;
        this.http
            .get('/api/user/insecure/City/findByStateId?stateId=' + stateId)
            .subscribe(function (response) {
            cityResponse = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.cityData = cityResponse.response;
        });
    };
    // SELECT ON PRODUCT CHECK CLICK
    SignupComponent.prototype.onProductCheck = function (data) {
        if (data.product) {
            this.userSignupModel.product = data.product;
        }
    };
    //Checkbox click event
    SignupComponent.prototype.onCheckClick = function (agree) {
        if (agree) {
            this.agree = true;
            this.nextButton = false;
        }
    };
    //On AGREE CLICK OF PAYEMNT GATEWAY
    SignupComponent.prototype.onAgreeClick = function (agree) {
        if (agree) {
            this.nextButton = false;
        }
        else {
            this.nextButton = true;
        }
    };
    // PREVIOUS BUTTON CLICK
    SignupComponent.prototype.previousClick = function () {
        var activStepName = this.signupservice.getActiveStepbox();
        if (activStepName == 'license') {
            this.setStepActiveFlag(true, false, false);
            this.previousButton = false;
            this.headerName = 'Developer Info';
            this.nextButton = false;
            this.nextButtonLabel = 'Next';
            this.nextBtnIcon = 'fa fa-arrow-right';
        }
        else if (activStepName == 'payment') {
            this.setStepActiveFlag(false, true, false);
            this.headerName = 'Payment Details';
            this.nextButton = false;
            this.previousButton = false;
            this.nextButtonLabel = 'Next';
            this.nextBtnIcon = 'fa fa-arrow-right';
        }
    };
    SignupComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    SignupComponent.prototype.createInvalidCompErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Invalid Component', errorData);
    };
    // NEXT BUTTON CLICK
    SignupComponent.prototype.nextClick = function () {
        var activStepName = this.signupservice.getActiveStepbox();
        if (activStepName == 'subscription') {
            this.validateFormFields();
            if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
                // this.isValidateForm = true;
                this.createInvalidCompErrorData();
            }
            else {
                // this.isValidateForm = false;
                if (this.userSignupModel.loginId != this.confirmLoginId) {
                    this.messageArray.push('Please enter correct login id.');
                    // this.isUserValidate = false;
                    this._notificationService.showWarningData(this.messageArray);
                }
                else {
                    this.userValidate();
                    //     this.setStepActiveFlag(false,false,true);
                }
            }
        }
        else if (activStepName == 'license') {
            this.setStepActiveFlag(false, false, true);
            this.headerName = 'Payment Details';
            this.nextButtonLabel = 'Submit';
            this.nextBtnIcon = 'fa fa-save';
        }
        else if (activStepName == 'payment') {
            this.isLoading = true;
            this.nextButton = false;
            this.previousButton = false;
            this.saveData();
        }
    };
    //Validate Form Fields
    SignupComponent.prototype.validateFormFields = function () {
        var isValid = false;
        this.validationMsgArray = [];
        if (this.userSignupModel.salutationId == '') {
            this.validationMsgArray.push('Invalid (Blank) Title.');
        }
        if (this.userSignupModel.firstName == '') {
            this.validationMsgArray.push('Invalid (Blank) First Name.');
        }
        if (this.userSignupModel.lastName == '') {
            this.validationMsgArray.push('Invalid (Blank) Last Name.');
        }
        if (this.userSignupModel.dateOfBirth == null) {
            this.validationMsgArray.push('Invalid Date Of Birth.');
        }
        if (this.userSignupModel.loginId == null ||
            this.userSignupModel.loginId == '') {
            this.validationMsgArray.push('Invalid (Blank) Login Id.');
        }
        if (this.userSignupModel.emailId == null) {
            this.validationMsgArray.push('Invalid (Blank) Email Id.');
        }
        if (this.userSignupModel.phoneNumber == null) {
            this.validationMsgArray.push('Invalid (Empty) Phone Number.');
        }
        else {
            this.validateMobileNumber();
        }
        if (this.userSignupModel.address1 == '') {
            this.validationMsgArray.push('Invalid (Blank) Address 1.');
        }
        if (this.userSignupModel.addressLabel == '') {
            this.validationMsgArray.push('Invalid (Blank) Address Label.');
        }
        if (this.userSignupModel.countryId == '') {
            this.validationMsgArray.push('Invalid (Blank) Country Name.');
        }
        if (this.userSignupModel.stateId == '') {
            this.validationMsgArray.push('Invalid (Blank) Province.');
        }
        // if(this.userSignupModel.cityName==null){
        //   this.validationMsgArray.push('Invalid (Blank) City Name.')
        // }
        if (this.userSignupModel.zipCode) {
            this.validateZipcode();
        }
        //   else if (
        //   this.userSignupModel.zipCode == '' ||
        //   this.userSignupModel.zipCode == null
        // ) {
        //  this.validationMsgArray.push('Invalid (Empty) Zip code.');
        // }
        if (this.userSignupModel.loginId) {
            var trimmedLoginId = this.userSignupModel.loginId.replace(/\s/g, '');
            if (this.userSignupModel.loginId != trimmedLoginId) {
                this.validationMsgArray.push('Invalid Login id, No white spaces are not allowed!');
            }
        }
    };
    SignupComponent.prototype.validateMobileNumber = function () {
        var number = this.userSignupModel.phoneNumber;
        var numberStr = number + '';
        if ((numberStr && numberStr.length > 15) || numberStr.length < 7) {
            this.validationMsgArray.push('Phone Number must be  7 to 15 digits, country code may required');
        }
    };
    SignupComponent.prototype.validateZipcode = function () {
        var zipcode = this.userSignupModel.zipCode;
        var zipcodeStr = zipcode + '';
        if ((zipcodeStr && zipcodeStr.length < 4) || zipcodeStr.length > 10) {
            this.validationMsgArray.push('Zipcode must be  4 to 10 digits');
        }
    };
    // SELECT SUBSCRIPTION TYPE
    SignupComponent.prototype.selectedDeveloperType = function (data) {
        if (data.id) {
            this.userSignupModel.developerType = data.id;
        }
        if (data.id == '2') {
            this.isEnterprise = true;
        }
        else {
            this.isEnterprise = false;
        }
    };
    //SELECT LICENSE TYPE
    SignupComponent.prototype.selectedLicenseType = function (data) {
        if (data.id) {
            this.userSignupModel.licenseType = data.id;
        }
    };
    // ON GENDER SELECTION
    SignupComponent.prototype.setGenderSelection = function (data) {
        if (data.genderId) {
            this.userSignupModel.genderId = data.genderId;
        }
    };
    // ON CONFIRM LOGIN CHANGE
    SignupComponent.prototype.onConfirmLoginChange = function (data) {
        this.messageArray = [];
        if (this.userSignupModel.loginId != this.confirmLoginId) {
            this.messageArray.push('Please enter correct login id.');
            this._notificationService.showWarningData(this.messageArray);
        }
    };
    // User Validate
    SignupComponent.prototype.userValidate = function () {
        var _this = this;
        var validatData;
        this.validationMsgArray = [];
        var requestJson = {
            loginId: this.userSignupModel.loginId,
            emailId: this.userSignupModel.emailId,
            phoneNumber: this.userSignupModel.phoneNumber
        };
        this.http
            .post('/api/user/insecure/UserConstraintQuery/checkConstraints', requestJson)
            .subscribe(function (response) {
            validatData = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (!validatData.success) {
                _this.validationMsgArray.push(validatData.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.isUserValidate = false;
                _this.setStepActiveFlag(true, false, false);
            }
            else {
                _this.isUserValidate = true;
                _this.setStepActiveFlag(false, true, false);
                _this.previousButton = false;
                _this.nextButton = true;
                if (!_this.agree) {
                    _this.nextButton = true;
                }
                _this.headerName = 'Accept License';
                _this.nextButtonLabel = 'Next';
                _this.nextBtnIcon = 'fa fa-arrow-right';
            }
        });
    };
    // SAVE USER DATA
    SignupComponent.prototype.saveData = function () {
        var _this = this;
        if (this.isUserValidate) {
            var userResponse_1;
            this.validationMsgArray = [];
            this.messageArray = [];
            this.loaderService.showLoader();
            var requestJson = this.userSignupModel;
            this.http
                .post('/api/user/insecure/SignupRequest/save', requestJson)
                .subscribe(function (res) {
                userResponse_1 = res;
            }, function (err) {
                _this.validationMsgArray = [];
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }, function () {
                if (!userResponse_1.success) {
                    _this.validationMsgArray = [];
                    _this.validationMsgArray.push(userResponse_1.errorMessage);
                    // this.isValidateForm = true;
                    userResponse_1.errors.forEach(function (error, index) {
                        _this.validationMsgArray.push(error);
                    });
                    _this.createErrorData();
                    _this.loaderService.hideLoader();
                    _this.isLoading = false;
                }
                else {
                    _this.messageArray.push(userResponse_1.successMessage);
                    _this._notificationService.showSuccessData(_this.messageArray);
                    _this.userCreated = true;
                    _this.userSignupModel = new UserSignupModel();
                    _this.isLoading = false;
                    _this.loaderService.hideLoader();
                }
            });
        }
    };
    SignupComponent.prototype.setStepActiveFlag = function (subscription, license, payment) {
        this.activeStep.subscription = subscription;
        this.activeStep.license = license;
        this.activeStep.payment = payment;
    };
    //Navigate to login page
    SignupComponent.prototype.onClick = function () {
        this.router.navigate(['login']);
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        selector: 'sign-up',
        template: "\n      <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n  <div *ngIf=\"userCreated\" style=\"color: black;text-align: center;padding:10%\">\n    <amexio-row>\n        <amexio-column size=\"3\"> </amexio-column>\n        <amexio-column size=\"6\">\n            <amexio-card [header]=\"false\" [footer]=\"false\">\n                <amexio-body>\n                    <amexio-row>\n                        <amexio-column size=\"12\">\n                            <h1>Thank You</h1>\n                            <h5>Thank you for signing up. For more info contact info@metamagic.in\n                            </h5>\n                        </amexio-column>\n                         <amexio-column size=\"9\">\n                        </amexio-column>\n                        <amexio-column size=\"3\">\n                           <amexio-button [label]=\"'Go to login'\" [icon]=\"'fa fa-arrow-left'\" [type]=\"'secondary'\" [size]=\"'default'\"  (onClick)=\"onClick()\">\n              </amexio-button>\n                        </amexio-column>\n                    </amexio-row>\n\n                </amexio-body>\n            </amexio-card>\n        </amexio-column>\n        <amexio-column size=\"3\"> </amexio-column>\n    </amexio-row>\n\n</div>\n<ng-container *ngIf=\"!userCreated\">\n    <amexio-nav [logo]=\"'assets/images/logo.png'\">\n     <amexio-nav-item position-right [type]=\"'link'\" [title]=\"'Home'\" [icon]=\"'fa fa-home fa-fw fa-lg'\"\n      (onNavItemClick)=\"onHomeClick()\">\n    </amexio-nav-item>\n    <amexio-nav-item position-right *ngFor=\"let menus of amexiotechmenus\" \n    [type]=\"'menu'\" \n    [title]=\"menus.text\"\n    [icon]=\"menus.icon\"\n    [data]=\"menus.submenus\"\n      (onNavItemClick)=\"externalLink($event)\">\n    </amexio-nav-item>\n    </amexio-nav>\n</ng-container>\n\n\n<div *ngIf=\"!userCreated\" style=\"padding:85px 50px 0px 50px\">\n    <amexio-row>\n        <amexio-column size=\"12\">\n            <amexio-steps [icon]=\"true\">\n                <amexio-step-block [label]=\"'Developer Info'\" [icon]=\"'fa fa-user-circle fa-2x'\" [active]=\"activeStep.subscription\"></amexio-step-block>\n                <amexio-step-block [label]=\"'Accept License'\" [icon]=\"'fa fa-check-circle-o fa-2x'\" [active]=\"activeStep.license\"></amexio-step-block>\n                <amexio-step-block [label]=\"'Payment Details'\" [icon]=\"'fa fa-shopping-cart fa-2x'\" [active]=\"activeStep.payment\"></amexio-step-block>\n            </amexio-steps>\n        </amexio-column>\n    </amexio-row>\n    <app-notification></app-notification>\n\n    <amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\" [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n        <amexio-body>\n            <ol>\n                <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n            </ol>\n\n        </amexio-body>\n        <amexio-action>\n            <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n            </amexio-button>\n        </amexio-action>\n    </amexio-dialogue>\n    <amexio-row>\n        <amexio-column size=\"12\">\n        <amexio-form [form-name]=\"'validateForm'\" [header]=\"true\" [show-error]=\"true\" [footer-align]=\"'right'\"  [body-height]=\"70\">            \n                <amexio-form-header>{{headerName}}</amexio-form-header>\n                <amexio-form-body>\n                    <amexio-row *ngIf=\"activeStep.subscription\">\n                        <amexio-column size=\"2\">\n                            <amexio-radio-group name=\"licenseType\" [field-label]=\"'License Type'\" [data-reader]=\"'response.data'\" [display-field]=\"'type'\" [value-field]=\"'id'\" [http-method]=\"'get'\" [horizontal]=\"false\" [http-url]=\"'assets/licensetype.json'\" [default-value]=\"'1'\"\n                                (onSelection)=\"selectedLicenseType($event)\"></amexio-radio-group>\n                        </amexio-column>\n                        <amexio-column size=\"2\">\n                            <amexio-radio-group name=\"subscription\" [field-label]=\"'Developer Type'\" [data-reader]=\"'response.data'\"   [display-field]=\"'type'\" [value-field]=\"'id'\" [http-method]=\"'get'\" [horizontal]=\"false\" [http-url]=\"'assets/developertype.json'\" [default-value]=\"'1'\"\n                                (onSelection)=\"selectedDeveloperType($event)\"></amexio-radio-group>\n                        </amexio-column>\n                        <amexio-column size=\"2\">\n                            <amexio-image path=\"assets/images/desire3d_products.png\"></amexio-image>\n                        </amexio-column>\n                        <amexio-column size=\"2\">\n                            <amexio-radio-group name=\"product_canvas\" [data-reader]=\"'response.data'\" [display-field]=\"'label'\" [value-field]=\"'product'\" [horizontal]=\"true\" [http-method]=\"'get'\" [default-value]=\"'1'\" (onSelection)=\"onProductCheck($event)\" [http-url]=\"'assets/product_canvas.json'\"></amexio-radio-group>\n                        </amexio-column>\n                        <amexio-column size=\"2\">\n                            <amexio-radio-group name=\"product_droit\" [data-reader]=\"'response.data'\" [display-field]=\"'label'\" [value-field]=\"'product'\" [horizontal]=\"true\" [http-method]=\"'get'\" [default-value]=\"'1'\" [http-url]=\"'assets/product_droit.json'\"></amexio-radio-group>\n                        </amexio-column>\n                        <amexio-column size=\"2\">\n                            <amexio-checkbox [field-label]=\"'Code Pipeline'\" [(ngModel)]=\"codepipeline\" [disabled]=\"true\" name=\"codepipeline\"></amexio-checkbox>\n                        </amexio-column>\n                    </amexio-row>\n\n                    <div *ngIf=\"activeStep.subscription\">\n                        <amexio-row>\n\n                            <amexio-column size=\"12\">\n                                <amexio-accordion transparent=\"true\" angle-icon=\"true\">\n                                    <amexio-accordion-tab header=\"Personal Info\" [active]=\"true\">\n                                        <amexio-row>\n                                            <amexio-column size=\"1\">\n                                                <amexio-dropdown [search]=\"true\" [allow-blank]=\"false\" [place-holder]=\"'Title'\" [(ngModel)]=\"userSignupModel.salutationId\" name=\"userSignupModel.salutationId\" [data-reader]=\"'response'\" [field-label]=\"'Title'\" [http-url]=\"'/api/user/insecure/Salutation/findAll'\" [http-method]=\"'get'\"\n                                                                 (onSingleSelect)=\"onTitleSelect($event)\" [display-field]=\"'label'\" [value-field]=\"'salutationId'\"></amexio-dropdown>\n                                            </amexio-column>\n                                            <amexio-column size=\"5\">\n                                                <amexio-text-input enable-popover=\"true\"  field-label=\"First Name\" name=\"userSignupModel.firstName\" [(ngModel)]=\"userSignupModel.firstName\" place-holder=\"Enter First Name\" allow-blank=\"false\" error-msg=\"Please Enter First Name\" min-length=\"1\" min-error-msg=\"Minimum 1 char required\"\n                                                    max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\" icon-feedback=\"true\"></amexio-text-input>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-text-input enable-popover=\"true\"  field-label=\"Last Name\" name=\"userSignupModel.lastName\" [(ngModel)]=\"userSignupModel.lastName\" place-holder=\"Enter Last Name\" allow-blank=\"false\" error-msg=\"Please Enter Last Name\" min-length=\"1\" min-error-msg=\"Minimum 1 char required\"\n                                                    max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\" icon-feedback=\"true\"></amexio-text-input>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-date-time-picker [field-label]=\"'Date Of Birth'\" [required]=\"false\" [time-picker]=\"false\" [date-picker]=\"true\" [(ngModel)]=\"userSignupModel.dateOfBirth\"></amexio-date-time-picker>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-radio-group [field-label]=\"'Gender'\" name=\"gender\" [data-reader]=\"'data'\" [display-field]=\"'gender'\" [value-field]=\"'genderId'\" [allow-blank]=\"false\" [default-value]=\"userSignupModel.genderId\" [http-method]=\"'get'\" [horizontal]=\"true\" [http-url]=\"'assets/gender.json'\"\n                                                    (onSelection)=\"setGenderSelection($event)\"></amexio-radio-group>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-text-input [field-label]=\"'Login Id'\" [place-holder]=\"'Enter Login Id'\" name=\"userSignupModel.loginId\" [(ngModel)]=\"userSignupModel.loginId\" [allow-blank]=\"false\" [error-msg]=\"'Please Enter Login Id'\" min-length=\"4\" min-error-msg=\"Minimum 4 char required\"\n                                                    max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\" [enable-popover]=\"true\" [icon-feedback]=\"true\"></amexio-text-input>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-text-input [field-label]=\"'Confirm Login Id'\" [place-holder]=\"'Enter Confirm Login Id'\" name=\"confirmLoginId\" [(ngModel)]=\"confirmLoginId\" [allow-blank]=\"false\" min-length=\"4\" min-error-msg=\"Minimum 4 char required\" max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\"\n                                                    [error-msg]=\"'Please Enter Confirm Login Id'\" [enable-popover]=\"true\" [icon-feedback]=\"true\" (onBlur)=\"onConfirmLoginChange($event)\"></amexio-text-input>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-email-input [field-label]=\"'Email Id'\" name=\"userSignupModel.emailId\" [(ngModel)]=\"userSignupModel.emailId\" [place-holder]=\"'Enter Email Id'\" [allow-blank]=\"false\" [error-msg]=\"'Please Enter Email Id'\" [enable-popover]=\"true\" [icon-feedback]=\"true\"></amexio-email-input>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-number-input [enable-popover]=\"true\" [field-label]=\"'Phone Number'\" [place-holder]=\"'Enter Phone Number'\" [allow-blank]=\"false\" name=\"'userSignupModel.phoneNumber'\" [error-msg]=\"'Enter valid Phone Number'\"\n                                                     [icon-feedback]=\"true\" [(ngModel)]=\"userSignupModel.phoneNumber\">\n                                                </amexio-number-input>\n                                            </amexio-column>\n                                        </amexio-row>\n\n                                    </amexio-accordion-tab>\n                                    <amexio-accordion-tab header=\"Address\">\n\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-textarea-input [enable-popover]=\"true\" [field-label]=\"'Address Label'\" [place-holder]=\"'Permanent Address'\" [allow-blank]=\"false\" [error-msg]=\"'Please Enter Address'\" [icon-feedback]=\"true\" [rows]=\"'1'\" [columns]=\"'2'\" name=\"userSignupModel.addressLabel\"\n                                                    [(ngModel)]=\"userSignupModel.addressLabel\"></amexio-textarea-input>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-textarea-input [enable-popover]=\"true\" [field-label]=\"'Address Line 1'\" [place-holder]=\"'Please Enter Address Line1'\" [allow-blank]=\"false\" [error-msg]=\"'Please Enter Address'\" [icon-feedback]=\"true\" [rows]=\"'1'\" [columns]=\"'2'\" name=\"userSignupModel.address1\"\n                                                    [(ngModel)]=\"userSignupModel.address1\"></amexio-textarea-input>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-textarea-input [enable-popover]=\"true\" [field-label]=\"'Address Line 2'\" [place-holder]=\"'Please Enter Address Line 2'\" [allow-blank]=\"true\" [error-msg]=\"'Please Enter Address Line 2'\" [icon-feedback]=\"true\" [rows]=\"'1'\" [columns]=\"'2'\" name=\"userSignupModel.address2\"\n                                                    [(ngModel)]=\"userSignupModel.address2\"></amexio-textarea-input>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-dropdown [search]=\"true\" [place-holder]=\"'Choose Country'\" [data-reader]=\"'response'\" [field-label]=\"'Country'\" [http-url]=\"'/api/user/insecure/Country/findAll'\" [http-method]=\"'get'\" [display-field]=\"'countryName'\" [value-field]=\"'countryId'\" [allow-blank]=\"false\"\n                                                    name=\"userSignupModel.countryId\" [(ngModel)]=\"userSignupModel.countryId\" (onSingleSelect)=\"onCountrySelect($event)\"></amexio-dropdown>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-dropdown [search]=\"true\" [allow-blank]=\"false\"  [place-holder]=\"'Choose Province'\" name=\"userSignupModel.stateId\" [(ngModel)]=\"userSignupModel.stateId\" [field-label]=\"'Province'\" [data]=\"stateData\" [display-field]=\"'stateName'\" [value-field]=\"'stateId'\" (onSingleSelect)=\"onStateSelect($event)\"></amexio-dropdown>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-text-input enable-popover=\"true\" field-label=\"City\" name=\"userSignupModel.cityName\" [(ngModel)]=\"userSignupModel.cityName\" place-holder=\"Enter City Name\" allow-blank=\"true\" error-msg=\"Please Enter City Name\" min-length=\"2\" min-error-msg=\"Minimum 2 character required\"\n                                                    icon-feedback=\"true\" max-length=\"256\" max-error-msg=\"Maximum 256 characters allowed\"></amexio-text-input>\n                                                <!-- <amexio-dropdown [search]=\"true\" [place-holder]=\"'Choose City'\" [field-label]=\"'City'\" [data]=\"cityData\" name=\"userSignupModel.cityId\" [(ngModel)]=\"userSignupModel.cityId\" [display-field]=\"'cityName'\" [value-field]=\"'cityId'\"></amexio-dropdown> -->\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-number-input enable-popover=\"true\" field-label=\"Zip Code\" name=\"userSignupModel.zipCode\" [(ngModel)]=\"userSignupModel.zipCode\" place-holder=\"Enter Zip Code \" allow-blank=\"false\" error-msg=\"Please Enter Zip Code\" \n                                                     icon-feedback=\"true\"></amexio-number-input>\n                                            </amexio-column>\n                                        </amexio-row>\n\n                                    </amexio-accordion-tab>\n                                    <amexio-accordion-tab header=\"Company Info\" disabled=\"true\">\n\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-text-input enable-popover=\"true\" field-label=\"Name\" name=\"userSignupModel.orgName\" [(ngModel)]=\"userSignupModel.orgName\" place-holder=\"Enter Name\" allow-blank=\"true\" error-msg=\"Please Enter Name\" min-length=\"1\" min-error-msg=\"Minimum 1 char required\"\n                                                    max-length=\"20\" max-error-msg=\"Maximum 20 char allowed\" icon-feedback=\"true\"></amexio-text-input>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-textarea-input [enable-popover]=\"true\" [field-label]=\"'Description'\" name=\"userSignupModel.orgDescription\" [(ngModel)]=\"userSignupModel.orgDescription\" [place-holder]=\"'Enter Description'\" [allow-blank]=\"true\" [error-msg]=\"'Please Enter Description'\"\n                                                    [icon-feedback]=\"true\" [rows]=\"'1'\" [columns]=\"'2'\"></amexio-textarea-input>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-dropdown [search]=\"true\" [place-holder]=\"'Choose Class'\" [(ngModel)]=\"userSignupModel.orgClassId\" name=\"userSignupModel.orgClassId\" [data-reader]=\"'response'\" [field-label]=\"'Class'\" [http-url]=\"'/api/user/insecure/OrganizationClass/findAll'\"\n                                                allow-blank=\"true\" [http-method]=\"'get'\" [display-field]=\"'orgClassLabel'\" [value-field]=\"'orgClassId'\"></amexio-dropdown>\n                                            </amexio-column>\n                                            <amexio-column size=\"6\">\n                                                <amexio-dropdown [search]=\"true\" [place-holder]=\"'Choose Type'\" [(ngModel)]=\"userSignupModel.orgTypeId\" name=\"userSignupModel.orgTypeId\" [data-reader]=\"'response'\" [field-label]=\"'Type'\" [http-url]=\"'/api/user/insecure/OrganizationType/findAll'\" [http-method]=\"'get'\"\n                                                   allow-blank=\"true\"  [display-field]=\"'orgTypeLabel'\" [value-field]=\"'orgTypeId'\"></amexio-dropdown>\n                                            </amexio-column>\n                                        </amexio-row>\n                                        <amexio-row>\n                                            <amexio-column size=\"6\">\n                                                <amexio-dropdown [search]=\"true\" [place-holder]=\"'Choose Category'\" [(ngModel)]=\"userSignupModel.orgCategoryId\" name=\"userSignupModel.orgCategoryId\" [data-reader]=\"'response'\" [field-label]=\"'Category'\" [http-url]=\"'/api/user/insecure/OrganizationCategory/findAll'\"\n                                                allow-blank=\"true\" [http-method]=\"'get'\" [display-field]=\"'orgCategoryLabel'\" [value-field]=\"'orgCategoryId'\"></amexio-dropdown>\n                                            </amexio-column>\n                                        </amexio-row>\n\n                                    </amexio-accordion-tab>\n                                </amexio-accordion>\n                            </amexio-column>\n                        </amexio-row>\n                    </div>\n\n                    <!-- License  -->\n                    <ng-container *ngIf=\"activeStep.license\">\n\n                        <amexio-row>\n                            <amexio-column size=\"12\">\n                                <amexio-card [header]=\"false\" footer=\"true\" [body-height]=\"50\" [footer-align]=\"'left'\">\n                                    <amexio-body>\n                                        <license></license>\n                                    </amexio-body>\n                                    <amexio-action>\n                                        <amexio-checkbox [field-label]=\"'I agree all terms and conditions.'\" [(ngModel)]=\"agree\" name=\"agree\" (onSelection)=\"onCheckClick($event)\"></amexio-checkbox>\n                                    </amexio-action>\n                                </amexio-card>\n\n                            </amexio-column>\n                        </amexio-row>\n                    </ng-container>\n                    <!-- Payment -->\n                    <ng-container *ngIf=\"activeStep.payment\">\n                        <amexio-row>\n                            <amexio-column size=\"12\">\n                                <amexio-card [header]=\"false\" footer=\"true\" [body-height]=\"50\" [footer-align]=\"'left'\">\n                                    <amexio-body>\n                                        <payment-gateway></payment-gateway>\n                                    </amexio-body>\n                                    <amexio-action>\n                                        <amexio-checkbox [field-label]=\"'I agree'\" [(ngModel)]=\"paymentAgree\" name=\"paymentAgree\" (onSelection)=\"onAgreeClick($event)\"></amexio-checkbox>\n                                    </amexio-action>\n                                </amexio-card>\n                            </amexio-column>\n                        </amexio-row>\n                    </ng-container>\n                </amexio-form-body>\n                <amexio-form-action>\n                    <amexio-button [size]=\"'default'\" label=\"Prev\" type=\"primary\" [icon]=\"'fa fa-arrow-left'\" (onClick)=\"previousClick()\" [disabled]=\"previousButton\"></amexio-button>\n                    <amexio-button [size]=\"'default'\" [loading]=\"isLoading\" [label]=\"nextButtonLabel\" [icon]=\"nextBtnIcon\" [form-bind]=\"'validateForm'\" type=\"primary\" (onClick)=\"nextClick()\" [disabled]=\"nextButton\"></amexio-button>\n                </amexio-form-action>\n             </amexio-form>\n        </amexio-column>\n    </amexio-row>\n</div>\n\n "
    }),
    __param(5, core_1.Inject(platform_browser_1.DOCUMENT))
], SignupComponent);
exports.SignupComponent = SignupComponent;
var ActiveSteps = (function () {
    function ActiveSteps() {
        this.subscription = true;
        this.userinfo = false;
        this.license = false;
        this.payment = false;
    }
    return ActiveSteps;
}());
exports.ActiveSteps = ActiveSteps;
var UserSignupModel = (function () {
    function UserSignupModel() {
        this.product = '';
        this.salutationId = '';
        this.firstName = '';
        this.middleName = null;
        this.lastName = '';
        this.dateOfBirth = null;
        this.genderId = 'male';
        this.emailId = null;
        this.phoneNumber = null;
        this.loginId = '';
        this.developerType = '';
        this.licenseType = '';
        this.orgName = null;
        this.orgDescription = null;
        this.orgClassId = null;
        this.orgTypeId = null;
        this.orgCategoryId = null;
        this.addressLabel = '';
        this.address1 = '';
        this.address2 = '';
        this.countryId = '';
        this.stateId = '';
        // this.cityId = null;
        this.cityName = '';
        this.zipCode = null;
    }
    return UserSignupModel;
}());
exports.UserSignupModel = UserSignupModel;
